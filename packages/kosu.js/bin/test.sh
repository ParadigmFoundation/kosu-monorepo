#!/usr/bin/env bash
RPC_PID=$(yarn testRpc | grep '^[0-9]*$')

while ! nc -z localhost 8545; do
  sleep 0.1
done

# give ganache another few seconds to get ready
sleep 2

mocha -r ts-node/register
SUCCESS=$?

kill ${RPC_PID}
exit ${SUCCESS}
