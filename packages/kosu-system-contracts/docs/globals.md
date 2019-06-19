> ## [kosu-system-contracts](README.md)

[Globals](globals.md) /

# kosu-system-contracts

### Index

#### Enumerations

* [AuthorizedAddressesEvents](enums/authorizedaddressesevents.md)
* [EventEmitterEvents](enums/eventemitterevents.md)
* [KosuTokenEvents](enums/kosutokenevents.md)

#### Classes

* [AuthorizedAddressesContract](classes/authorizedaddressescontract.md)
* [EventEmitterContract](classes/eventemittercontract.md)
* [KosuTokenContract](classes/kosutokencontract.md)
* [OrderGatewayContract](classes/ordergatewaycontract.md)
* [PosterRegistryContract](classes/posterregistrycontract.md)
* [PosterRegistryProxyContract](classes/posterregistryproxycontract.md)
* [TreasuryContract](classes/treasurycontract.md)
* [ValidatorRegistryContract](classes/validatorregistrycontract.md)
* [VotingContract](classes/votingcontract.md)

#### Interfaces

* [AuthorizedAddressesOwnershipTransferredEventArgs](interfaces/authorizedaddressesownershiptransferredeventargs.md)
* [EventEmitterKosuEventEventArgs](interfaces/eventemitterkosueventeventargs.md)
* [KosuContractArtifact](interfaces/kosucontractartifact.md)
* [KosuContractVersionData](interfaces/kosucontractversiondata.md)
* [KosuDevDocOutput](interfaces/kosudevdocoutput.md)
* [KosuStandardContractOutput](interfaces/kosustandardcontractoutput.md)
* [KosuTokenApprovalEventArgs](interfaces/kosutokenapprovaleventargs.md)
* [KosuTokenTransferEventArgs](interfaces/kosutokentransfereventargs.md)

#### Type aliases

* [AuthorizedAddressesEventArgs](globals.md#authorizedaddresseseventargs)
* [EventEmitterEventArgs](globals.md#eventemittereventargs)
* [KosuTokenEventArgs](globals.md#kosutokeneventargs)

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

## Type aliases

###  AuthorizedAddressesEventArgs

Ƭ **AuthorizedAddressesEventArgs**: *[AuthorizedAddressesOwnershipTransferredEventArgs](interfaces/authorizedaddressesownershiptransferredeventargs.md)*

Defined in generated-wrappers/authorized_addresses.ts:24

___

###  EventEmitterEventArgs

Ƭ **EventEmitterEventArgs**: *[EventEmitterKosuEventEventArgs](interfaces/eventemitterkosueventeventargs.md)*

Defined in generated-wrappers/event_emitter.ts:24

___

###  KosuTokenEventArgs

Ƭ **KosuTokenEventArgs**: *[KosuTokenTransferEventArgs](interfaces/kosutokentransfereventargs.md) | [KosuTokenApprovalEventArgs](interfaces/kosutokenapprovaleventargs.md)*

Defined in generated-wrappers/kosu_token.ts:24

___

## Variables

### `Const` DeployedAddresses

● **DeployedAddresses**: *object* =  deployedAddresses

*Defined in [src/index.ts:3](url)*

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

*Defined in [src/bin/deliver_tokens.ts:10](url)*

*Defined in [src/bin/migrate.ts:15](url)*

___

### `Const` event

● **event**: *object* =  EventEmitter.compilerOutput.abi.filter(entry => entry.type === "event")[0] as {
name: string;
type: string;
inputs: Array<{ name: string; type: string }>;
}

*Defined in [src/eventDecoder.ts:6](url)*

#### Type declaration:

* **inputs**: *`Array<object>`*

* **name**: *string*

* **type**: *string*

___

### `Let` mnemonic

● **mnemonic**: *any* =  safeRequire("./mnemonic.json")

*Defined in [src/bin/deliver_tokens.ts:16](url)*

*Defined in [src/bin/migrate.ts:22](url)*

___

### `Const` signature

● **signature**: *string* =  soliditySha3(`${event.name}(${event.inputs.map(input => input.type).join(",")})`)

*Defined in [src/eventDecoder.ts:15](url)*

___

## Functions

### `Const` bytes32ToAddressString

▸ **bytes32ToAddressString**(`val`: string): *string*

*Defined in [src/eventDecoder.ts:17](url)*

**Parameters:**

Name | Type |
------ | ------ |
`val` | string |

**Returns:** *string*

___

### `Const` bytes32ToBase64

▸ **bytes32ToBase64**(`val`: string): *string*

*Defined in [src/eventDecoder.ts:21](url)*

**Parameters:**

Name | Type |
------ | ------ |
`val` | string |

**Returns:** *string*

___

### `Const` decodeKosuEvents

▸ **decodeKosuEvents**(`logs`: any): *any*

*Defined in [src/eventDecoder.ts:101](url)*

**Parameters:**

Name | Type |
------ | ------ |
`logs` | any |

**Returns:** *any*

___

### `Const` eventDecoder

▸ **eventDecoder**(`eventReturnValues`: any): *any*

*Defined in [src/eventDecoder.ts:25](url)*

**Parameters:**

Name | Type |
------ | ------ |
`eventReturnValues` | any |

**Returns:** *any*

___

### `Const` listingStringifier

▸ **listingStringifier**(`listing`: `Listing`): *`PrettyListing`*

*Defined in [src/listingStringifier.ts:1](url)*

**Parameters:**

Name | Type |
------ | ------ |
`listing` | `Listing` |

**Returns:** *`PrettyListing`*

___

###  migrations

▸ **migrations**(`provider`: `Web3ProviderEngine`, `txDefaults`: `__type`, `options`: object): *`Promise<MigratedContracts>`*

*Defined in [src/migrations.ts:22](url)*

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

*Defined in [src/artifacts.ts:18](url)*

###  AuthorizedAddresses

● **AuthorizedAddresses**: *[KosuContractArtifact](interfaces/kosucontractartifact.md)* =  AuthorizedAddresses as KosuContractArtifact

*Defined in [src/artifacts.ts:19](url)*

###  BasicTradeSubContract

● **BasicTradeSubContract**: *[KosuContractArtifact](interfaces/kosucontractartifact.md)* =  BasicTradeSubContract as KosuContractArtifact

*Defined in [src/artifacts.ts:28](url)*

###  EventEmitter

● **EventEmitter**: *[KosuContractArtifact](interfaces/kosucontractartifact.md)* =  EventEmitter as KosuContractArtifact

*Defined in [src/artifacts.ts:20](url)*

###  KosuToken

● **KosuToken**: *[KosuContractArtifact](interfaces/kosucontractartifact.md)* =  KosuToken as KosuContractArtifact

*Defined in [src/artifacts.ts:23](url)*

###  OrderGateway

● **OrderGateway**: *[KosuContractArtifact](interfaces/kosucontractartifact.md)* =  OrderGateway as KosuContractArtifact

*Defined in [src/artifacts.ts:21](url)*

###  PosterRegistry

● **PosterRegistry**: *[KosuContractArtifact](interfaces/kosucontractartifact.md)* =  PosterRegistry as KosuContractArtifact

*Defined in [src/artifacts.ts:24](url)*

###  PosterRegistryProxy

● **PosterRegistryProxy**: *[KosuContractArtifact](interfaces/kosucontractartifact.md)* =  PosterRegistryProxy as KosuContractArtifact

*Defined in [src/artifacts.ts:22](url)*

###  Treasury

● **Treasury**: *[KosuContractArtifact](interfaces/kosucontractartifact.md)* =  Treasury as KosuContractArtifact

*Defined in [src/artifacts.ts:25](url)*

###  ValidatorRegistry

● **ValidatorRegistry**: *[KosuContractArtifact](interfaces/kosucontractartifact.md)* =  ValidatorRegistry as KosuContractArtifact

*Defined in [src/artifacts.ts:26](url)*

###  Voting

● **Voting**: *[KosuContractArtifact](interfaces/kosucontractartifact.md)* =  Voting as KosuContractArtifact

*Defined in [src/artifacts.ts:27](url)*

___