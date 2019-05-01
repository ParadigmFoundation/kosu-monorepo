#!/usr/bin/env bash

# start a docker container running a ganache-cli instance with kosu contracts
# store container's ID so it may be terminated after test completion
GANACHE_CONTAINER_ID=$(yarn test:ganache_detached | grep -x '[a-z0-9]\{64\}')

# wait for ganache rpc server to start
while ! nc -z localhost 8545; do
  sleep 0.3
done

# give ganache rpc server an additional second to start before testing
sleep 1 && ts-mocha -p tsconfig.json test/
SUCCESS=$?

# cleanup ganache image and return exit code fom tests
docker kill $GANACHE_CONTAINER_ID
exit $SUCCESS
