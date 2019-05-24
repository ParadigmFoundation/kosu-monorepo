#!/usr/bin/env bash
rm -rf ./dist

yarn compile:assets

cp ./dist/main.js ./test/
cd ./test && python -m SimpleHTTPServer