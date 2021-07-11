# ApproximateCallGraphsBenchmarks

This repository contains benchmarks for the approximate call graph analysis (see https://github.com/franktip/ApproximateCallGraphAnalysis), and assumes that the CodeQL command-line tools and the analysis have been
installed following instructions given there.

## Setup
1. cd ~/codeql-home/ql
2. git checkout master

## To run all, or a subset of, the benchmarks:
`./run_all_tests.sh arg1 arg2 ...`

This runs the tests arg1, arg2, etc.
If no command line arguments are provided, the default behaviour is to run all the tests.

The steps are as follows, for each test:
1. Run the callgraph.ql query contained in the test directory
2. Take the bqrs output of this analysis, output it as the "actual" csv output
3. Diff this output with the expected output (the "expected" csv in the directory)
4. Empty diff means the test passes; if there is a non-empty diff the test fails and this diff is reported.

## To generate new expected output:
`./gen_expected_test_output.sh arg1 arg2 ...`

This just runs every test listed as command line arguments (again, if none are provided, all the tests are run) and outputs the results of the analysis to the respective "expected" file. 
These files are then used to validate the tests once the analysis has changed, so make sure to only run this if you're sure the output is correct.

## Adding a new test:

To add a new test, make sure it follows the same format as the existing tests, to make sure it's compatible with the test runner scripts.
The steps to add a new test are as follows:
* Create a directory for your test, in the root of this project directory
* This directory must contain: a callgraph.ql script
* This directory must also contain ONE subdirectory, which is the QL database for this project (having more or less than one subdirectory will break the test runner script)
* If you do not already have an "expected" output file, run the `gen_expected_test_output.sh` script with a single argument, the name of your test

## To run the "acorn" benchmark:
1. cd acorn
2. codeql query run --search-path=$ANALYSIS_HOME --database acornjs_acorn_ea851e8 --output=AcornCallGraph.bqrs callgraph.ql
3. codeql bqrs decode --format=csv AcornCallGraph.bqrs > AcornCallGraph.csv

## To run the "memory-fs" benchmark:
1. cd memory-fs
2. codeql query run --search-path=$ANALYSIS_HOME --database webpack_memory-fs_3daa18e --output=MemoryFSCallGraph.bqrs callgraph.ql
3. codeql bqrs decode --format=csv MemoryFSCallGraph.bqrs > MemoryFSCallGraph.csv

## To run the "razorpay" benchmark:
1. cd razorpay-node
2. codeql query run --search-path=$ANALYSIS_HOME --database razorpay_razorpay-node_bf3f3f8 --output=RazorPayCallGraph.bqrs callgraph.ql
3. codeql bqrs decode --format=csv RazorPayCallGraph.bqrs > RazorPayCallGraph.csv
