# Kosu governance

## Overview of network participants

-   **Validator**: The Kosu network uses a Tendermint bonded proof-of-stake security model wherein validators stake (by locking) tokens into a contract proportional to the amount of vote power they wish to receive on the network. Validators are required to run full Ethereum nodes and are responsible for submitting special attestations, or “witness" transactions, to the Kosu network about specific state changes to the protocol's contract system. These updates include user bonded token balances (which affect an order rate limit enforced by the network), and updates to the dynamic registry contract containing the curated list of validators.

-   **Poster**: Posters are individuals wishing to leverage the network's decentralized order booking and message relay features. They gain write access to the network by bonding any amount of Kosu tokens in a poster registry contract.

## Abstract

This paper details the continuous governance and validator curation process used in the Kosu protocol.

The Validator Registry contract is an implementation of a token-curated registry (TCR) that enables decentralized curation of validators on the network. Individuals wishing to become validators submit proposals to join the validator set specifying a reward schedule.

The goal of a TCR is to produce a curated set of listings, which are entries that have successfully been included in the registry. Listings begin as proposals which indicate intent to join the registry, backed by a number of tokens. Proposals and listings may be challenged at any time, where a challenger must put up an equal number of tokens as the listing or proposal owner. Challenges trigger votes, which any token holder may participate in. If voted out, the validator’s tokens are distributed to the individuals responsible for raising – and voting in – the successful challenge.

In this system, holders of the protocol’s native staking token, _Kosu_ (ERC-20 standard), can vote on proposals using a 1 token 1 vote basis. Validators and Posters are required to stake Kosu in order to perform their designated roles in the network and will be able to vote on proposals with these stakes.

## Validator listing process

### Right to submit a proposal

Any Kosu holder may create a proposal that indicates their intent to become a network validator by calling the `registerListing` method. The proposal should specify the following as parameters:

-   `tendermintPublicKey`: a Tendermint public key
-   `tokensToStake`: the amount of _Kosu_ tokens at stake if challenged
-   `rewardRate`: the rate at which tokens are minted or destroyed over the active listings reward period
-   `details`: external link with validator information for voters

### Proposal filter (minimum stake)

Proposals must include a stake (`tokenToStake`) of _Kosu_ tokens greater than or equal to the specified minimum parameter. The minimum stake amount is currently set at 1 _Kosu_ token.

### Reward rate

All validator proposals must include a reward (`rewardRate`) to be executed to the validator on a periodic basis. This reward may be positive (tokens minted as inflation), negative (tokens burned), or zero. If a listing with a negative reward rate is proposed and accepted, the validator must continually collateralize a treasury balance sufficient to cover the burn rate. If the validator is unable to cover a burn, they may be removed from the listing without a full challenge ("touch-and-remove"). If a listing owner's available balance (number of tokens deposited in treasury) falls below their stake size, the may also be touched-and-removed. An example of the previously described scenario would be a validator withdrawing their staked _Kosu_.

There is also a specified `maxRewardRate` which is the maximum amount of _Kosu_ tokens a validator can mint per period. The `maxRewardRate` is a function equal to the square root of the sum of total reward rates for all outstanding validator listings.

### Unchallenged listings

Proposals that are not challenged may be confirmed into the registry after a period of time measured in Ethereum blocks using the `confirmListing` method with the validator's `tendermintPublicKey` as the only parameter.

### Challenges

Pending proposals and accepted listings may be challenged at any time with the `challengeListing` method specifying a `tendermintPublicKey` and an external link (`details`) as parameters. All challenges are identified with a `challengeId`.

-   Challengers must have an available balance of _Kosu_ tokens equal-to or greater-than the stake of the
    listing or proposal being challenged.

-   Challenges may be voted on by any Kosu token holder using a commit-reveal vote scheme
    during a specified voting period.

-   Vote weight is limited by the system balance of a user within the Kosu contract system.

-   After the completion of a vote period, the ruling is determined based on the binary outcome (yes or no)
    that received a majority of the participating vote weight.

-   If a challenge resolves against a listing or proposal, the listing's staked tokens are distributed
    to the challenger and the winning voters (see below).

-   If a challenge fails, the challenger's collateral is distributed to the winning voters and the
    owner of the challenged listing.

-   Voters are never penalized for voting on the losing side of a challenge.

### Challenge payouts

The payout of resolved challenges is split between the winning stakeholder, and the participating voters on the winning side. The first block produced after a challenge vote ends, the challenge is considered finalized as no more votes can be revealed. At this point, any party may call the `resolveChallenge` method and the payout is granted to the winning stakeholder (challenger or challenged listing). Voters on the winning side can individually claim winnings by calling the `claimWinnings` method with the `challengeId` as a parameter.

The split payout awarded to voters is distributed proportionally according to each voter's _vote weight_, which is the number of _Kosu_ tokens committed by an individual voter as a proportion of total tokens conmitted by all winning voters.

### Voting

Any holder of _Kosu_ tokens, even if staking as a Validator or Poster, may choose to vote during a challenge period with their tokens. The _commit period_ starts as soon as a challenge is made, and lasts the number of blocks specified in the `constructor`. During the commit period, voters signal their vote with the `commitVote` method and the following parameters:

-   `_pollId`: Poll index to act upon
-   `_vote`: Hash encoded vote (i.e. for a binary poll, 0 signifies 'against' and 1 signifies 'in favor')
-   `_tokensToCommit`: Numer of tokens comitted to vote

Reveal......

...(still need to finish majority)

## Figure WP

## Proposal Steps (with vars/funcs from docs)
