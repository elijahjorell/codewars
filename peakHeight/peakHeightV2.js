const mountain = [
  "^^^^^^        ".split(''),
  " ^^^^^^^^     ".split(''),
  "  ^^^^^^^     ".split(''),
  "  ^^^^^       ".split(''),
  "  ^^^^^^^^^^^ ".split(''),
  "  ^^^^^^      ".split(''),
  "  ^^^^        ".split('')
];

var peakHeight = function(mountain) {
  let map = [].concat(mountain);
  let remaining = map.length * map[0].length;
  let z = 0;
  let surroundings, surroundingHeights;
  
  while (remaining > 0) {
    z++;
    for (let y = 0; y < map.length; y++) {
      for (let x = 0; x < map[y].length; x++) {
        // edges
        if (z === 1) {

          // blank
          if (map[y][x] === ' ') {
            remaining--;
          
          // not blank
          } else if (map[y][x] === '^') {
            
            // z = 1 w/ surroundings that go outside array
            try {
              surroundings = [
                mountain[y - 1][x],
                mountain[y + 1][x],
                mountain[y][x - 1],
                mountain[y][x + 1]
              ]
            } catch(err) {
              map[y][x] = '1';
              remaining--;
              continue;
            }

            // z = 1 w/ blank surroundings 
            if (surroundings.includes(' ')) {
              map[y][x] = '1';
              remaining--;
            }

          }
        
        // fill
        } else {
          if (map[y][x] === '^') {
            surroundings = [
              mountain[y - 1][x],
              mountain[y + 1][x],
              mountain[y][x - 1],
              mountain[y][x + 1]
            ]
            surroundingHeights = surroundings.filter(val => !isNaN(parseInt(val))).map(val => parseInt(val));

            if (surroundingHeights.length > 0 &&
                Math.min(...surroundingHeights) === z - 1) {
              map[y][x] = z.toString();
              remaining--;
            }
          }
        }
      }
    }
  }
  return z;
}

console.log(peakHeight(mountain));