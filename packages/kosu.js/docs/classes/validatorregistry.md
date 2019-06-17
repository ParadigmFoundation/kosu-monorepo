> ## [kosu.js](../README.md)

[Globals](../globals.md) / [ValidatorRegistry](validatorregistry.md) /

# Class: ValidatorRegistry

Integration with ValidatorRegistry contract on an Ethereum blockchain.

## Hierarchy

-   **ValidatorRegistry**

### Index

#### Constructors

-   [constructor](validatorregistry.md#constructor)

#### Properties

-   [address](validatorregistry.md#private-address)
-   [coinbase](validatorregistry.md#private-coinbase)
-   [contract](validatorregistry.md#private-contract)
-   [treasury](validatorregistry.md#private-treasury)
-   [web3](validatorregistry.md#private-web3)
-   [web3Wrapper](validatorregistry.md#private-web3wrapper)

#### Methods

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
-   [getContract](validatorregistry.md#private-getcontract)
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

_Defined in [src/ValidatorRegistry.ts:18](url)_

Create a new ValidatorRegistry instance.

**Parameters:**

| Name       | Type                    | Description                   |
| ---------- | ----------------------- | ----------------------------- |
| `options`  | `KosuOptions`           | instantiation options         |
| `treasury` | [Treasury](treasury.md) | treasury integration instance |

**Returns:** _[ValidatorRegistry](validatorregistry.md)_

---

## Properties

### `Private` address

● **address**: _string_

_Defined in [src/ValidatorRegistry.ts:18](url)_

---

### `Private` coinbase

● **coinbase**: _string_

_Defined in [src/ValidatorRegistry.ts:16](url)_

---

### `Private` contract

● **contract**: _[ValidatorRegistryContract](validatorregistrycontract.md)_

_Defined in [src/ValidatorRegistry.ts:15](url)_

---

### `Private` treasury

● **treasury**: _[Treasury](treasury.md)_

_Defined in [src/ValidatorRegistry.ts:14](url)_

---

### `Private` web3

● **web3**: _`Web3`_

_Defined in [src/ValidatorRegistry.ts:13](url)_

---

### `Private` web3Wrapper

● **web3Wrapper**: _`Web3Wrapper`_

_Defined in [src/ValidatorRegistry.ts:17](url)_

---

## Methods

### applicationPeriod

▸ **applicationPeriod**(): _`Promise<BigNumber>`_

_Defined in [src/ValidatorRegistry.ts:63](url)_

Reads the application period

**Returns:** _`Promise<BigNumber>`_

---

### challengeListing

▸ **challengeListing**(`_pubKey`: string, `_details`: string): _`Promise<TransactionReceiptWithDecodedLogs>`_

_Defined in [src/ValidatorRegistry.ts:250](url)_

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

_Defined in [src/ValidatorRegistry.ts:79](url)_

Reads the challenge period

**Returns:** _`Promise<BigNumber>`_

---

### claimRewards

▸ **claimRewards**(`_pubKey`: string): _`Promise<TransactionReceiptWithDecodedLogs>`_

_Defined in [src/ValidatorRegistry.ts:279](url)_

Claims the rewards of a generating/burning listing

**Parameters:**

| Name      | Type   | Description                       |
| --------- | ------ | --------------------------------- |
| `_pubKey` | string | hex encoded tendermint public key |

**Returns:** _`Promise<TransactionReceiptWithDecodedLogs>`_

---

### claimWinnings

▸ **claimWinnings**(`challengeId`: `BigNumber`): _`Promise<TransactionReceiptWithDecodedLogs>`_

_Defined in [src/ValidatorRegistry.ts:309](url)_

Claims winnings from complete challenge

**Parameters:**

| Name          | Type        | Description                                                |
| ------------- | ----------- | ---------------------------------------------------------- |
| `challengeId` | `BigNumber` | id of challenge coinbase has contributed a winning vote to |

**Returns:** _`Promise<TransactionReceiptWithDecodedLogs>`_

---

### commitPeriod

▸ **commitPeriod**(): _`Promise<BigNumber>`_

_Defined in [src/ValidatorRegistry.ts:71](url)_

Reads the commit period

**Returns:** _`Promise<BigNumber>`_

---

### confirmListing

▸ **confirmListing**(`_pubKey`: string): _`Promise<TransactionReceiptWithDecodedLogs>`_

_Defined in [src/ValidatorRegistry.ts:239](url)_

Confirms listing after application period

**Parameters:**

| Name      | Type   | Description                       |
| --------- | ------ | --------------------------------- |
| `_pubKey` | string | hex encoded tendermint public key |

**Returns:** _`Promise<TransactionReceiptWithDecodedLogs>`_

---

### convertPubKey

▸ **convertPubKey**(`_pubKey`: string): _string_

_Defined in [src/ValidatorRegistry.ts:320](url)_

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

_Defined in [src/ValidatorRegistry.ts:87](url)_

Reads the exit period

**Returns:** _`Promise<BigNumber>`_

---

### finalizeExit

▸ **finalizeExit**(`_pubKey`: string): _`Promise<TransactionReceiptWithDecodedLogs>`_

_Defined in [src/ValidatorRegistry.ts:299](url)_

Finalizes the exit of a listing

**Parameters:**

| Name      | Type   | Description                       |
| --------- | ------ | --------------------------------- |
| `_pubKey` | string | hex encoded tendermint public key |

**Returns:** _`Promise<TransactionReceiptWithDecodedLogs>`_

---

### getAllChallenges

▸ **getAllChallenges**(): _`Promise<Challenge[]>`_

_Defined in [src/ValidatorRegistry.ts:198](url)_

Reads all challenges

**Returns:** _`Promise<Challenge[]>`_

---

### getAllListings

▸ **getAllListings**(): _`Promise<Listing[]>`_

_Defined in [src/ValidatorRegistry.ts:161](url)_

Reads the registered listings

**Returns:** _`Promise<Listing[]>`_

---

### getChallenge

▸ **getChallenge**(`challengeId`: `BigNumber`): _`Promise<Challenge>`_

_Defined in [src/ValidatorRegistry.ts:179](url)_

Reads the challenge by challengeId

**Parameters:**

| Name          | Type        | Description                       |
| ------------- | ----------- | --------------------------------- |
| `challengeId` | `BigNumber` | hex encoded tendermint public key |

**Returns:** _`Promise<Challenge>`_

---

### getChallenges

▸ **getChallenges**(`challengeIds`: `BigNumber`[]): _`Promise<Challenge[]>`_

_Defined in [src/ValidatorRegistry.ts:189](url)_

Reads the challenges by challengeIds

**Parameters:**

| Name           | Type          | Description                       |
| -------------- | ------------- | --------------------------------- |
| `challengeIds` | `BigNumber`[] | hex encoded tendermint public key |

**Returns:** _`Promise<Challenge[]>`_

---

### `Private` getContract

▸ **getContract**(): _`Promise<ValidatorRegistryContract>`_

_Defined in [src/ValidatorRegistry.ts:38](url)_

Asynchronously initializes the contract instance or returns it from cache

**Returns:** _`Promise<ValidatorRegistryContract>`_

The contract

---

### getListing

▸ **getListing**(`_pubKey`: string): _`Promise<Listing>`_

_Defined in [src/ValidatorRegistry.ts:145](url)_

Reads the listing for public key

**Parameters:**

| Name      | Type   | Description                       |
| --------- | ------ | --------------------------------- |
| `_pubKey` | string | hex encoded tendermint public key |

**Returns:** _`Promise<Listing>`_

---

### getListings

▸ **getListings**(`_pubKeys`: string[]): _`Promise<Listing[]>`_

_Defined in [src/ValidatorRegistry.ts:153](url)_

Reads the requested listings

**Parameters:**

| Name       | Type     |
| ---------- | -------- |
| `_pubKeys` | string[] |

**Returns:** _`Promise<Listing[]>`_

---

### hexToBase64

▸ **hexToBase64**(`_pubKey`: string): _string_

_Defined in [src/ValidatorRegistry.ts:344](url)_

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

_Defined in [src/ValidatorRegistry.ts:289](url)_

Initializes an exit of a listing from the registry

**Parameters:**

| Name      | Type   | Description                       |
| --------- | ------ | --------------------------------- |
| `_pubKey` | string | hex encoded tendermint public key |

**Returns:** _`Promise<TransactionReceiptWithDecodedLogs>`_

---

### kosuToken

▸ **kosuToken**(): _`Promise<string>`_

_Defined in [src/ValidatorRegistry.ts:127](url)_

Reads the kosuToken address

**Returns:** _`Promise<string>`_

---

### listingKeys

▸ **listingKeys**(): _`Promise<string[]>`_

_Defined in [src/ValidatorRegistry.ts:135](url)_

Reads the current listing keys

**Returns:** _`Promise<string[]>`_

---

### maxRewardRate

▸ **maxRewardRate**(): _`Promise<BigNumber>`_

_Defined in [src/ValidatorRegistry.ts:169](url)_

Reads the max reward rate

**Returns:** _`Promise<BigNumber>`_

---

### minimumBalance

▸ **minimumBalance**(): _`Promise<BigNumber>`_

_Defined in [src/ValidatorRegistry.ts:103](url)_

Reads the minimum balance

**Returns:** _`Promise<BigNumber>`_

---

### registerListing

▸ **registerListing**(`_pubKey`: string, `_tokensToStake`: `BigNumber`, `_rewardRate`: `BigNumber`, `_details`: string): _`Promise<TransactionReceiptWithDecodedLogs>`_

_Defined in [src/ValidatorRegistry.ts:211](url)_

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

_Defined in [src/ValidatorRegistry.ts:269](url)_

Resolves challenge of a listing

**Parameters:**

| Name      | Type   | Description                       |
| --------- | ------ | --------------------------------- |
| `_pubKey` | string | hex encoded tendermint public key |

**Returns:** _`Promise<TransactionReceiptWithDecodedLogs>`_

---

### rewardPeriod

▸ **rewardPeriod**(): _`Promise<BigNumber>`_

_Defined in [src/ValidatorRegistry.ts:95](url)_

Reads the reward period

**Returns:** _`Promise<BigNumber>`_

---

### stakeholderCut

▸ **stakeholderCut**(): _`Promise<BigNumber>`_

_Defined in [src/ValidatorRegistry.ts:111](url)_

Reads the stakeholder cut

**Returns:** _`Promise<BigNumber>`_

---

### voting

▸ **voting**(): _`Promise<string>`_

_Defined in [src/ValidatorRegistry.ts:119](url)_

Reads the Voting contract address

**Returns:** _`Promise<string>`_

---
