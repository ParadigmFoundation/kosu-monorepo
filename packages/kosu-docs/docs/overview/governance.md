# Kosu Governance

## Overview of Network Participants

-   **Validator**: The Kosu network uses a Tendermint bonded proof-of-stake security model wherein validators stake (by locking) tokens into a contract proportional       to the amount of vote power they wish to receive on the network. Validators are required to run full Ethereum nodes and are responsible for submitting special       attestations, or “witness" transactions, to the Kosu network about specific state changes to the protocol's contract system. These updates include user bonded       token balances (which affect an order rate limit enforced by the network), and updates to the dynamic registry contract containing the curated list of               validators.

-   **Poster**: Posters are individuals wishing to leverage the network's decentralized order booking and message relay features. They gain write access to the            network by bonding any amount of Kosu tokens in a poster registry contract.

## Abstract

This paper details the continuous governance and validator curation process used in the Kosu protocol. 

The Validator Registry contract is an implementation of a token-curated registry (TCR) that enables decentralized curation of validators on the network. Individuals wishing to become validators submit proposals to join the validator set specifying a reward schedule.

The goal of a TCR is to produce a curated set of listings, which are entries that have successfully been included in the registry. Listings begin as proposals which indicate intent to join the registry, backed by a number of tokens. Proposals and listings may be challenged at any time, where a challenger must put up an equal number of tokens as the listing or proposal owner. Challenges trigger votes, which any token holder may participate in. If voted out, the validator’s tokens are distributed to the individuals responsible for raising – and voting in – the successful challenge.

In this system, holders of the protocol’s native staking token, Kosu (ERC-20 standard), can vote on proposals using a 1 token 1 vote basis. Validators and Posters are required to stake Kosu in order to perform their designated roles in the network and will be able to vote on proposals with these stakes. 




...(still need to finish majority)

## Figure WP

## Proposal Steps (with vars/funcs from docs)



