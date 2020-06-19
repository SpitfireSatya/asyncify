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

async function convert1() {
  return await fs.promises.readFile('');
}

async function convert2() {
  return await fs.promises.readFile('');
}

module.exports = {
  doNotConvert1,
  doNotConvert2,
  doNotConvert3,
  convert1,
  convert2
};