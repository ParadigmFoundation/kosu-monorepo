> **[kosu.js](../README.md)**

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

\+ **new ValidatorRegistry**(`options`: [KosuOptions](../interfaces/kosuoptions.md), `treasury`: [Treasury](treasury.md)): _[ValidatorRegistry](validatorregistry.md)_

Defined in ValidatorRegistry.ts:18

Create a new ValidatorRegistry instance.

**Parameters:**

| Name       | Type                                        | Description                   |
| ---------- | ------------------------------------------- | ----------------------------- |
| `options`  | [KosuOptions](../interfaces/kosuoptions.md) | instantiation options         |
| `treasury` | [Treasury](treasury.md)                     | treasury integration instance |

**Returns:** _[ValidatorRegistry](validatorregistry.md)_

## Methods

### applicationPeriod

▸ **applicationPeriod**(): _`Promise<BigNumber>`_

Defined in ValidatorRegistry.ts:64

Reads the application period

**Returns:** _`Promise<BigNumber>`_

---

### challengeListing

▸ **challengeListing**(`_pubKey`: string, `_details`: string): _`Promise<TransactionReceiptWithDecodedLogs>`_

Defined in ValidatorRegistry.ts:256

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

Defined in ValidatorRegistry.ts:80

Reads the challenge period

**Returns:** _`Promise<BigNumber>`_

---

### claimRewards

▸ **claimRewards**(`_pubKey`: string): _`Promise<TransactionReceiptWithDecodedLogs>`_

Defined in ValidatorRegistry.ts:285

Claims the rewards of a generating/burning listing

**Parameters:**

| Name      | Type   | Description                       |
| --------- | ------ | --------------------------------- |
| `_pubKey` | string | hex encoded tendermint public key |

**Returns:** _`Promise<TransactionReceiptWithDecodedLogs>`_

---

### claimWinnings

▸ **claimWinnings**(`challengeId`: `BigNumber`): _`Promise<TransactionReceiptWithDecodedLogs>`_

Defined in ValidatorRegistry.ts:315

Claims winnings from complete challenge

**Parameters:**

| Name          | Type        | Description                                                |
| ------------- | ----------- | ---------------------------------------------------------- |
| `challengeId` | `BigNumber` | id of challenge coinbase has contributed a winning vote to |

**Returns:** _`Promise<TransactionReceiptWithDecodedLogs>`_

---

### commitPeriod

▸ **commitPeriod**(): _`Promise<BigNumber>`_

Defined in ValidatorRegistry.ts:72

Reads the commit period

**Returns:** _`Promise<BigNumber>`_

---

### confirmListing

▸ **confirmListing**(`_pubKey`: string): _`Promise<TransactionReceiptWithDecodedLogs>`_

Defined in ValidatorRegistry.ts:245

Confirms listing after application period

**Parameters:**

| Name      | Type   | Description                       |
| --------- | ------ | --------------------------------- |
| `_pubKey` | string | hex encoded tendermint public key |

**Returns:** _`Promise<TransactionReceiptWithDecodedLogs>`_

---

### convertPubKey

▸ **convertPubKey**(`_pubKey`: string): _string_

Defined in ValidatorRegistry.ts:326

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

Defined in ValidatorRegistry.ts:88

Reads the exit period

**Returns:** _`Promise<BigNumber>`_

---

### finalizeExit

▸ **finalizeExit**(`_pubKey`: string): _`Promise<TransactionReceiptWithDecodedLogs>`_

Defined in ValidatorRegistry.ts:305

Finalizes the exit of a listing

**Parameters:**

| Name      | Type   | Description                       |
| --------- | ------ | --------------------------------- |
| `_pubKey` | string | hex encoded tendermint public key |

**Returns:** _`Promise<TransactionReceiptWithDecodedLogs>`_

---

### getAllChallenges

▸ **getAllChallenges**(): _`Promise<Challenge[]>`_

Defined in ValidatorRegistry.ts:199

Reads all challenges

**Returns:** _`Promise<Challenge[]>`_

---

### getAllListings

▸ **getAllListings**(): _`Promise<Listing[]>`_

Defined in ValidatorRegistry.ts:162

Reads the registered listings

**Returns:** _`Promise<Listing[]>`_

---

### getChallenge

▸ **getChallenge**(`challengeId`: `BigNumber`): _`Promise<Challenge>`_

Defined in ValidatorRegistry.ts:180

Reads the challenge by challengeId

**Parameters:**

| Name          | Type        | Description                       |
| ------------- | ----------- | --------------------------------- |
| `challengeId` | `BigNumber` | hex encoded tendermint public key |

**Returns:** _`Promise<Challenge>`_

---

### getChallenges

▸ **getChallenges**(`challengeIds`: `BigNumber`[]): _`Promise<Challenge[]>`_

Defined in ValidatorRegistry.ts:190

Reads the challenges by challengeIds

**Parameters:**

| Name           | Type          | Description                       |
| -------------- | ------------- | --------------------------------- |
| `challengeIds` | `BigNumber`[] | hex encoded tendermint public key |

**Returns:** _`Promise<Challenge[]>`_

---

### getListing

▸ **getListing**(`_pubKey`: string): _`Promise<Listing>`_

Defined in ValidatorRegistry.ts:146

Reads the listing for public key

**Parameters:**

| Name      | Type   | Description                       |
| --------- | ------ | --------------------------------- |
| `_pubKey` | string | hex encoded tendermint public key |

**Returns:** _`Promise<Listing>`_

---

### getListings

▸ **getListings**(`_pubKeys`: string[]): _`Promise<Listing[]>`_

Defined in ValidatorRegistry.ts:154

Reads the requested listings

**Parameters:**

| Name       | Type     |
| ---------- | -------- |
| `_pubKeys` | string[] |

**Returns:** _`Promise<Listing[]>`_

---

### hexToBase64

▸ **hexToBase64**(`_pubKey`: string): _string_

Defined in ValidatorRegistry.ts:350

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

Defined in ValidatorRegistry.ts:295

Initializes an exit of a listing from the registry

**Parameters:**

| Name      | Type   | Description                       |
| --------- | ------ | --------------------------------- |
| `_pubKey` | string | hex encoded tendermint public key |

**Returns:** _`Promise<TransactionReceiptWithDecodedLogs>`_

---

### kosuToken

▸ **kosuToken**(): _`Promise<string>`_

Defined in ValidatorRegistry.ts:128

Reads the kosuToken address

**Returns:** _`Promise<string>`_

---

### listingKeys

▸ **listingKeys**(): _`Promise<string[]>`_

Defined in ValidatorRegistry.ts:136

Reads the current listing keys

**Returns:** _`Promise<string[]>`_

---

### maxRewardRate

▸ **maxRewardRate**(): _`Promise<BigNumber>`_

Defined in ValidatorRegistry.ts:170

Reads the max reward rate

**Returns:** _`Promise<BigNumber>`_

---

### minimumBalance

▸ **minimumBalance**(): _`Promise<BigNumber>`_

Defined in ValidatorRegistry.ts:104

Reads the minimum balance

**Returns:** _`Promise<BigNumber>`_

---

### registerListing

▸ **registerListing**(`_pubKey`: string, `_tokensToStake`: `BigNumber`, `_rewardRate`: `BigNumber`, `_details`: string): _`Promise<TransactionReceiptWithDecodedLogs>`_

Defined in ValidatorRegistry.ts:212

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

Defined in ValidatorRegistry.ts:275

Resolves challenge of a listing

**Parameters:**

| Name      | Type   | Description                       |
| --------- | ------ | --------------------------------- |
| `_pubKey` | string | hex encoded tendermint public key |

**Returns:** _`Promise<TransactionReceiptWithDecodedLogs>`_

---

### rewardPeriod

▸ **rewardPeriod**(): _`Promise<BigNumber>`_

Defined in ValidatorRegistry.ts:96

Reads the reward period

**Returns:** _`Promise<BigNumber>`_

---

### stakeholderCut

▸ **stakeholderCut**(): _`Promise<BigNumber>`_

Defined in ValidatorRegistry.ts:112

Reads the stakeholder cut

**Returns:** _`Promise<BigNumber>`_

---

### voting

▸ **voting**(): _`Promise<string>`_

Defined in ValidatorRegistry.ts:120

Reads the Voting contract address

**Returns:** _`Promise<string>`_
