# Voting


Voting manages polls and votes on governance matters within the Kosu system.

## Contents


 - [Methods](undefined)
    
     - [commitVote](#commitVote)
     - [constructor](#constructor)
     - [createPoll](#createPoll)
     - [revealVote](#revealVote)
     - [totalRevealedTokens](#totalRevealedTokens)
     - [totalWinningTokens](#totalWinningTokens)
     - [userWinningTokens](#userWinningTokens)
     - [winningOption](#winningOption)
    

## Methods

### commitVote


 - **Signature:**
 - 
    ```solidity
    
    function commitVote(_pollId uint256, _tokensToCommit bytes32, _vote uint256)
    
    ```
    
    
 - **Description:**
 - 
    Commit a vote in a poll to be later revealed
    
 - **Parameters:**
     - Parameter | Type | Description
        --- | --- | ---
        _pollId | uint256 | Poll index to act upon
        _tokensToCommit | bytes32 | Number of tokens to commit to vote
        _vote | uint256 | Hash encoded vote
        
    

### constructor


 - **Signature:**
 - 
    ```solidity
    
    constructor(_emitterAddress, treasuryAddress)
    
    ```
    
    
 - **Description:**
 - 
    Create a new voting engine
    
 - **Parameters:**
     - Parameter | Type | Description
        --- | --- | ---
        _emitterAddress | ? | Deployed EventEmitter address
        treasuryAddress | ? | Deployed Treasury address
        
    

### createPoll


 - **Signature:**
 - 
    ```solidity
    
    function createPoll(_commitEndBlock uint256, _revealEndBlock uint256)
    
    ```
    
    
 - **Description:**
 - 
    Create a new poll to accept votes based on the configuration
    
 - **Parameters:**
     - Parameter | Type | Description
        --- | --- | ---
        _commitEndBlock | uint256 | Block number when commit phase ends
        _revealEndBlock | uint256 | Block number when reveal phase ends
        
    
 - 
    **Returns:** Poll index number. Will be used as the key for interacting with a vote.
    

### revealVote


 - **Signature:**
 - 
    ```solidity
    
    function revealVote(_pollId uint256, _voteOption uint256, _voteSalt uint256)
    
    ```
    
    
 - **Description:**
 - 
    Reveal a previously committed vote
    
 - **Parameters:**
     - Parameter | Type | Description
        --- | --- | ---
        _pollId | uint256 | Poll index to act upon
        _voteOption | uint256 | User vote option
        _voteSalt | uint256 | Salt used to in hash to obfuscate vote option
        
    

### totalRevealedTokens


 - **Signature:**
 - 
    ```solidity
    
    function totalRevealedTokens(_pollId uint256)
    
    ```
    
    
 - **Description:**
 - 
    Retreive the total number of tokens revealed for a finalized poll.
    
 - **Parameters:**
     - Parameter | Type | Description
        --- | --- | ---
        _pollId | uint256 | Poll index to check total revealed tokens for
        
    
 - 
    **Returns:** The total number of tokens reveled in the poll.
    

### totalWinningTokens


 - **Signature:**
 - 
    ```solidity
    
    function totalWinningTokens(_pollId uint256)
    
    ```
    
    
 - **Description:**
 - 
    Retreive the total number of tokens that voted on the winning side of a finalized poll.
    
 - **Parameters:**
     - Parameter | Type | Description
        --- | --- | ---
        _pollId | uint256 | Poll index to check winning tokens for
        
    
 - 
    **Returns:** The uint number of tokens revealed for the winning option.
    

### userWinningTokens


 - **Signature:**
 - 
    ```solidity
    
    function userWinningTokens(_pollId uint256, _user address)
    
    ```
    
    
 - **Description:**
 - 
    Retreive the number of tokens committed by a user for the winning option.
    
 - **Parameters:**
     - Parameter | Type | Description
        --- | --- | ---
        _pollId | uint256 | Poll index to check winning tokens for
        _user | address | Address of user to check winning tokens.
        
    

### winningOption


 - **Signature:**
 - 
    ```solidity
    
    function winningOption(_pollId uint256)
    
    ```
    
    
 - **Description:**
 - 
    Retreive the winning outcome for a finalized poll.
    
 - **Parameters:**
     - Parameter | Type | Description
        --- | --- | ---
        _pollId | uint256 | Poll index to check winning option for
        
    
 - 
    **Returns:** The uint value of the winning outcome
    
