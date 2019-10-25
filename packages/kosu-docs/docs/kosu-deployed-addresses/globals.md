> **[Kosu Deployed Addresses](README.md)**

[Globals](globals.md) /

# Kosu Deployed Addresses

## Index

### Functions

-   [getAddressesForNetwork](globals.md#const-getaddressesfornetwork)
-   [getReceiptsForNetwork](globals.md#const-getreceiptsfornetwork)

## Functions

### `Const` getAddressesForNetwork

▸ **getAddressesForNetwork**(`networkId`: number | string): _`KosuAddresses`_

_Defined in [index.ts:20](https://github.com/ParadigmFoundation/kosu-monorepo/blob/b1686609/packages/kosu-deployed-addresses/src/index.ts#L20)_

Get the deployment addresses for a desired network by id.

**Parameters:**

| Name        | Type             | Description          |
| ----------- | ---------------- | -------------------- |
| `networkId` | number \| string | Ethereum network id. |

**Returns:** _`KosuAddresses`_

The addresses for the Kosu contracts.

---

### `Const` getReceiptsForNetwork

▸ **getReceiptsForNetwork**(`networkId`: number | string): _`KosuDeploymentReceipts`_

_Defined in [index.ts:10](https://github.com/ParadigmFoundation/kosu-monorepo/blob/b1686609/packages/kosu-deployed-addresses/src/index.ts#L10)_

Get the deployment receipts for a desired network by id.

**Parameters:**

| Name        | Type             | Description          |
| ----------- | ---------------- | -------------------- |
| `networkId` | number \| string | Ethereum network id. |

**Returns:** _`KosuDeploymentReceipts`_

The deployment receipts for the Kosu contracts.
