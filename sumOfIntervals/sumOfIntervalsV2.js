// https://www.codewars.com/kata/52b7ed099cdc285c300001cd

const intervals = [[1, 4], [7, 10], [3, 5]];

function sumIntervals(intervals) {
    var newIntervals = [].concat(intervals);
    var pairs = [];
    var k = 0;
    var reset = false;

    while (true) {
        console.log(newIntervals)
        for (var i = 0; i < newIntervals.length; i++) {
            for (var j = i + 1; j < newIntervals.length; j++) {
                pairs.push([newIntervals[i],newIntervals[j]].sort((a, b) => a[0] - b[0]));
            }
        }
    
        while (k < pairs.length) {
            if (checkOverlap(pairs[k])) {
                pairs[k].map((val) => {
                    newIntervals.splice(newIntervals.indexOf(val), 1);
                });
                newIntervals.push([pairs[k][0][0], pairs[k][1][1]])
                pairs.splice(k, 1);
                k = -1;
                reset = true;
            }
            k++
        }

        if (!reset) {
            break;
        } else {
            reset = false;
            pairs = [];
        }
    }

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

sumIntervals(intervals);