> ## [kosu.js](../README.md)

[Globals](../globals.md) / [PosterRegistry](posterregistry.md) /

# Class: PosterRegistry

Interact with the Kosu PosterRegistry contract on the Ethereum blockchain.

Instances of the `PosterRegistry` class allow users to interact with the
deployed contract to bond and un-bond tokens (for access to the Kosu network)
and to view their balance, as well as the cumulative lockup.

## Hierarchy

* **PosterRegistry**

### Index

#### Constructors

* [constructor](posterregistry.md#constructor)

#### Properties

* [address](posterregistry.md#private-address)
* [contract](posterregistry.md#private-contract)
* [treasury](posterregistry.md#private-treasury)
* [web3](posterregistry.md#private-web3)
* [web3Wrapper](posterregistry.md#private-web3wrapper)

#### Methods

* [getContract](posterregistry.md#private-getcontract)
* [registerTokens](posterregistry.md#registertokens)
* [releaseTokens](posterregistry.md#releasetokens)
* [tokensContributed](posterregistry.md#tokenscontributed)
* [tokensRegisteredFor](posterregistry.md#tokensregisteredfor)

## Constructors

###  constructor

\+ **new PosterRegistry**(`options`: [KosuOptions](../interfaces/kosuoptions.md), `treasury`: [Treasury](treasury.md)): *[PosterRegistry](posterregistry.md)*

Defined in PosterRegistry.ts:41

Create a new PosterRegistry instance.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`options` | [KosuOptions](../interfaces/kosuoptions.md) | Instantiation options (see `KosuOptions`). |
`treasury` | [Treasury](treasury.md) | Treasury integration instance.  |

**Returns:** *[PosterRegistry](posterregistry.md)*

___

## Properties

### `Private` address

● **address**: *string*

Defined in PosterRegistry.ts:41

The address of the deployed PosterRegistry proxy contract.

___

### `Private` contract

● **contract**: *`PosterRegistryProxyContract`*

Defined in PosterRegistry.ts:36

A lower-level, auto-generated contract wrapper for the PosterRegistry
proxy contract. Generated from solidity source code.

___

### `Private` treasury

● **treasury**: *[Treasury](treasury.md)*

Defined in PosterRegistry.ts:30

An instantiated Treasury contract wrapper.

___

### `Private` web3

● **web3**: *`Web3`*

Defined in PosterRegistry.ts:20

An instance of `web3` used to interact with the Ethereum blockchain.

___

### `Private` web3Wrapper

● **web3Wrapper**: *`Web3Wrapper`*

Defined in PosterRegistry.ts:25

The `web3Wrapper` instance with the contract's ABI loaded.

___

## Methods

### `Private` getContract

▸ **getContract**(): *`Promise<PosterRegistryProxyContract>`*

Defined in PosterRegistry.ts:61

Asynchronously initializes the contract instance or returns it from cache.

**Returns:** *`Promise<PosterRegistryProxyContract>`*

The contract wrapper instance.

___

###  registerTokens

▸ **registerTokens**(`amount`: `BigNumber`): *`Promise<TransactionReceiptWithDecodedLogs>`*

Defined in PosterRegistry.ts:110

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

Defined in PosterRegistry.ts:141

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

Defined in PosterRegistry.ts:88

Reads total KOSU tokens contributed to registry.

**Returns:** *`Promise<BigNumber>`*

The total pool of locked KOSU tokens in units of wei.

___

###  tokensRegisteredFor

▸ **tokensRegisteredFor**(`address`: string): *`Promise<BigNumber>`*

Defined in PosterRegistry.ts:99

Reads number of tokens registered for a given address.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`address` | string | Address of user to query the bonded balance of. |

**Returns:** *`Promise<BigNumber>`*

The number of tokens bonded by the supplied user's address in wei.

___