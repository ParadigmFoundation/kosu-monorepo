> ## [@kosu/system-contracts](../README.md)

[Globals](../globals.md) / ["packages/kosu.js/src/ValidatorRegistry"](../modules/_packages_kosu_js_src_validatorregistry_.md) / [ValidatorRegistry](_packages_kosu_js_src_validatorregistry_.validatorregistry.md) /

# Class: ValidatorRegistry

Integration with ValidatorRegistry contract on an Ethereum blockchain.

## Hierarchy

* **ValidatorRegistry**

### Index

#### Constructors

* [constructor](_packages_kosu_js_src_validatorregistry_.validatorregistry.md#constructor)

#### Properties

* [address](_packages_kosu_js_src_validatorregistry_.validatorregistry.md#private-address)
* [coinbase](_packages_kosu_js_src_validatorregistry_.validatorregistry.md#private-coinbase)
* [contract](_packages_kosu_js_src_validatorregistry_.validatorregistry.md#private-contract)
* [treasury](_packages_kosu_js_src_validatorregistry_.validatorregistry.md#private-treasury)
* [web3](_packages_kosu_js_src_validatorregistry_.validatorregistry.md#private-web3)
* [web3Wrapper](_packages_kosu_js_src_validatorregistry_.validatorregistry.md#private-web3wrapper)

#### Methods

* [applicationPeriod](_packages_kosu_js_src_validatorregistry_.validatorregistry.md#applicationperiod)
* [challengeListing](_packages_kosu_js_src_validatorregistry_.validatorregistry.md#challengelisting)
* [challengePeriod](_packages_kosu_js_src_validatorregistry_.validatorregistry.md#challengeperiod)
* [claimRewards](_packages_kosu_js_src_validatorregistry_.validatorregistry.md#claimrewards)
* [claimWinnings](_packages_kosu_js_src_validatorregistry_.validatorregistry.md#claimwinnings)
* [commitPeriod](_packages_kosu_js_src_validatorregistry_.validatorregistry.md#commitperiod)
* [confirmListing](_packages_kosu_js_src_validatorregistry_.validatorregistry.md#confirmlisting)
* [convertPubKey](_packages_kosu_js_src_validatorregistry_.validatorregistry.md#convertpubkey)
* [exitPeriod](_packages_kosu_js_src_validatorregistry_.validatorregistry.md#exitperiod)
* [finalizeExit](_packages_kosu_js_src_validatorregistry_.validatorregistry.md#finalizeexit)
* [getAllChallenges](_packages_kosu_js_src_validatorregistry_.validatorregistry.md#getallchallenges)
* [getAllListings](_packages_kosu_js_src_validatorregistry_.validatorregistry.md#getalllistings)
* [getChallenge](_packages_kosu_js_src_validatorregistry_.validatorregistry.md#getchallenge)
* [getChallenges](_packages_kosu_js_src_validatorregistry_.validatorregistry.md#getchallenges)
* [getContract](_packages_kosu_js_src_validatorregistry_.validatorregistry.md#private-getcontract)
* [getListing](_packages_kosu_js_src_validatorregistry_.validatorregistry.md#getlisting)
* [getListings](_packages_kosu_js_src_validatorregistry_.validatorregistry.md#getlistings)
* [hexToBase64](_packages_kosu_js_src_validatorregistry_.validatorregistry.md#hextobase64)
* [initExit](_packages_kosu_js_src_validatorregistry_.validatorregistry.md#initexit)
* [kosuToken](_packages_kosu_js_src_validatorregistry_.validatorregistry.md#kosutoken)
* [listingKeys](_packages_kosu_js_src_validatorregistry_.validatorregistry.md#listingkeys)
* [maxRewardRate](_packages_kosu_js_src_validatorregistry_.validatorregistry.md#maxrewardrate)
* [minimumBalance](_packages_kosu_js_src_validatorregistry_.validatorregistry.md#minimumbalance)
* [registerListing](_packages_kosu_js_src_validatorregistry_.validatorregistry.md#registerlisting)
* [resolveChallenge](_packages_kosu_js_src_validatorregistry_.validatorregistry.md#resolvechallenge)
* [rewardPeriod](_packages_kosu_js_src_validatorregistry_.validatorregistry.md#rewardperiod)
* [stakeholderCut](_packages_kosu_js_src_validatorregistry_.validatorregistry.md#stakeholdercut)
* [voting](_packages_kosu_js_src_validatorregistry_.validatorregistry.md#voting)

## Constructors

###  constructor

\+ **new ValidatorRegistry**(`options`: `KosuOptions`, `treasury`: [Treasury](_packages_kosu_js_src_treasury_.treasury.md)): *[ValidatorRegistry](_packages_kosu_js_src_validatorregistry_.validatorregistry.md)*

*Defined in [packages/kosu.js/src/ValidatorRegistry.ts:18](url)*

Create a new ValidatorRegistry instance.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`options` | `KosuOptions` | instantiation options |
`treasury` | [Treasury](_packages_kosu_js_src_treasury_.treasury.md) | treasury integration instance  |

**Returns:** *[ValidatorRegistry](_packages_kosu_js_src_validatorregistry_.validatorregistry.md)*

___

## Properties

### `Private` address

● **address**: *string*

*Defined in [packages/kosu.js/src/ValidatorRegistry.ts:18](url)*

___

### `Private` coinbase

● **coinbase**: *string*

*Defined in [packages/kosu.js/src/ValidatorRegistry.ts:16](url)*

___

### `Private` contract

● **contract**: *[ValidatorRegistryContract](_node_modules__kosu_system_contracts_generated_wrappers_validator_registry_.validatorregistrycontract.md)*

*Defined in [packages/kosu.js/src/ValidatorRegistry.ts:15](url)*

___

### `Private` treasury

● **treasury**: *[Treasury](_packages_kosu_js_src_treasury_.treasury.md)*

*Defined in [packages/kosu.js/src/ValidatorRegistry.ts:14](url)*

___

### `Private` web3

● **web3**: *`Web3`*

*Defined in [packages/kosu.js/src/ValidatorRegistry.ts:13](url)*

___

### `Private` web3Wrapper

● **web3Wrapper**: *`Web3Wrapper`*

*Defined in [packages/kosu.js/src/ValidatorRegistry.ts:17](url)*

___

## Methods

###  applicationPeriod

▸ **applicationPeriod**(): *`Promise<BigNumber>`*

*Defined in [packages/kosu.js/src/ValidatorRegistry.ts:63](url)*

Reads the application period

**Returns:** *`Promise<BigNumber>`*

___

###  challengeListing

▸ **challengeListing**(`_pubKey`: string, `_details`: string): *`Promise<TransactionReceiptWithDecodedLogs>`*

*Defined in [packages/kosu.js/src/ValidatorRegistry.ts:250](url)*

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

*Defined in [packages/kosu.js/src/ValidatorRegistry.ts:79](url)*

Reads the challenge period

**Returns:** *`Promise<BigNumber>`*

___

###  claimRewards

▸ **claimRewards**(`_pubKey`: string): *`Promise<TransactionReceiptWithDecodedLogs>`*

*Defined in [packages/kosu.js/src/ValidatorRegistry.ts:279](url)*

Claims the rewards of a generating/burning listing

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`_pubKey` | string | hex encoded tendermint public key  |

**Returns:** *`Promise<TransactionReceiptWithDecodedLogs>`*

___

###  claimWinnings

▸ **claimWinnings**(`challengeId`: `BigNumber`): *`Promise<TransactionReceiptWithDecodedLogs>`*

*Defined in [packages/kosu.js/src/ValidatorRegistry.ts:309](url)*

Claims winnings from complete challenge

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`challengeId` | `BigNumber` | id of challenge coinbase has contributed a winning vote to  |

**Returns:** *`Promise<TransactionReceiptWithDecodedLogs>`*

___

###  commitPeriod

▸ **commitPeriod**(): *`Promise<BigNumber>`*

*Defined in [packages/kosu.js/src/ValidatorRegistry.ts:71](url)*

Reads the commit period

**Returns:** *`Promise<BigNumber>`*

___

###  confirmListing

▸ **confirmListing**(`_pubKey`: string): *`Promise<TransactionReceiptWithDecodedLogs>`*

*Defined in [packages/kosu.js/src/ValidatorRegistry.ts:239](url)*

Confirms listing after application period

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`_pubKey` | string | hex encoded tendermint public key  |

**Returns:** *`Promise<TransactionReceiptWithDecodedLogs>`*

___

###  convertPubKey

▸ **convertPubKey**(`_pubKey`: string): *string*

*Defined in [packages/kosu.js/src/ValidatorRegistry.ts:320](url)*

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

*Defined in [packages/kosu.js/src/ValidatorRegistry.ts:87](url)*

Reads the exit period

**Returns:** *`Promise<BigNumber>`*

___

###  finalizeExit

▸ **finalizeExit**(`_pubKey`: string): *`Promise<TransactionReceiptWithDecodedLogs>`*

*Defined in [packages/kosu.js/src/ValidatorRegistry.ts:299](url)*

Finalizes the exit of a listing

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`_pubKey` | string | hex encoded tendermint public key  |

**Returns:** *`Promise<TransactionReceiptWithDecodedLogs>`*

___

###  getAllChallenges

▸ **getAllChallenges**(): *`Promise<Challenge[]>`*

*Defined in [packages/kosu.js/src/ValidatorRegistry.ts:198](url)*

Reads all challenges

**Returns:** *`Promise<Challenge[]>`*

___

###  getAllListings

▸ **getAllListings**(): *`Promise<Listing[]>`*

*Defined in [packages/kosu.js/src/ValidatorRegistry.ts:161](url)*

Reads the registered listings

**Returns:** *`Promise<Listing[]>`*

___

###  getChallenge

▸ **getChallenge**(`challengeId`: `BigNumber`): *`Promise<Challenge>`*

*Defined in [packages/kosu.js/src/ValidatorRegistry.ts:179](url)*

Reads the challenge by challengeId

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`challengeId` | `BigNumber` | hex encoded tendermint public key  |

**Returns:** *`Promise<Challenge>`*

___

###  getChallenges

▸ **getChallenges**(`challengeIds`: `BigNumber`[]): *`Promise<Challenge[]>`*

*Defined in [packages/kosu.js/src/ValidatorRegistry.ts:189](url)*

Reads the challenges by challengeIds

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`challengeIds` | `BigNumber`[] | hex encoded tendermint public key  |

**Returns:** *`Promise<Challenge[]>`*

___

### `Private` getContract

▸ **getContract**(): *`Promise<ValidatorRegistryContract>`*

*Defined in [packages/kosu.js/src/ValidatorRegistry.ts:38](url)*

Asynchronously initializes the contract instance or returns it from cache

**Returns:** *`Promise<ValidatorRegistryContract>`*

The contract

___

###  getListing

▸ **getListing**(`_pubKey`: string): *`Promise<Listing>`*

*Defined in [packages/kosu.js/src/ValidatorRegistry.ts:145](url)*

Reads the listing for public key

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`_pubKey` | string | hex encoded tendermint public key  |

**Returns:** *`Promise<Listing>`*

___

###  getListings

▸ **getListings**(`_pubKeys`: string[]): *`Promise<Listing[]>`*

*Defined in [packages/kosu.js/src/ValidatorRegistry.ts:153](url)*

Reads the requested listings

**Parameters:**

Name | Type |
------ | ------ |
`_pubKeys` | string[] |

**Returns:** *`Promise<Listing[]>`*

___

###  hexToBase64

▸ **hexToBase64**(`_pubKey`: string): *string*

*Defined in [packages/kosu.js/src/ValidatorRegistry.ts:344](url)*

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

*Defined in [packages/kosu.js/src/ValidatorRegistry.ts:289](url)*

Initializes an exit of a listing from the registry

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`_pubKey` | string | hex encoded tendermint public key  |

**Returns:** *`Promise<TransactionReceiptWithDecodedLogs>`*

___

###  kosuToken

▸ **kosuToken**(): *`Promise<string>`*

*Defined in [packages/kosu.js/src/ValidatorRegistry.ts:127](url)*

Reads the kosuToken address

**Returns:** *`Promise<string>`*

___

###  listingKeys

▸ **listingKeys**(): *`Promise<string[]>`*

*Defined in [packages/kosu.js/src/ValidatorRegistry.ts:135](url)*

Reads the current listing keys

**Returns:** *`Promise<string[]>`*

___

###  maxRewardRate

▸ **maxRewardRate**(): *`Promise<BigNumber>`*

*Defined in [packages/kosu.js/src/ValidatorRegistry.ts:169](url)*

Reads the max reward rate

**Returns:** *`Promise<BigNumber>`*

___

###  minimumBalance

▸ **minimumBalance**(): *`Promise<BigNumber>`*

*Defined in [packages/kosu.js/src/ValidatorRegistry.ts:103](url)*

Reads the minimum balance

**Returns:** *`Promise<BigNumber>`*

___

###  registerListing

▸ **registerListing**(`_pubKey`: string, `_tokensToStake`: `BigNumber`, `_rewardRate`: `BigNumber`, `_details`: string): *`Promise<TransactionReceiptWithDecodedLogs>`*

*Defined in [packages/kosu.js/src/ValidatorRegistry.ts:211](url)*

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

*Defined in [packages/kosu.js/src/ValidatorRegistry.ts:269](url)*

Resolves challenge of a listing

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`_pubKey` | string | hex encoded tendermint public key  |

**Returns:** *`Promise<TransactionReceiptWithDecodedLogs>`*

___

###  rewardPeriod

▸ **rewardPeriod**(): *`Promise<BigNumber>`*

*Defined in [packages/kosu.js/src/ValidatorRegistry.ts:95](url)*

Reads the reward period

**Returns:** *`Promise<BigNumber>`*

___

###  stakeholderCut

▸ **stakeholderCut**(): *`Promise<BigNumber>`*

*Defined in [packages/kosu.js/src/ValidatorRegistry.ts:111](url)*

Reads the stakeholder cut

**Returns:** *`Promise<BigNumber>`*

___

###  voting

▸ **voting**(): *`Promise<string>`*

*Defined in [packages/kosu.js/src/ValidatorRegistry.ts:119](url)*

Reads the Voting contract address

**Returns:** *`Promise<string>`*

___