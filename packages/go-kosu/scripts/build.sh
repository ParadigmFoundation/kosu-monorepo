#!/bin/sh

set -e

if [ ! -f "scripts/build.sh"  ]; then
	echo "$0 must be run from the root of the repository."
	exit 2
fi

if ! command -v go > /dev/null; then
	echo "'go' (https://golang.org/) not found. Please install and run again"
	exit 2
fi

if ! command -v jq > /dev/null; then
	echo "'jq' (https://stedolan.github.io/jq/) not found. Please install and run again"
	exit 2
fi

VERSION=$(cat ./package.json|jq -r .version)
LDFLAGS="-X go-kosu/version.Version=${VERSION}"

echo "Building kosu@${VERSION}"
go build -ldflags "$LDFLAGS" -o kosud ./cmd/kosud
go build -ldflags "$LDFLAGS" -o kosu-cli ./cmd/kosu-cli
