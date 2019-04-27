FROM golang:1.12

WORKDIR /go-kosu
COPY . .
RUN go build ./cmd/kosud 

CMD ./kosud
