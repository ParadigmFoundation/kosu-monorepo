> ## [kosu.js](../README.md)

[Globals](../globals.md) / [KosuToken](kosutoken.md) /

# Class: KosuToken

The `KosuToken` class is a wrapper for the Kosu ERC-20 token contract, and
provides all necessary methods for interacting with the contract on any
Ethereum network for which the contract has been deployed.

If instantiated outside the `Kosu` class, an instance of `web3` and of the
`web3Wrapper` must be supplied in the options object.

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

*Defined in [src/KosuToken.ts:37](url)*

Creates a new KosuToken instance, supplied with an options object.

The KosuToken address _may_ be passed in as `options.kosuTokenAddress`, but
can also be loaded during each method call from the known deployed addresses.

**`example`** 
```typescript
const options = { web3: new Web3(window.ethereum), web3Wrapper };
const kosuToken = new KosuToken(options);
```

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`options` | `KosuOptions` | initialization options object (incl. `web3` and `web3wrapper`) |

**Returns:** *[KosuToken](kosutoken.md)*

___

## Properties

### `Private` address

● **address**: *string*

*Defined in [src/KosuToken.ts:37](url)*

The current KosuToken deployed address, loaded based on the detected
`networkId` from a mapping of known deployed addresses.

___

### `Private` contract

● **contract**: *[KosuTokenContract](kosutokencontract.md)*

*Defined in [src/KosuToken.ts:25](url)*

An instance of the lower-level contract wrapper for the Kosu token, auto-
generated from the Solidity source code.

___

### `Private` web3

● **web3**: *`Web3`*

*Defined in [src/KosuToken.ts:19](url)*

An instance of `web3` used to interact with the Ethereum blockchain.

___

### `Private` web3Wrapper

● **web3Wrapper**: *`Web3Wrapper`*

*Defined in [src/KosuToken.ts:31](url)*

An instance of a 0x `Web3Wrapper` used for some RPC calls and for certain
methods.

___

## Methods

###  allowance

▸ **allowance**(`owner`: string, `spender`: string): *`Promise<BigNumber>`*

*Defined in [src/KosuToken.ts:151](url)*

Reads approved allowance for a given `owner` and `spender` account.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`owner` | string | Address of source tokens |
`spender` | string | Address of spender of tokens |

**Returns:** *`Promise<BigNumber>`*

The allowance granted to the `spender` in units of wei.

___

###  approve

▸ **approve**(`spender`: string, `value`: `BigNumber`): *`Promise<TransactionReceiptWithDecodedLogs>`*

*Defined in [src/KosuToken.ts:139](url)*

Sets approval for user to transfer tokens on `coinbase`'s behalf.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`spender` | string | Address allowed to spend `coinbase`'s tokens. |
`value` | `BigNumber` | The uint value (in wei) to approve `spender` for. |

**Returns:** *`Promise<TransactionReceiptWithDecodedLogs>`*

The transaction receipt after it has been included in a block.

___

###  balanceOf

▸ **balanceOf**(`owner`: string): *`Promise<BigNumber>`*

*Defined in [src/KosuToken.ts:102](url)*

Reads the balance for a user address, returned in wei.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`owner` | string | The Ethereum address of a token holder. |

**Returns:** *`Promise<BigNumber>`*

The `owner`'s KOSU balance in wei.

___

### `Private` getContract

▸ **getContract**(): *`Promise<KosuTokenContract>`*

*Defined in [src/KosuToken.ts:63](url)*

Asynchronously initializes the contract instance or returns it from cache.

**Returns:** *`Promise<KosuTokenContract>`*

the KosuToken contract instance.

___

###  totalSupply

▸ **totalSupply**(): *`Promise<BigNumber>`*

*Defined in [src/KosuToken.ts:91](url)*

Reads the total supply of KOSU, resolves to a `BigNumber` of the amount of
tokens in units of wei.

**Returns:** *`Promise<BigNumber>`*

The total KOSU supply in wei.

___

###  transfer

▸ **transfer**(`to`: string, `value`: `BigNumber`): *`Promise<TransactionReceiptWithDecodedLogs>`*

*Defined in [src/KosuToken.ts:114](url)*

Transfers tokens to an address, from the current `coinbase` account.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`to` | string | Ethereum Address of token receiver. |
`value` | `BigNumber` | The `uint` value of tokens to transfer (in wei). |

**Returns:** *`Promise<TransactionReceiptWithDecodedLogs>`*

The transaction's receipt after inclusion in a block.

___

###  transferFrom

▸ **transferFrom**(`from`: string, `to`: string, `value`: `BigNumber`): *`Promise<TransactionReceiptWithDecodedLogs>`*

*Defined in [src/KosuToken.ts:127](url)*

Transfers token from an address to a destination address.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`from` | string | Address of token source. |
`to` | string | Address of token destination. |
`value` | `BigNumber` | The `uint` value of tokens to transfer (in wei). |

**Returns:** *`Promise<TransactionReceiptWithDecodedLogs>`*

The transaction receipt after it has been included in a block.

___