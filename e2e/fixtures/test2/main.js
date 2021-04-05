const express = require('express');
const fs = require('fs');
const zlib = require('zlib');

const processRequest = (basePath) => {
  const variants = fs.readdirSync(basePath);
  const details = { };
  variants.forEach(variant => {
    details[variant] = JSON.parse(fs.readFileSync(basePath + variant, 'utf8'));
  });
  return details;
}

const app = express();

app.get('/product/details', (request, response) => {
    const data = processRequest(__dirname + '/varients/');
    response.send(zlib.gzipSync(JSON.stringify(data)));
});

var port = process.env.PORT || 5000;
app.listen(port);