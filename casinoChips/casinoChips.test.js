function solve(arr) {
    let acc = 0;
    
    arr.sort((a, b) => {return b - a});
    
    acc += arr[2];
    arr[0] -= arr[2];
    arr[2] = 0;

    arr.sort((a, b) => {return b - a});

    acc += arr[1];
    arr[0] -= arr[1];
    arr[1] = 0
    
    console.log(acc);
    return acc;
}

testAnswers = [
    [1,1,1],
    [1,2,1],
    [4,1,1],
    [8,2,8],
    [8,1,4],
    [7,4,10],
    [12,12,12],
    [1,23,2]
]

testAnswers.forEach(solve);
