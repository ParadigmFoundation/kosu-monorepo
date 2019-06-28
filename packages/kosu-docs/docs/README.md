---
title: What is Kosu?
---

# What is Kosu?

The Kosu protocol is a **relay protocol for smart contract-based financial primitives.** The **Kosu network** is a decentralized, event-based, and super-peer network with proof-of-stake based sybil tolerance with access control managed by an Ethereum contract system.

The Kosu network provides a venue for order message broadcast and price discovery for any type of Ethereum-based financial primitive that meets the following criteria. They must 1) allow arbitrary "off-chain" methods for broadcast and discovery of signed, executable order messages, and 2) implement some type of settlement or execution "on-chain", where the transfer of assets and validation of balances takes place via protocol-independent Ethereum contracts.

[Click here](./overview/) for a complete technical introduction to the Kosu protocol.

## Use cases

Developers, applications, and businesses can leverage the core protocol (contract system and OrderStream network) for a variety of use cases, finance-related or otherwise.

-   [Derive and serve an order book](https://github.com/ParadigmFoundation/OrderStream-SRA) from the OrderStream
-   [Tap into on-demand liquidity](./overview/readme.md#protocol-design) from anywhere in the world, without restriction
-   Build a "matcher" – an exchange build atop the decentralized OrderStream liquidity network
-   Trade fully client-side with an OrderStream node, and an Ethereum client
-   Use the OrderStream as infrastructure and an API to run an open order book relayer
-   Experiment with the OrderStream event-based API for new types of decentralized applications
-   ...

## Core protocol

The core protocol is implemented as an event-driven, proof-of-stake based relay network, supported by a system of Ethereum contracts. The network itself is currently built on [Tendermint](https://tendermint.com/).

[Click here](./overview/governance.md) to read about governance of the Kosu protocol.

## Developer tools

Paradigm Labs is also leading development of a variety of developer tools to enable rapid development on top of the Paradigm protocol and settlement platform. A non-exhaustive list is below.

-   [Kosu.js](./kosu.js/) (source code [here](https://github.com/ParadigmFoundation/kosu-monorepo))
    -   Primary library for interacting with the Kosu contract system and network
    -   Includes tools for making, signing, and posting orders
    -   Allows execution/settlement of trades as a taker
    -   Enables "listening" to the Kosu network event API to build order books

## Community

Paradigm Labs is committed to developing Kosu as open-source software. Connect with the team and the community to share ideas, give feedback, and ask for help.

-   Documentation at [docs.kosu.io](https://docs.kosu.io)
-   Source code hosted and developed [on GitHub](https://github.com/ParadigmFoundation)
-   Subscribe to [our subeddit](https://reddit.com/r/ParadigmFoundation)
-   Follow us [on Twitter](https://twitter.com/paradigmfdn), and [on Medium](https://medium.com/paradigm-foundation)
-   Ask for help on [our chat server](https://chat.paradigm.market)
