// https://www.codewars.com/kata/54eb33e5bc1a25440d000891

n = 7; // answer is [2, 3, 6]
// n = 11; // answer is [1, 2, 4, 10]

function decompose(n) {
    var remainder = square(n) - square(n - 1);
    var nextRoot;
    var roots = [n - 1]

    while (Math.floor(remainder) > 0) {
        nextRoot = Math.floor(squareRoot(remainder));
        remainder -= square(nextRoot);
        roots.push(nextRoot)
    } 

    return roots.sort((a, b) => a - b);
}

function square(n) {
    return Math.pow(n, 2);
}

function squareRoot(n) {
    return Math.pow(n, 1 / 2);
}

console.log(decompose(n));



