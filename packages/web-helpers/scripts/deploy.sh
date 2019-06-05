#!/usr/bin/env bash

# clean build before deploy
./scripts/build.sh

# deploy to GCP bucket
gsutil -m rm gs://portal.kosu.io/*
gsutil -m cp ./dist/* gs://portal.kosu.io/