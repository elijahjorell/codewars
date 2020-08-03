// https://www.codewars.com/kata/5526fc09a1bbd946250002dc

const integers = [2, 4, 0, 100, 4, 11, 2602, 36]; // answer is 11

function findOutlier(integers) {
    return integers[integers
        .map((val) => val % 2 === 0)
        .reduce((acc, val, idx, arr) => {
            if (arr.lastIndexOf(val) === arr.indexOf(val)) {
                acc = idx;
            }
            return acc;
        }, 0)
    ];
}

// better solution

/*
function findOutlier(int){
  var even = int.filter(a=>a%2==0);
  var odd = int.filter(a=>a%2!==0);
  return even.length==1? even[0] : odd[0];
}
*/

console.log(findOutlier(integers));