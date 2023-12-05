#!/usr/bin/env node
const fs = require("fs");
const parse = require("./parseArgs");
const { args, isAll, isList } = parse();
const auth = require("./auth");
const getFileType = require("./getFileType");
const getFileUser = require("./getFileUser");
const getFileSizeAndDate = require("./getFileSizeAndDate");

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
    const isDirectory = stat.isDirectory();
    let size = 1;
    if (isDirectory) {
      const subDir = fs.readdirSync(file);
      size = subDir.length;
    }
    const mode = stat.mode;
    const fileType = getFileType(mode);
    const fileUser = getFileUser(stat);
    const authString = auth(mode);
    const fileSizeAndDate = getFileSizeAndDate(stat);
    output +=
      fileType +
      authString +
      " " +
      size +
      " " +
      fileUser +
      " " +
      fileSizeAndDate +
      "\t" +
      file;
    if (index !== files.length - 1) {
      output += "\n";
    }
  });
}

console.log(output);
