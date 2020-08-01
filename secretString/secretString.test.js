// https://www.codewars.com/kata/53f40dff5f9d31b813000774

triplets = [ // answer is whatisup
    ['t','u','p'],
    ['w','h','i'],
    ['t','s','u'],
    ['a','t','s'],
    ['h','a','p'],
    ['t','i','s'],
    ['w','h','s']
]

function recoverSecret(triplets) {
    const letters = [... new Set([].concat(...triplets))]
                        .reduce((acc, val) => {
                            acc[val] = [];
                            return acc;
                        }, {});
    const secret = [];
    
    // for each letter, record what other letters occur before it in the same triplet
    triplets.map((val) => {
        val.map((val, idx, arr) => {
            if (idx > 0) {
                letters[val].push(...arr.slice(0, idx));
            }
        })
    });

    // letter with no other letters before it is the next letter, filter out letters already in secret string 
    while (secret.length < Object.keys(letters).length) {
        for (var key of Object.keys(letters)) {
            letters[key] = letters[key].filter((val) => {return !secret.includes(val)});
            if(letters[key].length === 0 && !secret.includes(key)) {
                secret.push(key);
            }
        }
    }
    
    return secret.join('');
}

console.log(recoverSecret(triplets));