> ## [kosu.js](../README.md)

[Globals](../globals.md) / [Kosu](kosu.md) /

# Class: Kosu

The `Kosu` class assists in interacting with the Kosu contract system and
network.

Instances of the `Kosu` class (`kosu`) provide access to read and write
access to the Kosu contract system via the `web3` library and connection to
an Ethereum node, or remote provider (read-only).

If a compatible Ethereum network is detected (there has been a deployment of
the Kosu contract system with the same `networkId`), JavaScript wrappers of
each contract will be instantiated and can used to interact will the deployed
contracts.

## Hierarchy

-   **Kosu**

### Index

#### Constructors

-   [constructor](kosu.md#constructor)

#### Properties

-   [Signature](kosu.md#signature)
-   [eventEmitter](kosu.md#eventemitter)
-   [kosuToken](kosu.md#kosutoken)
-   [orderGateway](kosu.md#ordergateway)
-   [orderHelper](kosu.md#orderhelper)
-   [posterRegistry](kosu.md#posterregistry)
-   [treasury](kosu.md#treasury)
-   [utils](kosu.md#utils)
-   [validatorRegistry](kosu.md#validatorregistry)
-   [version](kosu.md#version)
-   [voting](kosu.md#voting)
-   [web3](kosu.md#web3)
-   [web3Wrapper](kosu.md#web3wrapper)

## Constructors

### constructor

\+ **new Kosu**(`options`: `KosuOptions`): _[Kosu](kosu.md)_

_Defined in [src/index.ts:126](url)_

Create a new `kosu` instance and instantiate wrappers for each Kosu system
contract.

If provided with no arguments, `kosu` will be generated in a read-only
state, with a default Ropsten test-network provider. Methods that query
constants and the state of the contract system will work, the submission
of transactions and generation of signatures will not be possible.

**Parameters:**

| Name      | Type          | Default value                             | Description                                                                                                            |
| --------- | ------------- | ----------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `options` | `KosuOptions` | { provider: "https://ropsten.infura.io" } | An options object used to configure `kosu` and the configured contract instances. A custom `provider` may be supplied. |

**Returns:** _[Kosu](kosu.md)_

---

## Properties

### Signature

● **Signature**: _`Signature`_

_Defined in [src/index.ts:121](url)_

Utilities for generating and recovering signatures for use within the
Kosu system.

---

### eventEmitter

● **eventEmitter**: _[EventEmitter](eventemitter.md)_

_Defined in [src/index.ts:107](url)_

The `eventEmitter` enables the query of and subscription to decoded event
logs from the Kosu `EventEmitter` contract.

---

### kosuToken

● **kosuToken**: _[KosuToken](kosutoken.md)_

_Defined in [src/index.ts:72](url)_

The `kosuToken` provides methods for interacting with the KOSU ERC-20 token.

---

### orderGateway

● **orderGateway**: _[OrderGateway](ordergateway.md)_

_Defined in [src/index.ts:59](url)_

The `orderGateway` instance provides access to the `OrderGateway` contract
which is used to direct settlement of orders to their corresponding
`SubContract` and underlying settlement logic.

It can also be used to load the required `arguments` for a specific order
type, based on a `SubContract` address.

---

### orderHelper

● **orderHelper**: _[OrderHelper](orderhelper.md)_

_Defined in [src/index.ts:67](url)_

The `orderHelper` instance provides methods for generating and signing
maker orders, signing orders for submission to the Kosu network, and
submitting orders for settlement on the Ethereum blockchain via the
`OrderGateway` and the `SubContract` specified in the maker order.

---

### posterRegistry

● **posterRegistry**: _[PosterRegistry](posterregistry.md)_

_Defined in [src/index.ts:92](url)_

The `posterRegistry` instance enables users to interact with the Kosu
`PosterRegistry` contract to bond and un-bond KOSU tokens to access the
order relay feature of the Kosu network.

---

### treasury

● **treasury**: _[Treasury](treasury.md)_

_Defined in [src/index.ts:78](url)_

The `treasury` instance provides access to functionality of the Kosu
`Treasury` contract, such as deposits/withdrawals and allowance management.

---

### utils

● **utils**: _`KosuUtils`_

_Defined in [src/index.ts:115](url)_

Common and helpful utility methods and constants for interacting with the
Kosu contract system and Ethereum blockchain.

---

### validatorRegistry

● **validatorRegistry**: _[ValidatorRegistry](validatorregistry.md)_

_Defined in [src/index.ts:101](url)_

The `validatorRegistry` instance enables interaction with the `ValidatorRegistry`
token-curated registry system. The system enables users to submit proposals
to become validators and challenge existing validators and pending proposals.

It also provides query access to past challenges and the current listings.

---

### version

● **version**: _string_

_Defined in [src/index.ts:126](url)_

The current `@kosu/kosu.js` package version.

---

### voting

● **voting**: _[Voting](voting.md)_

_Defined in [src/index.ts:85](url)_

The `voting` instance provides access to the Kosu `voting` contract and
allows users to participate in voting on governance measures, and claiming
rewards for correctly participating in winning polls.

---

### web3

● **web3**: _`Web3`_

_Defined in [src/index.ts:40](url)_

The primary `web3` instance provides access to an Ethereum node's JSONRPC
API and utilities. This instance is used to interact with each Kosu contract
wrapper and can be used to directly access the `web3` API.

---

### web3Wrapper

● **web3Wrapper**: _`Web3Wrapper`_

_Defined in [src/index.ts:47](url)_

The `web3Wrapper` is used for some extended features, and provides
a higher-level API to the same underlying `web3` provider. It it used to
manage the various deployed contracts ABI's.

---
