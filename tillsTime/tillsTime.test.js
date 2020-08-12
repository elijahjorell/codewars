function queueTime(customers, n) {
    const sumArr = (arr) => {
        return arr.reduce((acc, curr) => {
            return acc += curr
        }, 0)
    }

    if (n === 1) {
        return sumArr(customers)
    } else if (n >= customers.length) {
        return Math.max(...customers)
    }

    let counter = 0
    let nArr = [...new Array(n).fill(0)]

    while (true) {
        nArr[nArr.indexOf(0)] = customers.shift()
        const allnFull = nArr.every((num) => num > 0)
        if (allnFull) {
            const smallest = nArr.sort((a, z) => a - z)[0]
            nArr = nArr.map(num => num - smallest)
            counter += smallest
        }

        if (customers.length <= 0) {
            break;
        }
    }

    return counter

}

// console.log(nArr)

// ---STEPS---
// DONE - create n
// DONE - first iteration, distribute the the first items into the n
// DONE - number that is least or equal to
// DONE - subtract least number from everything
// DONE - add least number to counter
// DONE - while looping, replace 0's with next items in array
// DONE - when all numbers are done, return counter

// [  ,  ,  ,  ,  ,  ]


//       | |   
//       | |   
//       | |   
//       | |   
// _____     _____
// | T |     | T |

// make array with length n

// [2, 3]
// [5, 1]
// [4, 3]

// [0, 0, 0]
// [2, 2, 3]

test('', () => {
    expect(queueTime([1, 2, 3, 4, 5], 100)).toBe(5)
})