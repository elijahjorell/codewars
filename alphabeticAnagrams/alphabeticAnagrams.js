// https://www.codewars.com/kata/53e57dada0cb0400ba000688

const word = 'SAVNAVYX'; // ans = 3926
// const word = 'AABA';

function listPosition(word) {
    var wordArr = [].concat(word.split(''));
    var bank = [... new Set(wordArr)].sort();
    var wordSlice;
    var repeats;
    var divisor;

    return wordArr.reduce((acc, val, idx, arr) => {
        wordSlice = wordArr.slice(idx + 1);
        repeats = {};
        wordSlice.map((val) => { repeats[val] = (repeats[val] || 0) + 1; });
        divisor = Object.values(repeats).reduce((acc, val) => {
            if (val > 1) {
                acc *= factorial(val)
            }
            return acc;
        }, 1);

        acc += bank.indexOf(val) * factorial(arr.length - idx - 1) / divisor;
        
        if (wordSlice.indexOf(val) === -1) {
            bank.splice(bank.indexOf(val), 1);
        }
        
        return acc;
    }, 0) + 1;
}

function factorial(n) {
    var product = n;
    if (n === 0 || n === 1) {
        return 1;
    } else {
        for (var i = n - 1; i > 1; i--) {
            product *= i;
        }
    }
    return product;
}

// listPosition(word)
console.log(listPosition(word));