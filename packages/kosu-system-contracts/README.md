# Kosu System Contracts

This repository contains the contract system that implements the Kosu protocol, in conjunction with `go-kosu`.

These contracts support the inner workings of the Kosu network, including validator governance, poster access control, and general economic coordination.

These contracts are **under active development and may change extensively at any time**.

## Deployed addresses

Below are the deployed addresses for the core Kosu protocol contract system on the Ropsten test network, as well as an internal test network.

### Ropsten

-   **Network ID:** 3
-   **ETHNET URL:** `https://ropsten.infura.io`

| Contract Name                                                             | Last Deploy Date | Deployed Address                                                                                                              |
| ------------------------------------------------------------------------- | ---------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| [OrderGateway](./contracts/external/OrderGateway.sol)                     | 08/28/19         | [0xf520dddc6c950e800f21c5ef4030f54dbd5714d1](https://ropsten.etherscan.io/address/0xf520dddc6c950e800f21c5ef4030f54dbd5714d1) |
| [AuthorizedAddresses](./contracts/access_control/AuthorizedAddresses.sol) | 08/28/19         | [0x95a040b7850bef34654a7a1fefbb7efab2d3c810](https://ropsten.etherscan.io/address/0x95a040b7850bef34654a7a1fefbb7efab2d3c810) |
| [EventEmitter](./contracts/event/EventEmitter.sol)                        | 08/28/19         | [0x073ecdd9ceae0f7fb649d991b6dbfde8629fcb54](https://ropsten.etherscan.io/address/0x073ecdd9ceae0f7fb649d991b6dbfde8629fcb54) |
| [KosuToken](./contracts/lib/KosuToken.sol)                                | 08/28/19         | [0x411cac14a8592bbc2d9384afe944b1d0e111a886](https://ropsten.etherscan.io/address/0x411cac14a8592bbc2d9384afe944b1d0e111a886) |
| [Treasury](./contracts/treasury/Treasury.sol)                             | 08/28/19         | [0x4318e9df51e4d429f458dd8aae43de6a43bc1117](https://ropsten.etherscan.io/address/0x4318e9df51e4d429f458dd8aae43de6a43bc1117) |
| [Voting](./contracts/voting/Voting.sol)                                   | 08/28/19         | [0x77f504d4334413d588ba78cec795c6a02a901580](https://ropsten.etherscan.io/address/0x77f504d4334413d588ba78cec795c6a02a901580) |
| [PosterRegistry](./contracts/poster/PosterRegistry.sol)                   | 08/28/19         | [0x9024f61ea58f02fba3c8d4f41997851fa31c3ce7](https://ropsten.etherscan.io/address/0x9024f61ea58f02fba3c8d4f41997851fa31c3ce7) |
| [ValidatorRegistry](./contracts/validator/ValidatorRegistry.sol)          | 08/28/19         | [0x8b6ed5bf59314030a567f590a71d4417058f819d](https://ropsten.etherscan.io/address/0x8b6ed5bf59314030a567f590a71d4417058f819d) |
| [ZeroExV2SubContract](./contracts/sub-contracts/ZeroExV2SubContract.sol)  | 08/28/19         | [0x747a0bd4ace69240b50362a06d2f4096e19cc130](https://ropsten.etherscan.io/address/0x747a0bd4ace69240b50362a06d2f4096e19cc130) |

### Kosu Dev PoA

-   **Network ID:** 6174
-   **ETHNET URL:** `https://ethnet.zaidan.io/kosu`

| Contract Name                                                             | Last Deploy Date | Deployed Address                           |
| ------------------------------------------------------------------------- | ---------------- | ------------------------------------------ |
| [OrderGateway](./contracts/external/OrderGateway.sol)                     | 08/28/19         | 0xb8fda6341f80cbae987ab5cd00dce502097e3152 |
| [AuthorizedAddresses](./contracts/access_control/AuthorizedAddresses.sol) | 08/28/19         | 0xe473109cb41c773fd2fe01e83c6e51356f9585d6 |
| [EventEmitter](./contracts/event/EventEmitter.sol)                        | 08/28/19         | 0x2f3afeff0914f33769cdfbf3fcf870c33b26c311 |
| [KosuToken](./contracts/lib/KosuToken.sol)                                | 08/28/19         | 0xcc868306d6188b2b12757a7c3926042b4d3c4e29 |
| [Treasury](./contracts/treasury/Treasury.sol)                             | 08/28/19         | 0x46572f9082dd2429c2c138fa9483a67d4f29d423 |
| [Voting](./contracts/voting/Voting.sol)                                   | 08/28/19         | 0x5d60c93d8b48682cd387c8be7e9461b67ecfbea1 |
| [PosterRegistry](./contracts/poster/PosterRegistry.sol)                   | 08/28/19         | 0x7e6534b8205713246e91a14b462d2dbcac3ede17 |
| [ValidatorRegistry](./contracts/validator/ValidatorRegistry.sol)          | 08/28/19         | 0x301bb008f2a8a3cae9918743fe43428551392773 |
| [ZeroExV2SubContract](./contracts/sub-contracts/ZeroExV2SubContract.sol)  | 08/28/19         | 0x0265e7d1b094787cb13174e18a1cefc41279a6c9 |

### Kosu CI Test

-   **Network ID:** 6175
-   **ETHNET URL:** `http://kosu-geth:8545`

| Contract Name                                                             | Last Deploy Date | Deployed Address                           |
| ------------------------------------------------------------------------- | ---------------- | ------------------------------------------ |
| [OrderGateway](./contracts/external/OrderGateway.sol)                     | 08/20/19         | 0xb8fda6341f80cbae987ab5cd00dce502097e3152 |
| [AuthorizedAddresses](./contracts/access_control/AuthorizedAddresses.sol) | 08/20/19         | 0xe473109cb41c773fd2fe01e83c6e51356f9585d6 |
| [EventEmitter](./contracts/event/EventEmitter.sol)                        | 08/20/19         | 0x2f3afeff0914f33769cdfbf3fcf870c33b26c311 |
| [KosuToken](./contracts/lib/KosuToken.sol)                                | 08/20/19         | 0xcc868306d6188b2b12757a7c3926042b4d3c4e29 |
| [Treasury](./contracts/treasury/Treasury.sol)                             | 08/20/19         | 0x46572f9082dd2429c2c138fa9483a67d4f29d423 |
| [Voting](./contracts/voting/Voting.sol)                                   | 08/20/19         | 0x5d60c93d8b48682cd387c8be7e9461b67ecfbea1 |
| [PosterRegistry](./contracts/poster/PosterRegistry.sol)                   | 08/20/19         | 0x7e6534b8205713246e91a14b462d2dbcac3ede17 |
| [ValidatorRegistry](./contracts/validator/ValidatorRegistry.sol)          | 08/20/19         | 0x301bb008f2a8a3cae9918743fe43428551392773 |
| [ZeroExV2SubContract](./contracts/sub-contracts/ZeroExV2SubContract.sol)  | 08/20/19         | 0x0265e7d1b094787cb13174e18a1cefc41279a6c9 |
