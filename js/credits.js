function Credits(list, color, shadowcolor) {
    const
        SPEED = 0.00001;
        
    let
        startE,
        prevWidth, prevHeight,
        canvas = document.createElement("canvas"),
        cctx = canvas.getContext("2d");

    canvas.width = 0;

    function start(canvaswidth, canvasheight, e, font, lineheight) {
        let
            cx = Math.floor(canvaswidth/2);

        startE = e;
        
        prevWidth = canvaswidth;
        prevHeight = canvasheight;
        canvas.width = canvaswidth;
        canvas.height = (lineheight * list.length) + canvasheight;
        
        cctx.font = font;
        cctx.textBaseline = "top";
        cctx.textAlign = "center";
        cctx.shadowColor = shadowcolor;
        cctx.fillStyle = color;

        list.forEach((line,id)=>{
            if (line)
                cctx.fillText(line, cx, id * lineheight);
        })
    }

    return {
        start:()=>{
            startE = 0;
        },
        render:(canvaswidth, canvasheight, ctx, font, lineheight, e)=>{
            let
                ey;
                
            if (!startE || (prevWidth != canvaswidth) || (prevHeight != canvasheight))
                start(canvaswidth, canvasheight, e, font, lineheight);

            ey = Math.floor((e - startE) * SPEED * canvas.height);

            if (ey > canvas.height)
                startE = e;
            else {
                let
                    dy = 0,
                    hy = canvasheight,
                    sy = ey - canvasheight;

                if (sy < 0) {
                    dy -= sy;
                    hy += sy;
                    sy = 0;
                }

                ctx.drawImage(canvas,0, sy, canvaswidth, hy, 0, dy, canvaswidth, hy);
            }
        }
    };

    return self;
}
