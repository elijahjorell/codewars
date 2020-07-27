const peakHeight = (mountain) => {
    const p = '^'
    const birdsView = []

    const checkSurroundings = (up, down, left, right) => {
        let val
        const arr = [up, down, left, right]

        switch(arr) {
            case arr.includes(null):
                val = 1;
            default:
                val = 1
        }

        return val
    }

    for (let y = 0; y < mountain.length; y++) {
        // pass surroundings to checkSurroundings
        for (let x = 0; x < mountain[y].length; x++) {
            // pass up, down, left, right
            if (mountain[y][x] === p) {
              let up
              let down
                let left
            let right
            let num
            
              try {
                up = mountain[y - 1][x] ? mountain[y - 1][x] : null 
                down = mountain[y + 1][x] ? mountain[y + 1][x] : null 
                left = mountain[y][x - 1] ? mountain[y - 1][x - 1] : null 
                right = mountain[y][x + 1] ? mountain[y][x + 1] : null 
              } catch(err) {
                num = 1
              }
                if (!num) {
                    num = checkSurroundings(up, down, left, right)
                }
                
                birdsView.push(num)
            } else {
                birdsView.push(' ')
            }
        }
    }

    return birdsView
}

test('', () => {
    expect().toBe()
})

var mountain = [
    "^^^^^^        ".split(''),
    " ^^^^^^^^     ".split(''),
    "  ^^^^^^^     ".split(''),
    "  ^^^^^       ".split(''),
    "  ^^^^^^^^^^^ ".split(''),
    "  ^^^^^^      ".split(''),
    "  ^^^^        ".split('')
];
