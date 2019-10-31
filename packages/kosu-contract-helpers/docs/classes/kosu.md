[Kosu Contract Helpers](../README.md) › [Globals](../globals.md) › [Kosu](kosu.md)

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

## Index

### Constructors

-   [constructor](kosu.md#constructor)

### Properties

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

\+ **new Kosu**(`options`: KosuOptions): _[Kosu](kosu.md)_

_Defined in [Kosu.ts:126](https://github.com/ParadigmFoundation/kosu-monorepo/blob/67119cd9/packages/kosu-contract-helpers/src/Kosu.ts#L126)_

Create a new `kosu` instance and instantiate wrappers for each Kosu system
contract.

If provided with no arguments, `kosu` will be generated in a read-only
state, with a default Ropsten test-network provider. Methods that query
constants and the state of the contract system will work, the submission
of transactions and generation of signatures will not be possible.

**Parameters:**

| Name      | Type        | Description                                                                                                            |
| --------- | ----------- | ---------------------------------------------------------------------------------------------------------------------- |
| `options` | KosuOptions | An options object used to configure `kosu` and the configured contract instances. A custom `provider` may be supplied. |

**Returns:** _[Kosu](kosu.md)_

## Properties

### eventEmitter

• **eventEmitter**: _EventEmitter_

_Defined in [Kosu.ts:113](https://github.com/ParadigmFoundation/kosu-monorepo/blob/67119cd9/packages/kosu-contract-helpers/src/Kosu.ts#L113)_

The `eventEmitter` enables the query of and subscription to decoded event
logs from the Kosu `EventEmitter` contract.

---

### kosuToken

• **kosuToken**: _KosuToken_

_Defined in [Kosu.ts:78](https://github.com/ParadigmFoundation/kosu-monorepo/blob/67119cd9/packages/kosu-contract-helpers/src/Kosu.ts#L78)_

The `kosuToken` provides methods for interacting with the KOSU ERC-20 token.

---

### orderGateway

• **orderGateway**: _OrderGateway_

_Defined in [Kosu.ts:65](https://github.com/ParadigmFoundation/kosu-monorepo/blob/67119cd9/packages/kosu-contract-helpers/src/Kosu.ts#L65)_

The `orderGateway` instance provides access to the `OrderGateway` contract
which is used to direct settlement of orders to their corresponding
`SubContract` and underlying settlement logic.

It can also be used to load the required `arguments` for a specific order
type, based on a `SubContract` address.

---

### orderHelper

• **orderHelper**: _[OrderHelper](orderhelper.md)_

_Defined in [Kosu.ts:73](https://github.com/ParadigmFoundation/kosu-monorepo/blob/67119cd9/packages/kosu-contract-helpers/src/Kosu.ts#L73)_

The `orderHelper` instance provides methods for generating and signing
maker orders, signing orders for submission to the Kosu network, and
submitting orders for settlement on the Ethereum blockchain via the
`OrderGateway` and the `SubContract` specified in the maker order.

---

### posterRegistry

• **posterRegistry**: _PosterRegistry_

_Defined in [Kosu.ts:98](https://github.com/ParadigmFoundation/kosu-monorepo/blob/67119cd9/packages/kosu-contract-helpers/src/Kosu.ts#L98)_

The `posterRegistry` instance enables users to interact with the Kosu
`PosterRegistry` contract to bond and un-bond KOSU tokens to access the
order relay feature of the Kosu network.

---

### treasury

• **treasury**: _Treasury_

_Defined in [Kosu.ts:84](https://github.com/ParadigmFoundation/kosu-monorepo/blob/67119cd9/packages/kosu-contract-helpers/src/Kosu.ts#L84)_

The `treasury` instance provides access to functionality of the Kosu
`Treasury` contract, such as deposits/withdrawals and allowance management.

---

### utils

• **utils**: _KosuUtils_

_Defined in [Kosu.ts:121](https://github.com/ParadigmFoundation/kosu-monorepo/blob/67119cd9/packages/kosu-contract-helpers/src/Kosu.ts#L121)_

Common and helpful utility methods and constants for interacting with the
Kosu contract system and Ethereum blockchain.

---

### validatorRegistry

• **validatorRegistry**: _ValidatorRegistry_

_Defined in [Kosu.ts:107](https://github.com/ParadigmFoundation/kosu-monorepo/blob/67119cd9/packages/kosu-contract-helpers/src/Kosu.ts#L107)_

The `validatorRegistry` instance enables interaction with the `ValidatorRegistry`
token-curated registry system. The system enables users to submit proposals
to become validators and challenge existing validators and pending proposals.

It also provides query access to past challenges and the current listings.

---

### version

• **version**: _string_

_Defined in [Kosu.ts:126](https://github.com/ParadigmFoundation/kosu-monorepo/blob/67119cd9/packages/kosu-contract-helpers/src/Kosu.ts#L126)_

The current `@kosu/kosu.js` package version.

---

### voting

• **voting**: _Voting_

_Defined in [Kosu.ts:91](https://github.com/ParadigmFoundation/kosu-monorepo/blob/67119cd9/packages/kosu-contract-helpers/src/Kosu.ts#L91)_

The `voting` instance provides access to the Kosu `voting` contract and
allows users to participate in voting on governance measures, and claiming
rewards for correctly participating in winning polls.

---

### web3

• **web3**: _Web3_

_Defined in [Kosu.ts:46](https://github.com/ParadigmFoundation/kosu-monorepo/blob/67119cd9/packages/kosu-contract-helpers/src/Kosu.ts#L46)_

The primary `web3` instance provides access to an Ethereum node's JSONRPC
API and utilities. This instance is used to interact with each Kosu contract
wrapper and can be used to directly access the `web3` API.

---

### web3Wrapper

• **web3Wrapper**: _Web3Wrapper_

_Defined in [Kosu.ts:53](https://github.com/ParadigmFoundation/kosu-monorepo/blob/67119cd9/packages/kosu-contract-helpers/src/Kosu.ts#L53)_

The `web3Wrapper` is used for some extended features, and provides
a higher-level API to the same underlying `web3` provider. It it used to
manage the various deployed contracts ABI's.
