// https://www.codewars.com/kata/554ca54ffa7d91b236000023

const arr = [20, 37, 20, 21];
const n = 1; // ans = [20, 37, 21]

function deleteNth(arr, n) {
    return arr.reduce((data, val) => {
        data.count[val] = data.count[val] ? data.count[val] + 1 : 1;
        if (data.count[val] <= n) {
            data.newArr.push(val);
        }
        return data;
    }, { count: {}, newArr: [] }).newArr;
}

console.log(deleteNth(arr, n));