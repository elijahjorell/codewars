// https://www.codewars.com/kata/52742f58faf5485cae000b9a

function formatDuration(seconds) {
    const unitNames = ['seconds', 'minutes', 'hours', 'days', 'years'];
    const unitCapacities = [60, 60, 24, 365];
    const unitValues = [seconds];
    const sentence = [];

    // store remainder as current time unit value & use quotient as input for next time unit
    unitCapacities.map((val, idx) => {
        if (unitValues[idx] >= val) {
            unitValues.push(Math.floor(unitValues[idx] / val));
            unitValues[idx] = unitValues[idx] % val;
        }
    });

    // exclude 0 values if not last index & remove 's' for 1's
    unitValues.map((val, idx, arr) => {
        if (val !== 0) {
            sentence.push(val + ' ' + (arr[idx] === 1 ? unitNames[idx].substring(0, unitNames[idx].length - 1) : unitNames[idx]));
        }
    });

    if (sentence.length === 0) {
        return 'now';
    }

    // when > 1 time unit, add 'and' for last item only & ',' separator for others
    sentence.map((val, idx, arr) => {
        if (arr.length > 1) {
            if (idx === 0) {
                arr[idx] = ' and ' + val;
            } else if (idx !== 1) {
                arr[idx] = val + ', ';
            }
        }
    });

    return sentence.reverse().join('');
}

console.log(formatDuration(0));

