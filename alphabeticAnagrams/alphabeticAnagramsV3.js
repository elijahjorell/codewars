// https://www.codewars.com/kata/53e57dada0cb0400ba000688

const word = 'BOOKKEEPER'; // ans = 10743
// const word = 'AABA';

function listPosition(word) {
    var wordArr = word.split('');
    var letterBank = [... new Set(wordArr)].sort();
    var lowerRankedLetters;
    var letterCounts;
    var repetitionDivisor;
    
    return 1 + word.split('').reduce((acc, val) => {
        letterCounts = wordArr.slice(1).reduce((obj, key) => {
            obj[key] = obj[key] ? obj[key] + 1 : 1;
            return obj;
        }, {});

        lowerRankedLetters = letterBank.slice(0, letterBank.indexOf(val));

        // for each lower ranked letter, add permutations to accumulator, factoring in repeated letters
        lowerRankedLetters.map(function(val) {
            letterCounts[this.val] = letterCounts[this.val] ? letterCounts[this.val] + 1 : 1
            letterCounts[val]--;

            repetitionDivisor = Object.values(letterCounts)
                .filter((val) => val > 1)
                .reduce((acc, val) => acc * factorial(val), 1);

            acc += factorial(wordArr.length - 1) / repetitionDivisor;

            letterCounts[val]++;
            letterCounts[this.val]--;
        }, {val: val})

        // remove first letter from wordArr and from letterBank if there are no more occurences 
        wordArr.shift();

        if (wordArr.indexOf(val) === -1) {
            letterBank.splice(letterBank.indexOf(val), 1);
        }

        return acc;
    }, 0);
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
console.log(listPosition(word));