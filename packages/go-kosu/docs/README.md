# Go Kosu (`go-kosu`)

Golang reference implementation of the Kosu protocol, built on [Tendermint Consensus.](https://github.com/tendermint/tendermint)

Automated per-commit builds are available for `Linux/amd64` architectures, published with each update to the `master` branch.

Stable release builds will be available from the GitHub releases page after an initial beta release.

## Documentation

-   Usage documentation is located in `docs/` (and hosted [here](https://docs.kosu.io/go-kosu)).
-   Package documentation for Go projects can be found [here.](https://godoc.org/github.com/ParadigmFoundation/kosu-monorepo)

## Building from source

Binaries from `go-kosu` must be build alongside the rest of the `kosu-monorepo` due to the Kosu client implementation's dependency on contract system build artifacts. See [the top-level README for full build instructions.](https://github.com/ParadigmFoundation/kosu-monorepo/blob/master/README.md#install-instructions)

### Prerequisites

In order to build the full monorepo, the following is required:

-   [Node.js](https://nodejs.org/en/download/) (`^10`)
-   [Yarn](https://yarnpkg.com/lang/en/docs/install/#mac-stable) (`^1.15`)
-   [jq](https://stedolan.github.io/jq/download/) (`^1.6`)
-   [golang](https://golang.org/dl/) (`^1.12`)
-   [go-ethereum](https://github.com/ethereum/go-ethereum/wiki/Building-Ethereum) (`^1.8`)
-   [go-bindata](https://github.com/go-bindata/go-bindata) (`^3.1`)

### Clone monorepo

Clone the full `kosu-monorepo` with the following command:

```bash
# over SSH (recommended)
git clone git@github.com:ParadigmFoundation/kosu-monorepo.git

# over HTTPS
git clone https://github.com/ParadigmFoundation/kosu-monorepo.git
```

### Install package dependencies

Build and link all package dependencies with `yarn` (do not use `npm`):

```
yarn
```

### Build all packages

The following command will build all packages, including the Kosu contract system and the `kosud` binary:

```
yarn build
```

After building, all `go-kosu` binaries will be available in the `packages/go-kosu` folder.

### Rebuilding

After a full monorepo build, `go-kosu` can be subsequently rebuilt (during development) with:

```bash
cd packages/go-kosu
make
```

## Executables

The `go-kosu` project includes several executeables, found in the `cmd` folder. See the [binaries](#binaries) section for download and install instructions.

-   [`kosud`](#binary-kosud) - Kosu reference implementation validator and full-node client.
-   [`kosu-cli`](#binary-kosu-cli) - Command-line interface for `kosud` and other tools.

### Downloads

Pre-built binaries for `go-kosu` are available (per-commit CD builds are currently Linux/amd64 only, build locally for other targets).

#### Binary: `kosud`

Kosu network client reference implementation, built on Tendermint consensus. Run `kosud --help` for usage.

```bash
wget https://storage.googleapis.com/kosud/linux_amd64/kosud
chmod +x kosud
install kosud /usr/local/bin
```

#### Binary: `kosu-cli`

Command-line interface for `kosud` (run `kosu-cli` for usage).

```bash
wget https://storage.googleapis.com/kosu-cli/linux_amd64/kosu-cli
chmod +x kosu-cli
install kosu-cli /usr/local/bin
```

## Usage

Each binary has a `help` command or `--help` flag which should be used for full command reference.

View full usage documentation [here.](https://docs.kosu.io/go-kosu/#usage)

### Start a node

You can start a single-node Kosu development network with the following commands:

```bash
# generate keypair and base configuration
kosud init --home=$HOME/.kosu
kosud start -E [ETHEREUM_JSONRPC_URL] --home=$HOME/.kosu
```

The command-line interface will also be built (see `kosu-cli help` for all commands).

### Sending transactions

Force a rebalance transaction (must be parameterized correctly):

```bash
kosu-cli tx rebalance [round_number] [period_start] [period_end]
```

### Querying state

The `kosu-cli` executable provides the ability to query the node's and network's current state (see `kosu-cli query --help` for all commands).

```bash
# view consensus parameters
kosu-cli query consensus

# view current round information
kosu-cli query round

# view a poster account
kosu-cli query poster [ethereum_address]
```

### JSON-RPC

The `kosud` binary provides a `JSON-RPC` bridge which allows you to subscribe to events and submit transactions.
Start the `JSON-RPC` bridge and interact with kosud use the `kosud rpc` sub-command.

### Running test-network

A four-node test network can be started with `docker-compose` for testing and development. It expects an Ethereum JSONRPC-API to be available at `localhost:8545` with the Kosu system contracts deployed.

The test-net will expose the Tendermint ABCI RPC-API on ports `8000` to `8003` for nodes `0` through `3` respectively.

```bash
make testnet
```
