// https://www.codewars.com/kata/54521e9ec8e60bc4de000d6c

const arr = [-2, 1, -3, 4, -1, 2, 1, -5, 4]; // answer is 6: [4, -1, 2, 1]

function getMaxSequence(arr) {
    var max = 0;
    
    for (var i = 0; i < arr.length; i++) {
        let sums = [];
        for (var j = i + 1; j < arr.length + 1; j++) {
            sums.push(arr.slice(i, j).reduce((acc, cur) => acc + cur, 0));
        }
        if (Math.max(...sums) > max) {
            max = Math.max(...sums);
        }
    }

    return max;
}

console.log(getMaxSequence(arr));