function countNines(n) {
    const percentages = {
        1: 1,
        10: 10,
        100: 20, //200 * 20%
        1000: 30, //4000 * 30%
        10000: 40,
        //53,000
        100000: 50,
        1000000: 60,
        10000000: 70,
        100000000: 80,
        1000000000: 90,
        10000000000: 100,
        100000000000: 1000,
    }
    const percentagesArr = Object.entries(percentages).reverse()

    // find digits place
    // see how many times that smaller num fits into 
    // amount of times * smaller num then subtract that from n
    // continue down array

    let count = 0

    for (let i = 0; i < percentagesArr.length; i++) {
        if (percentagesArr[i][0] <= n) {
            const leadingDigit = Math.floor(n / percentagesArr[i][0])
            const numToSubtract = percentagesArr[i][0] * leadingDigit
            n = n - numToSubtract
            count += numToSubtract * percentagesArr[i][1] / 100

            // if ()
        }
    }

    return Math.round(count)
}

test('', () => {
    // expect(countNines(565754)).toBe(275645)
    expect(countNines(100)).toBe(20)

})
