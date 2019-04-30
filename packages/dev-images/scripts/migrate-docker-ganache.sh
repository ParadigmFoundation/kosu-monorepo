#!/usr/bin/env bash
GCP_BUCKET_URI=$1
VERSION=$2

ARCHIVE_NAME="ganache-db-v$VERSION.zip"

mkdir ganache-db
ganache-cli -d \
    --networkId 6174 \
    --db ./ganache-db \
    -m "plate tag lend tissue capable ketchup evidence deliver aspect salt used always" \
    > /dev/null &

GANACHE_PID=$!

sleep 5

npm explore @kosu/system-contracts -- truffle migrate --network docker --reset

kill $GANACHE_PID

# compress and upload db archive
zip -r $ARCHIVE_NAME ganache-db
gsutil -m cp $ARCHIVE_NAME $GCP_BUCKET_URI

# cleanup
rm -rf ganache-db
rm -rf $ARCHIVE_NAME

exit 0