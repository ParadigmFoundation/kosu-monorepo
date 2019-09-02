FROM node:lts

ENV DOCKER true

ENV GOCACHE=$HOME/.go-build
ENV GO111MODULE=on
ENV GOLINTCI_RELEASE=1.16.0
ENV GOROOT=/usr/local/go
ENV GOPATH=$HOME/go

RUN apt-get update
RUN apt-get install -y netcat build-essential libudev-dev jq

RUN wget -q --show-progress --progress=bar:force https://dl.google.com/go/go1.12.9.linux-amd64.tar.gz
RUN tar -xf go1.12.9.linux-amd64.tar.gz --totals
RUN mv go /usr/local
ENV PATH=$GOPATH/bin:$GOROOT/bin:$PATH
RUN go version
RUN GO111MODULE=off go get -u github.com/go-bindata/go-bindata/...

RUN git clone https://github.com/ethereum/go-ethereum
RUN cd go-ethereum && git checkout release/1.8 && make devtools
RUN rm -rf go-ethereum

RUN yarn global add npm npx ganache-cli typescript prettier

CMD [ "node" ]