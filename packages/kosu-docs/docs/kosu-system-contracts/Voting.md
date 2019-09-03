# Voting

Voting manages polls and votes on governance matters within the Kosu system. Poll resolution logic will be the responsibility of the contract utilizing this service.

## Contents

-   [Methods](undefined)
    -   [commitVote](#commitvote)
    -   [constructor](#constructor)
    -   [createPoll](#createpoll)
    -   [revealVote](#revealvote)
    -   [totalRevealedTokens](#totalrevealedtokens)
    -   [totalWinningTokens](#totalwinningtokens)
    -   [userWinningTokens](#userwinningtokens)
    -   [winningOption](#winningoption)

## Methods

### commitVote

Commit a vote in a poll to be later revealed. The salt and option must be retained for a successful reveal.

#### Signature

```solidity
function commitVote(_pollId uint256, _vote bytes32, _tokensToCommit uint256) public
```

#### Parameters:

| Parameter         | Type      | Description                         |
| ----------------- | --------- | ----------------------------------- |
| `_pollId`         | `uint256` | Poll id to commit vote to.          |
| `_vote`           | `bytes32` | Hash encoded vote option with salt. |
| `_tokensToCommit` | `uint256` | Number of tokens to commit to vote. |

### constructor

Initializes the voting contract with the shared event emitter and treasury contracts.

#### Signature

```solidity
constructor(treasuryAddress address, _emitterAddress address) public
```

#### Parameters:

| Parameter         | Type      | Description                    |
| ----------------- | --------- | ------------------------------ |
| `treasuryAddress` | `address` | Deployed Treasury address.     |
| `_emitterAddress` | `address` | Deployed EventEmitter address. |

### createPoll

Create a new poll. The commit and reveal periods must be provided. The creation of the poll is notified with an event from the shared EventEmitter.

#### Signature

```solidity
function createPoll(_commitEndBlock uint256, _revealEndBlock uint256) public (uint256)
```

#### Parameters:

| Parameter         | Type      | Description                          |
| ----------------- | --------- | ------------------------------------ |
| `_commitEndBlock` | `uint256` | Block number when commit phase ends. |
| `_revealEndBlock` | `uint256` | Block number when reveal phase ends. |

#### Returns:

Poll index number. Will be used as the key for interacting with a vote.

### revealVote

Reveal a previously committed vote by providing the vote option and salt used to generate the vote hash.

#### Signature

```solidity
function revealVote(_pollId uint256, _voteOption uint256, _voteSalt uint256) public
```

#### Parameters:

| Parameter     | Type      | Description                             |
| ------------- | --------- | --------------------------------------- |
| `_pollId`     | `uint256` | Poll id to commit vote to.              |
| `_voteOption` | `uint256` | Vote option used to generate vote hash. |
| `_voteSalt`   | `uint256` | Salt used to generate vote hash.        |

### totalRevealedTokens

Retrieve the total number of tokens revealed for a finalized poll.

#### Signature

```solidity
function totalRevealedTokens(_pollId uint256) public view (uint256)
```

#### Parameters:

| Parameter | Type      | Description                                    |
| --------- | --------- | ---------------------------------------------- |
| `_pollId` | `uint256` | Poll index to check total revealed tokens for. |

#### Returns:

The total number of tokens revealed in the poll.

### totalWinningTokens

Retrieve the total number of tokens that supported the winning option of a finalized poll.

#### Signature

```solidity
function totalWinningTokens(_pollId uint256) public view (uint256)
```

#### Parameters:

| Parameter | Type      | Description                             |
| --------- | --------- | --------------------------------------- |
| `_pollId` | `uint256` | Poll index to check winning tokens for. |

#### Returns:

The uint number of tokens supporting the winning option.

### userWinningTokens

Retrieve the number of tokens committed by a user for the winning option.

#### Signature

```solidity
function userWinningTokens(_pollId uint256, _user address) public view (uint256)
```

#### Parameters:

| Parameter | Type      | Description                              |
| --------- | --------- | ---------------------------------------- |
| `_pollId` | `uint256` | Poll index to check winning tokens for.  |
| `_user`   | `address` | Address of user to check winning tokens. |

### winningOption

Retrieve the winning option for a finalized poll.

#### Signature

```solidity
function winningOption(_pollId uint256) public view (uint256)
```

#### Parameters:

| Parameter | Type      | Description                             |
| --------- | --------- | --------------------------------------- |
| `_pollId` | `uint256` | Poll index to check winning option for. |

#### Returns:

The winning option.
