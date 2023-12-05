const input = require("./part1.input");

const inputTest = `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`;

const lines = input.split("\n");

const map = new Map();
const results = [];

lines.forEach((l) => {
  const [card, values] = l.split(":");
  map.set(card, values.split("|"));
});

for (const card of map.keys()) {
  const [numString, winString] = map.get(card);
  const numbers = [...numString.trim().matchAll(/\d+/g)].map((r) => +r[0]);
  const winners = [...winString.trim().matchAll(/\d+/g)].map((r) => +r[0]);

  // filter out winning numbers
  const set = new Set([...numbers, ...winners]);
  // Find out how many numbers were winners
  let winningCount = numbers.length + winners.length - set.size;
  if (winningCount > 0) {
    // If we had winners, create a binary number based on the amount of winning numbers and parse that back to int
    const result = parseInt("1" + "0".repeat(winningCount - 1), 2);
    results.push(result);
  }
}
console.log(results.reduce((total, val) => total + val));
