#/bin/bash

cd "/root"
cd "desynchronizer/"
git clone https://github.com/JSTransformationBenchmarks/deepforge.git
cd "deepforge"
git checkout master
npm install
npm run build

cd "/root"
cd "desynchronizer/"
git clone https://github.com/JSTransformationBenchmarks/meteor-desktop.git
cd "meteor-desktop"
git checkout master
npm install
npm run build

cd "/root"
cd "desynchronizer/"
git clone https://github.com/JSTransformationBenchmarks/apps.git
cd "apps"
git checkout master
npm install
npm run build

cd "/root"
cd "desynchronizer/"
git clone https://github.com/JSTransformationBenchmarks/switchBoard.git
cd "switchBoard"
git checkout master
npm install
npm run build

cd "/root"
cd "desynchronizer/"
git clone https://github.com/JSTransformationBenchmarks/flatsheet.git
cd "flatsheet"
git checkout master
npm install
npm run build

cd "/root"
cd "desynchronizer/"
git clone https://github.com/JSTransformationBenchmarks/bonescript.git
cd "bonescript"
git checkout master
npm install
npm run build

cd "/root"
cd "desynchronizer/"
git clone https://github.com/JSTransformationBenchmarks/FiltersCompiler.git
cd "FiltersCompiler"
git checkout master
npm install
npm run build

cd "/root"
cd "desynchronizer/"
git clone https://github.com/JSTransformationBenchmarks/a11y-metrics.git
cd "a11y-metrics"
git checkout master
npm install
npm run build

cd "/root"
cd "desynchronizer/"
git clone https://github.com/JSTransformationBenchmarks/ember-watson.git
cd "ember-watson"
git checkout master
npm install
npm run build

cd "/root"
cd "desynchronizer/"
git clone https://github.com/JSTransformationBenchmarks/adapt_authoring.git
cd "adapt_authoring"
git checkout master
npm install
npm run build

cd "/root"
cd "desynchronizer/"
git clone https://github.com/JSTransformationBenchmarks/TurboScript.git
cd "TurboScript"
git checkout master
npm install
npm run build

cd "/root"
cd "desynchronizer/"
git clone https://github.com/JSTransformationBenchmarks/useragent.git
cd "useragent"
git checkout master
npm install
npm run build

cd "/root"
cd "asyncify/"
node ./evaluation/index.js
