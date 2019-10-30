[wrapper-enhancements](../README.md) › [Globals](../globals.md) › [PosterRegistry](posterregistry.md)

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

-   [address](posterregistry.md#address)
-   [coinbase](posterregistry.md#coinbase)
-   [contract](posterregistry.md#contract)
-   [treasury](posterregistry.md#treasury)
-   [web3Wrapper](posterregistry.md#web3wrapper)

### Methods

-   [getContract](posterregistry.md#getcontract)
-   [pay](posterregistry.md#pay)
-   [registerTokens](posterregistry.md#registertokens)
-   [releaseTokens](posterregistry.md#releasetokens)
-   [tokensContributed](posterregistry.md#tokenscontributed)
-   [tokensRegisteredFor](posterregistry.md#tokensregisteredfor)

## Constructors

### constructor

\+ **new PosterRegistry**(`options`: KosuOptions, `treasury?`: [Treasury](treasury.md)): _[PosterRegistry](posterregistry.md)_

_Defined in [PosterRegistry.ts:42](https://github.com/ParadigmFoundation/kosu-monorepo/blob/821f0d85/packages/kosu-wrapper-enhancements/src/PosterRegistry.ts#L42)_

Create a new PosterRegistry instance.

**Parameters:**

| Name        | Type                    | Description                                |
| ----------- | ----------------------- | ------------------------------------------ |
| `options`   | KosuOptions             | Instantiation options (see `KosuOptions`). |
| `treasury?` | [Treasury](treasury.md) | Treasury integration instance.             |

**Returns:** _[PosterRegistry](posterregistry.md)_

## Properties

### address

• **address**: _string_

_Defined in [PosterRegistry.ts:37](https://github.com/ParadigmFoundation/kosu-monorepo/blob/821f0d85/packages/kosu-wrapper-enhancements/src/PosterRegistry.ts#L37)_

The address of the deployed PosterRegistry proxy contract.

---

### coinbase

• **coinbase**: _string_

_Defined in [PosterRegistry.ts:42](https://github.com/ParadigmFoundation/kosu-monorepo/blob/821f0d85/packages/kosu-wrapper-enhancements/src/PosterRegistry.ts#L42)_

The user's coinbase address (if available via supplied provider).

---

### contract

• **contract**: _PosterRegistryContract_

_Defined in [PosterRegistry.ts:32](https://github.com/ParadigmFoundation/kosu-monorepo/blob/821f0d85/packages/kosu-wrapper-enhancements/src/PosterRegistry.ts#L32)_

A lower-level, auto-generated contract wrapper for the PosterRegistry
proxy contract. Generated from solidity source code.

---

### treasury

• **treasury**: _[Treasury](treasury.md)_

_Defined in [PosterRegistry.ts:26](https://github.com/ParadigmFoundation/kosu-monorepo/blob/821f0d85/packages/kosu-wrapper-enhancements/src/PosterRegistry.ts#L26)_

An instantiated Treasury contract wrapper.

---

### web3Wrapper

• **web3Wrapper**: _Web3Wrapper_

_Defined in [PosterRegistry.ts:21](https://github.com/ParadigmFoundation/kosu-monorepo/blob/821f0d85/packages/kosu-wrapper-enhancements/src/PosterRegistry.ts#L21)_

The `web3Wrapper` instance with the contract's ABI loaded.

## Methods

### getContract

▸ **getContract**(): _Promise‹PosterRegistryContract›_

_Defined in [PosterRegistry.ts:61](https://github.com/ParadigmFoundation/kosu-monorepo/blob/821f0d85/packages/kosu-wrapper-enhancements/src/PosterRegistry.ts#L61)_

Asynchronously initializes the contract instance or returns it from cache.

**Returns:** _Promise‹PosterRegistryContract›_

The contract wrapper instance.

---

### pay

▸ **pay**(`value`: BigNumber | number | string): _Promise‹TransactionReceiptWithDecodedLogs›_

_Defined in [PosterRegistry.ts:148](https://github.com/ParadigmFoundation/kosu-monorepo/blob/821f0d85/packages/kosu-wrapper-enhancements/src/PosterRegistry.ts#L148)_

Sends ether to the contract to bond and register tokens for posting.

**Parameters:**

| Name    | Type                                  | Description              |
| ------- | ------------------------------------- | ------------------------ |
| `value` | BigNumber &#124; number &#124; string | Amount of wei to deposit |

**Returns:** _Promise‹TransactionReceiptWithDecodedLogs›_

Logs from the transaction block.

---

### registerTokens

▸ **registerTokens**(`amount`: BigNumber | number | string): _Promise‹TransactionReceiptWithDecodedLogs›_

_Defined in [PosterRegistry.ts:107](https://github.com/ParadigmFoundation/kosu-monorepo/blob/821f0d85/packages/kosu-wrapper-enhancements/src/PosterRegistry.ts#L107)_

Register tokens into the PosterRegistry contract by bonding KOSU tokens.

**Parameters:**

| Name     | Type                                  | Description                                    |
| -------- | ------------------------------------- | ---------------------------------------------- |
| `amount` | BigNumber &#124; number &#124; string | The uint value of tokens to register (in wei). |

**Returns:** _Promise‹TransactionReceiptWithDecodedLogs›_

A transaction receipt from the mined `register` transaction.

---

### releaseTokens

▸ **releaseTokens**(`amount`: BigNumber | number | string): _Promise‹TransactionReceiptWithDecodedLogs›_

_Defined in [PosterRegistry.ts:137](https://github.com/ParadigmFoundation/kosu-monorepo/blob/821f0d85/packages/kosu-wrapper-enhancements/src/PosterRegistry.ts#L137)_

Release tokens from the PosterRegistry for the `coinbase` address (un-bond).

**Parameters:**

| Name     | Type                                  | Description                                                     |
| -------- | ------------------------------------- | --------------------------------------------------------------- |
| `amount` | BigNumber &#124; number &#124; string | The uint value of tokens to release from the registry (in wei). |

**Returns:** _Promise‹TransactionReceiptWithDecodedLogs›_

A transaction receipt from the mined `register` transaction.

---

### tokensContributed

▸ **tokensContributed**(): _Promise‹BigNumber›_

_Defined in [PosterRegistry.ts:85](https://github.com/ParadigmFoundation/kosu-monorepo/blob/821f0d85/packages/kosu-wrapper-enhancements/src/PosterRegistry.ts#L85)_

Reads total KOSU tokens contributed to registry.

**Returns:** _Promise‹BigNumber›_

The total pool of locked KOSU tokens in units of wei.

---

### tokensRegisteredFor

▸ **tokensRegisteredFor**(`address`: string): _Promise‹BigNumber›_

_Defined in [PosterRegistry.ts:96](https://github.com/ParadigmFoundation/kosu-monorepo/blob/821f0d85/packages/kosu-wrapper-enhancements/src/PosterRegistry.ts#L96)_

Reads number of tokens registered for a given address.

**Parameters:**

| Name      | Type   | Description                                     |
| --------- | ------ | ----------------------------------------------- |
| `address` | string | Address of user to query the bonded balance of. |

**Returns:** _Promise‹BigNumber›_

The number of tokens bonded by the supplied user's address in wei.
