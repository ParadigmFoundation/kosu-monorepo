#!/usr/bin/env bash

# image name passed in as args (including registry host)
IMAGE_HOST=$1
IMAGE_NAME=$2
IMAGE_VERSION=$3

GCP_BUCKET_URI=$4

# full label of geth image to be built
IMAGE_LABEL_VERSION="$IMAGE_HOST/$IMAGE_NAME:$IMAGE_VERSION"
IMAGE_LABEL_LATEST="$IMAGE_HOST/$IMAGE_NAME:latest"

# build kosu-geth image, tag as latest and push both to GCR
docker build -t $IMAGE_LABEL_VERSION .
docker tag $IMAGE_LABEL_VERSION $IMAGE_LABEL_LATEST
docker push $IMAGE_LABEL_VERSION
docker push $IMAGE_LABEL_LATEST

exit 0