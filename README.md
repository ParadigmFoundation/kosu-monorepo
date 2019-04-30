# ![img](https://storage.googleapis.com/kosu-system-contracts-ganache-db/kosu-logo.png)

This monorepo contains the packages that make up the reference impelementation of the Kosu protocol, alongside supporting packages.

_This README is under construction._

## Packages

### Client packages

| Package |Version|Description |
|-|-|-|
|[`go-kosu`](./packages/go-kosu)|![version](https://img.shields.io/badge/version-0.0.0-green.svg)|The reference implementation of the Kosu network, built on Tendermint Core. |


### Contract packages

| Package |Version| Description |
|-|-|-|
|[`@kosu/system-contracts`](./packages/kosu-system-contracts)|![npm](https://img.shields.io/npm/v/@kosu/subcontract-sdk.svg)|The core Kosu contract system and test suite, implemented in Solidity.|
|[`@kosu/subcontract-sdk`](./packages/kosu-sdk-contracts)|![npm](https://img.shields.io/npm/v/@kosu/subcontract-sdk.svg)|The Kosu `SubContract` interface and example implementations.|

### Utility packages

| Package |Version|Description |
|-|-|-|
|[`@kosu/kosu.js`](./packages/kosu.js)|![version](https://img.shields.io/badge/npm-v0.1.0-green.svg)|TypeScript library for interacting with the Kosu network and contract system.|
|[`@kosu/dev-images`](./packages/dev-images)|![version](https://img.shields.io/badge/npm-v0.0.1-green.svg)|Development and CI docker images and supporting scripts for Kosu packages. |
|[`@kosu/tslint-config`](./packages/tslint-config)|![version](https://img.shields.io/badge/npm-v0.0.2-green.svg)|TypeScript linter base configuration for Kosu TypeScript projects. |
|[`@kosu/tsc-config`](./packages/tsc-config)|![version](https://img.shields.io/badge/npm-v0.0.1-green.svg)|TypeScript compiler base configuration for Kosu TypeScript projects. |
