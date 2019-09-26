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

_Defined in [ValidatorRegistry.ts:18](https://github.com/ParadigmFoundation/kosu-monorepo/blob/2f37cabf/packages/kosu.js/src/ValidatorRegistry.ts#L18)_

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

_Defined in [ValidatorRegistry.ts:64](https://github.com/ParadigmFoundation/kosu-monorepo/blob/2f37cabf/packages/kosu.js/src/ValidatorRegistry.ts#L64)_

Reads the application period

**Returns:** _`Promise<BigNumber>`_

---

### challengeListing

▸ **challengeListing**(`_pubKey`: string, `_details`: string): _`Promise<TransactionReceiptWithDecodedLogs>`_

_Defined in [ValidatorRegistry.ts:256](https://github.com/ParadigmFoundation/kosu-monorepo/blob/2f37cabf/packages/kosu.js/src/ValidatorRegistry.ts#L256)_

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

_Defined in [ValidatorRegistry.ts:80](https://github.com/ParadigmFoundation/kosu-monorepo/blob/2f37cabf/packages/kosu.js/src/ValidatorRegistry.ts#L80)_

Reads the challenge period

**Returns:** _`Promise<BigNumber>`_

---

### claimRewards

▸ **claimRewards**(`_pubKey`: string): _`Promise<TransactionReceiptWithDecodedLogs>`_

_Defined in [ValidatorRegistry.ts:285](https://github.com/ParadigmFoundation/kosu-monorepo/blob/2f37cabf/packages/kosu.js/src/ValidatorRegistry.ts#L285)_

Claims the rewards of a generating/burning listing

**Parameters:**

| Name      | Type   | Description                       |
| --------- | ------ | --------------------------------- |
| `_pubKey` | string | hex encoded tendermint public key |

**Returns:** _`Promise<TransactionReceiptWithDecodedLogs>`_

---

### claimWinnings

▸ **claimWinnings**(`challengeId`: `BigNumber`): _`Promise<TransactionReceiptWithDecodedLogs>`_

_Defined in [ValidatorRegistry.ts:315](https://github.com/ParadigmFoundation/kosu-monorepo/blob/2f37cabf/packages/kosu.js/src/ValidatorRegistry.ts#L315)_

Claims winnings from complete challenge

**Parameters:**

| Name          | Type        | Description                                                |
| ------------- | ----------- | ---------------------------------------------------------- |
| `challengeId` | `BigNumber` | id of challenge coinbase has contributed a winning vote to |

**Returns:** _`Promise<TransactionReceiptWithDecodedLogs>`_

---

### commitPeriod

▸ **commitPeriod**(): _`Promise<BigNumber>`_

_Defined in [ValidatorRegistry.ts:72](https://github.com/ParadigmFoundation/kosu-monorepo/blob/2f37cabf/packages/kosu.js/src/ValidatorRegistry.ts#L72)_

Reads the commit period

**Returns:** _`Promise<BigNumber>`_

---

### confirmListing

▸ **confirmListing**(`_pubKey`: string): _`Promise<TransactionReceiptWithDecodedLogs>`_

_Defined in [ValidatorRegistry.ts:245](https://github.com/ParadigmFoundation/kosu-monorepo/blob/2f37cabf/packages/kosu.js/src/ValidatorRegistry.ts#L245)_

Confirms listing after application period

**Parameters:**

| Name      | Type   | Description                       |
| --------- | ------ | --------------------------------- |
| `_pubKey` | string | hex encoded tendermint public key |

**Returns:** _`Promise<TransactionReceiptWithDecodedLogs>`_

---

### convertPubKey

▸ **convertPubKey**(`_pubKey`: string): _string_

_Defined in [ValidatorRegistry.ts:326](https://github.com/ParadigmFoundation/kosu-monorepo/blob/2f37cabf/packages/kosu.js/src/ValidatorRegistry.ts#L326)_

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

_Defined in [ValidatorRegistry.ts:88](https://github.com/ParadigmFoundation/kosu-monorepo/blob/2f37cabf/packages/kosu.js/src/ValidatorRegistry.ts#L88)_

Reads the exit period

**Returns:** _`Promise<BigNumber>`_

---

### finalizeExit

▸ **finalizeExit**(`_pubKey`: string): _`Promise<TransactionReceiptWithDecodedLogs>`_

_Defined in [ValidatorRegistry.ts:305](https://github.com/ParadigmFoundation/kosu-monorepo/blob/2f37cabf/packages/kosu.js/src/ValidatorRegistry.ts#L305)_

Finalizes the exit of a listing

**Parameters:**

| Name      | Type   | Description                       |
| --------- | ------ | --------------------------------- |
| `_pubKey` | string | hex encoded tendermint public key |

**Returns:** _`Promise<TransactionReceiptWithDecodedLogs>`_

---

### getAllChallenges

▸ **getAllChallenges**(): _`Promise<Challenge[]>`_

_Defined in [ValidatorRegistry.ts:199](https://github.com/ParadigmFoundation/kosu-monorepo/blob/2f37cabf/packages/kosu.js/src/ValidatorRegistry.ts#L199)_

Reads all challenges

**Returns:** _`Promise<Challenge[]>`_

---

### getAllListings

▸ **getAllListings**(): _`Promise<Listing[]>`_

_Defined in [ValidatorRegistry.ts:162](https://github.com/ParadigmFoundation/kosu-monorepo/blob/2f37cabf/packages/kosu.js/src/ValidatorRegistry.ts#L162)_

Reads the registered listings

**Returns:** _`Promise<Listing[]>`_

---

### getChallenge

▸ **getChallenge**(`challengeId`: `BigNumber`): _`Promise<Challenge>`_

_Defined in [ValidatorRegistry.ts:180](https://github.com/ParadigmFoundation/kosu-monorepo/blob/2f37cabf/packages/kosu.js/src/ValidatorRegistry.ts#L180)_

Reads the challenge by challengeId

**Parameters:**

| Name          | Type        | Description                       |
| ------------- | ----------- | --------------------------------- |
| `challengeId` | `BigNumber` | hex encoded tendermint public key |

**Returns:** _`Promise<Challenge>`_

---

### getChallenges

▸ **getChallenges**(`challengeIds`: `BigNumber`[]): _`Promise<Challenge[]>`_

_Defined in [ValidatorRegistry.ts:190](https://github.com/ParadigmFoundation/kosu-monorepo/blob/2f37cabf/packages/kosu.js/src/ValidatorRegistry.ts#L190)_

Reads the challenges by challengeIds

**Parameters:**

| Name           | Type          | Description                       |
| -------------- | ------------- | --------------------------------- |
| `challengeIds` | `BigNumber`[] | hex encoded tendermint public key |

**Returns:** _`Promise<Challenge[]>`_

---

### getListing

▸ **getListing**(`_pubKey`: string): _`Promise<Listing>`_

_Defined in [ValidatorRegistry.ts:146](https://github.com/ParadigmFoundation/kosu-monorepo/blob/2f37cabf/packages/kosu.js/src/ValidatorRegistry.ts#L146)_

Reads the listing for public key

**Parameters:**

| Name      | Type   | Description                       |
| --------- | ------ | --------------------------------- |
| `_pubKey` | string | hex encoded tendermint public key |

**Returns:** _`Promise<Listing>`_

---

### getListings

▸ **getListings**(`_pubKeys`: string[]): _`Promise<Listing[]>`_

_Defined in [ValidatorRegistry.ts:154](https://github.com/ParadigmFoundation/kosu-monorepo/blob/2f37cabf/packages/kosu.js/src/ValidatorRegistry.ts#L154)_

Reads the requested listings

**Parameters:**

| Name       | Type     |
| ---------- | -------- |
| `_pubKeys` | string[] |

**Returns:** _`Promise<Listing[]>`_

---

### hexToBase64

▸ **hexToBase64**(`_pubKey`: string): _string_

_Defined in [ValidatorRegistry.ts:350](https://github.com/ParadigmFoundation/kosu-monorepo/blob/2f37cabf/packages/kosu.js/src/ValidatorRegistry.ts#L350)_

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

_Defined in [ValidatorRegistry.ts:295](https://github.com/ParadigmFoundation/kosu-monorepo/blob/2f37cabf/packages/kosu.js/src/ValidatorRegistry.ts#L295)_

Initializes an exit of a listing from the registry

**Parameters:**

| Name      | Type   | Description                       |
| --------- | ------ | --------------------------------- |
| `_pubKey` | string | hex encoded tendermint public key |

**Returns:** _`Promise<TransactionReceiptWithDecodedLogs>`_

---

### kosuToken

▸ **kosuToken**(): _`Promise<string>`_

_Defined in [ValidatorRegistry.ts:128](https://github.com/ParadigmFoundation/kosu-monorepo/blob/2f37cabf/packages/kosu.js/src/ValidatorRegistry.ts#L128)_

Reads the kosuToken address

**Returns:** _`Promise<string>`_

---

### listingKeys

▸ **listingKeys**(): _`Promise<string[]>`_

_Defined in [ValidatorRegistry.ts:136](https://github.com/ParadigmFoundation/kosu-monorepo/blob/2f37cabf/packages/kosu.js/src/ValidatorRegistry.ts#L136)_

Reads the current listing keys

**Returns:** _`Promise<string[]>`_

---

### maxRewardRate

▸ **maxRewardRate**(): _`Promise<BigNumber>`_

_Defined in [ValidatorRegistry.ts:170](https://github.com/ParadigmFoundation/kosu-monorepo/blob/2f37cabf/packages/kosu.js/src/ValidatorRegistry.ts#L170)_

Reads the max reward rate

**Returns:** _`Promise<BigNumber>`_

---

### minimumBalance

▸ **minimumBalance**(): _`Promise<BigNumber>`_

_Defined in [ValidatorRegistry.ts:104](https://github.com/ParadigmFoundation/kosu-monorepo/blob/2f37cabf/packages/kosu.js/src/ValidatorRegistry.ts#L104)_

Reads the minimum balance

**Returns:** _`Promise<BigNumber>`_

---

### registerListing

▸ **registerListing**(`_pubKey`: string, `_tokensToStake`: `BigNumber`, `_rewardRate`: `BigNumber`, `_details`: string): _`Promise<TransactionReceiptWithDecodedLogs>`_

_Defined in [ValidatorRegistry.ts:212](https://github.com/ParadigmFoundation/kosu-monorepo/blob/2f37cabf/packages/kosu.js/src/ValidatorRegistry.ts#L212)_

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

_Defined in [ValidatorRegistry.ts:275](https://github.com/ParadigmFoundation/kosu-monorepo/blob/2f37cabf/packages/kosu.js/src/ValidatorRegistry.ts#L275)_

Resolves challenge of a listing

**Parameters:**

| Name      | Type   | Description                       |
| --------- | ------ | --------------------------------- |
| `_pubKey` | string | hex encoded tendermint public key |

**Returns:** _`Promise<TransactionReceiptWithDecodedLogs>`_

---

### rewardPeriod

▸ **rewardPeriod**(): _`Promise<BigNumber>`_

_Defined in [ValidatorRegistry.ts:96](https://github.com/ParadigmFoundation/kosu-monorepo/blob/2f37cabf/packages/kosu.js/src/ValidatorRegistry.ts#L96)_

Reads the reward period

**Returns:** _`Promise<BigNumber>`_

---

### stakeholderCut

▸ **stakeholderCut**(): _`Promise<BigNumber>`_

_Defined in [ValidatorRegistry.ts:112](https://github.com/ParadigmFoundation/kosu-monorepo/blob/2f37cabf/packages/kosu.js/src/ValidatorRegistry.ts#L112)_

Reads the stakeholder cut

**Returns:** _`Promise<BigNumber>`_

---

### voting

▸ **voting**(): _`Promise<string>`_

_Defined in [ValidatorRegistry.ts:120](https://github.com/ParadigmFoundation/kosu-monorepo/blob/2f37cabf/packages/kosu.js/src/ValidatorRegistry.ts#L120)_

Reads the Voting contract address

**Returns:** _`Promise<string>`_
