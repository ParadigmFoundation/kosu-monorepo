> **[contract-helpers](README.md)**

[Globals](globals.md) /

# contract-helpers

## Index

### Classes

-   [EventEmitter](classes/eventemitter.md)
-   [Kosu](classes/kosu.md)
-   [KosuToken](classes/kosutoken.md)
-   [OrderGateway](classes/ordergateway.md)
-   [OrderHelper](classes/orderhelper.md)
-   [PosterRegistry](classes/posterregistry.md)
-   [Treasury](classes/treasury.md)
-   [ValidatorRegistry](classes/validatorregistry.md)
-   [Voting](classes/voting.md)

### Variables

-   [version](globals.md#const-version)

### Functions

-   [\_serialize](globals.md#_serialize)

### Object literals

-   [KosuEndpoints](globals.md#const-kosuendpoints)
-   [OrderSerializer](globals.md#const-orderserializer)
-   [Signature](globals.md#const-signature)

## Variables

### `Const` version

• **version**: _any_ = process.env.npm_package_version || require("../package.json").version

_Defined in [Kosu.ts:18](https://github.com/ParadigmFoundation/kosu-monorepo/blob/515d6d59/packages/kosu-contract-helpers/src/Kosu.ts#L18)_

## Functions

### \_serialize

▸ **\_serialize**(`_arguments`: any, `values`: any): _string_

_Defined in [OrderSerializer.ts:9](https://github.com/ParadigmFoundation/kosu-monorepo/blob/515d6d59/packages/kosu-contract-helpers/src/OrderSerializer.ts#L9)_

**Parameters:**

| Name         | Type |
| ------------ | ---- |
| `_arguments` | any  |
| `values`     | any  |

**Returns:** _string_

## Object literals

### `Const` KosuEndpoints

### ▪ **KosuEndpoints**: _object_

_Defined in [EventEmitter.ts:9](https://github.com/ParadigmFoundation/kosu-monorepo/blob/515d6d59/packages/kosu-contract-helpers/src/EventEmitter.ts#L9)_

▪ **1**: _object_

_Defined in [EventEmitter.ts:10](https://github.com/ParadigmFoundation/kosu-monorepo/blob/515d6d59/packages/kosu-contract-helpers/src/EventEmitter.ts#L10)_

-   **http**: _string_ = `https://ethnet.zaidan.io/mainnet`

-   **ws**: _string_ = `wss://ethnet.zaidan.io/ws/mainnet`

▪ **3**: _object_

_Defined in [EventEmitter.ts:14](https://github.com/ParadigmFoundation/kosu-monorepo/blob/515d6d59/packages/kosu-contract-helpers/src/EventEmitter.ts#L14)_

-   **http**: _string_ = `https://ethnet.zaidan.io/ropsten`

-   **ws**: _string_ = `wss://ethnet.zaidan.io/ws/ropsten`

▪ **42**: _object_

_Defined in [EventEmitter.ts:18](https://github.com/ParadigmFoundation/kosu-monorepo/blob/515d6d59/packages/kosu-contract-helpers/src/EventEmitter.ts#L18)_

-   **http**: _string_ = `https://ethnet.zaidan.io/kovan`

-   **ws**: _string_ = `wss://ethnet.zaidan.io/ws/kovan`

▪ **6174**: _object_

_Defined in [EventEmitter.ts:22](https://github.com/ParadigmFoundation/kosu-monorepo/blob/515d6d59/packages/kosu-contract-helpers/src/EventEmitter.ts#L22)_

-   **http**: _string_ = `https://ethnet.zaidan.io/kosu`

-   **ws**: _string_ = `wss://ethnet.zaidan.io/ws/kosu`

---

### `Const` OrderSerializer

### ▪ **OrderSerializer**: _object_

_Defined in [OrderSerializer.ts:52](https://github.com/ParadigmFoundation/kosu-monorepo/blob/515d6d59/packages/kosu-contract-helpers/src/OrderSerializer.ts#L52)_

could add to utils (or create order-utils pacakge)

### makerHex

▸ **makerHex**(`order`: `Order`, `_arguments`: any): _string_

_Defined in [OrderSerializer.ts:98](https://github.com/ParadigmFoundation/kosu-monorepo/blob/515d6d59/packages/kosu-contract-helpers/src/OrderSerializer.ts#L98)_

Generate the maker hex from order

**Parameters:**

| Name         | Type    | Description                              |
| ------------ | ------- | ---------------------------------------- |
| `order`      | `Order` | to generate hex from                     |
| `_arguments` | any     | Argument json defined in the subContract |

**Returns:** _string_

### posterSignatureHex

▸ **posterSignatureHex**(`order`: `Order`, `_arguments`: any): _string_

_Defined in [OrderSerializer.ts:74](https://github.com/ParadigmFoundation/kosu-monorepo/blob/515d6d59/packages/kosu-contract-helpers/src/OrderSerializer.ts#L74)_

Generates hex to be used for the poster signing process

**Parameters:**

| Name         | Type    | Description                              |
| ------------ | ------- | ---------------------------------------- |
| `order`      | `Order` | Order to get data for                    |
| `_arguments` | any     | Argument json defined in the subContract |

**Returns:** _string_

### recoverMaker

▸ **recoverMaker**(`order`: `Order`, `_arguments`: any[]): _string_

_Defined in [OrderSerializer.ts:126](https://github.com/ParadigmFoundation/kosu-monorepo/blob/515d6d59/packages/kosu-contract-helpers/src/OrderSerializer.ts#L126)_

Recovers the maker from the signed information

**Parameters:**

| Name         | Type    | Description                              |
| ------------ | ------- | ---------------------------------------- |
| `order`      | `Order` | to recover address from                  |
| `_arguments` | any[]   | Argument json defined in the subContract |

**Returns:** _string_

### recoverPoster

▸ **recoverPoster**(`order`: `PostableOrder`, `_arguments`: any[]): _string_

_Defined in [OrderSerializer.ts:88](https://github.com/ParadigmFoundation/kosu-monorepo/blob/515d6d59/packages/kosu-contract-helpers/src/OrderSerializer.ts#L88)_

Recovers the poster from the poster signature

**Parameters:**

| Name         | Type            | Description                              |
| ------------ | --------------- | ---------------------------------------- |
| `order`      | `PostableOrder` | Order to recover address that signed     |
| `_arguments` | any[]           | Argument json defined in the subContract |

**Returns:** _string_

### serialize

▸ **serialize**(`_arguments`: any, `order`: `Order`): _string_

_Defined in [OrderSerializer.ts:59](https://github.com/ParadigmFoundation/kosu-monorepo/blob/515d6d59/packages/kosu-contract-helpers/src/OrderSerializer.ts#L59)_

Serializes the data into bytes

**Parameters:**

| Name         | Type    | Description                              |
| ------------ | ------- | ---------------------------------------- |
| `_arguments` | any     | Argument json defined in the subContract |
| `order`      | `Order` | Order to serialize                       |

**Returns:** _string_

---

### `Const` Signature

### ▪ **Signature**: _object_

_Defined in [Signature.ts:6](https://github.com/ParadigmFoundation/kosu-monorepo/blob/515d6d59/packages/kosu-contract-helpers/src/Signature.ts#L6)_

### generate

▸ **generate**(`web3`: `Web3`, `messageHex`: string, `signer`: string): _`Promise<string>`_

_Defined in [Signature.ts:15](https://github.com/ParadigmFoundation/kosu-monorepo/blob/515d6d59/packages/kosu-contract-helpers/src/Signature.ts#L15)_

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

_Defined in [Signature.ts:37](https://github.com/ParadigmFoundation/kosu-monorepo/blob/515d6d59/packages/kosu-contract-helpers/src/Signature.ts#L37)_

Recovers address from a message hex and signature

**Parameters:**

| Name         | Type   | Description                              |
| ------------ | ------ | ---------------------------------------- |
| `messageHex` | any    | Hex representation of the signed message |
| `signature`  | string | VRS signature                            |

**Returns:** _string_

### sign

▸ **sign**(`web3`: `Web3`, `messageHex`: string, `signer`: string): _`Promise<string>`_

_Defined in [Signature.ts:55](https://github.com/ParadigmFoundation/kosu-monorepo/blob/515d6d59/packages/kosu-contract-helpers/src/Signature.ts#L55)_

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

_Defined in [Signature.ts:27](https://github.com/ParadigmFoundation/kosu-monorepo/blob/515d6d59/packages/kosu-contract-helpers/src/Signature.ts#L27)_

Validates the signature of a messageHex is from the provided signer

**Parameters:**

| Name         | Type   | Description                            |
| ------------ | ------ | -------------------------------------- |
| `messageHex` | string | signed message hex                     |
| `signature`  | string | signature from message hex             |
| `signer`     | string | signer who may have signed the message |

**Returns:** _boolean_

boolean representing if the signer in fact generated the signature with this message
