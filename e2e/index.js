(async function(){

  'use strict';

  const path = require('path');
  const copydir = require('copy-dir');
  const fs = require('fs');
  const asyncify = require('../dist/asyncify');

  const start = new Date().getTime();

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

  // await asyncify.showTransformationsAndTransform(path.resolve(__dirname, 'FiltersCompilerCallGraph.csv')); // good
  // await asyncify.showTransformationsAndTransform(path.resolve(__dirname, 'AllyMetricsCallGraph.csv')); // good
  // await asyncify.showTransformationsAndTransform(path.resolve(__dirname, 'JugglingdbCallGraph.csv')); 
  // await asyncify.showTransformationsAndTransform(path.resolve(__dirname, 'EmberWatsonCallGraph.csv')); // good
  // await asyncify.showTransformationsAndTransform(path.resolve(__dirname, 'AbecmsCallGraph.csv'));
  // await asyncify.showTransformationsAndTransform(path.resolve(__dirname, 'ReactorSandboxCallGraph.csv'));
  // await asyncify.showTransformationsAndTransform(path.resolve(__dirname, 'AdaptAuthoringCallGraph.csv')); //good
  // await asyncify.showTransformationsAndTransform(path.resolve(__dirname, 'NowSyncCallGraph.csv'));
  // await asyncify.showTransformationsAndTransform(path.resolve(__dirname, 'TurboScriptCallGraph.csv')); // good
  // await asyncify.showTransformationsAndTransform(path.resolve(__dirname, 'UserAgentCallGraph.csv')); // good
  // await asyncify.showTransformationsAndTransform(path.resolve(__dirname, 'AckPugBundlerCallGraph.csv'));
  // await asyncify.showTransformationsAndTransform(path.resolve(__dirname, 'DrakovCallGraph.csv'));
  // await asyncify.showTransformationsAndTransform(path.resolve(__dirname, 'YaddaCallGraph.csv'));
  // await asyncify.showTransformationsAndTransform(path.resolve(__dirname, 'Crx2ffCallGraph.csv'));
  // await asyncify.showTransformationsAndTransform(path.resolve(__dirname, 'NodeWantsitCallGraph.csv'));
  // await asyncify.showTransformationsAndTransform(path.resolve(__dirname, 'AdslotCallGraph.csv'));
  // await asyncify.showTransformationsAndTransform(path.resolve(__dirname, 'BrowserifyWrapCallGraph.csv'));
  // await asyncify.showTransformationsAndTransform(path.resolve(__dirname, 'ManaCallGraph.csv'));
  // await asyncify.showTransformationsAndTransform(path.resolve(__dirname, 'NodeSfxCallGraph.csv'));
  // await asyncify.showTransformationsAndTransform(path.resolve(__dirname, 'AbigailPluginParseCallGraph.csv'));
  // await asyncify.showTransformationsAndTransform(path.resolve(__dirname, 'EmberCliDeployRedisIndexAdapterCallGraph.csv'));
  // await asyncify.showTransformationsAndTransform(path.resolve(__dirname, 'ReactSpringCallGraph.csv'));
  // await asyncify.showTransformationsAndTransform(path.resolve(__dirname, 'VuepressCallGraph.csv'));
  // await asyncify.showTransformationsAndTransform(path.resolve(__dirname, 'ButtercupDesktopCallGraph.csv'));
  // await asyncify.showTransformationsAndTransform(path.resolve(__dirname, 'ConsolaCallGraph.csv'));
  // await asyncify.showTransformationsAndTransform(path.resolve(__dirname, 'DraggableCallGraph.csv'));
  // await asyncify.showTransformationsAndTransform(path.resolve(__dirname, 'NodeBlendCallGraph.csv'));
  // await asyncify.showTransformationsAndTransform(path.resolve(__dirname, 'DeepforgeCallGraph.csv'));
  // await asyncify.showTransformationsAndTransform(path.resolve(__dirname, 'MeteorDesktopCallGraph.csv'));
  // await asyncify.showTransformationsAndTransform(path.resolve(__dirname, 'AppsCallGraph.csv'));
  // await asyncify.showTransformationsAndTransform(path.resolve(__dirname, 'SwitchBoardCallGraph.csv'));
  // await asyncify.showTransformationsAndTransform(path.resolve(__dirname, 'FlatsheetCallGraph.csv'));
  // await asyncify.showTransformationsAndTransform(path.resolve(__dirname, 'BonescriptCallGraph.csv'));
  // await asyncify.showTransformationsAndTransform(path.resolve(__dirname, 'Neoan3CliCallGraph.csv'));
  // await asyncify.showTransformationsAndTransform(path.resolve(__dirname, 'electron-apps.csv'));
  // asyncify.transform();

  fs.rmdirSync(path.resolve(__dirname, '.tmp'), { recursive: true });
  copydir.sync(path.resolve(__dirname, 'fixtures'), path.resolve(__dirname, '.tmp'))

  try {
    await asyncify.showTransformationsAndTransform(path.resolve(__dirname, '.tmp', 'test2', 'test.csv'));
  } catch(e) {
    console.log(e);
  }

  const end = new Date().getTime();

  console.log('Time: ', end - start);

}());

