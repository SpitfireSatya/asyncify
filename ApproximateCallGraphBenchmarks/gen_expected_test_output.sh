#!/bin/bash

LPURPLE='\033[1;35m'
NC='\033[0m' # No Colour

declare -a tests=("acorn" "memory-fs" "razorpay-node")
num_tests=${#tests[@]}

# if we specify tests as command line arguments, just run this list instead
args=("$@")
num_args=${#args[@]}

if (( $num_args > 0 )); then
	num_tests=$num_args
	tests=("${args[@]}")
fi

# run all the tests
for (( i=0; i<${num_tests}; i++ )); do
	cur_test=${tests[$i]}
	# assuming the database is the only directory in the test folder
	cur_database=$(ls -d $cur_test/*/)

	echo -e ${LPURPLE}"Starting to run test:" $cur_test ${NC}
	# run the query
	codeql query run --search-path=$ANALYSIS_HOME --database $cur_database/ --output=$cur_test/`echo $cur_test"_CallGraph.bqrs"` `echo $cur_test`/callgraph.ql
	
	# decode the output
	codeql bqrs decode --format=csv $cur_test/`echo $cur_test"_CallGraph.bqrs"` > $cur_test/`echo $cur_test"_CallGraph_expected.csv"`
done


