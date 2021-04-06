
export PATH=$PATH:~/desynchronizer/codeql-home/codeql
export ANALYSIS_HOME=~/desynchronizer/ApproximateCallGraphAnalysis

cd ~/
cd "desynchronizer"
git clone "https://github.com/AdguardTeam/FiltersCompiler.git"

cd "ApproximateCallGraphBenchmarks/"

codeql database create --language=javascript --source-root ../FiltersCompiler ./FiltersCompiler-db

cp ~/asyncify/callgraph-entrypoints/FiltersCompiler.ql ./FiltersCompiler-db/callgraph.ql

cd "FiltersCompiler-db"

codeql query run --search-path=$ANALYSIS_HOME --database . --output=FiltersCompilerCallGraph.bqrs callgraph.ql

codeql bqrs decode --format=csv FiltersCompilerCallGraph.bqrs > FiltersCompilerCallGraph.csv

