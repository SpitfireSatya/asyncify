
# Desynchronizer 
This document contains information on setting up and evaluating the results for Desynchronizer, a tool for automatic refactoring of Synchronous Javascript API to their Asynchronous equivalents.


# Contents

- Getting Started (#getting-started)
- Understanding the Workflow (#understanding-the-workflow)
- Transforming Projects (#transforming-projects)
- Verification of evaluation (#verification-of-evaluation)


# Getting Started

For ease of setting up the artifact, the project has been bundled into a docker container.
Please make sure docker is installed on your system before proceeding.
*Note:* Sudo privileges may be required to run the docker commands.

In order to pull the container, please run the below command:
- `docker pull satyajitgokhale/desynchronizer`

The container can be run using the command:
- `docker run --name desynchronizer -it satyajitgokhale/desynchronizer bash`

This will start the container and the default work directory should be */root*.

Alternatively, the image can be built from the source repository, by following the instructions in README.md.

## Useful links:
- Github: https://github.com/SpitfireSatya/asyncify
- Docker Hub: https://hub.docker.com/repository/docker/satyajitgokhale/desynchronizer

## Container layout

All relevant files are located in the */root* directory.
The directory contains 2 directories:
- asyncify: Directory containing the source code for the project and scripts for running evaluations.
- desynchronizer: Directory containing other dependencies such as codeql, callgraph generator, and target applications to be transformed.

All commands will be executed in the */root/asyncify* directory.


# Understanding The Workflow

The workflow for transformation of any project is as below:
- Setting up the project.
- Generating a callgraph.
- Transforming the project.

For easy of transformation, the script *setup-and-transform-project.sh* has been written to complete all required tasks.
The script takes in 2 arguments, the github cloning url of the project and the name of the project and can be used as below:
- `cd /root/asyncify`
- `./setup-and-transform-project.sh <github-cloning-url> <project-name>`

eg. `./setup-and-transform-project.sh https://github.com/JSTransformationBenchmarks/apps.git apps`

A full list of urls and project names used during the evaluation can be found later in this section.

The following sections contain a breakdown of the various tasks performed by this script.

## Setting up the project

In order to keep the container size relatively small, target projects have not been set up in the container.
Each project can be set up using the below set of commands:
- Navigate to desynchronizer directory
  - `cd /root/desynchronizer`
- Clone the project  
  - `git clone <project-url>`
- Navigate to project directory
  - `cd <project-name>`
- Run npm install to install dependencies
  - `npm install`
- Build the project
  - `npm run build`

## Generating a Callgraph

This project uses an implementation of static analysis written in codeql. As a result, certain pre-processing steps are required to generate a callgraph.
A callgraph can be generated for each project using the below set of commands:
- Navigate to ApproximateCallGraphBenchmarks directory
  - `cd /root/desynchronizer/ApproximateCallGraphBenchmarks`
- Create codeql database for project
  - `codeql database create --language=javascript --source-root "../<project-name>" "./<project-name>-js-db"`
- Copy callgraph.ql (File containing entry point for callgrapg generation) to project database directory
  - `cp "/root/asyncify/callgraph.ql" "./<project-name>-js-db/callgraph.ql"`
- Navigate to project database directory
  - `cd <project-name>-js-db`
- Generate a callgraph based on given entry point.
  - `codeql query run --search-path=$ANALYSIS_HOME --database . --output="<project-name>CallGraph.bqrs" callgraph.ql`
- Convert the callgraph to CSV format.
  - `codeql bqrs decode --format=csv "<project-name>CallGraph.bqrs" > "<project-name>CallGraph.csv"`
- Copy callgraph to asyncify/generated-cgs
  - `cp "<project-name>CallGraph.csv" "/root/asyncify/generated-cgs/<project-name>CallGraph.csv"`

## Transform the project

Now that the callgraph is generated, the project can be transformed using the run.js file in asyncify.
The project can be transformed using the below set of commands:
- Navigate to asyncify directory
  - `cd /root/asyncify`
- Transform the project
  - `node ./run.js  "./generated-cgs/<project-name>CallGraph.csv"`

## Project names and urls for evaluation.

The below list contains commands for setting up each project used in the evaluation.

- `./setup-and-transform-project.sh https://github.com/JSTransformationBenchmarks/deepforge.git "deepforge"`
- `./setup-and-transform-project.sh https://github.com/JSTransformationBenchmarks/meteor-desktop.git "meteor-desktop"`
- `./setup-and-transform-project.sh https://github.com/JSTransformationBenchmarks/apps.git "apps"`
- `./setup-and-transform-project.sh https://github.com/JSTransformationBenchmarks/switchBoard.git "switchBoard"`
- `./setup-and-transform-project.sh https://github.com/JSTransformationBenchmarks/flatsheet.git "flatsheet"`
- `./setup-and-transform-project.sh https://github.com/JSTransformationBenchmarks/bonescript.git "bonescript"`
- `./setup-and-transform-project.sh https://github.com/JSTransformationBenchmarks/FiltersCompiler.git "FiltersCompiler"`
- `./setup-and-transform-project.sh https://github.com/JSTransformationBenchmarks/a11y-metrics.git "a11y-metrics`"
- `./setup-and-transform-project.sh https://github.com/JSTransformationBenchmarks/ember-watson.git "ember-watson`"
- `./setup-and-transform-project.sh https://github.com/JSTransformationBenchmarks/adapt_authoring.git "adapt_authoring"`
- `./setup-and-transform-project.sh https://github.com/JSTransformationBenchmarks/TurboScript.git "TurboScript"`
- `./setup-and-transform-project.sh https://github.com/JSTransformationBenchmarks/useragent.git "useragent"`

*Note 1:* The default entry point for each project used here is test files. During evaluation, a different entry point has been used for some projects. The callgraphs used during evaluation can be found in /asyncify/evaluation.

*Note 2:* Each project may take a few minutes to complete.

# Verification Of Evaluation

In order to verify the evaluation presented in the paper, a script has been written to perform the transformations based on pre-generated callgraphs. The script may take about 40 mins to complete and would present the user with a table containing transformation metrics such as synchronous functions identified, transformed, and related functions transformed.

The following commands can be used to run this script:
- Navigate to asyncify
  - `cd /root/asyncify`
- Run the evaluation
  - `./run-evaluation.sh`
