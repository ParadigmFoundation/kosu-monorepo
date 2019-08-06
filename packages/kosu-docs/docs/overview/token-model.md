# Kosu Token Model

## Introduction

The Kosu network uses a bonded proof-of-stake security model implemented with Tendermint Consensus and a system of Ethereum contracts that include the protocol’s native [token](https://docs.kosu.io/kosu-system-contracts/KosuToken.html#contents). The Kosu network introduces a number of innovative cryptoeconomic mechanisms, some of which are novel experimentation. These mechanisms include a continuous bonding curve token distribution, a validator set that is dynamic in size and inclusion, stakeholder curation of the network’s validator set through a weighted voting system and token-curated registry, and the ability for validators to individually propose requested fee schedules.

## Validators

Kosu validators are required to run full Ethereum nodes and are responsible for submitting special attestations, or “witness” transactions, to the Kosu network about specific state changes to the protocol’s contract system. Specifically, the network must reflect updates to users’ bonded token balances and updates to the dynamic registry contract containing the curated list of validators.
The Kosu network uses a bonded proof-of-stake security model wherein validators stake (by locking) KOSU into a contract proportional to the amount of vote power they wish to receive on the network. The number of tokens they associate with their stake are locked for the duration that the entity wishes to validate. The validator may be stripped of their power at any time at the discretion of voting KOSU holders, and if voted out, their tokens are distributed to the individuals responsible for raising – and voting in – the successful challenge. ([More info](https://docs.kosu.io/overview/governance.html#challenges) on the challenge process).

During the continuous validator governance and curation process, individuals wishing to become validators submit proposals in which they specify a positive or negative reward schedule. If this value is positive, the validator will be rewarded newly minted KOSU that inflates the existing supply (and changes the bonding curve equation). If the value is negative, validators will be required to constantly collateralize their listing at the rate specified so their tokens may be burned, deflating the existing supply. The ability for validators to specify both negative and positive reward rates is a crucial component of the overall system design. For the nascent network, validators will be able to extract little value from the act of validating alone, and thus will require inflationary rewards that justify the costs of managing validator infrastructure. However, in a mature state the Kosu network could present implicit value capture opportunities to validators in the form of positional information advantages. More generally, validator reward schedules are market-driven and account for both implicit and explicit reward capture.

It is important to note that this validator selection model is considerably more subjective than
largest-bond (rank) based proof-of-stake validator selection mechanisms. With that said, the unique domain requirements as well as the limited impact of malicious validator behavior seem to warrant such subjectivity.

## Validator Token Curated Registry

The Validator Registry contract is an implementation of a token-curated registry (TCR) and a
cornerstone piece of the Kosu protocol that enables decentralized curation of the networks validator set. The goal of a TCR is to produce a curated set of listings, which are entries that have successfully been included in the registry. Listings begin as proposals which indicate intent to join the registry, backed by a number of tokens. Proposals and listings may be challenged at any time, where a challenger must put up an equal number of tokens as the listing or proposal owner. Challenges trigger votes, which any token holder may participate in. The specific mechanics of listings, proposals, and challenges within the Kosu Validator Registry are described in the [Kosu governance](https://docs.kosu.io/overview/governance.html#overview) doc.

## Posters

Individuals intending to “post” orders to the Kosu network (add liquidity in the form of maker orders) are called Posters, and can gain write access to the network by bonding any amount of KOSU in the [`PosterRegistry`](https://docs.kosu.io/kosu-system-contracts/PosterRegistry.html#contents) contract. After their bond transaction is confirmed on Ethereum to a certain depth, validators update the Kosu network’s shared state to reflect the bonded balance change of the new Poster. The same mechanism allows Posters to adjust the amount of tokens they have bonded, or withdraw entirely from the system at any time.

The amount of tokens a Poster chooses to bond determines the maximum number of orders they may post per defined period, which is proportional to their bonded balance relative to the total KOSU bonded by Posters (rate-limit equation in [Kosu Whitepaper](https://kosu.io/whitepaper.pdf) 3.3.3). This poster bonding mechanism creates a market for the allocation of network resources and an implicit incentive to contribute quality liquidity to the network.

Posters sign their orders with the Ethereum keypair they used to bond tokens in the `PosterRegistry`. When validators process these order transactions, the poster’s signature is recovered and checked against the in-state mapping of bandwidth allocations. Each valid order from a poster decrements their period limit by one, until a new period begins and the allocation is recomputed.

## Poster Bonding & Access Control

The `PosterRegistry` contract is a simple registry system that allows posters to bond and unbond KOSU at any time, and in arbitrary amounts. The contract maintains a mapping of accounts to bonded token balances, and importantly, triggers the emission of an event log through the `EventEmitter` contract each time a poster registers or releases tokens, including the account address and the new balance.

Generation of the rate-limit mapping that allocates network order throughput to Posters is handled by the Kosu network, after balance updates to the contract system are reflected in the network’s shared state. This process is part of Kosu’s Ethereum peg-zone.

Order messages are treated as a finite network resource, constrained by physical bandwidth limitations, the number of transactions that can be included within a block, and the size of the order messages themselves. Order throughput is allocated to posters over discrete intervals called “rebalance periods,” which are parameterized by validators based on the height of the Ethereum blockchain, and a per-period order limit.

Validators establish the maximum number of orders to accept per rebalance period as a configurable consensus parameter, and proportionally allocate throughput to Posters based on the number of Kosu tokens each has bonded. This mechanic acts as a sybil tolerance mechanism, and creates a market for access to order throughput on the network. Individuals can always gain more bandwidth allocation by bonding more tokens in the Poster Registry.

## Voters

The validator selection model used by the Kosu network is relatively subjective, requiring the active participation of KOSU holders in the curation of a validator set. Due to the magnitude of such decisions, it is important to maximally incentivize participation via explicit participation rewards.

Token holders participating in the curation mechanisms, including those who submit winning challenges and vote correctly in challenges, earn KOSU as rewards. This results in an active token distribution directed towards participating and benevolent network actors. All token holders with KOSU deposited in the Treasury, including those bonded as both validators and posters, can participate in any election/decision.

## Treasury

The Treasury contract is responsible for managing system token allowances, executing adjustments to token supply (as a result of the validator reward process), and other functionality related to asset management within the Kosu contract system. It acts as a central accounting system and tracks the balances of users’ tokens throughout the system, including those bonded by posters, staked by validators, or idly deposited within the treasury. This accounting system is crucial to the systems voting mechanics, which relies on the Treasury’s account of each user’s total system balance to assign vote power to participating stakeholders. In general, in order to act in the Kosu network as a Poster, validator, or voting stakeholder, participants’ KOSU tokens must be deposited within the Treasury.

## Distribution Mechanics

Token distribution is a key determinant of incentive compatibility for the models defined previously. Kosu’s proposed token includes multiple utilities that collectively catalyze wealth distribution to be a relatively dynamic process. To complement such dynamism, Paradigm Labs plans a continuous token distribution via a market-driven, validator defined reward system (outlined previously) and a bonding curve. KOSU’s distribution will thus be a function of both a determinant process, the bonding curve, and an indeterminate process, the validator reward schedule.

Preceding an official network launch, a contract responsible for token distribution will be deployed. The contract will be permissioned to mint additional KOSU tokens based on an algorithmic pricing model. It will allow users to receive KOSU by bonding Ether (ETH) and vise versa. The pricing model defines a parametric equation that allows bonding curves to be dynamically defined based on the existing token contract state. This construction maintains the correctness of the system by providing an additional independent variable necessary for price adjustment due to token inflation as a result of validator rewards.

More information on the specific parameterization of the bonding curve, as well as the research supporting the parameter decisions made, will be released in the coming months.
