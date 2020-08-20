// https://www.codewars.com/kata/58c5577d61aefcf3ff000081

// const decoded = 'WEAREDISCOVEREDFLEEATONCE';
// const encoded = 'WECRLTEERDSOEEFEAOCAIVDEN';

const decoded = 'Hello, World!';
const encoded = 'Hoo!el,Wrdl l';

function encodeRailFenceCipher(string, numberRails) {
    var stringArr = string.split('');
    var rails = {};
    var currentRail = 0;
    var direction = -1;

    stringArr.map((val) => {
        if (rails[currentRail]) {
            rails[currentRail].push(val);
        } else {
            rails[currentRail] = [val];
        }

        if (currentRail === 0 || currentRail === numberRails - 1) {
            direction *= -1;
        }

        currentRail += direction;
    });
        
    return Object.values(rails)
        .reduce((acc, val) => acc.concat(val), [])
        .join('');
}

function decodeRailFenceCipher(string, numberRails) {
    var stringArr = string.split('');
    var rails = {};
    var currentRail = 0;
    var direction = -1;
    var decoded = [];
    
    for (var i = string.length; i > 0; i--) {
        if (rails[currentRail] === undefined) {
            rails[currentRail] = 1;
        } else {
            rails[currentRail]++;
        }

        if (currentRail === 0 || currentRail === numberRails - 1) {
            direction *= -1;
        }

        currentRail += direction;
    }
    
    for (key in Object.keys(rails)) {
        rails[key] = stringArr.splice(0, rails[key]);
    }
    
    currentRail = 0;
    direction = -1;

    for (i = string.length; i > 0; i--) {
        decoded.push(rails[currentRail].splice(0, 1))

        if (currentRail === 0 || currentRail === numberRails - 1) {
            direction *= -1;
        }

        currentRail += direction;
    }

    return decoded.join('');
}

// console.log(encodeRailFenceCipher(decoded, 3))
decodeRailFenceCipher(encoded, 3);