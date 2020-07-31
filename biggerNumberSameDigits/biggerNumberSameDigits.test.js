// https://www.codewars.com/kata/55983863da40caa2c900004e

const n = 414;

function biggerNumberSameDigits(n) {
    const digits = String(n).length > 1 ? String(n).split('') : [String(n)];
    var digitsFiltered;
    var numbers = [...digits];

    for (var i = 0; i < digits.length - 1; i++) {
        numbers.map(function(val, idx, arr) {
            digitsFiltered = digits.filter(function(val) {
                return this.val.length > 1 ? !this.val.includes(val) : this.val !== val;
            }, {val: val})
            arr[idx] = digitsFiltered.map(function(val) {return this.val + val}, {val: val});
        })
        if (digitsFiltered.length === 0) {
            return n;
        }
        numbers = [].concat(...numbers);
    }

    // numbers = [... new Set(numbers)].map(Number).sort()
    
    return numbers;
}

console.log(biggerNumberSameDigits(n));