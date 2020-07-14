(async function(){

  'use strict';

  const path = require('path');
  const copydir = require('copy-dir');
  const fs = require('fs');
  const asyncify = require('../dist/asyncify');

  await asyncify.showTransformations(path.resolve(__dirname, 'NodeBlendCallGraph.csv'));
  // await asyncify.showTransformations(path.resolve(__dirname, 'LumoCallGraph.csv'));
  // asyncify.transform();

  /* fs.rmdirSync(path.resolve(__dirname, '.tmp'), { recursive: true });
  copydir.sync(path.resolve(__dirname, 'fixtures'), path.resolve(__dirname, '.tmp'))

  try {
    await asyncify.initialize(path.resolve(__dirname, '.tmp', 'test1', 'test.csv'));
  } catch(e) {
    console.log(e);
  } */

}());

