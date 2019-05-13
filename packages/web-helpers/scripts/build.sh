#!/usr/bin/env bash

# clear build folder 
if [ -d "$DIRECTORY" ]; then
    rm -rf ./dist
fi

# build js files for browser
webpack

# copy html and css to ./dist folder
cp ./public/* ./dist/

