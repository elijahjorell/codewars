// https://www.codewars.com/kata/5671d975d81d6c1c87000022

const clues = [
    2, 2, 1, 3,
    2, 2, 3, 1,
    1, 2, 2, 3,
    3, 2, 1, 3
];

const ans = [
    [1, 3, 4, 2],
    [4, 2, 1, 3],
    [3, 4, 2, 1],
    [2, 1, 3, 4]
];

function solvePuzzle (clues) {
    const grid = Array(4).fill(Array(4).fill(0));
    const cluesX = [[0, 11], [1, 10], [2, 9], [3, 8]]
    const cluesY = [[4, 15], [5, 14]]

    grid.map((val) => { console.log(val); });
}

solvePuzzle(clues);
