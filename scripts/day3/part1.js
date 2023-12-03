const input = require("./part1.input");

const inputTest = `
12.......*..
+.........34
.......-12..
..78........
..*....60...
78..........
.......23...
....90*12...
............
2.2......12.
.*.........*
1.1.......56`;

const lines = input.split("\n");

function isSymbol(line, charIndex) {
  return !/(\d|\.)/.test(line.charAt(charIndex));
}

function checkNeighboursSymbol(lineIndex, charIndex) {
  if (
    lineIndex > 0 &&
    checkNeighoursContainsSymbolInLine(lines[lineIndex - 1], charIndex)
  ) {
    return true;
  }
  if (checkNeighoursContainsSymbolInLine(lines[lineIndex], charIndex)) {
    return true;
  }
  if (
    lines.length > lineIndex + 1 &&
    checkNeighoursContainsSymbolInLine(lines[lineIndex + 1], charIndex)
  ) {
    return true;
  }
  return false;
}

function checkNeighoursContainsSymbolInLine(line, charIndex) {
  if (charIndex > 0 && isSymbol(line, charIndex - 1)) {
    return true;
  }
  if (isSymbol(line, charIndex)) {
    return true;
  }
  if (line.length > charIndex + 1 && isSymbol(line, charIndex + 1)) {
    return true;
  }
  return false;
}

const partNumbers = [];

// Iterate over each character. If it is a number, check the neighbours for a symbol.
// If symbol is found, go forwar to the next . and then to the next number and repeat
lines.forEach((l, lineIndex) => {
  let skipCurrentNumber = false;
  let currentNumber = "";
  for (let i = 0; i < l.length; i++) {
    const char = l.charAt(i);
    const isNumber = /\d/.test(char);
    if (!skipCurrentNumber && isNumber) {
      // This is number, check the neighbours
      // set skipCurrentNumber to true, if a neighbour is a symbol
      currentNumber += char;
      if (checkNeighboursSymbol(lineIndex, i)) {
        skipCurrentNumber = true;
      }
    } else if (!isNumber) {
      if (skipCurrentNumber && currentNumber) {
        partNumbers.push(+currentNumber);
      }
      currentNumber = "";
      skipCurrentNumber = false;
    } else if (l.length === i + 1) {
      partNumbers.push(+`${currentNumber}${char}`);
    } else {
      currentNumber += char;
    }
  }
});

console.log(partNumbers);
console.log(partNumbers.reduce((total, v) => total + v));
