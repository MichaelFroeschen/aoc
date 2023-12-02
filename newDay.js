const { argv } = require("node:process");
const { outputFile } = require("fs-extra");

const dayNum = argv[2];
if (Number.isNaN(dayNum)) {
  console.error("Please enter a valid number");
  return 1;
}

const inputFileContents = "module.exports = ``";
const partFileContents = `const input = require("./partX.input")`;

outputFile(`./scripts/day${dayNum}/part1.js`, partFileContents.replace("X", 1));
outputFile(`./scripts/day${dayNum}/part1.input.js`, inputFileContents);
outputFile(`./scripts/day${dayNum}/part2.js`, partFileContents.replace("X", 2));
outputFile(`./scripts/day${dayNum}/part2.input.js`, inputFileContents);
