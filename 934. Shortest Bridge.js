var shortestBridge = function(A) {
    return findBridge(findFirstIsland(A));
};

const dir = [[1, 0], [-1, 0], [0, 1], [0, -1]];

const validate = (row, col, grid) => row >= 0 && col >= 0 && row < grid.length && col < grid[0].length;

const findFirstIsland = grid => {
    const queue = [];
    const dfs = (x, y) => {
        grid[x][y] = '#'; // marks it as the first island
        queue.push([x, y, 0]); // level starts from 0
        for(const [dx, dy] of dir) {
            const row = x + dx;
            const col = y + dy;
            if(validate(row, col, grid) && grid[row][col] === 1) {
                dfs(row, col);
            }
        }
    }
    for(let i = 0; i < grid.length; i++) {
        for(let j = 0; j < grid[0].length; j++) {
            if(grid[i][j] === 1) { 
                dfs(i, j);  // reaches the first island then return
                return [grid, queue]; // return the updated grid and queue with the whole first island
            }
        }
    }
}

const findBridge = ([grid ,queue]) => {
    while(queue.length) {
        const [x, y, level] = queue.shift();
        for(const [dx, dy] of dir) {
            const row = x + dx;
            const col = y + dy;
            if(!validate(row, col, grid) ||  grid[row][col] === '#') continue;
            if(grid[row][col] === 1) {
                // reaches the second island
                return level;
            }
            grid[row][col] = '#'; // make it dirty to prevent revisiting (growing the first island)
            queue.push([row, col, level + 1]);
        }
    }
}