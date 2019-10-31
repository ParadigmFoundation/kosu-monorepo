[Wrapper Enhancements](../README.md) › [Globals](../globals.md) › [Voting](voting.md)

# Class: Voting

Integration with Voting contract on an Ethereum blockchain.

## Hierarchy

-   **Voting**

## Index

### Constructors

-   [constructor](voting.md#constructor)

### Properties

-   [address](voting.md#address)
-   [treasury](voting.md#treasury)
-   [web3Wrapper](voting.md#web3wrapper)

### Methods

-   [commitVote](voting.md#commitvote)
-   [getContract](voting.md#getcontract)
-   [revealVote](voting.md#revealvote)
-   [totalRevealedTokens](voting.md#totalrevealedtokens)
-   [totalWinningTokens](voting.md#totalwinningtokens)
-   [userWinningTokens](voting.md#userwinningtokens)
-   [winningOption](voting.md#winningoption)

## Constructors

### constructor

\+ **new Voting**(`options`: KosuOptions, `treasury?`: [Treasury](treasury.md)): _[Voting](voting.md)_

_Defined in [Voting.ts:18](https://github.com/ParadigmFoundation/kosu-monorepo/blob/55c0be50/packages/kosu-wrapper-enhancements/src/Voting.ts#L18)_

Create a new Voting instance.

**Parameters:**

| Name        | Type                    | Description                   |
| ----------- | ----------------------- | ----------------------------- |
| `options`   | KosuOptions             | instantiation options         |
| `treasury?` | [Treasury](treasury.md) | treasury integration instance |

**Returns:** _[Voting](voting.md)_

## Properties

### address

• **address**: _string_

_Defined in [Voting.ts:16](https://github.com/ParadigmFoundation/kosu-monorepo/blob/55c0be50/packages/kosu-wrapper-enhancements/src/Voting.ts#L16)_

---

### treasury

• **treasury**: _[Treasury](treasury.md)_

_Defined in [Voting.ts:14](https://github.com/ParadigmFoundation/kosu-monorepo/blob/55c0be50/packages/kosu-wrapper-enhancements/src/Voting.ts#L14)_

---

### web3Wrapper

• **web3Wrapper**: _Web3Wrapper_

_Defined in [Voting.ts:15](https://github.com/ParadigmFoundation/kosu-monorepo/blob/55c0be50/packages/kosu-wrapper-enhancements/src/Voting.ts#L15)_

## Methods

### commitVote

▸ **commitVote**(`_pollId`: BigNumber, `_vote`: string, `_tokensToCommit`: BigNumber): _Promise‹TransactionReceiptWithDecodedLogs›_

_Defined in [Voting.ts:63](https://github.com/ParadigmFoundation/kosu-monorepo/blob/55c0be50/packages/kosu-wrapper-enhancements/src/Voting.ts#L63)_

Commits vote to voting contract

**Parameters:**

| Name              | Type      | Description                                  |
| ----------------- | --------- | -------------------------------------------- |
| `_pollId`         | BigNumber | uint poll index                              |
| `_vote`           | string    | encoded vote option                          |
| `_tokensToCommit` | BigNumber | uint number of tokens to be commited to vote |

**Returns:** _Promise‹TransactionReceiptWithDecodedLogs›_

---

### getContract

▸ **getContract**(): _Promise‹VotingContract›_

_Defined in [Voting.ts:37](https://github.com/ParadigmFoundation/kosu-monorepo/blob/55c0be50/packages/kosu-wrapper-enhancements/src/Voting.ts#L37)_

Asynchronously initializes the contract instance or returns it from cache

**Returns:** _Promise‹VotingContract›_

The contract

---

### revealVote

▸ **revealVote**(`_pollId`: BigNumber, `_voteOption`: BigNumber, `_voteSalt`: BigNumber): _Promise‹TransactionReceiptWithDecodedLogs›_

_Defined in [Voting.ts:92](https://github.com/ParadigmFoundation/kosu-monorepo/blob/55c0be50/packages/kosu-wrapper-enhancements/src/Voting.ts#L92)_

Reveals vote on voting contract

**Parameters:**

| Name          | Type      | Description                          |
| ------------- | --------- | ------------------------------------ |
| `_pollId`     | BigNumber | uint poll index                      |
| `_voteOption` | BigNumber | uint representation of vote position |
| `_voteSalt`   | BigNumber | uint salt used to encode vote option |

**Returns:** _Promise‹TransactionReceiptWithDecodedLogs›_

---

### totalRevealedTokens

▸ **totalRevealedTokens**(`_pollId`: BigNumber): _Promise‹BigNumber›_

_Defined in [Voting.ts:130](https://github.com/ParadigmFoundation/kosu-monorepo/blob/55c0be50/packages/kosu-wrapper-enhancements/src/Voting.ts#L130)_

Reads the total winning tokens for poll

**Parameters:**

| Name      | Type      | Description     |
| --------- | --------- | --------------- |
| `_pollId` | BigNumber | uint poll index |

**Returns:** _Promise‹BigNumber›_

---

### totalWinningTokens

▸ **totalWinningTokens**(`_pollId`: BigNumber): _Promise‹BigNumber›_

_Defined in [Voting.ts:120](https://github.com/ParadigmFoundation/kosu-monorepo/blob/55c0be50/packages/kosu-wrapper-enhancements/src/Voting.ts#L120)_

Reads the total winning tokens for poll

**Parameters:**

| Name      | Type      | Description     |
| --------- | --------- | --------------- |
| `_pollId` | BigNumber | uint poll index |

**Returns:** _Promise‹BigNumber›_

---

### userWinningTokens

▸ **userWinningTokens**(`_pollId`: BigNumber, `_userAddress`: string): _Promise‹BigNumber›_

_Defined in [Voting.ts:141](https://github.com/ParadigmFoundation/kosu-monorepo/blob/55c0be50/packages/kosu-wrapper-enhancements/src/Voting.ts#L141)_

Reads users winning tokens committed for poll

**Parameters:**

| Name           | Type      | Default       | Description                                   |
| -------------- | --------- | ------------- | --------------------------------------------- |
| `_pollId`      | BigNumber | -             | uint poll index                               |
| `_userAddress` | string    | this.coinbase | address of user whose winning contribution is |

**Returns:** _Promise‹BigNumber›_

---

### winningOption

▸ **winningOption**(`_pollId`: BigNumber): _Promise‹BigNumber›_

_Defined in [Voting.ts:110](https://github.com/ParadigmFoundation/kosu-monorepo/blob/55c0be50/packages/kosu-wrapper-enhancements/src/Voting.ts#L110)_

Reads the winning option for poll

**Parameters:**

| Name      | Type      | Description     |
| --------- | --------- | --------------- |
| `_pollId` | BigNumber | uint poll index |

**Returns:** _Promise‹BigNumber›_
