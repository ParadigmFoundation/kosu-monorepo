> ## [kosu.js](../README.md)

[Globals](../globals.md) / [PosterRegistryProxyContract](posterregistryproxycontract.md) /

# Class: PosterRegistryProxyContract

## Hierarchy

-   `BaseContract`

    -   **PosterRegistryProxyContract**

### Index

#### Constructors

-   [constructor](posterregistryproxycontract.md#constructor)

#### Properties

-   [\_abiEncoderByFunctionSignature](posterregistryproxycontract.md#protected-_abiencoderbyfunctionsignature)
-   [\_web3Wrapper](posterregistryproxycontract.md#protected-_web3wrapper)
-   [abi](posterregistryproxycontract.md#abi)
-   [address](posterregistryproxycontract.md#address)
-   [constructorArgs](posterregistryproxycontract.md#constructorargs)
-   [contractName](posterregistryproxycontract.md#contractname)
-   [txReceipt](posterregistryproxycontract.md#optional-txreceipt)

#### Methods

-   [\_lookupAbi](posterregistryproxycontract.md#protected-_lookupabi)
-   [\_lookupAbiEncoder](posterregistryproxycontract.md#protected-_lookupabiencoder)
-   [\_strictEncodeArguments](posterregistryproxycontract.md#protected-_strictencodearguments)
-   [\_applyDefaultsToTxDataAsync](posterregistryproxycontract.md#static-protected-_applydefaultstotxdataasync)
-   [\_bigNumberToString](posterregistryproxycontract.md#static-protected-_bignumbertostring)
-   [\_formatABIDataItemList](posterregistryproxycontract.md#static-protected-_formatabidataitemlist)
-   [\_lookupConstructorAbi](posterregistryproxycontract.md#static-protected-_lookupconstructorabi)
-   [\_lowercaseAddress](posterregistryproxycontract.md#static-protected-_lowercaseaddress)
-   [\_throwIfRevertWithReasonCallResult](posterregistryproxycontract.md#static-protected-_throwifrevertwithreasoncallresult)
-   [deployAsync](posterregistryproxycontract.md#static-deployasync)
-   [deployFrom0xArtifactAsync](posterregistryproxycontract.md#static-deployfrom0xartifactasync)
-   [strictArgumentEncodingCheck](posterregistryproxycontract.md#static-strictargumentencodingcheck)

#### Object literals

-   [registerTokens](posterregistryproxycontract.md#registertokens)
-   [releaseTokens](posterregistryproxycontract.md#releasetokens)
-   [setImplementation](posterregistryproxycontract.md#setimplementation)
-   [token](posterregistryproxycontract.md#token)
-   [tokensContributed](posterregistryproxycontract.md#tokenscontributed)
-   [tokensRegisteredFor](posterregistryproxycontract.md#tokensregisteredfor)
-   [treasury](posterregistryproxycontract.md#treasury)

## Constructors

### constructor

\+ **new PosterRegistryProxyContract**(`abi`: `ContractAbi`, `address`: string, `supportedProvider`: `SupportedProvider`, `txDefaults?`: `Partial<TxData>`): _[PosterRegistryProxyContract](posterregistryproxycontract.md)_

_Overrides void_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/poster_registry_proxy.ts:505

**Parameters:**

| Name                | Type                |
| ------------------- | ------------------- |
| `abi`               | `ContractAbi`       |
| `address`           | string              |
| `supportedProvider` | `SupportedProvider` |
| `txDefaults?`       | `Partial<TxData>`   |

**Returns:** _[PosterRegistryProxyContract](posterregistryproxycontract.md)_

---

## Properties

### `Protected` \_abiEncoderByFunctionSignature

● **\_abiEncoderByFunctionSignature**: _`AbiEncoderByFunctionSignature`_

_Inherited from void_

Defined in node_modules/@0x/base-contract/lib/src/index.d.ts:20

---

### `Protected` \_web3Wrapper

● **\_web3Wrapper**: _`Web3Wrapper`_

_Inherited from void_

Defined in node_modules/@0x/base-contract/lib/src/index.d.ts:21

---

### abi

● **abi**: _`ContractAbi`_

_Inherited from void_

Defined in node_modules/@0x/base-contract/lib/src/index.d.ts:22

---

### address

● **address**: _string_

_Inherited from void_

Defined in node_modules/@0x/base-contract/lib/src/index.d.ts:23

---

### constructorArgs

● **constructorArgs**: _any[]_

_Inherited from void_

Defined in node_modules/@0x/base-contract/lib/src/index.d.ts:25

---

### contractName

● **contractName**: _string_

_Inherited from void_

Defined in node_modules/@0x/base-contract/lib/src/index.d.ts:24

---

### `Optional` txReceipt

● **txReceipt**? : _`TransactionReceiptWithDecodedLogs`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/poster_registry_proxy.ts:29

---

## Methods

### `Protected` \_lookupAbi

▸ **\_lookupAbi**(`functionSignature`: string): _`MethodAbi`_

_Inherited from void_

Defined in node_modules/@0x/base-contract/lib/src/index.d.ts:34

**Parameters:**

| Name                | Type   |
| ------------------- | ------ |
| `functionSignature` | string |

**Returns:** _`MethodAbi`_

---

### `Protected` \_lookupAbiEncoder

▸ **\_lookupAbiEncoder**(`functionSignature`: string): _`Method`_

_Inherited from void_

Defined in node_modules/@0x/base-contract/lib/src/index.d.ts:33

**Parameters:**

| Name                | Type   |
| ------------------- | ------ |
| `functionSignature` | string |

**Returns:** _`Method`_

---

### `Protected` \_strictEncodeArguments

▸ **\_strictEncodeArguments**(`functionSignature`: string, `functionArguments`: any): _string_

_Inherited from void_

Defined in node_modules/@0x/base-contract/lib/src/index.d.ts:35

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

Defined in node_modules/@0x/base-contract/lib/src/index.d.ts:30

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

Defined in node_modules/@0x/base-contract/lib/src/index.d.ts:28

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

Defined in node_modules/@0x/base-contract/lib/src/index.d.ts:26

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

Defined in node_modules/@0x/base-contract/lib/src/index.d.ts:29

**Parameters:**

| Name  | Type          |
| ----- | ------------- |
| `abi` | `ContractAbi` |

**Returns:** _`ConstructorAbi`_

---

### `Static` `Protected` \_lowercaseAddress

▸ **\_lowercaseAddress**(`type`: string, `value`: string): _string_

_Inherited from void_

Defined in node_modules/@0x/base-contract/lib/src/index.d.ts:27

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

Defined in node_modules/@0x/base-contract/lib/src/index.d.ts:31

**Parameters:**

| Name            | Type   |
| --------------- | ------ |
| `rawCallResult` | string |

**Returns:** _void_

---

### `Static` deployAsync

▸ **deployAsync**(`bytecode`: string, `abi`: `ContractAbi`, `supportedProvider`: `SupportedProvider`, `txDefaults`: `Partial<TxData>`, `implementation`: string, `auth`: string): _`Promise<PosterRegistryProxyContract>`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/poster_registry_proxy.ts:465

**Parameters:**

| Name                | Type                |
| ------------------- | ------------------- |
| `bytecode`          | string              |
| `abi`               | `ContractAbi`       |
| `supportedProvider` | `SupportedProvider` |
| `txDefaults`        | `Partial<TxData>`   |
| `implementation`    | string              |
| `auth`              | string              |

**Returns:** _`Promise<PosterRegistryProxyContract>`_

---

### `Static` deployFrom0xArtifactAsync

▸ **deployFrom0xArtifactAsync**(`artifact`: `ContractArtifact` | `SimpleContractArtifact`, `supportedProvider`: `SupportedProvider`, `txDefaults`: `Partial<TxData>`, `implementation`: string, `auth`: string): _`Promise<PosterRegistryProxyContract>`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/poster_registry_proxy.ts:448

**Parameters:**

| Name                | Type                |
| ------------------- | ------------------- |
| `artifact`          | `ContractArtifact`  | `SimpleContractArtifact` |
| `supportedProvider` | `SupportedProvider` |
| `txDefaults`        | `Partial<TxData>`   |
| `implementation`    | string              |
| `auth`              | string              |

**Returns:** _`Promise<PosterRegistryProxyContract>`_

---

### `Static` strictArgumentEncodingCheck

▸ **strictArgumentEncodingCheck**(`inputAbi`: `DataItem`[], `args`: any[]): _string_

_Inherited from void_

Defined in node_modules/@0x/base-contract/lib/src/index.d.ts:32

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

Defined in node_modules/@kosu/system-contracts/generated-wrappers/poster_registry_proxy.ts:188

### awaitTransactionSuccessAsync

▸ **awaitTransactionSuccessAsync**(`amount`: `BigNumber`, `txData?`: `Partial<TxData>` | number, `pollingIntervalMs?`: number, `timeoutMs?`: number): _`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/poster_registry_proxy.ts:211

**Parameters:**

| Name                 | Type              |
| -------------------- | ----------------- |
| `amount`             | `BigNumber`       |
| `txData?`            | `Partial<TxData>` | number |
| `pollingIntervalMs?` | number            |
| `timeoutMs?`         | number            |

**Returns:** _`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`_

### callAsync

▸ **callAsync**(`amount`: `BigNumber`, `callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): _`Promise<void>`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/poster_registry_proxy.ts:265

**Parameters:**

| Name            | Type                | Default value |
| --------------- | ------------------- | ------------- |
| `amount`        | `BigNumber`         | -             |
| `callData`      | `Partial<CallData>` | {}            |
| `defaultBlock?` | `BlockParam`        | -             |

**Returns:** _`Promise<void>`_

### estimateGasAsync

▸ **estimateGasAsync**(`amount`: `BigNumber`, `txData`: `Partial<TxData>`): _`Promise<number>`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/poster_registry_proxy.ts:239

**Parameters:**

| Name     | Type              | Default value |
| -------- | ----------------- | ------------- |
| `amount` | `BigNumber`       | -             |
| `txData` | `Partial<TxData>` | {}            |

**Returns:** _`Promise<number>`_

### getABIEncodedTransactionData

▸ **getABIEncodedTransactionData**(`amount`: `BigNumber`): _string_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/poster_registry_proxy.ts:257

**Parameters:**

| Name     | Type        |
| -------- | ----------- |
| `amount` | `BigNumber` |

**Returns:** _string_

### sendTransactionAsync

▸ **sendTransactionAsync**(`amount`: `BigNumber`, `txData`: `Partial<TxData>`): _`Promise<string>`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/poster_registry_proxy.ts:189

**Parameters:**

| Name     | Type              | Default value |
| -------- | ----------------- | ------------- |
| `amount` | `BigNumber`       | -             |
| `txData` | `Partial<TxData>` | {}            |

**Returns:** _`Promise<string>`_

---

### releaseTokens

### ■ **releaseTokens**: _object_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/poster_registry_proxy.ts:30

### awaitTransactionSuccessAsync

▸ **awaitTransactionSuccessAsync**(`amount`: `BigNumber`, `txData?`: `Partial<TxData>` | number, `pollingIntervalMs?`: number, `timeoutMs?`: number): _`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/poster_registry_proxy.ts:53

**Parameters:**

| Name                 | Type              |
| -------------------- | ----------------- |
| `amount`             | `BigNumber`       |
| `txData?`            | `Partial<TxData>` | number |
| `pollingIntervalMs?` | number            |
| `timeoutMs?`         | number            |

**Returns:** _`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`_

### callAsync

▸ **callAsync**(`amount`: `BigNumber`, `callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): _`Promise<void>`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/poster_registry_proxy.ts:107

**Parameters:**

| Name            | Type                | Default value |
| --------------- | ------------------- | ------------- |
| `amount`        | `BigNumber`         | -             |
| `callData`      | `Partial<CallData>` | {}            |
| `defaultBlock?` | `BlockParam`        | -             |

**Returns:** _`Promise<void>`_

### estimateGasAsync

▸ **estimateGasAsync**(`amount`: `BigNumber`, `txData`: `Partial<TxData>`): _`Promise<number>`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/poster_registry_proxy.ts:81

**Parameters:**

| Name     | Type              | Default value |
| -------- | ----------------- | ------------- |
| `amount` | `BigNumber`       | -             |
| `txData` | `Partial<TxData>` | {}            |

**Returns:** _`Promise<number>`_

### getABIEncodedTransactionData

▸ **getABIEncodedTransactionData**(`amount`: `BigNumber`): _string_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/poster_registry_proxy.ts:99

**Parameters:**

| Name     | Type        |
| -------- | ----------- |
| `amount` | `BigNumber` |

**Returns:** _string_

### sendTransactionAsync

▸ **sendTransactionAsync**(`amount`: `BigNumber`, `txData`: `Partial<TxData>`): _`Promise<string>`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/poster_registry_proxy.ts:31

**Parameters:**

| Name     | Type              | Default value |
| -------- | ----------------- | ------------- |
| `amount` | `BigNumber`       | -             |
| `txData` | `Partial<TxData>` | {}            |

**Returns:** _`Promise<string>`_

---

### setImplementation

### ■ **setImplementation**: _object_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/poster_registry_proxy.ts:318

### awaitTransactionSuccessAsync

▸ **awaitTransactionSuccessAsync**(`implementation`: string, `txData?`: `Partial<TxData>` | number, `pollingIntervalMs?`: number, `timeoutMs?`: number): _`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/poster_registry_proxy.ts:341

**Parameters:**

| Name                 | Type              |
| -------------------- | ----------------- |
| `implementation`     | string            |
| `txData?`            | `Partial<TxData>` | number |
| `pollingIntervalMs?` | number            |
| `timeoutMs?`         | number            |

**Returns:** _`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`_

### callAsync

▸ **callAsync**(`implementation`: string, `callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): _`Promise<void>`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/poster_registry_proxy.ts:395

**Parameters:**

| Name             | Type                | Default value |
| ---------------- | ------------------- | ------------- |
| `implementation` | string              | -             |
| `callData`       | `Partial<CallData>` | {}            |
| `defaultBlock?`  | `BlockParam`        | -             |

**Returns:** _`Promise<void>`_

### estimateGasAsync

▸ **estimateGasAsync**(`implementation`: string, `txData`: `Partial<TxData>`): _`Promise<number>`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/poster_registry_proxy.ts:369

**Parameters:**

| Name             | Type              | Default value |
| ---------------- | ----------------- | ------------- |
| `implementation` | string            | -             |
| `txData`         | `Partial<TxData>` | {}            |

**Returns:** _`Promise<number>`_

### getABIEncodedTransactionData

▸ **getABIEncodedTransactionData**(`implementation`: string): _string_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/poster_registry_proxy.ts:387

**Parameters:**

| Name             | Type   |
| ---------------- | ------ |
| `implementation` | string |

**Returns:** _string_

### sendTransactionAsync

▸ **sendTransactionAsync**(`implementation`: string, `txData`: `Partial<TxData>`): _`Promise<string>`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/poster_registry_proxy.ts:319

**Parameters:**

| Name             | Type              | Default value |
| ---------------- | ----------------- | ------------- |
| `implementation` | string            | -             |
| `txData`         | `Partial<TxData>` | {}            |

**Returns:** _`Promise<string>`_

---

### token

### ■ **token**: _object_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/poster_registry_proxy.ts:422

### callAsync

▸ **callAsync**(`callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): _`Promise<string>`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/poster_registry_proxy.ts:423

**Parameters:**

| Name            | Type                | Default value |
| --------------- | ------------------- | ------------- |
| `callData`      | `Partial<CallData>` | {}            |
| `defaultBlock?` | `BlockParam`        | -             |

**Returns:** _`Promise<string>`_

---

### tokensContributed

### ■ **tokensContributed**: _object_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/poster_registry_proxy.ts:292

### callAsync

▸ **callAsync**(`callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): _`Promise<BigNumber>`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/poster_registry_proxy.ts:293

**Parameters:**

| Name            | Type                | Default value |
| --------------- | ------------------- | ------------- |
| `callData`      | `Partial<CallData>` | {}            |
| `defaultBlock?` | `BlockParam`        | -             |

**Returns:** _`Promise<BigNumber>`_

---

### tokensRegisteredFor

### ■ **tokensRegisteredFor**: _object_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/poster_registry_proxy.ts:160

### callAsync

▸ **callAsync**(`a`: string, `callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): _`Promise<BigNumber>`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/poster_registry_proxy.ts:161

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

Defined in node_modules/@kosu/system-contracts/generated-wrappers/poster_registry_proxy.ts:134

### callAsync

▸ **callAsync**(`callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): _`Promise<string>`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/poster_registry_proxy.ts:135

**Parameters:**

| Name            | Type                | Default value |
| --------------- | ------------------- | ------------- |
| `callData`      | `Partial<CallData>` | {}            |
| `defaultBlock?` | `BlockParam`        | -             |

**Returns:** _`Promise<string>`_

---
