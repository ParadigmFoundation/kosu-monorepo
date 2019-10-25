# the image drone-ci should use to build go-kosu
FROM golang:1.13-stretch

WORKDIR /home/go-kosu

ENV GOCACHE=/home/.go-build
ENV GO111MODULE=on

ENV GOLINTCI_RELEASE=1.18.0

# setup
RUN apt-get update
RUN apt-get install -y unzip build-essential jq

RUN git clone -b release/1.8 https://github.com/ethereum/go-ethereum /home/go/src/github.com/ethereum/go-ethereum
RUN cd /home/go/src/github.com/ethereum/go-ethereum && GO111MODULE=off make devtools
RUN rm -rf /home/go/src/github.com/ethereum/go-ethereum

# test configuration
ENV ETHEREUM_TEST_ADDRESS=wss://ropsten.infura.io/ws

# install go-bindata
RUN GO111MODULE=off go get -u github.com/go-bindata/go-bindata/...

# install golintci
RUN curl -sfL https://install.goreleaser.com/github.com/golangci/golangci-lint.sh | sh -s -- -b $(go env GOPATH)/bin v${GOLINTCI_RELEASE}
