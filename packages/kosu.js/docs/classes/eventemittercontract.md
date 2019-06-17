> ## [kosu.js](../README.md)

[Globals](../globals.md) / [EventEmitterContract](eventemittercontract.md) /

# Class: EventEmitterContract

## Hierarchy

-   `BaseContract`

    -   **EventEmitterContract**

### Index

#### Constructors

-   [constructor](eventemittercontract.md#constructor)

#### Properties

-   [\_abiEncoderByFunctionSignature](eventemittercontract.md#protected-_abiencoderbyfunctionsignature)
-   [\_web3Wrapper](eventemittercontract.md#protected-_web3wrapper)
-   [abi](eventemittercontract.md#abi)
-   [address](eventemittercontract.md#address)
-   [constructorArgs](eventemittercontract.md#constructorargs)
-   [contractName](eventemittercontract.md#contractname)
-   [txReceipt](eventemittercontract.md#optional-txreceipt)

#### Methods

-   [\_lookupAbi](eventemittercontract.md#protected-_lookupabi)
-   [\_lookupAbiEncoder](eventemittercontract.md#protected-_lookupabiencoder)
-   [\_strictEncodeArguments](eventemittercontract.md#protected-_strictencodearguments)
-   [\_applyDefaultsToTxDataAsync](eventemittercontract.md#static-protected-_applydefaultstotxdataasync)
-   [\_bigNumberToString](eventemittercontract.md#static-protected-_bignumbertostring)
-   [\_formatABIDataItemList](eventemittercontract.md#static-protected-_formatabidataitemlist)
-   [\_lookupConstructorAbi](eventemittercontract.md#static-protected-_lookupconstructorabi)
-   [\_lowercaseAddress](eventemittercontract.md#static-protected-_lowercaseaddress)
-   [\_throwIfRevertWithReasonCallResult](eventemittercontract.md#static-protected-_throwifrevertwithreasoncallresult)
-   [deployAsync](eventemittercontract.md#static-deployasync)
-   [deployFrom0xArtifactAsync](eventemittercontract.md#static-deployfrom0xartifactasync)
-   [strictArgumentEncodingCheck](eventemittercontract.md#static-strictargumentencodingcheck)

#### Object literals

-   [emitEvent](eventemittercontract.md#emitevent)

## Constructors

### constructor

\+ **new EventEmitterContract**(`abi`: `ContractAbi`, `address`: string, `supportedProvider`: `SupportedProvider`, `txDefaults?`: `Partial<TxData>`): _[EventEmitterContract](eventemittercontract.md)_

_Overrides void_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/event_emitter.ts:219

**Parameters:**

| Name                | Type                |
| ------------------- | ------------------- |
| `abi`               | `ContractAbi`       |
| `address`           | string              |
| `supportedProvider` | `SupportedProvider` |
| `txDefaults?`       | `Partial<TxData>`   |

**Returns:** _[EventEmitterContract](eventemittercontract.md)_

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

Defined in node_modules/@kosu/system-contracts/generated-wrappers/event_emitter.ts:42

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

▸ **deployAsync**(`bytecode`: string, `abi`: `ContractAbi`, `supportedProvider`: `SupportedProvider`, `txDefaults`: `Partial<TxData>`, `auth`: string): _`Promise<EventEmitterContract>`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/event_emitter.ts:184

**Parameters:**

| Name                | Type                |
| ------------------- | ------------------- |
| `bytecode`          | string              |
| `abi`               | `ContractAbi`       |
| `supportedProvider` | `SupportedProvider` |
| `txDefaults`        | `Partial<TxData>`   |
| `auth`              | string              |

**Returns:** _`Promise<EventEmitterContract>`_

---

### `Static` deployFrom0xArtifactAsync

▸ **deployFrom0xArtifactAsync**(`artifact`: `ContractArtifact` | `SimpleContractArtifact`, `supportedProvider`: `SupportedProvider`, `txDefaults`: `Partial<TxData>`, `auth`: string): _`Promise<EventEmitterContract>`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/event_emitter.ts:169

**Parameters:**

| Name                | Type                |
| ------------------- | ------------------- |
| `artifact`          | `ContractArtifact`  | `SimpleContractArtifact` |
| `supportedProvider` | `SupportedProvider` |
| `txDefaults`        | `Partial<TxData>`   |
| `auth`              | string              |

**Returns:** _`Promise<EventEmitterContract>`_

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

### emitEvent

### ■ **emitEvent**: _object_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/event_emitter.ts:43

### awaitTransactionSuccessAsync

▸ **awaitTransactionSuccessAsync**(`eventType`: string, `data`: string[], `stringData`: string, `txData?`: `Partial<TxData>` | number, `pollingIntervalMs?`: number, `timeoutMs?`: number): _`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/event_emitter.ts:72

**Parameters:**

| Name                 | Type              |
| -------------------- | ----------------- |
| `eventType`          | string            |
| `data`               | string[]          |
| `stringData`         | string            |
| `txData?`            | `Partial<TxData>` | number |
| `pollingIntervalMs?` | number            |
| `timeoutMs?`         | number            |

**Returns:** _`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`_

### callAsync

▸ **callAsync**(`eventType`: string, `data`: string[], `stringData`: string, `callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): _`Promise<void>`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/event_emitter.ts:138

**Parameters:**

| Name            | Type                | Default value |
| --------------- | ------------------- | ------------- |
| `eventType`     | string              | -             |
| `data`          | string[]            | -             |
| `stringData`    | string              | -             |
| `callData`      | `Partial<CallData>` | {}            |
| `defaultBlock?` | `BlockParam`        | -             |

**Returns:** _`Promise<void>`_

### estimateGasAsync

▸ **estimateGasAsync**(`eventType`: string, `data`: string[], `stringData`: string, `txData`: `Partial<TxData>`): _`Promise<number>`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/event_emitter.ts:104

**Parameters:**

| Name         | Type              | Default value |
| ------------ | ----------------- | ------------- |
| `eventType`  | string            | -             |
| `data`       | string[]          | -             |
| `stringData` | string            | -             |
| `txData`     | `Partial<TxData>` | {}            |

**Returns:** _`Promise<number>`_

### getABIEncodedTransactionData

▸ **getABIEncodedTransactionData**(`eventType`: string, `data`: string[], `stringData`: string): _string_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/event_emitter.ts:126

**Parameters:**

| Name         | Type     |
| ------------ | -------- |
| `eventType`  | string   |
| `data`       | string[] |
| `stringData` | string   |

**Returns:** _string_

### sendTransactionAsync

▸ **sendTransactionAsync**(`eventType`: string, `data`: string[], `stringData`: string, `txData`: `Partial<TxData>`): _`Promise<string>`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/event_emitter.ts:44

**Parameters:**

| Name         | Type              | Default value |
| ------------ | ----------------- | ------------- |
| `eventType`  | string            | -             |
| `data`       | string[]          | -             |
| `stringData` | string            | -             |
| `txData`     | `Partial<TxData>` | {}            |

**Returns:** _`Promise<string>`_

---
