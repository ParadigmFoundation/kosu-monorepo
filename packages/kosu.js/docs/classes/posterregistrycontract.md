> ## [kosu.js](../README.md)

[Globals](../globals.md) / [PosterRegistryContract](posterregistrycontract.md) /

# Class: PosterRegistryContract

## Hierarchy

-   `BaseContract`

    -   **PosterRegistryContract**

### Index

#### Constructors

-   [constructor](posterregistrycontract.md#constructor)

#### Properties

-   [\_abiEncoderByFunctionSignature](posterregistrycontract.md#protected-_abiencoderbyfunctionsignature)
-   [\_web3Wrapper](posterregistrycontract.md#protected-_web3wrapper)
-   [abi](posterregistrycontract.md#abi)
-   [address](posterregistrycontract.md#address)
-   [constructorArgs](posterregistrycontract.md#constructorargs)
-   [contractName](posterregistrycontract.md#contractname)
-   [txReceipt](posterregistrycontract.md#optional-txreceipt)

#### Methods

-   [\_lookupAbi](posterregistrycontract.md#protected-_lookupabi)
-   [\_lookupAbiEncoder](posterregistrycontract.md#protected-_lookupabiencoder)
-   [\_strictEncodeArguments](posterregistrycontract.md#protected-_strictencodearguments)
-   [\_applyDefaultsToTxDataAsync](posterregistrycontract.md#static-protected-_applydefaultstotxdataasync)
-   [\_bigNumberToString](posterregistrycontract.md#static-protected-_bignumbertostring)
-   [\_formatABIDataItemList](posterregistrycontract.md#static-protected-_formatabidataitemlist)
-   [\_lookupConstructorAbi](posterregistrycontract.md#static-protected-_lookupconstructorabi)
-   [\_lowercaseAddress](posterregistrycontract.md#static-protected-_lowercaseaddress)
-   [\_throwIfRevertWithReasonCallResult](posterregistrycontract.md#static-protected-_throwifrevertwithreasoncallresult)
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

Defined in node_modules/@kosu/system-contracts/generated-wrappers/poster_registry.ts:430

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

### `Protected` \_abiEncoderByFunctionSignature

● **\_abiEncoderByFunctionSignature**: _`AbiEncoderByFunctionSignature`_

_Inherited from void_

Defined in /Users/hen/GitHub/km/node_modules/@0x/base-contract/lib/src/index.d.ts:20

---

### `Protected` \_web3Wrapper

● **\_web3Wrapper**: _`Web3Wrapper`_

_Inherited from void_

Defined in /Users/hen/GitHub/km/node_modules/@0x/base-contract/lib/src/index.d.ts:21

---

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

Defined in node_modules/@kosu/system-contracts/generated-wrappers/poster_registry.ts:29

---

## Methods

### `Protected` \_lookupAbi

▸ **\_lookupAbi**(`functionSignature`: string): _`MethodAbi`_

_Inherited from void_

Defined in /Users/hen/GitHub/km/node_modules/@0x/base-contract/lib/src/index.d.ts:34

**Parameters:**

| Name                | Type   |
| ------------------- | ------ |
| `functionSignature` | string |

**Returns:** _`MethodAbi`_

---

### `Protected` \_lookupAbiEncoder

▸ **\_lookupAbiEncoder**(`functionSignature`: string): _`Method`_

_Inherited from void_

Defined in /Users/hen/GitHub/km/node_modules/@0x/base-contract/lib/src/index.d.ts:33

**Parameters:**

| Name                | Type   |
| ------------------- | ------ |
| `functionSignature` | string |

**Returns:** _`Method`_

---

### `Protected` \_strictEncodeArguments

▸ **\_strictEncodeArguments**(`functionSignature`: string, `functionArguments`: any): _string_

_Inherited from void_

Defined in /Users/hen/GitHub/km/node_modules/@0x/base-contract/lib/src/index.d.ts:35

**Parameters:**

| Name                | Type   |
| ------------------- | ------ |
| `functionSignature` | string |
| `functionArguments` | any    |

**Returns:** _string_

---

### `Static` `Protected` \_applyDefaultsToTxDataAsync

▸ **\_applyDefaultsToTxDataAsync**<**T**>(`txData`: `T`, `txDefaults`: `Partial<TxData>`, `estimateGasAsync?`: function): _`Promise<TxData>`_

_Inherited from void_

Defined in /Users/hen/GitHub/km/node_modules/@0x/base-contract/lib/src/index.d.ts:30

**Type parameters:**

■`T`: _`Partial<TxData | TxDataPayable>`_

**Parameters:**

■`txData`: _`T`_

■`txDefaults`: _`Partial<TxData>`_

■`estimateGasAsync`: _function_

▸ (`txData`: `T`): _`Promise<number>`_

**Parameters:**

| Name     | Type |
| -------- | ---- |
| `txData` | `T`  |

**Returns:** _`Promise<TxData>`_

---

### `Static` `Protected` \_bigNumberToString

▸ **\_bigNumberToString**(`_type`: string, `value`: any): _any_

_Inherited from void_

Defined in /Users/hen/GitHub/km/node_modules/@0x/base-contract/lib/src/index.d.ts:28

**Parameters:**

| Name    | Type   |
| ------- | ------ |
| `_type` | string |
| `value` | any    |

**Returns:** _any_

---

### `Static` `Protected` \_formatABIDataItemList

▸ **\_formatABIDataItemList**(`abis`: `DataItem`[], `values`: any[], `formatter`: function): _any_

_Inherited from void_

Defined in /Users/hen/GitHub/km/node_modules/@0x/base-contract/lib/src/index.d.ts:26

**Parameters:**

■`abis`: _`DataItem`[]_

■`values`: _any[]_

■`formatter`: _function_

▸ (`type`: string, `value`: any): _any_

**Parameters:**

| Name    | Type   |
| ------- | ------ |
| `type`  | string |
| `value` | any    |

**Returns:** _any_

---

### `Static` `Protected` \_lookupConstructorAbi

▸ **\_lookupConstructorAbi**(`abi`: `ContractAbi`): _`ConstructorAbi`_

_Inherited from void_

Defined in /Users/hen/GitHub/km/node_modules/@0x/base-contract/lib/src/index.d.ts:29

**Parameters:**

| Name  | Type          |
| ----- | ------------- |
| `abi` | `ContractAbi` |

**Returns:** _`ConstructorAbi`_

---

### `Static` `Protected` \_lowercaseAddress

▸ **\_lowercaseAddress**(`type`: string, `value`: string): _string_

_Inherited from void_

Defined in /Users/hen/GitHub/km/node_modules/@0x/base-contract/lib/src/index.d.ts:27

**Parameters:**

| Name    | Type   |
| ------- | ------ |
| `type`  | string |
| `value` | string |

**Returns:** _string_

---

### `Static` `Protected` \_throwIfRevertWithReasonCallResult

▸ **\_throwIfRevertWithReasonCallResult**(`rawCallResult`: string): _void_

_Inherited from void_

Defined in /Users/hen/GitHub/km/node_modules/@0x/base-contract/lib/src/index.d.ts:31

**Parameters:**

| Name            | Type   |
| --------------- | ------ |
| `rawCallResult` | string |

**Returns:** _void_

---

### `Static` deployAsync

▸ **deployAsync**(`bytecode`: string, `abi`: `ContractAbi`, `supportedProvider`: `SupportedProvider`, `txDefaults`: `Partial<TxData>`, `_treasuryAddress`: string, `_events`: string, `_auth`: string): _`Promise<PosterRegistryContract>`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/poster_registry.ts:385

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

Defined in node_modules/@kosu/system-contracts/generated-wrappers/poster_registry.ts:366

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

Defined in node_modules/@kosu/system-contracts/generated-wrappers/poster_registry.ts:56

### awaitTransactionSuccessAsync

▸ **awaitTransactionSuccessAsync**(`msgSender`: string, `amount`: `BigNumber`, `txData?`: `Partial<TxData>` | number, `pollingIntervalMs?`: number, `timeoutMs?`: number): _`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/poster_registry.ts:82

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

Defined in node_modules/@kosu/system-contracts/generated-wrappers/poster_registry.ts:142

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

Defined in node_modules/@kosu/system-contracts/generated-wrappers/poster_registry.ts:112

**Parameters:**

| Name        | Type              | Default value |
| ----------- | ----------------- | ------------- |
| `msgSender` | string            | -             |
| `amount`    | `BigNumber`       | -             |
| `txData`    | `Partial<TxData>` | {}            |

**Returns:** _`Promise<number>`_

### getABIEncodedTransactionData

▸ **getABIEncodedTransactionData**(`msgSender`: string, `amount`: `BigNumber`): _string_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/poster_registry.ts:132

**Parameters:**

| Name        | Type        |
| ----------- | ----------- |
| `msgSender` | string      |
| `amount`    | `BigNumber` |

**Returns:** _string_

### sendTransactionAsync

▸ **sendTransactionAsync**(`msgSender`: string, `amount`: `BigNumber`, `txData`: `Partial<TxData>`): _`Promise<string>`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/poster_registry.ts:57

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

Defined in node_modules/@kosu/system-contracts/generated-wrappers/poster_registry.ts:225

### awaitTransactionSuccessAsync

▸ **awaitTransactionSuccessAsync**(`msgSender`: string, `amount`: `BigNumber`, `txData?`: `Partial<TxData>` | number, `pollingIntervalMs?`: number, `timeoutMs?`: number): _`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/poster_registry.ts:251

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

Defined in node_modules/@kosu/system-contracts/generated-wrappers/poster_registry.ts:311

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

Defined in node_modules/@kosu/system-contracts/generated-wrappers/poster_registry.ts:281

**Parameters:**

| Name        | Type              | Default value |
| ----------- | ----------------- | ------------- |
| `msgSender` | string            | -             |
| `amount`    | `BigNumber`       | -             |
| `txData`    | `Partial<TxData>` | {}            |

**Returns:** _`Promise<number>`_

### getABIEncodedTransactionData

▸ **getABIEncodedTransactionData**(`msgSender`: string, `amount`: `BigNumber`): _string_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/poster_registry.ts:301

**Parameters:**

| Name        | Type        |
| ----------- | ----------- |
| `msgSender` | string      |
| `amount`    | `BigNumber` |

**Returns:** _string_

### sendTransactionAsync

▸ **sendTransactionAsync**(`msgSender`: string, `amount`: `BigNumber`, `txData`: `Partial<TxData>`): _`Promise<string>`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/poster_registry.ts:226

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

Defined in node_modules/@kosu/system-contracts/generated-wrappers/poster_registry.ts:340

### callAsync

▸ **callAsync**(`callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): _`Promise<string>`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/poster_registry.ts:341

**Parameters:**

| Name            | Type                | Default value |
| --------------- | ------------------- | ------------- |
| `callData`      | `Partial<CallData>` | {}            |
| `defaultBlock?` | `BlockParam`        | -             |

**Returns:** _`Promise<string>`_

---

### tokensContributed

### ■ **tokensContributed**: _object_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/poster_registry.ts:199

### callAsync

▸ **callAsync**(`callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): _`Promise<BigNumber>`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/poster_registry.ts:200

**Parameters:**

| Name            | Type                | Default value |
| --------------- | ------------------- | ------------- |
| `callData`      | `Partial<CallData>` | {}            |
| `defaultBlock?` | `BlockParam`        | -             |

**Returns:** _`Promise<BigNumber>`_

---

### tokensRegisteredFor

### ■ **tokensRegisteredFor**: _object_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/poster_registry.ts:171

### callAsync

▸ **callAsync**(`a`: string, `callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): _`Promise<BigNumber>`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/poster_registry.ts:172

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

Defined in node_modules/@kosu/system-contracts/generated-wrappers/poster_registry.ts:30

### callAsync

▸ **callAsync**(`callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): _`Promise<string>`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/poster_registry.ts:31

**Parameters:**

| Name            | Type                | Default value |
| --------------- | ------------------- | ------------- |
| `callData`      | `Partial<CallData>` | {}            |
| `defaultBlock?` | `BlockParam`        | -             |

**Returns:** _`Promise<string>`_

---
