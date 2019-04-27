#!/usr/bin/env bash

# start ganache and fork to background
ganache-cli \
    --networkId 6174 \
    -d --db ./bin/ganache-db \
    -m "plate tag lend tissue capable ketchup evidence deliver aspect salt used always" \
    > ./bin/.log &

# store PID so it may be killed by someone else
export GANACHE_TEST_PID=$!

# also echo the PID
echo ${GANACHE_TEST_PID}
exit 0