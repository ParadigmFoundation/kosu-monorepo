#!/usr/bin/env bash
CONTAINER_HASH=$(docker run -d --rm -p 8545:8545 gcr.io/kosu-io/kosu-ganache:0.0.1)

while ! nc -z localhost 8545; do
  sleep 0.1
done

# give ganache another few seconds to get ready
sleep 2

mocha -r ts-node/register
SUCCESS=$?

docker kill $CONTAINER_HASH
exit ${SUCCESS}
