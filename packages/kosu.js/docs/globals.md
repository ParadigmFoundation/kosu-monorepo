> ## [kosu.js](README.md)

[Globals](globals.md) /

# kosu.js

### Index

#### Enumerations

* [AuthorizedAddressesEvents](enums/authorizedaddressesevents.md)
* [EventEmitterEvents](enums/eventemitterevents.md)
* [KosuTokenEvents](enums/kosutokenevents.md)

#### Classes

* [AuthorizedAddressesContract](classes/authorizedaddressescontract.md)
* [EventEmitter](classes/eventemitter.md)
* [EventEmitterContract](classes/eventemittercontract.md)
* [Kosu](classes/kosu.md)
* [KosuToken](classes/kosutoken.md)
* [KosuTokenContract](classes/kosutokencontract.md)
* [OrderGateway](classes/ordergateway.md)
* [OrderGatewayContract](classes/ordergatewaycontract.md)
* [OrderHelper](classes/orderhelper.md)
* [PosterRegistry](classes/posterregistry.md)
* [PosterRegistryContract](classes/posterregistrycontract.md)
* [PosterRegistryProxyContract](classes/posterregistryproxycontract.md)
* [Treasury](classes/treasury.md)
* [TreasuryContract](classes/treasurycontract.md)
* [ValidatorRegistry](classes/validatorregistry.md)
* [ValidatorRegistryContract](classes/validatorregistrycontract.md)
* [Voting](classes/voting.md)
* [VotingContract](classes/votingcontract.md)

#### Interfaces

* [AuthorizedAddressesOwnershipTransferredEventArgs](interfaces/authorizedaddressesownershiptransferredeventargs.md)
* [EventEmitterKosuEventEventArgs](interfaces/eventemitterkosueventeventargs.md)
* [KosuTokenApprovalEventArgs](interfaces/kosutokenapprovaleventargs.md)
* [KosuTokenTransferEventArgs](interfaces/kosutokentransfereventargs.md)

#### Type aliases

* [AuthorizedAddressesEventArgs](globals.md#authorizedaddresseseventargs)
* [EventEmitterEventArgs](globals.md#eventemittereventargs)
* [KosuTokenEventArgs](globals.md#kosutokeneventargs)

#### Variables

* [DeployedAddresses](globals.md#const-deployedaddresses)
* [NULL_ADDRESS](globals.md#const-null_address)
* [event](globals.md#const-event)
* [signature](globals.md#const-signature)
* [version](globals.md#const-version)

#### Functions

* [_serialize](globals.md#_serialize)
* [bytes32ToAddressString](globals.md#const-bytes32toaddressstring)
* [bytes32ToBase64](globals.md#const-bytes32tobase64)
* [decodeKosuEvents](globals.md#const-decodekosuevents)
* [eventDecoder](globals.md#const-eventdecoder)
* [listingStringifier](globals.md#const-listingstringifier)
* [toBytes32](globals.md#tobytes32)

#### Object literals

* [KosuEndpoints](globals.md#const-kosuendpoints)
* [OrderSerializer](globals.md#const-orderserializer)
* [Signature](globals.md#const-signature)
* [artifacts](globals.md#const-artifacts)

## Type aliases

###  AuthorizedAddressesEventArgs

Ƭ **AuthorizedAddressesEventArgs**: *[AuthorizedAddressesOwnershipTransferredEventArgs](interfaces/authorizedaddressesownershiptransferredeventargs.md)*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/authorized_addresses.ts:24

___

###  EventEmitterEventArgs

Ƭ **EventEmitterEventArgs**: *[EventEmitterKosuEventEventArgs](interfaces/eventemitterkosueventeventargs.md)*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/event_emitter.ts:24

___

###  KosuTokenEventArgs

Ƭ **KosuTokenEventArgs**: *[KosuTokenTransferEventArgs](interfaces/kosutokentransfereventargs.md) | [KosuTokenApprovalEventArgs](interfaces/kosutokenapprovaleventargs.md)*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/kosu_token.ts:24

___

## Variables

### `Const` DeployedAddresses

● **DeployedAddresses**: *object* =  deployedAddresses

Defined in node_modules/@kosu/system-contracts/src/index.ts:3

#### Type declaration:

* ### **3**: *object*

  * **AuthorizedAddresses**: *string* = "0x61ed2126ea42097198e3765bd4a222266cf504a2"

  * **EventEmitter**: *string* = "0x454bebf74fce619bf4ed11cd6fc595f069cc1a84"

  * **KosuToken**: *string* = "0xa58c4175a386d332b6f41b7caa3e56aef6a1e41a"

  * **OrderGateway**: *string* = "0x22b85faf0c6be74b2f44590c393554e6bff22e6f"

  * **PosterRegistry**: *string* = "0xa4fd2746500152314d765b5b15398ad8e9346419"

  * **PosterRegistryProxy**: *string* = "0x3fc6db6ae1fbce3a35f8bf72dd62fb2052451c46"

  * **Treasury**: *string* = "0x9271b8f0dd8ee60ec4a81089a72e88e5ece571e2"

  * **ValidatorRegistry**: *string* = "0xb7b9f786f8372d13522c2f34da705e2ffdaa2896"

  * **ValidatorRegistryProxy**: *string* = "0xd18f733f67178b532a7991e3516d35048c870e51"

  * **Voting**: *string* = "0x9c35e3d660e0627753b0b09a6327f63512980acd"

* ### **6174**: *object*

  * **AuthorizedAddresses**: *string* = "0xe473109cb41c773fd2fe01e83c6e51356f9585d6"

  * **EventEmitter**: *string* = "0x2f3afeff0914f33769cdfbf3fcf870c33b26c311"

  * **KosuToken**: *string* = "0xcc868306d6188b2b12757a7c3926042b4d3c4e29"

  * **OrderGateway**: *string* = "0xb8fda6341f80cbae987ab5cd00dce502097e3152"

  * **PosterRegistry**: *string* = "0x7e6534b8205713246e91a14b462d2dbcac3ede17"

  * **PosterRegistryProxy**: *string* = "0x301bb008f2a8a3cae9918743fe43428551392773"

  * **Treasury**: *string* = "0x46572f9082dd2429c2c138fa9483a67d4f29d423"

  * **ValidatorRegistry**: *string* = "0x0265e7d1b094787cb13174e18a1cefc41279a6c9"

  * **Voting**: *string* = "0x5d60c93d8b48682cd387c8be7e9461b67ecfbea1"

___

### `Const` NULL_ADDRESS

● **NULL_ADDRESS**: *string* = "0x0000000000000000000000000000000000000000"

*Defined in [packages/kosu.js/src/utils.ts:12](url)*

___

### `Const` event

● **event**: *object* =  EventEmitter.compilerOutput.abi.filter(entry => entry.type === "event")[0] as {
name: string;
type: string;
inputs: Array<{ name: string; type: string }>;
}

Defined in node_modules/@kosu/system-contracts/src/eventDecoder.ts:6

#### Type declaration:

* **inputs**: *`Array<object>`*

* **name**: *string*

* **type**: *string*

___

### `Const` signature

● **signature**: *string* =  soliditySha3(`${event.name}(${event.inputs.map(input => input.type).join(",")})`)

Defined in node_modules/@kosu/system-contracts/src/eventDecoder.ts:15

___

### `Const` version

● **version**: *any* =  process.env.npm_package_version || require("../package.json").version

*Defined in [packages/kosu.js/src/index.ts:17](url)*

___

## Functions

###  _serialize

▸ **_serialize**(`_arguments`: any, `values`: any): *string*

*Defined in [packages/kosu.js/src/OrderSerializer.ts:8](url)*

**Parameters:**

Name | Type |
------ | ------ |
`_arguments` | any |
`values` | any |

**Returns:** *string*

___

### `Const` bytes32ToAddressString

▸ **bytes32ToAddressString**(`val`: string): *string*

Defined in node_modules/@kosu/system-contracts/src/eventDecoder.ts:17

**Parameters:**

Name | Type |
------ | ------ |
`val` | string |

**Returns:** *string*

___

### `Const` bytes32ToBase64

▸ **bytes32ToBase64**(`val`: string): *string*

Defined in node_modules/@kosu/system-contracts/src/eventDecoder.ts:21

**Parameters:**

Name | Type |
------ | ------ |
`val` | string |

**Returns:** *string*

___

### `Const` decodeKosuEvents

▸ **decodeKosuEvents**(`logs`: any): *any*

Defined in node_modules/@kosu/system-contracts/src/eventDecoder.ts:101

**Parameters:**

Name | Type |
------ | ------ |
`logs` | any |

**Returns:** *any*

___

### `Const` eventDecoder

▸ **eventDecoder**(`eventReturnValues`: any): *any*

Defined in node_modules/@kosu/system-contracts/src/eventDecoder.ts:25

**Parameters:**

Name | Type |
------ | ------ |
`eventReturnValues` | any |

**Returns:** *any*

___

### `Const` listingStringifier

▸ **listingStringifier**(`listing`: `Listing`): *`PrettyListing`*

Defined in node_modules/@kosu/system-contracts/src/listingStringifier.ts:1

**Parameters:**

Name | Type |
------ | ------ |
`listing` | `Listing` |

**Returns:** *`PrettyListing`*

___

###  toBytes32

▸ **toBytes32**(`value`: string): *string*

*Defined in [packages/kosu.js/src/utils.ts:8](url)*

Convert an arbitrary string to a `bytes32` version.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`value` | string | String value to be converted into bytes32 representation.  |

**Returns:** *string*

___

## Object literals

### `Const` KosuEndpoints

### ■ **KosuEndpoints**: *object*

*Defined in [packages/kosu.js/src/EventEmitter.ts:7](url)*

■ **1**: *object*

*Defined in [packages/kosu.js/src/EventEmitter.ts:8](url)*

* **http**: *string* =  `https://ethnet.zaidan.io/mainnet`

* **ws**: *string* =  `wss://ethnet.zaidan.io/ws/mainnet`

■ **3**: *object*

*Defined in [packages/kosu.js/src/EventEmitter.ts:12](url)*

* **http**: *string* =  `https://ethnet.zaidan.io/ropsten`

* **ws**: *string* =  `wss://ethnet.zaidan.io/ws/ropsten`

■ **42**: *object*

*Defined in [packages/kosu.js/src/EventEmitter.ts:16](url)*

* **http**: *string* =  `https://ethnet.zaidan.io/kovan`

* **ws**: *string* =  `wss://ethnet.zaidan.io/ws/kovan`

___

### `Const` OrderSerializer

### ■ **OrderSerializer**: *object*

*Defined in [packages/kosu.js/src/OrderSerializer.ts:42](url)*

could add to utils (or create order-utils pacakge)

###  makerHex

▸ **makerHex**(`order`: `Order`, `_arguments`: any): *string*

*Defined in [packages/kosu.js/src/OrderSerializer.ts:84](url)*

Generate the maker hex from order

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`order` | `Order` | to generate hex from |
`_arguments` | any | Argument json defined in the subContract  |

**Returns:** *string*

###  posterSignatureHex

▸ **posterSignatureHex**(`order`: `Order`, `_arguments`: any): *string*

*Defined in [packages/kosu.js/src/OrderSerializer.ts:64](url)*

Generates hex to be used for the poster signing process

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`order` | `Order` | Order to get data for |
`_arguments` | any | Argument json defined in the subContract  |

**Returns:** *string*

###  recoverMaker

▸ **recoverMaker**(`order`: `Order`, `_arguments`: any[]): *string*

*Defined in [packages/kosu.js/src/OrderSerializer.ts:105](url)*

Recovers the maker from the signed information

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`order` | `Order` | to recover address from |
`_arguments` | any[] | Argument json defined in the subContract  |

**Returns:** *string*

###  recoverPoster

▸ **recoverPoster**(`order`: `PostableOrder`, `_arguments`: any[]): *string*

*Defined in [packages/kosu.js/src/OrderSerializer.ts:74](url)*

Recovers the poster from the poster signature

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`order` | `PostableOrder` | Order to recover address that signed |
`_arguments` | any[] | Argument json defined in the subContract  |

**Returns:** *string*

###  serialize

▸ **serialize**(`_arguments`: any, `order`: `Order`): *string*

*Defined in [packages/kosu.js/src/OrderSerializer.ts:49](url)*

Serializes the data into bytes

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`_arguments` | any | Argument json defined in the subContract |
`order` | `Order` | Order to serialize  |

**Returns:** *string*

___

### `Const` Signature

### ■ **Signature**: *object*

*Defined in [packages/kosu.js/src/Signature.ts:7](url)*

###  generate

▸ **generate**(`web3`: `Web3`, `messageHex`: string, `signer`: string): *`Promise<string>`*

*Defined in [packages/kosu.js/src/Signature.ts:16](url)*

Generates a signature for a message hex using calls to a provider though web3

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`web3` | `Web3` | Web3 configured to desired provider |
`messageHex` | string | Hex representation of the message |
`signer` | string | Address to sign the message |

**Returns:** *`Promise<string>`*

A vrs signature

###  recoverAddress

▸ **recoverAddress**(`messageHex`: any, `signature`: string): *string*

*Defined in [packages/kosu.js/src/Signature.ts:38](url)*

Recovers address from a message hex and signature

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`messageHex` | any | Hex representation of the signed message |
`signature` | string | VRS signature  |

**Returns:** *string*

###  sign

▸ **sign**(`web3`: `Web3`, `messageHex`: string, `signer`: string): *`Promise<string>`*

*Defined in [packages/kosu.js/src/Signature.ts:56](url)*

Sign hex with provided address

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`web3` | `Web3` | Provider which executes the signature. |
`messageHex` | string | Hex to be singed |
`signer` | string | Address to sign with.  |

**Returns:** *`Promise<string>`*

###  validate

▸ **validate**(`messageHex`: string, `signature`: string, `signer`: string): *boolean*

*Defined in [packages/kosu.js/src/Signature.ts:28](url)*

Validates the signature of a messageHex is from the provided signer

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`messageHex` | string | signed message hex |
`signature` | string | signature from message hex |
`signer` | string | signer who may have signed the message |

**Returns:** *boolean*

boolean representing if the signer in fact generated the signature with this message

___

### `Const` artifacts

### ■ **artifacts**: *object*

Defined in node_modules/@kosu/system-contracts/src/artifacts.ts:18

###  AuthorizedAddresses

● **AuthorizedAddresses**: *`ContractArtifact`* =  AuthorizedAddresses as ContractArtifact

Defined in node_modules/@kosu/system-contracts/src/artifacts.ts:19

###  BasicTradeSubContract

● **BasicTradeSubContract**: *`ContractArtifact`* =  BasicTradeSubContract as ContractArtifact

Defined in node_modules/@kosu/system-contracts/src/artifacts.ts:28

###  EventEmitter

● **EventEmitter**: *`ContractArtifact`* =  EventEmitter as ContractArtifact

Defined in node_modules/@kosu/system-contracts/src/artifacts.ts:20

###  KosuToken

● **KosuToken**: *`ContractArtifact`* =  KosuToken as ContractArtifact

Defined in node_modules/@kosu/system-contracts/src/artifacts.ts:23

###  OrderGateway

● **OrderGateway**: *`ContractArtifact`* =  OrderGateway as ContractArtifact

Defined in node_modules/@kosu/system-contracts/src/artifacts.ts:21

###  PosterRegistry

● **PosterRegistry**: *`ContractArtifact`* =  PosterRegistry as ContractArtifact

Defined in node_modules/@kosu/system-contracts/src/artifacts.ts:24

###  PosterRegistryProxy

● **PosterRegistryProxy**: *`ContractArtifact`* =  PosterRegistryProxy as ContractArtifact

Defined in node_modules/@kosu/system-contracts/src/artifacts.ts:22

###  Treasury

● **Treasury**: *`ContractArtifact`* =  Treasury as ContractArtifact

Defined in node_modules/@kosu/system-contracts/src/artifacts.ts:25

###  ValidatorRegistry

● **ValidatorRegistry**: *`ContractArtifact`* =  ValidatorRegistry as ContractArtifact

Defined in node_modules/@kosu/system-contracts/src/artifacts.ts:26

###  Voting

● **Voting**: *`ContractArtifact`* =  Voting as ContractArtifact

Defined in node_modules/@kosu/system-contracts/src/artifacts.ts:27

___