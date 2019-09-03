# Kosu Governance & Validator TCR

This paper details the continuous governance and validator curation process used in the Kosu protocol.

## Overview

The Validator Registry contract is an implementation of a token-curated registry (TCR) that enables decentralized curation of validators on the network. Individuals wishing to become validators submit proposals to join the validator set specifying a reward schedule.

The goal of a TCR is to produce a curated set of listings, which are entries that have successfully been included in the registry. Listings begin as proposals which indicate intent to join the registry, backed by a number of tokens. Proposals and listings may be challenged at any time, where a challenger must put up an equal number of tokens as the listing or proposal owner. Challenges trigger votes, which any token holder may participate in. If voted out, the validator’s tokens are distributed to the individuals responsible for raising – and voting in – the successful challenge.

Holders of the protocol’s native staking token, KOSU (ERC-20 standard), with non-zero Treasury balances can vote on governance matters, where votes are weighted proportional to their deposited balance. Validators and Posters who are required to bond KOSU in order to perform their designated roles in the network, will also be able to vote on proposals using bonded tokens. In other words, all tokens deposited in the Treasury count towards a users vote weight, even if they are allocated as stake in challenges/listings or bonded in the Poster registry.

### Network participants

The primary stakeholders within the Kosu system are validators, posters, and voters. It is possible and likely for individual stakeholders to serve two (or more) roles at once.

### Validators

The Kosu network uses a Tendermint bonded proof-of-stake security model wherein validators stake (by locking) tokens into a contract proportional to the amount of vote power they wish to receive on the network.

Validators are required to run full Ethereum nodes to faciliate a one-way peg-zone between the two chains. To do so, validators submit special attestations, or “witness" transactions, to the Kosu network about specific state changes to the protocol's contract system. These updates include user bonded token balances (which affect an order rate limit enforced by the network), and updates to the dynamic registry contract containing the curated list of validators.

### Posters

Posters are individuals wishing to leverage the network's decentralized order booking and message relay features. They gain write access to the network by bonding any amount of KOSU tokens in a poster registry contract.

### Voters

A voter is any entity who holds KOSU and participates in governance polls. Both posters and validators are allowed to participate in votes with their locked balances, and any additional tokens they wish to deposit.

## Validator listing process

![Listing lifecycle](https://github.com/ParadigmFoundation/whitepaper/blob/whitepaper/v3/figures/fig3.png?raw=true")

### Right to submit a proposal

Any participant with KOSU deposited in the Treasury may create a proposal that indicates their intent to become a network validator by calling the `registerListing` [method](https://docs.kosu.io/kosu-system-contracts/ValidatorRegistry.html#registerlisting). The proposal should specify the following as parameters:

-   `tendermintPublicKey`: Hex encoded Tendermint public key
-   `tokensToStake`: the amount of KOSU at stake if challenged
-   `rewardRate`: the rate at which tokens are minted or destroyed over the active listings reward period (denominated in reserve currency (ETH), distributed in corresponding quantity of KOSU)
-   `details`: external link with validator information for voters

### Proposal filter (minimum stake)

Proposals must include a stake (`tokenToStake`) of KOSU greater than or equal to the specified minimum parameter. The minimum stake amount is currently set at 1 KOSU.

### Reward rate

All validator proposals must include a reward (`rewardRate`) to be executed to the validator on a periodic basis. This reward is denominated in ETH but paid in Kosu. The rate may be positive (tokens minted as inflation), negative (tokens burned), or zero. If a listing with a negative reward rate is proposed and accepted, the validator must continually collateralize a treasury balance sufficient to cover the burn rate. If the validator is unable to cover a burn, they may be removed from the listing without a full challenge ("touch-and-remove"). If a listing owner's available balance (number of tokens deposited in treasury) falls below their stake size, they may also be touched-and-removed. An example of the previously described scenario would be a validator withdrawing their staked KOSU.

There is also a specified `maxRewardRate` which is the maximum rate a validator can propose to mint per period. This `maxRewardRate` constriction on proposals is equal to 1.2x the current maximum validator reward rate. For example, if the highest reward rate in the current validator set is .1 ETH worth of KOSU per period, the maximum reward rate that may be proposed by an intended validator is .12 ETH worth of KOSU per period.

### Unchallenged listings

Proposals that are not challenged may be confirmed into the registry after a period of time measured in Ethereum blocks using the `confirmListing` [method](https://docs.kosu.io/kosu-system-contracts/ValidatorRegistry.html#confirmlisting) with the validator's `tendermintPublicKey` as the only parameter.

### Challenges

Pending proposals and accepted listings may be challenged at any time with the `challengeListing` [method](https://docs.kosu.io/kosu-system-contracts/ValidatorRegistry.html#challengelisting) specifying a `tendermintPublicKey` and an external link (`details`) as parameters. All challenges are identified with a `challengeId`.

-   Challengers must have an available balance of KOSU equal-to or greater-than the stake of the
    listing or proposal being challenged.

-   Challenges may be voted on by any KOSU holder using a commit-reveal vote scheme
    during a specified voting period.

-   Vote weight is determined by the system balance of a user within the Kosu contract system.

-   After the completion of a vote period, the ruling is determined based on the binary outcome (yes or no)
    that received a majority of the participating vote weight.

-   If a challenge resolves against a listing or proposal, the listing's staked tokens are distributed
    to the challenger and the winning voters (see below).

-   If a challenge fails, the challenger's collateral is distributed to the winning voters and the
    owner of the challenged listing.

-   Voters are never penalized for voting on the losing side of a challenge.

### Challenge payouts

The payout of resolved challenges is split between the winning stakeholder, and the participating voters on the winning side. The first block produced after a challenge vote ends, the challenge is considered finalized as no more votes can be revealed. At this point, any party may call the `resolveChallenge` [method](https://docs.kosu.io/kosu-system-contracts/ValidatorRegistry.html#registerlisting) and the payout is granted to the winning stakeholder (challenger or challenged listing).

Voters on the winning side can individually claim winnings by calling the `claimWinnings` [method](https://docs.kosu.io/kosu-system-contracts/ValidatorRegistry.html#claimwinnings) with the `challengeId` as a parameter.

The split payout awarded to voters is distributed proportionally according to each voter's _vote weight_, which is the number of KOSU committed by an individual voter as a proportion of total tokens committed by all winning voters.

### Voting

Any holder of KOSU within the Treasury, including participants that are staking/bonding as a Validator/Poster, may choose to vote during a challenge period with their tokens. The voting process uses a commit-reveal scheme to hide voter decisions and ensure that voters do not switch their vote based on the winning outcome.

### Committing

The _commit period_ begins as soon as a challenge is made and lasts the number of blocks specified in the `constructor`. During the commit period, voters signal their vote with the `commitVote` [method](https://docs.kosu.io/kosu-system-contracts/Voting.html#commitvote) and the following parameters:

-   `_pollId`: Poll index to act upon
-   `_vote`: Hash encoded vote (i.e. for a binary poll, 0 signifies 'against' and 1 signifies 'in favor')
-   `_tokensToCommit`: Number of KOSU comitted to vote

In order to generate the Hash encoded vote (the `_vote` parameter in the `commitVote` method), the kosu voting library provides the `encodeVote` [method](https://docs.kosu.io/kosu.js/classes/voting.html#encodevote). This methods accepts two parameters: `_voteOption` which is a 0 or 1 signifying 'against' or 'in favor', and `_voteSalt` which is a randomly generated string of numbers. The `encodeVote` method encodes the vote by hashing the Option and the Salt, creating the Hash encoded vote that is submitted as the `_vote` parameter in `commitVote`.

### Revealing

The reveal period begins on the same block that the commit period ends. A vote needs to be committed _and_ revealed in order to count. The `revealVote` [method](https://docs.kosu.io/kosu-system-contracts/Voting.html#revealvote) is used to reveal a vote and accepts `_pollId`, `_voteOption`, and `_voteSalt` as parameters. If the vote otion (0 or 1) and vote salt (randomly generated bytes) submitted with `revealVote` produce the same Hash that was previously committed by the voter during the commit period, the vote is considered valid. Once the reveal period is over and the poll is finalized, the `totalRevealedTokens` and `totalWinningTokens` [methods](https://docs.kosu.io/kosu-system-contracts/Voting.html#totalrevealedtokens) can be called (both have `_pollId` as the only parameter) to see the total number of votes revealed and the number of votes revealed on the winning side.

### Note

It is important to note that Kosu's validator selection model is considerably more subjective and untested than largest-bond (rank) based proof-of-stake validator selection mechanisms. While Kosu was designed with the shortcomings of TCR models in mind, the system should still be considered experimental. For more information on the system's specific design decisions and incentive models, please refer to the Kosu [whitepaper](https://github.com/ParadigmFoundation/kosu-monorepo/blob/master/whitepaper.pdf).
