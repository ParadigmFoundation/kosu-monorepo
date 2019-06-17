> ## [kosu.js](../README.md)

[Globals](../globals.md) / [TreasuryContract](treasurycontract.md) /

# Class: TreasuryContract

## Hierarchy

* `BaseContract`

  * **TreasuryContract**

### Index

#### Constructors

* [constructor](treasurycontract.md#constructor)

#### Properties

* [_abiEncoderByFunctionSignature](treasurycontract.md#protected-_abiencoderbyfunctionsignature)
* [_web3Wrapper](treasurycontract.md#protected-_web3wrapper)
* [abi](treasurycontract.md#abi)
* [address](treasurycontract.md#address)
* [constructorArgs](treasurycontract.md#constructorargs)
* [contractName](treasurycontract.md#contractname)
* [txReceipt](treasurycontract.md#optional-txreceipt)

#### Methods

* [_lookupAbi](treasurycontract.md#protected-_lookupabi)
* [_lookupAbiEncoder](treasurycontract.md#protected-_lookupabiencoder)
* [_strictEncodeArguments](treasurycontract.md#protected-_strictencodearguments)
* [_applyDefaultsToTxDataAsync](treasurycontract.md#static-protected-_applydefaultstotxdataasync)
* [_bigNumberToString](treasurycontract.md#static-protected-_bignumbertostring)
* [_formatABIDataItemList](treasurycontract.md#static-protected-_formatabidataitemlist)
* [_lookupConstructorAbi](treasurycontract.md#static-protected-_lookupconstructorabi)
* [_lowercaseAddress](treasurycontract.md#static-protected-_lowercaseaddress)
* [_throwIfRevertWithReasonCallResult](treasurycontract.md#static-protected-_throwifrevertwithreasoncallresult)
* [deployAsync](treasurycontract.md#static-deployasync)
* [deployFrom0xArtifactAsync](treasurycontract.md#static-deployfrom0xartifactasync)
* [strictArgumentEncodingCheck](treasurycontract.md#static-strictargumentencodingcheck)

#### Object literals

* [adjustBalance](treasurycontract.md#adjustbalance)
* [award](treasurycontract.md#award)
* [burnFrom](treasurycontract.md#burnfrom)
* [claimTokens](treasurycontract.md#claimtokens)
* [confiscate](treasurycontract.md#confiscate)
* [contractDeposit](treasurycontract.md#contractdeposit)
* [contractWithdraw](treasurycontract.md#contractwithdraw)
* [currentBalance](treasurycontract.md#currentbalance)
* [deposit](treasurycontract.md#deposit)
* [kosuToken](treasurycontract.md#kosutoken)
* [releaseTokens](treasurycontract.md#releasetokens)
* [systemBalance](treasurycontract.md#systembalance)
* [updateBalance](treasurycontract.md#updatebalance)
* [withdraw](treasurycontract.md#withdraw)

## Constructors

###  constructor

\+ **new TreasuryContract**(`abi`: `ContractAbi`, `address`: string, `supportedProvider`: `SupportedProvider`, `txDefaults?`: `Partial<TxData>`): *[TreasuryContract](treasurycontract.md)*

*Overrides void*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/treasury.ts:1412

**Parameters:**

Name | Type |
------ | ------ |
`abi` | `ContractAbi` |
`address` | string |
`supportedProvider` | `SupportedProvider` |
`txDefaults?` | `Partial<TxData>` |

**Returns:** *[TreasuryContract](treasurycontract.md)*

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

Defined in node_modules/@kosu/system-contracts/generated-wrappers/treasury.ts:29

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

▸ **deployAsync**(`bytecode`: string, `abi`: `ContractAbi`, `supportedProvider`: `SupportedProvider`, `txDefaults`: `Partial<TxData>`, `kosuTokenAddress`: string, `auth`: string): *`Promise<TreasuryContract>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/treasury.ts:1372

**Parameters:**

Name | Type |
------ | ------ |
`bytecode` | string |
`abi` | `ContractAbi` |
`supportedProvider` | `SupportedProvider` |
`txDefaults` | `Partial<TxData>` |
`kosuTokenAddress` | string |
`auth` | string |

**Returns:** *`Promise<TreasuryContract>`*

___

### `Static` deployFrom0xArtifactAsync

▸ **deployFrom0xArtifactAsync**(`artifact`: `ContractArtifact` | `SimpleContractArtifact`, `supportedProvider`: `SupportedProvider`, `txDefaults`: `Partial<TxData>`, `kosuTokenAddress`: string, `auth`: string): *`Promise<TreasuryContract>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/treasury.ts:1355

**Parameters:**

Name | Type |
------ | ------ |
`artifact` | `ContractArtifact` | `SimpleContractArtifact` |
`supportedProvider` | `SupportedProvider` |
`txDefaults` | `Partial<TxData>` |
`kosuTokenAddress` | string |
`auth` | string |

**Returns:** *`Promise<TreasuryContract>`*

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

###  adjustBalance

### ■ **adjustBalance**: *object*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/treasury.ts:1010

###  awaitTransactionSuccessAsync

▸ **awaitTransactionSuccessAsync**(`account`: string, `amount`: `BigNumber`, `txData?`: `Partial<TxData>` | number, `pollingIntervalMs?`: number, `timeoutMs?`: number): *`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/treasury.ts:1036

**Parameters:**

Name | Type |
------ | ------ |
`account` | string |
`amount` | `BigNumber` |
`txData?` | `Partial<TxData>` | number |
`pollingIntervalMs?` | number |
`timeoutMs?` | number |

**Returns:** *`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`*

###  callAsync

▸ **callAsync**(`account`: string, `amount`: `BigNumber`, `callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): *`Promise<void>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/treasury.ts:1096

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`account` | string | - |
`amount` | `BigNumber` | - |
`callData` | `Partial<CallData>` |  {} |
`defaultBlock?` | `BlockParam` | - |

**Returns:** *`Promise<void>`*

###  estimateGasAsync

▸ **estimateGasAsync**(`account`: string, `amount`: `BigNumber`, `txData`: `Partial<TxData>`): *`Promise<number>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/treasury.ts:1066

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`account` | string | - |
`amount` | `BigNumber` | - |
`txData` | `Partial<TxData>` |  {} |

**Returns:** *`Promise<number>`*

###  getABIEncodedTransactionData

▸ **getABIEncodedTransactionData**(`account`: string, `amount`: `BigNumber`): *string*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/treasury.ts:1086

**Parameters:**

Name | Type |
------ | ------ |
`account` | string |
`amount` | `BigNumber` |

**Returns:** *string*

###  sendTransactionAsync

▸ **sendTransactionAsync**(`account`: string, `amount`: `BigNumber`, `txData`: `Partial<TxData>`): *`Promise<string>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/treasury.ts:1011

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`account` | string | - |
`amount` | `BigNumber` | - |
`txData` | `Partial<TxData>` |  {} |

**Returns:** *`Promise<string>`*

___

###  award

### ■ **award**: *object*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/treasury.ts:277

###  awaitTransactionSuccessAsync

▸ **awaitTransactionSuccessAsync**(`account`: string, `amount`: `BigNumber`, `txData?`: `Partial<TxData>` | number, `pollingIntervalMs?`: number, `timeoutMs?`: number): *`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/treasury.ts:303

**Parameters:**

Name | Type |
------ | ------ |
`account` | string |
`amount` | `BigNumber` |
`txData?` | `Partial<TxData>` | number |
`pollingIntervalMs?` | number |
`timeoutMs?` | number |

**Returns:** *`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`*

###  callAsync

▸ **callAsync**(`account`: string, `amount`: `BigNumber`, `callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): *`Promise<void>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/treasury.ts:363

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`account` | string | - |
`amount` | `BigNumber` | - |
`callData` | `Partial<CallData>` |  {} |
`defaultBlock?` | `BlockParam` | - |

**Returns:** *`Promise<void>`*

###  estimateGasAsync

▸ **estimateGasAsync**(`account`: string, `amount`: `BigNumber`, `txData`: `Partial<TxData>`): *`Promise<number>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/treasury.ts:333

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`account` | string | - |
`amount` | `BigNumber` | - |
`txData` | `Partial<TxData>` |  {} |

**Returns:** *`Promise<number>`*

###  getABIEncodedTransactionData

▸ **getABIEncodedTransactionData**(`account`: string, `amount`: `BigNumber`): *string*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/treasury.ts:353

**Parameters:**

Name | Type |
------ | ------ |
`account` | string |
`amount` | `BigNumber` |

**Returns:** *string*

###  sendTransactionAsync

▸ **sendTransactionAsync**(`account`: string, `amount`: `BigNumber`, `txData`: `Partial<TxData>`): *`Promise<string>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/treasury.ts:278

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`account` | string | - |
`amount` | `BigNumber` | - |
`txData` | `Partial<TxData>` |  {} |

**Returns:** *`Promise<string>`*

___

###  burnFrom

### ■ **burnFrom**: *object*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/treasury.ts:392

###  awaitTransactionSuccessAsync

▸ **awaitTransactionSuccessAsync**(`account`: string, `amount`: `BigNumber`, `txData?`: `Partial<TxData>` | number, `pollingIntervalMs?`: number, `timeoutMs?`: number): *`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/treasury.ts:418

**Parameters:**

Name | Type |
------ | ------ |
`account` | string |
`amount` | `BigNumber` |
`txData?` | `Partial<TxData>` | number |
`pollingIntervalMs?` | number |
`timeoutMs?` | number |

**Returns:** *`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`*

###  callAsync

▸ **callAsync**(`account`: string, `amount`: `BigNumber`, `callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): *`Promise<void>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/treasury.ts:478

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`account` | string | - |
`amount` | `BigNumber` | - |
`callData` | `Partial<CallData>` |  {} |
`defaultBlock?` | `BlockParam` | - |

**Returns:** *`Promise<void>`*

###  estimateGasAsync

▸ **estimateGasAsync**(`account`: string, `amount`: `BigNumber`, `txData`: `Partial<TxData>`): *`Promise<number>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/treasury.ts:448

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`account` | string | - |
`amount` | `BigNumber` | - |
`txData` | `Partial<TxData>` |  {} |

**Returns:** *`Promise<number>`*

###  getABIEncodedTransactionData

▸ **getABIEncodedTransactionData**(`account`: string, `amount`: `BigNumber`): *string*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/treasury.ts:468

**Parameters:**

Name | Type |
------ | ------ |
`account` | string |
`amount` | `BigNumber` |

**Returns:** *string*

###  sendTransactionAsync

▸ **sendTransactionAsync**(`account`: string, `amount`: `BigNumber`, `txData`: `Partial<TxData>`): *`Promise<string>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/treasury.ts:393

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`account` | string | - |
`amount` | `BigNumber` | - |
`txData` | `Partial<TxData>` |  {} |

**Returns:** *`Promise<string>`*

___

###  claimTokens

### ■ **claimTokens**: *object*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/treasury.ts:1240

###  awaitTransactionSuccessAsync

▸ **awaitTransactionSuccessAsync**(`account`: string, `amount`: `BigNumber`, `txData?`: `Partial<TxData>` | number, `pollingIntervalMs?`: number, `timeoutMs?`: number): *`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/treasury.ts:1266

**Parameters:**

Name | Type |
------ | ------ |
`account` | string |
`amount` | `BigNumber` |
`txData?` | `Partial<TxData>` | number |
`pollingIntervalMs?` | number |
`timeoutMs?` | number |

**Returns:** *`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`*

###  callAsync

▸ **callAsync**(`account`: string, `amount`: `BigNumber`, `callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): *`Promise<void>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/treasury.ts:1326

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`account` | string | - |
`amount` | `BigNumber` | - |
`callData` | `Partial<CallData>` |  {} |
`defaultBlock?` | `BlockParam` | - |

**Returns:** *`Promise<void>`*

###  estimateGasAsync

▸ **estimateGasAsync**(`account`: string, `amount`: `BigNumber`, `txData`: `Partial<TxData>`): *`Promise<number>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/treasury.ts:1296

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`account` | string | - |
`amount` | `BigNumber` | - |
`txData` | `Partial<TxData>` |  {} |

**Returns:** *`Promise<number>`*

###  getABIEncodedTransactionData

▸ **getABIEncodedTransactionData**(`account`: string, `amount`: `BigNumber`): *string*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/treasury.ts:1316

**Parameters:**

Name | Type |
------ | ------ |
`account` | string |
`amount` | `BigNumber` |

**Returns:** *string*

###  sendTransactionAsync

▸ **sendTransactionAsync**(`account`: string, `amount`: `BigNumber`, `txData`: `Partial<TxData>`): *`Promise<string>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/treasury.ts:1241

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`account` | string | - |
`amount` | `BigNumber` | - |
`txData` | `Partial<TxData>` |  {} |

**Returns:** *`Promise<string>`*

___

###  confiscate

### ■ **confiscate**: *object*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/treasury.ts:134

###  awaitTransactionSuccessAsync

▸ **awaitTransactionSuccessAsync**(`account`: string, `amount`: `BigNumber`, `txData?`: `Partial<TxData>` | number, `pollingIntervalMs?`: number, `timeoutMs?`: number): *`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/treasury.ts:160

**Parameters:**

Name | Type |
------ | ------ |
`account` | string |
`amount` | `BigNumber` |
`txData?` | `Partial<TxData>` | number |
`pollingIntervalMs?` | number |
`timeoutMs?` | number |

**Returns:** *`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`*

###  callAsync

▸ **callAsync**(`account`: string, `amount`: `BigNumber`, `callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): *`Promise<void>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/treasury.ts:220

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`account` | string | - |
`amount` | `BigNumber` | - |
`callData` | `Partial<CallData>` |  {} |
`defaultBlock?` | `BlockParam` | - |

**Returns:** *`Promise<void>`*

###  estimateGasAsync

▸ **estimateGasAsync**(`account`: string, `amount`: `BigNumber`, `txData`: `Partial<TxData>`): *`Promise<number>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/treasury.ts:190

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`account` | string | - |
`amount` | `BigNumber` | - |
`txData` | `Partial<TxData>` |  {} |

**Returns:** *`Promise<number>`*

###  getABIEncodedTransactionData

▸ **getABIEncodedTransactionData**(`account`: string, `amount`: `BigNumber`): *string*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/treasury.ts:210

**Parameters:**

Name | Type |
------ | ------ |
`account` | string |
`amount` | `BigNumber` |

**Returns:** *string*

###  sendTransactionAsync

▸ **sendTransactionAsync**(`account`: string, `amount`: `BigNumber`, `txData`: `Partial<TxData>`): *`Promise<string>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/treasury.ts:135

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`account` | string | - |
`amount` | `BigNumber` | - |
`txData` | `Partial<TxData>` |  {} |

**Returns:** *`Promise<string>`*

___

###  contractDeposit

### ■ **contractDeposit**: *object*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/treasury.ts:622

###  awaitTransactionSuccessAsync

▸ **awaitTransactionSuccessAsync**(`account`: string, `amount`: `BigNumber`, `txData?`: `Partial<TxData>` | number, `pollingIntervalMs?`: number, `timeoutMs?`: number): *`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/treasury.ts:648

**Parameters:**

Name | Type |
------ | ------ |
`account` | string |
`amount` | `BigNumber` |
`txData?` | `Partial<TxData>` | number |
`pollingIntervalMs?` | number |
`timeoutMs?` | number |

**Returns:** *`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`*

###  callAsync

▸ **callAsync**(`account`: string, `amount`: `BigNumber`, `callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): *`Promise<void>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/treasury.ts:708

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`account` | string | - |
`amount` | `BigNumber` | - |
`callData` | `Partial<CallData>` |  {} |
`defaultBlock?` | `BlockParam` | - |

**Returns:** *`Promise<void>`*

###  estimateGasAsync

▸ **estimateGasAsync**(`account`: string, `amount`: `BigNumber`, `txData`: `Partial<TxData>`): *`Promise<number>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/treasury.ts:678

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`account` | string | - |
`amount` | `BigNumber` | - |
`txData` | `Partial<TxData>` |  {} |

**Returns:** *`Promise<number>`*

###  getABIEncodedTransactionData

▸ **getABIEncodedTransactionData**(`account`: string, `amount`: `BigNumber`): *string*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/treasury.ts:698

**Parameters:**

Name | Type |
------ | ------ |
`account` | string |
`amount` | `BigNumber` |

**Returns:** *string*

###  sendTransactionAsync

▸ **sendTransactionAsync**(`account`: string, `amount`: `BigNumber`, `txData`: `Partial<TxData>`): *`Promise<string>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/treasury.ts:623

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`account` | string | - |
`amount` | `BigNumber` | - |
`txData` | `Partial<TxData>` |  {} |

**Returns:** *`Promise<string>`*

___

###  contractWithdraw

### ■ **contractWithdraw**: *object*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/treasury.ts:507

###  awaitTransactionSuccessAsync

▸ **awaitTransactionSuccessAsync**(`account`: string, `amount`: `BigNumber`, `txData?`: `Partial<TxData>` | number, `pollingIntervalMs?`: number, `timeoutMs?`: number): *`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/treasury.ts:533

**Parameters:**

Name | Type |
------ | ------ |
`account` | string |
`amount` | `BigNumber` |
`txData?` | `Partial<TxData>` | number |
`pollingIntervalMs?` | number |
`timeoutMs?` | number |

**Returns:** *`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`*

###  callAsync

▸ **callAsync**(`account`: string, `amount`: `BigNumber`, `callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): *`Promise<void>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/treasury.ts:593

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`account` | string | - |
`amount` | `BigNumber` | - |
`callData` | `Partial<CallData>` |  {} |
`defaultBlock?` | `BlockParam` | - |

**Returns:** *`Promise<void>`*

###  estimateGasAsync

▸ **estimateGasAsync**(`account`: string, `amount`: `BigNumber`, `txData`: `Partial<TxData>`): *`Promise<number>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/treasury.ts:563

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`account` | string | - |
`amount` | `BigNumber` | - |
`txData` | `Partial<TxData>` |  {} |

**Returns:** *`Promise<number>`*

###  getABIEncodedTransactionData

▸ **getABIEncodedTransactionData**(`account`: string, `amount`: `BigNumber`): *string*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/treasury.ts:583

**Parameters:**

Name | Type |
------ | ------ |
`account` | string |
`amount` | `BigNumber` |

**Returns:** *string*

###  sendTransactionAsync

▸ **sendTransactionAsync**(`account`: string, `amount`: `BigNumber`, `txData`: `Partial<TxData>`): *`Promise<string>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/treasury.ts:508

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`account` | string | - |
`amount` | `BigNumber` | - |
`txData` | `Partial<TxData>` |  {} |

**Returns:** *`Promise<string>`*

___

###  currentBalance

### ■ **currentBalance**: *object*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/treasury.ts:737

###  callAsync

▸ **callAsync**(`account`: string, `callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): *`Promise<BigNumber>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/treasury.ts:738

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`account` | string | - |
`callData` | `Partial<CallData>` |  {} |
`defaultBlock?` | `BlockParam` | - |

**Returns:** *`Promise<BigNumber>`*

___

###  deposit

### ■ **deposit**: *object*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/treasury.ts:765

###  awaitTransactionSuccessAsync

▸ **awaitTransactionSuccessAsync**(`amount`: `BigNumber`, `txData?`: `Partial<TxData>` | number, `pollingIntervalMs?`: number, `timeoutMs?`: number): *`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/treasury.ts:788

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

Defined in node_modules/@kosu/system-contracts/generated-wrappers/treasury.ts:842

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`amount` | `BigNumber` | - |
`callData` | `Partial<CallData>` |  {} |
`defaultBlock?` | `BlockParam` | - |

**Returns:** *`Promise<void>`*

###  estimateGasAsync

▸ **estimateGasAsync**(`amount`: `BigNumber`, `txData`: `Partial<TxData>`): *`Promise<number>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/treasury.ts:816

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`amount` | `BigNumber` | - |
`txData` | `Partial<TxData>` |  {} |

**Returns:** *`Promise<number>`*

###  getABIEncodedTransactionData

▸ **getABIEncodedTransactionData**(`amount`: `BigNumber`): *string*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/treasury.ts:834

**Parameters:**

Name | Type |
------ | ------ |
`amount` | `BigNumber` |

**Returns:** *string*

###  sendTransactionAsync

▸ **sendTransactionAsync**(`amount`: `BigNumber`, `txData`: `Partial<TxData>`): *`Promise<string>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/treasury.ts:766

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`amount` | `BigNumber` | - |
`txData` | `Partial<TxData>` |  {} |

**Returns:** *`Promise<string>`*

___

###  kosuToken

### ■ **kosuToken**: *object*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/treasury.ts:869

###  callAsync

▸ **callAsync**(`callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): *`Promise<string>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/treasury.ts:870

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`callData` | `Partial<CallData>` |  {} |
`defaultBlock?` | `BlockParam` | - |

**Returns:** *`Promise<string>`*

___

###  releaseTokens

### ■ **releaseTokens**: *object*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/treasury.ts:1125

###  awaitTransactionSuccessAsync

▸ **awaitTransactionSuccessAsync**(`account`: string, `amount`: `BigNumber`, `txData?`: `Partial<TxData>` | number, `pollingIntervalMs?`: number, `timeoutMs?`: number): *`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/treasury.ts:1151

**Parameters:**

Name | Type |
------ | ------ |
`account` | string |
`amount` | `BigNumber` |
`txData?` | `Partial<TxData>` | number |
`pollingIntervalMs?` | number |
`timeoutMs?` | number |

**Returns:** *`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`*

###  callAsync

▸ **callAsync**(`account`: string, `amount`: `BigNumber`, `callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): *`Promise<void>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/treasury.ts:1211

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`account` | string | - |
`amount` | `BigNumber` | - |
`callData` | `Partial<CallData>` |  {} |
`defaultBlock?` | `BlockParam` | - |

**Returns:** *`Promise<void>`*

###  estimateGasAsync

▸ **estimateGasAsync**(`account`: string, `amount`: `BigNumber`, `txData`: `Partial<TxData>`): *`Promise<number>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/treasury.ts:1181

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`account` | string | - |
`amount` | `BigNumber` | - |
`txData` | `Partial<TxData>` |  {} |

**Returns:** *`Promise<number>`*

###  getABIEncodedTransactionData

▸ **getABIEncodedTransactionData**(`account`: string, `amount`: `BigNumber`): *string*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/treasury.ts:1201

**Parameters:**

Name | Type |
------ | ------ |
`account` | string |
`amount` | `BigNumber` |

**Returns:** *string*

###  sendTransactionAsync

▸ **sendTransactionAsync**(`account`: string, `amount`: `BigNumber`, `txData`: `Partial<TxData>`): *`Promise<string>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/treasury.ts:1126

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`account` | string | - |
`amount` | `BigNumber` | - |
`txData` | `Partial<TxData>` |  {} |

**Returns:** *`Promise<string>`*

___

###  systemBalance

### ■ **systemBalance**: *object*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/treasury.ts:249

###  callAsync

▸ **callAsync**(`account`: string, `callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): *`Promise<BigNumber>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/treasury.ts:250

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`account` | string | - |
`callData` | `Partial<CallData>` |  {} |
`defaultBlock?` | `BlockParam` | - |

**Returns:** *`Promise<BigNumber>`*

___

###  updateBalance

### ■ **updateBalance**: *object*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/treasury.ts:895

###  awaitTransactionSuccessAsync

▸ **awaitTransactionSuccessAsync**(`account`: string, `amount`: `BigNumber`, `txData?`: `Partial<TxData>` | number, `pollingIntervalMs?`: number, `timeoutMs?`: number): *`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/treasury.ts:921

**Parameters:**

Name | Type |
------ | ------ |
`account` | string |
`amount` | `BigNumber` |
`txData?` | `Partial<TxData>` | number |
`pollingIntervalMs?` | number |
`timeoutMs?` | number |

**Returns:** *`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`*

###  callAsync

▸ **callAsync**(`account`: string, `amount`: `BigNumber`, `callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): *`Promise<void>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/treasury.ts:981

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`account` | string | - |
`amount` | `BigNumber` | - |
`callData` | `Partial<CallData>` |  {} |
`defaultBlock?` | `BlockParam` | - |

**Returns:** *`Promise<void>`*

###  estimateGasAsync

▸ **estimateGasAsync**(`account`: string, `amount`: `BigNumber`, `txData`: `Partial<TxData>`): *`Promise<number>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/treasury.ts:951

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`account` | string | - |
`amount` | `BigNumber` | - |
`txData` | `Partial<TxData>` |  {} |

**Returns:** *`Promise<number>`*

###  getABIEncodedTransactionData

▸ **getABIEncodedTransactionData**(`account`: string, `amount`: `BigNumber`): *string*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/treasury.ts:971

**Parameters:**

Name | Type |
------ | ------ |
`account` | string |
`amount` | `BigNumber` |

**Returns:** *string*

###  sendTransactionAsync

▸ **sendTransactionAsync**(`account`: string, `amount`: `BigNumber`, `txData`: `Partial<TxData>`): *`Promise<string>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/treasury.ts:896

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`account` | string | - |
`amount` | `BigNumber` | - |
`txData` | `Partial<TxData>` |  {} |

**Returns:** *`Promise<string>`*

___

###  withdraw

### ■ **withdraw**: *object*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/treasury.ts:30

###  awaitTransactionSuccessAsync

▸ **awaitTransactionSuccessAsync**(`amount`: `BigNumber`, `txData?`: `Partial<TxData>` | number, `pollingIntervalMs?`: number, `timeoutMs?`: number): *`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/treasury.ts:53

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

Defined in node_modules/@kosu/system-contracts/generated-wrappers/treasury.ts:107

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`amount` | `BigNumber` | - |
`callData` | `Partial<CallData>` |  {} |
`defaultBlock?` | `BlockParam` | - |

**Returns:** *`Promise<void>`*

###  estimateGasAsync

▸ **estimateGasAsync**(`amount`: `BigNumber`, `txData`: `Partial<TxData>`): *`Promise<number>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/treasury.ts:81

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`amount` | `BigNumber` | - |
`txData` | `Partial<TxData>` |  {} |

**Returns:** *`Promise<number>`*

###  getABIEncodedTransactionData

▸ **getABIEncodedTransactionData**(`amount`: `BigNumber`): *string*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/treasury.ts:99

**Parameters:**

Name | Type |
------ | ------ |
`amount` | `BigNumber` |

**Returns:** *string*

###  sendTransactionAsync

▸ **sendTransactionAsync**(`amount`: `BigNumber`, `txData`: `Partial<TxData>`): *`Promise<string>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/treasury.ts:31

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`amount` | `BigNumber` | - |
`txData` | `Partial<TxData>` |  {} |

**Returns:** *`Promise<string>`*

___