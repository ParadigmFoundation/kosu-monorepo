> ## [kosu.js](../README.md)

[Globals](../globals.md) / [KosuToken](kosutoken.md) /

# Class: KosuToken

Integration with KosuToken contract on an Ethereum blockchain.

## Hierarchy

* **KosuToken**

### Index

#### Constructors

* [constructor](kosutoken.md#constructor)

#### Properties

* [address](kosutoken.md#private-address)
* [contract](kosutoken.md#private-contract)
* [web3](kosutoken.md#private-web3)
* [web3Wrapper](kosutoken.md#private-web3wrapper)

#### Methods

* [allowance](kosutoken.md#allowance)
* [approve](kosutoken.md#approve)
* [balanceOf](kosutoken.md#balanceof)
* [getContract](kosutoken.md#private-getcontract)
* [totalSupply](kosutoken.md#totalsupply)
* [transfer](kosutoken.md#transfer)
* [transferFrom](kosutoken.md#transferfrom)

## Constructors

###  constructor

\+ **new KosuToken**(`options`: `KosuOptions`): *[KosuToken](kosutoken.md)*

*Defined in [packages/kosu.js/src/KosuToken.ts:15](url)*

Creates a new KosuToken instance

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`options` | `KosuOptions` | initialization options  |

**Returns:** *[KosuToken](kosutoken.md)*

___

## Properties

### `Private` address

● **address**: *string*

*Defined in [packages/kosu.js/src/KosuToken.ts:15](url)*

___

### `Private` contract

● **contract**: *[KosuTokenContract](kosutokencontract.md)*

*Defined in [packages/kosu.js/src/KosuToken.ts:13](url)*

___

### `Private` web3

● **web3**: *`Web3`*

*Defined in [packages/kosu.js/src/KosuToken.ts:12](url)*

___

### `Private` web3Wrapper

● **web3Wrapper**: *`Web3Wrapper`*

*Defined in [packages/kosu.js/src/KosuToken.ts:14](url)*

___

## Methods

###  allowance

▸ **allowance**(`owner`: string, `spender`: string): *`Promise<BigNumber>`*

*Defined in [packages/kosu.js/src/KosuToken.ts:113](url)*

Reads approved allowance for user pair

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`owner` | string | Address of source tokens |
`spender` | string | Address of spender of tokens  |

**Returns:** *`Promise<BigNumber>`*

___

###  approve

▸ **approve**(`spender`: string, `value`: `BigNumber`): *`Promise<TransactionReceiptWithDecodedLogs>`*

*Defined in [packages/kosu.js/src/KosuToken.ts:102](url)*

Sets approval for user to transfer tokens on coinbase's behalf

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`spender` | string | Address allowed to spend coinbase's tokens |
`value` | `BigNumber` | uint value of tokens to transfer  |

**Returns:** *`Promise<TransactionReceiptWithDecodedLogs>`*

___

###  balanceOf

▸ **balanceOf**(`owner`: string): *`Promise<BigNumber>`*

*Defined in [packages/kosu.js/src/KosuToken.ts:68](url)*

Reads the balance for a user address

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`owner` | string | Address of token holder  |

**Returns:** *`Promise<BigNumber>`*

___

### `Private` getContract

▸ **getContract**(): *`Promise<KosuTokenContract>`*

*Defined in [packages/kosu.js/src/KosuToken.ts:33](url)*

Asynchronously initializes the contract instance or returns it from cache

**Returns:** *`Promise<KosuTokenContract>`*

The contract

___

###  totalSupply

▸ **totalSupply**(): *`Promise<BigNumber>`*

*Defined in [packages/kosu.js/src/KosuToken.ts:58](url)*

Reads the total supply

**Returns:** *`Promise<BigNumber>`*

___

###  transfer

▸ **transfer**(`to`: string, `value`: `BigNumber`): *`Promise<TransactionReceiptWithDecodedLogs>`*

*Defined in [packages/kosu.js/src/KosuToken.ts:79](url)*

Transfers tokens to a user

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`to` | string | Address of token receiver |
`value` | `BigNumber` | uint value of tokens to transfer  |

**Returns:** *`Promise<TransactionReceiptWithDecodedLogs>`*

___

###  transferFrom

▸ **transferFrom**(`from`: string, `to`: string, `value`: `BigNumber`): *`Promise<TransactionReceiptWithDecodedLogs>`*

*Defined in [packages/kosu.js/src/KosuToken.ts:91](url)*

Transfers token from an address to a destination address

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`from` | string | Address of token source |
`to` | string | Address of token destination |
`value` | `BigNumber` | uint value of tokens to transfer  |

**Returns:** *`Promise<TransactionReceiptWithDecodedLogs>`*

___