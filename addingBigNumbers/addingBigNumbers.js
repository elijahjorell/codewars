// https://www.codewars.com/kata/525f4206b73515bffb000b21

// const a = "63829983432984289347293874";
// const b = "90938498237058927340892374089";
const a = "1372";
const b = "69";

// account for different digit length

function add(aStr, bStr) {
    var a = aStr.split('').reverse();
    var b = bStr.split('').reverse();
    var sum = [];
    var carryOver = [0];
    var digitSum;
    var i = 0;

    while (i < a.length || i < b.length) {
        digitSum = Number(a[i] === undefined ? 0 : a[i]) + Number(b[i] === undefined ? 0 : b[i]);
        if (digitSum >= 10) {
            digitSum -= 10;
            carryOver.push(1);
        } else {
            carryOver.push(0);
        }
        sum.push(String(digitSum + carryOver[i]));
        i++;
    }

    sum.reverse();
    if (sum[0] === '0') {
        sum.shift();
    }

    return sum.join('');
}

add(a, b);
