// https://www.codewars.com/kata/5263c6999e0f40dee200059d

function getPINs(observed) {
    const adjacents = {
        1: ['1', '2', '4'],
        2: ['1', '2', '3', '5'],
        3: ['2', '3', '6'],
        4: ['1', '4', '5', '7'],
        5: ['2', '4', '5', '6', '8'],
        6: ['3', '5', '6', '9'],
        7: ['4', '7', '8'],
        8: ['5', '7', '8', '9', '0'],
        9: ['6', '8', '9'],
        0: ['8', '0']
    };
    const digits = observed.split('').map((val) => {
        return adjacents[val];
    });
    var pins = digits[0];

    for (var i = 1; i < digits.length; i++) {
        pins = pins.map((val) => {
            return digits[i].map(function(val) {
                return this.val + val;
            }, {val:val});
        });
        pins = [].concat(...pins);
    }

    return pins;
}

console.log(getPINs('8'))