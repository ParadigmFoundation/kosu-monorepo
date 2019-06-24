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
function challengeListing(tendermintPublicKey bytes32, details string) public
```

#### Parameters:

| Parameter             | Type      | Description                                                               |
| --------------------- | --------- | ------------------------------------------------------------------------- |
| `tendermintPublicKey` | `bytes32` | Hex encoded tendermint public key                                         |
| `details`             | `string`  | A string value to represent support for claim (commonly an external link) |

### claimRewards

Claims rewards for a listing

#### Signature

```solidity
function claimRewards(pubKey bytes32) public
```

#### Parameters:

| Parameter | Type      | Description                                        |
| --------- | --------- | -------------------------------------------------- |
| `pubKey`  | `bytes32` | Public key for the listing to have rewards claimed |

### claimWinnings

Claims winnings from a challenge

#### Signature

```solidity
function claimWinnings(challengeId uint256) public
```

#### Parameters:

| Parameter     | Type      | Description                         |
| ------------- | --------- | ----------------------------------- |
| `challengeId` | `uint256` | Challenge id to claim rewards from. |

### confirmListing

Confirm a listing registration

#### Signature

```solidity
function confirmListing(tendermintPublicKey bytes32) public
```

#### Parameters:

| Parameter             | Type      | Description                       |
| --------------------- | --------- | --------------------------------- |
| `tendermintPublicKey` | `bytes32` | Hex encoded tendermint public key |

### constructor

Create a new ValidatorRegistry implementation

#### Signature

```solidity
constructor(_treasuryAddress address, _votingAddress address, auth address, _events address, _applicationPeriod uint256, _commitPeriod uint256, _challengePeriod uint256, _exitPeriod uint256, _rewardPeriod uint256) public
```

### finalizeExit

Complete a listing exit

#### Signature

```solidity
function finalizeExit(tendermintPublicKey bytes32) public
```

#### Parameters:

| Parameter             | Type      | Description                       |
| --------------------- | --------- | --------------------------------- |
| `tendermintPublicKey` | `bytes32` | Hex encoded tendermint public key |

### getAllChallenges

Expose all challenges

#### Signature

```solidity
function getAllChallenges() public view (tuple[])
```

### getAllListings

Expose all listings in the registry.

#### Signature

```solidity
function getAllListings() public view (tuple[])
```

#### Returns:

An array of all listings in the registry.

### getChallenge

Expose challenge data for a given ID.

#### Signature

```solidity
function getChallenge(challengeId uint256) public view (tuple)
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
function getChallenges(challengeIds uint256[]) public view (tuple[])
```

#### Parameters:

| Parameter      | Type        | Description  |
| -------------- | ----------- | ------------ |
| `challengeIds` | `uint256[]` | challenge id |

### getListing

Expose listing data for given public key.

#### Signature

```solidity
function getListing(pubKey bytes32) public view (tuple)
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
function getListings(pubKeys bytes32[]) public view (tuple[])
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
function initExit(tendermintPublicKey bytes32) public
```

#### Parameters:

| Parameter             | Type      | Description                       |
| --------------------- | --------- | --------------------------------- |
| `tendermintPublicKey` | `bytes32` | Hex encoded tendermint public key |

### listingKeys

Expose the list of active listing keys.

#### Signature

```solidity
function listingKeys() public view (bytes32[])
```

#### Returns:

An array of hex encoded tendermint keys.

### maxRewardRate

Calculate the maximum KosuToken a validator can generate.

#### Signature

```solidity
function maxRewardRate() public view (uint256)
```

#### Returns:

Maximum KosuToken a validator can generate per period.

### registerListing

Register a listing

#### Signature

```solidity
function registerListing(tendermintPublicKey bytes32, tokensToStake uint256, rewardRate int256, details string) public
```

#### Parameters:

| Parameter             | Type      | Description                                                                     |
| --------------------- | --------- | ------------------------------------------------------------------------------- |
| `tendermintPublicKey` | `bytes32` | Hex encoded tendermint public key                                               |
| `tokensToStake`       | `uint256` | The number of tokes at stake if the order is challenged                         |
| `rewardRate`          | `int256`  | The rate tokens are minted or destroyed over the active listings reward periods |
| `details`             | `string`  | A string value to represent support for claim (commonly an external link)       |

### resolveChallenge

Resolve a challenge

#### Signature

```solidity
function resolveChallenge(pubKey bytes32) public
```

#### Parameters:

| Parameter | Type      | Description                       |
| --------- | --------- | --------------------------------- |
| `pubKey`  | `bytes32` | Hex encoded tendermint public key |
