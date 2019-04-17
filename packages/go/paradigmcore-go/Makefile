GOTEST_FLAGS ?= -race
GOTEST_TAGS  ?= integration
GOTEST = go test ./... ${GOTEST_FLAGS}

GOLINT = golangci-lint run --enable-all \
		--disable=gochecknoglobals \
		--disable=gocritic \
		--disable=gochecknoinits \
		--disable=scopelint \
		--exclude-use-default=false

vendors:
	go mod vendor

testnet: vendors
	docker-compose up

test-unit:
	$(GOTEST)

test:
	$(GOTEST) -tags=$(GOTEST_TAGS)

lint:
	$(GOLINT)

ci: lint test
