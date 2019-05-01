#!/usr/bin/env bash

# location to store archive, and file name version passed as args
GCP_BUCKET_URI=$1
VERSION=$2
ARCHIVE_NAME="ganache-db-v$VERSION.zip"

# create temp db, and start ganache instance (forked process)
mkdir ganache-db
ganache-cli -d \
    --networkId 6174 \
    --db ./ganache-db \
    -m "plate tag lend tissue capable ketchup evidence deliver aspect salt used always" \
    > /dev/null &

GANACHE_PID=$!

sleep 5

# migrate contracts to ganache instance with docker network id
npm explore @kosu/system-contracts -- truffle migrate --network docker --reset

kill $GANACHE_PID

# compress and upload db archive to GCP bucket
zip -r $ARCHIVE_NAME ganache-db
gsutil -m cp $ARCHIVE_NAME $GCP_BUCKET_URI

# cleanup
rm -rf ganache-db
rm -rf $ARCHIVE_NAME

exit 0