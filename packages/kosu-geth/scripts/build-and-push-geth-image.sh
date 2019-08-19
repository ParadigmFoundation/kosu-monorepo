#!/usr/bin/env bash

# image name passed in as args (including registry host)
DOCKER_FILE=$1
IMAGE_HOST=$2
IMAGE_NAME=$3
IMAGE_VERSION=$4

GCP_BUCKET_URI=$5

# full label of geth image to be built
IMAGE_LABEL_VERSION="$IMAGE_HOST/$IMAGE_NAME:$IMAGE_VERSION"
IMAGE_LABEL_LATEST="$IMAGE_HOST/$IMAGE_NAME:latest"

# build kosu-geth image, tag as latest and push both to GCR
docker build -t $IMAGE_LABEL_VERSION . -f DOCKER_FILE
docker tag $IMAGE_LABEL_VERSION $IMAGE_LABEL_LATEST
docker push $IMAGE_LABEL_VERSION
docker push $IMAGE_LABEL_LATEST

exit 0