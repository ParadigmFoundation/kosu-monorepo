<center>
    <img src="https://storage.googleapis.com/kosu-general-storage/kosu_logo.png" width="150px" >
</center>

---

This monorepo contains the packages that make up the reference implementation of the Kosu protocol, alongside supporting packages.

_This README is under construction._

## Packages

### Client packages

| Package |Version|Description |
|-|-|-|
|[`kosu-core`](./packages/go-kosu)|![version](https://img.shields.io/badge/version-0.0.0-green.svg)|The reference implementation of the Kosu network in Go, built on Tendermint Core. |


### Contract packages

| Package |Version| Description |
|-|-|-|
|[`@kosu/system-contracts`](./packages/kosu-system-contracts)|![npm](https://img.shields.io/npm/v/@kosu/subcontract-sdk.svg)|The core Kosu contract system and test suite, implemented in Solidity.|
|[`@kosu/subcontract-sdk`](./packages/kosu-sdk-contracts)|![npm](https://img.shields.io/npm/v/@kosu/subcontract-sdk.svg)|The Kosu `SubContract` interface and example implementations.|

### Library packages

| Package |Version|Description |
|-|-|-|
|[`@kosu/kosu.js`](./packages/kosu.js)|![version](https://img.shields.io/badge/npm-v0.1.0-green.svg)|TypeScript library for interacting with the Kosu network and contract system.|

### Utility packages

| Package |Version|Description |
|-|-|-|
|[`@kosu/dev-images`](./packages/dev-images)|![version](https://img.shields.io/badge/npm-v0.0.1-green.svg)|Development docker images and supporting scripts for Kosu packages. |
|[`@kosu/tslint-config`](./packages/tslint-config)|![version](https://img.shields.io/badge/npm-v0.0.2-green.svg)|TypeScript linter base configuration for Kosu TypeScript projects. |
|[`@kosu/tsc-config`](./packages/tsc-config)|![version](https://img.shields.io/badge/npm-v0.0.1-green.svg)|TypeScript compiler base configuration for Kosu TypeScript projects. |

# License

Kosu is being developed as open source, public domain software (CC0). No rights reserved.


