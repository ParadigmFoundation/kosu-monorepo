> **[Kosu Deployed Addresses](README.md)**

[Globals](globals.md) /

# Kosu Deployed Addresses

## Index

### Functions

* [getAddressesForNetwork](globals.md#const-getaddressesfornetwork)
* [getReceiptsForNetwork](globals.md#const-getreceiptsfornetwork)

## Functions

### `Const` getAddressesForNetwork

▸ **getAddressesForNetwork**(`networkId`: number | string): *`KosuAddresses`*

*Defined in [index.ts:20](https://github.com/ParadigmFoundation/kosu-monorepo/blob/b1686609/packages/kosu-deployed-addresses/src/index.ts#L20)*

Get the deployment addresses for a desired network by id.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`networkId` | number \| string | Ethereum network id. |

**Returns:** *`KosuAddresses`*

The addresses for the Kosu contracts.

___

### `Const` getReceiptsForNetwork

▸ **getReceiptsForNetwork**(`networkId`: number | string): *`KosuDeploymentReceipts`*

*Defined in [index.ts:10](https://github.com/ParadigmFoundation/kosu-monorepo/blob/b1686609/packages/kosu-deployed-addresses/src/index.ts#L10)*

Get the deployment receipts for a desired network by id.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`networkId` | number \| string | Ethereum network id. |

**Returns:** *`KosuDeploymentReceipts`*

The deployment receipts for the Kosu contracts.