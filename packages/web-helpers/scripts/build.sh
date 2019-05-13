#!/usr/bin/env bash

# clear build folder 
rm ./dist/*

# build js files for browser
webpack

# copy html and css to ./dist folder
cp ./public/* ./dist/

