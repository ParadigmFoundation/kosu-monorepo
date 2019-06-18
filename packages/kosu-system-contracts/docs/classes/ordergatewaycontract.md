> ## [kosu-system-contracts](../README.md)

[Globals](../globals.md) / [OrderGatewayContract](ordergatewaycontract.md) /

# Class: OrderGatewayContract

## Hierarchy

* `BaseContract`

  * **OrderGatewayContract**

### Index

#### Constructors

* [constructor](ordergatewaycontract.md#constructor)

#### Properties

* [_abiEncoderByFunctionSignature](ordergatewaycontract.md#protected-_abiencoderbyfunctionsignature)
* [_web3Wrapper](ordergatewaycontract.md#protected-_web3wrapper)
* [abi](ordergatewaycontract.md#abi)
* [address](ordergatewaycontract.md#address)
* [constructorArgs](ordergatewaycontract.md#constructorargs)
* [contractName](ordergatewaycontract.md#contractname)
* [txReceipt](ordergatewaycontract.md#optional-txreceipt)

#### Methods

* [_lookupAbi](ordergatewaycontract.md#protected-_lookupabi)
* [_lookupAbiEncoder](ordergatewaycontract.md#protected-_lookupabiencoder)
* [_strictEncodeArguments](ordergatewaycontract.md#protected-_strictencodearguments)
* [_applyDefaultsToTxDataAsync](ordergatewaycontract.md#static-protected-_applydefaultstotxdataasync)
* [_bigNumberToString](ordergatewaycontract.md#static-protected-_bignumbertostring)
* [_formatABIDataItemList](ordergatewaycontract.md#static-protected-_formatabidataitemlist)
* [_lookupConstructorAbi](ordergatewaycontract.md#static-protected-_lookupconstructorabi)
* [_lowercaseAddress](ordergatewaycontract.md#static-protected-_lowercaseaddress)
* [_throwIfRevertWithReasonCallResult](ordergatewaycontract.md#static-protected-_throwifrevertwithreasoncallresult)
* [deployAsync](ordergatewaycontract.md#static-deployasync)
* [deployFrom0xArtifactAsync](ordergatewaycontract.md#static-deployfrom0xartifactasync)
* [strictArgumentEncodingCheck](ordergatewaycontract.md#static-strictargumentencodingcheck)

#### Object literals

* [amountRemaining](ordergatewaycontract.md#amountremaining)
* [arguments](ordergatewaycontract.md#arguments)
* [isValid](ordergatewaycontract.md#isvalid)
* [participate](ordergatewaycontract.md#participate)

## Constructors

###  constructor

\+ **new OrderGatewayContract**(`abi`: `ContractAbi`, `address`: string, `supportedProvider`: `SupportedProvider`, `txDefaults?`: `Partial<TxData>`): *[OrderGatewayContract](ordergatewaycontract.md)*

*Overrides void*

Defined in generated-wrappers/order_gateway.ts:276

**Parameters:**

Name | Type |
------ | ------ |
`abi` | `ContractAbi` |
`address` | string |
`supportedProvider` | `SupportedProvider` |
`txDefaults?` | `Partial<TxData>` |

**Returns:** *[OrderGatewayContract](ordergatewaycontract.md)*

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

Defined in generated-wrappers/order_gateway.ts:29

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

▸ **deployAsync**(`bytecode`: string, `abi`: `ContractAbi`, `supportedProvider`: `SupportedProvider`, `txDefaults`: `Partial<TxData>`): *`Promise<OrderGatewayContract>`*

Defined in generated-wrappers/order_gateway.ts:246

**Parameters:**

Name | Type |
------ | ------ |
`bytecode` | string |
`abi` | `ContractAbi` |
`supportedProvider` | `SupportedProvider` |
`txDefaults` | `Partial<TxData>` |

**Returns:** *`Promise<OrderGatewayContract>`*

___

### `Static` deployFrom0xArtifactAsync

▸ **deployFrom0xArtifactAsync**(`artifact`: `ContractArtifact` | `SimpleContractArtifact`, `supportedProvider`: `SupportedProvider`, `txDefaults`: `Partial<TxData>`): *`Promise<OrderGatewayContract>`*

Defined in generated-wrappers/order_gateway.ts:233

**Parameters:**

Name | Type |
------ | ------ |
`artifact` | `ContractArtifact` | `SimpleContractArtifact` |
`supportedProvider` | `SupportedProvider` |
`txDefaults` | `Partial<TxData>` |

**Returns:** *`Promise<OrderGatewayContract>`*

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

###  amountRemaining

### ■ **amountRemaining**: *object*

Defined in generated-wrappers/order_gateway.ts:173

###  callAsync

▸ **callAsync**(`subContract`: string, `data`: string, `callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): *`Promise<BigNumber>`*

Defined in generated-wrappers/order_gateway.ts:174

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`subContract` | string | - |
`data` | string | - |
`callData` | `Partial<CallData>` |  {} |
`defaultBlock?` | `BlockParam` | - |

**Returns:** *`Promise<BigNumber>`*

___

###  arguments

### ■ **arguments**: *object*

Defined in generated-wrappers/order_gateway.ts:145

###  callAsync

▸ **callAsync**(`subContract`: string, `callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): *`Promise<string>`*

Defined in generated-wrappers/order_gateway.ts:146

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`subContract` | string | - |
`callData` | `Partial<CallData>` |  {} |
`defaultBlock?` | `BlockParam` | - |

**Returns:** *`Promise<string>`*

___

###  isValid

### ■ **isValid**: *object*

Defined in generated-wrappers/order_gateway.ts:203

###  callAsync

▸ **callAsync**(`subContract`: string, `data`: string, `callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): *`Promise<boolean>`*

Defined in generated-wrappers/order_gateway.ts:204

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`subContract` | string | - |
`data` | string | - |
`callData` | `Partial<CallData>` |  {} |
`defaultBlock?` | `BlockParam` | - |

**Returns:** *`Promise<boolean>`*

___

###  participate

### ■ **participate**: *object*

Defined in generated-wrappers/order_gateway.ts:30

###  awaitTransactionSuccessAsync

▸ **awaitTransactionSuccessAsync**(`subContract`: string, `data`: string, `txData?`: `Partial<TxData>` | number, `pollingIntervalMs?`: number, `timeoutMs?`: number): *`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`*

Defined in generated-wrappers/order_gateway.ts:56

**Parameters:**

Name | Type |
------ | ------ |
`subContract` | string |
`data` | string |
`txData?` | `Partial<TxData>` | number |
`pollingIntervalMs?` | number |
`timeoutMs?` | number |

**Returns:** *`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`*

###  callAsync

▸ **callAsync**(`subContract`: string, `data`: string, `callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): *`Promise<boolean>`*

Defined in generated-wrappers/order_gateway.ts:116

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`subContract` | string | - |
`data` | string | - |
`callData` | `Partial<CallData>` |  {} |
`defaultBlock?` | `BlockParam` | - |

**Returns:** *`Promise<boolean>`*

###  estimateGasAsync

▸ **estimateGasAsync**(`subContract`: string, `data`: string, `txData`: `Partial<TxData>`): *`Promise<number>`*

Defined in generated-wrappers/order_gateway.ts:86

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`subContract` | string | - |
`data` | string | - |
`txData` | `Partial<TxData>` |  {} |

**Returns:** *`Promise<number>`*

###  getABIEncodedTransactionData

▸ **getABIEncodedTransactionData**(`subContract`: string, `data`: string): *string*

Defined in generated-wrappers/order_gateway.ts:106

**Parameters:**

Name | Type |
------ | ------ |
`subContract` | string |
`data` | string |

**Returns:** *string*

###  sendTransactionAsync

▸ **sendTransactionAsync**(`subContract`: string, `data`: string, `txData`: `Partial<TxData>`): *`Promise<string>`*

Defined in generated-wrappers/order_gateway.ts:31

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`subContract` | string | - |
`data` | string | - |
`txData` | `Partial<TxData>` |  {} |

**Returns:** *`Promise<string>`*

___