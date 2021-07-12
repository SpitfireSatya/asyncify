(async function(){

  'use strict';

  console.log("\nAll projects set up. Running evaluation...\n\n");

  const path = require('path');
  const asyncify = require('../dist/asyncify');
  const projectMetrics = [];
  const projects = [
    { name: 'deepforge', filePath: 'DeepforgeCallGraph.csv'},
    { name: 'meteor-desktop', filePath: 'MeteorDesktopCallGraph.csv'},
    { name: 'electron-apps', filePath: 'AppsCallGraph.csv'},
    { name: 'switchBoard', filePath: 'SwitchBoardCallGraph.csv'},
    { name: 'flatsheet', filePath: 'FlatsheetCallGraph.csv'},
    { name: 'bonescript', filePath: 'BonescriptCallGraph.csv'},
    { name: 'FiltersCompiler', filePath: 'FiltersCompilerCallGraph.csv'}, 
    { name: 'a11y-netrics', filePath: 'AllyMetricsCallGraph.csv'}, 
    { name: 'ember-watson', filePath: 'EmberWatsonCallGraph.csv'}, 
    { name: 'adapt_authoring', filePath: 'AdaptAuthoringCallGraph.csv'},
    { name: 'TurboScript', filePath: 'TurboScriptCallGraph.csv'}, 
    { name: 'Useragent', filePath: 'UserAgentCallGraph.csv' }
  ];

  for(let i=0; i<projects.length; i++) {
    const metrics = await asyncify.transform(path.resolve(__dirname, projects[i].filePath));
    projectMetrics.push({name: projects[i].name, ...metrics});
    asyncify.resetData();
  }

  console.log("\n\n");
  console.log(`  No.\tproject name\t\tsync identified\t\tsync transformed\trelated transformed\tTransformation time`);
  console.log("\n");
  projectMetrics.forEach((project, index) => {
    console.log(`  ${index+1})\t${project.name}\t\t\t${project.syncIdentified}\t\t\t${project.syncTransformed}\t\t\t${project.relatedTransformed}\t\t\t${project.timeTaken}`)
  });
  console.log("\n");

}());

