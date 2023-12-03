const input = require("./part1.input");

const inputTest = `
467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`;

const lines = input.split("\n");

function isGear(line, charIndex) {
  return /(\*)/.test(line.charAt(charIndex));
}

function checkNeighboursGear(lineIndex, charIndex) {
  let colIndex = -1;
  let rowIndex = -1;
  if (lineIndex > 0) {
    rowIndex = lineIndex - 1;
    colIndex = checkNeighoursContainsGearInLine(lines[rowIndex], charIndex);
  }
  if (colIndex === -1) {
    rowIndex = lineIndex;
    colIndex = checkNeighoursContainsGearInLine(lines[lineIndex], charIndex);
  }
  if (lines.length > lineIndex + 1 && colIndex === -1) {
    rowIndex = lineIndex + 1;
    colIndex = checkNeighoursContainsGearInLine(lines[rowIndex], charIndex);
  }
  return colIndex === -1 ? null : [rowIndex, colIndex];
}

function checkNeighoursContainsGearInLine(line, charIndex) {
  if (charIndex > 0 && isGear(line, charIndex - 1)) {
    return charIndex - 1;
  }
  if (isGear(line, charIndex)) {
    return charIndex;
  }
  if (line.length > charIndex + 1 && isGear(line, charIndex + 1)) {
    return charIndex + 1;
  }
  return -1;
}

// Lets store all found gears (*) in a map and store the neighbouring numbers
const gearMap = new Map();
lines.forEach((l, lineIndex) => {
  let skipCurrentNumber = false; // Skipping worked with my input. Not sure if it would work with every input
  let currentNumber = ""; // This will hold the full number once a character that is not a number is hit
  let currentGearPos = null; // Current gear position (need to keep track of it in order to store the current number in its array)
  for (let i = 0; i < l.length; i++) {
    const char = l.charAt(i);
    const isNumber = /\d/.test(char);
    // We skip numbers, that already have neighbouring gears
    if (!skipCurrentNumber && isNumber) {
      currentNumber += char; // Add the current digit to the number string
      const gearPos = checkNeighboursGear(lineIndex, i); // Find out if a gear borders this number
      if (gearPos) {
        // Found a gear
        skipCurrentNumber = true; // So skip the rest of that number
        if (!gearMap.has(gearPos.join(""))) {
          // Add new gear to the map only if necessary
          gearMap.set(gearPos.join(""), []);
        }
        // store the gearposition
        currentGearPos = gearPos;
      }
      // We hit a non digit character
    } else if (!isNumber) {
      // If we skip the current number, we found a gear, so store this number to its array
      if (skipCurrentNumber && currentNumber) {
        gearMap.get(currentGearPos.join("")).push(currentNumber);
      }
      // Reset values
      currentGearPos = null;
      currentNumber = "";
      skipCurrentNumber = false;
      // We are at the end of the line with a number that has a gear. We need to store that number as it is finished here
    } else if (l.length === i + 1 && currentGearPos) {
      const num = +`${currentNumber}${char}`;
      gearMap.get(currentGearPos.join("")).push(num);
    } else {
      currentNumber += char;
    }
  }
});

const gears = [...gearMap.values()];
console.log(
  gears
    // Now filter out all gears that do not fit the criteria of neighbouring exactly two numbers
    .filter((g) => g.length === 2)
    // Now multiply both values
    .map((g) => g[0] * g[1])
    // And create a sum
    .reduce((total, e) => total + e)
);
