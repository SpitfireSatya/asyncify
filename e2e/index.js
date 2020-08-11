(async function(){

  'use strict';

  const path = require('path');
  const copydir = require('copy-dir');
  const fs = require('fs');
  const asyncify = require('../dist/asyncify');

  // await asyncify.showTransformations(path.resolve(__dirname, 'NodeBlendCallGraph.csv'));
  // await asyncify.showTransformations(path.resolve(__dirname, 'LumoCallGraph.csv'));
  await asyncify.showTransformations(path.resolve(__dirname, 'HackMyResumeCallGraph.csv'));
  // await asyncify.showTransformations(path.resolve(__dirname, 'bonescriptCallGraph.csv'));
  // await asyncify.showTransformations(path.resolve(__dirname, 'popCallGraph.csv'));
  // await asyncify.showTransformations(path.resolve(__dirname, 'deepforgeCallGraph.csv'));
  // await asyncify.showTransformations(path.resolve(__dirname, 'meteorDesktopCallGraph.csv'));
  // await asyncify.showTransformations(path.resolve(__dirname, 'switchBoardCallGraph.csv'));
  // asyncify.transform();

  /* fs.rmdirSync(path.resolve(__dirname, '.tmp'), { recursive: true });
  copydir.sync(path.resolve(__dirname, 'fixtures'), path.resolve(__dirname, '.tmp'))

  try {
    await asyncify.initialize(path.resolve(__dirname, '.tmp', 'test1', 'test.csv'));
  } catch(e) {
    console.log(e);
  } */

}());

