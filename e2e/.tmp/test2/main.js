
const express = require('express');
const fs = require('fs');
const zlib = require('zlib');

const processRequest = (basePath) => {
  const variants = fs.readdirSync(basePath); /*#\label{line:ServerReaddirSync}#*/
  return variants.map(variant =>   /*#\label{line:SyncVariantsMap}#*/
    JSON.parse(fs.readFileSync(basePath + variant, 'utf8')) /*#\label{line:ServerReadFileSync}#*/
  );
}

const app = express();

app.get('/product/details', (request, response) => {
    const data = processRequest(__dirname + '/variants/'); /*#\label{line:callProcessRequest}#*/
    response.send(zlib.gzipSync(JSON.stringify(data))); /*#\label{line:ServerGzipSync}#*/
});

var port = process.env.PORT || 5000;
app.listen(port);
