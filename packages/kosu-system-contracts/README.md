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
| [OrderGateway](./contracts/external/OrderGateway.sol)                     | 09/12/19         | [0xe3c53988b77c2b3fd2b847719743bdb6e1e66843](https://ropsten.etherscan.io/address/0xe3c53988b77c2b3fd2b847719743bdb6e1e66843) |
| [AuthorizedAddresses](./contracts/access_control/AuthorizedAddresses.sol) | 09/12/19         | [0x93b79200cd23841371024427c39c5e4cd19957c9](https://ropsten.etherscan.io/address/0x93b79200cd23841371024427c39c5e4cd19957c9) |
| [EventEmitter](./contracts/event/EventEmitter.sol)                        | 09/12/19         | [0xd55dfe66deccbfdcd462098c6bda59666fd9dafe](https://ropsten.etherscan.io/address/0xd55dfe66deccbfdcd462098c6bda59666fd9dafe) |
| [KosuToken](./contracts/lib/KosuToken.sol)                                | 09/12/19         | [0x47f3bbc35acd3f8c5b2b8948c39f23f3c6e21f5a](https://ropsten.etherscan.io/address/0x47f3bbc35acd3f8c5b2b8948c39f23f3c6e21f5a) |
| [Treasury](./contracts/treasury/Treasury.sol)                             | 09/12/19         | [0x3a1d181217a5dad549d398a1c17490daecdda3b4](https://ropsten.etherscan.io/address/0x3a1d181217a5dad549d398a1c17490daecdda3b4) |
| [Voting](./contracts/voting/Voting.sol)                                   | 09/12/19         | [0x2442336571bb044f8793fcdff0d46f65d278e376](https://ropsten.etherscan.io/address/0x2442336571bb044f8793fcdff0d46f65d278e376) |
| [PosterRegistry](./contracts/poster/PosterRegistry.sol)                   | 09/12/19         | [0x510733f64b49a502c75e57c9f63bd8c9f49b542c](https://ropsten.etherscan.io/address/0x510733f64b49a502c75e57c9f63bd8c9f49b542c) |
| [ValidatorRegistry](./contracts/validator/ValidatorRegistry.sol)          | 09/12/19         | [0xf12a3c3728d86fcbe02d34a5dbf4bb3c7dd90351](https://ropsten.etherscan.io/address/0xf12a3c3728d86fcbe02d34a5dbf4bb3c7dd90351) |
| [ZeroExV2SubContract](./contracts/sub-contracts/ZeroExV2SubContract.sol)  | 09/12/19         | [0xb395b261f8256c91c143ef3f74c014def1de1f39](https://ropsten.etherscan.io/address/0xb395b261f8256c91c143ef3f74c014def1de1f39) |

### Kosu Dev PoA

-   **Network ID:** 6174
-   **ETHNET URL:** `https://ethnet.zaidan.io/kosu`

| Contract Name                                                             | Last Deploy Date | Deployed Address                           |
| ------------------------------------------------------------------------- | ---------------- | ------------------------------------------ |
| [OrderGateway](./contracts/external/OrderGateway.sol)                     | 09/12/19         | 0xb8fda6341f80cbae987ab5cd00dce502097e3152 |
| [AuthorizedAddresses](./contracts/access_control/AuthorizedAddresses.sol) | 09/12/19         | 0xe473109cb41c773fd2fe01e83c6e51356f9585d6 |
| [EventEmitter](./contracts/event/EventEmitter.sol)                        | 09/12/19         | 0x2f3afeff0914f33769cdfbf3fcf870c33b26c311 |
| [KosuToken](./contracts/lib/KosuToken.sol)                                | 09/12/19         | 0xcc868306d6188b2b12757a7c3926042b4d3c4e29 |
| [Treasury](./contracts/treasury/Treasury.sol)                             | 09/12/19         | 0x46572f9082dd2429c2c138fa9483a67d4f29d423 |
| [Voting](./contracts/voting/Voting.sol)                                   | 09/12/19         | 0x5d60c93d8b48682cd387c8be7e9461b67ecfbea1 |
| [PosterRegistry](./contracts/poster/PosterRegistry.sol)                   | 09/12/19         | 0x7e6534b8205713246e91a14b462d2dbcac3ede17 |
| [ValidatorRegistry](./contracts/validator/ValidatorRegistry.sol)          | 09/12/19         | 0x301bb008f2a8a3cae9918743fe43428551392773 |
| [ZeroExV2SubContract](./contracts/sub-contracts/ZeroExV2SubContract.sol)  | 09/12/19         | 0x0265e7d1b094787cb13174e18a1cefc41279a6c9 |

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
