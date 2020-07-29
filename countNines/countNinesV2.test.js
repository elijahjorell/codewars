function countNines(n) {
    let digits = n.toString().split('').map(Number);
    let digitsCount, digitPlace;
    let ninesCount = 0;

    for (let i = 0 ; i < digits.length; i++) {
        digitsCount = digits.length - i;
        digitPlace = Math.pow(10, digitsCount - 1);

        ninesCount += digits[i] * (digitsCount - 1) * digitPlace / 10;

        if (digits[i] === 9) {
            ninesCount += 1 + Number(digits.slice(i + 1, digits.length).map(String).join(''))
        }
    }
    return ninesCount;
}

// PROBLEM AT 1890's

// 1: 0
// 10: 1
// 100: 20
// 1000: 300
// 10000: 4,000
// 100000: 50,000
// 1000000: 600,000
// 10000000: 7,000,000
// 100000000: 80,000,000
// 1000000000: 900,000,000
// 10000000000: 1,000,000,000

for (let j = 800; j < 10001; j++) {
    console.log(j, countNines(j));
}

// countNines(1891);

// test('', () => {
//     expect(countNines(1)).toBe(0);
//     expect(countNines(9)).toBe(1);
//     expect(countNines(100)).toBe(20);
//     expect(countNines(565754)).toBe(275645);
//     expect(countNines(10000000000)).toBe(10000000000);
// })
