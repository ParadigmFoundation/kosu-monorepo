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

```solidity
function challengeListing(details bytes32, tendermintPublicKey string)
```


Challenge a registered listing

Parameter | Type | Description
--- | --- | ---
details | bytes32 | A string value to represent support for claim (commonly an external link)
tendermintPublicKey | string | Hex encoded tendermint public key

### claimRewards

```solidity
function claimRewards(pubKey bytes32)
```


Claims rewards for a listing

Parameter | Type | Description
--- | --- | ---
pubKey | bytes32 | Public key for the listing to have rewards claimed

### claimWinnings

```solidity
function claimWinnings(challengeId uint256)
```


Claims winnings from a challenge

Parameter | Type | Description
--- | --- | ---
challengeId | uint256 | Challenge id to claim rewards from.

### confirmListing

```solidity
function confirmListing(tendermintPublicKey bytes32)
```


Confirm a listing registration

Parameter | Type | Description
--- | --- | ---
tendermintPublicKey | bytes32 | Hex encoded tendermint public key

### constructor

```solidity
constructor(_events, _treasuryAddress, _votingAddress, auth)
```


Create a new ValidatorRegistry implementation

Parameter | Type | Description
--- | --- | ---
_events | ? | Deployed EventEmitter address
_treasuryAddress | ? | Deployed Treasury address
_votingAddress | ? | Deployed Voting address
auth | ? | AuthorizedAddresses deployed address

### finalizeExit

```solidity
function finalizeExit(tendermintPublicKey bytes32)
```


Complete a listing exit

Parameter | Type | Description
--- | --- | ---
tendermintPublicKey | bytes32 | Hex encoded tendermint public key

### getAllChallenges

```solidity
function getAllChallenges()
```


Expose all challenges

### getAllListings

```solidity
function getAllListings()
```


Expose all listings in the registry.


**Returns:** An array of all listings in the registry.

### getChallenge

```solidity
function getChallenge(challengeId uint256)
```


Expose challenge data for a given ID.

Parameter | Type | Description
--- | --- | ---
challengeId | uint256 | The ID to retreive challenge data for


**Returns:** The challenge indicated by the provided ID.

### getChallenges

```solidity
function getChallenges(challengeIds uint256[])
```


Expose challenge data

Parameter | Type | Description
--- | --- | ---
challengeIds | uint256[] | challenge id

### getListing

```solidity
function getListing(pubKey bytes32)
```


Expose listing data for given public key.

Parameter | Type | Description
--- | --- | ---
pubKey | bytes32 | Hex encoded tendermint public key


**Returns:** The listing structure corresponding to the provided key.

### getListings

```solidity
function getListings(pubKeys bytes32[])
```


Expose several listings provided multiple public keys.

Parameter | Type | Description
--- | --- | ---
pubKeys | bytes32[] | Hex encoded Tendermint public keys to retreive


**Returns:** The array of listing structures corresponding to the provided keys.

### initExit

```solidity
function initExit(tendermintPublicKey bytes32)
```


Initiate a listing exit

Parameter | Type | Description
--- | --- | ---
tendermintPublicKey | bytes32 | Hex encoded tendermint public key

### listingKeys

```solidity
function listingKeys()
```


Expose the list of active listing keys.


**Returns:** An array of hex encoded tendermint keys.

### maxRewardRate

```solidity
function maxRewardRate()
```


Calculate the maximum KosuToken a validator can generate.


**Returns:** Maximum KosuToken a validator can generate per period.

### registerListing

```solidity
function registerListing(details bytes32, rewardRate uint256, tendermintPublicKey int256, tokensToStake string)
```


Register a listing

Parameter | Type | Description
--- | --- | ---
details | bytes32 | A string value to represent support for claim (commonly an external link)
rewardRate | uint256 | The rate tokens are minted or destroyed over the active listings reward periods
tendermintPublicKey | int256 | Hex encoded tendermint public key
tokensToStake | string | The number of tokes at stake if the order is challenged

### resolveChallenge

```solidity
function resolveChallenge(pubKey bytes32)
```


Resolve a challenge

Parameter | Type | Description
--- | --- | ---
pubKey | bytes32 | Hex encoded tendermint public key
