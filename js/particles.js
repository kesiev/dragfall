function Particles() {
    const
        PI2 = 2 * Math.PI,
        LIMIT = 200,
        TYPE_FALLING = 1,
        TYPE_LINEAR = 2;

    let
        prevWidth, prevHeight,
        list = [];

    return {
        reset:()=>{
            list.length = 0;
        },
        addFalling:(duration, color, size, x, y, gap, speed, h, r)=>{
            if (list.length < LIMIT)
                list.push({ duration:duration, type:TYPE_FALLING, color:color, hsize:Math.floor(size/2), size:size, speed:speed, gap:gap, x:x, y:y, h:size*h, r:r })
        },
        addLinear:(duration, color, size, x, y, dx, dy)=>{
            if (list.length < LIMIT)
                list.push({ duration:duration, type:TYPE_LINEAR, color:color, hsize:Math.floor(size/2), size:size, x:x, y:y, dx:size*dx, dy:size*dy })
        },
        render:(e, ctx, width, height, lowdrama, drama)=>{
            if ((width!=prevWidth) || (height != prevHeight)) {
                prevWidth = width;
                prevHeight = height;
                list.length = 0;
            }

            ctx.shadowBlur = 0;

            for (let i=0;i<list.length;i++) {
                let
                    p = list[i],
                    x, y, time, dx;

                if (!p.e)
                    p.e = e;

                time = e - p.e;

                if (time > p.duration) {
                    list.splice(i,1);
                    i--;
                } else {
                    switch (p.type) {
                        case TYPE_FALLING:{
                            let
                                dx = p.speed*time,
                                pdx = dx-p.gap;
                            x = p.x+(dx*p.h);
                            y = p.y+(pdx*pdx)/p.r;
                            break;
                        }
                        case TYPE_LINEAR:{
                            let
                                progress = time/p.duration || 0;
                            x = p.x+(p.dx*progress);
                            y = p.y+(p.dy*progress);
                            break;
                        }
                    }

                    ctx.fillStyle = "rgba("+Math.max(255,p.color.r*drama)+","+Math.max(255,p.color.g*drama)+","+Math.max(255,p.color.b*drama)+","+(1-time/p.duration)+")";
                    ctx.fillRect(Math.floor(x-p.hsize*drama), Math.floor(y-p.hsize*drama), p.size*drama,p.size*drama);
                }
            }
        }
    }
}
