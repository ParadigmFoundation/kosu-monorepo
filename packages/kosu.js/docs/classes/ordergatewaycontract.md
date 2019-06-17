> ## [kosu.js](../README.md)

[Globals](../globals.md) / [OrderGatewayContract](ordergatewaycontract.md) /

# Class: OrderGatewayContract

## Hierarchy

-   `BaseContract`

    -   **OrderGatewayContract**

### Index

#### Constructors

-   [constructor](ordergatewaycontract.md#constructor)

#### Properties

-   [\_abiEncoderByFunctionSignature](ordergatewaycontract.md#protected-_abiencoderbyfunctionsignature)
-   [\_web3Wrapper](ordergatewaycontract.md#protected-_web3wrapper)
-   [abi](ordergatewaycontract.md#abi)
-   [address](ordergatewaycontract.md#address)
-   [constructorArgs](ordergatewaycontract.md#constructorargs)
-   [contractName](ordergatewaycontract.md#contractname)
-   [txReceipt](ordergatewaycontract.md#optional-txreceipt)

#### Methods

-   [\_lookupAbi](ordergatewaycontract.md#protected-_lookupabi)
-   [\_lookupAbiEncoder](ordergatewaycontract.md#protected-_lookupabiencoder)
-   [\_strictEncodeArguments](ordergatewaycontract.md#protected-_strictencodearguments)
-   [\_applyDefaultsToTxDataAsync](ordergatewaycontract.md#static-protected-_applydefaultstotxdataasync)
-   [\_bigNumberToString](ordergatewaycontract.md#static-protected-_bignumbertostring)
-   [\_formatABIDataItemList](ordergatewaycontract.md#static-protected-_formatabidataitemlist)
-   [\_lookupConstructorAbi](ordergatewaycontract.md#static-protected-_lookupconstructorabi)
-   [\_lowercaseAddress](ordergatewaycontract.md#static-protected-_lowercaseaddress)
-   [\_throwIfRevertWithReasonCallResult](ordergatewaycontract.md#static-protected-_throwifrevertwithreasoncallresult)
-   [deployAsync](ordergatewaycontract.md#static-deployasync)
-   [deployFrom0xArtifactAsync](ordergatewaycontract.md#static-deployfrom0xartifactasync)
-   [strictArgumentEncodingCheck](ordergatewaycontract.md#static-strictargumentencodingcheck)

#### Object literals

-   [amountRemaining](ordergatewaycontract.md#amountremaining)
-   [arguments](ordergatewaycontract.md#arguments)
-   [isValid](ordergatewaycontract.md#isvalid)
-   [participate](ordergatewaycontract.md#participate)

## Constructors

### constructor

\+ **new OrderGatewayContract**(`abi`: `ContractAbi`, `address`: string, `supportedProvider`: `SupportedProvider`, `txDefaults?`: `Partial<TxData>`): _[OrderGatewayContract](ordergatewaycontract.md)_

_Overrides void_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/order_gateway.ts:276

**Parameters:**

| Name                | Type                |
| ------------------- | ------------------- |
| `abi`               | `ContractAbi`       |
| `address`           | string              |
| `supportedProvider` | `SupportedProvider` |
| `txDefaults?`       | `Partial<TxData>`   |

**Returns:** _[OrderGatewayContract](ordergatewaycontract.md)_

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

Defined in node_modules/@kosu/system-contracts/generated-wrappers/order_gateway.ts:29

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

▸ **deployAsync**(`bytecode`: string, `abi`: `ContractAbi`, `supportedProvider`: `SupportedProvider`, `txDefaults`: `Partial<TxData>`): _`Promise<OrderGatewayContract>`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/order_gateway.ts:246

**Parameters:**

| Name                | Type                |
| ------------------- | ------------------- |
| `bytecode`          | string              |
| `abi`               | `ContractAbi`       |
| `supportedProvider` | `SupportedProvider` |
| `txDefaults`        | `Partial<TxData>`   |

**Returns:** _`Promise<OrderGatewayContract>`_

---

### `Static` deployFrom0xArtifactAsync

▸ **deployFrom0xArtifactAsync**(`artifact`: `ContractArtifact` | `SimpleContractArtifact`, `supportedProvider`: `SupportedProvider`, `txDefaults`: `Partial<TxData>`): _`Promise<OrderGatewayContract>`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/order_gateway.ts:233

**Parameters:**

| Name                | Type                |
| ------------------- | ------------------- |
| `artifact`          | `ContractArtifact`  | `SimpleContractArtifact` |
| `supportedProvider` | `SupportedProvider` |
| `txDefaults`        | `Partial<TxData>`   |

**Returns:** _`Promise<OrderGatewayContract>`_

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

### amountRemaining

### ■ **amountRemaining**: _object_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/order_gateway.ts:173

### callAsync

▸ **callAsync**(`subContract`: string, `data`: string, `callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): _`Promise<BigNumber>`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/order_gateway.ts:174

**Parameters:**

| Name            | Type                | Default value |
| --------------- | ------------------- | ------------- |
| `subContract`   | string              | -             |
| `data`          | string              | -             |
| `callData`      | `Partial<CallData>` | {}            |
| `defaultBlock?` | `BlockParam`        | -             |

**Returns:** _`Promise<BigNumber>`_

---

### arguments

### ■ **arguments**: _object_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/order_gateway.ts:145

### callAsync

▸ **callAsync**(`subContract`: string, `callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): _`Promise<string>`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/order_gateway.ts:146

**Parameters:**

| Name            | Type                | Default value |
| --------------- | ------------------- | ------------- |
| `subContract`   | string              | -             |
| `callData`      | `Partial<CallData>` | {}            |
| `defaultBlock?` | `BlockParam`        | -             |

**Returns:** _`Promise<string>`_

---

### isValid

### ■ **isValid**: _object_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/order_gateway.ts:203

### callAsync

▸ **callAsync**(`subContract`: string, `data`: string, `callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): _`Promise<boolean>`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/order_gateway.ts:204

**Parameters:**

| Name            | Type                | Default value |
| --------------- | ------------------- | ------------- |
| `subContract`   | string              | -             |
| `data`          | string              | -             |
| `callData`      | `Partial<CallData>` | {}            |
| `defaultBlock?` | `BlockParam`        | -             |

**Returns:** _`Promise<boolean>`_

---

### participate

### ■ **participate**: _object_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/order_gateway.ts:30

### awaitTransactionSuccessAsync

▸ **awaitTransactionSuccessAsync**(`subContract`: string, `data`: string, `txData?`: `Partial<TxData>` | number, `pollingIntervalMs?`: number, `timeoutMs?`: number): _`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/order_gateway.ts:56

**Parameters:**

| Name                 | Type              |
| -------------------- | ----------------- |
| `subContract`        | string            |
| `data`               | string            |
| `txData?`            | `Partial<TxData>` | number |
| `pollingIntervalMs?` | number            |
| `timeoutMs?`         | number            |

**Returns:** _`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`_

### callAsync

▸ **callAsync**(`subContract`: string, `data`: string, `callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): _`Promise<boolean>`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/order_gateway.ts:116

**Parameters:**

| Name            | Type                | Default value |
| --------------- | ------------------- | ------------- |
| `subContract`   | string              | -             |
| `data`          | string              | -             |
| `callData`      | `Partial<CallData>` | {}            |
| `defaultBlock?` | `BlockParam`        | -             |

**Returns:** _`Promise<boolean>`_

### estimateGasAsync

▸ **estimateGasAsync**(`subContract`: string, `data`: string, `txData`: `Partial<TxData>`): _`Promise<number>`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/order_gateway.ts:86

**Parameters:**

| Name          | Type              | Default value |
| ------------- | ----------------- | ------------- |
| `subContract` | string            | -             |
| `data`        | string            | -             |
| `txData`      | `Partial<TxData>` | {}            |

**Returns:** _`Promise<number>`_

### getABIEncodedTransactionData

▸ **getABIEncodedTransactionData**(`subContract`: string, `data`: string): _string_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/order_gateway.ts:106

**Parameters:**

| Name          | Type   |
| ------------- | ------ |
| `subContract` | string |
| `data`        | string |

**Returns:** _string_

### sendTransactionAsync

▸ **sendTransactionAsync**(`subContract`: string, `data`: string, `txData`: `Partial<TxData>`): _`Promise<string>`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/order_gateway.ts:31

**Parameters:**

| Name          | Type              | Default value |
| ------------- | ----------------- | ------------- |
| `subContract` | string            | -             |
| `data`        | string            | -             |
| `txData`      | `Partial<TxData>` | {}            |

**Returns:** _`Promise<string>`_

---
