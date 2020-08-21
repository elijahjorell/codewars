// https://www.codewars.com/kata/585894545a8a07255e0002f1

function countPatternsFrom(firstPoint, length) {
    const grid = [
        ['A', 'B', 'C'],
        ['D', 'E', 'F'],
        ['G', 'H', 'I']
    ];
    const directions = {
        N:      [0, -1],
        NNE:    [1, -2],
        NE:     [1, -1],
        ENE:    [2, -1],
        E:      [1, 0],
        ESE:    [2, 1],
        SE:     [1, 1],
        SSE:    [1, 2],
        S:      [0, 1],
        SSW:    [-1, 2],
        SW:     [-1, 1],
        WSW:    [-2, 1],
        W:      [-1, 0],
        WNW:    [-2, -1],
        NW:     [-1, -1],
        NNW:    [-1, -2],
    };
    const coordinates = {};
    const moves = {};
    var proposedCoordinate;
    var paths = [firstPoint];
    
    // set coordinates of points
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            coordinates[grid[y][x]] = [x, y];
            moves[grid[y][x]] = {};
        }
    }

    // determine possible moves at each point
    for (let [point, movesObj] of Object.entries(moves)) {
        for (let [direction, vector] of Object.entries(directions)) {
            movesObj[direction] = [];
            proposedCoordinate = coordinates[point];
            for (let i = 0; i < 2; i++) {
                proposedCoordinate =  vectorAdd(proposedCoordinate, vector);
                if (proposedCoordinate[0] >= 0 &&
                    proposedCoordinate[0] <= 2 &&
                    proposedCoordinate[1] >= 0 &&
                    proposedCoordinate[1] <= 2) {
                        movesObj[direction].push(getObjectKeyByArrayValue(coordinates, proposedCoordinate));
                }
            }
        }
    }

    console.log(path)
}

function vectorAdd(arrA, arrB) {
    return arrA.map((val, idx) => val + arrB[idx]);
}

function getObjectKeyByArrayValue(object, value) {
    return Object.keys(object).find(key => JSON.stringify(object[key]) === JSON.stringify(value));
}

countPatternsFrom();


/*
[
    [[0, 0], [0, 1], [0, 2]],
    [[1, 0], [1, 1], [1, 2]],
    [[2, 0], [2, 1], [2, 2]],
]
*/

// horizontal
// vertical
// diagonal
// diagonal (L variant)