> ## [@kosu/system-contracts](../README.md)

[Globals](../globals.md) / ["packages/kosu.js/src/Signature"](_packages_kosu_js_src_signature_.md) /

# External module: "packages/kosu.js/src/Signature"

### Index

#### Object literals

* [Signature](_packages_kosu_js_src_signature_.md#const-signature)

## Object literals

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