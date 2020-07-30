// https://www.codewars.com/kata/550f22f4d758534c1100025a

var arr = ["NORTH", "SOUTH", "EAST", "WEST", "EAST", "WEST"];

function dirReduct(arr) {
    var redo = false;
    while (arr.length > 0) {
        for (let i = 0; i < arr.length; i++) {
            if ((arr[i] === 'NORTH' && arr[i + 1] === 'SOUTH') ||
                (arr[i] === 'SOUTH' && arr[i + 1] === 'NORTH') ||
                (arr[i] === 'EAST' && arr[i + 1] === 'WEST') || 
                (arr[i] === 'WEST' && arr[i + 1] === 'EAST')) {
                redo = true;
                arr.splice(i, 2);
                break;
            } else {
                redo = false;
            }
        }
        if (!redo) {
            break;
        }
    }
    return arr;
}

dirReduct(arr);
console.log(arr);

// console.log(arr)
