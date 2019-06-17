> ## [kosu.js](../README.md)

[Globals](../globals.md) / [AuthorizedAddressesContract](authorizedaddressescontract.md) /

# Class: AuthorizedAddressesContract

## Hierarchy

* `BaseContract`

  * **AuthorizedAddressesContract**

### Index

#### Constructors

* [constructor](authorizedaddressescontract.md#constructor)

#### Properties

* [_abiEncoderByFunctionSignature](authorizedaddressescontract.md#protected-_abiencoderbyfunctionsignature)
* [_web3Wrapper](authorizedaddressescontract.md#protected-_web3wrapper)
* [abi](authorizedaddressescontract.md#abi)
* [address](authorizedaddressescontract.md#address)
* [constructorArgs](authorizedaddressescontract.md#constructorargs)
* [contractName](authorizedaddressescontract.md#contractname)
* [txReceipt](authorizedaddressescontract.md#optional-txreceipt)

#### Methods

* [_lookupAbi](authorizedaddressescontract.md#protected-_lookupabi)
* [_lookupAbiEncoder](authorizedaddressescontract.md#protected-_lookupabiencoder)
* [_strictEncodeArguments](authorizedaddressescontract.md#protected-_strictencodearguments)
* [_applyDefaultsToTxDataAsync](authorizedaddressescontract.md#static-protected-_applydefaultstotxdataasync)
* [_bigNumberToString](authorizedaddressescontract.md#static-protected-_bignumbertostring)
* [_formatABIDataItemList](authorizedaddressescontract.md#static-protected-_formatabidataitemlist)
* [_lookupConstructorAbi](authorizedaddressescontract.md#static-protected-_lookupconstructorabi)
* [_lowercaseAddress](authorizedaddressescontract.md#static-protected-_lowercaseaddress)
* [_throwIfRevertWithReasonCallResult](authorizedaddressescontract.md#static-protected-_throwifrevertwithreasoncallresult)
* [deployAsync](authorizedaddressescontract.md#static-deployasync)
* [deployFrom0xArtifactAsync](authorizedaddressescontract.md#static-deployfrom0xartifactasync)
* [strictArgumentEncodingCheck](authorizedaddressescontract.md#static-strictargumentencodingcheck)

#### Object literals

* [authorizeAddress](authorizedaddressescontract.md#authorizeaddress)
* [isAddressAuthorized](authorizedaddressescontract.md#isaddressauthorized)
* [isOwner](authorizedaddressescontract.md#isowner)
* [owner](authorizedaddressescontract.md#owner)
* [renounceOwnership](authorizedaddressescontract.md#renounceownership)
* [transferOwnership](authorizedaddressescontract.md#transferownership)
* [unauthorizeAddress](authorizedaddressescontract.md#unauthorizeaddress)

## Constructors

###  constructor

\+ **new AuthorizedAddressesContract**(`abi`: `ContractAbi`, `address`: string, `supportedProvider`: `SupportedProvider`, `txDefaults?`: `Partial<TxData>`): *[AuthorizedAddressesContract](authorizedaddressescontract.md)*

*Overrides void*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/authorized_addresses.ts:570

**Parameters:**

Name | Type |
------ | ------ |
`abi` | `ContractAbi` |
`address` | string |
`supportedProvider` | `SupportedProvider` |
`txDefaults?` | `Partial<TxData>` |

**Returns:** *[AuthorizedAddressesContract](authorizedaddressescontract.md)*

___

## Properties

### `Protected` _abiEncoderByFunctionSignature

● **_abiEncoderByFunctionSignature**: *`AbiEncoderByFunctionSignature`*

*Inherited from void*

Defined in /Users/hen/GitHub/km/node_modules/@0x/base-contract/lib/src/index.d.ts:20

___

### `Protected` _web3Wrapper

● **_web3Wrapper**: *`Web3Wrapper`*

*Inherited from void*

Defined in /Users/hen/GitHub/km/node_modules/@0x/base-contract/lib/src/index.d.ts:21

___

###  abi

● **abi**: *`ContractAbi`*

*Inherited from void*

Defined in /Users/hen/GitHub/km/node_modules/@0x/base-contract/lib/src/index.d.ts:22

___

###  address

● **address**: *string*

*Inherited from void*

Defined in /Users/hen/GitHub/km/node_modules/@0x/base-contract/lib/src/index.d.ts:23

___

###  constructorArgs

● **constructorArgs**: *any[]*

*Inherited from void*

Defined in /Users/hen/GitHub/km/node_modules/@0x/base-contract/lib/src/index.d.ts:25

___

###  contractName

● **contractName**: *string*

*Inherited from void*

Defined in /Users/hen/GitHub/km/node_modules/@0x/base-contract/lib/src/index.d.ts:24

___

### `Optional` txReceipt

● **txReceipt**? : *`TransactionReceiptWithDecodedLogs`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/authorized_addresses.ts:41

___

## Methods

### `Protected` _lookupAbi

▸ **_lookupAbi**(`functionSignature`: string): *`MethodAbi`*

*Inherited from void*

Defined in /Users/hen/GitHub/km/node_modules/@0x/base-contract/lib/src/index.d.ts:34

**Parameters:**

Name | Type |
------ | ------ |
`functionSignature` | string |

**Returns:** *`MethodAbi`*

___

### `Protected` _lookupAbiEncoder

▸ **_lookupAbiEncoder**(`functionSignature`: string): *`Method`*

*Inherited from void*

Defined in /Users/hen/GitHub/km/node_modules/@0x/base-contract/lib/src/index.d.ts:33

**Parameters:**

Name | Type |
------ | ------ |
`functionSignature` | string |

**Returns:** *`Method`*

___

### `Protected` _strictEncodeArguments

▸ **_strictEncodeArguments**(`functionSignature`: string, `functionArguments`: any): *string*

*Inherited from void*

Defined in /Users/hen/GitHub/km/node_modules/@0x/base-contract/lib/src/index.d.ts:35

**Parameters:**

Name | Type |
------ | ------ |
`functionSignature` | string |
`functionArguments` | any |

**Returns:** *string*

___

### `Static` `Protected` _applyDefaultsToTxDataAsync

▸ **_applyDefaultsToTxDataAsync**<**T**>(`txData`: `T`, `txDefaults`: `Partial<TxData>`, `estimateGasAsync?`: function): *`Promise<TxData>`*

*Inherited from void*

Defined in /Users/hen/GitHub/km/node_modules/@0x/base-contract/lib/src/index.d.ts:30

**Type parameters:**

■` T`: *`Partial<TxData | TxDataPayable>`*

**Parameters:**

■` txData`: *`T`*

■` txDefaults`: *`Partial<TxData>`*

■` estimateGasAsync`: *function*

▸ (`txData`: `T`): *`Promise<number>`*

**Parameters:**

Name | Type |
------ | ------ |
`txData` | `T` |

**Returns:** *`Promise<TxData>`*

___

### `Static` `Protected` _bigNumberToString

▸ **_bigNumberToString**(`_type`: string, `value`: any): *any*

*Inherited from void*

Defined in /Users/hen/GitHub/km/node_modules/@0x/base-contract/lib/src/index.d.ts:28

**Parameters:**

Name | Type |
------ | ------ |
`_type` | string |
`value` | any |

**Returns:** *any*

___

### `Static` `Protected` _formatABIDataItemList

▸ **_formatABIDataItemList**(`abis`: `DataItem`[], `values`: any[], `formatter`: function): *any*

*Inherited from void*

Defined in /Users/hen/GitHub/km/node_modules/@0x/base-contract/lib/src/index.d.ts:26

**Parameters:**

■` abis`: *`DataItem`[]*

■` values`: *any[]*

■` formatter`: *function*

▸ (`type`: string, `value`: any): *any*

**Parameters:**

Name | Type |
------ | ------ |
`type` | string |
`value` | any |

**Returns:** *any*

___

### `Static` `Protected` _lookupConstructorAbi

▸ **_lookupConstructorAbi**(`abi`: `ContractAbi`): *`ConstructorAbi`*

*Inherited from void*

Defined in /Users/hen/GitHub/km/node_modules/@0x/base-contract/lib/src/index.d.ts:29

**Parameters:**

Name | Type |
------ | ------ |
`abi` | `ContractAbi` |

**Returns:** *`ConstructorAbi`*

___

### `Static` `Protected` _lowercaseAddress

▸ **_lowercaseAddress**(`type`: string, `value`: string): *string*

*Inherited from void*

Defined in /Users/hen/GitHub/km/node_modules/@0x/base-contract/lib/src/index.d.ts:27

**Parameters:**

Name | Type |
------ | ------ |
`type` | string |
`value` | string |

**Returns:** *string*

___

### `Static` `Protected` _throwIfRevertWithReasonCallResult

▸ **_throwIfRevertWithReasonCallResult**(`rawCallResult`: string): *void*

*Inherited from void*

Defined in /Users/hen/GitHub/km/node_modules/@0x/base-contract/lib/src/index.d.ts:31

**Parameters:**

Name | Type |
------ | ------ |
`rawCallResult` | string |

**Returns:** *void*

___

### `Static` deployAsync

▸ **deployAsync**(`bytecode`: string, `abi`: `ContractAbi`, `supportedProvider`: `SupportedProvider`, `txDefaults`: `Partial<TxData>`): *`Promise<AuthorizedAddressesContract>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/authorized_addresses.ts:540

**Parameters:**

Name | Type |
------ | ------ |
`bytecode` | string |
`abi` | `ContractAbi` |
`supportedProvider` | `SupportedProvider` |
`txDefaults` | `Partial<TxData>` |

**Returns:** *`Promise<AuthorizedAddressesContract>`*

___

### `Static` deployFrom0xArtifactAsync

▸ **deployFrom0xArtifactAsync**(`artifact`: `ContractArtifact` | `SimpleContractArtifact`, `supportedProvider`: `SupportedProvider`, `txDefaults`: `Partial<TxData>`): *`Promise<AuthorizedAddressesContract>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/authorized_addresses.ts:527

**Parameters:**

Name | Type |
------ | ------ |
`artifact` | `ContractArtifact` | `SimpleContractArtifact` |
`supportedProvider` | `SupportedProvider` |
`txDefaults` | `Partial<TxData>` |

**Returns:** *`Promise<AuthorizedAddressesContract>`*

___

### `Static` strictArgumentEncodingCheck

▸ **strictArgumentEncodingCheck**(`inputAbi`: `DataItem`[], `args`: any[]): *string*

*Inherited from void*

Defined in /Users/hen/GitHub/km/node_modules/@0x/base-contract/lib/src/index.d.ts:32

**Parameters:**

Name | Type |
------ | ------ |
`inputAbi` | `DataItem`[] |
`args` | any[] |

**Returns:** *string*

___

## Object literals

###  authorizeAddress

### ■ **authorizeAddress**: *object*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/authorized_addresses.ts:42

###  awaitTransactionSuccessAsync

▸ **awaitTransactionSuccessAsync**(`a`: string, `txData?`: `Partial<TxData>` | number, `pollingIntervalMs?`: number, `timeoutMs?`: number): *`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/authorized_addresses.ts:65

**Parameters:**

Name | Type |
------ | ------ |
`a` | string |
`txData?` | `Partial<TxData>` | number |
`pollingIntervalMs?` | number |
`timeoutMs?` | number |

**Returns:** *`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`*

###  callAsync

▸ **callAsync**(`a`: string, `callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): *`Promise<void>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/authorized_addresses.ts:119

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`a` | string | - |
`callData` | `Partial<CallData>` |  {} |
`defaultBlock?` | `BlockParam` | - |

**Returns:** *`Promise<void>`*

###  estimateGasAsync

▸ **estimateGasAsync**(`a`: string, `txData`: `Partial<TxData>`): *`Promise<number>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/authorized_addresses.ts:93

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`a` | string | - |
`txData` | `Partial<TxData>` |  {} |

**Returns:** *`Promise<number>`*

###  getABIEncodedTransactionData

▸ **getABIEncodedTransactionData**(`a`: string): *string*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/authorized_addresses.ts:111

**Parameters:**

Name | Type |
------ | ------ |
`a` | string |

**Returns:** *string*

###  sendTransactionAsync

▸ **sendTransactionAsync**(`a`: string, `txData`: `Partial<TxData>`): *`Promise<string>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/authorized_addresses.ts:43

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`a` | string | - |
`txData` | `Partial<TxData>` |  {} |

**Returns:** *`Promise<string>`*

___

###  isAddressAuthorized

### ■ **isAddressAuthorized**: *object*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/authorized_addresses.ts:395

###  callAsync

▸ **callAsync**(`a`: string, `callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): *`Promise<boolean>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/authorized_addresses.ts:396

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`a` | string | - |
`callData` | `Partial<CallData>` |  {} |
`defaultBlock?` | `BlockParam` | - |

**Returns:** *`Promise<boolean>`*

___

###  isOwner

### ■ **isOwner**: *object*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/authorized_addresses.ts:265

###  callAsync

▸ **callAsync**(`callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): *`Promise<boolean>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/authorized_addresses.ts:266

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`callData` | `Partial<CallData>` |  {} |
`defaultBlock?` | `BlockParam` | - |

**Returns:** *`Promise<boolean>`*

___

###  owner

### ■ **owner**: *object*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/authorized_addresses.ts:239

###  callAsync

▸ **callAsync**(`callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): *`Promise<string>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/authorized_addresses.ts:240

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`callData` | `Partial<CallData>` |  {} |
`defaultBlock?` | `BlockParam` | - |

**Returns:** *`Promise<string>`*

___

###  renounceOwnership

### ■ **renounceOwnership**: *object*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/authorized_addresses.ts:146

###  awaitTransactionSuccessAsync

▸ **awaitTransactionSuccessAsync**(`txData?`: `Partial<TxData>` | number, `pollingIntervalMs?`: number, `timeoutMs?`: number): *`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/authorized_addresses.ts:166

**Parameters:**

Name | Type |
------ | ------ |
`txData?` | `Partial<TxData>` | number |
`pollingIntervalMs?` | number |
`timeoutMs?` | number |

**Returns:** *`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`*

###  callAsync

▸ **callAsync**(`callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): *`Promise<void>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/authorized_addresses.ts:214

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`callData` | `Partial<CallData>` |  {} |
`defaultBlock?` | `BlockParam` | - |

**Returns:** *`Promise<void>`*

###  estimateGasAsync

▸ **estimateGasAsync**(`txData`: `Partial<TxData>`): *`Promise<number>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/authorized_addresses.ts:192

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`txData` | `Partial<TxData>` |  {} |

**Returns:** *`Promise<number>`*

###  getABIEncodedTransactionData

▸ **getABIEncodedTransactionData**(): *string*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/authorized_addresses.ts:208

**Returns:** *string*

###  sendTransactionAsync

▸ **sendTransactionAsync**(`txData`: `Partial<TxData>`): *`Promise<string>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/authorized_addresses.ts:147

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`txData` | `Partial<TxData>` |  {} |

**Returns:** *`Promise<string>`*

___

###  transferOwnership

### ■ **transferOwnership**: *object*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/authorized_addresses.ts:423

###  awaitTransactionSuccessAsync

▸ **awaitTransactionSuccessAsync**(`newOwner`: string, `txData?`: `Partial<TxData>` | number, `pollingIntervalMs?`: number, `timeoutMs?`: number): *`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/authorized_addresses.ts:446

**Parameters:**

Name | Type |
------ | ------ |
`newOwner` | string |
`txData?` | `Partial<TxData>` | number |
`pollingIntervalMs?` | number |
`timeoutMs?` | number |

**Returns:** *`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`*

###  callAsync

▸ **callAsync**(`newOwner`: string, `callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): *`Promise<void>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/authorized_addresses.ts:500

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`newOwner` | string | - |
`callData` | `Partial<CallData>` |  {} |
`defaultBlock?` | `BlockParam` | - |

**Returns:** *`Promise<void>`*

###  estimateGasAsync

▸ **estimateGasAsync**(`newOwner`: string, `txData`: `Partial<TxData>`): *`Promise<number>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/authorized_addresses.ts:474

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`newOwner` | string | - |
`txData` | `Partial<TxData>` |  {} |

**Returns:** *`Promise<number>`*

###  getABIEncodedTransactionData

▸ **getABIEncodedTransactionData**(`newOwner`: string): *string*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/authorized_addresses.ts:492

**Parameters:**

Name | Type |
------ | ------ |
`newOwner` | string |

**Returns:** *string*

###  sendTransactionAsync

▸ **sendTransactionAsync**(`newOwner`: string, `txData`: `Partial<TxData>`): *`Promise<string>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/authorized_addresses.ts:424

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`newOwner` | string | - |
`txData` | `Partial<TxData>` |  {} |

**Returns:** *`Promise<string>`*

___

###  unauthorizeAddress

### ■ **unauthorizeAddress**: *object*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/authorized_addresses.ts:291

###  awaitTransactionSuccessAsync

▸ **awaitTransactionSuccessAsync**(`a`: string, `txData?`: `Partial<TxData>` | number, `pollingIntervalMs?`: number, `timeoutMs?`: number): *`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/authorized_addresses.ts:314

**Parameters:**

Name | Type |
------ | ------ |
`a` | string |
`txData?` | `Partial<TxData>` | number |
`pollingIntervalMs?` | number |
`timeoutMs?` | number |

**Returns:** *`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`*

###  callAsync

▸ **callAsync**(`a`: string, `callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): *`Promise<void>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/authorized_addresses.ts:368

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`a` | string | - |
`callData` | `Partial<CallData>` |  {} |
`defaultBlock?` | `BlockParam` | - |

**Returns:** *`Promise<void>`*

###  estimateGasAsync

▸ **estimateGasAsync**(`a`: string, `txData`: `Partial<TxData>`): *`Promise<number>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/authorized_addresses.ts:342

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`a` | string | - |
`txData` | `Partial<TxData>` |  {} |

**Returns:** *`Promise<number>`*

###  getABIEncodedTransactionData

▸ **getABIEncodedTransactionData**(`a`: string): *string*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/authorized_addresses.ts:360

**Parameters:**

Name | Type |
------ | ------ |
`a` | string |

**Returns:** *string*

###  sendTransactionAsync

▸ **sendTransactionAsync**(`a`: string, `txData`: `Partial<TxData>`): *`Promise<string>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/authorized_addresses.ts:292

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`a` | string | - |
`txData` | `Partial<TxData>` |  {} |

**Returns:** *`Promise<string>`*

___