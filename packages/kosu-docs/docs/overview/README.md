---
title: Introduction
---

# Kosu Introduction

Kosu is a decentralized relay network that facilitates broadcast, discovery, and aggregation of peer-to-peer exchange orders for Ethereum-based settlement systems.

Orders for any type of smart contract-based financial instrumentation implementing "hybrid-decentralized" exchange logic (_off-chain order message relay_ and _on-chain settlement_) may be broadcast to the network. The network is generalizable, supporting orders of arbitrary maker-taker based settlement systems. This hybrid exchange architecture was originally pioneered by the 0x protocol, and naturally, one of the initial use cases for Kosu is as a decentralized relay and aggregation network for 0x order messages. Any type of on-chain contract-based settlement logic that leverages off-chain orders can benefit from Kosu.

In its entirety, the system curates a consistent, decentralized order book and serves as a liquidity aggregation primitive for second layer systems.

The Kosu network is a bonded proof-of-stake blockchain built on Tendermint consensus. The underlying state machine is responsible for enforcing a set of simple access control rules and a basic order booking procedure. The network utilizes a shared security model, wherein all staking and token-based logic is implemented on Ethereum as a smart contract suite. The model provides unidirectional communication and checkpoints between the two networks by leveraging Tendermint to provide finality for specific state changes within the Ethereum contract system.

The core protocol and relay network is supported by a dynamic set of independent validators and voting token holders. The network's validators, users, and voters are coordinated and incentivized toward the common goals of network security and value by a native token system and a variety of simple economic mechanisms.

## Protocol Design

The core protocol is implemented as a decentralized, transactional, and event-driven message relay network called the **Kosu network**. The active Kosu network validator set is dynamic, where validators are elected and dismissed through a contract-based token curation mechanism. Token holders leverage their holdings to vote on new validator applications and curate the existing validator set by initiating challenges (and subsequent voting periods) against validators they deem unworthy. Non-validating token holders are incentivized to curate a high-quality validator set through direct and indirect rewards and penalties (discussed in more detail [here](./token-mechanics.md)).

Kosu validators must also run full Ethereum nodes in order to respond to – and attest to – the state changes of core protocol smart contracts deployed on the Ethereum blockchain (described below).

Access control and [sybil tolerance](https://en.wikipedia.org/wiki/Sybil_attack) on the network is managed by a market-driven [bonding system](./token-mechanics.md) (separate from validator curation) which uses a simple bandwidth model to proportionally allocate network throughput to **Posters**: individuals that add liquidity to the network via the broadcast of `order` messages. The number of orders a poster may broadcast over a given time frame is based on the number of bonded tokens relative to the total amount bonded. Thus, the bond required for any given fraction of total network throughput is proportional to overall demand for network write access. Posters may deposit and withdraw bonded Kosu tokens at any time, and are granted write access to the network for the duration their tokens are locked in the poster bonding contract. The term "bond" is used over "stake" because poster's tokens can not be confiscated or slashed, and they are always available for withdrawal (unless otherwise locked for voting/validating).

Validators (and more specifically, client implementations of the network) do not store, update, or serve a conventional price-time-priority limit order book. Instead, a parameterizable number of recent orders are kept in-state as a consistent order book snapshot that is attested to by validators as the most recent valid orders with each Kosu block. Because all orders are submitted as transactions and thus stored in, and accessible through the underlying Tendermint blockchain, historical orders and orders not in the snapshot can still be recovered.

Applications can use the order book snapshot described above to bootstrap a local order book upon connection to a node, then subsequently update it with new orders added to the network, as well as data from external sources (such as on-chain data used to check if orders are fillable).

The reference implementation of the network (`go-kosu`) provides the ability for this snapshot to be loaded, as well as a [simple pub/sub API](../go-kosu/kosu_rpc.md) for processed orders, allowing for real-time subscription to orders processed by the network.

## Role of Ethereum

[Ethereum](https://ethereum.org) plays an important role in the Kosu Protocol. The protocol (and the network itself) rely on Ethereum for access control, incentive structure, and validator curation processes.

Throughput allocation on the Kosu network is computed over discrete time frames – called **rebalance periods** – at regular intervals based on the height of the Ethereum blockchain, as well as an initial height and period length parameter agreed upon by validators prior to the network's genesis.

When a rebalance period is triggered by the discovery of a specific Ethereum block, Kosu validators compute a "rate-limit" mapping for each poster based on the current state (bonded balances) of the **PosterRegistry** contract according to a simple bandwidth model. Computation of the parameterization for rebalance period `n` is deterministic based on the parameters of period `n - 1`, so all non-byzantine validators will propose the same period parameterization.

A one-way data "bridge" (peg zone) is implemented between the Kosu Ethereum contract system and the Tendermint-based Kosu network to facilitate secure and reliable state-transition of Kosu based on events emitted by the Kosu system smart contract system. This peg is implemented using [a shared security model](https://blog.cosmos.network/the-internet-of-blockchains-how-cosmos-does-interoperability-starting-with-the-ethereum-peg-zone-8744d4d2bc3f) where Kosu validators run full Ethereum nodes. Kosu validators are responsible for being "witnesses" to Ethereum events by signing cryptographic attestations, and submitting them to the rest of the validator set at the correct times.

This witness model is used to update the allocation of network throughput among posters, and to update the active Tendermint validator set based on the state of the **ValidatorRegistry** (TCR implementation).

Events from Ethereum may only modify the Kosu network's state if sufficient validators have reported that event (via cryptographically signed messages), and a pre-determined "maturation threshold" has passed. A block maturation – or finality threshold – is needed to establish "pseudo-finality" for Ethereum blocks, which assumes "true" finality at some point along a probabilistic finality curve due to Ethereum's proof-of-work consensus mechanism where block reorganizations are possible, yet less likely as a block gets older and more blocks are mined above it. This will not be needed once Ethereum switches to a PoS mechanism with stricter finality assurances.

More details of this system can be found in [the original peg-zone specification](https://github.com/ParadigmFoundation/ParadigmCore/blob/master/spec/ethereum-peg-spec.md), and it's implementation in [go-kosu](https://github.com/ParadigmFoundation/kosu-monorepo/blob/master/packages/go-kosu/).

## Drivers and Tooling

In addition to leading development of the first implementation of the OrderStream network, Paradigm Labs is also producing [**Kosu.js**](https://github.com/ParadigmFoundation/kosu-monorepo/blob/master/packages/kosu.js) – a set of client-side libraries that simplify the processes of creating and signing orders, settling trades, and interacting with the OrderStream network. ParadigmConnect is initially available in JavaScript, with additional versions being produced for Golang and Python.

Our team has published and early versions of [example "SubContracts"](https://github.com/ParadigmFoundation/ParadigmContracts/blob/master/examples) that wrap existing settlement systems such as **0x** to demonstrate the systems ability to accommodate any existing smart contract financial primitive, and to eventually support several side-by-side with no additional configuration.

## Additional Information

### Kosu Whitepaper

For a more detailed introduction to the protocol and contract system introduced above, as well as motivation and rationale for various design decisions, take a look at the [Kosu Whitepaper](https://kosu.io/whitepaper.pdf).

For the most up-to-date information regarding the various protocol components specification and implementation details, check out the Paradigm Foundation's [GitHub](https://github.com/ParadigmFoundation/).

### License and Contribution

The core protocol (contract logic and primary client implementation) is being developed as open-source software under an [MIT license](https://opensource.org/licenses/MIT), with development and research projects currently being led by the Paradigm Labs team.

Collaboration and contribution from the community is not only highly encouraged, but essential to the success and stability of the network, and Paradigm's long-term vision of borderless, open, and efficient global markets.

Don't hesitate to get involved on our [GitHub](https://github.com/ParadigmFoundation/), [Reddit](https://reddit.com/r/ParadigmFoundation), and public [chat server](https://discordapp.com/invite/sNeMpDe).
