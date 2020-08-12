// https://www.codewars.com/kata/57b06f90e298a7b53d000a86

const customers = [1, 2, 3, 4];
const n = 1;

function queueTime(customers, n) {
    const tills = new Array(n).fill(0);
    var empty;
    var totalTime = 0;
    var min;

    while (true) {
        // count # of empty tills & replace any completed till (if === 0) with next customer
        empty = tills.reduce((acc, val, idx, arr) => {
            if (val === 0) {
                if (customers.length > 0) {
                    arr[idx] = customers.shift();
                } else {
                    acc++
                }
                return acc;
            }
        }, 0);
        
        // exit loop if all tills are empty
        if (empty === n) {
            break;
        }
        
        // get fastest customer time
        min = Math.min(...tills.filter(val => val > 0));

        // add fastest customer time to total time
        totalTime += min;

        // subtract every till by fastest customer time
        tills.map((val, idx, arr) => {
            if (val > 0) {
                arr[idx] = val - min;
            }
        });
    }
    return totalTime;
}

console.log(queueTime(customers, n));