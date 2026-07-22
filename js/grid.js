function Grid() {
    let
        grid = [];

    return {
        grid:grid,
        set:(x, y)=>{
            if (!grid[y])
                grid[y] = [];
            grid[y][x] = true;
        },
        isSet:(x, y)=>{
            return grid[y] && grid[y][x];
        },
        isNotSet:(x, y)=>{
            return !(grid[y] && grid[y][x]);
        }
    }
}
