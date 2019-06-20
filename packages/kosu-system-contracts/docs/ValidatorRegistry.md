# ValidatorRegistry


Stores registry of validator listings and provides functionality to curate through proposals and challenges.

## Contents


 - [Methods](undefined)
    
     - [challengeListing](#challengeListing)
     - [claimRewards](#claimRewards)
     - [claimWinnings](#claimWinnings)
     - [confirmListing](#confirmListing)
     - [constructor](#constructor)
     - [finalizeExit](#finalizeExit)
     - [getAllChallenges](#getAllChallenges)
     - [getAllListings](#getAllListings)
     - [getChallenge](#getChallenge)
     - [getChallenges](#getChallenges)
     - [getListing](#getListing)
     - [getListings](#getListings)
     - [initExit](#initExit)
     - [listingKeys](#listingKeys)
     - [maxRewardRate](#maxRewardRate)
     - [registerListing](#registerListing)
     - [resolveChallenge](#resolveChallenge)
    

## Methods

### challengeListing

<<<<<<< HEAD

Challenge a registered listing

#### Signature

```solidity
function challengeListing(details bytes32, tendermintPublicKey string)
```

#### Parameters:

Parameter | Type | Description
--- | --- | ---
details | bytes32 | A string value to represent support for claim (commonly an external link)
tendermintPublicKey | string | Hex encoded tendermint public key

### claimRewards


Claims rewards for a listing

#### Signature

```solidity
function claimRewards(pubKey bytes32)
```

#### Parameters:
=======

 - **Signature:**
 - 
    ```solidity
    
    function challengeListing(details bytes32, tendermintPublicKey string)
    
    ```
    
    
 - **Description:**
 - 
    Challenge a registered listing
    
 - **Parameters:**
     - Parameter | Type | Description
        --- | --- | ---
        details | bytes32 | A string value to represent support for claim (commonly an external link)
        tendermintPublicKey | string | Hex encoded tendermint public key
        
    

### claimRewards

>>>>>>> eaf23b3d8732d3b3bcc500c6c71aad6ec3200335

 - **Signature:**
 - 
    ```solidity
    
    function claimRewards(pubKey bytes32)
    
    ```
    
    
 - **Description:**
 - 
    Claims rewards for a listing
    
 - **Parameters:**
     - Parameter | Type | Description
        --- | --- | ---
        pubKey | bytes32 | Public key for the listing to have rewards claimed
        
    

### claimWinnings


<<<<<<< HEAD
Claims winnings from a challenge

#### Signature

```solidity
function claimWinnings(challengeId uint256)
```

#### Parameters:

Parameter | Type | Description
--- | --- | ---
challengeId | uint256 | Challenge id to claim rewards from.

### confirmListing


Confirm a listing registration

#### Signature

```solidity
function confirmListing(tendermintPublicKey bytes32)
```

#### Parameters:

Parameter | Type | Description
--- | --- | ---
tendermintPublicKey | bytes32 | Hex encoded tendermint public key
=======
 - **Signature:**
 - 
    ```solidity
    
    function claimWinnings(challengeId uint256)
    
    ```
    
    
 - **Description:**
 - 
    Claims winnings from a challenge
    
 - **Parameters:**
     - Parameter | Type | Description
        --- | --- | ---
        challengeId | uint256 | Challenge id to claim rewards from.
        
    

### confirmListing


 - **Signature:**
 - 
    ```solidity
    
    function confirmListing(tendermintPublicKey bytes32)
    
    ```
    
    
 - **Description:**
 - 
    Confirm a listing registration
    
 - **Parameters:**
     - Parameter | Type | Description
        --- | --- | ---
        tendermintPublicKey | bytes32 | Hex encoded tendermint public key
        
    
>>>>>>> eaf23b3d8732d3b3bcc500c6c71aad6ec3200335

### constructor


<<<<<<< HEAD
Create a new ValidatorRegistry implementation

#### Signature

```solidity
constructor(_events, _treasuryAddress, _votingAddress, auth)
```

#### Parameters:

Parameter | Type | Description
--- | --- | ---
_events | ? | Deployed EventEmitter address
_treasuryAddress | ? | Deployed Treasury address
_votingAddress | ? | Deployed Voting address
auth | ? | AuthorizedAddresses deployed address

### finalizeExit


Complete a listing exit

#### Signature

```solidity
function finalizeExit(tendermintPublicKey bytes32)
```

#### Parameters:
=======
 - **Signature:**
 - 
    ```solidity
    
    constructor(_events, _treasuryAddress, _votingAddress, auth)
    
    ```
    
    
 - **Description:**
 - 
    Create a new ValidatorRegistry implementation
    
 - **Parameters:**
     - Parameter | Type | Description
        --- | --- | ---
        _events | ? | Deployed EventEmitter address
        _treasuryAddress | ? | Deployed Treasury address
        _votingAddress | ? | Deployed Voting address
        auth | ? | AuthorizedAddresses deployed address
        
    

### finalizeExit

>>>>>>> eaf23b3d8732d3b3bcc500c6c71aad6ec3200335

 - **Signature:**
 - 
    ```solidity
    
    function finalizeExit(tendermintPublicKey bytes32)
    
    ```
    
    
 - **Description:**
 - 
    Complete a listing exit
    
 - **Parameters:**
     - Parameter | Type | Description
        --- | --- | ---
        tendermintPublicKey | bytes32 | Hex encoded tendermint public key
        
    

### getAllChallenges

<<<<<<< HEAD

Expose all challenges

#### Signature

```solidity
function getAllChallenges()
```

### getAllListings

=======

 - **Signature:**
 - 
    ```solidity
    
    function getAllChallenges()
    
    ```
    
    
 - **Description:**
 - 
    Expose all challenges
    
>>>>>>> eaf23b3d8732d3b3bcc500c6c71aad6ec3200335

Expose all listings in the registry.

#### Signature

<<<<<<< HEAD
```solidity
function getAllListings()
```

#### Returns:


An array of all listings in the registry.
=======

 - **Signature:**
 - 
    ```solidity
    
    function getAllListings()
    
    ```
    
    
 - **Description:**
 - 
    Expose all listings in the registry.
    
 - 
    **Returns:** An array of all listings in the registry.
    
>>>>>>> eaf23b3d8732d3b3bcc500c6c71aad6ec3200335

### getChallenge


<<<<<<< HEAD
Expose challenge data for a given ID.

#### Signature

```solidity
function getChallenge(challengeId uint256)
```

#### Parameters:

Parameter | Type | Description
--- | --- | ---
challengeId | uint256 | The ID to retreive challenge data for

#### Returns:


The challenge indicated by the provided ID.

### getChallenges


Expose challenge data

#### Signature

```solidity
function getChallenges(challengeIds uint256[])
```

#### Parameters:
=======
 - **Signature:**
 - 
    ```solidity
    
    function getChallenge(challengeId uint256)
    
    ```
    
    
 - **Description:**
 - 
    Expose challenge data for a given ID.
    
 - **Parameters:**
     - Parameter | Type | Description
        --- | --- | ---
        challengeId | uint256 | The ID to retreive challenge data for
        
    
 - 
    **Returns:** The challenge indicated by the provided ID.
    

### getChallenges

>>>>>>> eaf23b3d8732d3b3bcc500c6c71aad6ec3200335

 - **Signature:**
 - 
    ```solidity
    
    function getChallenges(challengeIds uint256[])
    
    ```
    
    
 - **Description:**
 - 
    Expose challenge data
    
 - **Parameters:**
     - Parameter | Type | Description
        --- | --- | ---
        challengeIds | uint256[] | challenge id
        
    

### getListing


<<<<<<< HEAD
Expose listing data for given public key.

#### Signature

```solidity
function getListing(pubKey bytes32)
```

#### Parameters:

Parameter | Type | Description
--- | --- | ---
pubKey | bytes32 | Hex encoded tendermint public key

#### Returns:


The listing structure corresponding to the provided key.

### getListings


Expose several listings provided multiple public keys.

#### Signature

```solidity
function getListings(pubKeys bytes32[])
```

#### Parameters:

Parameter | Type | Description
--- | --- | ---
pubKeys | bytes32[] | Hex encoded Tendermint public keys to retreive

#### Returns:


The array of listing structures corresponding to the provided keys.

### initExit


Initiate a listing exit

#### Signature

```solidity
function initExit(tendermintPublicKey bytes32)
```

#### Parameters:
=======
 - **Signature:**
 - 
    ```solidity
    
    function getListing(pubKey bytes32)
    
    ```
    
    
 - **Description:**
 - 
    Expose listing data for given public key.
    
 - **Parameters:**
     - Parameter | Type | Description
        --- | --- | ---
        pubKey | bytes32 | Hex encoded tendermint public key
        
    
 - 
    **Returns:** The listing structure corresponding to the provided key.
    

### getListings


 - **Signature:**
 - 
    ```solidity
    
    function getListings(pubKeys bytes32[])
    
    ```
    
    
 - **Description:**
 - 
    Expose several listings provided multiple public keys.
    
 - **Parameters:**
     - Parameter | Type | Description
        --- | --- | ---
        pubKeys | bytes32[] | Hex encoded Tendermint public keys to retreive
        
    
 - 
    **Returns:** The array of listing structures corresponding to the provided keys.
    

### initExit

>>>>>>> eaf23b3d8732d3b3bcc500c6c71aad6ec3200335

 - **Signature:**
 - 
    ```solidity
    
    function initExit(tendermintPublicKey bytes32)
    
    ```
    
    
 - **Description:**
 - 
    Initiate a listing exit
    
 - **Parameters:**
     - Parameter | Type | Description
        --- | --- | ---
        tendermintPublicKey | bytes32 | Hex encoded tendermint public key
        
    

### listingKeys


<<<<<<< HEAD
Expose the list of active listing keys.

#### Signature

```solidity
function listingKeys()
```

#### Returns:


An array of hex encoded tendermint keys.

### maxRewardRate


Calculate the maximum KosuToken a validator can generate.

#### Signature

```solidity
function maxRewardRate()
```

#### Returns:


Maximum KosuToken a validator can generate per period.
=======
 - **Signature:**
 - 
    ```solidity
    
    function listingKeys()
    
    ```
    
    
 - **Description:**
 - 
    Expose the list of active listing keys.
    
 - 
    **Returns:** An array of hex encoded tendermint keys.
    

### maxRewardRate


 - **Signature:**
 - 
    ```solidity
    
    function maxRewardRate()
    
    ```
    
    
 - **Description:**
 - 
    Calculate the maximum KosuToken a validator can generate.
    
 - 
    **Returns:** Maximum KosuToken a validator can generate per period.
    
>>>>>>> eaf23b3d8732d3b3bcc500c6c71aad6ec3200335

### registerListing


<<<<<<< HEAD
Register a listing

#### Signature

```solidity
function registerListing(details bytes32, rewardRate uint256, tendermintPublicKey int256, tokensToStake string)
```

#### Parameters:

Parameter | Type | Description
--- | --- | ---
details | bytes32 | A string value to represent support for claim (commonly an external link)
rewardRate | uint256 | The rate tokens are minted or destroyed over the active listings reward periods
tendermintPublicKey | int256 | Hex encoded tendermint public key
tokensToStake | string | The number of tokes at stake if the order is challenged

### resolveChallenge


Resolve a challenge

#### Signature

```solidity
function resolveChallenge(pubKey bytes32)
```

#### Parameters:
=======
 - **Signature:**
 - 
    ```solidity
    
    function registerListing(details bytes32, rewardRate uint256, tendermintPublicKey int256, tokensToStake string)
    
    ```
    
    
 - **Description:**
 - 
    Register a listing
    
 - **Parameters:**
     - Parameter | Type | Description
        --- | --- | ---
        details | bytes32 | A string value to represent support for claim (commonly an external link)
        rewardRate | uint256 | The rate tokens are minted or destroyed over the active listings reward periods
        tendermintPublicKey | int256 | Hex encoded tendermint public key
        tokensToStake | string | The number of tokes at stake if the order is challenged
        
    

### resolveChallenge

>>>>>>> eaf23b3d8732d3b3bcc500c6c71aad6ec3200335

 - **Signature:**
 - 
    ```solidity
    
    function resolveChallenge(pubKey bytes32)
    
    ```
    
    
 - **Description:**
 - 
    Resolve a challenge
    
 - **Parameters:**
     - Parameter | Type | Description
        --- | --- | ---
        pubKey | bytes32 | Hex encoded tendermint public key
        
    
