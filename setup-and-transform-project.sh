#/bin/bash

if [ $# -ne 2 ]; then
  echo "Exactly 2 arguments expected"
  exit 1
fi

GIT_REPO_URL=$1
PROJECT_NAME=$2

cd "/root"
cd "desynchronizer"

echo ""
echo "Git url: $GIT_REPO_URL"
echo "project name: $PROJECT_NAME"
echo ""

# setting up project
git clone "$GIT_REPO_URL"
cd "$PROJECT_NAME"
npm install
npm run build


# setting up callgraph analysis
export PATH=$PATH:~/desynchronizer/codeql-home/codeql
export ANALYSIS_HOME=~/desynchronizer/ApproximateCallGraphAnalysis

cd "/root"
cd "desynchronizer"
cd "ApproximateCallGraphBenchmarks"

codeql database create --language=javascript --source-root "../${PROJECT_NAME}" "./${PROJECT_NAME}-js-db"
cp "/root/asyncify/callgraph.ql" "./${PROJECT_NAME}-js-db/callgraph.ql"

# Generating callgraph
cd "./${PROJECT_NAME}-js-db"
codeql query run --search-path=$ANALYSIS_HOME --database . --output="${PROJECT_NAME}CallGraph.bqrs" callgraph.ql
codeql bqrs decode --format=csv "${PROJECT_NAME}CallGraph.bqrs" > "${PROJECT_NAME}CallGraph.csv"

cp "${PROJECT_NAME}CallGraph.csv" "/root/asyncify/generated-cgs/${PROJECT_NAME}CallGraph.csv"

cd "/root"
cd "asyncify"
node ./run.js  "./generated-cgs/${PROJECT_NAME}CallGraph.csv"