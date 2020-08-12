// https://www.codewars.com/kata/55983863da40caa2c900004e

n = 625876 // answer = 2071

function nextBigger(n) {
    const digits = String(n).split('');
    var subDigits;
    var firstSubDigit;
    var firstSubDigitNextLargest;
    var ans = -1;

    for (var i = digits.length - 1; i > 0; i--) {
        if (digits[i] > digits[i - 1]) {
            subDigits = digits.splice(i - 1);
            firstSubDigit = subDigits[0];
            firstSubDigitNextLargest = subDigits.filter(val => val > firstSubDigit).sort()[0];
            subDigits.sort();
            subDigits.unshift(...subDigits.splice(subDigits.indexOf(firstSubDigitNextLargest), 1))
            ans = Number(digits.concat(subDigits).join(''));
            break;
        }
    }

    return ans;
}


// nextBigger(n);

console.log(nextBigger(n));