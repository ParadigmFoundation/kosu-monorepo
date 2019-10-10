> **[kosu.js](../README.md)**

[Globals](../globals.md) / [Voting](voting.md) /

# Class: Voting

Integration with Voting contract on an Ethereum blockchain.

## Hierarchy

-   **Voting**

## Index

### Constructors

-   [constructor](voting.md#constructor)

### Methods

-   [commitVote](voting.md#commitvote)
-   [encodeVote](voting.md#encodevote)
-   [revealVote](voting.md#revealvote)
-   [totalRevealedTokens](voting.md#totalrevealedtokens)
-   [totalWinningTokens](voting.md#totalwinningtokens)
-   [userWinningTokens](voting.md#userwinningtokens)
-   [winningOption](voting.md#winningoption)

## Constructors

### constructor

\+ **new Voting**(`options`: [KosuOptions](../interfaces/kosuoptions.md), `treasury`: [Treasury](treasury.md)): _[Voting](voting.md)_

_Defined in [Voting.ts:18](https://github.com/ParadigmFoundation/kosu-monorepo/blob/2f37cabf/packages/kosu.js/src/Voting.ts#L18)_

Create a new Voting instance.

**Parameters:**

| Name       | Type                                        | Description                   |
| ---------- | ------------------------------------------- | ----------------------------- |
| `options`  | [KosuOptions](../interfaces/kosuoptions.md) | instantiation options         |
| `treasury` | [Treasury](treasury.md)                     | treasury integration instance |

**Returns:** _[Voting](voting.md)_

## Methods

### commitVote

▸ **commitVote**(`_pollId`: `BigNumber`, `_vote`: string, `_tokensToCommit`: `BigNumber`): _`Promise<TransactionReceiptWithDecodedLogs>`_

_Defined in [Voting.ts:67](https://github.com/ParadigmFoundation/kosu-monorepo/blob/2f37cabf/packages/kosu.js/src/Voting.ts#L67)_

Commits vote to voting contract

**Parameters:**

| Name              | Type        | Description                                  |
| ----------------- | ----------- | -------------------------------------------- |
| `_pollId`         | `BigNumber` | uint poll index                              |
| `_vote`           | string      | encoded vote option                          |
| `_tokensToCommit` | `BigNumber` | uint number of tokens to be commited to vote |

**Returns:** _`Promise<TransactionReceiptWithDecodedLogs>`_

---

### encodeVote

▸ **encodeVote**(`_voteOption`: string, `_voteSalt`: string): _string_

_Defined in [Voting.ts:165](https://github.com/ParadigmFoundation/kosu-monorepo/blob/2f37cabf/packages/kosu.js/src/Voting.ts#L165)_

Encodes a vote by hashing the option and salt

**Parameters:**

| Name          | Type   | Description |
| ------------- | ------ | ----------- |
| `_voteOption` | string | .           |
| `_voteSalt`   | string | .           |

**Returns:** _string_

Encoded vote

---

### revealVote

▸ **revealVote**(`_pollId`: `BigNumber`, `_voteOption`: `BigNumber`, `_voteSalt`: `BigNumber`): _`Promise<TransactionReceiptWithDecodedLogs>`_

_Defined in [Voting.ts:96](https://github.com/ParadigmFoundation/kosu-monorepo/blob/2f37cabf/packages/kosu.js/src/Voting.ts#L96)_

Reveals vote on voting contract

**Parameters:**

| Name          | Type        | Description                          |
| ------------- | ----------- | ------------------------------------ |
| `_pollId`     | `BigNumber` | uint poll index                      |
| `_voteOption` | `BigNumber` | uint representation of vote position |
| `_voteSalt`   | `BigNumber` | uint salt used to encode vote option |

**Returns:** _`Promise<TransactionReceiptWithDecodedLogs>`_

---

### totalRevealedTokens

▸ **totalRevealedTokens**(`_pollId`: `BigNumber`): _`Promise<BigNumber>`_

_Defined in [Voting.ts:134](https://github.com/ParadigmFoundation/kosu-monorepo/blob/2f37cabf/packages/kosu.js/src/Voting.ts#L134)_

Reads the total winning tokens for poll

**Parameters:**

| Name      | Type        | Description     |
| --------- | ----------- | --------------- |
| `_pollId` | `BigNumber` | uint poll index |

**Returns:** _`Promise<BigNumber>`_

---

### totalWinningTokens

▸ **totalWinningTokens**(`_pollId`: `BigNumber`): _`Promise<BigNumber>`_

_Defined in [Voting.ts:124](https://github.com/ParadigmFoundation/kosu-monorepo/blob/2f37cabf/packages/kosu.js/src/Voting.ts#L124)_

Reads the total winning tokens for poll

**Parameters:**

| Name      | Type        | Description     |
| --------- | ----------- | --------------- |
| `_pollId` | `BigNumber` | uint poll index |

**Returns:** _`Promise<BigNumber>`_

---

### userWinningTokens

▸ **userWinningTokens**(`_pollId`: `BigNumber`, `_userAddress`: string): _`Promise<BigNumber>`_

_Defined in [Voting.ts:145](https://github.com/ParadigmFoundation/kosu-monorepo/blob/2f37cabf/packages/kosu.js/src/Voting.ts#L145)_

Reads users winning tokens committed for poll

**Parameters:**

| Name           | Type        | Default       | Description                                   |
| -------------- | ----------- | ------------- | --------------------------------------------- |
| `_pollId`      | `BigNumber` | -             | uint poll index                               |
| `_userAddress` | string      | this.coinbase | address of user whose winning contribution is |

**Returns:** _`Promise<BigNumber>`_

---

### winningOption

▸ **winningOption**(`_pollId`: `BigNumber`): _`Promise<BigNumber>`_

_Defined in [Voting.ts:114](https://github.com/ParadigmFoundation/kosu-monorepo/blob/2f37cabf/packages/kosu.js/src/Voting.ts#L114)_

Reads the winning option for poll

**Parameters:**

| Name      | Type        | Description     |
| --------- | ----------- | --------------- |
| `_pollId` | `BigNumber` | uint poll index |

**Returns:** _`Promise<BigNumber>`_
