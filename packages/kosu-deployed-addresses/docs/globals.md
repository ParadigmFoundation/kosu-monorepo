[Kosu Deployed Addresses](README.md) › [Globals](globals.md)

# Kosu Deployed Addresses

## Index

### Functions

-   [getAddressesForNetwork](globals.md#const-getaddressesfornetwork)
-   [getMigratedContractsForNetwork](globals.md#const-getmigratedcontractsfornetwork)
-   [getReceiptsForNetwork](globals.md#const-getreceiptsfornetwork)

## Functions

### `Const` getAddressesForNetwork

▸ **getAddressesForNetwork**(`networkId`: number | string): _KosuAddresses_

_Defined in [index.ts:32](https://github.com/ParadigmFoundation/kosu-monorepo/blob/d687fbfc/packages/kosu-deployed-addresses/src/index.ts#L32)_

Get the deployment addresses for a desired network by id.

**Parameters:**

| Name        | Type                 | Description          |
| ----------- | -------------------- | -------------------- |
| `networkId` | number &#124; string | Ethereum network id. |

**Returns:** _KosuAddresses_

The addresses for the Kosu contracts.

---

### `Const` getMigratedContractsForNetwork

▸ **getMigratedContractsForNetwork**(`web3Wrapper`: Web3Wrapper): _Promise‹MigratedContracts›_

_Defined in [index.ts:53](https://github.com/ParadigmFoundation/kosu-monorepo/blob/d687fbfc/packages/kosu-deployed-addresses/src/index.ts#L53)_

Get the deployment addresses for a desired network by id.

**Parameters:**

| Name          | Type        | Description                                    |
| ------------- | ----------- | ---------------------------------------------- |
| `web3Wrapper` | Web3Wrapper | A `Web3Wrapper` instance to get contract info. |

**Returns:** _Promise‹MigratedContracts›_

The contract instances.

---

### `Const` getReceiptsForNetwork

▸ **getReceiptsForNetwork**(`networkId`: number | string): _KosuDeploymentReceipts_

_Defined in [index.ts:22](https://github.com/ParadigmFoundation/kosu-monorepo/blob/d687fbfc/packages/kosu-deployed-addresses/src/index.ts#L22)_

Get the deployment receipts for a desired network by id.

**Parameters:**

| Name        | Type                 | Description          |
| ----------- | -------------------- | -------------------- |
| `networkId` | number &#124; string | Ethereum network id. |

**Returns:** _KosuDeploymentReceipts_

The deployment receipts for the Kosu contracts.
