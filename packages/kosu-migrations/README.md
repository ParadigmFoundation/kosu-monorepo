# Kosu Migrations

This repository contains the migrations necessary to initialize the Kosu contract system.

These contracts are **under active development and may change extensively at any time**.

## kosu-migrate cli utility

The `kosu-migrate` utility is included as a binary to the packages.

```
Options:
  --version            Show version number                             [boolean]
  --rpc-url            Full RPC url  [string] [default: "http://localhost:8545"]
  --force-fresh        Ensure the deploying address has no previous network
                       transactions                                    [boolean]
  --bond-tokens, -b    Bond tokens for available addresses             [boolean]
  --bond-only          Skip migrations and bond tokens                 [boolean]
  --ether-to-bond, -e  Value in ether to bond for all available addresses
                       (addresses with insufficient balance are skipped)
                                                          [number] [default: 60]
  -h, --help           Show help                                       [boolean]

```

## Deployed addresses

Below are the deployed addresses for the core Kosu protocol contract system on the Ropsten test network, as well as an internal test network.

### Ropsten

-   **Network ID:** 3
-   **ETHNET URL:** `https://ropsten.infura.io`

| Contract Name                                                                                    | Last Deploy Date | Deployed Address                                                                                                              |
| ------------------------------------------------------------------------------------------------ | ---------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| [OrderGateway](../kosu-system-contracts/contracts/external/OrderGateway.sol)                     | 09/12/19         | [0xe3c53988b77c2b3fd2b847719743bdb6e1e66843](https://ropsten.etherscan.io/address/0xe3c53988b77c2b3fd2b847719743bdb6e1e66843) |
| [AuthorizedAddresses](../kosu-system-contracts/contracts/access_control/AuthorizedAddresses.sol) | 09/12/19         | [0x93b79200cd23841371024427c39c5e4cd19957c9](https://ropsten.etherscan.io/address/0x93b79200cd23841371024427c39c5e4cd19957c9) |
| [EventEmitter](../kosu-system-contracts/contracts/event/EventEmitter.sol)                        | 09/12/19         | [0xd55dfe66deccbfdcd462098c6bda59666fd9dafe](https://ropsten.etherscan.io/address/0xd55dfe66deccbfdcd462098c6bda59666fd9dafe) |
| [KosuToken](../kosu-system-contracts/contracts/lib/KosuToken.sol)                                | 09/12/19         | [0x47f3bbc35acd3f8c5b2b8948c39f23f3c6e21f5a](https://ropsten.etherscan.io/address/0x47f3bbc35acd3f8c5b2b8948c39f23f3c6e21f5a) |
| [Treasury](../kosu-system-contracts/contracts/treasury/Treasury.sol)                             | 09/12/19         | [0x3a1d181217a5dad549d398a1c17490daecdda3b4](https://ropsten.etherscan.io/address/0x3a1d181217a5dad549d398a1c17490daecdda3b4) |
| [Voting](../kosu-system-contracts/contracts/voting/Voting.sol)                                   | 09/12/19         | [0x2442336571bb044f8793fcdff0d46f65d278e376](https://ropsten.etherscan.io/address/0x2442336571bb044f8793fcdff0d46f65d278e376) |
| [PosterRegistry](../kosu-system-contracts/contracts/poster/PosterRegistry.sol)                   | 09/12/19         | [0x510733f64b49a502c75e57c9f63bd8c9f49b542c](https://ropsten.etherscan.io/address/0x510733f64b49a502c75e57c9f63bd8c9f49b542c) |
| [ValidatorRegistry](../kosu-system-contracts/contracts/validator/ValidatorRegistry.sol)          | 09/12/19         | [0xf12a3c3728d86fcbe02d34a5dbf4bb3c7dd90351](https://ropsten.etherscan.io/address/0xf12a3c3728d86fcbe02d34a5dbf4bb3c7dd90351) |
| [ZeroExV2SubContract](../kosu-system-contracts/contracts/sub-contracts/ZeroExV2SubContract.sol)  | 09/12/19         | [0xb395b261f8256c91c143ef3f74c014def1de1f39](https://ropsten.etherscan.io/address/0xb395b261f8256c91c143ef3f74c014def1de1f39) |

### Kosu Dev PoA

-   **Network ID:** 6174
-   **ETHNET URL:** `https://ethnet.zaidan.io/kosu`

| Contract Name                                                                                    | Last Deploy Date | Deployed Address                           |
| ------------------------------------------------------------------------------------------------ | ---------------- | ------------------------------------------ |
| [OrderGateway](../kosu-system-contracts/contracts/external/OrderGateway.sol)                     | 09/17/19         | 0xb8fda6341f80cbae987ab5cd00dce502097e3152 |
| [AuthorizedAddresses](../kosu-system-contracts/contracts/access_control/AuthorizedAddresses.sol) | 09/17/19         | 0xe473109cb41c773fd2fe01e83c6e51356f9585d6 |
| [EventEmitter](../kosu-system-contracts/contracts/event/EventEmitter.sol)                        | 09/17/19         | 0x2f3afeff0914f33769cdfbf3fcf870c33b26c311 |
| [KosuToken](../kosu-system-contracts/contracts/lib/KosuToken.sol)                                | 09/17/19         | 0xcc868306d6188b2b12757a7c3926042b4d3c4e29 |
| [Treasury](../kosu-system-contracts/contracts/treasury/Treasury.sol)                             | 09/17/19         | 0x46572f9082dd2429c2c138fa9483a67d4f29d423 |
| [Voting](../kosu-system-contracts/contracts/voting/Voting.sol)                                   | 09/17/19         | 0x5d60c93d8b48682cd387c8be7e9461b67ecfbea1 |
| [PosterRegistry](../kosu-system-contracts/contracts/poster/PosterRegistry.sol)                   | 09/17/19         | 0x7e6534b8205713246e91a14b462d2dbcac3ede17 |
| [ValidatorRegistry](../kosu-system-contracts/contracts/validator/ValidatorRegistry.sol)          | 09/17/19         | 0x301bb008f2a8a3cae9918743fe43428551392773 |
| [ZeroExV2SubContract](../kosu-system-contracts/contracts/sub-contracts/ZeroExV2SubContract.sol)  | 09/17/19         | 0x0265e7d1b094787cb13174e18a1cefc41279a6c9 |

### Kosu CI Test

-   **Network ID:** 6175
-   **ETHNET URL:** `http://kosu-geth:8545`

| Contract Name                                                                                    | Last Deploy Date | Deployed Address                           |
| ------------------------------------------------------------------------------------------------ | ---------------- | ------------------------------------------ |
| [OrderGateway](../kosu-system-contracts/contracts/external/OrderGateway.sol)                     | 09/17/19         | 0xb8fda6341f80cbae987ab5cd00dce502097e3152 |
| [AuthorizedAddresses](../kosu-system-contracts/contracts/access_control/AuthorizedAddresses.sol) | 09/17/19         | 0xe473109cb41c773fd2fe01e83c6e51356f9585d6 |
| [EventEmitter](../kosu-system-contracts/contracts/event/EventEmitter.sol)                        | 09/17/19         | 0x2f3afeff0914f33769cdfbf3fcf870c33b26c311 |
| [KosuToken](../kosu-system-contracts/contracts/lib/KosuToken.sol)                                | 09/17/19         | 0xcc868306d6188b2b12757a7c3926042b4d3c4e29 |
| [Treasury](../kosu-system-contracts/contracts/treasury/Treasury.sol)                             | 09/17/19         | 0x46572f9082dd2429c2c138fa9483a67d4f29d423 |
| [Voting](../kosu-system-contracts/contracts/voting/Voting.sol)                                   | 09/17/19         | 0x5d60c93d8b48682cd387c8be7e9461b67ecfbea1 |
| [PosterRegistry](../kosu-system-contracts/contracts/poster/PosterRegistry.sol)                   | 09/17/19         | 0x7e6534b8205713246e91a14b462d2dbcac3ede17 |
| [ValidatorRegistry](../kosu-system-contracts/contracts/validator/ValidatorRegistry.sol)          | 09/17/19         | 0x301bb008f2a8a3cae9918743fe43428551392773 |
| [ZeroExV2SubContract](../kosu-system-contracts/contracts/sub-contracts/ZeroExV2SubContract.sol)  | 09/17/19         | 0x0265e7d1b094787cb13174e18a1cefc41279a6c9 |
