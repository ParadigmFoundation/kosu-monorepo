# Voting

Voting manages polls and votes on governance matters within the Kosu system.

## Contents

-   [Methods](undefined)
    -   [commitVote](#commitVote)
    -   [constructor](#constructor)
    -   [createPoll](#createPoll)
    -   [revealVote](#revealVote)
    -   [totalRevealedTokens](#totalRevealedTokens)
    -   [totalWinningTokens](#totalWinningTokens)
    -   [userWinningTokens](#userWinningTokens)
    -   [winningOption](#winningOption)

## Methods

### commitVote

Commit a vote in a poll to be later revealed

#### Signature

```solidity
function commitVote(_pollId uint256, _tokensToCommit bytes32, _vote uint256)
```

#### Parameters:

| Parameter         | Type      | Description                        |
| ----------------- | --------- | ---------------------------------- |
| `_pollId`         | `uint256` | Poll index to act upon             |
| `_tokensToCommit` | `bytes32` | Number of tokens to commit to vote |
| `_vote`           | `uint256` | Hash encoded vote                  |

### constructor

Create a new voting engine

#### Signature

```solidity
constructor(_emitterAddress, treasuryAddress)
```

#### Parameters:

| Parameter         | Type        | Description                   |
| ----------------- | ----------- | ----------------------------- |
| `_emitterAddress` | `undefined` | Deployed EventEmitter address |
| `treasuryAddress` | `undefined` | Deployed Treasury address     |

### createPoll

Create a new poll to accept votes based on the configuration

#### Signature

```solidity
function createPoll(_commitEndBlock uint256, _revealEndBlock uint256)
```

#### Parameters:

| Parameter         | Type      | Description                         |
| ----------------- | --------- | ----------------------------------- |
| `_commitEndBlock` | `uint256` | Block number when commit phase ends |
| `_revealEndBlock` | `uint256` | Block number when reveal phase ends |

#### Returns:

Poll index number. Will be used as the key for interacting with a vote.

### revealVote

Reveal a previously committed vote

#### Signature

```solidity
function revealVote(_pollId uint256, _voteOption uint256, _voteSalt uint256)
```

#### Parameters:

| Parameter     | Type      | Description                                   |
| ------------- | --------- | --------------------------------------------- |
| `_pollId`     | `uint256` | Poll index to act upon                        |
| `_voteOption` | `uint256` | User vote option                              |
| `_voteSalt`   | `uint256` | Salt used to in hash to obfuscate vote option |

### totalRevealedTokens

Retreive the total number of tokens revealed for a finalized poll.

#### Signature

```solidity
function totalRevealedTokens(_pollId uint256)
```

#### Parameters:

| Parameter | Type      | Description                                   |
| --------- | --------- | --------------------------------------------- |
| `_pollId` | `uint256` | Poll index to check total revealed tokens for |

#### Returns:

The total number of tokens reveled in the poll.

### totalWinningTokens

Retreive the total number of tokens that voted on the winning side of a finalized poll.

#### Signature

```solidity
function totalWinningTokens(_pollId uint256)
```

#### Parameters:

| Parameter | Type      | Description                            |
| --------- | --------- | -------------------------------------- |
| `_pollId` | `uint256` | Poll index to check winning tokens for |

#### Returns:

The uint number of tokens revealed for the winning option.

### userWinningTokens

Retreive the number of tokens committed by a user for the winning option.

#### Signature

```solidity
function userWinningTokens(_pollId uint256, _user address)
```

#### Parameters:

| Parameter | Type      | Description                              |
| --------- | --------- | ---------------------------------------- |
| `_pollId` | `uint256` | Poll index to check winning tokens for   |
| `_user`   | `address` | Address of user to check winning tokens. |

### winningOption

Retreive the winning outcome for a finalized poll.

#### Signature

```solidity
function winningOption(_pollId uint256)
```

#### Parameters:

| Parameter | Type      | Description                            |
| --------- | --------- | -------------------------------------- |
| `_pollId` | `uint256` | Poll index to check winning option for |

#### Returns:

The uint value of the winning outcome