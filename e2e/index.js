(async function(){

  'use strict';

  const path = require('path');
  const copydir = require('copy-dir');
  const fs = require('fs');
  const asyncify = require('../dist/asyncify');

  // const start = new Date().getTime();

  // await asyncify.showTransformations(path.resolve(__dirname, 'NodeBlendCallGraph.csv'));
  // await asyncify.showTransformations(path.resolve(__dirname, 'LumoCallGraph.csv'));
  // await asyncify.showTransformations(path.resolve(__dirname, 'HackMyResumeCallGraph.csv'));
  // await asyncify.showTransformations(path.resolve(__dirname, 'bonescriptCallGraph.csv'));
  // await asyncify.showTransformations(path.resolve(__dirname, 'popCallGraph.csv'));
  // await asyncify.showTransformations(path.resolve(__dirname, 'deepforgeCallGraph.csv'));
  // await asyncify.showTransformations(path.resolve(__dirname, 'meteorDesktopCallGraph.csv'));
  // await asyncify.showTransformations(path.resolve(__dirname, 'switchBoardCallGraph.csv'));
  // await asyncify.showTransformations(path.resolve(__dirname, 'electron-apps.csv'));
  // await asyncify.showTransformations(path.resolve(__dirname, 'flatsheetCallGraph.csv'));
  // await asyncify.showTransformations(path.resolve(__dirname, 'neoan3CallGraph.csv'));
  // await asyncify.showTransformations(path.resolve(__dirname, 'esdocCallGraph.csv'));
  // asyncify.transform();

  // const end = new Date().getTime();

  // console.log('Time: ', end - start);
  fs.rmdirSync(path.resolve(__dirname, '.tmp'), { recursive: true });
  copydir.sync(path.resolve(__dirname, 'fixtures'), path.resolve(__dirname, '.tmp'))

  try {
    await asyncify.showTransformations(path.resolve(__dirname, '.tmp', 'test1', 'test.csv'));
  } catch(e) {
    console.log(e);
  }

}());

