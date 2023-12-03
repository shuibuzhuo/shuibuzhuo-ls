#!/usr/bin/env node
const fs = require("fs");
const parse = require("./parseArgs");
const { args, isAll, isList } = parse();
const auth = require("./auth");
const getFileType = require("./getFileType");

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
    const stat = fs.statSync(file);
    const mode = stat.mode;
    const fileType = getFileType(mode);
    const authString = auth(mode);

    if (index === files.length - 1) {
      output += fileType + authString + "\t" + file;
    } else {
      output += fileType + authString + "\t" + file + "\n";
    }
  });
}

console.log(output);
