> ## [kosu.js](../README.md)

[Globals](../globals.md) / [Voting](voting.md) /

# Class: Voting

Integration with Voting contract on an Ethereum blockchain.

## Hierarchy

* **Voting**

### Index

#### Constructors

* [constructor](voting.md#constructor)

#### Properties

* [address](voting.md#private-address)
* [coinbase](voting.md#private-coinbase)
* [contract](voting.md#private-contract)
* [treasury](voting.md#private-treasury)
* [web3](voting.md#private-web3)
* [web3Wrapper](voting.md#private-web3wrapper)

#### Methods

* [commitVote](voting.md#commitvote)
* [encodeVote](voting.md#encodevote)
* [getContract](voting.md#private-getcontract)
* [revealVote](voting.md#revealvote)
* [totalRevealedTokens](voting.md#totalrevealedtokens)
* [totalWinningTokens](voting.md#totalwinningtokens)
* [userWinningTokens](voting.md#userwinningtokens)
* [winningOption](voting.md#winningoption)

## Constructors

###  constructor

\+ **new Voting**(`options`: [KosuOptions](../interfaces/kosuoptions.md), `treasury`: [Treasury](treasury.md)): *[Voting](voting.md)*

Defined in Voting.ts:18

Create a new Voting instance.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`options` | [KosuOptions](../interfaces/kosuoptions.md) | instantiation options |
`treasury` | [Treasury](treasury.md) | treasury integration instance  |

**Returns:** *[Voting](voting.md)*

___

## Properties

### `Private` address

● **address**: *string*

Defined in Voting.ts:16

___

### `Private` coinbase

● **coinbase**: *string*

Defined in Voting.ts:18

___

### `Private` contract

● **contract**: *any*

Defined in Voting.ts:17

___

### `Private` treasury

● **treasury**: *[Treasury](treasury.md)*

Defined in Voting.ts:14

___

### `Private` web3

● **web3**: *`Web3`*

Defined in Voting.ts:13

___

### `Private` web3Wrapper

● **web3Wrapper**: *`Web3Wrapper`*

Defined in Voting.ts:15

___

## Methods

###  commitVote

▸ **commitVote**(`_pollId`: `BigNumber`, `_vote`: string, `_tokensToCommit`: `BigNumber`): *`Promise<TransactionReceiptWithDecodedLogs>`*

Defined in Voting.ts:67

Commits vote to voting contract

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`_pollId` | `BigNumber` | uint poll index |
`_vote` | string | encoded vote option |
`_tokensToCommit` | `BigNumber` | uint number of tokens to be commited to vote  |

**Returns:** *`Promise<TransactionReceiptWithDecodedLogs>`*

___

###  encodeVote

▸ **encodeVote**(`_voteOption`: string, `_voteSalt`: string): *string*

Defined in Voting.ts:150

Encodes a vote by hashing the option and salt

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`_voteOption` | string | . |
`_voteSalt` | string | .  |

**Returns:** *string*

Encoded vote

___

### `Private` getContract

▸ **getContract**(): *`Promise<VotingContract>`*

Defined in Voting.ts:38

Asynchronously initializes the contract instance or returns it from cache

**Returns:** *`Promise<VotingContract>`*

The contract

___

###  revealVote

▸ **revealVote**(`_pollId`: `BigNumber`, `_voteOption`: `BigNumber`, `_voteSalt`: `BigNumber`): *`Promise<TransactionReceiptWithDecodedLogs>`*

Defined in Voting.ts:92

Reveals vote on voting contract

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`_pollId` | `BigNumber` | uint poll index |
`_voteOption` | `BigNumber` | uint representation of vote position |
`_voteSalt` | `BigNumber` | uint salt used to encode vote option  |

**Returns:** *`Promise<TransactionReceiptWithDecodedLogs>`*

___

###  totalRevealedTokens

▸ **totalRevealedTokens**(`_pollId`: `BigNumber`): *`Promise<BigNumber>`*

Defined in Voting.ts:126

Reads the total winning tokens for poll

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`_pollId` | `BigNumber` | uint poll index  |

**Returns:** *`Promise<BigNumber>`*

___

###  totalWinningTokens

▸ **totalWinningTokens**(`_pollId`: `BigNumber`): *`Promise<BigNumber>`*

Defined in Voting.ts:116

Reads the total winning tokens for poll

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`_pollId` | `BigNumber` | uint poll index  |

**Returns:** *`Promise<BigNumber>`*

___

###  userWinningTokens

▸ **userWinningTokens**(`_pollId`: `BigNumber`, `_userAddress`: string): *`Promise<BigNumber>`*

Defined in Voting.ts:137

Reads users winning tokens committed for poll

**Parameters:**

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`_pollId` | `BigNumber` | - | uint poll index |
`_userAddress` | string |  this.coinbase | address of user whose winning contribution is  |

**Returns:** *`Promise<BigNumber>`*

___

###  winningOption

▸ **winningOption**(`_pollId`: `BigNumber`): *`Promise<BigNumber>`*

Defined in Voting.ts:106

Reads the winning option for poll

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`_pollId` | `BigNumber` | uint poll index  |

**Returns:** *`Promise<BigNumber>`*

___