[wrapper-enhancements](../README.md) › [Globals](../globals.md) › [ValidatorRegistry](validatorregistry.md)

# Class: ValidatorRegistry

Integration with ValidatorRegistry contract on an Ethereum blockchain.

## Hierarchy

* **ValidatorRegistry**

## Index

### Constructors

* [constructor](validatorregistry.md#constructor)

### Properties

* [address](validatorregistry.md#address)
* [coinbase](validatorregistry.md#coinbase)
* [contract](validatorregistry.md#contract)
* [treasury](validatorregistry.md#treasury)
* [web3Wrapper](validatorregistry.md#web3wrapper)

### Methods

* [applicationPeriod](validatorregistry.md#applicationperiod)
* [challengeListing](validatorregistry.md#challengelisting)
* [challengePeriod](validatorregistry.md#challengeperiod)
* [claimRewards](validatorregistry.md#claimrewards)
* [claimWinnings](validatorregistry.md#claimwinnings)
* [commitPeriod](validatorregistry.md#commitperiod)
* [confirmListing](validatorregistry.md#confirmlisting)
* [exitPeriod](validatorregistry.md#exitperiod)
* [finalizeExit](validatorregistry.md#finalizeexit)
* [getAllChallenges](validatorregistry.md#getallchallenges)
* [getAllListings](validatorregistry.md#getalllistings)
* [getChallenge](validatorregistry.md#getchallenge)
* [getChallenges](validatorregistry.md#getchallenges)
* [getContract](validatorregistry.md#getcontract)
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

\+ **new ValidatorRegistry**(`options`: KosuOptions, `treasury?`: [Treasury](treasury.md)): *[ValidatorRegistry](validatorregistry.md)*

*Defined in [ValidatorRegistry.ts:23](https://github.com/ParadigmFoundation/kosu-monorepo/blob/821f0d85/packages/kosu-wrapper-enhancements/src/ValidatorRegistry.ts#L23)*

Create a new ValidatorRegistry instance.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`options` | KosuOptions | instantiation options |
`treasury?` | [Treasury](treasury.md) | treasury integration instance  |

**Returns:** *[ValidatorRegistry](validatorregistry.md)*

## Properties

###  address

• **address**: *string*

*Defined in [ValidatorRegistry.ts:18](https://github.com/ParadigmFoundation/kosu-monorepo/blob/821f0d85/packages/kosu-wrapper-enhancements/src/ValidatorRegistry.ts#L18)*

___

###  coinbase

• **coinbase**: *string*

*Defined in [ValidatorRegistry.ts:23](https://github.com/ParadigmFoundation/kosu-monorepo/blob/821f0d85/packages/kosu-wrapper-enhancements/src/ValidatorRegistry.ts#L23)*

The user's coinbase address (if available via supplied provider).

___

###  contract

• **contract**: *ValidatorRegistryContract*

*Defined in [ValidatorRegistry.ts:16](https://github.com/ParadigmFoundation/kosu-monorepo/blob/821f0d85/packages/kosu-wrapper-enhancements/src/ValidatorRegistry.ts#L16)*

___

###  treasury

• **treasury**: *[Treasury](treasury.md)*

*Defined in [ValidatorRegistry.ts:15](https://github.com/ParadigmFoundation/kosu-monorepo/blob/821f0d85/packages/kosu-wrapper-enhancements/src/ValidatorRegistry.ts#L15)*

___

###  web3Wrapper

• **web3Wrapper**: *Web3Wrapper*

*Defined in [ValidatorRegistry.ts:17](https://github.com/ParadigmFoundation/kosu-monorepo/blob/821f0d85/packages/kosu-wrapper-enhancements/src/ValidatorRegistry.ts#L17)*

## Methods

###  applicationPeriod

▸ **applicationPeriod**(): *Promise‹BigNumber›*

*Defined in [ValidatorRegistry.ts:65](https://github.com/ParadigmFoundation/kosu-monorepo/blob/821f0d85/packages/kosu-wrapper-enhancements/src/ValidatorRegistry.ts#L65)*

Reads the application period

**Returns:** *Promise‹BigNumber›*

___

###  challengeListing

▸ **challengeListing**(`_pubKey`: string, `_details`: string): *Promise‹TransactionReceiptWithDecodedLogs›*

*Defined in [ValidatorRegistry.ts:257](https://github.com/ParadigmFoundation/kosu-monorepo/blob/821f0d85/packages/kosu-wrapper-enhancements/src/ValidatorRegistry.ts#L257)*

Starts a challenge of a listing

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`_pubKey` | string | hex encoded tendermint public key |
`_details` | string | String value (often a url) to support listing claim  |

**Returns:** *Promise‹TransactionReceiptWithDecodedLogs›*

___

###  challengePeriod

▸ **challengePeriod**(): *Promise‹BigNumber›*

*Defined in [ValidatorRegistry.ts:81](https://github.com/ParadigmFoundation/kosu-monorepo/blob/821f0d85/packages/kosu-wrapper-enhancements/src/ValidatorRegistry.ts#L81)*

Reads the challenge period

**Returns:** *Promise‹BigNumber›*

___

###  claimRewards

▸ **claimRewards**(`_pubKey`: string): *Promise‹TransactionReceiptWithDecodedLogs›*

*Defined in [ValidatorRegistry.ts:286](https://github.com/ParadigmFoundation/kosu-monorepo/blob/821f0d85/packages/kosu-wrapper-enhancements/src/ValidatorRegistry.ts#L286)*

Claims the rewards of a generating/burning listing

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`_pubKey` | string | hex encoded tendermint public key  |

**Returns:** *Promise‹TransactionReceiptWithDecodedLogs›*

___

###  claimWinnings

▸ **claimWinnings**(`challengeId`: BigNumber): *Promise‹TransactionReceiptWithDecodedLogs›*

*Defined in [ValidatorRegistry.ts:316](https://github.com/ParadigmFoundation/kosu-monorepo/blob/821f0d85/packages/kosu-wrapper-enhancements/src/ValidatorRegistry.ts#L316)*

Claims winnings from complete challenge

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`challengeId` | BigNumber | id of challenge coinbase has contributed a winning vote to  |

**Returns:** *Promise‹TransactionReceiptWithDecodedLogs›*

___

###  commitPeriod

▸ **commitPeriod**(): *Promise‹BigNumber›*

*Defined in [ValidatorRegistry.ts:73](https://github.com/ParadigmFoundation/kosu-monorepo/blob/821f0d85/packages/kosu-wrapper-enhancements/src/ValidatorRegistry.ts#L73)*

Reads the commit period

**Returns:** *Promise‹BigNumber›*

___

###  confirmListing

▸ **confirmListing**(`_pubKey`: string): *Promise‹TransactionReceiptWithDecodedLogs›*

*Defined in [ValidatorRegistry.ts:246](https://github.com/ParadigmFoundation/kosu-monorepo/blob/821f0d85/packages/kosu-wrapper-enhancements/src/ValidatorRegistry.ts#L246)*

Confirms listing after application period

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`_pubKey` | string | hex encoded tendermint public key  |

**Returns:** *Promise‹TransactionReceiptWithDecodedLogs›*

___

###  exitPeriod

▸ **exitPeriod**(): *Promise‹BigNumber›*

*Defined in [ValidatorRegistry.ts:89](https://github.com/ParadigmFoundation/kosu-monorepo/blob/821f0d85/packages/kosu-wrapper-enhancements/src/ValidatorRegistry.ts#L89)*

Reads the exit period

**Returns:** *Promise‹BigNumber›*

___

###  finalizeExit

▸ **finalizeExit**(`_pubKey`: string): *Promise‹TransactionReceiptWithDecodedLogs›*

*Defined in [ValidatorRegistry.ts:306](https://github.com/ParadigmFoundation/kosu-monorepo/blob/821f0d85/packages/kosu-wrapper-enhancements/src/ValidatorRegistry.ts#L306)*

Finalizes the exit of a listing

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`_pubKey` | string | hex encoded tendermint public key  |

**Returns:** *Promise‹TransactionReceiptWithDecodedLogs›*

___

###  getAllChallenges

▸ **getAllChallenges**(): *Promise‹Challenge[]›*

*Defined in [ValidatorRegistry.ts:200](https://github.com/ParadigmFoundation/kosu-monorepo/blob/821f0d85/packages/kosu-wrapper-enhancements/src/ValidatorRegistry.ts#L200)*

Reads all challenges

**Returns:** *Promise‹Challenge[]›*

___

###  getAllListings

▸ **getAllListings**(): *Promise‹Listing[]›*

*Defined in [ValidatorRegistry.ts:163](https://github.com/ParadigmFoundation/kosu-monorepo/blob/821f0d85/packages/kosu-wrapper-enhancements/src/ValidatorRegistry.ts#L163)*

Reads the registered listings

**Returns:** *Promise‹Listing[]›*

___

###  getChallenge

▸ **getChallenge**(`challengeId`: BigNumber): *Promise‹Challenge›*

*Defined in [ValidatorRegistry.ts:181](https://github.com/ParadigmFoundation/kosu-monorepo/blob/821f0d85/packages/kosu-wrapper-enhancements/src/ValidatorRegistry.ts#L181)*

Reads the challenge by challengeId

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`challengeId` | BigNumber | hex encoded tendermint public key  |

**Returns:** *Promise‹Challenge›*

___

###  getChallenges

▸ **getChallenges**(`challengeIds`: BigNumber[]): *Promise‹Challenge[]›*

*Defined in [ValidatorRegistry.ts:191](https://github.com/ParadigmFoundation/kosu-monorepo/blob/821f0d85/packages/kosu-wrapper-enhancements/src/ValidatorRegistry.ts#L191)*

Reads the challenges by challengeIds

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`challengeIds` | BigNumber[] | hex encoded tendermint public key  |

**Returns:** *Promise‹Challenge[]›*

___

###  getContract

▸ **getContract**(): *Promise‹ValidatorRegistryContract›*

*Defined in [ValidatorRegistry.ts:42](https://github.com/ParadigmFoundation/kosu-monorepo/blob/821f0d85/packages/kosu-wrapper-enhancements/src/ValidatorRegistry.ts#L42)*

Asynchronously initializes the contract instance or returns it from cache

**Returns:** *Promise‹ValidatorRegistryContract›*

The contract

___

###  getListing

▸ **getListing**(`_pubKey`: string): *Promise‹Listing›*

*Defined in [ValidatorRegistry.ts:147](https://github.com/ParadigmFoundation/kosu-monorepo/blob/821f0d85/packages/kosu-wrapper-enhancements/src/ValidatorRegistry.ts#L147)*

Reads the listing for public key

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`_pubKey` | string | hex encoded tendermint public key  |

**Returns:** *Promise‹Listing›*

___

###  getListings

▸ **getListings**(`_pubKeys`: string[]): *Promise‹Listing[]›*

*Defined in [ValidatorRegistry.ts:155](https://github.com/ParadigmFoundation/kosu-monorepo/blob/821f0d85/packages/kosu-wrapper-enhancements/src/ValidatorRegistry.ts#L155)*

Reads the requested listings

**Parameters:**

Name | Type |
------ | ------ |
`_pubKeys` | string[] |

**Returns:** *Promise‹Listing[]›*

___

###  hexToBase64

▸ **hexToBase64**(`_pubKey`: string): *string*

*Defined in [ValidatorRegistry.ts:328](https://github.com/ParadigmFoundation/kosu-monorepo/blob/821f0d85/packages/kosu-wrapper-enhancements/src/ValidatorRegistry.ts#L328)*

Converts hex encoded public key back to tendermint base64

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`_pubKey` | string | hex encoded tendermint public key |

**Returns:** *string*

Base64 tendermint public key

___

###  initExit

▸ **initExit**(`_pubKey`: string): *Promise‹TransactionReceiptWithDecodedLogs›*

*Defined in [ValidatorRegistry.ts:296](https://github.com/ParadigmFoundation/kosu-monorepo/blob/821f0d85/packages/kosu-wrapper-enhancements/src/ValidatorRegistry.ts#L296)*

Initializes an exit of a listing from the registry

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`_pubKey` | string | hex encoded tendermint public key  |

**Returns:** *Promise‹TransactionReceiptWithDecodedLogs›*

___

###  kosuToken

▸ **kosuToken**(): *Promise‹string›*

*Defined in [ValidatorRegistry.ts:129](https://github.com/ParadigmFoundation/kosu-monorepo/blob/821f0d85/packages/kosu-wrapper-enhancements/src/ValidatorRegistry.ts#L129)*

Reads the kosuToken address

**Returns:** *Promise‹string›*

___

###  listingKeys

▸ **listingKeys**(): *Promise‹string[]›*

*Defined in [ValidatorRegistry.ts:137](https://github.com/ParadigmFoundation/kosu-monorepo/blob/821f0d85/packages/kosu-wrapper-enhancements/src/ValidatorRegistry.ts#L137)*

Reads the current listing keys

**Returns:** *Promise‹string[]›*

___

###  maxRewardRate

▸ **maxRewardRate**(): *Promise‹BigNumber›*

*Defined in [ValidatorRegistry.ts:171](https://github.com/ParadigmFoundation/kosu-monorepo/blob/821f0d85/packages/kosu-wrapper-enhancements/src/ValidatorRegistry.ts#L171)*

Reads the max reward rate

**Returns:** *Promise‹BigNumber›*

___

###  minimumBalance

▸ **minimumBalance**(): *Promise‹BigNumber›*

*Defined in [ValidatorRegistry.ts:105](https://github.com/ParadigmFoundation/kosu-monorepo/blob/821f0d85/packages/kosu-wrapper-enhancements/src/ValidatorRegistry.ts#L105)*

Reads the minimum balance

**Returns:** *Promise‹BigNumber›*

___

###  registerListing

▸ **registerListing**(`_pubKey`: string, `_tokensToStake`: BigNumber, `_rewardRate`: BigNumber, `_details`: string): *Promise‹TransactionReceiptWithDecodedLogs›*

*Defined in [ValidatorRegistry.ts:213](https://github.com/ParadigmFoundation/kosu-monorepo/blob/821f0d85/packages/kosu-wrapper-enhancements/src/ValidatorRegistry.ts#L213)*

Register a new listing

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`_pubKey` | string | hex encoded tendermint public key |
`_tokensToStake` | BigNumber | uint number of tokens to stake ( must be greater than minimum balance) |
`_rewardRate` | BigNumber | int value of tokens to earn, burn or neither per reward period |
`_details` | string | String value (often a url) to support listing claim  |

**Returns:** *Promise‹TransactionReceiptWithDecodedLogs›*

___

###  resolveChallenge

▸ **resolveChallenge**(`_pubKey`: string): *Promise‹TransactionReceiptWithDecodedLogs›*

*Defined in [ValidatorRegistry.ts:276](https://github.com/ParadigmFoundation/kosu-monorepo/blob/821f0d85/packages/kosu-wrapper-enhancements/src/ValidatorRegistry.ts#L276)*

Resolves challenge of a listing

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`_pubKey` | string | hex encoded tendermint public key  |

**Returns:** *Promise‹TransactionReceiptWithDecodedLogs›*

___

###  rewardPeriod

▸ **rewardPeriod**(): *Promise‹BigNumber›*

*Defined in [ValidatorRegistry.ts:97](https://github.com/ParadigmFoundation/kosu-monorepo/blob/821f0d85/packages/kosu-wrapper-enhancements/src/ValidatorRegistry.ts#L97)*

Reads the reward period

**Returns:** *Promise‹BigNumber›*

___

###  stakeholderCut

▸ **stakeholderCut**(): *Promise‹BigNumber›*

*Defined in [ValidatorRegistry.ts:113](https://github.com/ParadigmFoundation/kosu-monorepo/blob/821f0d85/packages/kosu-wrapper-enhancements/src/ValidatorRegistry.ts#L113)*

Reads the stakeholder cut

**Returns:** *Promise‹BigNumber›*

___

###  voting

▸ **voting**(): *Promise‹string›*

*Defined in [ValidatorRegistry.ts:121](https://github.com/ParadigmFoundation/kosu-monorepo/blob/821f0d85/packages/kosu-wrapper-enhancements/src/ValidatorRegistry.ts#L121)*

Reads the Voting contract address

**Returns:** *Promise‹string›*
