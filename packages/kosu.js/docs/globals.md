> ## [kosu.js](README.md)

[Globals](globals.md) /

# kosu.js

### Index

#### Enumerations

-   [AuthorizedAddressesEvents](enums/authorizedaddressesevents.md)
-   [EventEmitterEvents](enums/eventemitterevents.md)
-   [KosuTokenEvents](enums/kosutokenevents.md)

#### Classes

-   [AuthorizedAddressesContract](classes/authorizedaddressescontract.md)
-   [EventEmitter](classes/eventemitter.md)
-   [EventEmitterContract](classes/eventemittercontract.md)
-   [Kosu](classes/kosu.md)
-   [KosuToken](classes/kosutoken.md)
-   [KosuTokenContract](classes/kosutokencontract.md)
-   [OrderGateway](classes/ordergateway.md)
-   [OrderGatewayContract](classes/ordergatewaycontract.md)
-   [OrderHelper](classes/orderhelper.md)
-   [PosterRegistry](classes/posterregistry.md)
-   [PosterRegistryContract](classes/posterregistrycontract.md)
-   [PosterRegistryProxyContract](classes/posterregistryproxycontract.md)
-   [Treasury](classes/treasury.md)
-   [TreasuryContract](classes/treasurycontract.md)
-   [ValidatorRegistry](classes/validatorregistry.md)
-   [ValidatorRegistryContract](classes/validatorregistrycontract.md)
-   [Voting](classes/voting.md)
-   [VotingContract](classes/votingcontract.md)

#### Interfaces

-   [AuthorizedAddressesOwnershipTransferredEventArgs](interfaces/authorizedaddressesownershiptransferredeventargs.md)
-   [EventEmitterKosuEventEventArgs](interfaces/eventemitterkosueventeventargs.md)
-   [KosuTokenApprovalEventArgs](interfaces/kosutokenapprovaleventargs.md)
-   [KosuTokenTransferEventArgs](interfaces/kosutokentransfereventargs.md)

#### Type aliases

-   [AuthorizedAddressesEventArgs](globals.md#authorizedaddresseseventargs)
-   [EventEmitterEventArgs](globals.md#eventemittereventargs)
-   [KosuTokenEventArgs](globals.md#kosutokeneventargs)

#### Variables

-   [DeployedAddresses](globals.md#const-deployedaddresses)
-   [NULL_ADDRESS](globals.md#const-null_address)
-   [event](globals.md#const-event)
-   [signature](globals.md#const-signature)
-   [version](globals.md#const-version)

#### Functions

-   [\_serialize](globals.md#_serialize)
-   [bytes32ToAddressString](globals.md#const-bytes32toaddressstring)
-   [bytes32ToBase64](globals.md#const-bytes32tobase64)
-   [decodeKosuEvents](globals.md#const-decodekosuevents)
-   [eventDecoder](globals.md#const-eventdecoder)
-   [listingStringifier](globals.md#const-listingstringifier)
-   [toBytes32](globals.md#tobytes32)

#### Object literals

-   [KosuEndpoints](globals.md#const-kosuendpoints)
-   [OrderSerializer](globals.md#const-orderserializer)
-   [Signature](globals.md#const-signature)
-   [artifacts](globals.md#const-artifacts)

## Type aliases

### AuthorizedAddressesEventArgs

Ƭ **AuthorizedAddressesEventArgs**: _[AuthorizedAddressesOwnershipTransferredEventArgs](interfaces/authorizedaddressesownershiptransferredeventargs.md)_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/authorized_addresses.ts:24

---

### EventEmitterEventArgs

Ƭ **EventEmitterEventArgs**: _[EventEmitterKosuEventEventArgs](interfaces/eventemitterkosueventeventargs.md)_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/event_emitter.ts:24

---

### KosuTokenEventArgs

Ƭ **KosuTokenEventArgs**: _[KosuTokenTransferEventArgs](interfaces/kosutokentransfereventargs.md) | [KosuTokenApprovalEventArgs](interfaces/kosutokenapprovaleventargs.md)_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/kosu_token.ts:24

---

## Variables

### `Const` DeployedAddresses

● **DeployedAddresses**: _object_ = deployedAddresses

Defined in node_modules/@kosu/system-contracts/src/index.ts:3

#### Type declaration:

-   ### **3**: _object_

    -   **AuthorizedAddresses**: _string_ = "0x61ed2126ea42097198e3765bd4a222266cf504a2"

    -   **EventEmitter**: _string_ = "0x454bebf74fce619bf4ed11cd6fc595f069cc1a84"

    -   **KosuToken**: _string_ = "0xa58c4175a386d332b6f41b7caa3e56aef6a1e41a"

    -   **OrderGateway**: _string_ = "0x22b85faf0c6be74b2f44590c393554e6bff22e6f"

    -   **PosterRegistry**: _string_ = "0xa4fd2746500152314d765b5b15398ad8e9346419"

    -   **PosterRegistryProxy**: _string_ = "0x3fc6db6ae1fbce3a35f8bf72dd62fb2052451c46"

    -   **Treasury**: _string_ = "0x9271b8f0dd8ee60ec4a81089a72e88e5ece571e2"

    -   **ValidatorRegistry**: _string_ = "0xb7b9f786f8372d13522c2f34da705e2ffdaa2896"

    -   **ValidatorRegistryProxy**: _string_ = "0xd18f733f67178b532a7991e3516d35048c870e51"

    -   **Voting**: _string_ = "0x9c35e3d660e0627753b0b09a6327f63512980acd"

-   ### **6174**: _object_

    -   **AuthorizedAddresses**: _string_ = "0xe473109cb41c773fd2fe01e83c6e51356f9585d6"

    -   **EventEmitter**: _string_ = "0x2f3afeff0914f33769cdfbf3fcf870c33b26c311"

    -   **KosuToken**: _string_ = "0xcc868306d6188b2b12757a7c3926042b4d3c4e29"

    -   **OrderGateway**: _string_ = "0xb8fda6341f80cbae987ab5cd00dce502097e3152"

    -   **PosterRegistry**: _string_ = "0x7e6534b8205713246e91a14b462d2dbcac3ede17"

    -   **PosterRegistryProxy**: _string_ = "0x301bb008f2a8a3cae9918743fe43428551392773"

    -   **Treasury**: _string_ = "0x46572f9082dd2429c2c138fa9483a67d4f29d423"

    -   **ValidatorRegistry**: _string_ = "0x0265e7d1b094787cb13174e18a1cefc41279a6c9"

    -   **Voting**: _string_ = "0x5d60c93d8b48682cd387c8be7e9461b67ecfbea1"

---

### `Const` NULL_ADDRESS

● **NULL_ADDRESS**: _string_ = "0x0000000000000000000000000000000000000000"

_Defined in [packages/kosu.js/src/utils.ts:12](url)_

---

### `Const` event

● **event**: _object_ = EventEmitter.compilerOutput.abi.filter(entry => entry.type === "event")[0] as {
name: string;
type: string;
inputs: Array<{ name: string; type: string }>;
}

Defined in node_modules/@kosu/system-contracts/src/eventDecoder.ts:6

#### Type declaration:

-   **inputs**: _`Array<object>`_

-   **name**: _string_

-   **type**: _string_

---

### `Const` signature

● **signature**: _string_ = soliditySha3(`${event.name}(${event.inputs.map(input => input.type).join(",")})`)

Defined in node_modules/@kosu/system-contracts/src/eventDecoder.ts:15

---

### `Const` version

● **version**: _any_ = process.env.npm_package_version || require("../package.json").version

_Defined in [packages/kosu.js/src/index.ts:17](url)_

---

## Functions

### \_serialize

▸ **\_serialize**(`_arguments`: any, `values`: any): _string_

_Defined in [packages/kosu.js/src/OrderSerializer.ts:8](url)_

**Parameters:**

| Name         | Type |
| ------------ | ---- |
| `_arguments` | any  |
| `values`     | any  |

**Returns:** _string_

---

### `Const` bytes32ToAddressString

▸ **bytes32ToAddressString**(`val`: string): _string_

Defined in node_modules/@kosu/system-contracts/src/eventDecoder.ts:17

**Parameters:**

| Name  | Type   |
| ----- | ------ |
| `val` | string |

**Returns:** _string_

---

### `Const` bytes32ToBase64

▸ **bytes32ToBase64**(`val`: string): _string_

Defined in node_modules/@kosu/system-contracts/src/eventDecoder.ts:21

**Parameters:**

| Name  | Type   |
| ----- | ------ |
| `val` | string |

**Returns:** _string_

---

### `Const` decodeKosuEvents

▸ **decodeKosuEvents**(`logs`: any): _any_

Defined in node_modules/@kosu/system-contracts/src/eventDecoder.ts:101

**Parameters:**

| Name   | Type |
| ------ | ---- |
| `logs` | any  |

**Returns:** _any_

---

### `Const` eventDecoder

▸ **eventDecoder**(`eventReturnValues`: any): _any_

Defined in node_modules/@kosu/system-contracts/src/eventDecoder.ts:25

**Parameters:**

| Name                | Type |
| ------------------- | ---- |
| `eventReturnValues` | any  |

**Returns:** _any_

---

### `Const` listingStringifier

▸ **listingStringifier**(`listing`: `Listing`): _`PrettyListing`_

Defined in node_modules/@kosu/system-contracts/src/listingStringifier.ts:1

**Parameters:**

| Name      | Type      |
| --------- | --------- |
| `listing` | `Listing` |

**Returns:** _`PrettyListing`_

---

### toBytes32

▸ **toBytes32**(`value`: string): _string_

_Defined in [packages/kosu.js/src/utils.ts:8](url)_

Convert an arbitrary string to a `bytes32` version.

**Parameters:**

| Name    | Type   | Description                                               |
| ------- | ------ | --------------------------------------------------------- |
| `value` | string | String value to be converted into bytes32 representation. |

**Returns:** _string_

---

## Object literals

### `Const` KosuEndpoints

### ■ **KosuEndpoints**: _object_

_Defined in [packages/kosu.js/src/EventEmitter.ts:7](url)_

■ **1**: _object_

_Defined in [packages/kosu.js/src/EventEmitter.ts:8](url)_

-   **http**: _string_ = `https://ethnet.zaidan.io/mainnet`

-   **ws**: _string_ = `wss://ethnet.zaidan.io/ws/mainnet`

■ **3**: _object_

_Defined in [packages/kosu.js/src/EventEmitter.ts:12](url)_

-   **http**: _string_ = `https://ethnet.zaidan.io/ropsten`

-   **ws**: _string_ = `wss://ethnet.zaidan.io/ws/ropsten`

■ **42**: _object_

_Defined in [packages/kosu.js/src/EventEmitter.ts:16](url)_

-   **http**: _string_ = `https://ethnet.zaidan.io/kovan`

-   **ws**: _string_ = `wss://ethnet.zaidan.io/ws/kovan`

---

### `Const` OrderSerializer

### ■ **OrderSerializer**: _object_

_Defined in [packages/kosu.js/src/OrderSerializer.ts:42](url)_

could add to utils (or create order-utils pacakge)

### makerHex

▸ **makerHex**(`order`: `Order`, `_arguments`: any): _string_

_Defined in [packages/kosu.js/src/OrderSerializer.ts:84](url)_

Generate the maker hex from order

**Parameters:**

| Name         | Type    | Description                              |
| ------------ | ------- | ---------------------------------------- |
| `order`      | `Order` | to generate hex from                     |
| `_arguments` | any     | Argument json defined in the subContract |

**Returns:** _string_

### posterSignatureHex

▸ **posterSignatureHex**(`order`: `Order`, `_arguments`: any): _string_

_Defined in [packages/kosu.js/src/OrderSerializer.ts:64](url)_

Generates hex to be used for the poster signing process

**Parameters:**

| Name         | Type    | Description                              |
| ------------ | ------- | ---------------------------------------- |
| `order`      | `Order` | Order to get data for                    |
| `_arguments` | any     | Argument json defined in the subContract |

**Returns:** _string_

### recoverMaker

▸ **recoverMaker**(`order`: `Order`, `_arguments`: any[]): _string_

_Defined in [packages/kosu.js/src/OrderSerializer.ts:105](url)_

Recovers the maker from the signed information

**Parameters:**

| Name         | Type    | Description                              |
| ------------ | ------- | ---------------------------------------- |
| `order`      | `Order` | to recover address from                  |
| `_arguments` | any[]   | Argument json defined in the subContract |

**Returns:** _string_

### recoverPoster

▸ **recoverPoster**(`order`: `PostableOrder`, `_arguments`: any[]): _string_

_Defined in [packages/kosu.js/src/OrderSerializer.ts:74](url)_

Recovers the poster from the poster signature

**Parameters:**

| Name         | Type            | Description                              |
| ------------ | --------------- | ---------------------------------------- |
| `order`      | `PostableOrder` | Order to recover address that signed     |
| `_arguments` | any[]           | Argument json defined in the subContract |

**Returns:** _string_

### serialize

▸ **serialize**(`_arguments`: any, `order`: `Order`): _string_

_Defined in [packages/kosu.js/src/OrderSerializer.ts:49](url)_

Serializes the data into bytes

**Parameters:**

| Name         | Type    | Description                              |
| ------------ | ------- | ---------------------------------------- |
| `_arguments` | any     | Argument json defined in the subContract |
| `order`      | `Order` | Order to serialize                       |

**Returns:** _string_

---

### `Const` Signature

### ■ **Signature**: _object_

_Defined in [packages/kosu.js/src/Signature.ts:7](url)_

### generate

▸ **generate**(`web3`: `Web3`, `messageHex`: string, `signer`: string): _`Promise<string>`_

_Defined in [packages/kosu.js/src/Signature.ts:16](url)_

Generates a signature for a message hex using calls to a provider though web3

**Parameters:**

| Name         | Type   | Description                         |
| ------------ | ------ | ----------------------------------- |
| `web3`       | `Web3` | Web3 configured to desired provider |
| `messageHex` | string | Hex representation of the message   |
| `signer`     | string | Address to sign the message         |

**Returns:** _`Promise<string>`_

A vrs signature

### recoverAddress

▸ **recoverAddress**(`messageHex`: any, `signature`: string): _string_

_Defined in [packages/kosu.js/src/Signature.ts:38](url)_

Recovers address from a message hex and signature

**Parameters:**

| Name         | Type   | Description                              |
| ------------ | ------ | ---------------------------------------- |
| `messageHex` | any    | Hex representation of the signed message |
| `signature`  | string | VRS signature                            |

**Returns:** _string_

### sign

▸ **sign**(`web3`: `Web3`, `messageHex`: string, `signer`: string): _`Promise<string>`_

_Defined in [packages/kosu.js/src/Signature.ts:56](url)_

Sign hex with provided address

**Parameters:**

| Name         | Type   | Description                            |
| ------------ | ------ | -------------------------------------- |
| `web3`       | `Web3` | Provider which executes the signature. |
| `messageHex` | string | Hex to be singed                       |
| `signer`     | string | Address to sign with.                  |

**Returns:** _`Promise<string>`_

### validate

▸ **validate**(`messageHex`: string, `signature`: string, `signer`: string): _boolean_

_Defined in [packages/kosu.js/src/Signature.ts:28](url)_

Validates the signature of a messageHex is from the provided signer

**Parameters:**

| Name         | Type   | Description                            |
| ------------ | ------ | -------------------------------------- |
| `messageHex` | string | signed message hex                     |
| `signature`  | string | signature from message hex             |
| `signer`     | string | signer who may have signed the message |

**Returns:** _boolean_

boolean representing if the signer in fact generated the signature with this message

---

### `Const` artifacts

### ■ **artifacts**: _object_

Defined in node_modules/@kosu/system-contracts/src/artifacts.ts:18

### AuthorizedAddresses

● **AuthorizedAddresses**: _`ContractArtifact`_ = AuthorizedAddresses as ContractArtifact

Defined in node_modules/@kosu/system-contracts/src/artifacts.ts:19

### BasicTradeSubContract

● **BasicTradeSubContract**: _`ContractArtifact`_ = BasicTradeSubContract as ContractArtifact

Defined in node_modules/@kosu/system-contracts/src/artifacts.ts:28

### EventEmitter

● **EventEmitter**: _`ContractArtifact`_ = EventEmitter as ContractArtifact

Defined in node_modules/@kosu/system-contracts/src/artifacts.ts:20

### KosuToken

● **KosuToken**: _`ContractArtifact`_ = KosuToken as ContractArtifact

Defined in node_modules/@kosu/system-contracts/src/artifacts.ts:23

### OrderGateway

● **OrderGateway**: _`ContractArtifact`_ = OrderGateway as ContractArtifact

Defined in node_modules/@kosu/system-contracts/src/artifacts.ts:21

### PosterRegistry

● **PosterRegistry**: _`ContractArtifact`_ = PosterRegistry as ContractArtifact

Defined in node_modules/@kosu/system-contracts/src/artifacts.ts:24

### PosterRegistryProxy

● **PosterRegistryProxy**: _`ContractArtifact`_ = PosterRegistryProxy as ContractArtifact

Defined in node_modules/@kosu/system-contracts/src/artifacts.ts:22

### Treasury

● **Treasury**: _`ContractArtifact`_ = Treasury as ContractArtifact

Defined in node_modules/@kosu/system-contracts/src/artifacts.ts:25

### ValidatorRegistry

● **ValidatorRegistry**: _`ContractArtifact`_ = ValidatorRegistry as ContractArtifact

Defined in node_modules/@kosu/system-contracts/src/artifacts.ts:26

### Voting

● **Voting**: _`ContractArtifact`_ = Voting as ContractArtifact

Defined in node_modules/@kosu/system-contracts/src/artifacts.ts:27

---
