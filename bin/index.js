#!/usr/bin/env node
const fs = require("fs");
const parse = require("./parseArgs");
const { args, isAll, isList } = parse();

const dir = process.cwd();

let files = fs.readdirSync(dir);
let output = "";

if (!isAll) {
  files = files.filter((file) => file.indexOf(".") !== 0);
}

if (!isList) {
  files.forEach((file) => (output += file + "      "));
} else {
  files.forEach((file, index) => {
    if (index === files.length - 1) {
      output += file;
    } else {
      output += file + "\n";
    }
  });
}

console.log(output);
