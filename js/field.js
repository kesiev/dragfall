
function Field(width, height) {
    let
        self,
        field = [];

    for (let i=0;i<height;i++) {
        let
            row = [];
        for (let j=0;j<width;j++)
            row.push(0);
        field.push(row);
    }

    function isInField(x, y) {
        return isInFieldX(x) && isInFieldY(y);
    }

    function isInFieldX(x) {
        return (x >= 0) && (x < width);
    }

    function isInFieldY(y) {
        return (y >= 0) && (y < height);
    }

    function isFieldFilled(x, y) {
        return !isInField(x, y) || (field[y] && field[y][x]);
    }

    function extractBlockAreaAt(x, y, done) {
        let
            ox = x,
            oy = y,
            blockProcessing = true,
            blockGrid = new Grid(),
            cells = [ { x:x, y:y, cell:field[y][x] } ];

        if (!done)
            done = new Grid();

        done.set(x, y);
        blockGrid.set(x, y);

        do {
            cells.forEach(blockCell=>{
                blockProcessing = false;
                SIDES.forEach(side=>{
                    let
                        dx = blockCell.x + side.dx,
                        dy = blockCell.y + side.dy;

                    if (
                        blockCell.cell.links[side.index] &&
                        done.isNotSet(dx, dy)
                    ) {
                        blockProcessing = true;
                        cells.push({ x:dx, y:dy, cell:field[dy][dx] });
                        done.set(dx, dy);
                        blockGrid.set(dx, dy);
                        ox = Math.min(dx, ox);
                        oy = Math.min(dy, oy);
                    }
                })
                
            })
        } while (blockProcessing);

        return {
            ox:ox,
            oy:oy,
            cells:cells,
            grid:blockGrid
        }
    }

    function applyGravity() {
        let
            fieldProcessing = true,
            fallen = new Grid(),
            movedCells = [];

        do {
            let
                done = new Grid();

            fieldProcessing = false;
            for (let y = height-1; y>=0; y--)
                for (let x = 0; x<width; x++)
                    if (isFieldFilled(x, y) && done.isNotSet(x, y) && fallen.isNotSet(x, y)) {
                        let
                            canFall = true,
                            extractedBlock = extractBlockAreaAt(x, y, done);

                        extractedBlock.cells.forEach(blockCell=>{
                            if (!field[blockCell.y+1] || ((field[blockCell.y+1][blockCell.x] != 0) && extractedBlock.grid.isNotSet(blockCell.x, blockCell.y+1)) )
                                canFall = false;
                        })

                        if (canFall) {
                            extractedBlock.cells.forEach(blockCell=>field[blockCell.y][blockCell.x] = 0);
                            extractedBlock.cells.forEach(blockCell=>{
                                field[blockCell.y+1][blockCell.x] = blockCell.cell;
                                fallen.set(blockCell.x, blockCell.y+1);
                                movedCells.push({ x:blockCell.x, y:blockCell.y+1, logicColor:blockCell.cell.logicColor });
                            });
                            fieldProcessing = true;
                        }
                }
        } while (fieldProcessing);

        return movedCells;
    }

    function cutBlock(x, y, side) {
        let
            cell = field[y][x];

        if (cell.links[side]) {
            let
                oppositeSide = (side+2)%4;
            field[y+SIDES[side].dy][x+SIDES[side].dx].links[oppositeSide] = 0;
            cell.links[side] = 0;
        }
    }

    function prepareLines() {
        let
            clearedGrid = new Grid(),
            lines = [],
            cells = [];

        for (let y=0;y<height;y++) {
            let
                logicColors,
                colors,
                isFull = true;
            for (let x=0;x<width;x++)
                if (!field[y][x]) {
                    isFull = false;
                    break;
                } else {
                    let
                        logicColor = field[y][x].logicColor,
                        color = field[y][x].color;
                    if (!logicColors)
                        logicColors = [];
                    if (!colors)
                        colors = [];
                    if (!logicColors[logicColor])
                        logicColors[logicColor] = 1;
                    else
                        logicColors[logicColor]++;
                    if (!colors[color])
                        colors[color] = 1;
                    else
                        colors[color]++;
                }
            if (isFull) {
                lines.push({ row:y, logicColors:logicColors, colors:colors });
                for (let x=0;x<width;x++)
                    if (clearedGrid.isNotSet(x,y))
                        if (field[y][x].solid) {
                            let
                                extractedBlock = extractBlockAreaAt(x, y);
                            extractedBlock.cells.forEach(cell=>{
                                let
                                    fieldCell = field[cell.y][cell.x];
                                cells.push({ x:cell.x, y:cell.y, color:fieldCell.color, logicColor:fieldCell.logicColor });    
                                clearedGrid.set(cell.x, cell.y);
                            })
                        } else {
                            let
                                fieldCell = field[y][x];
                            cells.push({ x:x, y:y, color:fieldCell.color, logicColor:fieldCell.logicColor });
                            cutBlock(x, y, 0);
                            cutBlock(x, y, 2);
                            clearedGrid.set(x,y);
                        }
            }
        }
        return {
            lines:lines,
            cells:cells
        };
    }

    function shatterCell(x, y, cells) {
        let
            cell = field[y][x];
        if (cell && !cell.unshatterable) {
            let
                isShattered = false;
            SIDES.forEach((side,id)=>{
                if (cell.links[id]) {
                    cutBlock(x, y, id);
                    isShattered = true;
                }
            })
            if (isShattered)
                cells.push({ x:x, y:y, color:cell.color, logicColor:cell.logicColor });
        }
    }

    function shatterColor(color) {
        let
            shatteredCells = [];
        for (let y=0;y<height;y++)
            for (let x=0;x<width;x++)
                if (field[y][x].color == color)
                    shatterCell(x, y, shatteredCells);
        return shatteredCells;
    }

    function shatterColumn(x) {
        let
            shatteredCells = [];
        for (let y=0;y<height;y++)
            shatterCell(x, y, shatteredCells);
        return shatteredCells;
    }

    function removeLines(lines) {
        lines.cells.forEach(cell=>{
            field[cell.y][cell.x] = 0;
        })
    }

    self = {
        width:width,
        height:height,
        field:field,
        serialize:()=>{
            return {
                width:width,
                height:height,
                field:JSON.parse(JSON.stringify(field))
            };
        },
        setField:(f)=>{
            field = f;
            self.field = field;
        },
        extractBlockAt:(x, y)=>{
            if (isFieldFilled(x, y)) {
                let
                    color = field[y][x].color,
                    logicColor = field[y][x].logicColor,
                    unshatterable = field[y][x].unshatterable,
                    solid = field[y][x].solid,
                    unmovable = field[y][x].unmovable,
                    pattern = [],
                    extractedBlock = extractBlockAreaAt(x, y);

                extractedBlock.cells.forEach(cell=>{
                    let
                        cx = cell.x - extractedBlock.ox,
                        cy = cell.y - extractedBlock.oy;
                  
                    if (!pattern[cy])
                        pattern[cy] = [];
                    pattern[cy][cx] = 1;
                    field[cell.y][cell.x] = 0;
                })

                return new Block(extractedBlock.ox, extractedBlock.oy, color, logicColor, unshatterable, solid, unmovable, pattern);
            }
        },
        extractBlockAreaAt:(x,y)=>{
            return extractBlockAreaAt(x, y);
        },
        applyGravity:()=>{
            return applyGravity();
        },
        isFieldFilled:(x,y)=>{
            return isFieldFilled(x,y)
        },
        isInField:(x,y)=>{
            return isInField(x,y);
        },
        isInFieldX:(x)=>{
            return isInFieldX(x);
        },
        isInFieldY:(y)=>{
            return isInFieldY(y);
        },
        prepareLines:()=>{
            return prepareLines();
        },
        removeLines:(lines)=>{
            return removeLines(lines);
        },
        shatterColor:(color)=>{
            return shatterColor(color);
        },
        shatterColumn:(column)=>{
            return shatterColumn(column);
        },
        getCell:(x,y)=>{
            return field[y][x];
        },
        addBlock:(block)=>{
            for (let y=0;y<block.pattern.length;y++)
                for (let x=0;x<block.pattern[y].length;x++)
                    if (block.pattern[y][x])
                        field[y+block.y][x+block.x] = block.pattern[y][x];
        }
    }

    return self;

}
