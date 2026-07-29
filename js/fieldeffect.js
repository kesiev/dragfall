function FieldEffects(isSolid, isIdleAnimation, field) {
    const
        EFFECT_FLASH = 1,
        EFFECT_HILIGHT = 2;
        
    let
        cellWidth,
        cellHeight,
        padding,
        fieldWidth = field.width,
        fieldHeight = field.height,
        outline = 0,
        effectWidth,
        effectHeight,
        effects = [],
        idleColor1,
        idleColor2,
        idleRangeR, idleRangeG, idleRangeB,
        idleSpeed, idleMulX, idleMulY, idleMulRatio;

    for (let y=0;y<field.height;y++) {
        let
            row = [];
        for (let x=0;x<field.width;x++)
            row.push(0);
        effects.push(row);
    }

    function createRange(c1, c2) {
        let
            delta,
            sw,
            m = 1;

        if (c1 > c2) {
            sw = c1;
            c1 = c2;
            c2 = sw;
            m = -1;
        }
        
        delta = (c2 - c1)/2;

        return { base:c1 + delta, delta:delta*m };
    }

    return {
        serialize:()=>{
            return [
                idleRangeR,
                idleRangeG,
                idleRangeB,
                idleSpeed,
                idleMulX,
                idleMulY,
                idleMulRatio
            ];
        },
        unserialize:(data)=>{
            idleRangeR = data[0];
            idleRangeG = data[1];
            idleRangeB = data[2];
            idleSpeed = data[3];
            idleMulX = data[4];
            idleMulY = data[5];
            idleMulRatio = data[6];
        },
        addFlash:(force, x, y, duration, r, g, b)=>{
            if (force || !effects[y][x])
                effects[y][x] = { type:EFFECT_FLASH, duration:duration, r:r, g:g, b:b, gl:0 };
        },
        addHilight:(force, x, y, duration, r, g, b, gl)=>{
            if (force || !effects[y][x])
                effects[y][x] = { type:EFFECT_HILIGHT, duration:duration, r:r, g:g, b:b, gl:gl };
        },
        setIdleColors:(c1,c2, sp, mx, my, mr)=>{
            idleRangeR = createRange(c1.r, c2.r);
            idleRangeG = createRange(c1.g, c2.g);
            idleRangeB = createRange(c1.b, c2.b);
            idleSpeed = sp;
            idleMulX = mx;
            idleMulY = my;
            idleMulRatio = mr;
        },
        setCellSize:(width, height, pad, out)=>{
            cellWidth = width;
            cellHeight = height;
            padding = pad || 0;
            outline = out || 0;
            effectWidth = cellWidth-(padding*2);
            effectHeight = cellHeight-(padding*2);
        },
        render:(ctx, e, ox, oy, opacity)=>{
            let
                color;

            for (let y=0;y<fieldHeight;y++)
                for (let x=0;x<fieldWidth;x++) {
                    let
                        effect = effects[y][x],
                        r, g, b, a, gl;

                    if (isIdleAnimation) {
                        r = idleRangeR.base + (Math.sin(e*idleSpeed+(((x*idleMulX)+(y*idleMulY))*idleMulRatio))*idleRangeR.delta);
                        g = idleRangeG.base + (Math.sin(e*idleSpeed+(((x*idleMulX)+(y*idleMulY))*idleMulRatio))*idleRangeG.delta);
                        b = idleRangeB.base + (Math.sin(e*idleSpeed+(((x*idleMulX)+(y*idleMulY))*idleMulRatio))*idleRangeB.delta);
                        gl = 0;
                        a = 1;
                    } else {
                        r = 0;
                        g = 0;
                        b = 0;
                        gl = 0;
                        a = 0;
                    }

                    if (isIdleAnimation || effect) {
                        if (effect) {
                            let
                                done = false,
                                progress;

                            if (!effect.e)
                                effect.e = e;

                            progress = (e-effect.e)/effect.duration;

                            if (progress > 1) {
                                effects[y][x] = 0;
                            } else {
                                switch (effect.type) {
                                    case EFFECT_FLASH:{
                                        r+=(1-progress)*effect.r;
                                        g+=(1-progress)*effect.g;
                                        b+=(1-progress)*effect.b;
                                        gl+=(1-progress)*effect.gl;
                                        break;
                                    }
                                    case EFFECT_HILIGHT:{
                                        r+=effect.r;
                                        g+=effect.g;
                                        b+=effect.b;
                                        gl+=effect.gl;
                                        a+=(1-progress)*(0.7+Math.sin(x/fieldWidth*Math.PI)*0.3);
                                        break;
                                    }
                                }
                            }
                        }
                        color = "rgba("+Math.min(255,Math.max(r*opacity,0))+","+Math.min(255,Math.max(g*opacity,0))+","+Math.min(255,Math.max(b*opacity,0))+","+Math.min(1,Math.max(a*opacity,0))+")";
                        if (gl) {
                            ctx.shadowColor = color;
                            ctx.shadowBlur = gl;
                            ctx.shadowOffsetX = 0;
                            ctx.shadowOffsetY = 0;
                        } else {
                            ctx.shadowBlur = 0;
                        }
                        if (isSolid) {
                            ctx.fillStyle = color;
                            ctx.fillRect(ox+x*cellWidth+padding, oy+y*cellHeight+padding, effectWidth, effectHeight);
                        } else {
                            ctx.strokeStyle = color;
                            ctx.lineWidth = outline;
                            ctx.strokeRect(ox+x*cellWidth+padding, oy+y*cellHeight+padding, effectWidth, effectHeight);
                        }
                    }
                }
        }
    }
}
