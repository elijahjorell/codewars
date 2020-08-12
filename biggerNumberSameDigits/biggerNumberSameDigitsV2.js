// https://www.codewars.com/kata/55983863da40caa2c900004e

n = 5086 // answer = 2071

function nextBigger(n) {
    const digits = String(n).split('');
    const answers = [];
    
    for (var i = digits.length - 1; i >= 0; i--) {
        for (var j = 1; j <= i; j++) {
            if (digits[i] > digits[i - j]) {
                answers.push(Number(swapIndicesReturnNewArray(i, i - j, digits).join('')));
            }
        }
    }

    return Math.min(...answers);
}

function swapIndicesReturnNewArray(idxA, idxB, arr) {
    const arrCopy = [].concat(arr);
    [arrCopy[idxA], arrCopy[idxB]] = [arrCopy[idxB], arrCopy[idxA]];
    return arrCopy;
}

// starting from last index and working backwards, find first index where it is larger than the next index

// 1234
// 1243
// 1432
// 4231

// 1324
// 3214

// 2134

// nextBigger(n)
console.log(nextBigger(n));
