
const fs = require('fs');
const zlib = require('zlib');
const cp = require('child_process');
const crypto = require('crypto');
const express = require('express');

express.listen("", "", () => { });
express.get("", () => { });
express.post("", () => { });
express.put("", () => { });
express.delete("", () => { });
express.patch("", () => { });

var data = fs.readFileSync();
fs.readFile("", () => { });

var data = fs.writeFileSync();
fs.writeFile("", "", () => { });

var data = fs.readdirSync();
fs.readdir("", () => { });

var data = fs.accessSync();
fs.access("", () => { });

var data = fs.appendFileSync();
fs.appendFile("", "", () => { });

var data = fs.chmodSync();
fs.chmod("", "", () => { });

var data = fs.chownSync();
fs.chown("", "", () => { });

var data = fs.mkdirSync();
fs.mkdir("", () => { });

var data = fs.statSync();
fs.stat("", () => { });

var data = fs.renameSync();
fs.rename("", "", () => { });

var data = fs.openSync();
fs.open("", "", () => { });

var data = fs.copyFileSync();
fs.copyFile("", "", () => { });

var data = zlib.gzipSync();
zlib.gzip("", () => {});

var data = zlib.brotliCompressSync();
zlib.brotliCompress("", () => {});

var data = zlib.deflateSync();
zlib.deflate("", () => {});

var data = cp.execSync();
cp.exec("", () => {});

var data = crypto.pbkdf2Sync();
crypto.pbkdf2password("", "", "", "", "", () => {});

var data = crypto.generateKeyPairSync();
crypto.generateKeyPair("", {}, () => {});
