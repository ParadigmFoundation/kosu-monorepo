> ## [kosu-system-contracts](../README.md)

[Globals](../globals.md) / [PosterRegistryContract](posterregistrycontract.md) /

# Class: PosterRegistryContract

## Hierarchy

-   `BaseContract`

    -   **PosterRegistryContract**

### Index

#### Constructors

-   [constructor](posterregistrycontract.md#constructor)

#### Properties

-   [abi](posterregistrycontract.md#abi)
-   [address](posterregistrycontract.md#address)
-   [constructorArgs](posterregistrycontract.md#constructorargs)
-   [contractName](posterregistrycontract.md#contractname)
-   [txReceipt](posterregistrycontract.md#optional-txreceipt)

#### Methods

-   [deployAsync](posterregistrycontract.md#static-deployasync)
-   [deployFrom0xArtifactAsync](posterregistrycontract.md#static-deployfrom0xartifactasync)
-   [strictArgumentEncodingCheck](posterregistrycontract.md#static-strictargumentencodingcheck)

#### Object literals

-   [registerTokens](posterregistrycontract.md#registertokens)
-   [releaseTokens](posterregistrycontract.md#releasetokens)
-   [token](posterregistrycontract.md#token)
-   [tokensContributed](posterregistrycontract.md#tokenscontributed)
-   [tokensRegisteredFor](posterregistrycontract.md#tokensregisteredfor)
-   [treasury](posterregistrycontract.md#treasury)

## Constructors

### constructor

\+ **new PosterRegistryContract**(`abi`: `ContractAbi`, `address`: string, `supportedProvider`: `SupportedProvider`, `txDefaults?`: `Partial<TxData>`): _[PosterRegistryContract](posterregistrycontract.md)_

_Overrides void_

Defined in generated-wrappers/poster_registry.ts:430

**Parameters:**

| Name                | Type                |
| ------------------- | ------------------- |
| `abi`               | `ContractAbi`       |
| `address`           | string              |
| `supportedProvider` | `SupportedProvider` |
| `txDefaults?`       | `Partial<TxData>`   |

**Returns:** _[PosterRegistryContract](posterregistrycontract.md)_

---

## Properties

### abi

● **abi**: _`ContractAbi`_

_Inherited from void_

Defined in /Users/hen/GitHub/km/node_modules/@0x/base-contract/lib/src/index.d.ts:22

---

### address

● **address**: _string_

_Inherited from void_

Defined in /Users/hen/GitHub/km/node_modules/@0x/base-contract/lib/src/index.d.ts:23

---

### constructorArgs

● **constructorArgs**: _any[]_

_Inherited from void_

Defined in /Users/hen/GitHub/km/node_modules/@0x/base-contract/lib/src/index.d.ts:25

---

### contractName

● **contractName**: _string_

_Inherited from void_

Defined in /Users/hen/GitHub/km/node_modules/@0x/base-contract/lib/src/index.d.ts:24

---

### `Optional` txReceipt

● **txReceipt**? : _`TransactionReceiptWithDecodedLogs`_

Defined in generated-wrappers/poster_registry.ts:29

---

## Methods

### `Static` deployAsync

▸ **deployAsync**(`bytecode`: string, `abi`: `ContractAbi`, `supportedProvider`: `SupportedProvider`, `txDefaults`: `Partial<TxData>`, `_treasuryAddress`: string, `_events`: string, `_auth`: string): _`Promise<PosterRegistryContract>`_

Defined in generated-wrappers/poster_registry.ts:385

**Parameters:**

| Name                | Type                |
| ------------------- | ------------------- |
| `bytecode`          | string              |
| `abi`               | `ContractAbi`       |
| `supportedProvider` | `SupportedProvider` |
| `txDefaults`        | `Partial<TxData>`   |
| `_treasuryAddress`  | string              |
| `_events`           | string              |
| `_auth`             | string              |

**Returns:** _`Promise<PosterRegistryContract>`_

---

### `Static` deployFrom0xArtifactAsync

▸ **deployFrom0xArtifactAsync**(`artifact`: `ContractArtifact` | `SimpleContractArtifact`, `supportedProvider`: `SupportedProvider`, `txDefaults`: `Partial<TxData>`, `_treasuryAddress`: string, `_events`: string, `_auth`: string): _`Promise<PosterRegistryContract>`_

Defined in generated-wrappers/poster_registry.ts:366

**Parameters:**

| Name                | Type                |
| ------------------- | ------------------- |
| `artifact`          | `ContractArtifact`  | `SimpleContractArtifact` |
| `supportedProvider` | `SupportedProvider` |
| `txDefaults`        | `Partial<TxData>`   |
| `_treasuryAddress`  | string              |
| `_events`           | string              |
| `_auth`             | string              |

**Returns:** _`Promise<PosterRegistryContract>`_

---

### `Static` strictArgumentEncodingCheck

▸ **strictArgumentEncodingCheck**(`inputAbi`: `DataItem`[], `args`: any[]): _string_

_Inherited from void_

Defined in /Users/hen/GitHub/km/node_modules/@0x/base-contract/lib/src/index.d.ts:32

**Parameters:**

| Name       | Type         |
| ---------- | ------------ |
| `inputAbi` | `DataItem`[] |
| `args`     | any[]        |

**Returns:** _string_

---

## Object literals

### registerTokens

### ■ **registerTokens**: _object_

Defined in generated-wrappers/poster_registry.ts:56

### awaitTransactionSuccessAsync

▸ **awaitTransactionSuccessAsync**(`msgSender`: string, `amount`: `BigNumber`, `txData?`: `Partial<TxData>` | number, `pollingIntervalMs?`: number, `timeoutMs?`: number): _`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`_

Defined in generated-wrappers/poster_registry.ts:82

**Parameters:**

| Name                 | Type              |
| -------------------- | ----------------- |
| `msgSender`          | string            |
| `amount`             | `BigNumber`       |
| `txData?`            | `Partial<TxData>` | number |
| `pollingIntervalMs?` | number            |
| `timeoutMs?`         | number            |

**Returns:** _`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`_

### callAsync

▸ **callAsync**(`msgSender`: string, `amount`: `BigNumber`, `callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): _`Promise<void>`_

Defined in generated-wrappers/poster_registry.ts:142

**Parameters:**

| Name            | Type                | Default value |
| --------------- | ------------------- | ------------- |
| `msgSender`     | string              | -             |
| `amount`        | `BigNumber`         | -             |
| `callData`      | `Partial<CallData>` | {}            |
| `defaultBlock?` | `BlockParam`        | -             |

**Returns:** _`Promise<void>`_

### estimateGasAsync

▸ **estimateGasAsync**(`msgSender`: string, `amount`: `BigNumber`, `txData`: `Partial<TxData>`): _`Promise<number>`_

Defined in generated-wrappers/poster_registry.ts:112

**Parameters:**

| Name        | Type              | Default value |
| ----------- | ----------------- | ------------- |
| `msgSender` | string            | -             |
| `amount`    | `BigNumber`       | -             |
| `txData`    | `Partial<TxData>` | {}            |

**Returns:** _`Promise<number>`_

### getABIEncodedTransactionData

▸ **getABIEncodedTransactionData**(`msgSender`: string, `amount`: `BigNumber`): _string_

Defined in generated-wrappers/poster_registry.ts:132

**Parameters:**

| Name        | Type        |
| ----------- | ----------- |
| `msgSender` | string      |
| `amount`    | `BigNumber` |

**Returns:** _string_

### sendTransactionAsync

▸ **sendTransactionAsync**(`msgSender`: string, `amount`: `BigNumber`, `txData`: `Partial<TxData>`): _`Promise<string>`_

Defined in generated-wrappers/poster_registry.ts:57

**Parameters:**

| Name        | Type              | Default value |
| ----------- | ----------------- | ------------- |
| `msgSender` | string            | -             |
| `amount`    | `BigNumber`       | -             |
| `txData`    | `Partial<TxData>` | {}            |

**Returns:** _`Promise<string>`_

---

### releaseTokens

### ■ **releaseTokens**: _object_

Defined in generated-wrappers/poster_registry.ts:225

### awaitTransactionSuccessAsync

▸ **awaitTransactionSuccessAsync**(`msgSender`: string, `amount`: `BigNumber`, `txData?`: `Partial<TxData>` | number, `pollingIntervalMs?`: number, `timeoutMs?`: number): _`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`_

Defined in generated-wrappers/poster_registry.ts:251

**Parameters:**

| Name                 | Type              |
| -------------------- | ----------------- |
| `msgSender`          | string            |
| `amount`             | `BigNumber`       |
| `txData?`            | `Partial<TxData>` | number |
| `pollingIntervalMs?` | number            |
| `timeoutMs?`         | number            |

**Returns:** _`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`_

### callAsync

▸ **callAsync**(`msgSender`: string, `amount`: `BigNumber`, `callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): _`Promise<void>`_

Defined in generated-wrappers/poster_registry.ts:311

**Parameters:**

| Name            | Type                | Default value |
| --------------- | ------------------- | ------------- |
| `msgSender`     | string              | -             |
| `amount`        | `BigNumber`         | -             |
| `callData`      | `Partial<CallData>` | {}            |
| `defaultBlock?` | `BlockParam`        | -             |

**Returns:** _`Promise<void>`_

### estimateGasAsync

▸ **estimateGasAsync**(`msgSender`: string, `amount`: `BigNumber`, `txData`: `Partial<TxData>`): _`Promise<number>`_

Defined in generated-wrappers/poster_registry.ts:281

**Parameters:**

| Name        | Type              | Default value |
| ----------- | ----------------- | ------------- |
| `msgSender` | string            | -             |
| `amount`    | `BigNumber`       | -             |
| `txData`    | `Partial<TxData>` | {}            |

**Returns:** _`Promise<number>`_

### getABIEncodedTransactionData

▸ **getABIEncodedTransactionData**(`msgSender`: string, `amount`: `BigNumber`): _string_

Defined in generated-wrappers/poster_registry.ts:301

**Parameters:**

| Name        | Type        |
| ----------- | ----------- |
| `msgSender` | string      |
| `amount`    | `BigNumber` |

**Returns:** _string_

### sendTransactionAsync

▸ **sendTransactionAsync**(`msgSender`: string, `amount`: `BigNumber`, `txData`: `Partial<TxData>`): _`Promise<string>`_

Defined in generated-wrappers/poster_registry.ts:226

**Parameters:**

| Name        | Type              | Default value |
| ----------- | ----------------- | ------------- |
| `msgSender` | string            | -             |
| `amount`    | `BigNumber`       | -             |
| `txData`    | `Partial<TxData>` | {}            |

**Returns:** _`Promise<string>`_

---

### token

### ■ **token**: _object_

Defined in generated-wrappers/poster_registry.ts:340

### callAsync

▸ **callAsync**(`callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): _`Promise<string>`_

Defined in generated-wrappers/poster_registry.ts:341

**Parameters:**

| Name            | Type                | Default value |
| --------------- | ------------------- | ------------- |
| `callData`      | `Partial<CallData>` | {}            |
| `defaultBlock?` | `BlockParam`        | -             |

**Returns:** _`Promise<string>`_

---

### tokensContributed

### ■ **tokensContributed**: _object_

Defined in generated-wrappers/poster_registry.ts:199

### callAsync

▸ **callAsync**(`callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): _`Promise<BigNumber>`_

Defined in generated-wrappers/poster_registry.ts:200

**Parameters:**

| Name            | Type                | Default value |
| --------------- | ------------------- | ------------- |
| `callData`      | `Partial<CallData>` | {}            |
| `defaultBlock?` | `BlockParam`        | -             |

**Returns:** _`Promise<BigNumber>`_

---

### tokensRegisteredFor

### ■ **tokensRegisteredFor**: _object_

Defined in generated-wrappers/poster_registry.ts:171

### callAsync

▸ **callAsync**(`a`: string, `callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): _`Promise<BigNumber>`_

Defined in generated-wrappers/poster_registry.ts:172

**Parameters:**

| Name            | Type                | Default value |
| --------------- | ------------------- | ------------- |
| `a`             | string              | -             |
| `callData`      | `Partial<CallData>` | {}            |
| `defaultBlock?` | `BlockParam`        | -             |

**Returns:** _`Promise<BigNumber>`_

---

### treasury

### ■ **treasury**: _object_

Defined in generated-wrappers/poster_registry.ts:30

### callAsync

▸ **callAsync**(`callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): _`Promise<string>`_

Defined in generated-wrappers/poster_registry.ts:31

**Parameters:**

| Name            | Type                | Default value |
| --------------- | ------------------- | ------------- |
| `callData`      | `Partial<CallData>` | {}            |
| `defaultBlock?` | `BlockParam`        | -             |

**Returns:** _`Promise<string>`_

---
