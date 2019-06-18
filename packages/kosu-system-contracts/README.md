# Kosu System Contracts

This repository contains the contract system that implements the Kosu protocol, in conjunction with `go-kosu`.

These contracts support the inner workings of the Kosu network, including validator governance, poster access control, and general economic coordination.

These contracts are **under active development and may change extensively at any time**.

## Deployed addresses

Below are the deployed addresses for the core Kosu protocol contract system on the Ropsten test network, as well as an internal test network.

### Ropsten

-   **Network ID:** 3
-   **ETHNET URL:** `https://ethnet.zaidan.io/ropsten`

| Contract Name                                                       | Last Deploy Date | Deployed Address                                                                                                                |
| ------------------------------------------------------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| [OrderGateway](./contracts/external/OrderGateway.sol)               | 17 Jun 19        | [`0x10772c057491d2f11f6ed3b116d7dc3cc8135e24`](https://ropsten.etherscan.io/address/0x10772c057491d2f11f6ed3b116d7dc3cc8135e24) |
| [Treasury](./contracts/treasury/Treasury.sol)                       | 17 Jun 19        | [`0xf7377157c181ca45944924444cc8ec48322602dc`](https://ropsten.etherscan.io/address/0xf7377157c181ca45944924444cc8ec48322602dc) |
| [PosterRegistryProxy](./contracts/external/PosterRegistryProxy.sol) | 17 Jun 19        | [`0x8c581ed507a7c843026cf04ca213542b77a4a397`](https://ropsten.etherscan.io/address/0x8c581ed507a7c843026cf04ca213542b77a4a397) |
| [ValidatorRegistry](./contracts/external/ValidatorRegistry.sol)     | 17 Jun 19        | [`0xff74dda760854c3639c6f728aa4179b8b000f322`](https://ropsten.etherscan.io/address/0xff74dda760854c3639c6f728aa4179b8b000f322) |
| [EventEmitter](./contracts/event/EventEmitter.sol)                  | 17 Jun 19        | [`0x90acff67b832afdfd7938a0bc1192dc08f6c742e`](https://ropsten.etherscan.io/address/0x90acff67b832afdfd7938a0bc1192dc08f6c742e) |
| [Voting](./contracts/voting/Voting.sol)                             | 17 Jun 19        | [`0xc0ba1ab8781c234c4b04061bb6411680412cc2ad`](https://ropsten.etherscan.io/address/0xc0ba1ab8781c234c4b04061bb6411680412cc2ad) |
| [KosuToken](contracts/lib/KosuToken.sol)                            | 17 Jun 19        | [`0x800f612a35f5c2ee8de26ff9983cb74ba6c929a4`](https://ropsten.etherscan.io/address/0x800f612a35f5c2ee8de26ff9983cb74ba6c929a4) |

### Kosu Dev PoA

-   **Network ID:** 6174
-   **ETHNET URL:** `https://ethnet.zaidan.io/kosu`

| Contract Name                                                             | Last Deploy Date | Deployed Address                             |
| ------------------------------------------------------------------------- | ---------------- | -------------------------------------------- |
| [OrderGateway](./contracts/external/OrderGateway.sol)                     | 17 Jun 19        | `0x07a24e06d4279c0d8224957CDa6A349Aeb326963` |
| [Treasury](./contracts/treasury/Treasury.sol)                             | 17 Jun 19        | `0x39Fa4aF991C0642744E0F05042Bcf38A96ab345f` |
| [PosterRegistryProxy](./contracts/external/PosterRegistryProxy.sol)       | 17 Jun 19        | `0xBdd34B13Aff942b32C2660a11dA19Ff6E964724e` |
| [ValidatorRegistryProxy](./contracts/external/ValidatorRegistryProxy.sol) | 17 Jun 19        | `0xf277f6009869B701AdaD8D29Cbc7D029Bbe5391d` |
| [EventEmitter](./contracts/event/EventEmitter.sol)                        | 17 Jun 19        | `0xf2098FB608098A562d24CCde594A304d739cc4B7` |
| [Voting](./contracts/voting/Voting.sol)                                   | 17 Jun 19        | `0xd73B3E6B4b7702569720B93e1C27D33cB91f8407` |
| [KosuToken](contracts/lib/KosuToken.sol)                                  | 17 Jun 19        | `0x1513EFDA5170c8B1eC168bFB238278EeaA3B114e` |
