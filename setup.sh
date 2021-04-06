#!/bin/sh

sudo apt install zip unzip -y

cd ~/
mkdir "desynchronizer"
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

cd ~/
cd "desynchronizer/"
git clone "https://github.com/franktip/ApproximateCallGraphAnalysis.git"
git clone "https://github.com/franktip/ApproximateCallGraphBenchmarks.git"

export PATH="$PATH:~/desynchronizer/codeql-home/codeql" 
export ANALYSIS_HOME="~/desynchronizer/ApproximateCallGraphAnalysis"
