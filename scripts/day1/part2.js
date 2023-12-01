const input = require("./part2.input.js");

const mapping = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

const sum = input
  .split("\n")
  .map((str) => {
    /* Handle the case that two numbers share a character by replacing the first
     * but appending the last character of the numbers word.
     * Example:
     * eighthree -> 8three -> 83
     *
     * In order to achieve this, we need to iterate over the matches.
     * Without this case, it would suffice to just replace all occurences of the words
     * with the respective numbers
     */
    let prev = str;
    let cur = str;
    // Finally a reason to use do ... while
    do {
      prev = cur;
      cur = cur.replace(
        // Match any one of the numbers
        /(one|two|three|four|five|six|seven|eight|nine)/g,
        (m) => mapping[m] + m.charAt(m.length - 1)
      );
    } while (prev !== cur);
    return cur;
  })
  .map((s) => s.replace(/\D/g, ""))
  .reduce((total, str, i) => +`${str[0]}${str[str.length - 1]}` + +total, 0);
console.log(sum);
