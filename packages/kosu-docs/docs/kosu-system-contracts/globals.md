> ## [kosu-system-contracts](README.md)

[Globals](globals.md) /

# kosu-system-contracts

### Index

#### Variables

* [DeployedAddresses](globals.md#const-deployedaddresses)
* [args](globals.md#const-args)
* [event](globals.md#const-event)
* [mnemonic](globals.md#let-mnemonic)
* [signature](globals.md#const-signature)

#### Functions

* [bytes32ToAddressString](globals.md#const-bytes32toaddressstring)
* [bytes32ToBase64](globals.md#const-bytes32tobase64)
* [decodeKosuEvents](globals.md#const-decodekosuevents)
* [eventDecoder](globals.md#const-eventdecoder)
* [listingStringifier](globals.md#const-listingstringifier)
* [migrations](globals.md#migrations)

#### Object literals

* [artifacts](globals.md#const-artifacts)

## Variables

### `Const` DeployedAddresses

● **DeployedAddresses**: *object* =  deployedAddresses

Defined in index.ts:3

#### Type declaration:

* ### **3**: *object*

  * **AuthorizedAddresses**: *string* = "0x773f0872e803df8be6039c63a77d52022906bd06"

  * **EventEmitter**: *string* = "0x90acff67b832afdfd7938a0bc1192dc08f6c742e"

  * **KosuToken**: *string* = "0x800f612a35f5c2ee8de26ff9983cb74ba6c929a4"

  * **OrderGateway**: *string* = "0x10772c057491d2f11f6ed3b116d7dc3cc8135e24"

  * **PosterRegistry**: *string* = "0xc21dbbef83ffd0f3c337a6666c7663f8e1b77798"

  * **PosterRegistryProxy**: *string* = "0x8c581ed507a7c843026cf04ca213542b77a4a397"

  * **Treasury**: *string* = "0xf7377157c181ca45944924444cc8ec48322602dc"

  * **ValidatorRegistry**: *string* = "0xff74dda760854c3639c6f728aa4179b8b000f322"

  * **Voting**: *string* = "0xc0ba1ab8781c234c4b04061bb6411680412cc2ad"

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

### `Const` args

● **args**: *`Arguments`* =  yargs
.option("rpc-url", {
type: "string",
default: "http://localhost:8545",
})
.boolean("test-mnemonic").argv

Defined in bin/deliver_tokens.ts:10

Defined in bin/migrate.ts:15

___

### `Const` event

● **event**: *object* =  EventEmitter.compilerOutput.abi.filter(entry => entry.type === "event")[0] as {
name: string;
type: string;
inputs: Array<{ name: string; type: string }>;
}

Defined in eventDecoder.ts:6

#### Type declaration:

* **inputs**: *`Array<object>`*

* **name**: *string*

* **type**: *string*

___

### `Let` mnemonic

● **mnemonic**: *any* =  safeRequire("./mnemonic.json")

Defined in bin/deliver_tokens.ts:16

Defined in bin/migrate.ts:22

___

### `Const` signature

● **signature**: *string* =  soliditySha3(`${event.name}(${event.inputs.map(input => input.type).join(",")})`)

Defined in eventDecoder.ts:15

___

## Functions

### `Const` bytes32ToAddressString

▸ **bytes32ToAddressString**(`val`: string): *string*

Defined in eventDecoder.ts:17

**Parameters:**

Name | Type |
------ | ------ |
`val` | string |

**Returns:** *string*

___

### `Const` bytes32ToBase64

▸ **bytes32ToBase64**(`val`: string): *string*

Defined in eventDecoder.ts:21

**Parameters:**

Name | Type |
------ | ------ |
`val` | string |

**Returns:** *string*

___

### `Const` decodeKosuEvents

▸ **decodeKosuEvents**(`logs`: any): *any*

Defined in eventDecoder.ts:101

**Parameters:**

Name | Type |
------ | ------ |
`logs` | any |

**Returns:** *any*

___

### `Const` eventDecoder

▸ **eventDecoder**(`eventReturnValues`: any): *any*

Defined in eventDecoder.ts:25

**Parameters:**

Name | Type |
------ | ------ |
`eventReturnValues` | any |

**Returns:** *any*

___

### `Const` listingStringifier

▸ **listingStringifier**(`listing`: `Listing`): *`PrettyListing`*

Defined in listingStringifier.ts:1

**Parameters:**

Name | Type |
------ | ------ |
`listing` | `Listing` |

**Returns:** *`PrettyListing`*

___

###  migrations

▸ **migrations**(`provider`: `Web3ProviderEngine`, `txDefaults`: `__type`, `options`: object): *`Promise<MigratedContracts>`*

Defined in migrations.ts:21

Migrate contracts to the chain represented by the configured provider.

**Parameters:**

■` provider`: *`Web3ProviderEngine`*

■` txDefaults`: *`__type`*

■` options`: *object*

Name | Type |
------ | ------ |
`noLogs?` | boolean |

**Returns:** *`Promise<MigratedContracts>`*

___

## Object literals

### `Const` artifacts

### ■ **artifacts**: *object*

Defined in artifacts.ts:18

###  AuthorizedAddresses

● **AuthorizedAddresses**: *`ContractArtifact`* =  AuthorizedAddresses as ContractArtifact

Defined in artifacts.ts:19

###  BasicTradeSubContract

● **BasicTradeSubContract**: *`ContractArtifact`* =  BasicTradeSubContract as ContractArtifact

Defined in artifacts.ts:28

###  EventEmitter

● **EventEmitter**: *`ContractArtifact`* =  EventEmitter as ContractArtifact

Defined in artifacts.ts:20

###  KosuToken

● **KosuToken**: *`ContractArtifact`* =  KosuToken as ContractArtifact

Defined in artifacts.ts:23

###  OrderGateway

● **OrderGateway**: *`ContractArtifact`* =  OrderGateway as ContractArtifact

Defined in artifacts.ts:21

###  PosterRegistry

● **PosterRegistry**: *`ContractArtifact`* =  PosterRegistry as ContractArtifact

Defined in artifacts.ts:24

###  PosterRegistryProxy

● **PosterRegistryProxy**: *`ContractArtifact`* =  PosterRegistryProxy as ContractArtifact

Defined in artifacts.ts:22

###  Treasury

● **Treasury**: *`ContractArtifact`* =  Treasury as ContractArtifact

Defined in artifacts.ts:25

###  ValidatorRegistry

● **ValidatorRegistry**: *`ContractArtifact`* =  ValidatorRegistry as ContractArtifact

Defined in artifacts.ts:26

###  Voting

● **Voting**: *`ContractArtifact`* =  Voting as ContractArtifact

Defined in artifacts.ts:27

___