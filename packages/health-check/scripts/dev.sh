#!/usr/bin/env bash

# clear build folder
rm ./dist/*

# copy html and css to ./dist folder
cp ./public/* ./dist/

# build js files for browser
webpack-dev-server
