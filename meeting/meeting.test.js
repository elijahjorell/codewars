const meeting = s => {
	const string = s.toUpperCase()
	const arr = string.split(';')

	for (var i = 0; i < arr.length; i++) {
		arr[i] = arr[i].split(':')[1] + ':' + arr[i].split(':')[0]
	}

	const sorted = [...arr].sort()

	for (var i = 0; i < sorted.length; i++) {
		sorted[i] =
			'(' + sorted[i].split(':')[0] + ', ' + sorted[i].split(':')[1] + ')'
    }


    const array = [... new Array(10)]
    const newArr = array.reduce((acc, curr, i, array) => {
        acc.push(curr)
        return acc
    }, 0)

	return sorted.join('')    
}

test('', () => {
	expect(
		meeting(
			'Alexis:Wahl;John:Bell;Victoria:Schwarz;Abba:Dorny;Grace:Meta;Ann:Arno;Madison:STAN;Alex:Cornwell;Lewis:Kern;Megan:Stan;Alex:Korn'
		)
	).toBe(
		'(ARNO, ANN)(BELL, JOHN)(CORNWELL, ALEX)(DORNY, ABBA)(KERN, LEWIS)(KORN, ALEX)(META, GRACE)(SCHWARZ, VICTORIA)(STAN, MADISON)(STAN, MEGAN)(WAHL, ALEXIS)'
	)
})
