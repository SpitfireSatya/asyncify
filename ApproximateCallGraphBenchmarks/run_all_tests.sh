#!/bin/bash

RED='\033[0;31m'
GREEN='\033[0;32m'
LPURPLE='\033[1;35m'
NC='\033[0m' # No Colour

declare -a tests=("acorn" "memory-fs" "razorpay-node" "node-fetch" "pdfmake")
num_tests=${#tests[@]}

args=("$@") 
num_args=${#args[@]} 

# if we specify only a subset of tests to run, list them as command line args
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
	codeql bqrs decode --format=csv $cur_test/`echo $cur_test"_CallGraph.bqrs"` > $cur_test/`echo $cur_test"_CallGraph_actual.csv"`
	
	# compute the diff
	diff_res=$(diff $cur_test/`echo $cur_test"_CallGraph_actual.csv"` $cur_test/*expected.csv)
	
	error=$?
	if [[ $error -ne 0 && $error -ne 1 ]]; then
		echo -e "${RED}DIFF ERROR"
	# print the diff if there was an error
	elif [ "$diff_res" != "" ]; then
		echo -e "${RED}Tests failed in suite" $cur_test
		echo -e "${RED}Diff of actual vs expected:" $diff_res
	else
		echo -e ${GREEN}$cur_test "test PASSED"
	fi
	echo -e ${NC}
done


