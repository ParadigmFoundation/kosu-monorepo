> ## [kosu.js](../README.md)

[Globals](../globals.md) / [ValidatorRegistry](validatorregistry.md) /

# Class: ValidatorRegistry

Integration with ValidatorRegistry contract on an Ethereum blockchain.

## Hierarchy

* **ValidatorRegistry**

### Index

#### Constructors

* [constructor](validatorregistry.md#constructor)

#### Properties

* [address](validatorregistry.md#private-address)
* [coinbase](validatorregistry.md#private-coinbase)
* [contract](validatorregistry.md#private-contract)
* [treasury](validatorregistry.md#private-treasury)
* [web3](validatorregistry.md#private-web3)
* [web3Wrapper](validatorregistry.md#private-web3wrapper)

#### Methods

* [applicationPeriod](validatorregistry.md#applicationperiod)
* [challengeListing](validatorregistry.md#challengelisting)
* [challengePeriod](validatorregistry.md#challengeperiod)
* [claimRewards](validatorregistry.md#claimrewards)
* [claimWinnings](validatorregistry.md#claimwinnings)
* [commitPeriod](validatorregistry.md#commitperiod)
* [confirmListing](validatorregistry.md#confirmlisting)
* [convertPubKey](validatorregistry.md#convertpubkey)
* [exitPeriod](validatorregistry.md#exitperiod)
* [finalizeExit](validatorregistry.md#finalizeexit)
* [getAllChallenges](validatorregistry.md#getallchallenges)
* [getAllListings](validatorregistry.md#getalllistings)
* [getChallenge](validatorregistry.md#getchallenge)
* [getChallenges](validatorregistry.md#getchallenges)
* [getContract](validatorregistry.md#private-getcontract)
* [getListing](validatorregistry.md#getlisting)
* [getListings](validatorregistry.md#getlistings)
* [hexToBase64](validatorregistry.md#hextobase64)
* [initExit](validatorregistry.md#initexit)
* [kosuToken](validatorregistry.md#kosutoken)
* [listingKeys](validatorregistry.md#listingkeys)
* [maxRewardRate](validatorregistry.md#maxrewardrate)
* [minimumBalance](validatorregistry.md#minimumbalance)
* [registerListing](validatorregistry.md#registerlisting)
* [resolveChallenge](validatorregistry.md#resolvechallenge)
* [rewardPeriod](validatorregistry.md#rewardperiod)
* [stakeholderCut](validatorregistry.md#stakeholdercut)
* [voting](validatorregistry.md#voting)

## Constructors

###  constructor

\+ **new ValidatorRegistry**(`options`: [KosuOptions](../interfaces/kosuoptions.md), `treasury`: [Treasury](treasury.md)): *[ValidatorRegistry](validatorregistry.md)*

Defined in ValidatorRegistry.ts:18

Create a new ValidatorRegistry instance.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`options` | [KosuOptions](../interfaces/kosuoptions.md) | instantiation options |
`treasury` | [Treasury](treasury.md) | treasury integration instance  |

**Returns:** *[ValidatorRegistry](validatorregistry.md)*

___

## Properties

### `Private` address

● **address**: *string*

Defined in ValidatorRegistry.ts:18

___

### `Private` coinbase

● **coinbase**: *string*

Defined in ValidatorRegistry.ts:16

___

### `Private` contract

● **contract**: *`ValidatorRegistryContract`*

Defined in ValidatorRegistry.ts:15

___

### `Private` treasury

● **treasury**: *[Treasury](treasury.md)*

Defined in ValidatorRegistry.ts:14

___

### `Private` web3

● **web3**: *`Web3`*

Defined in ValidatorRegistry.ts:13

___

### `Private` web3Wrapper

● **web3Wrapper**: *`Web3Wrapper`*

Defined in ValidatorRegistry.ts:17

___

## Methods

###  applicationPeriod

▸ **applicationPeriod**(): *`Promise<BigNumber>`*

Defined in ValidatorRegistry.ts:63

Reads the application period

**Returns:** *`Promise<BigNumber>`*

___

###  challengeListing

▸ **challengeListing**(`_pubKey`: string, `_details`: string): *`Promise<TransactionReceiptWithDecodedLogs>`*

Defined in ValidatorRegistry.ts:250

Starts a challenge of a listing

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`_pubKey` | string | hex encoded tendermint public key |
`_details` | string | String value (often a url) to support listing claim  |

**Returns:** *`Promise<TransactionReceiptWithDecodedLogs>`*

___

###  challengePeriod

▸ **challengePeriod**(): *`Promise<BigNumber>`*

Defined in ValidatorRegistry.ts:79

Reads the challenge period

**Returns:** *`Promise<BigNumber>`*

___

###  claimRewards

▸ **claimRewards**(`_pubKey`: string): *`Promise<TransactionReceiptWithDecodedLogs>`*

Defined in ValidatorRegistry.ts:279

Claims the rewards of a generating/burning listing

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`_pubKey` | string | hex encoded tendermint public key  |

**Returns:** *`Promise<TransactionReceiptWithDecodedLogs>`*

___

###  claimWinnings

▸ **claimWinnings**(`challengeId`: `BigNumber`): *`Promise<TransactionReceiptWithDecodedLogs>`*

Defined in ValidatorRegistry.ts:309

Claims winnings from complete challenge

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`challengeId` | `BigNumber` | id of challenge coinbase has contributed a winning vote to  |

**Returns:** *`Promise<TransactionReceiptWithDecodedLogs>`*

___

###  commitPeriod

▸ **commitPeriod**(): *`Promise<BigNumber>`*

Defined in ValidatorRegistry.ts:71

Reads the commit period

**Returns:** *`Promise<BigNumber>`*

___

###  confirmListing

▸ **confirmListing**(`_pubKey`: string): *`Promise<TransactionReceiptWithDecodedLogs>`*

Defined in ValidatorRegistry.ts:239

Confirms listing after application period

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`_pubKey` | string | hex encoded tendermint public key  |

**Returns:** *`Promise<TransactionReceiptWithDecodedLogs>`*

___

###  convertPubKey

▸ **convertPubKey**(`_pubKey`: string): *string*

Defined in ValidatorRegistry.ts:320

Converts public key to hex if input is not currently in hex

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`_pubKey` | string | . |

**Returns:** *string*

hex encoded tendermint public key

___

###  exitPeriod

▸ **exitPeriod**(): *`Promise<BigNumber>`*

Defined in ValidatorRegistry.ts:87

Reads the exit period

**Returns:** *`Promise<BigNumber>`*

___

###  finalizeExit

▸ **finalizeExit**(`_pubKey`: string): *`Promise<TransactionReceiptWithDecodedLogs>`*

Defined in ValidatorRegistry.ts:299

Finalizes the exit of a listing

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`_pubKey` | string | hex encoded tendermint public key  |

**Returns:** *`Promise<TransactionReceiptWithDecodedLogs>`*

___

###  getAllChallenges

▸ **getAllChallenges**(): *`Promise<Challenge[]>`*

Defined in ValidatorRegistry.ts:198

Reads all challenges

**Returns:** *`Promise<Challenge[]>`*

___

###  getAllListings

▸ **getAllListings**(): *`Promise<Listing[]>`*

Defined in ValidatorRegistry.ts:161

Reads the registered listings

**Returns:** *`Promise<Listing[]>`*

___

###  getChallenge

▸ **getChallenge**(`challengeId`: `BigNumber`): *`Promise<Challenge>`*

Defined in ValidatorRegistry.ts:179

Reads the challenge by challengeId

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`challengeId` | `BigNumber` | hex encoded tendermint public key  |

**Returns:** *`Promise<Challenge>`*

___

###  getChallenges

▸ **getChallenges**(`challengeIds`: `BigNumber`[]): *`Promise<Challenge[]>`*

Defined in ValidatorRegistry.ts:189

Reads the challenges by challengeIds

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`challengeIds` | `BigNumber`[] | hex encoded tendermint public key  |

**Returns:** *`Promise<Challenge[]>`*

___

### `Private` getContract

▸ **getContract**(): *`Promise<ValidatorRegistryContract>`*

Defined in ValidatorRegistry.ts:38

Asynchronously initializes the contract instance or returns it from cache

**Returns:** *`Promise<ValidatorRegistryContract>`*

The contract

___

###  getListing

▸ **getListing**(`_pubKey`: string): *`Promise<Listing>`*

Defined in ValidatorRegistry.ts:145

Reads the listing for public key

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`_pubKey` | string | hex encoded tendermint public key  |

**Returns:** *`Promise<Listing>`*

___

###  getListings

▸ **getListings**(`_pubKeys`: string[]): *`Promise<Listing[]>`*

Defined in ValidatorRegistry.ts:153

Reads the requested listings

**Parameters:**

Name | Type |
------ | ------ |
`_pubKeys` | string[] |

**Returns:** *`Promise<Listing[]>`*

___

###  hexToBase64

▸ **hexToBase64**(`_pubKey`: string): *string*

Defined in ValidatorRegistry.ts:344

Converts hex encoded public key back to tendermint base64

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`_pubKey` | string | hex encoded tendermint public key |

**Returns:** *string*

Base64 tendermint public key

___

###  initExit

▸ **initExit**(`_pubKey`: string): *`Promise<TransactionReceiptWithDecodedLogs>`*

Defined in ValidatorRegistry.ts:289

Initializes an exit of a listing from the registry

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`_pubKey` | string | hex encoded tendermint public key  |

**Returns:** *`Promise<TransactionReceiptWithDecodedLogs>`*

___

###  kosuToken

▸ **kosuToken**(): *`Promise<string>`*

Defined in ValidatorRegistry.ts:127

Reads the kosuToken address

**Returns:** *`Promise<string>`*

___

###  listingKeys

▸ **listingKeys**(): *`Promise<string[]>`*

Defined in ValidatorRegistry.ts:135

Reads the current listing keys

**Returns:** *`Promise<string[]>`*

___

###  maxRewardRate

▸ **maxRewardRate**(): *`Promise<BigNumber>`*

Defined in ValidatorRegistry.ts:169

Reads the max reward rate

**Returns:** *`Promise<BigNumber>`*

___

###  minimumBalance

▸ **minimumBalance**(): *`Promise<BigNumber>`*

Defined in ValidatorRegistry.ts:103

Reads the minimum balance

**Returns:** *`Promise<BigNumber>`*

___

###  registerListing

▸ **registerListing**(`_pubKey`: string, `_tokensToStake`: `BigNumber`, `_rewardRate`: `BigNumber`, `_details`: string): *`Promise<TransactionReceiptWithDecodedLogs>`*

Defined in ValidatorRegistry.ts:211

Register a new listing

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`_pubKey` | string | hex encoded tendermint public key |
`_tokensToStake` | `BigNumber` | uint number of tokens to stake ( must be greater than minimum balance) |
`_rewardRate` | `BigNumber` | int value of tokens to earn, burn or neither per reward period |
`_details` | string | String value (often a url) to support listing claim  |

**Returns:** *`Promise<TransactionReceiptWithDecodedLogs>`*

___

###  resolveChallenge

▸ **resolveChallenge**(`_pubKey`: string): *`Promise<TransactionReceiptWithDecodedLogs>`*

Defined in ValidatorRegistry.ts:269

Resolves challenge of a listing

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`_pubKey` | string | hex encoded tendermint public key  |

**Returns:** *`Promise<TransactionReceiptWithDecodedLogs>`*

___

###  rewardPeriod

▸ **rewardPeriod**(): *`Promise<BigNumber>`*

Defined in ValidatorRegistry.ts:95

Reads the reward period

**Returns:** *`Promise<BigNumber>`*

___

###  stakeholderCut

▸ **stakeholderCut**(): *`Promise<BigNumber>`*

Defined in ValidatorRegistry.ts:111

Reads the stakeholder cut

**Returns:** *`Promise<BigNumber>`*

___

###  voting

▸ **voting**(): *`Promise<string>`*

Defined in ValidatorRegistry.ts:119

Reads the Voting contract address

**Returns:** *`Promise<string>`*

___