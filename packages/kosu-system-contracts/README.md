# Kosu System Contracts

This repository contains the contract system that implements the Kosu protocol, in conjunction with `go-kosu`.

These contracts support the inner workings of the Kosu network, including validator governance, poster access control, and general economic coordination.

These contracts are **under active development and may change extensively at any time**.

## Deployed addresses

Below are the deployed addresses for the core Kosu protocol contract system on the Ropsten test network, as well as an internal test network.

### Ropsten

-   **Network ID:** 3
-   **ETHNET URL:** `https://ropsten.infura.io`

| Contract Name                                             | Last Deploy Date | Deployed Address                                                                                                              |
| --------------------------------------------------------- | ---------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| [OrderGateway](./contractsOrderGateway.sol)               | 07/31/19         | [0x8c8c650a4b794623402357df8956278f5333e002](https://ropsten.etherscan.io/address/0x8c8c650a4b794623402357df8956278f5333e002) |
| [AuthorizedAddresses](./contractsAuthorizedAddresses.sol) | 07/31/19         | [0x5281e5d8123e59857d99a78cbce96c021024ce46](https://ropsten.etherscan.io/address/0x5281e5d8123e59857d99a78cbce96c021024ce46) |
| [EventEmitter](./contractsEventEmitter.sol)               | 07/31/19         | [0x5e0aa07df76d4903766edf29ac2597ded90a9cda](https://ropsten.etherscan.io/address/0x5e0aa07df76d4903766edf29ac2597ded90a9cda) |
| [KosuToken](./contractsKosuToken.sol)                     | 07/31/19         | [0x99970336c078b5bebff7877d0b918937abe78633](https://ropsten.etherscan.io/address/0x99970336c078b5bebff7877d0b918937abe78633) |
| [Treasury](./contractsTreasury.sol)                       | 07/31/19         | [0x83bf1084c42f2e310a60406a1d8b0e518d26f497](https://ropsten.etherscan.io/address/0x83bf1084c42f2e310a60406a1d8b0e518d26f497) |
| [Voting](./contractsVoting.sol)                           | 07/31/19         | [0xd91175d24d25fc3a63a8fad9ae49a6ef381d37e3](https://ropsten.etherscan.io/address/0xd91175d24d25fc3a63a8fad9ae49a6ef381d37e3) |
| [PosterRegistry](./contractsPosterRegistry.sol)           | 07/31/19         | [0x339c8245af6a1bb23cb525a8c3b03639760ec006](https://ropsten.etherscan.io/address/0x339c8245af6a1bb23cb525a8c3b03639760ec006) |
| [ValidatorRegistry](./contractsValidatorRegistry.sol)     | 07/31/19         | [0x91a737e36a2cfd57f770971c7be9d33d4e790ed3](https://ropsten.etherscan.io/address/0x91a737e36a2cfd57f770971c7be9d33d4e790ed3) |
| [ZeroExV2SubContract](./contractsZeroExV2SubContract.sol) | 07/31/19         | [0xe853c58ad71d10ae85cb65bfce7707f11e358e8b](https://ropsten.etherscan.io/address/0xe853c58ad71d10ae85cb65bfce7707f11e358e8b) |

### Kosu Dev PoA

-   **Network ID:** 6174
-   **ETHNET URL:** `https://ethnet.zaidan.io/kosu`

| Contract Name                                             | Last Deploy Date | Deployed Address                           |
| --------------------------------------------------------- | ---------------- | ------------------------------------------ |
| [OrderGateway](./contractsOrderGateway.sol)               | 07/31/19         | 0xb8fda6341f80cbae987ab5cd00dce502097e3152 |
| [AuthorizedAddresses](./contractsAuthorizedAddresses.sol) | 07/31/19         | 0xe473109cb41c773fd2fe01e83c6e51356f9585d6 |
| [EventEmitter](./contractsEventEmitter.sol)               | 07/31/19         | 0x2f3afeff0914f33769cdfbf3fcf870c33b26c311 |
| [KosuToken](./contractsKosuToken.sol)                     | 07/31/19         | 0xcc868306d6188b2b12757a7c3926042b4d3c4e29 |
| [Treasury](./contractsTreasury.sol)                       | 07/31/19         | 0x46572f9082dd2429c2c138fa9483a67d4f29d423 |
| [Voting](./contractsVoting.sol)                           | 07/31/19         | 0x5d60c93d8b48682cd387c8be7e9461b67ecfbea1 |
| [PosterRegistry](./contractsPosterRegistry.sol)           | 07/31/19         | 0x7e6534b8205713246e91a14b462d2dbcac3ede17 |
| [ValidatorRegistry](./contractsValidatorRegistry.sol)     | 07/31/19         | 0x301bb008f2a8a3cae9918743fe43428551392773 |
| [ZeroExV2SubContract](./contractsZeroExV2SubContract.sol) | 07/31/19         | 0x0265e7d1b094787cb13174e18a1cefc41279a6c9 |
