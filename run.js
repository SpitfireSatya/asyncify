
(async function(){
  
  'use strict';

  const asyncify = require('./dist/asyncify');
  const pathToCSV = process.argv[2];

  const start = new Date().getTime();
  await asyncify.showTransformationsAndTransform(pathToCSV, "/desynchronizer");
  const end = new Date().getTime();

  console.log('Time: ', end - start);


}())

