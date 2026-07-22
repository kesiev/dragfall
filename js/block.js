function Block(x, y, color, logicColor, unshatterable, solid, unmovable, pattern) {
    let
        truePattern = [],
        self;

    for (let y=0;y<pattern.length;y++) {
        truePattern[y] = [];
        for (let x=0;x<pattern[y].length;x++) 
            if (pattern[y][x]) {
                let
                    data = { color:color, logicColor:logicColor, unshatterable:unshatterable, solid:solid, unmovable:unmovable, links:[] };

                SIDES.forEach((side,id)=>{
                    let
                        dx = x+side.dx,
                        dy = y+side.dy;
                    if (pattern[dy] && pattern[dy][dx])
                        data.links[id] = true;
                })

                truePattern[y][x] = data;
            }
    }

    self = {
        isBlock:true,
        x:x,
        y:y,
        color:color,
        logicColor:logicColor,
        pattern:truePattern,
        unmovable:unmovable,
        unshatterable:unshatterable,
        solid:solid,
        fitsInField:(field, gx, gy)=>{
            for (let dy=0;dy<pattern.length;dy++)
                for (let dx=0;dx<pattern[dy].length;dx++)
                    if (pattern[dy][dx] && field.isFieldFilled(self.x+dx+gx, self.y+dy+gy))
                        return false;
            return true;
        },
        clone:()=>{
            return new Block(self.x, self.y, color, logicColor, unshatterable, solid, unmovable, pattern);
        }
    };

    return self;
}
