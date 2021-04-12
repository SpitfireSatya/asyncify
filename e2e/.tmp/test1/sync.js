const fs_readFilePromise = require('util').promisify(require('fs').readFile);

const fs = require('fs');

async function doNotConvert1() {
  return fs_readFilePromise('');
}

async function doNotConvert2() {
  return fs_readFilePromise('');
}

async function doNotConvert3() {
  return fs_readFilePromise('');
}

async function convert1() {
  return fs_readFilePromise('');
}

async function convert2() {
  return fs_readFilePromise('');
}

module.exports = {
  doNotConvert1,
  doNotConvert2,
  doNotConvert3,
  convert1,
  convert2
};