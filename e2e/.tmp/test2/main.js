const zlib_gzipPromise = require('util').promisify(require('zlib').gzip);

const fs_readFilePromise = require('util').promisify(require('fs').readFile);

const fs_readdirPromise = require('util').promisify(require('fs').readdir);

const express = require('express');

const fs = require('fs');

const zlib = require('zlib');

const processRequest = async basePath => {
  const variants = await fs_readdirPromise(basePath);
  /*#\label{line:ServerReaddirSync}#*/

  return Promise.all(variants.map(async variant =>
  /*#\label{line:SyncVariantsMap}#*/
  JSON.parse(await fs_readFilePromise(basePath + variant, 'utf8'))
  /*#\label{line:ServerReadFileSync}#*/
  ));
};

const app = express();
app.get('/product/details', async (request, response) => {
  const data = await processRequest(__dirname + '/variants/');
  /*#\label{line:callProcessRequest}#*/

  response.send(await zlib_gzipPromise(JSON.stringify(data)));
  /*#\label{line:ServerGzipSync}#*/
});
var port = process.env.PORT || 5000;
app.listen(port);