# go-kosu

## Running

Run the server

```
export KOSU_HOME=./my_node
tendermint init --home=$KOSU_HOME
go run ./cmd/kosud/main.go
```

Executa a transaction

```
go run ./cmd/kosu-cli/main.go tx rebalance 1 1 11
```

Execute queries
```
$ go run ./cmd/kosu-cli/main.go query round
ok: < number:3 starts_at:21 ends_at:31 >

$ go run ./cmd/kosu-cli/main.go query consensus
ok: < PeriodLength:10 >

go run ./cmd/kosu-cli/main.go query poster 0x08FA21AF985591E775523eF161F023764175A932
ok: < balance:<value:"\r\340\266\263\247d\000\000" > >
```

## Running the testnet

The testnet will start 4 nodes using the configuration from `./testnet/node{0-4}`, it uses `docker-compose` to orchestrate the nodes.

To start the testnet run `make testnet`. You can selectively stop and restart nodes using `docker-compose` cli tool.

To test transactions, you can use `go run ./cmd/client/main.go <node> <number>` where `<node>` is a node endpoint like: `http://192.167.10.3:26657` and `<n>` is the Round number, you should start with `"1"` and increase by one every time you run the command.

To restart the testnet and clean the stored state run `docker-compose rm -f`
