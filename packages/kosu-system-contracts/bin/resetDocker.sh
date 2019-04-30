#!/usr/bin/env bash

rm -rf ./bin/ganache-db || true
mkdir ./bin/ganache-db

SLEEP 8

ganache-cli --networkId 6174 -d --db ./bin/ganache-db -m "plate tag lend tissue capable ketchup evidence deliver aspect salt used always" &
GANACHE_PID=$!

SLEEP 5

echo ${GANACHE_PID}

truffle migrate --reset --network docker

kill ${GANACHE_PID}

# git add ./bin/ganache-db -f