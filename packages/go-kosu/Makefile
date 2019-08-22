GOTEST_FLAGS ?= -v
GOTEST = go test ./... ${GOTEST_FLAGS}

GOLINT = golangci-lint run --enable-all \
		--disable=gochecknoglobals \
		--disable=gocritic \
		--disable=gochecknoinits \
		--disable=scopelint \
		--disable=interfacer \
		--exclude-use-default=false \
		--deadline=10m

build:
	go build -o kosud ./cmd/kosud
	go build -o kosu-cli ./cmd/kosu-cli

testnet: build
	docker-compose rm -f
	docker-compose up --build

test-fast:
	$(GOTEST) -failfast

test:
	$(GOTEST) -race

lint:
	$(GOLINT)

gen:
	go generate ./...

ci: lint test

rpcdocs:
	cd ./rpc/doctool && go run main.go ../
