function solve(arr) {
	return arr.reduce((acc, curr) => {
		const opposite = curr * -1
		if (!arr.includes(opposite)) {
			acc = curr
		}
		return acc
	}, 0)
}

// loop through array, for each element

test('', () => {
	expect(solve([1, -1, 2, -2, 3])).toBe(3)
})
