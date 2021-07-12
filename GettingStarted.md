
# Desynchronizer 
This document contains information on setting up and evaluating the results for Desynchronizer, a tool for automatic refactoring of Synchronous Javascript API to their Asynchronous equivalents.

## Purpose

The main purpose of our artifact is to reproduce the paper's evaluation (Section 5).
This is discussed in our section on **Verification of Evaluation**.
The rest of the artifact document reports on the contents of the artifact and how to use it.

# Contents

- [Getting Started](#getting-started)
- [Understanding the Workflow](#understanding-the-workflow)
  - [Kick-the-Tires](#kick-the-tires) instructions can be found here 
- [Transforming Projects](#transforming-projects)
- [Verification of Evaluation](#verification-of-evaluation)
- [List of Supported Claims](#supported-claims)
- [List of Unsupported Claims](#unsupported-claims)

# <a name="getting-started">Getting Started</a>

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

## Kick-the-Tires

Below you will find a sequence of instructions which stress each aspect of our artifact. 
We will be working with the `deepforge` project as an example.
In the following subsection, general commands are provided with more information.

### Step 0: Ensure Environment Variables are Set

In some cases, the path modifications made by our setup scripts do not carry over outside of the script.
To address this, ensure that you have run the following commands before proceeding:

```
export PATH="$PATH:/root/desynchronizer/codeql-home/codeql" 
export ANALYSIS_HOME="/root/desynchronizer/ApproximateCallGraphAnalysis"
```

### Step 1: Clone and Build `deepforge`

We will use the `deepforge` project as our kick-the-tires exemplar.

First, clone, build, and install the project:

```
cd /root/desynchronizer
git clone https://github.com/JSTransformationBenchmarks/deepforge.git
cd deepforge
npm i
npm run build
```

To ensure reproducibility, we forked the `deepforge` repository to our own organization (`JSTransformationBenchmarks`), and are cloning from there.
This took ~5 mins.

### Step 2: Build Callgraph Manually

Since generating call graphs can take quite some time, and the process of using CodeQL requires a few input commands, we have included prebuilt call graphs for each of our experimental subjects.
That said, we will walk you through creating one such call graph manually.

- Navigate to ApproximateCallGraphBenchmarks directory.
  - `cd /root/desynchronizer/ApproximateCallGraphBenchmarks`
- Create codeql database for project. (Takes some time.)
  - `codeql database create --language=javascript --source-root "../deepforge" "./deepforge-js-db"`
- Copy callgraph.ql (File containing entry point for callgrapg generation) to project database directory.
  - `cp "/root/asyncify/callgraph.ql" "./deepforge-js-db/callgraph.ql"`
- Navigate to project database directory.
  - `cd deepforge-js-db`
- Generate a callgraph based on given entry point. (Takes some time.)
  - `codeql query run --search-path=$ANALYSIS_HOME --database . --output="deepforgeCallGraph.bqrs" callgraph.ql`
- Convert the callgraph to CSV format.
  - `codeql bqrs decode --format=csv "deepforgeCallGraph.bqrs" > "deepforgeCallGraph.csv"`
- Copy callgraph to asyncify/generated-cgs.
  - `cp "deepforgeCallGraph.csv" "/root/asyncify/generated-cgs/deepforgeCallGraph.csv"`

This step takes 10-15 mins.

### Step 3: Perform Transformation

Finally, perform the transformation.

- Navigate to asyncify directory
  - `cd /root/asyncify`
- Transform the project
  - `node ./run.js  "./generated-cgs/deepforgeCallGraph.csv"`

This step takes ~1 min.

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

Our artifact reproduces the important data from Section 5, Table 2 (pg. 17).
We provide a script to perform the transformations based on pre-generated callgraphs. 
The script may take about 40 mins to complete and would present the user with a table containing transformation metrics such as synchronous functions identified, transformed, and related functions transformed.

The following commands can be used to run this script:
- Navigate to asyncify
  - `cd /root/asyncify`
- Run the evaluation
  - `./run-evaluation.sh`

You should then compare the numbers obtained here with those in the paper.

## <a name="supported-claims">List of Supported Claims</a> 

- This artifact supports all the research questions of the paper.
  - Our artifact reproduces Table 2 (pg. 17) from the paper, which we used to argue in favor of our answers to RQs 1 through 4.

## <a name="unsupported-claims">List of Unsupported Claims</a> 

- The performance claims for asynchronous behaviour (from Sections 2 and 3, Fig. 3 pg. 7 and Fig. 6 pg. 10) cannot be verified in virtual environments. Tests have shown significatly worse performance for asynchronous APIs on Virtual environments.
- This artifact uses a generic entry point for callgraph generation. During the actual evaluation, the entry points were tailored to best fit the projects. Thus, this artifact may not reproduce the exact callgraph for all projects. However, we have provided pre-computed callgraphs which can be used to verify the evaluation presented in the paper.
- Due to constraints of the environment, all test projects may not produce a clean build. This, however, does not affect the transformation of projects.
