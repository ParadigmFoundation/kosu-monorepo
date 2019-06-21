# ValidatorRegistry

Stores registry of validator listings and provides functionality to curate through proposals and challenges.

## Contents

-   [Methods](undefined)
    -   [challengeListing](#challengelisting)
    -   [claimRewards](#claimrewards)
    -   [claimWinnings](#claimwinnings)
    -   [confirmListing](#confirmlisting)
    -   [constructor](#constructor)
    -   [finalizeExit](#finalizeexit)
    -   [getAllChallenges](#getallchallenges)
    -   [getAllListings](#getalllistings)
    -   [getChallenge](#getchallenge)
    -   [getChallenges](#getchallenges)
    -   [getListing](#getlisting)
    -   [getListings](#getlistings)
    -   [initExit](#initexit)
    -   [listingKeys](#listingkeys)
    -   [maxRewardRate](#maxrewardrate)
    -   [registerListing](#registerlisting)
    -   [resolveChallenge](#resolvechallenge)

## Methods

### challengeListing

Challenge a registered listing

#### Signature

```solidity
function challengeListing(details bytes32, tendermintPublicKey string)
```

#### Parameters:

| Parameter             | Type      | Description                                                               |
| --------------------- | --------- | ------------------------------------------------------------------------- |
| `details`             | `bytes32` | A string value to represent support for claim (commonly an external link) |
| `tendermintPublicKey` | `string`  | Hex encoded tendermint public key                                         |

### claimRewards

Claims rewards for a listing

#### Signature

```solidity
function claimRewards(pubKey bytes32)
```

#### Parameters:

| Parameter | Type      | Description                                        |
| --------- | --------- | -------------------------------------------------- |
| `pubKey`  | `bytes32` | Public key for the listing to have rewards claimed |

### claimWinnings

Claims winnings from a challenge

#### Signature

```solidity
function claimWinnings(challengeId uint256)
```

#### Parameters:

| Parameter     | Type      | Description                         |
| ------------- | --------- | ----------------------------------- |
| `challengeId` | `uint256` | Challenge id to claim rewards from. |

### confirmListing

Confirm a listing registration

#### Signature

```solidity
function confirmListing(tendermintPublicKey bytes32)
```

#### Parameters:

| Parameter             | Type      | Description                       |
| --------------------- | --------- | --------------------------------- |
| `tendermintPublicKey` | `bytes32` | Hex encoded tendermint public key |

### constructor

Create a new ValidatorRegistry implementation

#### Signature

```solidity
constructor(_events, _treasuryAddress, _votingAddress, auth)
```

#### Parameters:

| Parameter          | Type        | Description                          |
| ------------------ | ----------- | ------------------------------------ |
| `_events`          | `undefined` | Deployed EventEmitter address        |
| `_treasuryAddress` | `undefined` | Deployed Treasury address            |
| `_votingAddress`   | `undefined` | Deployed Voting address              |
| `auth`             | `undefined` | AuthorizedAddresses deployed address |

### finalizeExit

Complete a listing exit

#### Signature

```solidity
function finalizeExit(tendermintPublicKey bytes32)
```

#### Parameters:

| Parameter             | Type      | Description                       |
| --------------------- | --------- | --------------------------------- |
| `tendermintPublicKey` | `bytes32` | Hex encoded tendermint public key |

### getAllChallenges

Expose all challenges

#### Signature

```solidity
function getAllChallenges()
```

### getAllListings

Expose all listings in the registry.

#### Signature

```solidity
function getAllListings()
```

#### Returns:

An array of all listings in the registry.

### getChallenge

Expose challenge data for a given ID.

#### Signature

```solidity
function getChallenge(challengeId uint256)
```

#### Parameters:

| Parameter     | Type      | Description                           |
| ------------- | --------- | ------------------------------------- |
| `challengeId` | `uint256` | The ID to retreive challenge data for |

#### Returns:

The challenge indicated by the provided ID.

### getChallenges

Expose challenge data

#### Signature

```solidity
function getChallenges(challengeIds uint256[])
```

#### Parameters:

| Parameter      | Type        | Description  |
| -------------- | ----------- | ------------ |
| `challengeIds` | `uint256[]` | challenge id |

### getListing

Expose listing data for given public key.

#### Signature

```solidity
function getListing(pubKey bytes32)
```

#### Parameters:

| Parameter | Type      | Description                       |
| --------- | --------- | --------------------------------- |
| `pubKey`  | `bytes32` | Hex encoded tendermint public key |

#### Returns:

The listing structure corresponding to the provided key.

### getListings

Expose several listings provided multiple public keys.

#### Signature

```solidity
function getListings(pubKeys bytes32[])
```

#### Parameters:

| Parameter | Type        | Description                                    |
| --------- | ----------- | ---------------------------------------------- |
| `pubKeys` | `bytes32[]` | Hex encoded Tendermint public keys to retreive |

#### Returns:

The array of listing structures corresponding to the provided keys.

### initExit

Initiate a listing exit

#### Signature

```solidity
function initExit(tendermintPublicKey bytes32)
```

#### Parameters:

| Parameter             | Type      | Description                       |
| --------------------- | --------- | --------------------------------- |
| `tendermintPublicKey` | `bytes32` | Hex encoded tendermint public key |

### listingKeys

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

### registerListing

Register a listing

#### Signature

```solidity
function registerListing(details bytes32, rewardRate uint256, tendermintPublicKey int256, tokensToStake string)
```

#### Parameters:

| Parameter             | Type      | Description                                                                     |
| --------------------- | --------- | ------------------------------------------------------------------------------- |
| `details`             | `bytes32` | A string value to represent support for claim (commonly an external link)       |
| `rewardRate`          | `uint256` | The rate tokens are minted or destroyed over the active listings reward periods |
| `tendermintPublicKey` | `int256`  | Hex encoded tendermint public key                                               |
| `tokensToStake`       | `string`  | The number of tokes at stake if the order is challenged                         |

### resolveChallenge

Resolve a challenge

#### Signature

```solidity
function resolveChallenge(pubKey bytes32)
```

#### Parameters:

| Parameter | Type      | Description                       |
| --------- | --------- | --------------------------------- |
| `pubKey`  | `bytes32` | Hex encoded tendermint public key |
