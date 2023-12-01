const input = require("./part1.input.js");

const sum = input
  .split("\n")
  .map((s) => s.replace(/\D/g, ""))
  .reduce((total, str) => +`${str[0]}${str[str.length - 1]}` + +total, 0);
console.log(sum);
