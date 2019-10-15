# Kosu System Contracts

This repository contains the contract system that implements the Kosu protocol, in conjunction with `go-kosu`.

These contracts support the inner workings of the Kosu network, including validator governance, poster access control, and general economic coordination.

These contracts are **under active development and may change extensively at any time**.

-   [OrderGateway](./docs/OrderGateway.md) ([source](./contracts/external/OrderGateway.sol))
-   [AuthorizedAddresses](./docs/AuthorizedAddresses.md) ([source](./contracts/access_control/AuthorizedAddresses.sol))
-   [EventEmitter](./docs/EventEmitter.md) ([source](./contracts/event/EventEmitter.sol))
-   [KosuToken](./docs/KosuToken.md) ([source](./contracts/lib/KosuToken.sol))
-   [Treasury](./docs/Treasury.md) ([source](./contracts/treasury/Treasury.sol))
-   [Voting](./docs/Voting.md) ([source](./contracts/voting/Voting.sol))
-   [PosterRegistry](./docs/PosterRegistry.md) ([source](./contracts/poster/PosterRegistry.sol))
-   [ValidatorRegistry](./docs/ValidatorRegistry.md) ([source](./contracts/validator/ValidatorRegistry.sol))
-   [ZeroExV2SubContract](./docs/ZeroExV2SubContract.md) ([source](./contracts/sub-contracts/ZeroExV2SubContract.sol))
