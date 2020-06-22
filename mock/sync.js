
const fs = require('fs');

function doNotConvert1() {
  return fs.readFileSync('');
}

function doNotConvert2() {
  return fs.readFileSync('');
}

function doNotConvert3() {
  return fs.readFileSync('');
}

function convert1() {
  return fs.readFileSync('');
}

function convert2() {
  return fs.readFileSync('');
}

module.exports = {
  doNotConvert1,
  doNotConvert2,
  doNotConvert3,
  convert1,
  convert2
}
