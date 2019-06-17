> ## [kosu.js](../README.md)

[Globals](../globals.md) / [PosterRegistry](posterregistry.md) /

# Class: PosterRegistry

Integration with PosterRegistry contract on an Ethereum blockchain.

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

\+ **new PosterRegistry**(`options`: `KosuOptions`, `treasury`: [Treasury](treasury.md)): _[PosterRegistry](posterregistry.md)_

_Defined in [packages/kosu.js/src/PosterRegistry.ts:17](url)_

Create a new PosterRegistry instance.

**Parameters:**

| Name       | Type                    | Description                   |
| ---------- | ----------------------- | ----------------------------- |
| `options`  | `KosuOptions`           | instantiation options         |
| `treasury` | [Treasury](treasury.md) | treasury integration instance |

**Returns:** _[PosterRegistry](posterregistry.md)_

---

## Properties

### `Private` address

● **address**: _string_

_Defined in [packages/kosu.js/src/PosterRegistry.ts:17](url)_

---

### `Private` contract

● **contract**: _[PosterRegistryProxyContract](posterregistryproxycontract.md)_

_Defined in [packages/kosu.js/src/PosterRegistry.ts:15](url)_

---

### `Private` treasury

● **treasury**: _[Treasury](treasury.md)_

_Defined in [packages/kosu.js/src/PosterRegistry.ts:14](url)_

---

### `Private` web3

● **web3**: _`Web3`_

_Defined in [packages/kosu.js/src/PosterRegistry.ts:13](url)_

---

### `Private` web3Wrapper

● **web3Wrapper**: _`Web3Wrapper`_

_Defined in [packages/kosu.js/src/PosterRegistry.ts:16](url)_

---

## Methods

### `Private` getContract

▸ **getContract**(): _`Promise<PosterRegistryProxyContract>`_

_Defined in [packages/kosu.js/src/PosterRegistry.ts:37](url)_

Asynchronously initializes the contract instance or returns it from cache

**Returns:** _`Promise<PosterRegistryProxyContract>`_

The contract

---

### registerTokens

▸ **registerTokens**(`amount`: `BigNumber`): _`Promise<TransactionReceiptWithDecodedLogs>`_

_Defined in [packages/kosu.js/src/PosterRegistry.ts:82](url)_

Registers tokens

**Parameters:**

| Name     | Type        | Description                      |
| -------- | ----------- | -------------------------------- |
| `amount` | `BigNumber` | uint value of tokens to register |

**Returns:** _`Promise<TransactionReceiptWithDecodedLogs>`_

---

### releaseTokens

▸ **releaseTokens**(`amount`: `BigNumber`): _`Promise<TransactionReceiptWithDecodedLogs>`_

_Defined in [packages/kosu.js/src/PosterRegistry.ts:112](url)_

Releases tokens

**Parameters:**

| Name     | Type        | Description                      |
| -------- | ----------- | -------------------------------- |
| `amount` | `BigNumber` | uint values of tokens to release |

**Returns:** _`Promise<TransactionReceiptWithDecodedLogs>`_

---

### tokensContributed

▸ **tokensContributed**(): _`Promise<BigNumber>`_

_Defined in [packages/kosu.js/src/PosterRegistry.ts:62](url)_

Reads total tokens contributed to registry

**Returns:** _`Promise<BigNumber>`_

---

### tokensRegisteredFor

▸ **tokensRegisteredFor**(`address`: string): _`Promise<BigNumber>`_

_Defined in [packages/kosu.js/src/PosterRegistry.ts:72](url)_

Reads number of tokens registered for address

**Parameters:**

| Name      | Type   | Description                |
| --------- | ------ | -------------------------- |
| `address` | string | Address of registered user |

**Returns:** _`Promise<BigNumber>`_

---
