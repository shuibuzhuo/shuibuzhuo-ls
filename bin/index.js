#!/usr/bin/env node
const fs = require("fs");
const parse = require("./parseArgs");
const { args, isAll, isList } = parse();

const dir = process.cwd();

if (!isAll && !isList) {
  let files = fs.readdirSync(dir);
  files = files.filter((file) => file.indexOf(".") !== 0);
  let output = "";
  files.forEach((file) => (output += file + "      "));
  console.log(output);
}
