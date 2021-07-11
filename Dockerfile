
FROM ubuntu:20.04

# replace shell with bash so we can source files
RUN rm /bin/sh && ln -s /bin/bash /bin/sh

WORKDIR /root

# update the repository sources list
# and install dependencies
RUN apt-get update \
    && apt-get install -y curl git zip unzip nano python make build-essential \
    && apt-get -y autoclean

# nvm environment variables
ENV NVM_DIR /usr/local/nvm
ENV NODE_VERSION 14.9.0

# install nvm
# https://github.com/creationix/nvm#install-script
RUN curl --silent -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.2/install.sh | bash

# install node and npm
RUN source $NVM_DIR/nvm.sh \
    && nvm install $NODE_VERSION \
    && nvm alias default $NODE_VERSION \
    && nvm use default

# add node and npm to path so the commands are available
ENV NODE_PATH $NVM_DIR/v$NODE_VERSION/lib/node_modules
ENV PATH $NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH

# confirm installation
RUN node -v
RUN npm -v

COPY ./asyncify.zip ./asyncify.zip
RUN mkdir asyncify
WORKDIR /root/asyncify
RUN unzip ../asyncify.zip

WORKDIR /root
RUN mkdir desynchronizer
COPY ./ApproximateCallGraphBenchmarks "./desynchronizer/ApproximateCallGraphBenchmarks"

CMD ["/bin/bash"]
