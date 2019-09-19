# the image drone-ci should use to build go-kosu
FROM golang:1.12-stretch

WORKDIR $HOME/go-kosu

ENV GOCACHE=$HOME/.go-build
ENV GO111MODULE=on

ENV GOLINTCI_RELEASE=1.18.0

# setup
RUN apt-get update
RUN apt-get install -y unzip build-essential jq

RUN git clone https://github.com/ethereum/go-ethereum
RUN cd go-ethereum && make devtools
RUN rm -rf go-ethereum

# test configuration
ENV TENDERMINT_RELEASE=0.31.1
ENV ETHEREUM_TEST_ADDRESS=wss://ropsten.infura.io/ws

# install tendermint
RUN wget https://github.com/tendermint/tendermint/releases/download/v${TENDERMINT_RELEASE}/tendermint_${TENDERMINT_RELEASE}_linux_amd64.zip -O /tmp/tm.zip
RUN unzip /tmp/tm.zip
RUN install tendermint /usr/local/bin
RUN rm tendermint

# install go-bindata
RUN GO111MODULE=off go get -u github.com/go-bindata/go-bindata/...

# install golintci
RUN curl -sfL https://install.goreleaser.com/github.com/golangci/golangci-lint.sh | sh -s -- -b $(go env GOPATH)/bin v${GOLINTCI_RELEASE}
