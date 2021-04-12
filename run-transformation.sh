
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

cd ~/
cd "desynchronizer"
cd "ApproximateCallGraphBenchmarks"
cd jugglingdb-js-db
codeql query run --search-path=$ANALYSIS_HOME --database . --output=JugglingdbCallGraph.bqrs callgraph.ql
codeql bqrs decode --format=csv JugglingdbCallGraph.bqrs > JugglingdbCallGraph.csv

cd ~/
cd "desynchronizer"
cd "ApproximateCallGraphBenchmarks"
cd ember-watson-js-db
codeql query run --search-path=$ANALYSIS_HOME --database . --output=EmberWatsonCallGraph.bqrs callgraph.ql
codeql bqrs decode --format=csv EmberWatsonCallGraph.bqrs > EmberWatsonCallGraph.csv

cd ~/
cd "desynchronizer"
cd "ApproximateCallGraphBenchmarks"
cd abecms-js-db
codeql query run --search-path=$ANALYSIS_HOME --database . --output=AbecmsCallGraph.bqrs callgraph.ql
codeql bqrs decode --format=csv AbecmsCallGraph.bqrs > AbecmsCallGraph.csv

cd ~/
cd "desynchronizer"
cd "ApproximateCallGraphBenchmarks"
cd reactor-sandbox-js-db
codeql query run --search-path=$ANALYSIS_HOME --database . --output=ReactorSandboxCallGraph.bqrs callgraph.ql
codeql bqrs decode --format=csv ReactorSandboxCallGraph.bqrs > ReactorSandboxCallGraph.csv

cd ~/
cd "desynchronizer"
cd "ApproximateCallGraphBenchmarks"
cd adapt_authoring-js-db
codeql query run --search-path=$ANALYSIS_HOME --database . --output=AdaptAuthoringCallGraph.bqrs callgraph.ql
codeql bqrs decode --format=csv AdaptAuthoringCallGraph.bqrs > AdaptAuthoringCallGraph.csv

cd ~/
cd "desynchronizer"
cd "ApproximateCallGraphBenchmarks"
cd now-sync-js-db
codeql query run --search-path=$ANALYSIS_HOME --database . --output=NowSyncCallGraph.bqrs callgraph.ql
codeql bqrs decode --format=csv NowSyncCallGraph.bqrs > NowSyncCallGraph.csv

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

cd ~/
cd "desynchronizer"
cd "ApproximateCallGraphBenchmarks"
cd ack-pug-bundler-js-db
codeql query run --search-path=$ANALYSIS_HOME --database . --output=AckPugBundlerCallGraph.bqrs callgraph.ql
codeql bqrs decode --format=csv AckPugBundlerCallGraph.bqrs > AckPugBundlerCallGraph.csv

cd ~/
cd "desynchronizer"
cd "ApproximateCallGraphBenchmarks"
cd drakov-js-db
codeql query run --search-path=$ANALYSIS_HOME --database . --output=DrakovCallGraph.bqrs callgraph.ql
codeql bqrs decode --format=csv DrakovCallGraph.bqrs > DrakovCallGraph.csv

cd ~/
cd "desynchronizer"
cd "ApproximateCallGraphBenchmarks"
cd yadda-js-db
codeql query run --search-path=$ANALYSIS_HOME --database . --output=YaddaCallGraph.bqrs callgraph.ql
codeql bqrs decode --format=csv YaddaCallGraph.bqrs > YaddaCallGraph.csv

cd ~/
cd "desynchronizer"
cd "ApproximateCallGraphBenchmarks"
cd crx2ff-js-db
codeql query run --search-path=$ANALYSIS_HOME --database . --output=Crx2ffCallGraph.bqrs callgraph.ql
codeql bqrs decode --format=csv Crx2ffCallGraph.bqrs > Crx2ffCallGraph.csv

