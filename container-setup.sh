#/bin/bash

npm install
npm run build

cd "/root"
cd "desynchronizer/"

mkdir "codeql-home"
cd "codeql-home/"
mkdir "codeql"
cd "codeql"
unzip ~/asyncify/codeql1.zip
unzip ~/asyncify/codeql2.zip
unzip ~/asyncify/codeql3.zip

cd ..

git clone "https://github.com/SpitfireSatya/ql"

cd "/root"
cd "desynchronizer/"
git clone "https://github.com/SpitfireSatya/ApproximateCallGraphAnalysis.git"

export PATH="$PATH:/root/desynchronizer/codeql-home/codeql" 
export ANALYSIS_HOME="/root/desynchronizer/ApproximateCallGraphAnalysis"
