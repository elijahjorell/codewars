// https://www.codewars.com/kata/58663693b359c4a6560001d6

const maze = [
    [1,1,1,1,1,1,1],
    [1,0,0,0,0,0,3],
    [1,0,1,0,1,0,1],
    [0,0,1,0,0,0,1],
    [1,0,1,0,1,0,1],
    [1,0,0,0,0,0,1],
    [1,2,1,0,1,0,1]
];
const directions = ["N","N","N","N","N","E","E","E","E","E"];

function mazeRunner(maze, directions) {
    const vectors = {
        'N': { x: 0, y: -1 },
        'E': { x: 1, y: 0 },
        'S': { x: 0, y: 1 },
        'W': { x: -1, y: 0 }
    };
    const position = { x: undefined, y: undefined };

    // set position to starting point
    for (var y = 0; y < maze.length; y++) {
        for (var x = 0; x < maze.length; x++) {
            if (maze[y][x] === 2) {
                position.x = x;
                position.y = y;
            }
        }
    }
    
    // update position with directions and return result
    for (var i = 0; i < directions.length; i++) {
        position.x += vectors[directions[i]].x;
        position.y += vectors[directions[i]].y;

        if (position.x < 0 || position.x >= maze.length ||
            position.y < 0 || position.y >= maze.length ||
            maze[position.y][position.x] === 1) {
            return 'Dead';
        } else if (maze[position.y][position.x] === 3) {
            return 'Finish';
        }
    }

    return 'Lost';
}

console.log(mazeRunner(maze, directions));