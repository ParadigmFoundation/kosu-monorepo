---
title: Introduction
---

# Kosu Introduction

Kosu is a decentralized relay network that facilitates broadcast and discovery of peer-to-peer exchange orders on Ethereum.

Orders for any type of smart contract-based financial instrumentation implementing "hybrid-decentralized" exchange logic (_off-chain order message relay_ and _on-chain settlement_) may be broadcast to the network. The network is generalizable, supporting orders of arbitrary maker-taker based settlement systems. This hybrid exchange architecture was originally pioneered by the 0x protocol, and naturally, one of the initial use cases for Kosu is as a decentralized relay network for 0x order messages. Other examples of supported settlement logic that can be broadcast to the network are [peer-to-peer loans](https://github.com/dharmaprotocol/dharma.js), and [margin tokens](https://github.com/dydxprotocol/protocol_v1).

In its entirety, the system curates a consistent, decentralized order book and serves as a liquidity aggregation primitive for second layer systems.

The Kosu network is a bonded proof-of-stake blockchain built on Tendermint Consensus. The underlying state machine is responsible for enforcing a simple access control ruleset and order booking procedure. The network utilizes a shared security model, wherein all staking and token-based logic is implemented on the Ethereum main network. The model provides unidirectional communication and checkpoints between the two networks by leveraging Tendermint to provide finality for specific Ethereum-based state changes.

The core protocol and relay network is supported by a dynamic set of independent validators and voting token holders. The network's validators, users, and voters are coordinated and incentivized toward the common goals of network security and value by a native token system and a variety of crypto-economic mechanisms.

## Protocol Design

The core protocol is implemented as a decentralized, transactional, and event-driven message relay network called the **OrderStream**. The active OrderStream (OS) validator set is highly dynamic, and managed through a staking and token-based curation mechanism, where protocol token holders leverage their holdings to vote on new validator applications and curate the existing validator set. Non-validating token holders are incentivized to curate a high-quality validator set through direct and indirect rewards and penalties (discussed in more detail [here](#)).

OrderStream validators must also run full Ethereum nodes and respond to – and vote on – the state changes of core protocol smart contracts deployed on the Ethereum blockchain (described below).

Access control and [sybil tolerance](https://en.wikipedia.org/wiki/Sybil_attack) on the network is managed by a market-driven [staking system](#) (separate from validator curation) which uses a simple bandwidth model to proportionally allocate network throughput to **Posters**: individuals that add liquidity to the network via the broadcast of `order` and `stream` messages. The number of orders a poster may broadcast over a given time frame is based on the size of their stake relative to the total amount staked. The stake required for any given fraction of total network throughput is proportional to overall demand for network write access. Posters may deposit and withdraw stake at any time, and are granted write access to the network for the duration their tokens are locked in the poster staking contract.

Validators (and more specifically, client implementations of the network) do not store, update, or serve an order book in a conventional sense. The relay protocol's design – and network as a whole – favors an event-bus architecture over keeping orders themselves in state. As discussed above, applications built a layer above the OrderStream become responsible for deriving order books from the master order event stream, based on arbitrary rules or filters specific to that application. Information kept in-state by the network is specific to access control, consensus parameterization, and the validator set.

## Role of Ethereum

The [Ethereum](https://ethereum.org) network plays an important role in the Kosu Protocol. The protocol (and the OrderStream network itself) rely on Ethereum for access control, incentive structure, and governance processes.

Throughput allocation on the OrderStream is computed over discrete time frames – called **rebalance periods** – at predictable intervals based on the height of the Ethereum blockchain, as well as an initial height and period length agreed upon by validators during the network's genesis.

When a rebalance period is triggered by the discovery of a specific Ethereum block, OS validators compute a "rate-limit" mapping for each poster based on the current state (balances) of the **PosterStaking** contract according to a simple bandwidth model. Validators submit their proposals for every rebalance period to each other, and vote to accept the first-reported, mutually-agreed-upon proposal. Strict ordering guarantees provided by the network's underlying networking and consensus mechanism ([Tendermint Core](https://tendermint.com/)) ensure that only one proposal will be accepted per period – and that all non-byzantine validators will accept the same one.

A one-way data "bridge" is implemented between Ethereum and the OrderStream network to facilitate secure and reliable state-transition of the OrderStream based on events emitted by the Kosu Protocol smart contract system. This peg is implemented using [a shared security model](https://blog.cosmos.network/the-internet-of-blockchains-how-cosmos-does-interoperability-starting-with-the-ethereum-peg-zone-8744d4d2bc3f) wherein OrderStream validators are also full Ethereum nodes. OS validators are responsible for being "witnesses" to Ethereum events, and report and vote on these events with the rest of the OS validator set.

This witness model is used to update the allocation of network throughput among posters, and to update the active validator set in-state based on the validator curation contracts.

Events from Ethereum may only modify the OrderStream's state if sufficient validators have reported that event, and a pre-determined "finality threshold" has passed (a block maturation – or finality threshold – is needed to establish "pseudo-finality" for Ethereum blocks, which assumes "true" finality at some point along a probabilistic finality curve. This will not be needed once Ethereum switches to a PoS mechanism with stricter finality assurances).

More details of this system can be found in [the peg-zone specification](https://github.com/ParadigmFoundation/ParadigmCore/blob/master/spec/ethereum-peg-spec.md), and it's implementation in [kosu-go](https://github.com/ParadigmFoundation/kosu-monorepo/blob/master/packages/go-kosu/).

## Drivers and Tooling

In addition to leading development of the first implementation of the OrderStream network, Paradigm Labs is also producing [**Kosu.js**](https://github.com/ParadigmFoundation/kosu-monorepo/blob/master/packages/kosu.js) – a set of client-side libraries that simplify the processes of creating and signing orders, settling trades, and interacting with the OrderStream network. ParadigmConnect is initially available in JavaScript, with additional versions being produced for Golang and Python.

Our team has published and early versions of [example "SubContracts"](https://github.com/ParadigmFoundation/ParadigmContracts/blob/master/examples) that wrap existing settlement systems such as the **0x, Dharma,** and **dYdX** protocols to demonstrate the systems ability to accommodate a number of smart contract financial primitives side-by-side.

## Additional Information

### Kosu Whitepaper

For a more detailed introduction to the protocol and contract system introduced above, as well as motivation and rationale for various design decisions, take a look at the [Kosu Whitepaper](https://kosu.io/whitepaper.pdf).

For the most up-to-date information regarding the various protocol components specification and implementation details, check out the Paradigm Foundation's [GitHub](https://github.com/ParadigmFoundation/).

### License and Contribution

The core protocol (contract logic and primary client implementation) is being developed as open-source software under a [GNU General Public License](https://www.gnu.org/licenses/mit.en.html), with development and research projects currently being led by the Paradigm Labs team.

Collaboration and contribution from the community is not only highly encouraged, but essential to the success and stability of the network, and Paradigm's long-term vision of borderless, open, and efficient global markets.

Don't hesitate to get involved on our [GitHub](https://github.com/ParadigmFoundation/), [Reddit](https://reddit.com/r/ParadigmFoundation), and public [chat server](https://chat.paradigm.market).
