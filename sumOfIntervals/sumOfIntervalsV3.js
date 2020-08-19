// https://www.codewars.com/kata/52b7ed099cdc285c300001cd

const intervals = [[1, 4], [7, 10], [3, 5]];

function sumIntervals(intervals) {
    var currentIntervals = [].concat(intervals);
    var reset;
    var pair;
    var spread;
    
    while (true) {
        reset = false;
        for (var i = 0; i < currentIntervals.length; i++) {
            for (var j = i + 1; j < currentIntervals.length; j++) {
                pair = [currentIntervals[i], currentIntervals[j]].sort((a, b) => a[0] - b[0]);
                spread = [].concat(...pair).sort((a, b) => a - b);
                
                if (pair[0][1] === spread[3] || // interval A encapsulates interval B
                    pair[0][1] === pair[1][0] || // interval A and interval B touch
                    pair[0][1] !== spread[1]) { // interval A and interval B overlap
                        currentIntervals.push([spread[0], spread[3]]);
                        pair.map((val) => { currentIntervals.splice(currentIntervals.indexOf(val), 1) });
                        reset = true;
                        i = currentIntervals.length;
                        j = currentIntervals.length;
                }
            }
        }
        if (!reset) {
            break;
        }
    }

    return currentIntervals.reduce((acc, val) => {
        acc += val[1] - val[0];
        return acc
    }, 0)
}

sumIntervals(intervals);