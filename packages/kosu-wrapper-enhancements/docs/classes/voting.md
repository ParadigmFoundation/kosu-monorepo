[wrapper-enhancements](../README.md) › [Globals](../globals.md) › [Voting](voting.md)

# Class: Voting

Integration with Voting contract on an Ethereum blockchain.

## Hierarchy

* **Voting**

## Index

### Constructors

* [constructor](voting.md#constructor)

### Properties

* [address](voting.md#address)
* [treasury](voting.md#treasury)
* [web3Wrapper](voting.md#web3wrapper)

### Methods

* [commitVote](voting.md#commitvote)
* [getContract](voting.md#getcontract)
* [revealVote](voting.md#revealvote)
* [totalRevealedTokens](voting.md#totalrevealedtokens)
* [totalWinningTokens](voting.md#totalwinningtokens)
* [userWinningTokens](voting.md#userwinningtokens)
* [winningOption](voting.md#winningoption)

## Constructors

###  constructor

\+ **new Voting**(`options`: KosuOptions, `treasury?`: [Treasury](treasury.md)): *[Voting](voting.md)*

*Defined in [Voting.ts:18](https://github.com/ParadigmFoundation/kosu-monorepo/blob/821f0d85/packages/kosu-wrapper-enhancements/src/Voting.ts#L18)*

Create a new Voting instance.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`options` | KosuOptions | instantiation options |
`treasury?` | [Treasury](treasury.md) | treasury integration instance  |

**Returns:** *[Voting](voting.md)*

## Properties

###  address

• **address**: *string*

*Defined in [Voting.ts:16](https://github.com/ParadigmFoundation/kosu-monorepo/blob/821f0d85/packages/kosu-wrapper-enhancements/src/Voting.ts#L16)*

___

###  treasury

• **treasury**: *[Treasury](treasury.md)*

*Defined in [Voting.ts:14](https://github.com/ParadigmFoundation/kosu-monorepo/blob/821f0d85/packages/kosu-wrapper-enhancements/src/Voting.ts#L14)*

___

###  web3Wrapper

• **web3Wrapper**: *Web3Wrapper*

*Defined in [Voting.ts:15](https://github.com/ParadigmFoundation/kosu-monorepo/blob/821f0d85/packages/kosu-wrapper-enhancements/src/Voting.ts#L15)*

## Methods

###  commitVote

▸ **commitVote**(`_pollId`: BigNumber, `_vote`: string, `_tokensToCommit`: BigNumber): *Promise‹TransactionReceiptWithDecodedLogs›*

*Defined in [Voting.ts:63](https://github.com/ParadigmFoundation/kosu-monorepo/blob/821f0d85/packages/kosu-wrapper-enhancements/src/Voting.ts#L63)*

Commits vote to voting contract

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`_pollId` | BigNumber | uint poll index |
`_vote` | string | encoded vote option |
`_tokensToCommit` | BigNumber | uint number of tokens to be commited to vote  |

**Returns:** *Promise‹TransactionReceiptWithDecodedLogs›*

___

###  getContract

▸ **getContract**(): *Promise‹VotingContract›*

*Defined in [Voting.ts:37](https://github.com/ParadigmFoundation/kosu-monorepo/blob/821f0d85/packages/kosu-wrapper-enhancements/src/Voting.ts#L37)*

Asynchronously initializes the contract instance or returns it from cache

**Returns:** *Promise‹VotingContract›*

The contract

___

###  revealVote

▸ **revealVote**(`_pollId`: BigNumber, `_voteOption`: BigNumber, `_voteSalt`: BigNumber): *Promise‹TransactionReceiptWithDecodedLogs›*

*Defined in [Voting.ts:92](https://github.com/ParadigmFoundation/kosu-monorepo/blob/821f0d85/packages/kosu-wrapper-enhancements/src/Voting.ts#L92)*

Reveals vote on voting contract

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`_pollId` | BigNumber | uint poll index |
`_voteOption` | BigNumber | uint representation of vote position |
`_voteSalt` | BigNumber | uint salt used to encode vote option  |

**Returns:** *Promise‹TransactionReceiptWithDecodedLogs›*

___

###  totalRevealedTokens

▸ **totalRevealedTokens**(`_pollId`: BigNumber): *Promise‹BigNumber›*

*Defined in [Voting.ts:130](https://github.com/ParadigmFoundation/kosu-monorepo/blob/821f0d85/packages/kosu-wrapper-enhancements/src/Voting.ts#L130)*

Reads the total winning tokens for poll

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`_pollId` | BigNumber | uint poll index  |

**Returns:** *Promise‹BigNumber›*

___

###  totalWinningTokens

▸ **totalWinningTokens**(`_pollId`: BigNumber): *Promise‹BigNumber›*

*Defined in [Voting.ts:120](https://github.com/ParadigmFoundation/kosu-monorepo/blob/821f0d85/packages/kosu-wrapper-enhancements/src/Voting.ts#L120)*

Reads the total winning tokens for poll

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`_pollId` | BigNumber | uint poll index  |

**Returns:** *Promise‹BigNumber›*

___

###  userWinningTokens

▸ **userWinningTokens**(`_pollId`: BigNumber, `_userAddress`: string): *Promise‹BigNumber›*

*Defined in [Voting.ts:141](https://github.com/ParadigmFoundation/kosu-monorepo/blob/821f0d85/packages/kosu-wrapper-enhancements/src/Voting.ts#L141)*

Reads users winning tokens committed for poll

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`_pollId` | BigNumber | - | uint poll index |
`_userAddress` | string |  this.coinbase | address of user whose winning contribution is  |

**Returns:** *Promise‹BigNumber›*

___

###  winningOption

▸ **winningOption**(`_pollId`: BigNumber): *Promise‹BigNumber›*

*Defined in [Voting.ts:110](https://github.com/ParadigmFoundation/kosu-monorepo/blob/821f0d85/packages/kosu-wrapper-enhancements/src/Voting.ts#L110)*

Reads the winning option for poll

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`_pollId` | BigNumber | uint poll index  |

**Returns:** *Promise‹BigNumber›*
