> **[kosu.js](README.md)**

[Globals](globals.md) /

# kosu.js

## Index

### Classes

* [EventEmitter](classes/eventemitter.md)
* [Kosu](classes/kosu.md)
* [KosuToken](classes/kosutoken.md)
* [OrderGateway](classes/ordergateway.md)
* [OrderHelper](classes/orderhelper.md)
* [PosterRegistry](classes/posterregistry.md)
* [Treasury](classes/treasury.md)
* [ValidatorRegistry](classes/validatorregistry.md)
* [Voting](classes/voting.md)

### Interfaces

* [DecodedKosuLogArgs](interfaces/decodedkosulogargs.md)
* [KosuOptions](interfaces/kosuoptions.md)
* [KosuUtils](interfaces/kosuutils.md)
* [LogWithDecodedKosuArgs](interfaces/logwithdecodedkosuargs.md)
* [Order](interfaces/order.md)
* [OrderArgument](interfaces/orderargument.md)
* [PostableOrder](interfaces/postableorder.md)
* [TakeableOrder](interfaces/takeableorder.md)

### Variables

* [NULL_ADDRESS](globals.md#const-null_address)
* [version](globals.md#const-version)

### Functions

* [_serialize](globals.md#_serialize)
* [toBytes32](globals.md#tobytes32)

### Object literals

* [KosuEndpoints](globals.md#const-kosuendpoints)
* [OrderSerializer](globals.md#const-orderserializer)
* [Signature](globals.md#const-signature)

## Variables

### `Const` NULL_ADDRESS

• **NULL_ADDRESS**: *string* = "0x0000000000000000000000000000000000000000"

*Defined in [utils.ts:12](https://github.com/ParadigmFoundation/kosu-monorepo/blob/5992fd1/packages/kosu.js/src/utils.ts#L12)*

___

### `Const` version

• **version**: *any* =  process.env.npm_package_version || require("../package.json").version

*Defined in [Kosu.ts:17](https://github.com/ParadigmFoundation/kosu-monorepo/blob/5992fd1/packages/kosu.js/src/Kosu.ts#L17)*

## Functions

###  _serialize

▸ **_serialize**(`_arguments`: any, `values`: any): *string*

*Defined in [OrderSerializer.ts:8](https://github.com/ParadigmFoundation/kosu-monorepo/blob/5992fd1/packages/kosu.js/src/OrderSerializer.ts#L8)*

**Parameters:**

Name | Type |
------ | ------ |
`_arguments` | any |
`values` | any |

**Returns:** *string*

___

###  toBytes32

▸ **toBytes32**(`value`: string): *string*

*Defined in [utils.ts:8](https://github.com/ParadigmFoundation/kosu-monorepo/blob/5992fd1/packages/kosu.js/src/utils.ts#L8)*

Convert an arbitrary string to a `bytes32` version.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`value` | string | String value to be converted into bytes32 representation.  |

**Returns:** *string*

## Object literals

### `Const` KosuEndpoints

### ▪ **KosuEndpoints**: *object*

*Defined in [EventEmitter.ts:7](https://github.com/ParadigmFoundation/kosu-monorepo/blob/5992fd1/packages/kosu.js/src/EventEmitter.ts#L7)*

▪ **1**: *object*

*Defined in [EventEmitter.ts:8](https://github.com/ParadigmFoundation/kosu-monorepo/blob/5992fd1/packages/kosu.js/src/EventEmitter.ts#L8)*

* **http**: *string* =  `https://ethnet.zaidan.io/mainnet`

* **ws**: *string* =  `wss://ethnet.zaidan.io/ws/mainnet`

▪ **3**: *object*

*Defined in [EventEmitter.ts:12](https://github.com/ParadigmFoundation/kosu-monorepo/blob/5992fd1/packages/kosu.js/src/EventEmitter.ts#L12)*

* **http**: *string* =  `https://ethnet.zaidan.io/ropsten`

* **ws**: *string* =  `wss://ethnet.zaidan.io/ws/ropsten`

▪ **42**: *object*

*Defined in [EventEmitter.ts:16](https://github.com/ParadigmFoundation/kosu-monorepo/blob/5992fd1/packages/kosu.js/src/EventEmitter.ts#L16)*

* **http**: *string* =  `https://ethnet.zaidan.io/kovan`

* **ws**: *string* =  `wss://ethnet.zaidan.io/ws/kovan`

▪ **6174**: *object*

*Defined in [EventEmitter.ts:20](https://github.com/ParadigmFoundation/kosu-monorepo/blob/5992fd1/packages/kosu.js/src/EventEmitter.ts#L20)*

* **http**: *string* =  `https://ethnet.zaidan.io/kosu`

* **ws**: *string* =  `wss://ethnet.zaidan.io/ws/kosu`

___

### `Const` OrderSerializer

### ▪ **OrderSerializer**: *object*

*Defined in [OrderSerializer.ts:42](https://github.com/ParadigmFoundation/kosu-monorepo/blob/5992fd1/packages/kosu.js/src/OrderSerializer.ts#L42)*

could add to utils (or create order-utils pacakge)

###  makerHex

▸ **makerHex**(`order`: [Order](interfaces/order.md), `_arguments`: any): *string*

*Defined in [OrderSerializer.ts:88](https://github.com/ParadigmFoundation/kosu-monorepo/blob/5992fd1/packages/kosu.js/src/OrderSerializer.ts#L88)*

Generate the maker hex from order

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`order` | [Order](interfaces/order.md) | to generate hex from |
`_arguments` | any | Argument json defined in the subContract  |

**Returns:** *string*

###  posterSignatureHex

▸ **posterSignatureHex**(`order`: [Order](interfaces/order.md), `_arguments`: any): *string*

*Defined in [OrderSerializer.ts:64](https://github.com/ParadigmFoundation/kosu-monorepo/blob/5992fd1/packages/kosu.js/src/OrderSerializer.ts#L64)*

Generates hex to be used for the poster signing process

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`order` | [Order](interfaces/order.md) | Order to get data for |
`_arguments` | any | Argument json defined in the subContract  |

**Returns:** *string*

###  recoverMaker

▸ **recoverMaker**(`order`: [Order](interfaces/order.md), `_arguments`: any[]): *string*

*Defined in [OrderSerializer.ts:109](https://github.com/ParadigmFoundation/kosu-monorepo/blob/5992fd1/packages/kosu.js/src/OrderSerializer.ts#L109)*

Recovers the maker from the signed information

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`order` | [Order](interfaces/order.md) | to recover address from |
`_arguments` | any[] | Argument json defined in the subContract  |

**Returns:** *string*

###  recoverPoster

▸ **recoverPoster**(`order`: [PostableOrder](interfaces/postableorder.md), `_arguments`: any[]): *string*

*Defined in [OrderSerializer.ts:78](https://github.com/ParadigmFoundation/kosu-monorepo/blob/5992fd1/packages/kosu.js/src/OrderSerializer.ts#L78)*

Recovers the poster from the poster signature

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`order` | [PostableOrder](interfaces/postableorder.md) | Order to recover address that signed |
`_arguments` | any[] | Argument json defined in the subContract  |

**Returns:** *string*

###  serialize

▸ **serialize**(`_arguments`: any, `order`: [Order](interfaces/order.md)): *string*

*Defined in [OrderSerializer.ts:49](https://github.com/ParadigmFoundation/kosu-monorepo/blob/5992fd1/packages/kosu.js/src/OrderSerializer.ts#L49)*

Serializes the data into bytes

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`_arguments` | any | Argument json defined in the subContract |
`order` | [Order](interfaces/order.md) | Order to serialize  |

**Returns:** *string*

___

### `Const` Signature

### ▪ **Signature**: *object*

*Defined in [Signature.ts:7](https://github.com/ParadigmFoundation/kosu-monorepo/blob/5992fd1/packages/kosu.js/src/Signature.ts#L7)*

*Defined in [types.d.ts:45](https://github.com/ParadigmFoundation/kosu-monorepo/blob/5992fd1/packages/kosu.js/src/types.d.ts#L45)*

###  generate

▸ **generate**(`web3`: `Web3`, `messageHex`: string, `signer`: string): *`Promise<string>`*

*Defined in [Signature.ts:16](https://github.com/ParadigmFoundation/kosu-monorepo/blob/5992fd1/packages/kosu.js/src/Signature.ts#L16)*

Generates a signature for a message hex using calls to a provider though web3

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`web3` | `Web3` | Web3 configured to desired provider |
`messageHex` | string | Hex representation of the message |
`signer` | string | Address to sign the message |

**Returns:** *`Promise<string>`*

A vrs signature

▸ **generate**(`web3`: `Web3`, `messageHex`: string, `signer`: string): *`Promise<string>`*

*Defined in [types.d.ts:46](https://github.com/ParadigmFoundation/kosu-monorepo/blob/5992fd1/packages/kosu.js/src/types.d.ts#L46)*

**Parameters:**

Name | Type |
------ | ------ |
`web3` | `Web3` |
`messageHex` | string |
`signer` | string |

**Returns:** *`Promise<string>`*

###  recoverAddress

▸ **recoverAddress**(`messageHex`: any, `signature`: string): *string*

*Defined in [Signature.ts:38](https://github.com/ParadigmFoundation/kosu-monorepo/blob/5992fd1/packages/kosu.js/src/Signature.ts#L38)*

Recovers address from a message hex and signature

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`messageHex` | any | Hex representation of the signed message |
`signature` | string | VRS signature  |

**Returns:** *string*

▸ **recoverAddress**(`messageHex`: any, `signature`: string): *string*

*Defined in [types.d.ts:48](https://github.com/ParadigmFoundation/kosu-monorepo/blob/5992fd1/packages/kosu.js/src/types.d.ts#L48)*

**Parameters:**

Name | Type |
------ | ------ |
`messageHex` | any |
`signature` | string |

**Returns:** *string*

###  sign

▸ **sign**(`web3`: `Web3`, `messageHex`: string, `signer`: string): *`Promise<string>`*

*Defined in [Signature.ts:56](https://github.com/ParadigmFoundation/kosu-monorepo/blob/5992fd1/packages/kosu.js/src/Signature.ts#L56)*

Sign hex with provided address

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`web3` | `Web3` | Provider which executes the signature. |
`messageHex` | string | Hex to be singed |
`signer` | string | Address to sign with.  |

**Returns:** *`Promise<string>`*

▸ **sign**(`web3`: `Web3`, `messageHex`: string, `signer`: string): *`Promise<string>`*

*Defined in [types.d.ts:49](https://github.com/ParadigmFoundation/kosu-monorepo/blob/5992fd1/packages/kosu.js/src/types.d.ts#L49)*

**Parameters:**

Name | Type |
------ | ------ |
`web3` | `Web3` |
`messageHex` | string |
`signer` | string |

**Returns:** *`Promise<string>`*

###  validate

▸ **validate**(`messageHex`: string, `signature`: string, `signer`: string): *boolean*

*Defined in [Signature.ts:28](https://github.com/ParadigmFoundation/kosu-monorepo/blob/5992fd1/packages/kosu.js/src/Signature.ts#L28)*

Validates the signature of a messageHex is from the provided signer

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`messageHex` | string | signed message hex |
`signature` | string | signature from message hex |
`signer` | string | signer who may have signed the message |

**Returns:** *boolean*

boolean representing if the signer in fact generated the signature with this message

▸ **validate**(`messageHex`: string, `signature`: string, `signer`: string): *boolean*

*Defined in [types.d.ts:47](https://github.com/ParadigmFoundation/kosu-monorepo/blob/5992fd1/packages/kosu.js/src/types.d.ts#L47)*

**Parameters:**

Name | Type |
------ | ------ |
`messageHex` | string |
`signature` | string |
`signer` | string |

**Returns:** *boolean*