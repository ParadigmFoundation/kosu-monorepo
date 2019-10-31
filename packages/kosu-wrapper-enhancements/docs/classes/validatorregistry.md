[wrapper-enhancements](../README.md) › [Globals](../globals.md) › [ValidatorRegistry](validatorregistry.md)

# Class: ValidatorRegistry

Integration with ValidatorRegistry contract on an Ethereum blockchain.

## Hierarchy

-   **ValidatorRegistry**

## Index

### Constructors

-   [constructor](validatorregistry.md#constructor)

### Properties

-   [address](validatorregistry.md#address)
-   [coinbase](validatorregistry.md#coinbase)
-   [contract](validatorregistry.md#contract)
-   [treasury](validatorregistry.md#treasury)
-   [web3Wrapper](validatorregistry.md#web3wrapper)

### Methods

-   [applicationPeriod](validatorregistry.md#applicationperiod)
-   [challengeListing](validatorregistry.md#challengelisting)
-   [challengePeriod](validatorregistry.md#challengeperiod)
-   [claimRewards](validatorregistry.md#claimrewards)
-   [claimWinnings](validatorregistry.md#claimwinnings)
-   [commitPeriod](validatorregistry.md#commitperiod)
-   [confirmListing](validatorregistry.md#confirmlisting)
-   [exitPeriod](validatorregistry.md#exitperiod)
-   [finalizeExit](validatorregistry.md#finalizeexit)
-   [getAllChallenges](validatorregistry.md#getallchallenges)
-   [getAllListings](validatorregistry.md#getalllistings)
-   [getChallenge](validatorregistry.md#getchallenge)
-   [getChallenges](validatorregistry.md#getchallenges)
-   [getContract](validatorregistry.md#getcontract)
-   [getListing](validatorregistry.md#getlisting)
-   [getListings](validatorregistry.md#getlistings)
-   [hexToBase64](validatorregistry.md#hextobase64)
-   [initExit](validatorregistry.md#initexit)
-   [kosuToken](validatorregistry.md#kosutoken)
-   [listingKeys](validatorregistry.md#listingkeys)
-   [maxRewardRate](validatorregistry.md#maxrewardrate)
-   [minimumBalance](validatorregistry.md#minimumbalance)
-   [registerListing](validatorregistry.md#registerlisting)
-   [resolveChallenge](validatorregistry.md#resolvechallenge)
-   [rewardPeriod](validatorregistry.md#rewardperiod)
-   [stakeholderCut](validatorregistry.md#stakeholdercut)
-   [voting](validatorregistry.md#voting)

## Constructors

### constructor

\+ **new ValidatorRegistry**(`options`: KosuOptions, `treasury?`: [Treasury](treasury.md)): _[ValidatorRegistry](validatorregistry.md)_

_Defined in [ValidatorRegistry.ts:23](https://github.com/ParadigmFoundation/kosu-monorepo/blob/bc352f90/packages/kosu-wrapper-enhancements/src/ValidatorRegistry.ts#L23)_

Create a new ValidatorRegistry instance.

**Parameters:**

| Name        | Type                    | Description                   |
| ----------- | ----------------------- | ----------------------------- |
| `options`   | KosuOptions             | instantiation options         |
| `treasury?` | [Treasury](treasury.md) | treasury integration instance |

**Returns:** _[ValidatorRegistry](validatorregistry.md)_

## Properties

### address

• **address**: _string_

_Defined in [ValidatorRegistry.ts:18](https://github.com/ParadigmFoundation/kosu-monorepo/blob/bc352f90/packages/kosu-wrapper-enhancements/src/ValidatorRegistry.ts#L18)_

---

### coinbase

• **coinbase**: _string_

_Defined in [ValidatorRegistry.ts:23](https://github.com/ParadigmFoundation/kosu-monorepo/blob/bc352f90/packages/kosu-wrapper-enhancements/src/ValidatorRegistry.ts#L23)_

The user's coinbase address (if available via supplied provider).

---

### contract

• **contract**: _ValidatorRegistryContract_

_Defined in [ValidatorRegistry.ts:16](https://github.com/ParadigmFoundation/kosu-monorepo/blob/bc352f90/packages/kosu-wrapper-enhancements/src/ValidatorRegistry.ts#L16)_

---

### treasury

• **treasury**: _[Treasury](treasury.md)_

_Defined in [ValidatorRegistry.ts:15](https://github.com/ParadigmFoundation/kosu-monorepo/blob/bc352f90/packages/kosu-wrapper-enhancements/src/ValidatorRegistry.ts#L15)_

---

### web3Wrapper

• **web3Wrapper**: _Web3Wrapper_

_Defined in [ValidatorRegistry.ts:17](https://github.com/ParadigmFoundation/kosu-monorepo/blob/bc352f90/packages/kosu-wrapper-enhancements/src/ValidatorRegistry.ts#L17)_

## Methods

### applicationPeriod

▸ **applicationPeriod**(): _Promise‹BigNumber›_

_Defined in [ValidatorRegistry.ts:65](https://github.com/ParadigmFoundation/kosu-monorepo/blob/bc352f90/packages/kosu-wrapper-enhancements/src/ValidatorRegistry.ts#L65)_

Reads the application period

**Returns:** _Promise‹BigNumber›_

---

### challengeListing

▸ **challengeListing**(`_pubKey`: string, `_details`: string): _Promise‹TransactionReceiptWithDecodedLogs›_

_Defined in [ValidatorRegistry.ts:257](https://github.com/ParadigmFoundation/kosu-monorepo/blob/bc352f90/packages/kosu-wrapper-enhancements/src/ValidatorRegistry.ts#L257)_

Starts a challenge of a listing

**Parameters:**

| Name       | Type   | Description                                         |
| ---------- | ------ | --------------------------------------------------- |
| `_pubKey`  | string | hex encoded tendermint public key                   |
| `_details` | string | String value (often a url) to support listing claim |

**Returns:** _Promise‹TransactionReceiptWithDecodedLogs›_

---

### challengePeriod

▸ **challengePeriod**(): _Promise‹BigNumber›_

_Defined in [ValidatorRegistry.ts:81](https://github.com/ParadigmFoundation/kosu-monorepo/blob/bc352f90/packages/kosu-wrapper-enhancements/src/ValidatorRegistry.ts#L81)_

Reads the challenge period

**Returns:** _Promise‹BigNumber›_

---

### claimRewards

▸ **claimRewards**(`_pubKey`: string): _Promise‹TransactionReceiptWithDecodedLogs›_

_Defined in [ValidatorRegistry.ts:286](https://github.com/ParadigmFoundation/kosu-monorepo/blob/bc352f90/packages/kosu-wrapper-enhancements/src/ValidatorRegistry.ts#L286)_

Claims the rewards of a generating/burning listing

**Parameters:**

| Name      | Type   | Description                       |
| --------- | ------ | --------------------------------- |
| `_pubKey` | string | hex encoded tendermint public key |

**Returns:** _Promise‹TransactionReceiptWithDecodedLogs›_

---

### claimWinnings

▸ **claimWinnings**(`challengeId`: BigNumber): _Promise‹TransactionReceiptWithDecodedLogs›_

_Defined in [ValidatorRegistry.ts:316](https://github.com/ParadigmFoundation/kosu-monorepo/blob/bc352f90/packages/kosu-wrapper-enhancements/src/ValidatorRegistry.ts#L316)_

Claims winnings from complete challenge

**Parameters:**

| Name          | Type      | Description                                                |
| ------------- | --------- | ---------------------------------------------------------- |
| `challengeId` | BigNumber | id of challenge coinbase has contributed a winning vote to |

**Returns:** _Promise‹TransactionReceiptWithDecodedLogs›_

---

### commitPeriod

▸ **commitPeriod**(): _Promise‹BigNumber›_

_Defined in [ValidatorRegistry.ts:73](https://github.com/ParadigmFoundation/kosu-monorepo/blob/bc352f90/packages/kosu-wrapper-enhancements/src/ValidatorRegistry.ts#L73)_

Reads the commit period

**Returns:** _Promise‹BigNumber›_

---

### confirmListing

▸ **confirmListing**(`_pubKey`: string): _Promise‹TransactionReceiptWithDecodedLogs›_

_Defined in [ValidatorRegistry.ts:246](https://github.com/ParadigmFoundation/kosu-monorepo/blob/bc352f90/packages/kosu-wrapper-enhancements/src/ValidatorRegistry.ts#L246)_

Confirms listing after application period

**Parameters:**

| Name      | Type   | Description                       |
| --------- | ------ | --------------------------------- |
| `_pubKey` | string | hex encoded tendermint public key |

**Returns:** _Promise‹TransactionReceiptWithDecodedLogs›_

---

### exitPeriod

▸ **exitPeriod**(): _Promise‹BigNumber›_

_Defined in [ValidatorRegistry.ts:89](https://github.com/ParadigmFoundation/kosu-monorepo/blob/bc352f90/packages/kosu-wrapper-enhancements/src/ValidatorRegistry.ts#L89)_

Reads the exit period

**Returns:** _Promise‹BigNumber›_

---

### finalizeExit

▸ **finalizeExit**(`_pubKey`: string): _Promise‹TransactionReceiptWithDecodedLogs›_

_Defined in [ValidatorRegistry.ts:306](https://github.com/ParadigmFoundation/kosu-monorepo/blob/bc352f90/packages/kosu-wrapper-enhancements/src/ValidatorRegistry.ts#L306)_

Finalizes the exit of a listing

**Parameters:**

| Name      | Type   | Description                       |
| --------- | ------ | --------------------------------- |
| `_pubKey` | string | hex encoded tendermint public key |

**Returns:** _Promise‹TransactionReceiptWithDecodedLogs›_

---

### getAllChallenges

▸ **getAllChallenges**(): _Promise‹Challenge[]›_

_Defined in [ValidatorRegistry.ts:200](https://github.com/ParadigmFoundation/kosu-monorepo/blob/bc352f90/packages/kosu-wrapper-enhancements/src/ValidatorRegistry.ts#L200)_

Reads all challenges

**Returns:** _Promise‹Challenge[]›_

---

### getAllListings

▸ **getAllListings**(): _Promise‹Listing[]›_

_Defined in [ValidatorRegistry.ts:163](https://github.com/ParadigmFoundation/kosu-monorepo/blob/bc352f90/packages/kosu-wrapper-enhancements/src/ValidatorRegistry.ts#L163)_

Reads the registered listings

**Returns:** _Promise‹Listing[]›_

---

### getChallenge

▸ **getChallenge**(`challengeId`: BigNumber): _Promise‹Challenge›_

_Defined in [ValidatorRegistry.ts:181](https://github.com/ParadigmFoundation/kosu-monorepo/blob/bc352f90/packages/kosu-wrapper-enhancements/src/ValidatorRegistry.ts#L181)_

Reads the challenge by challengeId

**Parameters:**

| Name          | Type      | Description                       |
| ------------- | --------- | --------------------------------- |
| `challengeId` | BigNumber | hex encoded tendermint public key |

**Returns:** _Promise‹Challenge›_

---

### getChallenges

▸ **getChallenges**(`challengeIds`: BigNumber[]): _Promise‹Challenge[]›_

_Defined in [ValidatorRegistry.ts:191](https://github.com/ParadigmFoundation/kosu-monorepo/blob/bc352f90/packages/kosu-wrapper-enhancements/src/ValidatorRegistry.ts#L191)_

Reads the challenges by challengeIds

**Parameters:**

| Name           | Type        | Description                       |
| -------------- | ----------- | --------------------------------- |
| `challengeIds` | BigNumber[] | hex encoded tendermint public key |

**Returns:** _Promise‹Challenge[]›_

---

### getContract

▸ **getContract**(): _Promise‹ValidatorRegistryContract›_

_Defined in [ValidatorRegistry.ts:42](https://github.com/ParadigmFoundation/kosu-monorepo/blob/bc352f90/packages/kosu-wrapper-enhancements/src/ValidatorRegistry.ts#L42)_

Asynchronously initializes the contract instance or returns it from cache

**Returns:** _Promise‹ValidatorRegistryContract›_

The contract

---

### getListing

▸ **getListing**(`_pubKey`: string): _Promise‹Listing›_

_Defined in [ValidatorRegistry.ts:147](https://github.com/ParadigmFoundation/kosu-monorepo/blob/bc352f90/packages/kosu-wrapper-enhancements/src/ValidatorRegistry.ts#L147)_

Reads the listing for public key

**Parameters:**

| Name      | Type   | Description                       |
| --------- | ------ | --------------------------------- |
| `_pubKey` | string | hex encoded tendermint public key |

**Returns:** _Promise‹Listing›_

---

### getListings

▸ **getListings**(`_pubKeys`: string[]): _Promise‹Listing[]›_

_Defined in [ValidatorRegistry.ts:155](https://github.com/ParadigmFoundation/kosu-monorepo/blob/bc352f90/packages/kosu-wrapper-enhancements/src/ValidatorRegistry.ts#L155)_

Reads the requested listings

**Parameters:**

| Name       | Type     |
| ---------- | -------- |
| `_pubKeys` | string[] |

**Returns:** _Promise‹Listing[]›_

---

### hexToBase64

▸ **hexToBase64**(`_pubKey`: string): _string_

_Defined in [ValidatorRegistry.ts:328](https://github.com/ParadigmFoundation/kosu-monorepo/blob/bc352f90/packages/kosu-wrapper-enhancements/src/ValidatorRegistry.ts#L328)_

Converts hex encoded public key back to tendermint base64

**Parameters:**

| Name      | Type   | Description                       |
| --------- | ------ | --------------------------------- |
| `_pubKey` | string | hex encoded tendermint public key |

**Returns:** _string_

Base64 tendermint public key

---

### initExit

▸ **initExit**(`_pubKey`: string): _Promise‹TransactionReceiptWithDecodedLogs›_

_Defined in [ValidatorRegistry.ts:296](https://github.com/ParadigmFoundation/kosu-monorepo/blob/bc352f90/packages/kosu-wrapper-enhancements/src/ValidatorRegistry.ts#L296)_

Initializes an exit of a listing from the registry

**Parameters:**

| Name      | Type   | Description                       |
| --------- | ------ | --------------------------------- |
| `_pubKey` | string | hex encoded tendermint public key |

**Returns:** _Promise‹TransactionReceiptWithDecodedLogs›_

---

### kosuToken

▸ **kosuToken**(): _Promise‹string›_

_Defined in [ValidatorRegistry.ts:129](https://github.com/ParadigmFoundation/kosu-monorepo/blob/bc352f90/packages/kosu-wrapper-enhancements/src/ValidatorRegistry.ts#L129)_

Reads the kosuToken address

**Returns:** _Promise‹string›_

---

### listingKeys

▸ **listingKeys**(): _Promise‹string[]›_

_Defined in [ValidatorRegistry.ts:137](https://github.com/ParadigmFoundation/kosu-monorepo/blob/bc352f90/packages/kosu-wrapper-enhancements/src/ValidatorRegistry.ts#L137)_

Reads the current listing keys

**Returns:** _Promise‹string[]›_

---

### maxRewardRate

▸ **maxRewardRate**(): _Promise‹BigNumber›_

_Defined in [ValidatorRegistry.ts:171](https://github.com/ParadigmFoundation/kosu-monorepo/blob/bc352f90/packages/kosu-wrapper-enhancements/src/ValidatorRegistry.ts#L171)_

Reads the max reward rate

**Returns:** _Promise‹BigNumber›_

---

### minimumBalance

▸ **minimumBalance**(): _Promise‹BigNumber›_

_Defined in [ValidatorRegistry.ts:105](https://github.com/ParadigmFoundation/kosu-monorepo/blob/bc352f90/packages/kosu-wrapper-enhancements/src/ValidatorRegistry.ts#L105)_

Reads the minimum balance

**Returns:** _Promise‹BigNumber›_

---

### registerListing

▸ **registerListing**(`_pubKey`: string, `_tokensToStake`: BigNumber, `_rewardRate`: BigNumber, `_details`: string): _Promise‹TransactionReceiptWithDecodedLogs›_

_Defined in [ValidatorRegistry.ts:213](https://github.com/ParadigmFoundation/kosu-monorepo/blob/bc352f90/packages/kosu-wrapper-enhancements/src/ValidatorRegistry.ts#L213)_

Register a new listing

**Parameters:**

| Name             | Type      | Description                                                            |
| ---------------- | --------- | ---------------------------------------------------------------------- |
| `_pubKey`        | string    | hex encoded tendermint public key                                      |
| `_tokensToStake` | BigNumber | uint number of tokens to stake ( must be greater than minimum balance) |
| `_rewardRate`    | BigNumber | int value of tokens to earn, burn or neither per reward period         |
| `_details`       | string    | String value (often a url) to support listing claim                    |

**Returns:** _Promise‹TransactionReceiptWithDecodedLogs›_

---

### resolveChallenge

▸ **resolveChallenge**(`_pubKey`: string): _Promise‹TransactionReceiptWithDecodedLogs›_

_Defined in [ValidatorRegistry.ts:276](https://github.com/ParadigmFoundation/kosu-monorepo/blob/bc352f90/packages/kosu-wrapper-enhancements/src/ValidatorRegistry.ts#L276)_

Resolves challenge of a listing

**Parameters:**

| Name      | Type   | Description                       |
| --------- | ------ | --------------------------------- |
| `_pubKey` | string | hex encoded tendermint public key |

**Returns:** _Promise‹TransactionReceiptWithDecodedLogs›_

---

### rewardPeriod

▸ **rewardPeriod**(): _Promise‹BigNumber›_

_Defined in [ValidatorRegistry.ts:97](https://github.com/ParadigmFoundation/kosu-monorepo/blob/bc352f90/packages/kosu-wrapper-enhancements/src/ValidatorRegistry.ts#L97)_

Reads the reward period

**Returns:** _Promise‹BigNumber›_

---

### stakeholderCut

▸ **stakeholderCut**(): _Promise‹BigNumber›_

_Defined in [ValidatorRegistry.ts:113](https://github.com/ParadigmFoundation/kosu-monorepo/blob/bc352f90/packages/kosu-wrapper-enhancements/src/ValidatorRegistry.ts#L113)_

Reads the stakeholder cut

**Returns:** _Promise‹BigNumber›_

---

### voting

▸ **voting**(): _Promise‹string›_

_Defined in [ValidatorRegistry.ts:121](https://github.com/ParadigmFoundation/kosu-monorepo/blob/bc352f90/packages/kosu-wrapper-enhancements/src/ValidatorRegistry.ts#L121)_

Reads the Voting contract address

**Returns:** _Promise‹string›_
