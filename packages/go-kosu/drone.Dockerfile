# the image drone-ci should use to build go-kosu
FROM golang:1.12-stretch

WORKDIR $HOME/go-kosu

ENV GOLINTCI_RELEASE=1.16.0

# install golintci
RUN curl -sfL https://install.goreleaser.com/github.com/golangci/golangci-lint.sh | sh -s -- -b $(go env GOPATH)/bin v${GOLINTCI_RELEASE}
