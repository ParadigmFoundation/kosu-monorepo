> **[kosu.js](../README.md)**

[Globals](../globals.md) / [PosterRegistry](posterregistry.md) /

# Class: PosterRegistry

Interact with the Kosu PosterRegistry contract on the Ethereum blockchain.

Instances of the `PosterRegistry` class allow users to interact with the
deployed contract to bond and un-bond tokens (for access to the Kosu network)
and to view their balance, as well as the cumulative lockup.

## Hierarchy

* **PosterRegistry**

## Index

### Constructors

* [constructor](posterregistry.md#constructor)

### Properties

* [address](posterregistry.md#private-address)
* [contract](posterregistry.md#private-contract)
* [treasury](posterregistry.md#private-treasury)
* [web3](posterregistry.md#private-web3)
* [web3Wrapper](posterregistry.md#private-web3wrapper)

### Methods

* [getContract](posterregistry.md#private-getcontract)
* [pay](posterregistry.md#pay)
* [registerTokens](posterregistry.md#registertokens)
* [releaseTokens](posterregistry.md#releasetokens)
* [tokensContributed](posterregistry.md#tokenscontributed)
* [tokensRegisteredFor](posterregistry.md#tokensregisteredfor)

## Constructors

###  constructor

\+ **new PosterRegistry**(`options`: [KosuOptions](../interfaces/kosuoptions.md), `treasury`: [Treasury](treasury.md)): *[PosterRegistry](posterregistry.md)*

*Defined in [PosterRegistry.ts:41](https://github.com/ParadigmFoundation/kosu-monorepo/blob/5992fd1/packages/kosu.js/src/PosterRegistry.ts#L41)*

Create a new PosterRegistry instance.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`options` | [KosuOptions](../interfaces/kosuoptions.md) | Instantiation options (see `KosuOptions`). |
`treasury` | [Treasury](treasury.md) | Treasury integration instance.  |

**Returns:** *[PosterRegistry](posterregistry.md)*

## Properties

### `Private` address

• **address**: *string*

*Defined in [PosterRegistry.ts:41](https://github.com/ParadigmFoundation/kosu-monorepo/blob/5992fd1/packages/kosu.js/src/PosterRegistry.ts#L41)*

The address of the deployed PosterRegistry proxy contract.

___

### `Private` contract

• **contract**: *`PosterRegistryContract`*

*Defined in [PosterRegistry.ts:36](https://github.com/ParadigmFoundation/kosu-monorepo/blob/5992fd1/packages/kosu.js/src/PosterRegistry.ts#L36)*

A lower-level, auto-generated contract wrapper for the PosterRegistry
proxy contract. Generated from solidity source code.

___

### `Private` treasury

• **treasury**: *[Treasury](treasury.md)*

*Defined in [PosterRegistry.ts:30](https://github.com/ParadigmFoundation/kosu-monorepo/blob/5992fd1/packages/kosu.js/src/PosterRegistry.ts#L30)*

An instantiated Treasury contract wrapper.

___

### `Private` web3

• **web3**: *`Web3`*

*Defined in [PosterRegistry.ts:20](https://github.com/ParadigmFoundation/kosu-monorepo/blob/5992fd1/packages/kosu.js/src/PosterRegistry.ts#L20)*

An instance of `web3` used to interact with the Ethereum blockchain.

___

### `Private` web3Wrapper

• **web3Wrapper**: *`Web3Wrapper`*

*Defined in [PosterRegistry.ts:25](https://github.com/ParadigmFoundation/kosu-monorepo/blob/5992fd1/packages/kosu.js/src/PosterRegistry.ts#L25)*

The `web3Wrapper` instance with the contract's ABI loaded.

## Methods

### `Private` getContract

▸ **getContract**(): *`Promise<PosterRegistryContract>`*

*Defined in [PosterRegistry.ts:61](https://github.com/ParadigmFoundation/kosu-monorepo/blob/5992fd1/packages/kosu.js/src/PosterRegistry.ts#L61)*

Asynchronously initializes the contract instance or returns it from cache.

**Returns:** *`Promise<PosterRegistryContract>`*

The contract wrapper instance.

___

###  pay

▸ **pay**(`value`: `BigNumber`): *`Promise<TransactionReceiptWithDecodedLogs>`*

*Defined in [PosterRegistry.ts:149](https://github.com/ParadigmFoundation/kosu-monorepo/blob/5992fd1/packages/kosu.js/src/PosterRegistry.ts#L149)*

Sends ether to the contract to bond and register tokens for posting.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`value` | `BigNumber` | Amount of wei to deposit |

**Returns:** *`Promise<TransactionReceiptWithDecodedLogs>`*

Logs from the transaction block.

___

###  registerTokens

▸ **registerTokens**(`amount`: `BigNumber`): *`Promise<TransactionReceiptWithDecodedLogs>`*

*Defined in [PosterRegistry.ts:107](https://github.com/ParadigmFoundation/kosu-monorepo/blob/5992fd1/packages/kosu.js/src/PosterRegistry.ts#L107)*

Register tokens into the PosterRegistry contract by bonding KOSU tokens.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`amount` | `BigNumber` | The uint value of tokens to register (in wei). |

**Returns:** *`Promise<TransactionReceiptWithDecodedLogs>`*

A transaction receipt from the mined `register` transaction.

___

###  releaseTokens

▸ **releaseTokens**(`amount`: `BigNumber`): *`Promise<TransactionReceiptWithDecodedLogs>`*

*Defined in [PosterRegistry.ts:138](https://github.com/ParadigmFoundation/kosu-monorepo/blob/5992fd1/packages/kosu.js/src/PosterRegistry.ts#L138)*

Release tokens from the PosterRegistry for the `coinbase` address (un-bond).

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`amount` | `BigNumber` | The uint value of tokens to release from the registry (in wei). |

**Returns:** *`Promise<TransactionReceiptWithDecodedLogs>`*

A transaction receipt from the mined `register` transaction.

___

###  tokensContributed

▸ **tokensContributed**(): *`Promise<BigNumber>`*

*Defined in [PosterRegistry.ts:85](https://github.com/ParadigmFoundation/kosu-monorepo/blob/5992fd1/packages/kosu.js/src/PosterRegistry.ts#L85)*

Reads total KOSU tokens contributed to registry.

**Returns:** *`Promise<BigNumber>`*

The total pool of locked KOSU tokens in units of wei.

___

###  tokensRegisteredFor

▸ **tokensRegisteredFor**(`address`: string): *`Promise<BigNumber>`*

*Defined in [PosterRegistry.ts:96](https://github.com/ParadigmFoundation/kosu-monorepo/blob/5992fd1/packages/kosu.js/src/PosterRegistry.ts#L96)*

Reads number of tokens registered for a given address.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`address` | string | Address of user to query the bonded balance of. |

**Returns:** *`Promise<BigNumber>`*

The number of tokens bonded by the supplied user's address in wei.