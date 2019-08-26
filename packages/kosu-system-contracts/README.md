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
| [OrderGateway](./contracts/external/OrderGateway.sol)                     | 08/19/19         | [0x6923508ce23c055bc6dac56cd4fbe81991f3224c](https://ropsten.etherscan.io/address/0x6923508ce23c055bc6dac56cd4fbe81991f3224c) |
| [AuthorizedAddresses](./contracts/access_control/AuthorizedAddresses.sol) | 08/19/19         | [0xe2476a0ffd3724f96bae24368922a512945997cf](https://ropsten.etherscan.io/address/0xe2476a0ffd3724f96bae24368922a512945997cf) |
| [EventEmitter](./contracts/event/EventEmitter.sol)                        | 08/19/19         | [0x16cb1e2b3d22a784c26d2e06788bf54153344de6](https://ropsten.etherscan.io/address/0x16cb1e2b3d22a784c26d2e06788bf54153344de6) |
| [KosuToken](./contracts/lib/KosuToken.sol)                                | 08/19/19         | [0xb47fd095e6387d78a0b72283e1aba18578506b51](https://ropsten.etherscan.io/address/0xb47fd095e6387d78a0b72283e1aba18578506b51) |
| [Treasury](./contracts/treasury/Treasury.sol)                             | 08/19/19         | [0xb5416eace99f62f03d67f213978045e414237bea](https://ropsten.etherscan.io/address/0xb5416eace99f62f03d67f213978045e414237bea) |
| [Voting](./contracts/voting/Voting.sol)                                   | 08/19/19         | [0x09b9fa1250b9aa7fe7908eb4639c8fb7c43e3bcc](https://ropsten.etherscan.io/address/0x09b9fa1250b9aa7fe7908eb4639c8fb7c43e3bcc) |
| [PosterRegistry](./contracts/poster/PosterRegistry.sol)                   | 08/19/19         | [0xf293d08f3f642dd3aef8f219824cf8f553e347a3](https://ropsten.etherscan.io/address/0xf293d08f3f642dd3aef8f219824cf8f553e347a3) |
| [ValidatorRegistry](./contracts/validator/ValidatorRegistry.sol)          | 08/19/19         | [0x6a1a5cb26e208e37f2a2c53fcc6e635857a348d6](https://ropsten.etherscan.io/address/0x6a1a5cb26e208e37f2a2c53fcc6e635857a348d6) |
| [ZeroExV2SubContract](./contracts/sub-contracts/ZeroExV2SubContract.sol)  | 08/19/19         | [0xf2f7a7bb8984db3751333c895455f12825f2f9df](https://ropsten.etherscan.io/address/0xf2f7a7bb8984db3751333c895455f12825f2f9df) |

### Kosu Dev PoA

-   **Network ID:** 6174
-   **ETHNET URL:** `https://ethnet.zaidan.io/kosu`

| Contract Name                                                             | Last Deploy Date | Deployed Address                           |
| ------------------------------------------------------------------------- | ---------------- | ------------------------------------------ |
| [OrderGateway](./contracts/external/OrderGateway.sol)                     | 08/19/19         | 0xb8fda6341f80cbae987ab5cd00dce502097e3152 |
| [AuthorizedAddresses](./contracts/access_control/AuthorizedAddresses.sol) | 08/19/19         | 0xe473109cb41c773fd2fe01e83c6e51356f9585d6 |
| [EventEmitter](./contracts/event/EventEmitter.sol)                        | 08/19/19         | 0x2f3afeff0914f33769cdfbf3fcf870c33b26c311 |
| [KosuToken](./contracts/lib/KosuToken.sol)                                | 08/19/19         | 0xcc868306d6188b2b12757a7c3926042b4d3c4e29 |
| [Treasury](./contracts/treasury/Treasury.sol)                             | 08/19/19         | 0x46572f9082dd2429c2c138fa9483a67d4f29d423 |
| [Voting](./contracts/voting/Voting.sol)                                   | 08/19/19         | 0x5d60c93d8b48682cd387c8be7e9461b67ecfbea1 |
| [PosterRegistry](./contracts/poster/PosterRegistry.sol)                   | 08/19/19         | 0x7e6534b8205713246e91a14b462d2dbcac3ede17 |
| [ValidatorRegistry](./contracts/validator/ValidatorRegistry.sol)          | 08/19/19         | 0x301bb008f2a8a3cae9918743fe43428551392773 |
| [ZeroExV2SubContract](./contracts/sub-contracts/ZeroExV2SubContract.sol)  | 08/19/19         | 0x0265e7d1b094787cb13174e18a1cefc41279a6c9 |

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
