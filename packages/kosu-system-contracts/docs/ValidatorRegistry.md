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
    -   [getChallenge](#getchallenge)
    -   [getChallenges](#getchallenges)
    -   [getListing](#getlisting)
    -   [getListings](#getlistings)
    -   [initExit](#initexit)
    -   [reduceReward](#reducereward)
    -   [registerListing](#registerlisting)
    -   [resolveChallenge](#resolvechallenge)
    -   [transferOwnership](#transferownership)
    -   [updateConfigValue](#updateconfigvalue)

## Methods

### challengeListing

Challenge a registered listing. Stakes a balance of tokens matching the validator being challenged. Creates a poll through the voting contract of tokens holders to determine a winner.

#### Signature

```solidity
function challengeListing(tendermintPublicKey bytes32, details string) public
```

#### Parameters:

| Parameter             | Type      | Description                                                                |
| --------------------- | --------- | -------------------------------------------------------------------------- |
| `tendermintPublicKey` | `bytes32` | Hex encoded tendermint public key.                                         |
| `details`             | `string`  | A string value to represent support for claim (commonly an external link). |

### claimRewards

Claims rewards for a listing. Positive reward rate will have new tokens minted. Negative reward rates will burn tokens and have risk of being removed immediately through a TouchAndRemove when insufficient tokens are available.

#### Signature

```solidity
function claimRewards(tendermintPublicKey bytes32) public
```

#### Parameters:

| Parameter             | Type      | Description                                         |
| --------------------- | --------- | --------------------------------------------------- |
| `tendermintPublicKey` | `bytes32` | Public key for the listing to have rewards claimed. |

### claimWinnings

Claims winnings from a challenge that has been completed. Accounts are rewarded for voting in support of the winning resolution proportionally to their vote contribution.

#### Signature

```solidity
function claimWinnings(challengeId uint256) public
```

#### Parameters:

| Parameter     | Type      | Description                         |
| ------------- | --------- | ----------------------------------- |
| `challengeId` | `uint256` | Challenge id to claim rewards from. |

### confirmListing

Confirm a listing registration after the confirmation period. Perform initial token burn for a burning listing.

#### Signature

```solidity
function confirmListing(tendermintPublicKey bytes32) public
```

#### Parameters:

| Parameter             | Type      | Description                        |
| --------------------- | --------- | ---------------------------------- |
| `tendermintPublicKey` | `bytes32` | Hex encoded tendermint public key. |

### constructor

Initializes the ValidatorRegistry with chain based configuration for pacing and deployed addresses.

#### Signature

```solidity
constructor(_treasuryAddress address, _votingAddress address, _events address, _applicationPeriod uint256, _commitPeriod uint256, _challengePeriod uint256, _exitPeriod uint256, _rewardPeriod uint256) public
```

#### Parameters:

| Parameter            | Type      | Description                                                                 |
| -------------------- | --------- | --------------------------------------------------------------------------- |
| `_treasuryAddress`   | `address` | Deployed Treasury address.                                                  |
| `_votingAddress`     | `address` | Deployed Voting address.                                                    |
| `_events`            | `address` | Deployed EventEmitter address.                                              |
| `_applicationPeriod` | `uint256` | Initial application period (in blocks) for pending listings.                |
| `_commitPeriod`      | `uint256` | Number of blocks after challenge initiated in which votes can be committed. |
| `_challengePeriod`   | `uint256` | Number of blocks a challenge lasts before being finalized.                  |
| `_exitPeriod`        | `uint256` | Number of blocks exiting listings must wait before claiming stake.          |
| `_rewardPeriod`      | `uint256` | The frequency (in blocks) with which validator rewards may be issued.       |

### finalizeExit

Finalize a listings exit. Allowing the account to safely remove the staked tokens and nullify the listing.

#### Signature

```solidity
function finalizeExit(tendermintPublicKey bytes32) public
```

#### Parameters:

| Parameter             | Type      | Description                        |
| --------------------- | --------- | ---------------------------------- |
| `tendermintPublicKey` | `bytes32` | Hex encoded tendermint public key. |

### getChallenge

Expose challenge data for a given ID.

#### Signature

```solidity
function getChallenge(challengeId uint256) public view (tuple)
```

#### Parameters:

| Parameter     | Type      | Description                           |
| ------------- | --------- | ------------------------------------- |
| `challengeId` | `uint256` | The ID to retrieve challenge data for |

#### Returns:

The challenge indicated by the provided ID.

### getChallenges

Expose multiple challenges by is

#### Signature

```solidity
function getChallenges(challengeIds uint256[]) public view (tuple[])
```

#### Parameters:

| Parameter      | Type        | Description           |
| -------------- | ----------- | --------------------- |
| `challengeIds` | `uint256[]` | challenge ids to read |

#### Returns:

Array of requested challenges

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
| `pubKeys` | `bytes32[]` | Hex encoded Tendermint public keys to retrieve |

#### Returns:

The array of listing structures corresponding to the provided keys.

### initExit

Initiate a listing exit. Immediately exit a pending listing or start the exit delay and remove validator power of the listing.

#### Signature

```solidity
function initExit(tendermintPublicKey bytes32) public
```

#### Parameters:

| Parameter             | Type      | Description                        |
| --------------------- | --------- | ---------------------------------- |
| `tendermintPublicKey` | `bytes32` | Hex encoded tendermint public key. |

### reduceReward

Reduces the generating reward rate of a listing. This prevents the listing from needing to reapply when they amount of tokens they are generating is to high.

#### Signature

```solidity
function reduceReward(tendermintPublicKey bytes32, newRate int256) public
```

#### Parameters:

| Parameter             | Type      | Description                                   |
| --------------------- | --------- | --------------------------------------------- |
| `tendermintPublicKey` | `bytes32` | Hex encoded tendermint public key.            |
| `newRate`             | `int256`  | New reward rate in the units of ether/period. |

### registerListing

Register a listing. The listing will require the deposit of the at least the minimum stake balance. The tokens will now be vulnerable to be challenged but are not providing any valdator power.

#### Signature

```solidity
function registerListing(tendermintPublicKey bytes32, tokensToStake uint256, rewardRate int256, details string) public
```

#### Parameters:

| Parameter             | Type      | Description                                                                                           |
| --------------------- | --------- | ----------------------------------------------------------------------------------------------------- |
| `tendermintPublicKey` | `bytes32` | Hex encoded tendermint public key.                                                                    |
| `tokensToStake`       | `uint256` | The number of tokes at stake if the order is challenged.                                              |
| `rewardRate`          | `int256`  | The rate tokens are minted or destroyed over the active listings reward periods (ether/rewardPeriod). |
| `details`             | `string`  | A string value to represent support for claim (commonly an external link).                            |

### resolveChallenge

Resolve a challenge. Pays out tokens to the winning staked party. Captures information to facilitate voter payout.

#### Signature

```solidity
function resolveChallenge(tendermintPublicKey bytes32) public
```

#### Parameters:

| Parameter             | Type      | Description                        |
| --------------------- | --------- | ---------------------------------- |
| `tendermintPublicKey` | `bytes32` | Hex encoded tendermint public key. |

### transferOwnership

Allows the current owner to transfer control of the contract to a newOwner.

#### Signature

```solidity
function transferOwnership(newOwner address) public
```

#### Parameters:

| Parameter  | Type      | Description                           |
| ---------- | --------- | ------------------------------------- |
| `newOwner` | `address` | The address to transfer ownership to. |

### updateConfigValue

Updates the contract configuration.

#### Signature

```solidity
function updateConfigValue(index uint256, value uint256) public
```

#### Parameters:

| Parameter | Type      | Description                                    |
| --------- | --------- | ---------------------------------------------- |
| `index`   | `uint256` | The index of the parameter you wish to update. |
| `value`   | `uint256` | The new value for the parameter.               |
