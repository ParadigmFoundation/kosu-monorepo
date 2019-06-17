> ## [@kosu/system-contracts](../README.md)

[Globals](../globals.md) / ["packages/kosu.js/src/Treasury"](../modules/_packages_kosu_js_src_treasury_.md) / [Treasury](_packages_kosu_js_src_treasury_.treasury.md) /

# Class: Treasury

Integration with Treasury contract on an Ethereum blockchain.

## Hierarchy

* **Treasury**

### Index

#### Constructors

* [constructor](_packages_kosu_js_src_treasury_.treasury.md#constructor)

#### Properties

* [address](_packages_kosu_js_src_treasury_.treasury.md#private-address)
* [coinbase](_packages_kosu_js_src_treasury_.treasury.md#private-coinbase)
* [contract](_packages_kosu_js_src_treasury_.treasury.md#private-contract)
* [kosuToken](_packages_kosu_js_src_treasury_.treasury.md#kosutoken)
* [web3](_packages_kosu_js_src_treasury_.treasury.md#private-web3)
* [web3Wrapper](_packages_kosu_js_src_treasury_.treasury.md#private-web3wrapper)

#### Methods

* [approveTreasury](_packages_kosu_js_src_treasury_.treasury.md#approvetreasury)
* [currentBalance](_packages_kosu_js_src_treasury_.treasury.md#currentbalance)
* [deposit](_packages_kosu_js_src_treasury_.treasury.md#deposit)
* [getContract](_packages_kosu_js_src_treasury_.treasury.md#private-getcontract)
* [systemBalance](_packages_kosu_js_src_treasury_.treasury.md#systembalance)
* [treasuryAllowance](_packages_kosu_js_src_treasury_.treasury.md#treasuryallowance)
* [withdraw](_packages_kosu_js_src_treasury_.treasury.md#withdraw)

## Constructors

###  constructor

\+ **new Treasury**(`options`: `KosuOptions`, `kosuToken`: [KosuToken](_packages_kosu_js_src_kosutoken_.kosutoken.md)): *[Treasury](_packages_kosu_js_src_treasury_.treasury.md)*

*Defined in [packages/kosu.js/src/Treasury.ts:19](url)*

Creates a new Treasury instance

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`options` | `KosuOptions` | initialization options |
`kosuToken` | [KosuToken](_packages_kosu_js_src_kosutoken_.kosutoken.md) | KosuToken instance  |

**Returns:** *[Treasury](_packages_kosu_js_src_treasury_.treasury.md)*

___

## Properties

### `Private` address

● **address**: *string*

*Defined in [packages/kosu.js/src/Treasury.ts:16](url)*

___

### `Private` coinbase

● **coinbase**: *string*

*Defined in [packages/kosu.js/src/Treasury.ts:19](url)*

___

### `Private` contract

● **contract**: *[TreasuryContract](_node_modules__kosu_system_contracts_generated_wrappers_treasury_.treasurycontract.md)*

*Defined in [packages/kosu.js/src/Treasury.ts:17](url)*

___

###  kosuToken

● **kosuToken**: *[KosuToken](_packages_kosu_js_src_kosutoken_.kosutoken.md)*

*Defined in [packages/kosu.js/src/Treasury.ts:13](url)*

___

### `Private` web3

● **web3**: *`Web3`*

*Defined in [packages/kosu.js/src/Treasury.ts:15](url)*

___

### `Private` web3Wrapper

● **web3Wrapper**: *`Web3Wrapper`*

*Defined in [packages/kosu.js/src/Treasury.ts:18](url)*

___

## Methods

###  approveTreasury

▸ **approveTreasury**(`value`: `BigNumber`): *`Promise<TransactionReceiptWithDecodedLogs>`*

*Defined in [packages/kosu.js/src/Treasury.ts:119](url)*

**Parameters:**

Name | Type |
------ | ------ |
`value` | `BigNumber` |

**Returns:** *`Promise<TransactionReceiptWithDecodedLogs>`*

___

###  currentBalance

▸ **currentBalance**(`address`: string): *`Promise<BigNumber>`*

*Defined in [packages/kosu.js/src/Treasury.ts:109](url)*

Read addresses system balance

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`address` | string | Ethereum address  |

**Returns:** *`Promise<BigNumber>`*

___

###  deposit

▸ **deposit**(`value`: `BigNumber`): *`Promise<TransactionReceiptWithDecodedLogs>`*

*Defined in [packages/kosu.js/src/Treasury.ts:66](url)*

Deposit tokens in the treasury

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`value` | `BigNumber` | uint value of tokens to deposit  |

**Returns:** *`Promise<TransactionReceiptWithDecodedLogs>`*

___

### `Private` getContract

▸ **getContract**(): *`Promise<TreasuryContract>`*

*Defined in [packages/kosu.js/src/Treasury.ts:39](url)*

Asynchronously initializes the contract instance or returns it from cache

**Returns:** *`Promise<TreasuryContract>`*

The contract

___

###  systemBalance

▸ **systemBalance**(`address`: string): *`Promise<BigNumber>`*

*Defined in [packages/kosu.js/src/Treasury.ts:99](url)*

Read addresses system balance

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`address` | string | Ethereum address  |

**Returns:** *`Promise<BigNumber>`*

___

###  treasuryAllowance

▸ **treasuryAllowance**(): *`Promise<BigNumber>`*

*Defined in [packages/kosu.js/src/Treasury.ts:114](url)*

**Returns:** *`Promise<BigNumber>`*

___

###  withdraw

▸ **withdraw**(`value`: `BigNumber`): *`Promise<TransactionReceiptWithDecodedLogs>`*

*Defined in [packages/kosu.js/src/Treasury.ts:89](url)*

Withdraw tokens from treasury

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`value` | `BigNumber` | uint value of tokens to withdraw  |

**Returns:** *`Promise<TransactionReceiptWithDecodedLogs>`*

___