// https://www.codewars.com/kata/52b7ed099cdc285c300001cd

const intervals = [[1, 4], [7, 10], [3, 5]];

function sumIntervals(intervals) {
    var pairs = [];
    var usedIntervals = [];
    var newIntervals = [];
    var k = 0;

    for (var i = 0; i < intervals.length; i++) {
        for (var j = i + 1; j < intervals.length; j++) {
            pairs.push([intervals[i],intervals[j]].sort((a, b) => a[0] - b[0]));
        }
    }

    while (k < pairs.length) {
        if (checkOverlap(pairs[k])) {
            usedIntervals = usedIntervals.concat(pairs[k]);
            newIntervals.push([pairs[k][0][0], pairs[k][1][1]]);
            pairs.splice(k, 1);
            k = -1;
        }
        k++;
    }

    newIntervals = newIntervals.concat([... new Set([].concat(...pairs))].filter((val) => !usedIntervals.includes(val)));

    return newIntervals.reduce((acc, val) => {
        acc += val[1] - val[0];
        return acc
    }, 0)   
}

function checkOverlap(intervalPair) {
    return intervalPair[0].reduce((acc, val) => {
        if (val >= intervalPair[1][0] && val <= intervalPair[1][1]) {
            acc = true;
        }
        return acc;
    }, false);
}

console.log(sumIntervals(intervals));