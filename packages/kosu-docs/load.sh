#!/usr/bin/env bash

# ==================================================
# Load the latest built docs from the kosu monorepo
# ==================================================

GSUTIL_NOT_FOUND="binary 'gsutil' not found, unable to load latest docs; checked-in docs may be out of date."
LOADED_DOCS="successfully loaded latest docs from kosu storage."
LOADING_DOCS="found 'gsutil' binary, loading docs from storage bucket..."

log () {
    GREEN='\033[0;32m'
    NC='\033[0m'
    echo -e "$GREEN[kosu-docs: info]$NC $1"
}

warn () {
    YELLOW='\033[1;33m'
    NC='\033[0m'
    echo -e "$YELLOW[kosu-docs: warn]$NC $1" 
}

err () {
    RED='\033[0;31m'
    NC='\033[0m'
    echo -e "$RED[kosu-docs: err]$NC $1"
}

# alert user
if [ ! -x $(command -v gsutil) ]
    then
        warn "$GSUTIL_NOT_FOUND"
        exit 0
fi 

# load latest built docs from public kosu storage
log "$LOADING_DOCS"

gsutil -m rsync -r -c -d gs://kosu-docs/kosu.js ./docs/kosu.js
gsutil -m rsync -r -c -d gs://kosu-docs/kosu-system-contracts ./docs/kosu-system-contracts 
gsutil -m rsync -r -c -d gs://kosu-docs/go-kosu ./docs/go-kosu 

log "$LOADED_DOCS"
exit 0