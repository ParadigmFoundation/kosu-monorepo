`go-kosu`
=

Running
--
Run the server
```
export PARADIGM_HOME=./my_node
tendermint init --home=$PARADIGM_HOME
go run ./cmd/kosud/main.go
```

Executa a transaction
```
go run ./cmd/kosu-cli/main.go rebalance 1
```


Running the testnet
--
The testnet will start 4 nodes using the configuration from `./testnet/node{0-4}`, it uses `docker-compose` to orchestrate the nodes.

To start the testnet run `make testnet`. You can selectively stop and restart nodes using `docker-compose` cli tool.

To test transactions, you can use `go run ./cmd/client/main.go <node> <number>` where `<node>` is a node endpoint like: ` http://192.167.10.3:26657` and `<n>` is the Round number, you should start with `"1"` and increase by one everytime you run the command.

To restart the testnet and clean the stored state run `docker-compose rm -f`
