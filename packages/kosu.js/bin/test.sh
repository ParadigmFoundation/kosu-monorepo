#!/usr/bin/env bash

yarn testRpc &
RPC_PID=$!

while ! nc -z localhost 8545; do
  sleep 0.1
done

# give ganache a minute to spin up
sleep 5

mocha -r ts-node/register
SUCCESS=$?

kill ${RPC_PID}

exit ${SUCCESS}
