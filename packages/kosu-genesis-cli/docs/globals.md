> **[Kosu genesis CLI](README.md)**

[Globals](globals.md) /

# Kosu genesis CLI

## Index

### Interfaces

* [AppState](interfaces/appstate.md)
* [ConsensusParams](interfaces/consensusparams.md)
* [GenesisBlock](interfaces/genesisblock.md)
* [GenesisValidator](interfaces/genesisvalidator.md)
* [InitialValidatorInfo](interfaces/initialvalidatorinfo.md)
* [SnapshotListing](interfaces/snapshotlisting.md)
* [SnapshotPoster](interfaces/snapshotposter.md)
* [SnapshotValidator](interfaces/snapshotvalidator.md)

### Variables

* [cli](globals.md#const-cli)

### Functions

* [dateFromTimestamp](globals.md#datefromtimestamp)
* [generateGenesisFromBlock](globals.md#generategenesisfromblock)
* [getAppState](globals.md#getappstate)
* [getInitialValidatorInfo](globals.md#getinitialvalidatorinfo)
* [getTendermintValidators](globals.md#gettendermintvalidators)
* [hexKeyToBase64](globals.md#hexkeytobase64)
* [publicKeyToAddress](globals.md#publickeytoaddress)
* [snapshotPostersAtBlock](globals.md#snapshotpostersatblock)
* [snapshotValidatorsAtBlock](globals.md#snapshotvalidatorsatblock)

## Variables

### `Const` cli

• **cli**: *`Command`* =  new commander.Command()

Defined in cli/cli.ts:3

## Functions

###  dateFromTimestamp

▸ **dateFromTimestamp**(`timestamp`: number): *`Date`*

Defined in functions.ts:265

Return a `Date` object generated from a Unix timestamp in seconds.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`timestamp` | number | A Unix timestamp (in seconds). |

**Returns:** *`Date`*

The JavaScript Date object corresponding to that Unix time.

___

###  generateGenesisFromBlock

▸ **generateGenesisFromBlock**(`kosu`: `Kosu`, `chainId`: string, `snapshotBlock`: number, `startTime`: number, `consensusParams`: [ConsensusParams](interfaces/consensusparams.md)): *`Promise<GenesisBlock>`*

Defined in functions.ts:18

Generate a Tendermint genesis file for a Kosu network, where the initial validators
are set based on the current state of a deployed Kosu contract system's
ValidatorRegistry contract, at a specified block height.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`kosu` | `Kosu` | An initialized kosu.js instance. |
`chainId` | string | The desired Kosu chain ID for the Tendermint blockchain. |
`snapshotBlock` | number | The block at which to export contract system state. |
`startTime` | number | The desired genesis time and network start time (Unix timestamp). |
`consensusParams` | [ConsensusParams](interfaces/consensusparams.md) | Network-specific consensus parameters agreed upon prior to genesis. |

**Returns:** *`Promise<GenesisBlock>`*

Promise resolving to object that can be JSON-serialized to a Kosu/Tendermint genesis file.

___

###  getAppState

▸ **getAppState**(`validators`: [SnapshotValidator](interfaces/snapshotvalidator.md)[], `posters`: [SnapshotPoster](interfaces/snapshotposter.md)[], `snapshotBlock`: number, `consensusParameters`: [ConsensusParams](interfaces/consensusparams.md)): *`Promise<AppState>`*

Defined in functions.ts:81

Constructs the `app_state` genesis field, where the following initial states
are gathered or set, from re-processed Ethereum blockchain event logs, or from
CLI input.

- `initial_validator_info`: Set to match state with active validators at snapshot height
- `initial_poster_info`: Set to match PosterRegistry contract  state at snapshot height
- `snapshot_block`: The Ethereum block height at which contract system state should be exported
- `consensus_params`: Consensus critical parameters, such as:
     - `finality_threshold`: How old Ethereum events must be before state changes can be applied
     - `period_limit`: Number of orders to be accepted per period (allocated to posters)
     - `period_length`: The length of each rebalance period (in Ethereum blocks)
     - `max_order_bytes`: Maximum size of an order message (protobuf-encoded transaction length)
     - `blocks_before_pruning`: Maximum age of attestations before accepted and pending attestations are cleared

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`validators` | [SnapshotValidator](interfaces/snapshotvalidator.md)[] | Validators from ValidatorRegistry TCR snapshot. |
`posters` | [SnapshotPoster](interfaces/snapshotposter.md)[] | Posters from PosterRegistry snapshot. |
`snapshotBlock` | number | The Ethereum block used to generate validator and poster snapshot. |
`consensusParameters` | [ConsensusParams](interfaces/consensusparams.md) | Consensus parameters to set in genesis.  |

**Returns:** *`Promise<AppState>`*

___

###  getInitialValidatorInfo

▸ **getInitialValidatorInfo**(`validators`: [SnapshotValidator](interfaces/snapshotvalidator.md)[]): *`Promise<InitialValidatorInfo[]>`*

Defined in functions.ts:237

Convert the validator snapshot data to the JSON format expected by the Kosu
client.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`validators` | [SnapshotValidator](interfaces/snapshotvalidator.md)[] | Raw validator snapshot data. |

**Returns:** *`Promise<InitialValidatorInfo[]>`*

Promise resolving to the array of initial validators as expected by `initial_validator_info`.

___

###  getTendermintValidators

▸ **getTendermintValidators**(`validators`: [SnapshotValidator](interfaces/snapshotvalidator.md)[]): *`Promise<GenesisValidator[]>`*

Defined in functions.ts:212

Convert the validator snapshot data to the JSON format expected by Tendermint.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`validators` | [SnapshotValidator](interfaces/snapshotvalidator.md)[] | Raw validator snapshot data. |

**Returns:** *`Promise<GenesisValidator[]>`*

Promise resolving to Tendermint-style genesis validator JSON.

___

###  hexKeyToBase64

▸ **hexKeyToBase64**(`publicKey`: string): *string*

Defined in functions.ts:255

Convert a 0x-prefixed hex-encoded public key string to a base64-encoded string.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`publicKey` | string | 0x-prefixed hex-encoded public key string. |

**Returns:** *string*

The base64-encoded string representation of the public key.

___

###  publicKeyToAddress

▸ **publicKeyToAddress**(`publicKey`: `Buffer`): *string*

Defined in functions.ts:199

Convert a Tendermint public key to a Tendermint address (also called node ID).

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`publicKey` | `Buffer` | Tendermint 32-byte public key buffer. |

**Returns:** *string*

The corresponding Tendermint address string.

___

###  snapshotPostersAtBlock

▸ **snapshotPostersAtBlock**(`kosu`: `Kosu`, `snapshotBlock`: number): *`Promise<SnapshotPoster[]>`*

Defined in functions.ts:169

Generate a "snapshot" of the PosterRegistry contract state (all posters) by
re-playing `PosterRegistryUpdate` events from the Kosu EventEmitter contract.

The resulting array contains the address and balance of each account at the
specified snapshot block.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`kosu` | `Kosu` | An initialized kosu.js instance. |
`snapshotBlock` | number | The Ethereum block at which to stop replaying past event logs. |

**Returns:** *`Promise<SnapshotPoster[]>`*

Promise resolving to snapshot poster info (see type definition).

___

###  snapshotValidatorsAtBlock

▸ **snapshotValidatorsAtBlock**(`kosu`: `Kosu`, `snapshotBlock`: number): *`Promise<SnapshotValidator[]>`*

Defined in functions.ts:108

Generate a "snapshot" of the ValidatorRegistry TCR contract state (specifically,
only the listings designated validators at the snapshot block) by re-playing
all `ValidatorRegistryUpdate` events from the Kosu EventEmitter contract.

The resulting array contains the Ethereum address, Tendermint public key, and
initial staked-balances (used to calculate vote power) of all listings designated
as validators at the specified `snapshotBlock`.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`kosu` | `Kosu` | An initialized kosu.js instance. |
`snapshotBlock` | number | The Ethereum block at which to stop replaying past event logs. |

**Returns:** *`Promise<SnapshotValidator[]>`*

Promise resolving to array of snapshot validator data (see type definition).