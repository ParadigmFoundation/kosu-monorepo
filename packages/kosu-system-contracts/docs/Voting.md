# Voting


Voting manages polls and votes on governance matters within the Kosu system.

## Contents


 - [Methods](undefined)
    
     - [commitVote](#commitVoteuint256bytes32uint256)
     - [constructor](#constructo)
     - [createPoll](#createPolluint256uint256)
     - [revealVote](#revealVoteuint256uint256uint256)
     - [totalRevealedTokens](#totalRevealedTokensuint256)
     - [totalWinningTokens](#totalWinningTokensuint256)
     - [userWinningTokens](#userWinningTokensuint256address)
     - [winningOption](#winningOptionuint256)
    

## Methods

### commitVote(uint256,bytes32,uint256)

```solidity
function commitVote(_pollId uint256, _tokensToCommit bytes32, _vote uint256)
```


Commit a vote in a poll to be later revealed

Parameter | Type | Description
--- | --- | ---
_pollId | uint256 | Poll index to act upon
_tokensToCommit | bytes32 | Number of tokens to commit to vote
_vote | uint256 | Hash encoded vote

### constructor

```solidity
constructor(_emitterAddress, treasuryAddress)
```


Create a new voting engine

Parameter | Type | Description
--- | --- | ---
_emitterAddress | ? | Deployed EventEmitter address
treasuryAddress | ? | Deployed Treasury address

### createPoll(uint256,uint256)

```solidity
function createPoll(_commitEndBlock uint256, _revealEndBlock uint256)
```


Create a new poll to accept votes based on the configuration

Parameter | Type | Description
--- | --- | ---
_commitEndBlock | uint256 | Block number when commit phase ends
_revealEndBlock | uint256 | Block number when reveal phase ends


**Returns:** Poll index number. Will be used as the key for interacting with a vote.

### revealVote(uint256,uint256,uint256)

```solidity
function revealVote(_pollId uint256, _voteOption uint256, _voteSalt uint256)
```


Reveal a previously committed vote

Parameter | Type | Description
--- | --- | ---
_pollId | uint256 | Poll index to act upon
_voteOption | uint256 | User vote option
_voteSalt | uint256 | Salt used to in hash to obfuscate vote option

### totalRevealedTokens(uint256)

```solidity
function totalRevealedTokens(_pollId uint256)
```


Retreive the total number of tokens revealed for a finalized poll.

Parameter | Type | Description
--- | --- | ---
_pollId | uint256 | Poll index to check total revealed tokens for


**Returns:** The total number of tokens reveled in the poll.

### totalWinningTokens(uint256)

```solidity
function totalWinningTokens(_pollId uint256)
```


Retreive the total number of tokens that voted on the winning side of a finalized poll.

Parameter | Type | Description
--- | --- | ---
_pollId | uint256 | Poll index to check winning tokens for


**Returns:** The uint number of tokens revealed for the winning option.

### userWinningTokens(uint256,address)

```solidity
function userWinningTokens(_pollId uint256, _user address)
```


Retreive the number of tokens committed by a user for the winning option.

Parameter | Type | Description
--- | --- | ---
_pollId | uint256 | Poll index to check winning tokens for
_user | address | Address of user to check winning tokens.

### winningOption(uint256)

```solidity
function winningOption(_pollId uint256)
```


Retreive the winning outcome for a finalized poll.

Parameter | Type | Description
--- | --- | ---
_pollId | uint256 | Poll index to check winning option for


**Returns:** The uint value of the winning outcome
