#/usr/bin/env bash
IMAGE_HOST=$1
IMAGE_NAME=$2
IMAGE_VERSION=$3

GCP_BUCKET_URI=$4

ARCHIVE_NAME="ganache-db-v$IMAGE_VERSION.zip"
IMAGE_LABEL="$IMAGE_HOST/$IMAGE_NAME:$IMAGE_VERSION"

gsutil -m cp $GCP_BUCKET_URI/$ARCHIVE_NAME ./ganache-db.zip
unzip ganache-db.zip

docker build -t $IMAGE_LABEL -f ./contracts/ganache.Dockerfile ./

# cleanup
rm -rf ganache-db
rm ganache-db.zip

exit 0