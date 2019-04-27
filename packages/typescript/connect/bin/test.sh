#!/usr/bin/env bash

yarn testRpc
RPC_PID=$?

while ! nc -z localhost 8545; do
  sleep 0.1
done

# give ganache another few seconds to get ready
sleep 2

mocha -r ts-node/register
SUCCESS=$?
echo ${SUCESS}

kill ${RPC_PID}

exit ${SUCCESS}
