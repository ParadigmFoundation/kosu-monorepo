> **[contract-helpers](../README.md)**

[Globals](../globals.md) / [ValidatorRegistry](validatorregistry.md) /

# Class: ValidatorRegistry

Integration with ValidatorRegistry contract on an Ethereum blockchain.

## Hierarchy

-   **ValidatorRegistry**

## Index

### Constructors

-   [constructor](validatorregistry.md#constructor)

### Methods

-   [applicationPeriod](validatorregistry.md#applicationperiod)
-   [challengeListing](validatorregistry.md#challengelisting)
-   [challengePeriod](validatorregistry.md#challengeperiod)
-   [claimRewards](validatorregistry.md#claimrewards)
-   [claimWinnings](validatorregistry.md#claimwinnings)
-   [commitPeriod](validatorregistry.md#commitperiod)
-   [confirmListing](validatorregistry.md#confirmlisting)
-   [convertPubKey](validatorregistry.md#convertpubkey)
-   [exitPeriod](validatorregistry.md#exitperiod)
-   [finalizeExit](validatorregistry.md#finalizeexit)
-   [getAllChallenges](validatorregistry.md#getallchallenges)
-   [getAllListings](validatorregistry.md#getalllistings)
-   [getChallenge](validatorregistry.md#getchallenge)
-   [getChallenges](validatorregistry.md#getchallenges)
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

\+ **new ValidatorRegistry**(`options`: `KosuOptions`, `treasury`: [Treasury](treasury.md)): _[ValidatorRegistry](validatorregistry.md)_

_Defined in [ValidatorRegistry.ts:20](https://github.com/ParadigmFoundation/kosu-monorepo/blob/515d6d59/packages/kosu-contract-helpers/src/ValidatorRegistry.ts#L20)_

Create a new ValidatorRegistry instance.

**Parameters:**

| Name       | Type                    | Description                   |
| ---------- | ----------------------- | ----------------------------- |
| `options`  | `KosuOptions`           | instantiation options         |
| `treasury` | [Treasury](treasury.md) | treasury integration instance |

**Returns:** _[ValidatorRegistry](validatorregistry.md)_

## Methods

### applicationPeriod

▸ **applicationPeriod**(): _`Promise<BigNumber>`_

_Defined in [ValidatorRegistry.ts:66](https://github.com/ParadigmFoundation/kosu-monorepo/blob/515d6d59/packages/kosu-contract-helpers/src/ValidatorRegistry.ts#L66)_

Reads the application period

**Returns:** _`Promise<BigNumber>`_

---

### challengeListing

▸ **challengeListing**(`_pubKey`: string, `_details`: string): _`Promise<TransactionReceiptWithDecodedLogs>`_

_Defined in [ValidatorRegistry.ts:258](https://github.com/ParadigmFoundation/kosu-monorepo/blob/515d6d59/packages/kosu-contract-helpers/src/ValidatorRegistry.ts#L258)_

Starts a challenge of a listing

**Parameters:**

| Name       | Type   | Description                                         |
| ---------- | ------ | --------------------------------------------------- |
| `_pubKey`  | string | hex encoded tendermint public key                   |
| `_details` | string | String value (often a url) to support listing claim |

**Returns:** _`Promise<TransactionReceiptWithDecodedLogs>`_

---

### challengePeriod

▸ **challengePeriod**(): _`Promise<BigNumber>`_

_Defined in [ValidatorRegistry.ts:82](https://github.com/ParadigmFoundation/kosu-monorepo/blob/515d6d59/packages/kosu-contract-helpers/src/ValidatorRegistry.ts#L82)_

Reads the challenge period

**Returns:** _`Promise<BigNumber>`_

---

### claimRewards

▸ **claimRewards**(`_pubKey`: string): _`Promise<TransactionReceiptWithDecodedLogs>`_

_Defined in [ValidatorRegistry.ts:287](https://github.com/ParadigmFoundation/kosu-monorepo/blob/515d6d59/packages/kosu-contract-helpers/src/ValidatorRegistry.ts#L287)_

Claims the rewards of a generating/burning listing

**Parameters:**

| Name      | Type   | Description                       |
| --------- | ------ | --------------------------------- |
| `_pubKey` | string | hex encoded tendermint public key |

**Returns:** _`Promise<TransactionReceiptWithDecodedLogs>`_

---

### claimWinnings

▸ **claimWinnings**(`challengeId`: `BigNumber`): _`Promise<TransactionReceiptWithDecodedLogs>`_

_Defined in [ValidatorRegistry.ts:317](https://github.com/ParadigmFoundation/kosu-monorepo/blob/515d6d59/packages/kosu-contract-helpers/src/ValidatorRegistry.ts#L317)_

Claims winnings from complete challenge

**Parameters:**

| Name          | Type        | Description                                                |
| ------------- | ----------- | ---------------------------------------------------------- |
| `challengeId` | `BigNumber` | id of challenge coinbase has contributed a winning vote to |

**Returns:** _`Promise<TransactionReceiptWithDecodedLogs>`_

---

### commitPeriod

▸ **commitPeriod**(): _`Promise<BigNumber>`_

_Defined in [ValidatorRegistry.ts:74](https://github.com/ParadigmFoundation/kosu-monorepo/blob/515d6d59/packages/kosu-contract-helpers/src/ValidatorRegistry.ts#L74)_

Reads the commit period

**Returns:** _`Promise<BigNumber>`_

---

### confirmListing

▸ **confirmListing**(`_pubKey`: string): _`Promise<TransactionReceiptWithDecodedLogs>`_

_Defined in [ValidatorRegistry.ts:247](https://github.com/ParadigmFoundation/kosu-monorepo/blob/515d6d59/packages/kosu-contract-helpers/src/ValidatorRegistry.ts#L247)_

Confirms listing after application period

**Parameters:**

| Name      | Type   | Description                       |
| --------- | ------ | --------------------------------- |
| `_pubKey` | string | hex encoded tendermint public key |

**Returns:** _`Promise<TransactionReceiptWithDecodedLogs>`_

---

### convertPubKey

▸ **convertPubKey**(`_pubKey`: string): _string_

_Defined in [ValidatorRegistry.ts:328](https://github.com/ParadigmFoundation/kosu-monorepo/blob/515d6d59/packages/kosu-contract-helpers/src/ValidatorRegistry.ts#L328)_

Converts public key to hex if input is not currently in hex

**Parameters:**

| Name      | Type   | Description |
| --------- | ------ | ----------- |
| `_pubKey` | string | .           |

**Returns:** _string_

hex encoded tendermint public key

---

### exitPeriod

▸ **exitPeriod**(): _`Promise<BigNumber>`_

_Defined in [ValidatorRegistry.ts:90](https://github.com/ParadigmFoundation/kosu-monorepo/blob/515d6d59/packages/kosu-contract-helpers/src/ValidatorRegistry.ts#L90)_

Reads the exit period

**Returns:** _`Promise<BigNumber>`_

---

### finalizeExit

▸ **finalizeExit**(`_pubKey`: string): _`Promise<TransactionReceiptWithDecodedLogs>`_

_Defined in [ValidatorRegistry.ts:307](https://github.com/ParadigmFoundation/kosu-monorepo/blob/515d6d59/packages/kosu-contract-helpers/src/ValidatorRegistry.ts#L307)_

Finalizes the exit of a listing

**Parameters:**

| Name      | Type   | Description                       |
| --------- | ------ | --------------------------------- |
| `_pubKey` | string | hex encoded tendermint public key |

**Returns:** _`Promise<TransactionReceiptWithDecodedLogs>`_

---

### getAllChallenges

▸ **getAllChallenges**(): _`Promise<Challenge[]>`_

_Defined in [ValidatorRegistry.ts:201](https://github.com/ParadigmFoundation/kosu-monorepo/blob/515d6d59/packages/kosu-contract-helpers/src/ValidatorRegistry.ts#L201)_

Reads all challenges

**Returns:** _`Promise<Challenge[]>`_

---

### getAllListings

▸ **getAllListings**(): _`Promise<Listing[]>`_

_Defined in [ValidatorRegistry.ts:164](https://github.com/ParadigmFoundation/kosu-monorepo/blob/515d6d59/packages/kosu-contract-helpers/src/ValidatorRegistry.ts#L164)_

Reads the registered listings

**Returns:** _`Promise<Listing[]>`_

---

### getChallenge

▸ **getChallenge**(`challengeId`: `BigNumber`): _`Promise<Challenge>`_

_Defined in [ValidatorRegistry.ts:182](https://github.com/ParadigmFoundation/kosu-monorepo/blob/515d6d59/packages/kosu-contract-helpers/src/ValidatorRegistry.ts#L182)_

Reads the challenge by challengeId

**Parameters:**

| Name          | Type        | Description                       |
| ------------- | ----------- | --------------------------------- |
| `challengeId` | `BigNumber` | hex encoded tendermint public key |

**Returns:** _`Promise<Challenge>`_

---

### getChallenges

▸ **getChallenges**(`challengeIds`: `BigNumber`[]): _`Promise<Challenge[]>`_

_Defined in [ValidatorRegistry.ts:192](https://github.com/ParadigmFoundation/kosu-monorepo/blob/515d6d59/packages/kosu-contract-helpers/src/ValidatorRegistry.ts#L192)_

Reads the challenges by challengeIds

**Parameters:**

| Name           | Type          | Description                       |
| -------------- | ------------- | --------------------------------- |
| `challengeIds` | `BigNumber`[] | hex encoded tendermint public key |

**Returns:** _`Promise<Challenge[]>`_

---

### getListing

▸ **getListing**(`_pubKey`: string): _`Promise<Listing>`_

_Defined in [ValidatorRegistry.ts:148](https://github.com/ParadigmFoundation/kosu-monorepo/blob/515d6d59/packages/kosu-contract-helpers/src/ValidatorRegistry.ts#L148)_

Reads the listing for public key

**Parameters:**

| Name      | Type   | Description                       |
| --------- | ------ | --------------------------------- |
| `_pubKey` | string | hex encoded tendermint public key |

**Returns:** _`Promise<Listing>`_

---

### getListings

▸ **getListings**(`_pubKeys`: string[]): _`Promise<Listing[]>`_

_Defined in [ValidatorRegistry.ts:156](https://github.com/ParadigmFoundation/kosu-monorepo/blob/515d6d59/packages/kosu-contract-helpers/src/ValidatorRegistry.ts#L156)_

Reads the requested listings

**Parameters:**

| Name       | Type     |
| ---------- | -------- |
| `_pubKeys` | string[] |

**Returns:** _`Promise<Listing[]>`_

---

### hexToBase64

▸ **hexToBase64**(`_pubKey`: string): _string_

_Defined in [ValidatorRegistry.ts:352](https://github.com/ParadigmFoundation/kosu-monorepo/blob/515d6d59/packages/kosu-contract-helpers/src/ValidatorRegistry.ts#L352)_

Converts hex encoded public key back to tendermint base64

**Parameters:**

| Name      | Type   | Description                       |
| --------- | ------ | --------------------------------- |
| `_pubKey` | string | hex encoded tendermint public key |

**Returns:** _string_

Base64 tendermint public key

---

### initExit

▸ **initExit**(`_pubKey`: string): _`Promise<TransactionReceiptWithDecodedLogs>`_

_Defined in [ValidatorRegistry.ts:297](https://github.com/ParadigmFoundation/kosu-monorepo/blob/515d6d59/packages/kosu-contract-helpers/src/ValidatorRegistry.ts#L297)_

Initializes an exit of a listing from the registry

**Parameters:**

| Name      | Type   | Description                       |
| --------- | ------ | --------------------------------- |
| `_pubKey` | string | hex encoded tendermint public key |

**Returns:** _`Promise<TransactionReceiptWithDecodedLogs>`_

---

### kosuToken

▸ **kosuToken**(): _`Promise<string>`_

_Defined in [ValidatorRegistry.ts:130](https://github.com/ParadigmFoundation/kosu-monorepo/blob/515d6d59/packages/kosu-contract-helpers/src/ValidatorRegistry.ts#L130)_

Reads the kosuToken address

**Returns:** _`Promise<string>`_

---

### listingKeys

▸ **listingKeys**(): _`Promise<string[]>`_

_Defined in [ValidatorRegistry.ts:138](https://github.com/ParadigmFoundation/kosu-monorepo/blob/515d6d59/packages/kosu-contract-helpers/src/ValidatorRegistry.ts#L138)_

Reads the current listing keys

**Returns:** _`Promise<string[]>`_

---

### maxRewardRate

▸ **maxRewardRate**(): _`Promise<BigNumber>`_

_Defined in [ValidatorRegistry.ts:172](https://github.com/ParadigmFoundation/kosu-monorepo/blob/515d6d59/packages/kosu-contract-helpers/src/ValidatorRegistry.ts#L172)_

Reads the max reward rate

**Returns:** _`Promise<BigNumber>`_

---

### minimumBalance

▸ **minimumBalance**(): _`Promise<BigNumber>`_

_Defined in [ValidatorRegistry.ts:106](https://github.com/ParadigmFoundation/kosu-monorepo/blob/515d6d59/packages/kosu-contract-helpers/src/ValidatorRegistry.ts#L106)_

Reads the minimum balance

**Returns:** _`Promise<BigNumber>`_

---

### registerListing

▸ **registerListing**(`_pubKey`: string, `_tokensToStake`: `BigNumber`, `_rewardRate`: `BigNumber`, `_details`: string): _`Promise<TransactionReceiptWithDecodedLogs>`_

_Defined in [ValidatorRegistry.ts:214](https://github.com/ParadigmFoundation/kosu-monorepo/blob/515d6d59/packages/kosu-contract-helpers/src/ValidatorRegistry.ts#L214)_

Register a new listing

**Parameters:**

| Name             | Type        | Description                                                            |
| ---------------- | ----------- | ---------------------------------------------------------------------- |
| `_pubKey`        | string      | hex encoded tendermint public key                                      |
| `_tokensToStake` | `BigNumber` | uint number of tokens to stake ( must be greater than minimum balance) |
| `_rewardRate`    | `BigNumber` | int value of tokens to earn, burn or neither per reward period         |
| `_details`       | string      | String value (often a url) to support listing claim                    |

**Returns:** _`Promise<TransactionReceiptWithDecodedLogs>`_

---

### resolveChallenge

▸ **resolveChallenge**(`_pubKey`: string): _`Promise<TransactionReceiptWithDecodedLogs>`_

_Defined in [ValidatorRegistry.ts:277](https://github.com/ParadigmFoundation/kosu-monorepo/blob/515d6d59/packages/kosu-contract-helpers/src/ValidatorRegistry.ts#L277)_

Resolves challenge of a listing

**Parameters:**

| Name      | Type   | Description                       |
| --------- | ------ | --------------------------------- |
| `_pubKey` | string | hex encoded tendermint public key |

**Returns:** _`Promise<TransactionReceiptWithDecodedLogs>`_

---

### rewardPeriod

▸ **rewardPeriod**(): _`Promise<BigNumber>`_

_Defined in [ValidatorRegistry.ts:98](https://github.com/ParadigmFoundation/kosu-monorepo/blob/515d6d59/packages/kosu-contract-helpers/src/ValidatorRegistry.ts#L98)_

Reads the reward period

**Returns:** _`Promise<BigNumber>`_

---

### stakeholderCut

▸ **stakeholderCut**(): _`Promise<BigNumber>`_

_Defined in [ValidatorRegistry.ts:114](https://github.com/ParadigmFoundation/kosu-monorepo/blob/515d6d59/packages/kosu-contract-helpers/src/ValidatorRegistry.ts#L114)_

Reads the stakeholder cut

**Returns:** _`Promise<BigNumber>`_

---

### voting

▸ **voting**(): _`Promise<string>`_

_Defined in [ValidatorRegistry.ts:122](https://github.com/ParadigmFoundation/kosu-monorepo/blob/515d6d59/packages/kosu-contract-helpers/src/ValidatorRegistry.ts#L122)_

Reads the Voting contract address

**Returns:** _`Promise<string>`_
