> **[Kosu genesis CLI](README.md)**

[Globals](globals.md) /

# Tool: `gen-kosu`

This package contains the source code for the binary `gen-kosu`, a CLI utility for generating a Kosu network genesis file generating a snapshot of the Kosu contract system state at a specific block height.

The package also exports all functions used to generate the genesis file for public audit and usage in other scripts.

Before being used for main-net or public test network's by validators, the tests and source should be independently verified for logical correctness.

## Documentation

Documentation is hosted on [`docs.kosu.io`](https://docs.kosu.io/) and can also be found in the `docs` folder.

There is additional documentation within certain methods, and all potential validators are encouraged to read the snapshot logic and independently verify the programs correctness.

## CLI

The primary entry-point for most users will be the `gen-kosu` binary, used to generate Kosu network genesis files.

For public networks, the genesis parameters must be established prior to usage of this script.

### Install

Install the `gen-kosu` CLI with Yarn or NPM.

```bash
# with yarn
yarn global add @kosu/genesis-cli

# with npm
npm i -g @kosu/genesis-cli
```

### Usage

_The below is the output of `gen-kosu --help`._

```
Usage: gen-kosu [options]

Simple CLI for snap-shotting Kosu contract system to generate a Kosu network genesis file.

Be sure to view the documentation (docs.kosu.io) for more information and usage instructions.

The generated genesis JSON is printed directly to stdout if the program exits successfully.

The following options are required:
    -n, --chain-id <name>
    -p, --provider-url <url>
    -b, --snapshot-block <number>
    -t, --start-time <number>

Options:
  -V, --version                         output the version number
  -n, --chain-id <name>                 Specify the resulting Kosu chain ID
  -p, --provider-url <url>              HTTP Ethereum JSONRPC provider
  -b, --snapshot-block <number>         The block height at which to snapshot Kosu contract system state
  -t, --start-time <number>             Unix timestamp (in seconds) of network start
  -f, --finality-threshold <number>     Minimum age of Ethereum blocks before submitting attestations (default: "10")
  -l, --period-limit <number>           Maximum number of order messages to accept per rebalance period (default: "100000")
  -L, --period-length <number>          The length of each rebalance period (in Ethereum blocks) (default: "5")
  -m, --max-order-bytes <number>        The maximum size of a single order transaction (default: "4096")
  -B, --blocks-before-pruning <number>  Maximum age of attestations before pruning (default: "50")
  -o, --orders-limit <number>           The maximum number of orders to keep in state at time (default: "100")
  -h, --help                            output usage information
```

## Develop

The exported functions within this package are intended to be useful outside the context of the CLI, and can be used in other scripts that need to snapshot contract system state.

All primary logic for generating the snapshot and genesis JSON is found in [`functions.ts`.](./src/functions.ts)

### Install dependencies

Install NPM dependencies

### Build

Build the output files (to `lib/`) with `yarn build` (or `npm run build`).

### Test

Run unit tests with `yarn test` (start the local CLI with `yarn gen-kosu [options]`).
