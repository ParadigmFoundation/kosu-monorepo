> ## [kosu.js](../README.md)

[Globals](../globals.md) / [PosterRegistry](posterregistry.md) /

# Class: PosterRegistry

Interact with the Kosu PosterRegistry contract on the Ethereum blockchain.

Instances of the `PosterRegistry` class allow users to interact with the
deployed contract to bond and un-bond tokens (for access to the Kosu network)
and to view their balance, as well as the cumulative lockup.

## Hierarchy

-   **PosterRegistry**

### Index

#### Constructors

-   [constructor](posterregistry.md#constructor)

#### Properties

-   [address](posterregistry.md#private-address)
-   [contract](posterregistry.md#private-contract)
-   [treasury](posterregistry.md#private-treasury)
-   [web3](posterregistry.md#private-web3)
-   [web3Wrapper](posterregistry.md#private-web3wrapper)

#### Methods

-   [getContract](posterregistry.md#private-getcontract)
-   [registerTokens](posterregistry.md#registertokens)
-   [releaseTokens](posterregistry.md#releasetokens)
-   [tokensContributed](posterregistry.md#tokenscontributed)
-   [tokensRegisteredFor](posterregistry.md#tokensregisteredfor)

## Constructors

### constructor

\+ **new PosterRegistry**(`options`: [KosuOptions](../interfaces/kosuoptions.md), `treasury`: [Treasury](treasury.md)): _[PosterRegistry](posterregistry.md)_

_Defined in [PosterRegistry.ts:41](url)_

Create a new PosterRegistry instance.

**Parameters:**

| Name       | Type                                        | Description                                |
| ---------- | ------------------------------------------- | ------------------------------------------ |
| `options`  | [KosuOptions](../interfaces/kosuoptions.md) | Instantiation options (see `KosuOptions`). |
| `treasury` | [Treasury](treasury.md)                     | Treasury integration instance.             |

**Returns:** _[PosterRegistry](posterregistry.md)_

---

## Properties

### `Private` address

● **address**: _string_

_Defined in [PosterRegistry.ts:41](url)_

The address of the deployed PosterRegistry proxy contract.

---

### `Private` contract

● **contract**: _`PosterRegistryProxyContract`_

_Defined in [PosterRegistry.ts:36](url)_

A lower-level, auto-generated contract wrapper for the PosterRegistry
proxy contract. Generated from solidity source code.

---

### `Private` treasury

● **treasury**: _[Treasury](treasury.md)_

_Defined in [PosterRegistry.ts:30](url)_

An instantiated Treasury contract wrapper.

---

### `Private` web3

● **web3**: _`Web3`_

_Defined in [PosterRegistry.ts:20](url)_

An instance of `web3` used to interact with the Ethereum blockchain.

---

### `Private` web3Wrapper

● **web3Wrapper**: _`Web3Wrapper`_

_Defined in [PosterRegistry.ts:25](url)_

The `web3Wrapper` instance with the contract's ABI loaded.

---

## Methods

### `Private` getContract

▸ **getContract**(): _`Promise<PosterRegistryProxyContract>`_

_Defined in [PosterRegistry.ts:61](url)_

Asynchronously initializes the contract instance or returns it from cache.

**Returns:** _`Promise<PosterRegistryProxyContract>`_

The contract wrapper instance.

---

### registerTokens

▸ **registerTokens**(`amount`: `BigNumber`): _`Promise<TransactionReceiptWithDecodedLogs>`_

_Defined in [PosterRegistry.ts:110](url)_

Register tokens into the PosterRegistry contract by bonding KOSU tokens.

**Parameters:**

| Name     | Type        | Description                                    |
| -------- | ----------- | ---------------------------------------------- |
| `amount` | `BigNumber` | The uint value of tokens to register (in wei). |

**Returns:** _`Promise<TransactionReceiptWithDecodedLogs>`_

A transaction receipt from the mined `register` transaction.

---

### releaseTokens

▸ **releaseTokens**(`amount`: `BigNumber`): _`Promise<TransactionReceiptWithDecodedLogs>`_

_Defined in [PosterRegistry.ts:141](url)_

Release tokens from the PosterRegistry for the `coinbase` address (un-bond).

**Parameters:**

| Name     | Type        | Description                                                     |
| -------- | ----------- | --------------------------------------------------------------- |
| `amount` | `BigNumber` | The uint value of tokens to release from the registry (in wei). |

**Returns:** _`Promise<TransactionReceiptWithDecodedLogs>`_

A transaction receipt from the mined `register` transaction.

---

### tokensContributed

▸ **tokensContributed**(): _`Promise<BigNumber>`_

_Defined in [PosterRegistry.ts:88](url)_

Reads total KOSU tokens contributed to registry.

**Returns:** _`Promise<BigNumber>`_

The total pool of locked KOSU tokens in units of wei.

---

### tokensRegisteredFor

▸ **tokensRegisteredFor**(`address`: string): _`Promise<BigNumber>`_

_Defined in [PosterRegistry.ts:99](url)_

Reads number of tokens registered for a given address.

**Parameters:**

| Name      | Type   | Description                                     |
| --------- | ------ | ----------------------------------------------- |
| `address` | string | Address of user to query the bonded balance of. |

**Returns:** _`Promise<BigNumber>`_

The number of tokens bonded by the supplied user's address in wei.

---
