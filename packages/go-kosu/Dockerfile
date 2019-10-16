FROM golang:1.13

WORKDIR /go-kosu
COPY . .
RUN go build ./cmd/kosud 

CMD ./kosud
