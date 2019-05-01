#/usr/bin/env bash

# image name passed in as args (including registry host)
IMAGE_HOST=$1
IMAGE_NAME=$2
IMAGE_VERSION=$3

GCP_BUCKET_URI=$4

# load name of archive to use when building image
ARCHIVE_NAME="ganache-db-v$IMAGE_VERSION.zip"

# full label of ganache image to be built
IMAGE_LABEL_VERSION="$IMAGE_HOST/$IMAGE_NAME:$IMAGE_VERSION"
IMAGE_LABEL_LATEST="$IMAGE_HOST/$IMAGE_NAME:latest"

# load and unzip ganache-db archive from GCP bucket
gsutil -m cp $GCP_BUCKET_URI/$ARCHIVE_NAME ./ganache-db.zip
unzip ganache-db.zip

# build kosu-ganache image, tag as latest and push both to GCR
docker build -t $IMAGE_LABEL_VERSION -f ./contracts/ganache.Dockerfile ./
docker tag $IMAGE_LABEL_VERSION $IMAGE_LABEL_LATEST
docker push $IMAGE_LABEL_VERSION
docker push $IMAGE_LABEL_LATEST

# cleanup
rm -rf ganache-db
rm ganache-db.zip

exit 0