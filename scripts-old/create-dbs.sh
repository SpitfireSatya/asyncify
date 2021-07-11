
export PATH=$PATH:~/desynchronizer/codeql-home/codeql
export ANALYSIS_HOME=~/desynchronizer/ApproximateCallGraphAnalysis

cd ~/
cd "desynchronizer"
cd "ApproximateCallGraphBenchmarks"

codeql database create --language=javascript --source-root ../FiltersCompiler ./FiltersCompiler-js-db
codeql database create --language=javascript --source-root ../a11y-metrics ./a11y-metrics-js-db
# codeql database create --language=javascript --source-root ../jugglingdb ./jugglingdb-js-db
codeql database create --language=javascript --source-root ../ember-watson ./ember-watson-js-db
# codeql database create --language=javascript --source-root ../abecms ./abecms-js-db
# codeql database create --language=javascript --source-root ../reactor-sandbox ./reactor-sandbox-js-db
codeql database create --language=javascript --source-root ../adapt_authoring ./adapt_authoring-js-db
# codeql database create --language=javascript --source-root ../now-sync ./now-sync-js-db
# codeql database create --language=javascript --source-root ../TurboScript ./TurboScript-js-db
codeql database create --language=javascript --source-root ../useragent ./useragent-js-db
# codeql database create --language=javascript --source-root ../ack-pug-bundler ./ack-pug-bundler-js-db
# codeql database create --language=javascript --source-root ../drakov ./drakov-js-db
# codeql database create --language=javascript --source-root ../yadda ./yadda-js-db
# codeql database create --language=javascript --source-root ../crx2ff ./crx2ff-js-db

# codeql database create --language=javascript --source-root ../node-wantsit ./node-wantsit-js-db
# codeql database create --language=javascript --source-root ../adslot-ui ./adslot-ui-js-db
# codeql database create --language=javascript --source-root ../browserify-wrap ./browserify-wrap-js-db
# codeql database create --language=javascript --source-root ../mana ./mana-js-db
# codeql database create --language=javascript --source-root ../node-sfx ./node-sfx-js-db
# codeql database create --language=javascript --source-root ../abigail-plugin-parse ./abigail-plugin-parse-js-db
# codeql database create --language=javascript --source-root ../ember-cli-deploy-redis-index-adapter ./ember-cli-deploy-redis-index-adapter-js-db
# codeql database create --language=javascript --source-root ../react-spring ./react-spring-js-db
# codeql database create --language=javascript --source-root ../vuepress ./vuepress-js-db
# codeql database create --language=javascript --source-root ../buttercup-desktop ./buttercup-desktop-js-db
# codeql database create --language=javascript --source-root ../bottender ./bottender-js-db
# codeql database create --language=javascript --source-root ../consola ./consola-js-db
# codeql database create --language=javascript --source-root ../draggable ./draggable-js-db

# codeql database create --language=javascript --source-root ../node-blend ./node-blend-js-db
# codeql database create --language=javascript --source-root ../deepforge ./deepforge-js-db
# codeql database create --language=javascript --source-root ../meteor-desktop ./meteor-desktop-js-db
# codeql database create --language=javascript --source-root ../apps ./apps-js-db
# codeql database create --language=javascript --source-root ../switchBoard ./switchBoard-js-db
# codeql database create --language=javascript --source-root ../flatsheet ./flatsheet-js-db
# codeql database create --language=javascript --source-root ../bonescript ./bonescript-js-db
# codeql database create --language=javascript --source-root ../neoan3-cli ./neoan3-cli-js-db
