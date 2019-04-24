#!/usr/bin/env bash

yarn testRpc &
RPC_PID=$!

SLEEP 5

mocha -r ts-node/register
SUCCESS=$?

kill ${RPC_PID}

exit ${SUCCESS}
