#!/usr/bin/env bash

# clear build folder
if [ -d "$DIRECTORY" ]; then
    rm -rf ./dist
fi

# copy html and css to ./dist folder
cp ./public/* ./dist/

# build js files for browser
webpack-dev-server
