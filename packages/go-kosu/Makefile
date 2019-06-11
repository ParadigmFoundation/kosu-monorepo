GOTEST_FLAGS ?=
GOTEST_TAGS  ?= integration
GOTEST = go test ./... ${GOTEST_FLAGS}

GOLINT = golangci-lint run --enable-all \
		--disable=gochecknoglobals \
		--disable=gocritic \
		--disable=gochecknoinits \
		--disable=scopelint \
		--exclude-use-default=false \
		--deadline=10m

vendors:
	go mod vendor

testnet: vendors
	docker-compose up

test-fast:
	$(GOTEST) -failfast

test:
	$(GOTEST) -race -tags=$(GOTEST_TAGS)

lint:
	$(GOLINT)

gen:
	go generate ./...

ci: lint test
