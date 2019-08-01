> **[kosu.js](../README.md)**

[Globals](../globals.md) / [PosterRegistry](posterregistry.md) /

# Class: PosterRegistry

Interact with the Kosu PosterRegistry contract on the Ethereum blockchain.

Instances of the `PosterRegistry` class allow users to interact with the
deployed contract to bond and un-bond tokens (for access to the Kosu network)
and to view their balance, as well as the cumulative lockup.

## Hierarchy

-   **PosterRegistry**

## Index

### Constructors

-   [constructor](posterregistry.md#constructor)

### Properties

-   [address](posterregistry.md#private-address)
-   [contract](posterregistry.md#private-contract)
-   [treasury](posterregistry.md#private-treasury)
-   [web3](posterregistry.md#private-web3)
-   [web3Wrapper](posterregistry.md#private-web3wrapper)

### Methods

-   [getContract](posterregistry.md#private-getcontract)
-   [pay](posterregistry.md#pay)
-   [registerTokens](posterregistry.md#registertokens)
-   [releaseTokens](posterregistry.md#releasetokens)
-   [tokensContributed](posterregistry.md#tokenscontributed)
-   [tokensRegisteredFor](posterregistry.md#tokensregisteredfor)

## Constructors

### constructor

\+ **new PosterRegistry**(`options`: [KosuOptions](../interfaces/kosuoptions.md), `treasury`: [Treasury](treasury.md)): _[PosterRegistry](posterregistry.md)_

_Defined in [PosterRegistry.ts:41](https://github.com/ParadigmFoundation/kosu-monorepo/blob/5992fd1/packages/kosu.js/src/PosterRegistry.ts#L41)_

Create a new PosterRegistry instance.

**Parameters:**

| Name       | Type                                        | Description                                |
| ---------- | ------------------------------------------- | ------------------------------------------ |
| `options`  | [KosuOptions](../interfaces/kosuoptions.md) | Instantiation options (see `KosuOptions`). |
| `treasury` | [Treasury](treasury.md)                     | Treasury integration instance.             |

**Returns:** _[PosterRegistry](posterregistry.md)_

## Properties

### `Private` address

• **address**: _string_

_Defined in [PosterRegistry.ts:41](https://github.com/ParadigmFoundation/kosu-monorepo/blob/5992fd1/packages/kosu.js/src/PosterRegistry.ts#L41)_

The address of the deployed PosterRegistry proxy contract.

---

### `Private` contract

• **contract**: _`PosterRegistryContract`_

_Defined in [PosterRegistry.ts:36](https://github.com/ParadigmFoundation/kosu-monorepo/blob/5992fd1/packages/kosu.js/src/PosterRegistry.ts#L36)_

A lower-level, auto-generated contract wrapper for the PosterRegistry
proxy contract. Generated from solidity source code.

---

### `Private` treasury

• **treasury**: _[Treasury](treasury.md)_

_Defined in [PosterRegistry.ts:30](https://github.com/ParadigmFoundation/kosu-monorepo/blob/5992fd1/packages/kosu.js/src/PosterRegistry.ts#L30)_

An instantiated Treasury contract wrapper.

---

### `Private` web3

• **web3**: _`Web3`_

_Defined in [PosterRegistry.ts:20](https://github.com/ParadigmFoundation/kosu-monorepo/blob/5992fd1/packages/kosu.js/src/PosterRegistry.ts#L20)_

An instance of `web3` used to interact with the Ethereum blockchain.

---

### `Private` web3Wrapper

• **web3Wrapper**: _`Web3Wrapper`_

_Defined in [PosterRegistry.ts:25](https://github.com/ParadigmFoundation/kosu-monorepo/blob/5992fd1/packages/kosu.js/src/PosterRegistry.ts#L25)_

The `web3Wrapper` instance with the contract's ABI loaded.

## Methods

### `Private` getContract

▸ **getContract**(): _`Promise<PosterRegistryContract>`_

_Defined in [PosterRegistry.ts:61](https://github.com/ParadigmFoundation/kosu-monorepo/blob/5992fd1/packages/kosu.js/src/PosterRegistry.ts#L61)_

Asynchronously initializes the contract instance or returns it from cache.

**Returns:** _`Promise<PosterRegistryContract>`_

The contract wrapper instance.

---

### pay

▸ **pay**(`value`: `BigNumber`): _`Promise<TransactionReceiptWithDecodedLogs>`_

_Defined in [PosterRegistry.ts:149](https://github.com/ParadigmFoundation/kosu-monorepo/blob/5992fd1/packages/kosu.js/src/PosterRegistry.ts#L149)_

Sends ether to the contract to bond and register tokens for posting.

**Parameters:**

| Name    | Type        | Description              |
| ------- | ----------- | ------------------------ |
| `value` | `BigNumber` | Amount of wei to deposit |

**Returns:** _`Promise<TransactionReceiptWithDecodedLogs>`_

Logs from the transaction block.

---

### registerTokens

▸ **registerTokens**(`amount`: `BigNumber`): _`Promise<TransactionReceiptWithDecodedLogs>`_

_Defined in [PosterRegistry.ts:107](https://github.com/ParadigmFoundation/kosu-monorepo/blob/5992fd1/packages/kosu.js/src/PosterRegistry.ts#L107)_

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

_Defined in [PosterRegistry.ts:138](https://github.com/ParadigmFoundation/kosu-monorepo/blob/5992fd1/packages/kosu.js/src/PosterRegistry.ts#L138)_

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

_Defined in [PosterRegistry.ts:85](https://github.com/ParadigmFoundation/kosu-monorepo/blob/5992fd1/packages/kosu.js/src/PosterRegistry.ts#L85)_

Reads total KOSU tokens contributed to registry.

**Returns:** _`Promise<BigNumber>`_

The total pool of locked KOSU tokens in units of wei.

---

### tokensRegisteredFor

▸ **tokensRegisteredFor**(`address`: string): _`Promise<BigNumber>`_

_Defined in [PosterRegistry.ts:96](https://github.com/ParadigmFoundation/kosu-monorepo/blob/5992fd1/packages/kosu.js/src/PosterRegistry.ts#L96)_

Reads number of tokens registered for a given address.

**Parameters:**

| Name      | Type   | Description                                     |
| --------- | ------ | ----------------------------------------------- |
| `address` | string | Address of user to query the bonded balance of. |

**Returns:** _`Promise<BigNumber>`_

The number of tokens bonded by the supplied user's address in wei.
