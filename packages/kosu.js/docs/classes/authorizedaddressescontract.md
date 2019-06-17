> ## [kosu.js](../README.md)

[Globals](../globals.md) / [AuthorizedAddressesContract](authorizedaddressescontract.md) /

# Class: AuthorizedAddressesContract

## Hierarchy

-   `BaseContract`

    -   **AuthorizedAddressesContract**

### Index

#### Constructors

-   [constructor](authorizedaddressescontract.md#constructor)

#### Properties

-   [\_abiEncoderByFunctionSignature](authorizedaddressescontract.md#protected-_abiencoderbyfunctionsignature)
-   [\_web3Wrapper](authorizedaddressescontract.md#protected-_web3wrapper)
-   [abi](authorizedaddressescontract.md#abi)
-   [address](authorizedaddressescontract.md#address)
-   [constructorArgs](authorizedaddressescontract.md#constructorargs)
-   [contractName](authorizedaddressescontract.md#contractname)
-   [txReceipt](authorizedaddressescontract.md#optional-txreceipt)

#### Methods

-   [\_lookupAbi](authorizedaddressescontract.md#protected-_lookupabi)
-   [\_lookupAbiEncoder](authorizedaddressescontract.md#protected-_lookupabiencoder)
-   [\_strictEncodeArguments](authorizedaddressescontract.md#protected-_strictencodearguments)
-   [\_applyDefaultsToTxDataAsync](authorizedaddressescontract.md#static-protected-_applydefaultstotxdataasync)
-   [\_bigNumberToString](authorizedaddressescontract.md#static-protected-_bignumbertostring)
-   [\_formatABIDataItemList](authorizedaddressescontract.md#static-protected-_formatabidataitemlist)
-   [\_lookupConstructorAbi](authorizedaddressescontract.md#static-protected-_lookupconstructorabi)
-   [\_lowercaseAddress](authorizedaddressescontract.md#static-protected-_lowercaseaddress)
-   [\_throwIfRevertWithReasonCallResult](authorizedaddressescontract.md#static-protected-_throwifrevertwithreasoncallresult)
-   [deployAsync](authorizedaddressescontract.md#static-deployasync)
-   [deployFrom0xArtifactAsync](authorizedaddressescontract.md#static-deployfrom0xartifactasync)
-   [strictArgumentEncodingCheck](authorizedaddressescontract.md#static-strictargumentencodingcheck)

#### Object literals

-   [authorizeAddress](authorizedaddressescontract.md#authorizeaddress)
-   [isAddressAuthorized](authorizedaddressescontract.md#isaddressauthorized)
-   [isOwner](authorizedaddressescontract.md#isowner)
-   [owner](authorizedaddressescontract.md#owner)
-   [renounceOwnership](authorizedaddressescontract.md#renounceownership)
-   [transferOwnership](authorizedaddressescontract.md#transferownership)
-   [unauthorizeAddress](authorizedaddressescontract.md#unauthorizeaddress)

## Constructors

### constructor

\+ **new AuthorizedAddressesContract**(`abi`: `ContractAbi`, `address`: string, `supportedProvider`: `SupportedProvider`, `txDefaults?`: `Partial<TxData>`): _[AuthorizedAddressesContract](authorizedaddressescontract.md)_

_Overrides void_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/authorized_addresses.ts:570

**Parameters:**

| Name                | Type                |
| ------------------- | ------------------- |
| `abi`               | `ContractAbi`       |
| `address`           | string              |
| `supportedProvider` | `SupportedProvider` |
| `txDefaults?`       | `Partial<TxData>`   |

**Returns:** _[AuthorizedAddressesContract](authorizedaddressescontract.md)_

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

Defined in node_modules/@kosu/system-contracts/generated-wrappers/authorized_addresses.ts:41

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

▸ **deployAsync**(`bytecode`: string, `abi`: `ContractAbi`, `supportedProvider`: `SupportedProvider`, `txDefaults`: `Partial<TxData>`): _`Promise<AuthorizedAddressesContract>`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/authorized_addresses.ts:540

**Parameters:**

| Name                | Type                |
| ------------------- | ------------------- |
| `bytecode`          | string              |
| `abi`               | `ContractAbi`       |
| `supportedProvider` | `SupportedProvider` |
| `txDefaults`        | `Partial<TxData>`   |

**Returns:** _`Promise<AuthorizedAddressesContract>`_

---

### `Static` deployFrom0xArtifactAsync

▸ **deployFrom0xArtifactAsync**(`artifact`: `ContractArtifact` | `SimpleContractArtifact`, `supportedProvider`: `SupportedProvider`, `txDefaults`: `Partial<TxData>`): _`Promise<AuthorizedAddressesContract>`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/authorized_addresses.ts:527

**Parameters:**

| Name                | Type                |
| ------------------- | ------------------- |
| `artifact`          | `ContractArtifact`  | `SimpleContractArtifact` |
| `supportedProvider` | `SupportedProvider` |
| `txDefaults`        | `Partial<TxData>`   |

**Returns:** _`Promise<AuthorizedAddressesContract>`_

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

### authorizeAddress

### ■ **authorizeAddress**: _object_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/authorized_addresses.ts:42

### awaitTransactionSuccessAsync

▸ **awaitTransactionSuccessAsync**(`a`: string, `txData?`: `Partial<TxData>` | number, `pollingIntervalMs?`: number, `timeoutMs?`: number): _`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/authorized_addresses.ts:65

**Parameters:**

| Name                 | Type              |
| -------------------- | ----------------- |
| `a`                  | string            |
| `txData?`            | `Partial<TxData>` | number |
| `pollingIntervalMs?` | number            |
| `timeoutMs?`         | number            |

**Returns:** _`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`_

### callAsync

▸ **callAsync**(`a`: string, `callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): _`Promise<void>`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/authorized_addresses.ts:119

**Parameters:**

| Name            | Type                | Default value |
| --------------- | ------------------- | ------------- |
| `a`             | string              | -             |
| `callData`      | `Partial<CallData>` | {}            |
| `defaultBlock?` | `BlockParam`        | -             |

**Returns:** _`Promise<void>`_

### estimateGasAsync

▸ **estimateGasAsync**(`a`: string, `txData`: `Partial<TxData>`): _`Promise<number>`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/authorized_addresses.ts:93

**Parameters:**

| Name     | Type              | Default value |
| -------- | ----------------- | ------------- |
| `a`      | string            | -             |
| `txData` | `Partial<TxData>` | {}            |

**Returns:** _`Promise<number>`_

### getABIEncodedTransactionData

▸ **getABIEncodedTransactionData**(`a`: string): _string_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/authorized_addresses.ts:111

**Parameters:**

| Name | Type   |
| ---- | ------ |
| `a`  | string |

**Returns:** _string_

### sendTransactionAsync

▸ **sendTransactionAsync**(`a`: string, `txData`: `Partial<TxData>`): _`Promise<string>`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/authorized_addresses.ts:43

**Parameters:**

| Name     | Type              | Default value |
| -------- | ----------------- | ------------- |
| `a`      | string            | -             |
| `txData` | `Partial<TxData>` | {}            |

**Returns:** _`Promise<string>`_

---

### isAddressAuthorized

### ■ **isAddressAuthorized**: _object_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/authorized_addresses.ts:395

### callAsync

▸ **callAsync**(`a`: string, `callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): _`Promise<boolean>`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/authorized_addresses.ts:396

**Parameters:**

| Name            | Type                | Default value |
| --------------- | ------------------- | ------------- |
| `a`             | string              | -             |
| `callData`      | `Partial<CallData>` | {}            |
| `defaultBlock?` | `BlockParam`        | -             |

**Returns:** _`Promise<boolean>`_

---

### isOwner

### ■ **isOwner**: _object_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/authorized_addresses.ts:265

### callAsync

▸ **callAsync**(`callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): _`Promise<boolean>`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/authorized_addresses.ts:266

**Parameters:**

| Name            | Type                | Default value |
| --------------- | ------------------- | ------------- |
| `callData`      | `Partial<CallData>` | {}            |
| `defaultBlock?` | `BlockParam`        | -             |

**Returns:** _`Promise<boolean>`_

---

### owner

### ■ **owner**: _object_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/authorized_addresses.ts:239

### callAsync

▸ **callAsync**(`callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): _`Promise<string>`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/authorized_addresses.ts:240

**Parameters:**

| Name            | Type                | Default value |
| --------------- | ------------------- | ------------- |
| `callData`      | `Partial<CallData>` | {}            |
| `defaultBlock?` | `BlockParam`        | -             |

**Returns:** _`Promise<string>`_

---

### renounceOwnership

### ■ **renounceOwnership**: _object_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/authorized_addresses.ts:146

### awaitTransactionSuccessAsync

▸ **awaitTransactionSuccessAsync**(`txData?`: `Partial<TxData>` | number, `pollingIntervalMs?`: number, `timeoutMs?`: number): _`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/authorized_addresses.ts:166

**Parameters:**

| Name                 | Type              |
| -------------------- | ----------------- |
| `txData?`            | `Partial<TxData>` | number |
| `pollingIntervalMs?` | number            |
| `timeoutMs?`         | number            |

**Returns:** _`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`_

### callAsync

▸ **callAsync**(`callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): _`Promise<void>`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/authorized_addresses.ts:214

**Parameters:**

| Name            | Type                | Default value |
| --------------- | ------------------- | ------------- |
| `callData`      | `Partial<CallData>` | {}            |
| `defaultBlock?` | `BlockParam`        | -             |

**Returns:** _`Promise<void>`_

### estimateGasAsync

▸ **estimateGasAsync**(`txData`: `Partial<TxData>`): _`Promise<number>`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/authorized_addresses.ts:192

**Parameters:**

| Name     | Type              | Default value |
| -------- | ----------------- | ------------- |
| `txData` | `Partial<TxData>` | {}            |

**Returns:** _`Promise<number>`_

### getABIEncodedTransactionData

▸ **getABIEncodedTransactionData**(): _string_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/authorized_addresses.ts:208

**Returns:** _string_

### sendTransactionAsync

▸ **sendTransactionAsync**(`txData`: `Partial<TxData>`): _`Promise<string>`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/authorized_addresses.ts:147

**Parameters:**

| Name     | Type              | Default value |
| -------- | ----------------- | ------------- |
| `txData` | `Partial<TxData>` | {}            |

**Returns:** _`Promise<string>`_

---

### transferOwnership

### ■ **transferOwnership**: _object_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/authorized_addresses.ts:423

### awaitTransactionSuccessAsync

▸ **awaitTransactionSuccessAsync**(`newOwner`: string, `txData?`: `Partial<TxData>` | number, `pollingIntervalMs?`: number, `timeoutMs?`: number): _`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/authorized_addresses.ts:446

**Parameters:**

| Name                 | Type              |
| -------------------- | ----------------- |
| `newOwner`           | string            |
| `txData?`            | `Partial<TxData>` | number |
| `pollingIntervalMs?` | number            |
| `timeoutMs?`         | number            |

**Returns:** _`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`_

### callAsync

▸ **callAsync**(`newOwner`: string, `callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): _`Promise<void>`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/authorized_addresses.ts:500

**Parameters:**

| Name            | Type                | Default value |
| --------------- | ------------------- | ------------- |
| `newOwner`      | string              | -             |
| `callData`      | `Partial<CallData>` | {}            |
| `defaultBlock?` | `BlockParam`        | -             |

**Returns:** _`Promise<void>`_

### estimateGasAsync

▸ **estimateGasAsync**(`newOwner`: string, `txData`: `Partial<TxData>`): _`Promise<number>`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/authorized_addresses.ts:474

**Parameters:**

| Name       | Type              | Default value |
| ---------- | ----------------- | ------------- |
| `newOwner` | string            | -             |
| `txData`   | `Partial<TxData>` | {}            |

**Returns:** _`Promise<number>`_

### getABIEncodedTransactionData

▸ **getABIEncodedTransactionData**(`newOwner`: string): _string_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/authorized_addresses.ts:492

**Parameters:**

| Name       | Type   |
| ---------- | ------ |
| `newOwner` | string |

**Returns:** _string_

### sendTransactionAsync

▸ **sendTransactionAsync**(`newOwner`: string, `txData`: `Partial<TxData>`): _`Promise<string>`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/authorized_addresses.ts:424

**Parameters:**

| Name       | Type              | Default value |
| ---------- | ----------------- | ------------- |
| `newOwner` | string            | -             |
| `txData`   | `Partial<TxData>` | {}            |

**Returns:** _`Promise<string>`_

---

### unauthorizeAddress

### ■ **unauthorizeAddress**: _object_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/authorized_addresses.ts:291

### awaitTransactionSuccessAsync

▸ **awaitTransactionSuccessAsync**(`a`: string, `txData?`: `Partial<TxData>` | number, `pollingIntervalMs?`: number, `timeoutMs?`: number): _`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/authorized_addresses.ts:314

**Parameters:**

| Name                 | Type              |
| -------------------- | ----------------- |
| `a`                  | string            |
| `txData?`            | `Partial<TxData>` | number |
| `pollingIntervalMs?` | number            |
| `timeoutMs?`         | number            |

**Returns:** _`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`_

### callAsync

▸ **callAsync**(`a`: string, `callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): _`Promise<void>`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/authorized_addresses.ts:368

**Parameters:**

| Name            | Type                | Default value |
| --------------- | ------------------- | ------------- |
| `a`             | string              | -             |
| `callData`      | `Partial<CallData>` | {}            |
| `defaultBlock?` | `BlockParam`        | -             |

**Returns:** _`Promise<void>`_

### estimateGasAsync

▸ **estimateGasAsync**(`a`: string, `txData`: `Partial<TxData>`): _`Promise<number>`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/authorized_addresses.ts:342

**Parameters:**

| Name     | Type              | Default value |
| -------- | ----------------- | ------------- |
| `a`      | string            | -             |
| `txData` | `Partial<TxData>` | {}            |

**Returns:** _`Promise<number>`_

### getABIEncodedTransactionData

▸ **getABIEncodedTransactionData**(`a`: string): _string_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/authorized_addresses.ts:360

**Parameters:**

| Name | Type   |
| ---- | ------ |
| `a`  | string |

**Returns:** _string_

### sendTransactionAsync

▸ **sendTransactionAsync**(`a`: string, `txData`: `Partial<TxData>`): _`Promise<string>`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/authorized_addresses.ts:292

**Parameters:**

| Name     | Type              | Default value |
| -------- | ----------------- | ------------- |
| `a`      | string            | -             |
| `txData` | `Partial<TxData>` | {}            |

**Returns:** _`Promise<string>`_

---
