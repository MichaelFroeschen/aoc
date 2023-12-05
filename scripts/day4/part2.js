const input = require("./part1.input");

const inputTest = `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`;

const lines = input.split("\n");

// The solution for this part is VERY simple and primitive, but it works and is fairly fast
// This may also be solved with backtracking, but i couldnt be bothered with that 😉

// Store the amount of cards in this array
// We will increase the amount for each copy we win and sum it up at the end
const cardCount = "1"
  .repeat(lines.length)
  .split("")
  .map((s) => +s);
lines.forEach((line, lineIndex) => {
  const [card, values] = line.split(":");
  // Simplified version of part 1
  const numbers = [...values.trim().matchAll(/\d+/g)];
  const set = new Set(numbers.map((r) => +r[0]));
  let winningCount = numbers.length - set.size;
  // For each recorded copy of this card ...
  for (let copyIndex = 0; copyIndex < cardCount[lineIndex]; copyIndex++) {
    // Add new copies to the cards we won
    for (
      let newCopiesIndex = lineIndex + 1;
      newCopiesIndex < lineIndex + winningCount + 1;
      newCopiesIndex++
    ) {
      cardCount[newCopiesIndex]++;
    }
  }
});
// Sum up all card counts
console.log(cardCount.reduce((total, value) => total + value));
