// https://www.codewars.com/kata/521c2db8ddc89b9b7a0000c1

const arr = [[1, 2, 3], 
             [4, 5, 6], 
             [7, 8, 9]]; // ans: [1, 2, 3, 6, 9, 8, 7, 4, 5]

function snailSort(arr) {
    const directions = {
        right: {x: 1, y: 0},
        down: {x: 0, y: 1},
        left: {x: -1, y: 0},
        up: {x: 0, y: -1}
    };
    var bounds = {
        yUp: 0,
        yDown: arr.length - 1,
        xRight: arr[0].length - 1,
        xLeft: 0,
    };
    var position = {
        x: bounds.xLeft,
        y: bounds.yUp
    };
    var arrSorted = [];
    var currentDirection;

    for (var i = 0; i < arr.length * arr[0].length; i++) {
        arrSorted.push(arr[position.y][position.x]);

        if (position.x === bounds.xLeft && position.y === bounds.yUp) {
            currentDirection = 'right';
        } else if (position.x === bounds.xRight && position.y === bounds.yUp) {
            currentDirection = 'down';
        } else if (position.x === bounds.xRight && position.y === bounds.yDown) {
            currentDirection = 'left';
        } else if (position.x === bounds.xLeft && position.y === bounds.yDown) {
            currentDirection = 'up';
        } else if (position.x === bounds.xLeft && position.y === bounds.yUp + 1) {
            currentDirection = 'right';
            bounds.yUp++;
            bounds.yDown--;
            bounds.xRight--;
            bounds.xLeft++;
        }

        position.x += directions[currentDirection].x;
        position.y += directions[currentDirection].y;
    }

    return arrSorted;
}

console.log(snailSort(arr));