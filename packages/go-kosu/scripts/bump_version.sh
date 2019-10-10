#!/bin/bash

function update_package() {
	json=$(<package.json)
	echo $json | jq --indent 4 .version=\"$1\" > package.json
}

function update_CHANGELOG() {
	sed -i "/## master/a\
\\\n\
## $1" CHANGELOG.md
}

update_package $1
update_CHANGELOG $1
