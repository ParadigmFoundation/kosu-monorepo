> ## [@kosu/system-contracts](../README.md)

[Globals](../globals.md) / [KosuTokenContract](kosutokencontract.md) /

# Class: KosuTokenContract

## Hierarchy

* `BaseContract`

  * **KosuTokenContract**

### Index

#### Constructors

* [constructor](kosutokencontract.md#constructor)

#### Properties

* [_abiEncoderByFunctionSignature](kosutokencontract.md#protected-_abiencoderbyfunctionsignature)
* [_web3Wrapper](kosutokencontract.md#protected-_web3wrapper)
* [abi](kosutokencontract.md#abi)
* [address](kosutokencontract.md#address)
* [constructorArgs](kosutokencontract.md#constructorargs)
* [contractName](kosutokencontract.md#contractname)
* [txReceipt](kosutokencontract.md#optional-txreceipt)

#### Methods

* [_lookupAbi](kosutokencontract.md#protected-_lookupabi)
* [_lookupAbiEncoder](kosutokencontract.md#protected-_lookupabiencoder)
* [_strictEncodeArguments](kosutokencontract.md#protected-_strictencodearguments)
* [_applyDefaultsToTxDataAsync](kosutokencontract.md#static-protected-_applydefaultstotxdataasync)
* [_bigNumberToString](kosutokencontract.md#static-protected-_bignumbertostring)
* [_formatABIDataItemList](kosutokencontract.md#static-protected-_formatabidataitemlist)
* [_lookupConstructorAbi](kosutokencontract.md#static-protected-_lookupconstructorabi)
* [_lowercaseAddress](kosutokencontract.md#static-protected-_lowercaseaddress)
* [_throwIfRevertWithReasonCallResult](kosutokencontract.md#static-protected-_throwifrevertwithreasoncallresult)
* [deployAsync](kosutokencontract.md#static-deployasync)
* [deployFrom0xArtifactAsync](kosutokencontract.md#static-deployfrom0xartifactasync)
* [strictArgumentEncodingCheck](kosutokencontract.md#static-strictargumentencodingcheck)

#### Object literals

* [allowance](kosutokencontract.md#allowance)
* [approve](kosutokencontract.md#approve)
* [balanceOf](kosutokencontract.md#balanceof)
* [burn](kosutokencontract.md#burn)
* [decimals](kosutokencontract.md#decimals)
* [decreaseAllowance](kosutokencontract.md#decreaseallowance)
* [increaseAllowance](kosutokencontract.md#increaseallowance)
* [mint](kosutokencontract.md#mint)
* [mintTo](kosutokencontract.md#mintto)
* [name](kosutokencontract.md#name)
* [symbol](kosutokencontract.md#symbol)
* [totalSupply](kosutokencontract.md#totalsupply)
* [transfer](kosutokencontract.md#transfer)
* [transferFrom](kosutokencontract.md#transferfrom)

## Constructors

###  constructor

\+ **new KosuTokenContract**(`abi`: `ContractAbi`, `address`: string, `supportedProvider`: `SupportedProvider`, `txDefaults?`: `Partial<TxData>`): *[KosuTokenContract](kosutokencontract.md)*

*Overrides void*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/kosu_token.ts:1172

**Parameters:**

Name | Type |
------ | ------ |
`abi` | `ContractAbi` |
`address` | string |
`supportedProvider` | `SupportedProvider` |
`txDefaults?` | `Partial<TxData>` |

**Returns:** *[KosuTokenContract](kosutokencontract.md)*

___

## Properties

### `Protected` _abiEncoderByFunctionSignature

● **_abiEncoderByFunctionSignature**: *`AbiEncoderByFunctionSignature`*

*Inherited from void*

Defined in node_modules/@0x/base-contract/lib/src/index.d.ts:20

___

### `Protected` _web3Wrapper

● **_web3Wrapper**: *`Web3Wrapper`*

*Inherited from void*

Defined in node_modules/@0x/base-contract/lib/src/index.d.ts:21

___

###  abi

● **abi**: *`ContractAbi`*

*Inherited from void*

Defined in node_modules/@0x/base-contract/lib/src/index.d.ts:22

___

###  address

● **address**: *string*

*Inherited from void*

Defined in node_modules/@0x/base-contract/lib/src/index.d.ts:23

___

###  constructorArgs

● **constructorArgs**: *any[]*

*Inherited from void*

Defined in node_modules/@0x/base-contract/lib/src/index.d.ts:25

___

###  contractName

● **contractName**: *string*

*Inherited from void*

Defined in node_modules/@0x/base-contract/lib/src/index.d.ts:24

___

### `Optional` txReceipt

● **txReceipt**? : *`TransactionReceiptWithDecodedLogs`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/kosu_token.ts:50

___

## Methods

### `Protected` _lookupAbi

▸ **_lookupAbi**(`functionSignature`: string): *`MethodAbi`*

*Inherited from void*

Defined in node_modules/@0x/base-contract/lib/src/index.d.ts:34

**Parameters:**

Name | Type |
------ | ------ |
`functionSignature` | string |

**Returns:** *`MethodAbi`*

___

### `Protected` _lookupAbiEncoder

▸ **_lookupAbiEncoder**(`functionSignature`: string): *`Method`*

*Inherited from void*

Defined in node_modules/@0x/base-contract/lib/src/index.d.ts:33

**Parameters:**

Name | Type |
------ | ------ |
`functionSignature` | string |

**Returns:** *`Method`*

___

### `Protected` _strictEncodeArguments

▸ **_strictEncodeArguments**(`functionSignature`: string, `functionArguments`: any): *string*

*Inherited from void*

Defined in node_modules/@0x/base-contract/lib/src/index.d.ts:35

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

Defined in node_modules/@0x/base-contract/lib/src/index.d.ts:30

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

Defined in node_modules/@0x/base-contract/lib/src/index.d.ts:28

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

Defined in node_modules/@0x/base-contract/lib/src/index.d.ts:26

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

Defined in node_modules/@0x/base-contract/lib/src/index.d.ts:29

**Parameters:**

Name | Type |
------ | ------ |
`abi` | `ContractAbi` |

**Returns:** *`ConstructorAbi`*

___

### `Static` `Protected` _lowercaseAddress

▸ **_lowercaseAddress**(`type`: string, `value`: string): *string*

*Inherited from void*

Defined in node_modules/@0x/base-contract/lib/src/index.d.ts:27

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

Defined in node_modules/@0x/base-contract/lib/src/index.d.ts:31

**Parameters:**

Name | Type |
------ | ------ |
`rawCallResult` | string |

**Returns:** *void*

___

### `Static` deployAsync

▸ **deployAsync**(`bytecode`: string, `abi`: `ContractAbi`, `supportedProvider`: `SupportedProvider`, `txDefaults`: `Partial<TxData>`, `_auth`: string): *`Promise<KosuTokenContract>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/kosu_token.ts:1137

**Parameters:**

Name | Type |
------ | ------ |
`bytecode` | string |
`abi` | `ContractAbi` |
`supportedProvider` | `SupportedProvider` |
`txDefaults` | `Partial<TxData>` |
`_auth` | string |

**Returns:** *`Promise<KosuTokenContract>`*

___

### `Static` deployFrom0xArtifactAsync

▸ **deployFrom0xArtifactAsync**(`artifact`: `ContractArtifact` | `SimpleContractArtifact`, `supportedProvider`: `SupportedProvider`, `txDefaults`: `Partial<TxData>`, `_auth`: string): *`Promise<KosuTokenContract>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/kosu_token.ts:1122

**Parameters:**

Name | Type |
------ | ------ |
`artifact` | `ContractArtifact` | `SimpleContractArtifact` |
`supportedProvider` | `SupportedProvider` |
`txDefaults` | `Partial<TxData>` |
`_auth` | string |

**Returns:** *`Promise<KosuTokenContract>`*

___

### `Static` strictArgumentEncodingCheck

▸ **strictArgumentEncodingCheck**(`inputAbi`: `DataItem`[], `args`: any[]): *string*

*Inherited from void*

Defined in node_modules/@0x/base-contract/lib/src/index.d.ts:32

**Parameters:**

Name | Type |
------ | ------ |
`inputAbi` | `DataItem`[] |
`args` | any[] |

**Returns:** *string*

___

## Object literals

###  allowance

### ■ **allowance**: *object*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/kosu_token.ts:1092

###  callAsync

▸ **callAsync**(`owner`: string, `spender`: string, `callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): *`Promise<BigNumber>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/kosu_token.ts:1093

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`owner` | string | - |
`spender` | string | - |
`callData` | `Partial<CallData>` |  {} |
`defaultBlock?` | `BlockParam` | - |

**Returns:** *`Promise<BigNumber>`*

___

###  approve

### ■ **approve**: *object*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/kosu_token.ts:77

###  awaitTransactionSuccessAsync

▸ **awaitTransactionSuccessAsync**(`spender`: string, `value`: `BigNumber`, `txData?`: `Partial<TxData>` | number, `pollingIntervalMs?`: number, `timeoutMs?`: number): *`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/kosu_token.ts:103

**Parameters:**

Name | Type |
------ | ------ |
`spender` | string |
`value` | `BigNumber` |
`txData?` | `Partial<TxData>` | number |
`pollingIntervalMs?` | number |
`timeoutMs?` | number |

**Returns:** *`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`*

###  callAsync

▸ **callAsync**(`spender`: string, `value`: `BigNumber`, `callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): *`Promise<boolean>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/kosu_token.ts:163

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`spender` | string | - |
`value` | `BigNumber` | - |
`callData` | `Partial<CallData>` |  {} |
`defaultBlock?` | `BlockParam` | - |

**Returns:** *`Promise<boolean>`*

###  estimateGasAsync

▸ **estimateGasAsync**(`spender`: string, `value`: `BigNumber`, `txData`: `Partial<TxData>`): *`Promise<number>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/kosu_token.ts:133

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`spender` | string | - |
`value` | `BigNumber` | - |
`txData` | `Partial<TxData>` |  {} |

**Returns:** *`Promise<number>`*

###  getABIEncodedTransactionData

▸ **getABIEncodedTransactionData**(`spender`: string, `value`: `BigNumber`): *string*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/kosu_token.ts:153

**Parameters:**

Name | Type |
------ | ------ |
`spender` | string |
`value` | `BigNumber` |

**Returns:** *string*

###  sendTransactionAsync

▸ **sendTransactionAsync**(`spender`: string, `value`: `BigNumber`, `txData`: `Partial<TxData>`): *`Promise<string>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/kosu_token.ts:78

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`spender` | string | - |
`value` | `BigNumber` | - |
`txData` | `Partial<TxData>` |  {} |

**Returns:** *`Promise<string>`*

___

###  balanceOf

### ■ **balanceOf**: *object*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/kosu_token.ts:704

###  callAsync

▸ **callAsync**(`owner`: string, `callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): *`Promise<BigNumber>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/kosu_token.ts:705

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`owner` | string | - |
`callData` | `Partial<CallData>` |  {} |
`defaultBlock?` | `BlockParam` | - |

**Returns:** *`Promise<BigNumber>`*

___

###  burn

### ■ **burn**: *object*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/kosu_token.ts:485

###  awaitTransactionSuccessAsync

▸ **awaitTransactionSuccessAsync**(`amount`: `BigNumber`, `txData?`: `Partial<TxData>` | number, `pollingIntervalMs?`: number, `timeoutMs?`: number): *`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/kosu_token.ts:508

**Parameters:**

Name | Type |
------ | ------ |
`amount` | `BigNumber` |
`txData?` | `Partial<TxData>` | number |
`pollingIntervalMs?` | number |
`timeoutMs?` | number |

**Returns:** *`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`*

###  callAsync

▸ **callAsync**(`amount`: `BigNumber`, `callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): *`Promise<void>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/kosu_token.ts:562

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`amount` | `BigNumber` | - |
`callData` | `Partial<CallData>` |  {} |
`defaultBlock?` | `BlockParam` | - |

**Returns:** *`Promise<void>`*

###  estimateGasAsync

▸ **estimateGasAsync**(`amount`: `BigNumber`, `txData`: `Partial<TxData>`): *`Promise<number>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/kosu_token.ts:536

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`amount` | `BigNumber` | - |
`txData` | `Partial<TxData>` |  {} |

**Returns:** *`Promise<number>`*

###  getABIEncodedTransactionData

▸ **getABIEncodedTransactionData**(`amount`: `BigNumber`): *string*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/kosu_token.ts:554

**Parameters:**

Name | Type |
------ | ------ |
`amount` | `BigNumber` |

**Returns:** *string*

###  sendTransactionAsync

▸ **sendTransactionAsync**(`amount`: `BigNumber`, `txData`: `Partial<TxData>`): *`Promise<string>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/kosu_token.ts:486

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`amount` | `BigNumber` | - |
`txData` | `Partial<TxData>` |  {} |

**Returns:** *`Promise<string>`*

___

###  decimals

### ■ **decimals**: *object*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/kosu_token.ts:344

###  callAsync

▸ **callAsync**(`callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): *`Promise<number>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/kosu_token.ts:345

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`callData` | `Partial<CallData>` |  {} |
`defaultBlock?` | `BlockParam` | - |

**Returns:** *`Promise<number>`*

___

###  decreaseAllowance

### ■ **decreaseAllowance**: *object*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/kosu_token.ts:862

###  awaitTransactionSuccessAsync

▸ **awaitTransactionSuccessAsync**(`spender`: string, `subtractedValue`: `BigNumber`, `txData?`: `Partial<TxData>` | number, `pollingIntervalMs?`: number, `timeoutMs?`: number): *`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/kosu_token.ts:888

**Parameters:**

Name | Type |
------ | ------ |
`spender` | string |
`subtractedValue` | `BigNumber` |
`txData?` | `Partial<TxData>` | number |
`pollingIntervalMs?` | number |
`timeoutMs?` | number |

**Returns:** *`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`*

###  callAsync

▸ **callAsync**(`spender`: string, `subtractedValue`: `BigNumber`, `callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): *`Promise<boolean>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/kosu_token.ts:948

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`spender` | string | - |
`subtractedValue` | `BigNumber` | - |
`callData` | `Partial<CallData>` |  {} |
`defaultBlock?` | `BlockParam` | - |

**Returns:** *`Promise<boolean>`*

###  estimateGasAsync

▸ **estimateGasAsync**(`spender`: string, `subtractedValue`: `BigNumber`, `txData`: `Partial<TxData>`): *`Promise<number>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/kosu_token.ts:918

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`spender` | string | - |
`subtractedValue` | `BigNumber` | - |
`txData` | `Partial<TxData>` |  {} |

**Returns:** *`Promise<number>`*

###  getABIEncodedTransactionData

▸ **getABIEncodedTransactionData**(`spender`: string, `subtractedValue`: `BigNumber`): *string*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/kosu_token.ts:938

**Parameters:**

Name | Type |
------ | ------ |
`spender` | string |
`subtractedValue` | `BigNumber` |

**Returns:** *string*

###  sendTransactionAsync

▸ **sendTransactionAsync**(`spender`: string, `subtractedValue`: `BigNumber`, `txData`: `Partial<TxData>`): *`Promise<string>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/kosu_token.ts:863

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`spender` | string | - |
`subtractedValue` | `BigNumber` | - |
`txData` | `Partial<TxData>` |  {} |

**Returns:** *`Promise<string>`*

___

###  increaseAllowance

### ■ **increaseAllowance**: *object*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/kosu_token.ts:370

###  awaitTransactionSuccessAsync

▸ **awaitTransactionSuccessAsync**(`spender`: string, `addedValue`: `BigNumber`, `txData?`: `Partial<TxData>` | number, `pollingIntervalMs?`: number, `timeoutMs?`: number): *`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/kosu_token.ts:396

**Parameters:**

Name | Type |
------ | ------ |
`spender` | string |
`addedValue` | `BigNumber` |
`txData?` | `Partial<TxData>` | number |
`pollingIntervalMs?` | number |
`timeoutMs?` | number |

**Returns:** *`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`*

###  callAsync

▸ **callAsync**(`spender`: string, `addedValue`: `BigNumber`, `callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): *`Promise<boolean>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/kosu_token.ts:456

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`spender` | string | - |
`addedValue` | `BigNumber` | - |
`callData` | `Partial<CallData>` |  {} |
`defaultBlock?` | `BlockParam` | - |

**Returns:** *`Promise<boolean>`*

###  estimateGasAsync

▸ **estimateGasAsync**(`spender`: string, `addedValue`: `BigNumber`, `txData`: `Partial<TxData>`): *`Promise<number>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/kosu_token.ts:426

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`spender` | string | - |
`addedValue` | `BigNumber` | - |
`txData` | `Partial<TxData>` |  {} |

**Returns:** *`Promise<number>`*

###  getABIEncodedTransactionData

▸ **getABIEncodedTransactionData**(`spender`: string, `addedValue`: `BigNumber`): *string*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/kosu_token.ts:446

**Parameters:**

Name | Type |
------ | ------ |
`spender` | string |
`addedValue` | `BigNumber` |

**Returns:** *string*

###  sendTransactionAsync

▸ **sendTransactionAsync**(`spender`: string, `addedValue`: `BigNumber`, `txData`: `Partial<TxData>`): *`Promise<string>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/kosu_token.ts:371

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`spender` | string | - |
`addedValue` | `BigNumber` | - |
`txData` | `Partial<TxData>` |  {} |

**Returns:** *`Promise<string>`*

___

###  mint

### ■ **mint**: *object*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/kosu_token.ts:758

###  awaitTransactionSuccessAsync

▸ **awaitTransactionSuccessAsync**(`amount`: `BigNumber`, `txData?`: `Partial<TxData>` | number, `pollingIntervalMs?`: number, `timeoutMs?`: number): *`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/kosu_token.ts:781

**Parameters:**

Name | Type |
------ | ------ |
`amount` | `BigNumber` |
`txData?` | `Partial<TxData>` | number |
`pollingIntervalMs?` | number |
`timeoutMs?` | number |

**Returns:** *`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`*

###  callAsync

▸ **callAsync**(`amount`: `BigNumber`, `callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): *`Promise<void>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/kosu_token.ts:835

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`amount` | `BigNumber` | - |
`callData` | `Partial<CallData>` |  {} |
`defaultBlock?` | `BlockParam` | - |

**Returns:** *`Promise<void>`*

###  estimateGasAsync

▸ **estimateGasAsync**(`amount`: `BigNumber`, `txData`: `Partial<TxData>`): *`Promise<number>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/kosu_token.ts:809

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`amount` | `BigNumber` | - |
`txData` | `Partial<TxData>` |  {} |

**Returns:** *`Promise<number>`*

###  getABIEncodedTransactionData

▸ **getABIEncodedTransactionData**(`amount`: `BigNumber`): *string*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/kosu_token.ts:827

**Parameters:**

Name | Type |
------ | ------ |
`amount` | `BigNumber` |

**Returns:** *string*

###  sendTransactionAsync

▸ **sendTransactionAsync**(`amount`: `BigNumber`, `txData`: `Partial<TxData>`): *`Promise<string>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/kosu_token.ts:759

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`amount` | `BigNumber` | - |
`txData` | `Partial<TxData>` |  {} |

**Returns:** *`Promise<string>`*

___

###  mintTo

### ■ **mintTo**: *object*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/kosu_token.ts:589

###  awaitTransactionSuccessAsync

▸ **awaitTransactionSuccessAsync**(`_address`: string, `amount`: `BigNumber`, `txData?`: `Partial<TxData>` | number, `pollingIntervalMs?`: number, `timeoutMs?`: number): *`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/kosu_token.ts:615

**Parameters:**

Name | Type |
------ | ------ |
`_address` | string |
`amount` | `BigNumber` |
`txData?` | `Partial<TxData>` | number |
`pollingIntervalMs?` | number |
`timeoutMs?` | number |

**Returns:** *`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`*

###  callAsync

▸ **callAsync**(`_address`: string, `amount`: `BigNumber`, `callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): *`Promise<void>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/kosu_token.ts:675

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`_address` | string | - |
`amount` | `BigNumber` | - |
`callData` | `Partial<CallData>` |  {} |
`defaultBlock?` | `BlockParam` | - |

**Returns:** *`Promise<void>`*

###  estimateGasAsync

▸ **estimateGasAsync**(`_address`: string, `amount`: `BigNumber`, `txData`: `Partial<TxData>`): *`Promise<number>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/kosu_token.ts:645

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`_address` | string | - |
`amount` | `BigNumber` | - |
`txData` | `Partial<TxData>` |  {} |

**Returns:** *`Promise<number>`*

###  getABIEncodedTransactionData

▸ **getABIEncodedTransactionData**(`_address`: string, `amount`: `BigNumber`): *string*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/kosu_token.ts:665

**Parameters:**

Name | Type |
------ | ------ |
`_address` | string |
`amount` | `BigNumber` |

**Returns:** *string*

###  sendTransactionAsync

▸ **sendTransactionAsync**(`_address`: string, `amount`: `BigNumber`, `txData`: `Partial<TxData>`): *`Promise<string>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/kosu_token.ts:590

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`_address` | string | - |
`amount` | `BigNumber` | - |
`txData` | `Partial<TxData>` |  {} |

**Returns:** *`Promise<string>`*

___

###  name

### ■ **name**: *object*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/kosu_token.ts:51

###  callAsync

▸ **callAsync**(`callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): *`Promise<string>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/kosu_token.ts:52

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`callData` | `Partial<CallData>` |  {} |
`defaultBlock?` | `BlockParam` | - |

**Returns:** *`Promise<string>`*

___

###  symbol

### ■ **symbol**: *object*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/kosu_token.ts:732

###  callAsync

▸ **callAsync**(`callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): *`Promise<string>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/kosu_token.ts:733

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`callData` | `Partial<CallData>` |  {} |
`defaultBlock?` | `BlockParam` | - |

**Returns:** *`Promise<string>`*

___

###  totalSupply

### ■ **totalSupply**: *object*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/kosu_token.ts:192

###  callAsync

▸ **callAsync**(`callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): *`Promise<BigNumber>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/kosu_token.ts:193

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`callData` | `Partial<CallData>` |  {} |
`defaultBlock?` | `BlockParam` | - |

**Returns:** *`Promise<BigNumber>`*

___

###  transfer

### ■ **transfer**: *object*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/kosu_token.ts:977

###  awaitTransactionSuccessAsync

▸ **awaitTransactionSuccessAsync**(`to`: string, `value`: `BigNumber`, `txData?`: `Partial<TxData>` | number, `pollingIntervalMs?`: number, `timeoutMs?`: number): *`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/kosu_token.ts:1003

**Parameters:**

Name | Type |
------ | ------ |
`to` | string |
`value` | `BigNumber` |
`txData?` | `Partial<TxData>` | number |
`pollingIntervalMs?` | number |
`timeoutMs?` | number |

**Returns:** *`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`*

###  callAsync

▸ **callAsync**(`to`: string, `value`: `BigNumber`, `callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): *`Promise<boolean>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/kosu_token.ts:1063

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`to` | string | - |
`value` | `BigNumber` | - |
`callData` | `Partial<CallData>` |  {} |
`defaultBlock?` | `BlockParam` | - |

**Returns:** *`Promise<boolean>`*

###  estimateGasAsync

▸ **estimateGasAsync**(`to`: string, `value`: `BigNumber`, `txData`: `Partial<TxData>`): *`Promise<number>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/kosu_token.ts:1033

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`to` | string | - |
`value` | `BigNumber` | - |
`txData` | `Partial<TxData>` |  {} |

**Returns:** *`Promise<number>`*

###  getABIEncodedTransactionData

▸ **getABIEncodedTransactionData**(`to`: string, `value`: `BigNumber`): *string*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/kosu_token.ts:1053

**Parameters:**

Name | Type |
------ | ------ |
`to` | string |
`value` | `BigNumber` |

**Returns:** *string*

###  sendTransactionAsync

▸ **sendTransactionAsync**(`to`: string, `value`: `BigNumber`, `txData`: `Partial<TxData>`): *`Promise<string>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/kosu_token.ts:978

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`to` | string | - |
`value` | `BigNumber` | - |
`txData` | `Partial<TxData>` |  {} |

**Returns:** *`Promise<string>`*

___

###  transferFrom

### ■ **transferFrom**: *object*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/kosu_token.ts:218

###  awaitTransactionSuccessAsync

▸ **awaitTransactionSuccessAsync**(`from`: string, `to`: string, `value`: `BigNumber`, `txData?`: `Partial<TxData>` | number, `pollingIntervalMs?`: number, `timeoutMs?`: number): *`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/kosu_token.ts:247

**Parameters:**

Name | Type |
------ | ------ |
`from` | string |
`to` | string |
`value` | `BigNumber` |
`txData?` | `Partial<TxData>` | number |
`pollingIntervalMs?` | number |
`timeoutMs?` | number |

**Returns:** *`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`*

###  callAsync

▸ **callAsync**(`from`: string, `to`: string, `value`: `BigNumber`, `callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): *`Promise<boolean>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/kosu_token.ts:313

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`from` | string | - |
`to` | string | - |
`value` | `BigNumber` | - |
`callData` | `Partial<CallData>` |  {} |
`defaultBlock?` | `BlockParam` | - |

**Returns:** *`Promise<boolean>`*

###  estimateGasAsync

▸ **estimateGasAsync**(`from`: string, `to`: string, `value`: `BigNumber`, `txData`: `Partial<TxData>`): *`Promise<number>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/kosu_token.ts:279

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`from` | string | - |
`to` | string | - |
`value` | `BigNumber` | - |
`txData` | `Partial<TxData>` |  {} |

**Returns:** *`Promise<number>`*

###  getABIEncodedTransactionData

▸ **getABIEncodedTransactionData**(`from`: string, `to`: string, `value`: `BigNumber`): *string*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/kosu_token.ts:301

**Parameters:**

Name | Type |
------ | ------ |
`from` | string |
`to` | string |
`value` | `BigNumber` |

**Returns:** *string*

###  sendTransactionAsync

▸ **sendTransactionAsync**(`from`: string, `to`: string, `value`: `BigNumber`, `txData`: `Partial<TxData>`): *`Promise<string>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/kosu_token.ts:219

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`from` | string | - |
`to` | string | - |
`value` | `BigNumber` | - |
`txData` | `Partial<TxData>` |  {} |

**Returns:** *`Promise<string>`*

___