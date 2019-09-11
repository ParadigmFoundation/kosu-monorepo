GOTEST_FLAGS ?=
GOTEST = go test ./... ${GOTEST_FLAGS}

BASE_PATH = github.com/ParadigmFoundation/kosu-monorepo/packages/go-kosu
KOSU_VERSION ?= $(shell jq -r .version package.json)
GOBUILD_LDFLAGS = "-X ${BASE_PATH}/version.Version=$(KOSU_VERSION) \
                   -X ${BASE_PATH}/version.GitCommit=$(shell git rev-parse --short HEAD)"

GOLINT = golangci-lint run --enable-all \
		--disable=gochecknoglobals \
		--disable=gocritic \
		--disable=gochecknoinits \
		--disable=scopelint \
		--disable=interfacer \
		--exclude-use-default=false \
		--deadline=10m

.PHONY: testnet

build:
	go build -ldflags $(GOBUILD_LDFLAGS) -o kosud ./cmd/kosud
	go build -ldflags $(GOBUILD_LDFLAGS) -o kosu-cli ./cmd/kosu-cli

testnet:
	docker-compose rm -f
	docker-compose up --build goinstall
	docker-compose up node0 node1 node2 node3 

test-fast:
	$(GOTEST) -failfast

test:
	$(GOTEST)

lint:
	$(GOLINT)

gen:
	go generate ./...

ci: lint test

rpcdocs:
	cd ./rpc/doctool && go run main.go ../
