#!/usr/bin/env bash

# clean build before deploy
./scripts/build.sh

# deploy to GCP bucket
gsutil -m rm gs://status.orderstream.network/*
gsutil -m cp ./dist/* gs://status.orderstream.network/