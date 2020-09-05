// https://www.codewars.com/kata/51b62bf6a9c58071c600001b

function solution(number) {
    const digitSymbolIndices = {
        0: [0],
        1: [1],
        2: [1, 1],
        3: [1, 1, 1],
        4: [1, 2],
        5: [2],
        6: [2, 1],
        7: [2, 1, 1],
        8: [2, 1, 1, 1],
        9: [1, 3],
        10: [3]
    };
    const placeSymbols = {
        0: ['', 'I', 'V', 'X'],
        1: ['', 'X', 'L', 'C'],
        2: ['', 'C', 'D', 'M'],
        3: ['', 'M']
    };

    return String(number).split('').reverse().map((digit, place) => {
        return digitSymbolIndices[digit].map((symbolIndex) => {
            return placeSymbols[place][symbolIndex];
        }).join('');
    }).reverse().join('');
}

console.log(solution(1000));