<center>
    <img src="https://storage.googleapis.com/kosu-general-storage/kosu_logo.png" width="150px" >
</center>

---

This monorepo contains the packages that implement the Kosu protocol, alongside supporting packages and developer tooling.

Documentation for Kosu packages is available in this repository, and hosted at [`docs.kosu.io`](https://docs.kosu.io).

## Contents

-   [Packages](#packages)
    -   [Contract packages](#contract-packages)
    -   [Library packages](#library-packages)
    -   [Client packages](#client-packages)
    -   [Utility/development packages](#utility-development-packages)
-   [Install instructions](#install-instructions)
    -   [Prerequisites](#prerequisites)
    -   [Homebrew](#homebrew)
    -   [Clone kosu-monorepo](#clone-kosu-monorepo)
    -   [Build packages](#build-packages)
    -   [Run validator node](#run-a-validator-node)
-   [Documentation](#documentation)
-   [Docker images](#docker-images)
-   [Binaries](#binaries)
-   [Contributing](#contributing)
-   [Issues](#issues)
-   [License](#license)

## Packages

### Contract packages

Smart-contract packages (Solidity) including the core Kosu system contracts and SubContract SDK and contract test suite.

| Package &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;            | Version                                                         | Description                                                              |
| :----------------------------------------------------------- | :-------------------------------------------------------------- | :----------------------------------------------------------------------- |
| [`@kosu/system-contracts`](./packages/kosu-system-contracts) | ![npm](https://img.shields.io/npm/v/@kosu/system-contracts.svg) | The core Kosu contract system in Solidity (with low-level wrappers).     |
| [`@kosu/solidity-tests`](./packages/kosu-system-contracts)   | ![npm](https://img.shields.io/npm/v/@kosu/solidity-tests.svg)    | TypeScript test suite for the Kosu contract system.                      |
| [`@kosu/subcontract-sdk`](./packages/kosu-sdk-contracts)     | ![npm](https://img.shields.io/npm/v/@kosu/subcontract-sdk.svg)  | The Kosu `SubContract` interface and example implementations.            |
| [`@kosu/migrations`](./packages/kosu-migrations)             | ![npm](https://img.shields.io/npm/v/@kosu/migrations.svg)       | Scripts and utilities for deploying Kosu contracts to Ethereum networks. |

### Client packages

Kosu network clients (currently, only [`go-kosu`](./packages/go-kosu)). Includes validator implementation, full/light node's, CLI, and JSONRPC server.

| Package                         | Version                                                     | Description                                                                       |
| :------------------------------ | :---------------------------------------------------------- | :-------------------------------------------------------------------------------- |
| [`go-kosu`](./packages/go-kosu) | ![version](https://img.shields.io/badge/version-0.4.0-blue) | The reference implementation of the Kosu network in Go, built on Tendermint Core. |

### Library packages

Client/server libraries for interacting with the Kosu network and contract system.

| Package &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;          | Version                                                       | Description                                                                |
| :--------------------------------------------------------- | :------------------------------------------------------------ | :------------------------------------------------------------------------- |
| [`@kosu/kosu.js`](./packages/kosu.js)                      | ![npm](https://img.shields.io/npm/v/@kosu/kosu.js.svg)        | Exports all Kosu helper classes, utility functions, and contract wrappers. |
| [`@kosu/node-client`](./packages/kosu-node-client-kosu)    | ![npm](https://img.shields.io/npm/v/@kosu/node-client.svg)    | TypeScript client for interacting with a Kosu node over JSONRPC.           |
| [`@kosu/genesis-cli`](./packages/kosu-genesis-cli)         | ![npm](https://img.shields.io/npm/v/@kosu/genesis-cli.svg)    | Library and CLI for generating network genesis files from contract sate.   |
| [`@kosu/contract-utils`](./packages/kosu-contract-utils)   | ![npm](https://img.shields.io/npm/v/@kosu/contract-utils.svg) | Utilities for interacting with Kosu (decoding event logs, etc.).           |
| [`@kosu/contract-helpers`](./packages/kosu-contract-utils) | ![npm](https://img.shields.io/npm/v/@kosu/contract-helpers.svg) | High-level convenience wrappers for interacting with Kosu contracts.       |

### Utility/development packages

| Package &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;                | Version                                                           | Description                                                          |
| :--------------------------------------------------------------- | :---------------------------------------------------------------- | :------------------------------------------------------------------- |
| [`@kosu/deployed-addresses`](./packages/kosu-deployed-addresses) | ![npm](https://img.shields.io/npm/v/@kosu/deployed-addresses.svg) | Kosu contract addresses for various Ethereum networks.               |
| [`@kosu/test-helpers`](./packages/kosu-test-helpers)             | ![npm](https://img.shields.io/npm/v/@kosu/test-helpers.svg)       | Helpful utilities for testing building Kosu contract-related tests.  |
| [`@kosu/types`](./packages/kosu-types)                           | ![npm](https://img.shields.io/npm/v/@kosu/types.svg)              | TypeScript type definitions for Kosu projects.                       |
| [`@kosu/dev-images`](./packages/dev-images)                      | ![npm](https://img.shields.io/npm/v/@kosu/dev-images.svg)         | Development docker images and supporting scripts for Kosu packages.  |
| [`@kosu/kosu-geth`](./packages/kosu-geth)                        | ![version](https://img.shields.io/badge/version-0.1.1-blue)       | Geth PoA configuration for private Kosu test networks (CI, etc.).    |
| [`@kosu/tslint-config`](./packages/tslint-config)                | ![npm](https://img.shields.io/npm/v/@kosu/tslint-config.svg)      | TypeScript linter base configuration for Kosu TypeScript projects.   |
| [`@kosu/tsc-config`](./packages/tsc-config)                      | ![npm](https://img.shields.io/npm/v/@kosu/tsc-config.svg)         | TypeScript compiler base configuration for Kosu TypeScript projects. |
| [`@kosu/web-helpers`](./packages/web-helpers)                    | ![npm](https://img.shields.io/npm/v/@kosu/web-helpers.svg)        | Simple web interface for interacting with the Kosu contract system.  |

## Install Instructions

### Prerequisites

In order to build the full monorepo, the following is required:

-   [Node.js](https://nodejs.org/en/download/) (`^10`)
-   [Yarn](https://yarnpkg.com/lang/en/docs/install/#mac-stable) (`^1.15`)
-   [jq](https://stedolan.github.io/jq/download/) (`^1.6`)
-   [golang](https://golang.org/dl/) (`^1.13`)
-   [go-bindata](https://github.com/go-bindata/go-bindata) (`^3.1`)
-   [go-ethereum](https://github.com/ethereum/go-ethereum/wiki/Building-Ethereum) (`^1.8`)
    -   Only the `abigen` binary is required to build the monorepo.

### Homebrew

MacOS users can install most required packages with [`Homebrew`](https://brew.sh/) package manager.

For other operating systems, see the official install instructions for each required package (linked above).

#### Yarn

This will also install Node.js if it is not already installed.

```
brew install yarn
```

#### Ethereum tools

To install the `go-ethereum` suite with `brew`:

```
brew tap ethereum/ethereum
brew install ethereum
```

#### Jq (JSON query)

To install `jq` (JSON parsing binary):

```
brew install jq
```

### Clone kosu-monorepo

Clone the repository via SSH:

```
git clone git@github.com:ParadigmFoundation/kosu-monorepo
```

Or via HTTP:

```
git clone https://github.com/ParadigmFoundation/kosu-monorepo
```

### Build packages

Install dependencies:

```
yarn
```

To build all packages:

```
yarn build
```

## Documentation

Generated documentation is published for the following packages with each commit, and published to [`docs.kosu.io`](https://docs.kosu.io):

-   [`go-kosu`](https://docs.kosu.io/go-kosu): Golang Tendermint-based network reference implementation and CLI.
-   [`@kosu/kosu.js`](https://docs.kosu.io/kosu.js): TypeScript library for interacting with the Kosu contract system and network.
-   [`@kosu/system-contracts`](https://docs.kosu.io/kosu-system-contracts): The core Kosu system smart-contracts in Solidity, and TypeScript test suite.

_Documentation is also checked in to each package and viewable on GitHub._

## Docker images

Various development images used for Kosu CI/CD and development are publicly available on GCR (download with `docker pull`), and built from each `master` commit.

### `kosu-io/node-ci`

A custom Node.js (`lts`) image with additional binaries used to assist in building/testing Kosu packages. Drop-in replacement for `node:lts` image.

-   **GCR URI:** `gcr.io/kosu-io/node-ci:latest`

### `kosu-io/go-kosu-ci`

A custom golang (`1.13-stretch`) image with Tendermint and other binaries pre-installed, used as the CI image for `go-kosu` (Tendermint is compiled into `kosud` and not needed for production builds, but used in testing).

-   **GCR URI:** `gcr.io/kosu-io/go-kosu-ci:latest`

### `kosu-io/kosu-geth`

Contains `geth` with PoA consensus in a [single-node private network](https://github.com/ParadigmFoundation/kosu-monorepo/blob/master/packages/kosu-geth/) configuration used for testing Kosu [system contracts.](https://github.com/ParadigmFoundation/kosu-monorepo/blob/master/packages/kosu-system-contracts/README.md) Note that contracts are not pre-migrated and must be deployed with [`@kosu/system-contracts`](https://github.com/ParadigmFoundation/kosu-monorepo/blob/master/packages/kosu-system-contracts/) (see scripts).

-   **GCR URI:** `gcr.io/kosu-io/kosu-geth:latest`

## Binaries

Pre-built binaries for `go-kosu` are available (per-commit CD builds are currently Linux/x86_64 only, build locally for other targets):

### `kosud`

Kosu network client reference implementation, built on Tendermint consensus. Run `kosud --help` for usage.

```
wget https://storage.googleapis.com/kosud/linux_amd64/kosud
chmod +x kosud
install kosud /usr/local/bin
```

### `kosu-cli`

Command-line interface for `kosud` (run `kosu-cli` for usage).

```
wget https://storage.googleapis.com/kosu-cli/linux_amd64/kosu-cli
chmod +x kosu-cli
install kosu-cli /usr/local/bin
```

## Contributing

We strongly encourage all contributions! Read our [contribution guidelines](./.github/CONTRIBUTING.md) and feel free to reach out with any questions.

## Issues

To report bugs within a specific Kosu package, please [create an issue](https://github.com/ParadigmFoundation/kosu-monorepo/issues/new) in this repository (template will auto-populate).

## License

Kosu is being developed as free open-source software under an [MIT license.](./LICENSE)
