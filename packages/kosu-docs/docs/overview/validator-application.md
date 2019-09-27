# Validator application guide

This guide details the steps necessary to "apply" to become a Kosu validator, by staking and submitting an application to the Kosu [`ValidatorRegistry`](https://github.com/ParadigmFoundation/kosu-monorepo/blob/master/packages/kosu-system-contracts/contracts/validator/ValidatorRegistry.sol), a contract deployed as part of the [Kosu system contracts.](https://github.com/ParadigmFoundation/kosu-monorepo/blob/master/packages/kosu-system-contracts/) The contract implements a token-curated registry, where [KOSU holders](./token-mechanics.md) may challenge applications and current validators, and are rewarded for curating the validator set.

Prior to proceeding with this guide, it is important to be familiar with the [mechanics of the validator registry,](./validator-curation.md) as well as the overall [economics of Kosu.](./token-mechanics.md)

Familiarity with `@kosu/kosu.js` is helpful as well (see [the docs here](https://docs.kosu.io/kosu.js)).

**Note:** A web-interface is available at [`portal.kosu.io`](https://portal.kosu.io) that provides a low-level interface for the contract system, and can be used to submit validator listing applications. However, it is recommend to do it from a local or remote machine within a private network, rather than from the web UI.

## Contents

-   [Prerequisites](#prerequisites)
-   [Setup](#setup)
    -   [Create workspace](#create-workspace)
    -   [Install dependencies](#install-dependencies)
-   [Setup Kosu.js](#setup-kosujs)
    -   [Mnemonic](#mnemonic)
    -   [Private key](#private-key-discouraged)
    -   [Unlocked node](#unlocked-node)
-   [Acquire KOSU](#acquire-kosu)
-   [Set treasury allowance](#set-treasury-allowance)
-   [Deposit tokens](#deposit-tokens)
-   [Submit listing application](#submit-listing-application)

## Prerequisites

-   Full node installed and synced with your desired Kosu network (see [here](https://docs.kosu.io/go-kosu/#usage)).
-   Know/store your node's Tendermint public key (`kosud show_node_info`).
-   Familiarity with the Ethereum ecosystem: transactions, gas, contracts, etc.
-   Comfortable using TypeScript/JavaScript.
-   Ethereum client (or cluster) available for the necessary Ethereum network.
-   An Ethereum wallet with Ether (on the necessary network). Can be:
    -   An account managed by a private, unlocked node.
    -   [A 12-word seed phrase](https://www.npmjs.com/package/@truffle/hdwallet-provider) and an account derivation path and index.
    -   Metamask _can_ be used in the browser, but is not recommended.
    -   A private key is also not recommended, [but can be used.](https://www.npmjs.com/package/truffle-privatekey-provider)
-   A JavaScript development environment. Can be:
    -   Node.js (preferred method, with v10+).
    -   Web browser/page with `@kosu/kosu.js` and your desired provider.

## Setup

This guide will cover setting up a Node.js environment to submit a validator application.

Setup may differ depending on your needs, but the methods necessary to submit an application will remain the same.

This guide will describe the steps necessary to submit an application from a Node.js REPL. You can create a one-off script as well if that is preferred.

### Create workspace

First, create a new folder to store the necessary packages.

```bash
mkdir kosu-validator-app && cd kosu-validator-app
```

Next, initialize a Node.js project (`yarn` shown, `npm` works just as well).

```bash
yarn init
```

Follow the prompts. None of the fields matter, so accept the defaults or input whatever you like.

### Install dependencies

After you have a working directory with a `package.json` file, you can install the packages necessary to submit the application.

```bash
yarn add @kosu/kosu.js web3 bignumber.js
```

If you are using an unlocked Ethereum node to store your wallet and sign transactions, those are the only packages you will need.

#### Other providers

For usage with a 12-word mnemonic seed phrase, add the following.

```bash
yarn add @truffle/hdwallet-provider
```

For usage with an Ethereum private key, the below package can be used.

```bash
yarn add truffle-privatekey-provider
```

## Setup Kosu.js

View the `@kosu/kosu.js` documentation [here.](https://docs.kosu.io/kosu.js/)

In order to submit the necessary transactions (bonding to acquire tokens, setting treasury allowance, and staking), you must configure `kosu.js` with a signing provider. Several options are demonstrated below.

The necessary lines from the blow code snippet can be run in a Node.js REPL (or converted to a script), depending on your provider configuration.

### Unlocked node

This setup will use an unlocked node's coinbase account (index 0) to sign transactions and hold KOSU.

```javascript
const { Kosu } = require("@kosu/kosu.js");
const Web3 = require("web3");

// Path to your unlocked Ethereum client's JSONRPC endpoint.
const ETHEREUM_JSONRPC_URL = "http://localhost:8545";

const web3 = new Web3(ETHEREUM_JSONRPC_URL);
const kosu = new Kosu({ provider: web3.currentProvider });
```

### Mnemonic

This setup allows you to use a 12-word seed phrase and account index to unlock a wallet.

```javascript
const { Kosu } = require("@kosu/kosu.js");
const MnemonicProvider = require("@truffle/hdwallet-provider");

// Your 12-word seed phrase (the below one is useless).
const MNEMONIC = "stone across story uncover female worry base wise spirit cabin swing oxygen";

// Set to the desired account index (based on derivation path).
const ACCOUNT_INDEX = 0;

// Ethereum JSONRPC provider (does not need to support signing).
const ETHEREUM_JSONRPC_URL = "https://mainnet.infura.io/";

const provider = new MnemonicProvider(MNEMONIC, ETHEREUM_JSONRPC_URL, ACCOUNT_INDEX);
const kosu = new Kosu({ provider });
```

### Private key (discouraged)

It is ill-advised to use a plaintext private key, but necessary in some scenarios. Avoid on main-networks if possible.

```javascript
const { Kosu } = require("@kosu/kosu.js");
const PrivateKeyProvider = require("truffle-privatekey-provider");

const PRIVATE_KEY = "1e6c6a107cc5f60abb5969046389fd93fdb3d71efae901f17809622579537457";
const ETHEREUM_JSONRPC_URL = "https://mainnet.infura.io/";

const provider = new PrivateKeyProvider(PRIVATE_KEY, ETHEREUM_JSONRPC_URL);
const kosu = new Kosu({ provider });
```

## Acquire KOSU

View the `kosu.kosuToken` docs [here.](https://docs.kosu.io/kosu.js/classes/kosutoken.html)

KOSU is the native token of the Kosu system. It implements the ERC-20 interface, and includes a bonding curve within the token contract.

This means the best way to buy KOSU is simply to send Ether to the contract.

The snippet below assumes you have configured `kosu.js` according to one of the setups above (or with some other signing provider).

```javascript
const BigNumber = require("bignumber.js");
const Web3 = require("web3");

// Set this to the amount of Ether you intend to bond.
const ethAmount = 1;
const ethAmountWei = new BigNumber(Web3.utils.toWei(ethAmount.toString()));

// Estimate the number of KOSU you will get for the above amount.
// Adjust the ethAmount until you will get enough KOSU for bonding that amount.
kosu.kosuToken.estimateEtherToToken(ethAmountWei).then(kosuAmountWei => {
    const kosuAmount = Web3.utils.fromWei(kosuAmountWei.toString());
    console.log(`Bonding ${ethAmount} will result in ~${kosuAmount} KOSU.`);
});

// Once you've decided how much Ether to bond, submit the transaction.
kosu.kosuToken.pay(ethAmountWei).then(receipt => console.log(`Transaction ID: ${receipt.transactionHash}`));

// Alternatively, set a minimum payout for safety.
const minPayout = new BigNumber(Web3.utils.toWei("100"));
kosu.kosuToken
    .bondTokens(ethAmountWei, minPayout)
    .then(receipt => console.log(`Transaction ID: ${receipt.transactionHash}`));
```

After the bond transaction is mined, you can check your balance as follows.

```javascript
const myAddress = "0x...";

kosu.kosuToken.balanceOf(myAddress).then(balanceWei => {
    const balance = Web3.utils.fromWei(balanceWei.toString());
    console.log(`Current KOSU balance: ${balance}`);
});
```

## Set treasury allowance

View the `kosu.treasury` docs [here.](https://docs.kosu.io/kosu.js/classes/treasury.html)

To interact with the Kosu contract system, including the ValidatorRegistry contract (where listing applications are submitted), you must set an ERC-20 approval for the Kosu treasury contract so it may move tokens on your behalf.

The snippet below will demonstrate setting the maximum allowance, but any amount may be used.

```javascript
// Maximum uint256.
const MAX_ALLOWANCE = new BigNumber(2).pow(256).minus(1);

kosu.treasury.approveTreasury(MAX_ALLOWANCE).then(receipt => console.log(`Transaction ID: ${receipt.transactionHash}`));
```

## Deposit tokens

**Note:** With an allowance for the treasury set, this step is not strictly necessary, as Kosu.js will deposit tokens on your behalf when you submit your listing application in the next step.

Prior to submitting the listing application, you must deposit _at least_ the number of tokens you will stake with your application into the treasury.

```javascript
// Set your deposit amount (in "ether" units, not "wei").
const depositAmount = 500;
const depositAmountWei = new BigNumber(Web3.utils.toWei(depositAmount.toString()));

kosu.treasury.deposit(depositAmountWei).then(receipt => console.log(`Transaction ID: ${receipt.transactionHash}`));
```

## Submit listing application

View the `kosu.validatorRegistry` docs [here.](https://docs.kosu.io/kosu.js/classes/validatorregistry.html)

**Warning:** If applying to a main-network (where the Kosu contract system is on the Ethereum mainnet), completing this step puts your staked tokens at risk of being confiscated if your listing is successfully challenged. It is crucial to [understand this curation process.](./validator-curation.md)

Follow this step to submit a listing proposal to the `ValidatorRegistry` contract, indicating your intent to join the Kosu network as a validator.

### Public key conversion

Tendermint public keys are used to identify listing applicants and validators within the registry system.

The public key is 32-bytes, and represented in Tendermint data files as a base64-encoded string, but also sometimes represented as a hex-encoded string (as in the output of `kosud show_node_info`).

[This method (`convertPubKey`)](https://docs.kosu.io/kosu.js/classes/validatorregistry.html#convertpubkey) is exposed by the `ValidatorRegistry` class in Kosu.js, and should be used to ensure your key is in the correct format before submitting the listing application transaction.

### Code sample

The sample below demonstrates how to submit a listing application, and annotates the required fields.

```javascript
// The amount to stake with your listing, must be above the minimum (500).
const STAKE_AMOUNT = 500;

// Hex-encoded tendermint public key (prefixed or un-prefixed).
// See note above about public key conversion.
const TM_PUBLIC_KEY = "0x230F8D6BEAE46557469C9AFDBD7DD54CDD03F0DF1432CD8EF6CF78981A998DFA";

// The reward rate you request for your services validating.
// This amount may be positive or negative (must collateralize and burn).
// It is denominated in units of ether per reward period, paid out in KOSU.
// This value is initially restricted to a maximum, but can increase over time.
const REWARD_RATE = 0.01;

// Arbitrary data to support your listing (help voters see why they should accept you).
// A convention is to use "key1=value1,key2=value2" syntax to encode many fields.
// The recommended fields to include are:
// - moniker: the name of your node
// - host: the host at which it's public-facing sentry cluster may be reached
// - website: a website with more information about your validator
const DETAILS = `\
moniker=your-node-name,\
host=your-node-host.your-website.com,\
website=https://your-website.com/my-validator-info,\
details=Put any data here you want, or nothing!`;

// Convert stake amount and reward rate values to base units.
const stakeAmountWei = new BigNumber(Web3.utils.toWei(STAKE_AMOUNT.toString()));
const rewardRateWei = new BigNumber(Web3.utils.toWei(REWARD_RATE.toString()));

// Before running the method below, confirm all values are correct.
kosu.validatorRegistry
    .registerListing(TM_PUBLIC_KEY, stakeAmountWei, rewardRateWei, DETAILS)
    .then(receipt => {
        const { blockNumber, transactionHash } = receipt;
        console.log(`Listing registered at block ${blockNumber}`);
        console.log(`Transaction ID: ${transactionHash}`);
    })
    .catch(error => {
        console.error(`Failed to register listing: ${error.message}`);
    });
```

## Next steps

Depending on the Kosu contract system deployment, you listing will likely be "pending" for up to 10 days.

You can check the status of your proposal at `govern.paradigm.market` and use the snippet below to fetch the block at which your listing can be confirmed (if unchallenged).

```javascript
// Add the below value to the block height your application was mined in.
kosu.validatorRegsitry.applicationPeriod().then(period => {
    console.log(`The application period is ${period} blocks.`);
});

// If your registerListing TX was mined in block X...
// You can call the below method any time after block (X + applicationPeriod).
// This is only true if your listing is not challenged during that time.
kosu.validatorRegistry.confirmListing(TM_PUBLIC_KEY).then(receipt => {
    console.log(`Transaction ID: ${receipt.transactionHash}`);
});
```
