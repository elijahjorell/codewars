function shortLong(a, b) {
	let short
	let long
	if (a.length > b.length) {
		long = a
		short = b
	} else {
		short = a
		long = b
	}
	return short + long + short
}

test('easy path', () => {
	expect(shortLong('45', '1')).toBe('1451')
})
