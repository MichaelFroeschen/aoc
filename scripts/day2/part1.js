const input = require("./part1.input");

const inputTest = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`;

const MAX = {
  red: 12,
  green: 13,
  blue: 14,
};

const data = input.split("\n");
const games = data.map((r) => r.substring(r.indexOf(":") + 1).split(";"));
const sum = games.reduce((total, rounds, index) => {
  let possible = true;
  for (const round of rounds) {
    const colors = round.trim().split(",");
    for (const colorResult of colors) {
      const [amount, color] = colorResult.trim().split(" ");
      if (amount > MAX[color]) {
        possible = false;
        break;
      }
    }
  }
  let value = 0;
  if (possible) {
    value = index + 1;
  }
  return total + value;
}, 0);
console.log(sum);
