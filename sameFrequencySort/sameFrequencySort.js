// https://www.codewars.com/kata/5a8d2bf60025e9163c0000bc

arr = [2,3,5,3,7,9,5,3,7]; // ans is [3,3,3,5,5,7,7,2,9]

function solve(arr){
    const unique = [...new Set(arr)];
    const frequencies = unique.reduce((obj, key) => Object.assign(obj, {[key]: 0}), {}); 
    var sorted;

    arr.map((val) => frequencies[val]++); 

    sorted = Object.entries(frequencies)
        .sort((a, b) => b[1] - a[1] || a[0] - b[0]);
        
    return sorted.reduce((arr, val) => {
        for (var i = 0; i < val[1]; i++) {
            arr.push(Number(val[0]));
        }
        return arr;
    }, [])
}

console.log(solve(arr));
