function whoIsWinner(arr) {
    // https://www.codewars.com/kata/56882731514ec3ec3d000009/train/javascript

    // goes first
    const odd = arr[0].split('_')[1];
    const moves = arr.map((i) => {
        return i.split('_')[0]
    })

    const objColumns = {
        A: 0,
        B: 0,
        C: 0,
        D: 0,
        E: 0,
        F: 0,
        G: 0,
    }

    const spaces = [...new Array(42).fill(null)]

    function spacesToCoords(space) {

    }

    // X X X X X X X
    // X X X X X X X
    // X X X 0 X X X
    // X X 2C X X X X
    // X 0 X X X X X
    // 0 X X X X X X

    // up down left right top-left top-right bottom-left bottom-right

    for (var i = 0; i < moves.length; i++) {
        objColumns[moves[i]]++
    }

    // create grid of possible spaces - array indexes
    // convert the indexes to coordinates
    // check for 4 in a row

    console.log(objColumns)
    // states of column

    // console log states
}

test('', () => {
    expect(whoIsWinner(["C_Yellow",
        "E_Red",
        "G_Yellow",
        "B_Red",
        "D_Yellow",
        "B_Red",
        "B_Yellow",
        "G_Red",
        "C_Yellow",
        "C_Red",
        "D_Yellow",
        "F_Red",
        "E_Yellow",
        "A_Red",
        "A_Yellow",
        "G_Red",
        "A_Yellow",
        "F_Red",
        "F_Yellow",
        "D_Red",
        "B_Yellow",
        "E_Red",
        "D_Yellow",
        "A_Red",
        "G_Yellow",
        "D_Red",
        "D_Yellow",
        "C_Red"])).toBe("Yellow")
})
