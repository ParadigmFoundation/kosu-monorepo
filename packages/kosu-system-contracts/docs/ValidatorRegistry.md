# ValidatorRegistry


ValidatorRegsitry is a modified token-curated registry that enables curation of validator listings.

## Contents


 - [Methods](undefined)
    
     - [challengeListing](#challengeListingbytes32string)
     - [claimRewards](#claimRewardsbytes32)
     - [claimWinnings](#claimWinningsuint256)
     - [confirmListing](#confirmListingbytes32)
     - [constructor](#constructo)
     - [finalizeExit](#finalizeExitbytes32)
     - [getAllChallenges](#getAllChallenges)
     - [getAllListings](#getAllListings)
     - [getChallenge](#getChallengeuint256)
     - [getChallenges](#getChallengesuint256)
     - [getListing](#getListingbytes32)
     - [getListings](#getListingsbytes32)
     - [initExit](#initExitbytes32)
     - [listingKeys](#listingKeys)
     - [maxRewardRate](#maxRewardRate)
     - [registerListing](#registerListingbytes32uint256int256string)
     - [resolveChallenge](#resolveChallengebytes32)
    

## Methods

### challengeListing(bytes32,string)


Challenge a registered listing

Parameter | Type | Description
--- | --- | ---
details | bytes32 | A string value to represent support for claim (commonly an external link)
tendermintPublicKey | string | Hex encoded tendermint public key

### claimRewards(bytes32)


Claims rewards for a listing

Parameter | Type | Description
--- | --- | ---
pubKey | bytes32 | Public key for the listing to have rewards claimed

### claimWinnings(uint256)


Claims winnings from a challenge

Parameter | Type | Description
--- | --- | ---
challengeId | uint256 | Challenge id to claim rewards from.

### confirmListing(bytes32)


Confirm a listing registration

Parameter | Type | Description
--- | --- | ---
tendermintPublicKey | bytes32 | Hex encoded tendermint public key

### constructor


Create a new ValidatorRegistry implementation

Parameter | Type | Description
--- | --- | ---
_events | ? | Deployed EventEmitter address
_treasuryAddress | ? | Deployed Treasury address
_votingAddress | ? | Deployed Voting address
auth | ? | AuthorizedAddresses deployed address

### finalizeExit(bytes32)


Complete a listing exit

Parameter | Type | Description
--- | --- | ---
tendermintPublicKey | bytes32 | Hex encoded tendermint public key

### getAllChallenges()


Expose all challenges

### getAllListings()


Expose all listings

### getChallenge(uint256)


Expose challenge data

Parameter | Type | Description
--- | --- | ---
challengeId | uint256 | challenge id

### getChallenges(uint256[])


Expose challenge data

Parameter | Type | Description
--- | --- | ---
challengeIds | uint256[] | challenge id

### getListing(bytes32)


Expose listing data

Parameter | Type | Description
--- | --- | ---
pubKey | bytes32 | Hex encoded tendermint public key

### getListings(bytes32[])


Expose listings

Parameter | Type | Description
--- | --- | ---
pubKeys | bytes32[] | Hex encoded tendermint public keys

### initExit(bytes32)


Initiate a listing exit

Parameter | Type | Description
--- | --- | ---
tendermintPublicKey | bytes32 | Hex encoded tendermint public key

### listingKeys()


Expose the list of active listing keys

### maxRewardRate()


Calculate the maximum KosuToken a validator can generate

### registerListing(bytes32,uint256,int256,string)


Register a listing

Parameter | Type | Description
--- | --- | ---
details | bytes32 | A string value to represent support for claim (commonly an external link)
rewardRate | uint256 | The rate tokens are minted or destroyed over the active listings reward periods
tendermintPublicKey | int256 | Hex encoded tendermint public key
tokensToStake | string | The number of tokes at stake if the order is challenged

### resolveChallenge(bytes32)


Resolve a challenge

Parameter | Type | Description
--- | --- | ---
pubKey | bytes32 | Hex encoded tendermint public key
