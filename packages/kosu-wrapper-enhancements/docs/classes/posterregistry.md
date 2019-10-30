[wrapper-enhancements](../README.md) › [Globals](../globals.md) › [PosterRegistry](posterregistry.md)

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

* [address](posterregistry.md#address)
* [coinbase](posterregistry.md#coinbase)
* [contract](posterregistry.md#contract)
* [treasury](posterregistry.md#treasury)
* [web3Wrapper](posterregistry.md#web3wrapper)

### Methods

* [getContract](posterregistry.md#getcontract)
* [pay](posterregistry.md#pay)
* [registerTokens](posterregistry.md#registertokens)
* [releaseTokens](posterregistry.md#releasetokens)
* [tokensContributed](posterregistry.md#tokenscontributed)
* [tokensRegisteredFor](posterregistry.md#tokensregisteredfor)

## Constructors

###  constructor

\+ **new PosterRegistry**(`options`: KosuOptions, `treasury?`: [Treasury](treasury.md)): *[PosterRegistry](posterregistry.md)*

*Defined in [PosterRegistry.ts:42](https://github.com/ParadigmFoundation/kosu-monorepo/blob/821f0d85/packages/kosu-wrapper-enhancements/src/PosterRegistry.ts#L42)*

Create a new PosterRegistry instance.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`options` | KosuOptions | Instantiation options (see `KosuOptions`). |
`treasury?` | [Treasury](treasury.md) | Treasury integration instance.  |

**Returns:** *[PosterRegistry](posterregistry.md)*

## Properties

###  address

• **address**: *string*

*Defined in [PosterRegistry.ts:37](https://github.com/ParadigmFoundation/kosu-monorepo/blob/821f0d85/packages/kosu-wrapper-enhancements/src/PosterRegistry.ts#L37)*

The address of the deployed PosterRegistry proxy contract.

___

###  coinbase

• **coinbase**: *string*

*Defined in [PosterRegistry.ts:42](https://github.com/ParadigmFoundation/kosu-monorepo/blob/821f0d85/packages/kosu-wrapper-enhancements/src/PosterRegistry.ts#L42)*

The user's coinbase address (if available via supplied provider).

___

###  contract

• **contract**: *PosterRegistryContract*

*Defined in [PosterRegistry.ts:32](https://github.com/ParadigmFoundation/kosu-monorepo/blob/821f0d85/packages/kosu-wrapper-enhancements/src/PosterRegistry.ts#L32)*

A lower-level, auto-generated contract wrapper for the PosterRegistry
proxy contract. Generated from solidity source code.

___

###  treasury

• **treasury**: *[Treasury](treasury.md)*

*Defined in [PosterRegistry.ts:26](https://github.com/ParadigmFoundation/kosu-monorepo/blob/821f0d85/packages/kosu-wrapper-enhancements/src/PosterRegistry.ts#L26)*

An instantiated Treasury contract wrapper.

___

###  web3Wrapper

• **web3Wrapper**: *Web3Wrapper*

*Defined in [PosterRegistry.ts:21](https://github.com/ParadigmFoundation/kosu-monorepo/blob/821f0d85/packages/kosu-wrapper-enhancements/src/PosterRegistry.ts#L21)*

The `web3Wrapper` instance with the contract's ABI loaded.

## Methods

###  getContract

▸ **getContract**(): *Promise‹PosterRegistryContract›*

*Defined in [PosterRegistry.ts:61](https://github.com/ParadigmFoundation/kosu-monorepo/blob/821f0d85/packages/kosu-wrapper-enhancements/src/PosterRegistry.ts#L61)*

Asynchronously initializes the contract instance or returns it from cache.

**Returns:** *Promise‹PosterRegistryContract›*

The contract wrapper instance.

___

###  pay

▸ **pay**(`value`: BigNumber | number | string): *Promise‹TransactionReceiptWithDecodedLogs›*

*Defined in [PosterRegistry.ts:148](https://github.com/ParadigmFoundation/kosu-monorepo/blob/821f0d85/packages/kosu-wrapper-enhancements/src/PosterRegistry.ts#L148)*

Sends ether to the contract to bond and register tokens for posting.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`value` | BigNumber &#124; number &#124; string | Amount of wei to deposit |

**Returns:** *Promise‹TransactionReceiptWithDecodedLogs›*

Logs from the transaction block.

___

###  registerTokens

▸ **registerTokens**(`amount`: BigNumber | number | string): *Promise‹TransactionReceiptWithDecodedLogs›*

*Defined in [PosterRegistry.ts:107](https://github.com/ParadigmFoundation/kosu-monorepo/blob/821f0d85/packages/kosu-wrapper-enhancements/src/PosterRegistry.ts#L107)*

Register tokens into the PosterRegistry contract by bonding KOSU tokens.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`amount` | BigNumber &#124; number &#124; string | The uint value of tokens to register (in wei). |

**Returns:** *Promise‹TransactionReceiptWithDecodedLogs›*

A transaction receipt from the mined `register` transaction.

___

###  releaseTokens

▸ **releaseTokens**(`amount`: BigNumber | number | string): *Promise‹TransactionReceiptWithDecodedLogs›*

*Defined in [PosterRegistry.ts:137](https://github.com/ParadigmFoundation/kosu-monorepo/blob/821f0d85/packages/kosu-wrapper-enhancements/src/PosterRegistry.ts#L137)*

Release tokens from the PosterRegistry for the `coinbase` address (un-bond).

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`amount` | BigNumber &#124; number &#124; string | The uint value of tokens to release from the registry (in wei). |

**Returns:** *Promise‹TransactionReceiptWithDecodedLogs›*

A transaction receipt from the mined `register` transaction.

___

###  tokensContributed

▸ **tokensContributed**(): *Promise‹BigNumber›*

*Defined in [PosterRegistry.ts:85](https://github.com/ParadigmFoundation/kosu-monorepo/blob/821f0d85/packages/kosu-wrapper-enhancements/src/PosterRegistry.ts#L85)*

Reads total KOSU tokens contributed to registry.

**Returns:** *Promise‹BigNumber›*

The total pool of locked KOSU tokens in units of wei.

___

###  tokensRegisteredFor

▸ **tokensRegisteredFor**(`address`: string): *Promise‹BigNumber›*

*Defined in [PosterRegistry.ts:96](https://github.com/ParadigmFoundation/kosu-monorepo/blob/821f0d85/packages/kosu-wrapper-enhancements/src/PosterRegistry.ts#L96)*

Reads number of tokens registered for a given address.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`address` | string | Address of user to query the bonded balance of. |

**Returns:** *Promise‹BigNumber›*

The number of tokens bonded by the supplied user's address in wei.
