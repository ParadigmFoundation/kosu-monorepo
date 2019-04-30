#!/usr/bin/env bash

# start a docker container running a ganache-cli instance with kosu contracts
# store container's ID so it may be terminated after test completion
GANACHE_CONTAINER_ID=$(yarn test:ganache_detached)

# wait for ganache rpc server to start
while ! nc -z localhost 8545; do
  sleep 0.3
done

# give ganache rpc server an additional second to start before testing
sleep 1 && mocha -r ts-node/register
SUCCESS=$?

# cleanup ganache image and return exit code fom tests
docker kill $GANACHE_CONTAINER_ID
exit $SUCCESS
