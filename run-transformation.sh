
export PATH=$PATH:~/desynchronizer/codeql-home/codeql
export ANALYSIS_HOME=~/desynchronizer/ApproximateCallGraphAnalysis

cd ~/
cd "desynchronizer"
cd "ApproximateCallGraphBenchmarks"
cd FiltersCompiler-js-db
codeql query run --search-path=$ANALYSIS_HOME --database . --output=FiltersCompiler.bqrs callgraph.ql
codeql bqrs decode --format=csv FiltersCompiler.bqrs > FiltersCompilerCallGraph.csv

cd ~/
cd "desynchronizer"
cd "ApproximateCallGraphBenchmarks"
cd a11y-metrics-js-db
codeql query run --search-path=$ANALYSIS_HOME --database . --output=AllyMetricsCallGraph.bqrs callgraph.ql
codeql bqrs decode --format=csv AllyMetricsCallGraph.bqrs > AllyMetricsCallGraph.csv

# cd ~/
# cd "desynchronizer"
# cd "ApproximateCallGraphBenchmarks"
# cd jugglingdb-js-db
# codeql query run --search-path=$ANALYSIS_HOME --database . --output=JugglingdbCallGraph.bqrs callgraph.ql
# codeql bqrs decode --format=csv JugglingdbCallGraph.bqrs > JugglingdbCallGraph.csv

cd ~/
cd "desynchronizer"
cd "ApproximateCallGraphBenchmarks"
cd ember-watson-js-db
codeql query run --search-path=$ANALYSIS_HOME --database . --output=EmberWatsonCallGraph.bqrs callgraph.ql
codeql bqrs decode --format=csv EmberWatsonCallGraph.bqrs > EmberWatsonCallGraph.csv

# cd ~/
# cd "desynchronizer"
# cd "ApproximateCallGraphBenchmarks"
# cd abecms-js-db
# codeql query run --search-path=$ANALYSIS_HOME --database . --output=AbecmsCallGraph.bqrs callgraph.ql
# codeql bqrs decode --format=csv AbecmsCallGraph.bqrs > AbecmsCallGraph.csv

# cd ~/
# cd "desynchronizer"
# cd "ApproximateCallGraphBenchmarks"
# cd reactor-sandbox-js-db
# codeql query run --search-path=$ANALYSIS_HOME --database . --output=ReactorSandboxCallGraph.bqrs callgraph.ql
# codeql bqrs decode --format=csv ReactorSandboxCallGraph.bqrs > ReactorSandboxCallGraph.csv

cd ~/
cd "desynchronizer"
cd "ApproximateCallGraphBenchmarks"
cd adapt_authoring-js-db
codeql query run --search-path=$ANALYSIS_HOME --database . --output=AdaptAuthoringCallGraph.bqrs callgraph.ql
codeql bqrs decode --format=csv AdaptAuthoringCallGraph.bqrs > AdaptAuthoringCallGraph.csv

# cd ~/
# cd "desynchronizer"
# cd "ApproximateCallGraphBenchmarks"
# cd now-sync-js-db
# codeql query run --search-path=$ANALYSIS_HOME --database . --output=NowSyncCallGraph.bqrs callgraph.ql
# codeql bqrs decode --format=csv NowSyncCallGraph.bqrs > NowSyncCallGraph.csv

cd ~/
cd "desynchronizer"
cd "ApproximateCallGraphBenchmarks"
cd TurboScript-js-db
codeql query run --search-path=$ANALYSIS_HOME --database . --output=TurboScriptCallGraph.bqrs callgraph.ql
codeql bqrs decode --format=csv TurboScriptCallGraph.bqrs > TurboScriptCallGraph.csv

cd ~/
cd "desynchronizer"
cd "ApproximateCallGraphBenchmarks"
cd useragent-js-db
codeql query run --search-path=$ANALYSIS_HOME --database . --output=UserAgentCallGraph.bqrs callgraph.ql
codeql bqrs decode --format=csv UserAgentCallGraph.bqrs > UserAgentCallGraph.csv

# cd ~/
# cd "desynchronizer"
# cd "ApproximateCallGraphBenchmarks"
# cd ack-pug-bundler-js-db
# codeql query run --search-path=$ANALYSIS_HOME --database . --output=AckPugBundlerCallGraph.bqrs callgraph.ql
# codeql bqrs decode --format=csv AckPugBundlerCallGraph.bqrs > AckPugBundlerCallGraph.csv

# cd ~/
# cd "desynchronizer"
# cd "ApproximateCallGraphBenchmarks"
# cd drakov-js-db
# codeql query run --search-path=$ANALYSIS_HOME --database . --output=DrakovCallGraph.bqrs callgraph.ql
# codeql bqrs decode --format=csv DrakovCallGraph.bqrs > DrakovCallGraph.csv

# cd ~/
# cd "desynchronizer"
# cd "ApproximateCallGraphBenchmarks"
# cd yadda-js-db
# codeql query run --search-path=$ANALYSIS_HOME --database . --output=YaddaCallGraph.bqrs callgraph.ql
# codeql bqrs decode --format=csv YaddaCallGraph.bqrs > YaddaCallGraph.csv

# cd ~/
# cd "desynchronizer"
# cd "ApproximateCallGraphBenchmarks"
# cd crx2ff-js-db
# codeql query run --search-path=$ANALYSIS_HOME --database . --output=Crx2ffCallGraph.bqrs callgraph.ql
# codeql bqrs decode --format=csv Crx2ffCallGraph.bqrs > Crx2ffCallGraph.csv


# cd ~/
# cd "desynchronizer"
# cd "ApproximateCallGraphBenchmarks"
# cd ./node-wantsit-js-db
# codeql query run --search-path=$ANALYSIS_HOME --database . --output=NodeWantsitCallGraph.bqrs callgraph.ql
# codeql bqrs decode --format=csv NodeWantsitCallGraph.bqrs > NodeWantsitCallGraph.csv

# cd ~/
# cd "desynchronizer"
# cd "ApproximateCallGraphBenchmarks"
# cd ./adslot-ui-js-db
# codeql query run --search-path=$ANALYSIS_HOME --database . --output=AdslotCallGraph.bqrs callgraph.ql
# codeql bqrs decode --format=csv AdslotCallGraph.bqrs > AdslotCallGraph.csv

# cd ~/
# cd "desynchronizer"
# cd "ApproximateCallGraphBenchmarks"
# cd ./browserify-wrap-js-db
# codeql query run --search-path=$ANALYSIS_HOME --database . --output=BrowserifyWrapCallGraph.bqrs callgraph.ql
# codeql bqrs decode --format=csv BrowserifyWrapCallGraph.bqrs > BrowserifyWrapCallGraph.csv

# cd ~/
# cd "desynchronizer"
# cd "ApproximateCallGraphBenchmarks"
# cd ./mana-js-db
# codeql query run --search-path=$ANALYSIS_HOME --database . --output=ManaCallGraph.bqrs callgraph.ql
# codeql bqrs decode --format=csv ManaCallGraph.bqrs > ManaCallGraph.csv

# cd ~/
# cd "desynchronizer"
# cd "ApproximateCallGraphBenchmarks"
# cd ./node-sfx-js-db
# codeql query run --search-path=$ANALYSIS_HOME --database . --output=NodeSfxCallGraph.bqrs callgraph.ql
# codeql bqrs decode --format=csv NodeSfxCallGraph.bqrs > NodeSfxCallGraph.csv

# cd ~/
# cd "desynchronizer"
# cd "ApproximateCallGraphBenchmarks"
# cd ./abigail-plugin-parse-js-db
# codeql query run --search-path=$ANALYSIS_HOME --database . --output=AbigailPluginParseCallGraph.bqrs callgraph.ql
# codeql bqrs decode --format=csv AbigailPluginParseCallGraph.bqrs > AbigailPluginParseCallGraph.csv

# cd ~/
# cd "desynchronizer"
# cd "ApproximateCallGraphBenchmarks"
# cd ./ember-cli-deploy-redis-index-adapter-js-db
# codeql query run --search-path=$ANALYSIS_HOME --database . --output=EmberCliDeployRedisIndexAdapterCallGraph.bqrs callgraph.ql
# codeql bqrs decode --format=csv EmberCliDeployRedisIndexAdapterCallGraph.bqrs > EmberCliDeployRedisIndexAdapterCallGraph.csv

# cd ~/
# cd "desynchronizer"
# cd "ApproximateCallGraphBenchmarks"
# cd ./react-spring-js-db
# codeql query run --search-path=$ANALYSIS_HOME --database . --output=ReactSpringCallGraph.bqrs callgraph.ql
# codeql bqrs decode --format=csv ReactSpringCallGraph.bqrs > ReactSpringCallGraph.csv

# cd ~/
# cd "desynchronizer"
# cd "ApproximateCallGraphBenchmarks"
# cd ./vuepress-js-db
# codeql query run --search-path=$ANALYSIS_HOME --database . --output=VuepressCallGraph.bqrs callgraph.ql
# codeql bqrs decode --format=csv VuepressCallGraph.bqrs > VuepressCallGraph.csv

# cd ~/
# cd "desynchronizer"
# cd "ApproximateCallGraphBenchmarks"
# cd ./buttercup-desktop-js-db
# codeql query run --search-path=$ANALYSIS_HOME --database . --output=ButtercupDesktopCallGraph.bqrs callgraph.ql
# codeql bqrs decode --format=csv ButtercupDesktopCallGraph.bqrs > ButtercupDesktopCallGraph.csv

# cd ~/
# cd "desynchronizer"
# cd "ApproximateCallGraphBenchmarks"
# cd ./bottender-js-db
# codeql query run --search-path=$ANALYSIS_HOME --database . --output=BottenderCallGraph.bqrs callgraph.ql
# codeql bqrs decode --format=csv BottenderCallGraph.bqrs > BottenderCallGraph.csv

# cd ~/
# cd "desynchronizer"
# cd "ApproximateCallGraphBenchmarks"
# cd ./consola-js-db
# codeql query run --search-path=$ANALYSIS_HOME --database . --output=ConsolaCallGraph.bqrs callgraph.ql
# codeql bqrs decode --format=csv ConsolaCallGraph.bqrs > ConsolaCallGraph.csv

# cd ~/
# cd "desynchronizer"
# cd "ApproximateCallGraphBenchmarks"
# cd ./draggable-js-db
# codeql query run --search-path=$ANALYSIS_HOME --database . --output=DraggableCallGraph.bqrs callgraph.ql
# codeql bqrs decode --format=csv DraggableCallGraph.bqrs > DraggableCallGraph.csv

# cd ~/
# cd "desynchronizer"
# cd "ApproximateCallGraphBenchmarks"
# cd node-blend-js-db
# codeql query run --search-path=$ANALYSIS_HOME --database . --output=NodeBlendCallGraph.bqrs callgraph.ql
# codeql bqrs decode --format=csv NodeBlendCallGraph.bqrs > NodeBlendCallGraph.csv

# cd ~/
# cd "desynchronizer"
# cd "ApproximateCallGraphBenchmarks"
# cd deepforge-js-db
# codeql query run --search-path=$ANALYSIS_HOME --database . --output=DeepforgeCallGraph.bqrs callgraph.ql
# codeql bqrs decode --format=csv DeepforgeCallGraph.bqrs > DeepforgeCallGraph.csv

# cd ~/
# cd "desynchronizer"
# cd "ApproximateCallGraphBenchmarks"
# cd meteor-desktop-js-db
# codeql query run --search-path=$ANALYSIS_HOME --database . --output=MeteorDesktopCallGraph.bqrs callgraph.ql
# codeql bqrs decode --format=csv MeteorDesktopCallGraph.bqrs > MeteorDesktopCallGraph.csv

# cd ~/
# cd "desynchronizer"
# cd "ApproximateCallGraphBenchmarks"
# cd apps-js-db
# codeql query run --search-path=$ANALYSIS_HOME --database . --output=AppsCallGraph.bqrs callgraph.ql
# codeql bqrs decode --format=csv AppsCallGraph.bqrs > AppsCallGraph.csv

# cd ~/
# cd "desynchronizer"
# cd "ApproximateCallGraphBenchmarks"
# cd switchBoard-js-db
# codeql query run --search-path=$ANALYSIS_HOME --database . --output=SwitchBoardCallGraph.bqrs callgraph.ql
# codeql bqrs decode --format=csv SwitchBoardCallGraph.bqrs > SwitchBoardCallGraph.csv

# cd ~/
# cd "desynchronizer"
# cd "ApproximateCallGraphBenchmarks"
# cd flatsheet-js-db
# codeql query run --search-path=$ANALYSIS_HOME --database . --output=FlatsheetCallGraph.bqrs callgraph.ql
# codeql bqrs decode --format=csv FlatsheetCallGraph.bqrs > FlatsheetCallGraph.csv

# cd ~/
# cd "desynchronizer"
# cd "ApproximateCallGraphBenchmarks"
# cd bonescript-js-db
# codeql query run --search-path=$ANALYSIS_HOME --database . --output=BonescriptCallGraph.bqrs callgraph.ql
# codeql bqrs decode --format=csv BonescriptCallGraph.bqrs > BonescriptCallGraph.csv

# cd ~/
# cd "desynchronizer"
# cd "ApproximateCallGraphBenchmarks"
# cd neoan3-cli-js-db
# codeql query run --search-path=$ANALYSIS_HOME --database . --output=Neoan3CliCallGraph.bqrs callgraph.ql
# codeql bqrs decode --format=csv Neoan3CliCallGraph.bqrs > Neoan3CliCallGraph.csv
