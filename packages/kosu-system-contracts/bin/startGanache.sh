#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

# start ganache
ganache-cli \
    --networkId 6174 \
    -d --db ${DIR}/ganache-db \
    -m "plate tag lend tissue capable ketchup evidence deliver aspect salt used always" \
    > ./bin/.log
