# Usage guide

This guide covers installation of the `go-kosu` binaries:
- `kosud`: Kosu ABCI application implementation, [witness](), Tendermint core, and optional RPC server.
- `kosu-cli`: CLI for `kosud` providing state query methods and certain validator functions.

Additionally, instructions for the following usage scenarios are included:
- Development network (single-node, no contract snapshot).
- Development network with snapshot contract state.
- Existing network from provided genesis (mainnet or test-network).
- Existing network from contract system snapshot (mainnet or test-network).
- New network from contract snapshot (mainnet or test-network).

## A note on validators

Validator configuration from the perspective of configuring the underlying full node
process (`kosud`) is identical; the only difference between a full node and a validating full node is the inclusion (or lack thereof) of the node's public key in the active Tendermint validator set.

For Kosu, this set is determined by the Kosu contract system, deployed on the Ethereum blockchain. To set up a validator, you must first configure a full node, then apply to the registry on-chain. If KOSU token holders approve your application, your full node will automatically become a validator when the peg-zone applies the registry state transition to the Kosu state.

[Follow this guide to apply to a Kosu ValidatorRegistry.]()

**Warning:** Registering a main-network Kosu validator node requires locking tokens (staking) which may be confiscated if your listing is successfully challenged during the application process, or while it is in the set of active validators. [Read more about the validator selection and curation process here.](https://docs.kosu.io/overview/validator-curation.html)