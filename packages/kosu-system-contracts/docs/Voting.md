# Voting




## Contents


 - [Methods](undefined)
    
     - [commitVote](#commitVoteuint256bytes32uint256)
     - [constructor](#constructo)
     - [createPoll](#createPolluint256uint256)
     - [revealVote](#revealVoteuint256uint256uint256)
    

## Methods

### commitVote(uint256,bytes32,uint256)


Commit a vote in a poll to be later revealed

Parameter | Type | Description
--- | --- | ---
_pollId | uint256 | Poll index to act upon
_tokensToCommit | bytes32 | Number of tokens to commit to vote
_vote | uint256 | Hash encoded vote

### constructor


Create a new voting engine

Parameter | Type | Description
--- | --- | ---
_emitterAddress | ? | Deployed EventEmitter address
treasuryAddress | ? | Deployed Treasury address

### createPoll(uint256,uint256)


Create a new poll to accept votes based on the configuration

Parameter | Type | Description
--- | --- | ---
_commitEndBlock | uint256 | Block number when commit phase ends
_revealEndBlock | uint256 | Block number when reveal phase ends

### revealVote(uint256,uint256,uint256)


Reveal a previously committed vote

Parameter | Type | Description
--- | --- | ---
_pollId | uint256 | Poll index to act upon
_voteOption | uint256 | User vote option
_voteSalt | uint256 | Salt used to in hash to obfuscate vote option
