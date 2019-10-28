> **[contract-helpers](../README.md)**

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

\+ **new Voting**(`options`: `KosuOptions`, `treasury`: [Treasury](treasury.md)): _[Voting](voting.md)_

_Defined in [Voting.ts:20](https://github.com/ParadigmFoundation/kosu-monorepo/blob/924d628e/packages/kosu-contract-helpers/src/Voting.ts#L20)_

Create a new Voting instance.

**Parameters:**

| Name       | Type                    | Description                   |
| ---------- | ----------------------- | ----------------------------- |
| `options`  | `KosuOptions`           | instantiation options         |
| `treasury` | [Treasury](treasury.md) | treasury integration instance |

**Returns:** _[Voting](voting.md)_

## Methods

### commitVote

▸ **commitVote**(`_pollId`: `BigNumber`, `_vote`: string, `_tokensToCommit`: `BigNumber`): _`Promise<TransactionReceiptWithDecodedLogs>`_

_Defined in [Voting.ts:69](https://github.com/ParadigmFoundation/kosu-monorepo/blob/924d628e/packages/kosu-contract-helpers/src/Voting.ts#L69)_

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

_Defined in [Voting.ts:167](https://github.com/ParadigmFoundation/kosu-monorepo/blob/924d628e/packages/kosu-contract-helpers/src/Voting.ts#L167)_

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

_Defined in [Voting.ts:98](https://github.com/ParadigmFoundation/kosu-monorepo/blob/924d628e/packages/kosu-contract-helpers/src/Voting.ts#L98)_

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

_Defined in [Voting.ts:136](https://github.com/ParadigmFoundation/kosu-monorepo/blob/924d628e/packages/kosu-contract-helpers/src/Voting.ts#L136)_

Reads the total winning tokens for poll

**Parameters:**

| Name      | Type        | Description     |
| --------- | ----------- | --------------- |
| `_pollId` | `BigNumber` | uint poll index |

**Returns:** _`Promise<BigNumber>`_

---

### totalWinningTokens

▸ **totalWinningTokens**(`_pollId`: `BigNumber`): _`Promise<BigNumber>`_

_Defined in [Voting.ts:126](https://github.com/ParadigmFoundation/kosu-monorepo/blob/924d628e/packages/kosu-contract-helpers/src/Voting.ts#L126)_

Reads the total winning tokens for poll

**Parameters:**

| Name      | Type        | Description     |
| --------- | ----------- | --------------- |
| `_pollId` | `BigNumber` | uint poll index |

**Returns:** _`Promise<BigNumber>`_

---

### userWinningTokens

▸ **userWinningTokens**(`_pollId`: `BigNumber`, `_userAddress`: string): _`Promise<BigNumber>`_

_Defined in [Voting.ts:147](https://github.com/ParadigmFoundation/kosu-monorepo/blob/924d628e/packages/kosu-contract-helpers/src/Voting.ts#L147)_

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

_Defined in [Voting.ts:116](https://github.com/ParadigmFoundation/kosu-monorepo/blob/924d628e/packages/kosu-contract-helpers/src/Voting.ts#L116)_

Reads the winning option for poll

**Parameters:**

| Name      | Type        | Description     |
| --------- | ----------- | --------------- |
| `_pollId` | `BigNumber` | uint poll index |

**Returns:** _`Promise<BigNumber>`_
