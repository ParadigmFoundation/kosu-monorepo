<center>
    <img src="https://storage.googleapis.com/kosu-general-storage/kosu_logo.png" width="150px" >
</center>

---

This monorepo contains the packages that implement the Kosu protocol, alongside supporting packages and developer tooling.

## Packages

### Contract packages

Smart-contract packages (Solidity) including the core Kosu system contracts and SubContract SDK.

| Package &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;            | Version                                                        | Description                                                            |
| :----------------------------------------------------------- | :------------------------------------------------------------- | :--------------------------------------------------------------------- |
| [`@kosu/system-contracts`](./packages/kosu-system-contracts) | ![npm](https://img.shields.io/npm/v/@kosu/subcontract-sdk.svg) | The core Kosu contract system and test suite, implemented in Solidity. |
| [`@kosu/subcontract-sdk`](./packages/kosu-sdk-contracts)     | ![npm](https://img.shields.io/npm/v/@kosu/subcontract-sdk.svg) | The Kosu `SubContract` interface and example implementations.          |

### Library packages

Client/server libraries for interacting with the Kosu network and contract system.

| Package &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; | Version                                                | Description                                                                   |
| :------------------------------------------------ | :----------------------------------------------------- | :---------------------------------------------------------------------------- |
| [`@kosu/kosu.js`](./packages/kosu.js)             | ![npm](https://img.shields.io/npm/v/@kosu/kosu.js.svg) | TypeScript library for interacting with the Kosu network and contract system. |

### Client packages

| Package                           | Version                                                          | Description                                                                       |
| :-------------------------------- | :--------------------------------------------------------------- | :-------------------------------------------------------------------------------- |
| [`kosu-core`](./packages/go-kosu) | ![version](https://img.shields.io/badge/version-0.0.0-green.svg) | The reference implementation of the Kosu network in Go, built on Tendermint Core. |

### Utility/development packages

| Package &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; | Version                                                      | Description                                                          |
| :------------------------------------------------ | :----------------------------------------------------------- | :------------------------------------------------------------------- |
| [`@kosu/dev-images`](./packages/dev-images)       | ![npm](https://img.shields.io/npm/v/@kosu/dev-images.svg)    | Development docker images and supporting scripts for Kosu packages.  |
| [`@kosu/tslint-config`](./packages/tslint-config) | ![npm](https://img.shields.io/npm/v/@kosu/tslint-config.svg) | TypeScript linter base configuration for Kosu TypeScript projects.   |
| [`@kosu/tsc-config`](./packages/tsc-config)       | ![npm](https://img.shields.io/npm/v/@kosu/tsc-config.svg)    | TypeScript compiler base configuration for Kosu TypeScript projects. |
| [`@kosu/web-helpers`](./packages/web-helpers)     | ![npm](https://img.shields.io/npm/v/@kosu/web-helpers.svg)   | Simple web interface for interacting with the Kosu contract system.  |

# License

Kosu is being developed as free open-source software under an [MIT license.](./LICENSE)
