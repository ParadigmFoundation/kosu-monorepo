#!/usr/bin/env bash

rm ganache-docker/ganache-db/* || true

SLEEP 8

ganache-cli --networkId 6174 -d --db ./ganache-docker/ganache-db -m "plate tag lend tissue capable ketchup evidence deliver aspect salt used always" &
GANACHE_PID=$!

SLEEP 5
echo ${GANACHE_PID}

truffle migrate --network docker

kill ${GANACHE_PID}

git add ganache-docker/ganache-db -f