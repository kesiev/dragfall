function Menu(options, selectedOption, onchange, lines, color1, color2, colorfont, colorshadow) {
    let
        isEnabled = true,
        forceUpdate = true,
        prevWidth, prevHeight,
        currentOption,
        halfFontSize,
        glow,
        centerX,
        centerY,
        extraOptionHeight,
        barHeight,
        innerBarHeight,
        barY,
        selectedOptionHeight,
        selectedOptionY,
        extraOptionsCount,
        optionsY,
        alpha;

    let
        self = {
            moveDown:(warp)=>{
                if (isEnabled) {
                    let
                        nextSelected = selectedOption+1;

                    if (warp && (nextSelected >= options.length))
                        nextSelected = 0;

                    if (options[nextSelected]) {
                        forceUpdate = true;
                        selectedOption = nextSelected;
                        onchange();
                        return true;
                    }
                }
            },
            moveUp:(warp)=>{
                if (isEnabled) {
                    let
                        nextSelected = selectedOption-1;

                    if (warp && (nextSelected < 0))
                        nextSelected = options.length-1;

                    if (options[nextSelected]) {
                        forceUpdate = true;
                        selectedOption = nextSelected;
                        onchange();
                        return true;
                    }
                }
            },
            select:()=>{
                if (isEnabled)
                    options[selectedOption].onSelect(self, selectedOption);
            },
            back:()=>{
                 if (isEnabled) {
                    let
                        backOption;

                    options.forEach((option,id)=>{
                        if (option.isBackOption)
                            backOption = id;
                    })

                    if (backOption !== undefined) {
                        forceUpdate = true;
                        selectedOption = backOption;
                        return self.select();
                    }
                }
            },
            disable:()=>{
                isEnabled = false;
            },
            render:(canvaswidth, canvasheight, e, ctx, font, fontSize, blur, linespacing, padding, x, y, width, height)=>{
                if (
                    forceUpdate ||
                    (canvaswidth != prevWidth) ||
                    (canvasheight != prevHeight)
                ) {
                    canvaswidth = prevWidth;
                    canvasheight = prevHeight;
                    currentOption = options[selectedOption],
                    halfFontSize = fontSize/2,
                    glow = 0.8 + Math.sin(e*0.002)*0.2,
                    centerX = x + Math.floor((width/2)),
                    centerY = y + Math.floor((height/2)),
                    extraOptionHeight = fontSize+(padding*2),
                    barHeight = ((fontSize+linespacing)*lines)+(padding*4)-linespacing,
                    innerBarHeight = barHeight - (padding*2),
                    barY = centerY - Math.floor(barHeight/2),
                    selectedOptionHeight = ((fontSize+linespacing)*currentOption.label.length)-linespacing,
                    selectedOptionY = barY + Math.floor((barHeight-selectedOptionHeight)/2+halfFontSize),
                    extraOptionsCount = Math.floor((height - barHeight)/extraOptionHeight),
                    optionsY = centerY-(extraOptionHeight*extraOptionsCount)
                }

                ctx.shadowColor = 0;
                ctx.shadowBlur = 0;

                ctx.fillStyle = color1;
                ctx.fillRect(x, barY, width, barHeight);

                ctx.fillStyle = color2;
                ctx.fillRect(x, barY+padding, width, innerBarHeight);

                ctx.font = font;
                ctx.textBaseline = "middle";
                ctx.textAlign = "center";

                ctx.fillStyle = "rgba("+colorfont.r+","+colorfont.g+","+colorfont.b+",0.5)";

                currentOption.label.forEach((line,l)=>{
                    if (l == 0)
                        alpha = glow;
                    else
                        alpha = 1;
                    ctx.fillStyle = "rgba("+colorfont.r+","+colorfont.g+","+colorfont.b+","+alpha+")";
                    ctx.fillText(line, centerX, selectedOptionY+((fontSize+linespacing)*l));
                });

                ctx.shadowBlur = blur;
                ctx.shadowColor = colorshadow;
                ctx.fillStyle = "rgba("+colorfont.r+","+colorfont.g+","+colorfont.b+",0.5)";

                for (let i=1;i<=extraOptionsCount;i++) {
                    let
                        upOption = options[selectedOption-i],
                        downOption = options[selectedOption+i];

                    if (upOption)
                        ctx.fillText(upOption.label[0], centerX, barY-(i*extraOptionHeight)+padding);

                    if (downOption)
                        ctx.fillText(downOption.label[0], centerX, barY+barHeight+(i*extraOptionHeight)+padding);
                }

            }
        };

    return self;
}
