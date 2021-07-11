#!/bin/bash

declare -a tests=("acorn" "memory-fs" "razorpay-node" "node-fetch" "pdfmake")
num_tests=${#tests[@]}

# upgrade dbs for all the tests
for (( i=0; i<${num_tests}; i++ )); do
	cur_test=${tests[$i]}
	# assuming the database is the only directory in the test folder
	cur_database=$(ls -d $cur_test/*/)
	codeql database upgrade $cur_database
done


