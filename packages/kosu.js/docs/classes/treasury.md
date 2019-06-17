> ## [kosu.js](../README.md)

[Globals](../globals.md) / [Treasury](treasury.md) /

# Class: Treasury

Integration with Treasury contract on an Ethereum blockchain.

## Hierarchy

* **Treasury**

### Index

#### Constructors

* [constructor](treasury.md#constructor)

#### Properties

* [address](treasury.md#private-address)
* [coinbase](treasury.md#private-coinbase)
* [contract](treasury.md#private-contract)
* [kosuToken](treasury.md#kosutoken)
* [web3](treasury.md#private-web3)
* [web3Wrapper](treasury.md#private-web3wrapper)

#### Methods

* [approveTreasury](treasury.md#approvetreasury)
* [currentBalance](treasury.md#currentbalance)
* [deposit](treasury.md#deposit)
* [getContract](treasury.md#private-getcontract)
* [systemBalance](treasury.md#systembalance)
* [treasuryAllowance](treasury.md#treasuryallowance)
* [withdraw](treasury.md#withdraw)

## Constructors

###  constructor

\+ **new Treasury**(`options`: `KosuOptions`, `kosuToken`: [KosuToken](kosutoken.md)): *[Treasury](treasury.md)*

*Defined in [src/Treasury.ts:19](url)*

Creates a new Treasury instance

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`options` | `KosuOptions` | initialization options |
`kosuToken` | [KosuToken](kosutoken.md) | KosuToken instance  |

**Returns:** *[Treasury](treasury.md)*

___

## Properties

### `Private` address

● **address**: *string*

*Defined in [src/Treasury.ts:16](url)*

___

### `Private` coinbase

● **coinbase**: *string*

*Defined in [src/Treasury.ts:19](url)*

___

### `Private` contract

● **contract**: *[TreasuryContract](treasurycontract.md)*

*Defined in [src/Treasury.ts:17](url)*

___

###  kosuToken

● **kosuToken**: *[KosuToken](kosutoken.md)*

*Defined in [src/Treasury.ts:13](url)*

___

### `Private` web3

● **web3**: *`Web3`*

*Defined in [src/Treasury.ts:15](url)*

___

### `Private` web3Wrapper

● **web3Wrapper**: *`Web3Wrapper`*

*Defined in [src/Treasury.ts:18](url)*

___

## Methods

###  approveTreasury

▸ **approveTreasury**(`value`: `BigNumber`): *`Promise<TransactionReceiptWithDecodedLogs>`*

*Defined in [src/Treasury.ts:119](url)*

**Parameters:**

Name | Type |
------ | ------ |
`value` | `BigNumber` |

**Returns:** *`Promise<TransactionReceiptWithDecodedLogs>`*

___

###  currentBalance

▸ **currentBalance**(`address`: string): *`Promise<BigNumber>`*

*Defined in [src/Treasury.ts:109](url)*

Read addresses system balance

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`address` | string | Ethereum address  |

**Returns:** *`Promise<BigNumber>`*

___

###  deposit

▸ **deposit**(`value`: `BigNumber`): *`Promise<TransactionReceiptWithDecodedLogs>`*

*Defined in [src/Treasury.ts:66](url)*

Deposit tokens in the treasury

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`value` | `BigNumber` | uint value of tokens to deposit  |

**Returns:** *`Promise<TransactionReceiptWithDecodedLogs>`*

___

### `Private` getContract

▸ **getContract**(): *`Promise<TreasuryContract>`*

*Defined in [src/Treasury.ts:39](url)*

Asynchronously initializes the contract instance or returns it from cache

**Returns:** *`Promise<TreasuryContract>`*

The contract

___

###  systemBalance

▸ **systemBalance**(`address`: string): *`Promise<BigNumber>`*

*Defined in [src/Treasury.ts:99](url)*

Read addresses system balance

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`address` | string | Ethereum address  |

**Returns:** *`Promise<BigNumber>`*

___

###  treasuryAllowance

▸ **treasuryAllowance**(): *`Promise<BigNumber>`*

*Defined in [src/Treasury.ts:114](url)*

**Returns:** *`Promise<BigNumber>`*

___

###  withdraw

▸ **withdraw**(`value`: `BigNumber`): *`Promise<TransactionReceiptWithDecodedLogs>`*

*Defined in [src/Treasury.ts:89](url)*

Withdraw tokens from treasury

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`value` | `BigNumber` | uint value of tokens to withdraw  |

**Returns:** *`Promise<TransactionReceiptWithDecodedLogs>`*

___