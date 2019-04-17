FROM golang:1.12

WORKDIR /paradigmcore
COPY . .
RUN go build -mod vendor

CMD ./paradigmcore
