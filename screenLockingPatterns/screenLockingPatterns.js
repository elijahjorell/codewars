// https://www.codewars.com/kata/585894545a8a07255e0002f1

const firstPoint = 'E'; // answer = 37 
const patternLength = 4;

function countPatternsFrom(firstPoint, patternLength) {
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
    var possibleNextPoints;
    
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

    // determine possible patterns
    for (var i = 0; i < patternLength - 1; i++) {
        paths.map((pathVal, pathIdx, pathArr) => {
            possibleNextPoints = [].concat(Object.values(moves[pathVal.substr(pathVal.length - 1)]).filter((val) => val.length > 0));
                
            possibleNextPoints.filter(function(pointsVal, pointsIdx, pointsArr) {
                if (this.pathVal.includes(pointsVal[0])) {
                    pointsArr[pointsIdx].shift();
                }
                
                if (pointsArr[pointsIdx].length > 0) {
                    pointsArr[pointsIdx] = this.pathVal + pointsVal[0];
                    return true;                    

                }
            }, {pathVal: pathVal});

            pathArr[pathIdx] = possibleNextPoints;
        });
        paths = [].concat(...paths).filter((val) => val.length > 0);
    }

    console.log(moves)

    return paths.length;
}

function vectorAdd(arrA, arrB) {
    return arrA.map((val, idx) => val + arrB[idx]);
}

function getObjectKeyByArrayValue(object, value) {
    return Object.keys(object).find(key => JSON.stringify(object[key]) === JSON.stringify(value));
}

countPatternsFrom(firstPoint, patternLength);


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