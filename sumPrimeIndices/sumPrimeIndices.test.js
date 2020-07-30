// https://www.codewars.com/kata/59f38b033640ce9fc700015b

function sumPrimeIndices(arr) {
    return arr.reduce((acc, curr, idx) => {
        if (isPrime(idx)) {
            acc += curr;
        }
        return acc;
    }, 0)
}

function isPrime(val) {
    for (let i = 2; i < val; i++) {
        if (val % i === 0) {
            return false
        }
    }
    return val > 1;
}

// console.log(isPrime(1));
console.log(sumPrimeIndices([1, 2, 3]));