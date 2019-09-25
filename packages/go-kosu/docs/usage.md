# Usage guide

This guide covers installation of the `go-kosu` binaries:
- `kosud`: Kosu ABCI application implementation, [witness](), Tendermint core, and optional RPC server.
- `kosu-cli`: CLI for `kosud` providing state query methods and certain validator functions.

Additionally, instructions for the following usage scenarios are included:
- Development network (single-node, no contract snapshot).
- Development network with snapshot contract state.
- Existing network from provided genesis (mainnet or test-network).
- Existing network from contract system snapshot (mainnet or test-network).
- New network from contract snapshot (mainnet or test-network).

## A note for validators

Validator configuration from the perspective of configuring the underlying full node
process (`kosud`) is identical; the only difference between a full node and a validating full node is the inclusion (or lack thereof) of the node's public key in the active Tendermint validator set.

For Kosu, this set is determined by the Kosu contract system, deployed on the Ethereum blockchain. To set up a validator, you must first configure a full node, then apply to the registry on-chain. If KOSU token holders approve your application, your full node will automatically become a validator when the peg-zone applies the registry state transition to the Kosu state.

[Follow this guide to apply to a Kosu ValidatorRegistry.]()

**Warning:** Registering a main-network Kosu validator node requires locking tokens (staking) which may be confiscated if your listing is successfully challenged during the application process, or while it is in the set of active validators. [Read more about the validator selection and curation process here.](https://docs.kosu.io/overview/validator-curation.html)

# Contents

- [Important resources](#important-resources)
    - [Tendermint](#tendermint)
    - [Kosu](#kosu)
    - [Ethereum](#ethereum)
- [Security considerations](#security-considerations)
- [Ethereum JSONRPC provider](#ethereum-jsonrpc-provider)
- [Contract system snapshots](#contract-system-snapshots)
- [Environment setup](#environment-setup)
    - [System requirements](#system-requirements)
    - [Network setup](#network-setup)
- [Installation](#installation)
    - [Pre-built binaries](#pre-built-binaries)
    - [Build from source](#build-from-source)
- [Configuration](#configuration)
    - [Process supervisor](#process-supervisor)
    - [Key generation](#key-generation)
    - [Genesis file](#genesis-file)
    - [Application configuration](#application-configuration)
- [Usage](#usage)
    - [Development network](#development-network)
    - [Existing network](#existing-network)
    - [New network launch](#new-network-launch)
    - [RPC Server](#rpc-server)
- [Validators](#validators)
    - [Networking](#networking)
    - [Ethereum client](#ethereum-client)
    - [Sentry nodes](#sentry-nodes)

<!-- - -->
## Important resources

The following resources cover topics that are required to understand for individuals wishing to operate on the Kosu main-network or incentivized test-networks, and helpful for everyone else.

### Tendermint
Because `go-kosu` is built on Tendermint ([Tendermint core](https://github.com/tendermint/tendermint) is compiled into `kosud`), running Kosu nodes and networks is identical with respect to blockchain structure, networking, and the underlying consensus mechanism.

- [Running Tendermint in production](https://tendermint.com/docs/tendermint-core/running-in-production.html#running-in-production)
- [Sentry node overview](https://forum.cosmos.network/t/sentry-node-architecture-overview/454)
- [Tendermint networks](https://tendermint.com/docs/tendermint-core/using-tendermint.html#tendermint-networks)
- [Tendermint configuration](https://tendermint.com/docs/tendermint-core/configuration.html)
- [Tendermint RPC reference](https://tendermint.com/rpc/) (available through `kosud`)
- [Secure P2P](https://tendermint.com/docs/tendermint-core/secure-p2p.html#secure-p2p)

### Kosu
Before connecting to an existing Kosu network, it is important to be familiar with some core Kosu concepts.

- [Introduction to Kosu](https://docs.kosu.io/overview/)
- [KOSU token mechanics](https://docs.kosu.io/overview/token-mechanics.html#introduction)
- [Kosu validator curation](https://docs.kosu.io/overview/validator-curation.html)

### Ethereum
Ethereum smart-contracts ([Kosu system contracts](https://github.com/ParadigmFoundation/kosu-monorepo/blob/master/packages/kosu-system-contracts)) are a core component of the Kosu system, and support the Kosu validator registry and curation mechanism.

- [Getting up to speed on Ethereum](https://medium.com/@mattcondon/getting-up-to-speed-on-ethereum-63ed28821bbe)
- [Ethereum JSONRPC](https://github.com/ethereum/wiki/wiki/JSON-RPC)

<!-- - -->
## Security considerations
If running a Kosu full node as a validator on the Kosu main-network (or a network using the mainnet contract system), it is important to take extreme care in protecting the validating private key, the peer-to-peer networking port, and the validator process itself (as in all Tendermint-based networks).

For Kosu, the requirement for validators to have an Ethereum key-pair (in addition to the Tendermint validating key-pair) represents an additional risk factor that must be managed with extreme care.

Among many other things, this means (for validators):
- Virtual private network or cloud for validator host and supporting infrastructure.
- Dedicated (virtual or physical) hosts for the validator process and Ethereum client.
- Failover and backup hosts for Ethereum client and validator process.
- Sentry nodes (see below) as only connection to validator hosts.
- Disable RPC servers and block all public internet traffic from VPN/C.
- Consideration of Ethereum key management (mnemonic, private unlocked node, etc.).

### Resources

- [Sentry node overview](https://forum.cosmos.network/t/sentry-node-architecture-overview/454)
- [Tendermint sentry nodes](https://github.com/tendermint/tendermint/blob/master/docs/spec/p2p/node.md#sentry-node)
- [Example validator setup](https://iqlusion.blog/a-look-inside-our-validator-architecture)

<!-- - -->
## Ethereum JSONRPC provider

In order to maintain the one-way peg zone between Kosu's Ethereum contract system and the network itself, validators run "witnesses", a subprocess outside the core state machine that connects to a [Ethereum JSONRPC](https://github.com/ethereum/wiki/wiki/JSON-RPC) provider (via WebSockets) and submits [attestation transactions]() after Ethereum blocks containing event logs from Kosu contract system state changes are sufficiently mature (deep enough within the chain that proof-of-work reorganizations are unlikely).

To facilitate this peg, a WebSocket Ethereum JSONRPC provider is required by the Kosu full node process (`kosud`) for validators. A WebSocket URL (`ws://` or `wss://`) can be provided to the daemon with the `--web3` or `-E` flags.

<!-- - -->
## Contract system snapshots

In production Kosu networks, an Ethereum smart-contract, the [`ValidatorRegistry`](https://github.com/ParadigmFoundation/kosu-monorepo/blob/master/packages/kosu-system-contracts/contracts/validator/ValidatorRegistry.sol) uses a token-curated registry (TCR) mechanism to manage the network's validator set. As such, for a given Kosu deployment, the contract system must be deployed prior to the block production beginning.

To facilitate this unique network launch, Kosu clients (currently only `kosud`) accept a "snapshot" of the Kosu Ethereum contract system's relevant state within the `genesis.json` file shared by all nodes prior to network startup.

The contract system must be deployed sufficiently prior to the network to provide adequate time for individuals to aquire tokens (by bonding), submit applications, and curate a high-quality initial validator set. Parameters such as a stat snapshot block and a network start time will be agreed upon by participants prior to deployment of the contract system

The [`gen-kosu`](https://docs.kosu.io/kosu-genesis-cli/#tool-gen-kosu) provides a simple mechanism to generate a Kosu genesis file, provided a snapshot block, an Ethereum JSONRPC provider, a network start time, and a chain ID (as well as optional consensus parameters).

Kosu's reliance on the Ethereum contract system for network startup offers an interesting benefit: trustless genesis file generation and network startup. Because the required genesis file for a Kosu network can be generated entirely from the contract system's state for a given network, there is no need to manually distribute a genesis file prior to network launch. All participants can simply generate a genesis file locally, and since Ethereum acts as a source of truth for the state of the validator registry, everyone will get the same file for a given Ethereum height.

<!-- - -->
## Environment setup

### System requirements

### Network setup

<!-- - -->
## Installation

### Pre-built binaries

### Build from source

<!-- - -->
## Configuration

### Process supervisor

### Key generation

### Genesis file

### Application configuration

<!-- - -->
## Usage

### Development network

### Existing network

### New network launch

### RPC Server

<!-- - -->
## Validators

### Networking

### Ethereum client

### Sentry nodes