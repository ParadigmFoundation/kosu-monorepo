> ## [@kosu/system-contracts](../README.md)

[Globals](../globals.md) / ["packages/kosu.js/src/PosterRegistry"](../modules/_packages_kosu_js_src_posterregistry_.md) / [PosterRegistry](_packages_kosu_js_src_posterregistry_.posterregistry.md) /

# Class: PosterRegistry

Integration with PosterRegistry contract on an Ethereum blockchain.

## Hierarchy

* **PosterRegistry**

### Index

#### Constructors

* [constructor](_packages_kosu_js_src_posterregistry_.posterregistry.md#constructor)

#### Properties

* [address](_packages_kosu_js_src_posterregistry_.posterregistry.md#private-address)
* [contract](_packages_kosu_js_src_posterregistry_.posterregistry.md#private-contract)
* [treasury](_packages_kosu_js_src_posterregistry_.posterregistry.md#private-treasury)
* [web3](_packages_kosu_js_src_posterregistry_.posterregistry.md#private-web3)
* [web3Wrapper](_packages_kosu_js_src_posterregistry_.posterregistry.md#private-web3wrapper)

#### Methods

* [getContract](_packages_kosu_js_src_posterregistry_.posterregistry.md#private-getcontract)
* [registerTokens](_packages_kosu_js_src_posterregistry_.posterregistry.md#registertokens)
* [releaseTokens](_packages_kosu_js_src_posterregistry_.posterregistry.md#releasetokens)
* [tokensContributed](_packages_kosu_js_src_posterregistry_.posterregistry.md#tokenscontributed)
* [tokensRegisteredFor](_packages_kosu_js_src_posterregistry_.posterregistry.md#tokensregisteredfor)

## Constructors

###  constructor

\+ **new PosterRegistry**(`options`: `KosuOptions`, `treasury`: [Treasury](_packages_kosu_js_src_treasury_.treasury.md)): *[PosterRegistry](_packages_kosu_js_src_posterregistry_.posterregistry.md)*

*Defined in [packages/kosu.js/src/PosterRegistry.ts:17](url)*

Create a new PosterRegistry instance.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`options` | `KosuOptions` | instantiation options |
`treasury` | [Treasury](_packages_kosu_js_src_treasury_.treasury.md) | treasury integration instance  |

**Returns:** *[PosterRegistry](_packages_kosu_js_src_posterregistry_.posterregistry.md)*

___

## Properties

### `Private` address

● **address**: *string*

*Defined in [packages/kosu.js/src/PosterRegistry.ts:17](url)*

___

### `Private` contract

● **contract**: *[PosterRegistryProxyContract](_node_modules__kosu_system_contracts_generated_wrappers_poster_registry_proxy_.posterregistryproxycontract.md)*

*Defined in [packages/kosu.js/src/PosterRegistry.ts:15](url)*

___

### `Private` treasury

● **treasury**: *[Treasury](_packages_kosu_js_src_treasury_.treasury.md)*

*Defined in [packages/kosu.js/src/PosterRegistry.ts:14](url)*

___

### `Private` web3

● **web3**: *`Web3`*

*Defined in [packages/kosu.js/src/PosterRegistry.ts:13](url)*

___

### `Private` web3Wrapper

● **web3Wrapper**: *`Web3Wrapper`*

*Defined in [packages/kosu.js/src/PosterRegistry.ts:16](url)*

___

## Methods

### `Private` getContract

▸ **getContract**(): *`Promise<PosterRegistryProxyContract>`*

*Defined in [packages/kosu.js/src/PosterRegistry.ts:37](url)*

Asynchronously initializes the contract instance or returns it from cache

**Returns:** *`Promise<PosterRegistryProxyContract>`*

The contract

___

###  registerTokens

▸ **registerTokens**(`amount`: `BigNumber`): *`Promise<TransactionReceiptWithDecodedLogs>`*

*Defined in [packages/kosu.js/src/PosterRegistry.ts:82](url)*

Registers tokens

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`amount` | `BigNumber` | uint value of tokens to register  |

**Returns:** *`Promise<TransactionReceiptWithDecodedLogs>`*

___

###  releaseTokens

▸ **releaseTokens**(`amount`: `BigNumber`): *`Promise<TransactionReceiptWithDecodedLogs>`*

*Defined in [packages/kosu.js/src/PosterRegistry.ts:112](url)*

Releases tokens

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`amount` | `BigNumber` | uint values of tokens to release  |

**Returns:** *`Promise<TransactionReceiptWithDecodedLogs>`*

___

###  tokensContributed

▸ **tokensContributed**(): *`Promise<BigNumber>`*

*Defined in [packages/kosu.js/src/PosterRegistry.ts:62](url)*

Reads total tokens contributed to registry

**Returns:** *`Promise<BigNumber>`*

___

###  tokensRegisteredFor

▸ **tokensRegisteredFor**(`address`: string): *`Promise<BigNumber>`*

*Defined in [packages/kosu.js/src/PosterRegistry.ts:72](url)*

Reads number of tokens registered for address

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`address` | string | Address of registered user  |

**Returns:** *`Promise<BigNumber>`*

___