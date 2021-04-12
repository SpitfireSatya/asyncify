
export PATH=$PATH:~/desynchronizer/codeql-home/codeql
export ANALYSIS_HOME=~/desynchronizer/ApproximateCallGraphAnalysis

cd ~/
cd "desynchronizer"
cd "ApproximateCallGraphBenchmarks"

codeql database create --language=javascript --source-root ../FiltersCompiler ./FiltersCompiler-js-db
codeql database create --language=javascript --source-root ../a11y-metrics ./a11y-metrics-js-db
codeql database create --language=javascript --source-root ../jugglingdb ./jugglingdb-js-db
codeql database create --language=javascript --source-root ../ember-watson ./ember-watson-js-db
codeql database create --language=javascript --source-root ../abecms ./abecms-js-db
codeql database create --language=javascript --source-root ../reactor-sandbox ./reactor-sandbox-js-db
codeql database create --language=javascript --source-root ../adapt_authoring ./adapt_authoring-js-db
codeql database create --language=javascript --source-root ../now-sync ./now-sync-js-db
codeql database create --language=javascript --source-root ../TurboScript ./TurboScript-js-db
codeql database create --language=javascript --source-root ../useragent ./useragent-js-db
codeql database create --language=javascript --source-root ../ack-pug-bundler ./ack-pug-bundler-js-db
codeql database create --language=javascript --source-root ../drakov ./drakov-js-db
codeql database create --language=javascript --source-root ../yadda ./yadda-js-db
codeql database create --language=javascript --source-root ../crx2ff ./crx2ff-js-db
