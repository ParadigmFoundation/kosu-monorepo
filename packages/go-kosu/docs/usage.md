# Usage guide

This guide covers installation of the `go-kosu` binaries:

-   `kosud`: Kosu ABCI application implementation, [witness](), Tendermint core, and optional RPC server.
-   `kosu-cli`: CLI for `kosud` providing state query methods and certain validator functions.

Additionally, instructions for the following usage scenarios are included:

-   Development network (single-node, no contract snapshot).
-   Development network with snapshot contract state.
-   Existing network from provided genesis (mainnet or test-network).
-   Existing network from contract system snapshot (mainnet or test-network).
-   New network from contract snapshot (mainnet or test-network).

Already configured and ready to join a network? [Jump to usage.](#usage)

## A note for validators

Validator configuration, from the perspective of configuring the underlying full node
process (`kosud`), is identical to that of a full node. The only difference between a full node and a validating full node is the inclusion (or lack thereof) of the node's public key in the active Tendermint validator set.

For Kosu, the validator set is determined and curated by the Kosu contract system, deployed on the Ethereum blockchain. To set up a validator, you must first configure a Kosu full node, then apply to the on-chain registry through the contract system. If KOSU token holders approve your application, your full node will automatically become a validator when the peg-zone applies the registry state transition to the Kosu state.

[Follow this guide to apply to a Kosu ValidatorRegistry.](#todo)

**Warning:** Registering a main-network Kosu validator node requires locking tokens (staking) which may be confiscated if your listing is successfully challenged during the application process, or while it is in the set of active validators. [Read more about the validator selection and curation process here.](https://docs.kosu.io/overview/validator-curation.html)

# Contents

-   [Important resources](#important-resources)
    -   [Tendermint](#tendermint)
    -   [Kosu](#kosu)
    -   [Ethereum](#ethereum)
-   [Security considerations](#security-considerations)
-   [Ethereum JSONRPC provider](#ethereum-jsonrpc-provider)
-   [Contract system snapshots](#contract-system-snapshots)
-   [Environment setup](#environment-setup)
    -   [System requirements](#system-requirements)
    -   [Network setup](#network-setup)
-   [Installation](#installation)
    -   [Pre-built binaries](#pre-built-binaries)
    -   [Build from source](#build-from-source)
-   [Configuration](#configuration)
    -   [Process supervisor](#process-supervisor)
    -   [Key generation](#key-generation)
    -   [Genesis file](#genesis-file)
    -   [Application configuration](#application-configuration)
-   [Usage](#usage)
    -   [Development network](#development-network)
    -   [Existing network](#existing-network)
    -   [New network launch](#new-network-launch)
    -   [RPC Server](#rpc-server)
-   [Validators](#validators)
    -   [Networking](#networking)
    -   [Ethereum client](#ethereum-client)
    -   [Sentry nodes](#sentry-nodes)

<!-- - -->

## Important resources

The following resources cover topics that are required to understand for individuals wishing to operate on the Kosu main-network or incentivized test-networks, and helpful for everyone else.

### Kosu

Before connecting to an existing Kosu network, it is important to be familiar with some core Kosu concepts.

-   [Introduction to Kosu](https://docs.kosu.io/overview/)
-   [KOSU token mechanics](https://docs.kosu.io/overview/token-mechanics.html#introduction)
-   [Kosu validator curation](https://docs.kosu.io/overview/validator-curation.html)

### Tendermint

Because `go-kosu` is built on Tendermint ([Tendermint core](https://github.com/tendermint/tendermint) is compiled into `kosud`), running Kosu nodes and networks is identical with respect to blockchain structure, networking, and the underlying consensus mechanism.

-   [Running Tendermint in production](https://tendermint.com/docs/tendermint-core/running-in-production.html#running-in-production)
-   [Sentry node overview](https://forum.cosmos.network/t/sentry-node-architecture-overview/454)
-   [Tendermint networks](https://tendermint.com/docs/tendermint-core/using-tendermint.html#tendermint-networks)
-   [Tendermint configuration](https://tendermint.com/docs/tendermint-core/configuration.html)
-   [Tendermint RPC reference](https://tendermint.com/rpc/) (available through `kosud`)
-   [Genesis file](https://cosmos.network/docs/cosmos-hub/genesis.html#genesis-file) (for Cosmos, but most is applicable to Tendermint and Kosu)
-   [Secure P2P](https://tendermint.com/docs/tendermint-core/secure-p2p.html#secure-p2p)

### Ethereum

Ethereum smart-contracts ([Kosu system contracts](https://github.com/ParadigmFoundation/kosu-monorepo/blob/master/packages/kosu-system-contracts)) are a core component of the Kosu system, and support the Kosu validator registry and curation mechanism.

-   [Getting up to speed on Ethereum](https://medium.com/@mattcondon/getting-up-to-speed-on-ethereum-63ed28821bbe)
-   [Ethereum JSONRPC](https://github.com/ethereum/wiki/wiki/JSON-RPC)

<!-- - -->

## Security considerations

If running a Kosu full node as a validator on the Kosu main-network (or a network using the mainnet contract system), it is important to take extreme care in protecting the validating private key, the peer-to-peer networking port, and the validator process itself (as is true for all Tendermint-based networks).

For Kosu, the requirement for validators to have an Ethereum key-pair (in addition to the Tendermint validating key-pair) represents an additional risk factor that must be managed with extreme care by operators.

Among many other things, this means usage of the following (for validators):

-   Virtual private network or cloud for validator host and supporting infrastructure.
-   Dedicated (virtual or physical) hosts for the validator process and Ethereum client.
-   Failover and backup hosts for Ethereum client and validator process.
-   Sentry nodes (see below) as only connection to validator hosts (proxy p2p traffic).
-   Disable RPC servers and block all public internet traffic from VPN/C.
-   Consideration of Ethereum key management (mnemonic, private unlocked node, etc.).

### Resources

-   [Sentry node overview](https://forum.cosmos.network/t/sentry-node-architecture-overview/454)
-   [Tendermint sentry nodes](https://github.com/tendermint/tendermint/blob/master/docs/spec/p2p/node.md#sentry-node)
-   [Cosmos sentry nodes](https://cosmos.network/docs/cosmos-hub/validators/security.html#sentry-nodes-ddos-protection)
-   [Example validator setup](https://iqlusion.blog/a-look-inside-our-validator-architecture)

<!-- - -->

## Ethereum JSONRPC provider

In order to maintain the one-way peg zone between Kosu's Ethereum contract system and the network itself, validators run "witnesses", a subprocess outside the core state machine that connects to a [Ethereum JSONRPC](https://github.com/ethereum/wiki/wiki/JSON-RPC) provider (via WebSockets) and submits [attestation transactions]() after Ethereum blocks containing event logs from Kosu contract system state changes are sufficiently mature (deep enough within the chain that proof-of-work reorganizations are unlikely).

To facilitate this peg, a WebSocket Ethereum JSONRPC provider is required by the Kosu full node process (`kosud`) for validators. A WebSocket URL (`ws://` or `wss://`) can be provided to the daemon with the `--web3` or `-E` flags.

<!-- - -->

## Contract system snapshots

In production Kosu networks, an Ethereum smart-contract, the [`ValidatorRegistry`](https://github.com/ParadigmFoundation/kosu-monorepo/blob/master/packages/kosu-system-contracts/contracts/validator/ValidatorRegistry.sol) uses a token-curated registry (TCR) mechanism to manage the network's validator set. As such, for a given Kosu deployment, the contract system must be deployed prior to the block production beginning.

To facilitate this unique network launch, Kosu clients (currently only `kosud`) accept a "snapshot" of the Kosu Ethereum contract system's relevant state within the `genesis.json` file shared by all nodes prior to network startup.

The contract system must be deployed sufficiently prior to the network to provide adequate time for individuals to acquire tokens (by bonding), submit applications, and curate a high-quality initial validator set. Parameters such as a state snapshot block height, network start time, and other consensus parameters will be agreed upon by participants prior to deployment of the contract system

The [`gen-kosu`](https://docs.kosu.io/kosu-genesis-cli/#tool-gen-kosu) utility provides a simple mechanism to generate a Kosu genesis file, provided a snapshot block, an Ethereum JSONRPC provider, a network start time, and a chain ID (as well as optional consensus parameters). It also be done "manually" or with other applications using the functions provided by the [`@kosu/genesis-cli` package](https://github.com/ParadigmFoundation/kosu-monorepo/tree/master/packages/kosu-genesis-cli).

Kosu's reliance on the Ethereum contract system for network startup offers an interesting benefit in this context: trustless genesis file generation and network startup. Because the required genesis file for a Kosu network can be generated entirely from the contract system's state for a given network, there is no need to manually distribute a genesis file prior to network launch. All participants can simply generate a genesis file locally, and since Ethereum acts as a source of truth for the state of the validator registry, everyone will get the same file for a given Ethereum height.

<!-- - -->

## Environment setup

This section covers some recommendations (and requirements) to keep in mind when provisioning virtual (or physical) infrastructure for a Kosu full or validating full node deployment.

### System requirements

The `go-kosu` binaries themselves currently support 64-bit linux or darwin (macOS) architectures. Linux (or linux via Docker) is recommended for validators and mission-critical full nodes. Support for Windows or 32-bit architectures is not guaranteed.

The below specifications do _not_ include recommended resources for a local full Ethereum node. A separate host machine should be used for the Ethereum client process and RPC server.

#### Minimum

Sufficient for development servers, low-load full nodes, etc.

-   **RAM:** 1GB RAM
-   **CPU:** 1 core, ~1.4 GHZ (x64/x32)
-   **OS:** Linux, darwin (macOS) or Docker
-   **Disk:** 25GB (HDD or SSD)

#### Recommended

Recommended specifications for validator hosts, production full nodes, etc.

-   **RAM:** ≥2GB
-   **CPU:** ≥2 cores, ≥2.0 GHZ (x64)
-   **OS:** Linux or Docker
-   **Disk:** ≥100 GB SSD

### Network setup

For production full nodes and validating full nodes, usage of a VPN/C (virtual private network or cloud) for the validator host is highly recommended. Read more about security considerations for validators [here](#security-considerations) and [here](#validators).

#### Ports

Default TCP ports (customizable via CLI and/or `config.toml`) listed below.

-   **Tendermint P2P:** `26656`
-   **Tendermint RPC:** `26657`
-   **Kosu RPC (WS):** `14342`
-   **Kosu RPC (HTTP):** `14343`

<!-- - -->

## Installation

This section covers installing the `go-kosu` binaries, including usage of pre-built hosted binaries (linux x64 only), as well as resources to build the client and full monorepo from source.

### Pre-built binaries

If you are installing one of the `go-kosu` binaries on a 64-bit modern linux machine, you can quickly download and install pre-built binaries with the latest available version. The install path shown below (`/usr/local/bin`) may need to be modified depending on your use case or operating system.

### Client (`kosud`)

Kosu network client reference implementation, built on Tendermint consensus.

```
wget https://storage.googleapis.com/kosud/linux_amd64/kosud
chmod +x kosud
install kosud /usr/local/bin
```

### CLI (`kosu-cli`)

Command-line interface for `kosud` (run `kosu-cli` for usage).

```
wget https://storage.googleapis.com/kosu-cli/linux_amd64/kosu-cli
chmod +x kosu-cli
install kosu-cli /usr/local/bin
```

### Build from source

For other architectures or macOS, you must build the `go-kosu` binaries alongside the full [Kosu monorepo.](https://github.com/ParadigmFoundation/kosu-monorepo/)

#### Prerequisites

In order to build the full monorepo, the following is required:

-   [Node.js](https://nodejs.org/en/download/) (`^10`)
-   [Yarn](https://yarnpkg.com/lang/en/docs/install/#mac-stable) (`^1.15`)
-   [jq](https://stedolan.github.io/jq/download/) (`^1.6`)
-   [golang](https://golang.org/dl/) (`^1.13`)
-   [go-bindata](https://github.com/go-bindata/go-bindata) (`^3.1`)
-   [go-ethereum](https://github.com/ethereum/go-ethereum/wiki/Building-Ethereum) (`^1.8`)
    -   Only the `abigen` binary is required to build the monorepo.

**Note:** MacOS users can install most required packages listed above with [`Homebrew`](https://brew.sh/) package manager. For other operating systems, see the official install instructions for each required package (linked above).

#### Clone kosu-monorepo

Clone the repository to a convenient location.

```bash
# over SSH
git clone git@github.com:ParadigmFoundation/kosu-monorepo

# over HTTP
git clone https://github.com/ParadigmFoundation/kosu-monorepo
```

#### Build packages

Install Node.js dependencies:

```
yarn
```

To build all packages (including `go-kosu` binaries):

```
yarn build
```

#### Build output

The built binaries for `go-kosu` will be located in the `packages/go-kosu` directory.

<!-- - -->

## Configuration

For usage in development, configuration is as simple as running `kosud init` to [generate keys](#key-generation), and `kosud -E [ETHEREUM_PROVIDER_URL]` to start the full node process.

More consideration and configuration steps are necessary for joining the Kosu main-network, public test-network, or other private networks.

### Key generation

Full and validating full nodes must generate a private-public key pair prior to joining a network. For validators (and to a lesser extent, full nodes) protection of the private key files (`node_key.json` and `priv_validator_key.json`) is of upmost importance. The keys should never leave the host machine, or be transmitted over the public internet.

To generate a new Kosu/Tendermint key pair and base application configuration in the default directory (`~/.kosu`), run the following (using platform-specific randomness source).

```bash
kosud init
```

To generate keys and application config in an arbitrary directory, use the following flag.

```bash
kosud init -H /path/to/your/directory
```

If successful, the output will looks something like the below snippet.

```
I[2019-09-25|16:29:42.673] Generated private validator   module=main keyFile=/home/you/.kosu/config/priv_validator_key.json stateFile=/home/you/.kosu/data/priv_validator_state.json
I[2019-09-25|16:29:42.674] Generated node key            module=main path=/home/you/.kosu/config/node_key.json
I[2019-09-25|16:29:42.674] Generated genesis file        module=main path=/home/you/.kosu/config/genesis.json
```

### Process supervisor

It is _highly_ recommended to run `kosud` with a process supervisor in production environments and at all times for validating full nodes.

This section describes an example configuration using `systemd` on linux, however other configurations can work just as well or better for certain setups (Docker compose, K8/GKE, etc.).

#### Service file

After provisioning a host machine and installing `kosud`, create a service file like the one below. A bare-minimum configuration is show, customize as needed.

The example assumes an Ethereum client is serving the Ethereum JSONRPC over WebSockets on `geth:8546` within a private network, and that a user account `kosu` exists, and that a Kosu configuration exists at `/home/kosu/.kosu` (see above).

```
[Unit]
Description=Kosu network client (kosud).

[Service]
ExecStart=/usr/local/bin/kosud start\
	-E ws://geth:8546 \
	-H /home/kosu/.kosu
```

Save your service file to `/etc/system/systemd/kosu.service` after making necessary modifications.

**Note:** an `ExecStop` may be specified as well, such as `/usr/bin/pkill kosud`.

#### Start

After saving a configured service file, run the following to start the client daemon.

```bash
sudo systemctl start kosu
```

#### Stop/restart

Stop and/or restart the client with the following commands.

```bash
# stop (w/o restart)
sudo systemctl stop kosu

# stop and restart
sudo systemctl restart kosu
```

### Genesis file

Tendermint (and all networks built on it) use a [`genesis.json` file](https://cosmos.network/docs/cosmos-hub/genesis.html#genesis-file) to set the initial "block," the initial validators, and a variety of consensus parameters (as well as application-specific data).

All nodes on a given network must use the same genesis file. Kosu networks (main or "realistic" test-networks) use a genesis file generated from a [snapshot of the Kosu contract system's state.](#contract-system-snapshots)

Depending on your intended configuration your genesis file may come from:

-   Generated during `kosud init` (development only)
-   Distributed on GitHub/Gist (private networks/test-networks)
-   Generated from contract snapshot (mainnet, public test-networks)

### Client configuration

Certain application configuration (including all Tendermint configuration) is done through the `config.toml` file, which is generated when `kosud init` is run.

For development, the base/default config should suffice. Most users will likely need to change some values from the defaults.

[See this document](https://tendermint.com/docs/tendermint-core/configuration.html) for a more complete reference about the `config.toml` file. This section only describes a few commonly used settings.

By default, the base configuration is saved to `~/.kosu/config/config.toml` (snippets from the default configuration are shown below).

#### Moniker

```
# A custom human readable name for this node
moniker = "anonymous"
```

-   Defaults to hostname of machine running the `kosud init` command.
-   Should be set to a helpful identifier.

#### Log level

```
# Output level for logging, including package level options
log_level = "app:info,ethereum:info,witness:info,jsonrpc:info,main:info,state:info,*:error"
```

Configure the log output for the Kosu ABCI application, the Kosu witness, and Tendermint.

-   `app` - The Kosu ABCI application (core state machine).
-   `ethereum` - Ethereum specific events.
-   `witness` - Kosu witness sub-process.
-   `jsonrpc` - Kosu JSON-RPC API.
-   `main` - Tendermint main log output.
-   `state` - Tendermint state module output.

#### Log output

```
# Output format: 'plain' (colored text) or 'json'
log_format = "plain"
```

Optionally set to `"json"` to enable JSON logger output for all modules.

#### Private validator listen address

```
# TCP or UNIX socket address for Tendermint to listen on for
# connections from an external PrivValidator process
priv_validator_laddr = ""
```

-   Must be set when configuring a sentry node.
-   [Read more about setting up sentries here.](https://forum.cosmos.network/t/sentry-node-architecture-overview/454)

#### Tendermint RPC configuration

```
[rpc]

# TCP or UNIX socket address for the RPC server to listen on
laddr = "tcp://127.0.0.1:26657"

# A list of origins a cross-domain request can be executed from
# Default value '[]' disables cors support
# Use '["*"]' to allow any origin
cors_allowed_origins = []
```

-   Change or disable the [Tendermint RPC]() server.
-   Configure CORS, etc. (more options available).

#### Tendermint P2P address configuration

```
[p2p]

# Address to listen for incoming connections
laddr = "tcp://0.0.0.0:26656"

# Address to advertise to peers for them to dial
# If empty, will use the same port as the laddr,
# and will introspect on the listener or use UPnP
# to figure out the address.
external_address = ""
```

-   Must be set when using a sentry node configuration.

#### Seeds and peers

```
[p2p]

# Comma separated list of seed nodes to connect to
seeds = ""

# Comma separated list of nodes to keep persistent connections to
persistent_peers = ""
```

-   Seeds or persistent peers must be set to connect to an existing network.

#### Seed mode

```
[p2p]

# Seed mode, in which node constantly crawls the network and looks for
# peers. If another node asks it for addresses, it responds and disconnects.
#
# Does not work if the peer-exchange reactor is disabled.
seed_mode = false
```

-   Set to `true` to run a Kosu seed node.

#### Private peer ID's

```
[p2p]

# Comma separated list of peer IDs to keep private (will not be gossiped to other peers)
private_peer_ids = ""
```

-   Must be set by sentry nodes to the peer ID(s) of the validator(s).

#### Mempool configuration

```
[mempool]

recheck = true
broadcast = true
wal_dir = ""

# Maximum number of transactions in the mempool
size = 5000
```

-   To keep mempool private, change `broadcast` to `false`.
-   See full `config.toml` for additional helpful configuration.

#### Transaction indexing

```
[tx_index]

# When set to true, tells indexer to index all tags (predefined tags:
# "tx.hash", "tx.height" and all tags from DeliverTx responses).
#
# Note this may be not desirable (see the comment above). IndexTags has a
# precedence over IndexAllTags (i.e. when given both, IndexTags will be
# indexed).
index_all_tags = false
```

-   Set to `true` to allow searching for old transactions/orders by tag.
-   Increases resource usage (disk and memory).
-   See full config to index specific tags only.

<!-- - -->

## Usage

This section describes the steps necessary to run a Kosu full node in development, or as part of a public (or private) network.

Certain configurations may require resources from external/third-party sources (such as a genesis file for a non-snapshot network).

[Follow these instructions](#install) to install `kosud`, and [read here](#validators) for information about applying to become a validator on a full node.

See [here](#configuration) for more information on application configuration.

### Development network

The simplest configuration is to run a single node development "network" on a local machine.

1. Generate a base application configuration and data folder with `kosud init`.
1. Deploy the [Kosu system contracts](https://github.com/ParadigmFoundation/kosu-monorepo/blob/master/packages/kosu-system-contracts) to a local [geth node](https://github.com/ParadigmFoundation/kosu-monorepo/blob/master/packages/kosu-geth) (or use `wss://poa.kosu.io/ws`).
1. Start the node:

    - The start command is below, where `[URL]` is an Ethereum JSONRPC/WebSocket provider URL for the required Ethereum network.

        ```bash
        # shorthand (assuming kosu data dir is ~/.kosu)
        kosud start -E [URL]

        # full
        kosud start --web3 [URL] --home [HOMEDIR]
        ```

1. Optionally, start the RPC server with the `--rpc` flag (i.e `kosu start --rpc`).

### Existing network

To join an existing network, you can either get the required genesis file from a third party, or generate it.

Generation of the genesis file using the snapshot method only works if the network was started with a contract state snapshot at the same height (as opposed to a manually set genesis validators).

1. Generate a base application configuration and data folder with `kosud init`.
1. Acquire the `genesis.json` file for the existing network:
    - If it was started from a [snapshot,](#contract-system-snapshots) use the [`gen-kosu`](https://docs.kosu.io/kosu-genesis-cli) tool.
    - Otherwise, get the file from the network's repository, etc.
1. Replace the auto-generate genesis file at `~/.kosu/config/genesis.json` with the new one.
1. Acquire the peer ID and host/port of a seed node or existing full node
    - Set it as a seed or persistent peer (see [here](#seeds-and-peers)).
1. Start the node:

    - The start command is below, where `[URL]` is an Ethereum JSONRPC/WebSocket provider URL for the required Ethereum network.

        ```bash
        # shorthand (assuming kosu data dir is ~/.kosu)
        kosud start -E [URL]

        # full
        kosud start --web3 [URL] --home [HOMEDIR]
        ```

    - If using the [above `systemd` configuration](#process-supervisor) the start command becomes:
        ```
        sudo systemctl start kosu
        ```

1. Optionally, start the RPC server with `kosud rpc` as a separate process.

### New network launch

For a new network launch (such as the Kosu mainnet), a Kosu contract system deployment must exist on a public Ethereum network.

The community launching the network must agree on the following before, or shortly after the contract system deployment.

-   The Ethereum block at which to snapshot the contract system state (will set genesis validators).
-   The amount of time between the mining of snapshot block, and the Kosu network launch.
-   The exact UTC timestamp to begin block production on the new network.
-   The name of the new blockchain and its network (the chain ID).
-   Several parameters (listed below) used to establish the peg-zone and allocate resources.
    -   The peg-zone's Ethereum finality threshold (block age before submitting attestations).
    -   The length, in Ethereum blocks, of each rebalance period (over which poster bandwidth is allocated).
    -   The number of total orders to accept per rebalance period.
    -   The maximum size (in bytes) of a single order message.
    -   The maximum age of a pending attestation message before pruning it from state.

#### Example: Kosu main-network

This example will assume the following:

-   The network will be called `kosu-0`.
-   The Kosu contract system was deployed to the Ethereum mainnet at block **10021444.**
-   A state snapshot from block **10080000** (~20 days later) will be used to generate the network's genesis file.
-   During those ~20 days, token holders will curate a set of initial validators from applicants.
-   The chain start time (unix) is picked as **1590000000** (~10 days after the snapshot).
-   The default consensus parameters from `gen-kosu` (and `kosud`) are used.

1. Install and configure `kosud` (see [above](#install)).
1. After the snapshot block is mined, run the following command to generate the network's genesis file.

    ```bash
    # full form (assumes default data/config directory)
    gen-kosu \
        --snapshot-block=10080000 \
        --chain-id=kosu-0 \
        --start-time=1572000000 \
        --provider-url=https://mainnet.infura.io \
        > ~/.kosu/config/genesis.json

    # shorthand equivalent
    gen-kosu -b 10080000 -n kosu-0 -t 1590000000 -p https://mainnet.infura.io > ~/.kosu/config/genesis.json
    ```

1. Wait until shortly before the specified network start time, and start the client.

    ```bash
    # start command
    kosud start -E [ETHEREUM_JSONRPC_PROVIDER]

    # with example systemd configuration
    sudo systemctl start kosu
    ```

### RPC Server

[Click here to view documentation for the Kosu JSONRPC API.](./kosu_rpc.md)

<!-- - -->

## Validators

This section highlights additional considerations specific to validating full nodes. It does not intend to serve as a guide to configuring or securing a mainnet validator.

[Click hear to read about the on-chain validator application process](#todo)

### Networking

Validators must take extra precaution with regard to network configuration, and the goal should be to prevent any inbound network requests to the validator process except for those from the sentry node or nodes, and the Ethereum client.

At minimum validator operators should:

-   Have a dedicated host machine or VM for the validator process (with backups enabled).
-   Operate a private virtual or physical network environment for the validator and sentry nodes.
-   Only enable inbound (rate-limited) requests from the public internet to the sentry nodes.
-   Operate an Ethereum client serving JSONRPC/WebSocket within the private network for the node (see below).

[See here]() for an example of a sophisticated validator setup for the Cosmos Hub.

### Ethereum client

[As described above,](#ethereum-jsonrpc-provider) validators require a WebSocket connection to an Ethereum client serving the Ethereum JSONRPC API.

For validators, it is important that (at minimum) a full Ethereum node is run within the same private network as the validator process, or otherwise able to maintain a persistent private connection.

There is no specific reason to choose Geth over Parity, but it is important that the configured client reliably serves the JSONRPC API over WebSockets.

### Sentry nodes

Sentry nodes are required for main-network validators to protect them from DoS attacks and other potential exploits.

In simplest terms, "sentry node architecture" is described by the following statements.

-   A validator host and special full nodes (sentries) exist in a virtual or private networking configuration.
-   The validator exposes no TCP, UDP or other unix ports to the public internet.
-   The validator host only accepts Tendermint peer-to-peer traffic from the sentry nodes over a private connection.
-   The sentry nodes relay the validator's signed messages to the network, as well as gossiped transactions.
-   The validator relies on no one specific sentry node for its connection to the greater network at a given time.

[See here](https://forum.cosmos.network/t/sentry-node-architecture-overview/454) for an in-depth explanation and setup example for a sentry node cluster.
