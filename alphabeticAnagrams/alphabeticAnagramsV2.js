// https://www.codewars.com/kata/53e57dada0cb0400ba000688

const word = 'SAVNAVYX'; // ans = 3926
// const word = 'AABA';

function listPosition(word) {
    var wordArr = word.split('');
    var letterBank = [... new Set(wordArr)].sort();
    var repetitionDivisor;
    
    return word.split('').reduce((acc, val, idx, arr) => {
        // get product of the factorials of repeated letters
        repetitionDivisor = getCountsOfRepeatedValues(wordArr).reduce((acc, val) => acc * factorial(val), 1)

        // add combinations
        acc += letterBank.indexOf(val) * factorial(wordArr.length - 1) / repetitionDivisor;
        
        console.log(wordArr, letterBank, val, letterBank.indexOf(val), repetitionDivisor, acc)

        // shift wordArr 
        wordArr.shift();

        // check if letters in letterBank are also in wordArr and remove if not
        if (wordArr.indexOf(val) === -1) {
            letterBank.splice(letterBank.indexOf(val), 1);
        }

        return acc;
    }, 0);
}

function getCountsOfRepeatedValues(arr) {
    var counts = arr.reduce((obj, key) => {
        obj[key] = obj[key] ? obj[key] + 1 : 1;
        return obj;
    }, {});

    return Object.values(counts).filter((val) => val > 1);
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

// listPosition(word);
// console.log(listPosition(word));

const wordA = 'BOOKKEEPER'.split('')

console.log([... new Set(wordA)].sort())