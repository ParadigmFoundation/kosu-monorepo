GOTEST_FLAGS ?=
GOTEST_TAGS  ?= integration
GOTEST = go test ./... ${GOTEST_FLAGS}

KOSU_VERSION ?= $(shell jq -r .version package.json)
GOBUILD_LDFLAGS = "-X go-kosu/version.Version=$(KOSU_VERSION) \
                   -X go-kosu/version.GitCommit=$(shell git rev-parse --short HEAD)"

GOLINT = golangci-lint run --enable-all \
		--disable=gochecknoglobals \
		--disable=gocritic \
		--disable=gochecknoinits \
		--disable=scopelint \
		--disable=interfacer \
		--exclude-use-default=false \
		--deadline=10m

build:
	go build -ldflags $(GOBUILD_LDFLAGS) -o kosud ./cmd/kosud
	go build -ldflags $(GOBUILD_LDFLAGS) -o kosu-cli ./cmd/kosu-cli

testnet: build
	docker-compose rm -f
	docker-compose up --build

test-fast:
	$(GOTEST) -failfast

test:
	$(GOTEST) -race -tags=$(GOTEST_TAGS)

lint:
	$(GOLINT)

gen:
	go generate ./...

ci: lint test

rpcdocs:
	cd ./rpc/doctool && go run main.go ../
