> ## [kosu-system-contracts](../README.md)

[Globals](../globals.md) / [AuthorizedAddressesContract](authorizedaddressescontract.md) /

# Class: AuthorizedAddressesContract

## Hierarchy

* `BaseContract`

  * **AuthorizedAddressesContract**

### Index

#### Constructors

* [constructor](authorizedaddressescontract.md#constructor)

#### Properties

* [abi](authorizedaddressescontract.md#abi)
* [address](authorizedaddressescontract.md#address)
* [constructorArgs](authorizedaddressescontract.md#constructorargs)
* [contractName](authorizedaddressescontract.md#contractname)
* [txReceipt](authorizedaddressescontract.md#optional-txreceipt)

#### Methods

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

Defined in generated-wrappers/authorized_addresses.ts:570

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

Defined in generated-wrappers/authorized_addresses.ts:41

___

## Methods

### `Static` deployAsync

▸ **deployAsync**(`bytecode`: string, `abi`: `ContractAbi`, `supportedProvider`: `SupportedProvider`, `txDefaults`: `Partial<TxData>`): *`Promise<AuthorizedAddressesContract>`*

Defined in generated-wrappers/authorized_addresses.ts:540

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

Defined in generated-wrappers/authorized_addresses.ts:527

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

Defined in generated-wrappers/authorized_addresses.ts:42

###  awaitTransactionSuccessAsync

▸ **awaitTransactionSuccessAsync**(`a`: string, `txData?`: `Partial<TxData>` | number, `pollingIntervalMs?`: number, `timeoutMs?`: number): *`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`*

Defined in generated-wrappers/authorized_addresses.ts:65

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

Defined in generated-wrappers/authorized_addresses.ts:119

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`a` | string | - |
`callData` | `Partial<CallData>` |  {} |
`defaultBlock?` | `BlockParam` | - |

**Returns:** *`Promise<void>`*

###  estimateGasAsync

▸ **estimateGasAsync**(`a`: string, `txData`: `Partial<TxData>`): *`Promise<number>`*

Defined in generated-wrappers/authorized_addresses.ts:93

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`a` | string | - |
`txData` | `Partial<TxData>` |  {} |

**Returns:** *`Promise<number>`*

###  getABIEncodedTransactionData

▸ **getABIEncodedTransactionData**(`a`: string): *string*

Defined in generated-wrappers/authorized_addresses.ts:111

**Parameters:**

Name | Type |
------ | ------ |
`a` | string |

**Returns:** *string*

###  sendTransactionAsync

▸ **sendTransactionAsync**(`a`: string, `txData`: `Partial<TxData>`): *`Promise<string>`*

Defined in generated-wrappers/authorized_addresses.ts:43

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`a` | string | - |
`txData` | `Partial<TxData>` |  {} |

**Returns:** *`Promise<string>`*

___

###  isAddressAuthorized

### ■ **isAddressAuthorized**: *object*

Defined in generated-wrappers/authorized_addresses.ts:395

###  callAsync

▸ **callAsync**(`a`: string, `callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): *`Promise<boolean>`*

Defined in generated-wrappers/authorized_addresses.ts:396

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

Defined in generated-wrappers/authorized_addresses.ts:265

###  callAsync

▸ **callAsync**(`callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): *`Promise<boolean>`*

Defined in generated-wrappers/authorized_addresses.ts:266

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`callData` | `Partial<CallData>` |  {} |
`defaultBlock?` | `BlockParam` | - |

**Returns:** *`Promise<boolean>`*

___

###  owner

### ■ **owner**: *object*

Defined in generated-wrappers/authorized_addresses.ts:239

###  callAsync

▸ **callAsync**(`callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): *`Promise<string>`*

Defined in generated-wrappers/authorized_addresses.ts:240

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`callData` | `Partial<CallData>` |  {} |
`defaultBlock?` | `BlockParam` | - |

**Returns:** *`Promise<string>`*

___

###  renounceOwnership

### ■ **renounceOwnership**: *object*

Defined in generated-wrappers/authorized_addresses.ts:146

###  awaitTransactionSuccessAsync

▸ **awaitTransactionSuccessAsync**(`txData?`: `Partial<TxData>` | number, `pollingIntervalMs?`: number, `timeoutMs?`: number): *`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`*

Defined in generated-wrappers/authorized_addresses.ts:166

**Parameters:**

Name | Type |
------ | ------ |
`txData?` | `Partial<TxData>` | number |
`pollingIntervalMs?` | number |
`timeoutMs?` | number |

**Returns:** *`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`*

###  callAsync

▸ **callAsync**(`callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): *`Promise<void>`*

Defined in generated-wrappers/authorized_addresses.ts:214

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`callData` | `Partial<CallData>` |  {} |
`defaultBlock?` | `BlockParam` | - |

**Returns:** *`Promise<void>`*

###  estimateGasAsync

▸ **estimateGasAsync**(`txData`: `Partial<TxData>`): *`Promise<number>`*

Defined in generated-wrappers/authorized_addresses.ts:192

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`txData` | `Partial<TxData>` |  {} |

**Returns:** *`Promise<number>`*

###  getABIEncodedTransactionData

▸ **getABIEncodedTransactionData**(): *string*

Defined in generated-wrappers/authorized_addresses.ts:208

**Returns:** *string*

###  sendTransactionAsync

▸ **sendTransactionAsync**(`txData`: `Partial<TxData>`): *`Promise<string>`*

Defined in generated-wrappers/authorized_addresses.ts:147

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`txData` | `Partial<TxData>` |  {} |

**Returns:** *`Promise<string>`*

___

###  transferOwnership

### ■ **transferOwnership**: *object*

Defined in generated-wrappers/authorized_addresses.ts:423

###  awaitTransactionSuccessAsync

▸ **awaitTransactionSuccessAsync**(`newOwner`: string, `txData?`: `Partial<TxData>` | number, `pollingIntervalMs?`: number, `timeoutMs?`: number): *`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`*

Defined in generated-wrappers/authorized_addresses.ts:446

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

Defined in generated-wrappers/authorized_addresses.ts:500

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`newOwner` | string | - |
`callData` | `Partial<CallData>` |  {} |
`defaultBlock?` | `BlockParam` | - |

**Returns:** *`Promise<void>`*

###  estimateGasAsync

▸ **estimateGasAsync**(`newOwner`: string, `txData`: `Partial<TxData>`): *`Promise<number>`*

Defined in generated-wrappers/authorized_addresses.ts:474

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`newOwner` | string | - |
`txData` | `Partial<TxData>` |  {} |

**Returns:** *`Promise<number>`*

###  getABIEncodedTransactionData

▸ **getABIEncodedTransactionData**(`newOwner`: string): *string*

Defined in generated-wrappers/authorized_addresses.ts:492

**Parameters:**

Name | Type |
------ | ------ |
`newOwner` | string |

**Returns:** *string*

###  sendTransactionAsync

▸ **sendTransactionAsync**(`newOwner`: string, `txData`: `Partial<TxData>`): *`Promise<string>`*

Defined in generated-wrappers/authorized_addresses.ts:424

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`newOwner` | string | - |
`txData` | `Partial<TxData>` |  {} |

**Returns:** *`Promise<string>`*

___

###  unauthorizeAddress

### ■ **unauthorizeAddress**: *object*

Defined in generated-wrappers/authorized_addresses.ts:291

###  awaitTransactionSuccessAsync

▸ **awaitTransactionSuccessAsync**(`a`: string, `txData?`: `Partial<TxData>` | number, `pollingIntervalMs?`: number, `timeoutMs?`: number): *`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`*

Defined in generated-wrappers/authorized_addresses.ts:314

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

Defined in generated-wrappers/authorized_addresses.ts:368

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`a` | string | - |
`callData` | `Partial<CallData>` |  {} |
`defaultBlock?` | `BlockParam` | - |

**Returns:** *`Promise<void>`*

###  estimateGasAsync

▸ **estimateGasAsync**(`a`: string, `txData`: `Partial<TxData>`): *`Promise<number>`*

Defined in generated-wrappers/authorized_addresses.ts:342

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`a` | string | - |
`txData` | `Partial<TxData>` |  {} |

**Returns:** *`Promise<number>`*

###  getABIEncodedTransactionData

▸ **getABIEncodedTransactionData**(`a`: string): *string*

Defined in generated-wrappers/authorized_addresses.ts:360

**Parameters:**

Name | Type |
------ | ------ |
`a` | string |

**Returns:** *string*

###  sendTransactionAsync

▸ **sendTransactionAsync**(`a`: string, `txData`: `Partial<TxData>`): *`Promise<string>`*

Defined in generated-wrappers/authorized_addresses.ts:292

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`a` | string | - |
`txData` | `Partial<TxData>` |  {} |

**Returns:** *`Promise<string>`*

___