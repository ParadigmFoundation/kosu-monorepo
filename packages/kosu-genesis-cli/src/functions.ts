import { Kosu } from "@kosu/kosu.js";
import { createHash } from "crypto";

import {
    AppState,
    ConsensusParams,
    GenesisBlock,
    GenesisValidator,
    InitialValidatorInfo,
    SnapshotListing,
    SnapshotPoster,
    SnapshotValidator,
} from "./types";

/**
 * Generate a Tendermint genesis file for a Kosu network, where the initial validators
 * are set based on the current state of a deployed Kosu contract system's
 * ValidatorRegistry contract, at a specified block height (specified in the
 * consensus parameters).
 *
 * @param kosu An initialized kosu.js instance.
 * @param chainId The desired Kosu chain ID for the Tendermint blockchain.
 * @param startTime The desired genesis time and network start time (Unix timestamp).
 * @param consensusParams Network-specific consensus parameters agreed upon prior to genesis.
 * @returns Promise resolving to object that can be JSON-serialized to a Kosu/Tendermint genesis file.
 */
export async function generateGenesisFromBlock(
    kosu: Kosu,
    chainId: string,
    startTime: number,
    consensusParams: ConsensusParams,
): Promise<GenesisBlock> {
    const genesis: Partial<GenesisBlock> = {};

    // load snapshot block, and assert it is present
    const { snapshot_block: snapshotBlock } = consensusParams;
    if (typeof snapshotBlock !== "number" || snapshotBlock < 0) {
        throw new Error("invalid snapshot block: must be present and equal to or greater than 0");
    }

    // generate a snapshot of the ValidatorRegistry contract at a specific block
    // - resulting array contains validators elected at the snapshot block
    // - contains information used to associate the owner's address and their validating key pair
    // - further updates handled by the witness and Ethereum peg-zone
    const validators = await snapshotValidatorsAtBlock(kosu, snapshotBlock);

    // generate snapshot of PosterRegistry contract by replaying poster update events;
    const posters = await snapshotPostersAtBlock(kosu, snapshotBlock);

    // the time at which the genesis block is produced and further block production begins
    // - used by tendermint to synchronize chain start
    genesis.genesis_time = dateFromTimestamp(startTime).toISOString();

    // tendermint-specific chain ID, agreed upon prior to network deployment
    genesis.chain_id = chainId;

    // tendermint-specific validator representation
    // - generated from contract system snapshot
    // - directly associated with app_state.initial_validator_info
    genesis.validators = getTendermintValidators(validators);

    // the initial app state is set to null, expected as an empty string
    genesis.app_hash = "";

    // genesis app state sets the following
    // - consensus parameters (finality threshold, max order size, period length, etc.)
    // - initial validator info generated from contract system state
    // - initial poster info generated from contract system state
    // - snapshot block: the Ethereum block at which contract system state "snap-shotted"
    genesis.app_state = getAppState(validators, posters, consensusParams);

    return genesis as GenesisBlock;
}

/**
 * Constructs the `app_state` genesis field, where the following initial states
 * are gathered or set, from re-processed Ethereum blockchain event logs, or from
 * CLI input.
 *
 * - `initial_validator_info`: Set to match state with active validators at snapshot height
 * - `initial_poster_info`: Set to match PosterRegistry contract  state at snapshot height
 * - `snapshot_block`: The Ethereum block height at which contract system state should be exported
 * - `consensus_params`: Consensus critical parameters, such as:
 *      - `finality_threshold`: How old Ethereum events must be before state changes can be applied
 *      - `period_limit`: Number of orders to be accepted per period (allocated to posters)
 *      - `period_length`: The length of each rebalance period (in Ethereum blocks)
 *      - `max_order_bytes`: Maximum size of an order message (protobuf-encoded transaction length)
 *      - `blocks_before_pruning`: Maximum age of attestations before accepted and pending attestations are cleared
 *      - `orders_limit`: The maximum size of the in-state order list.
 *      - `snapshot_block`: The height of the Ethereum blockchain at which a snapshot was taken.
 *
 * @param validators Validators from ValidatorRegistry TCR snapshot.
 * @param posters Posters from PosterRegistry snapshot.
 * @param consensusParameters Consensus parameters to set in genesis (incl. snapshot block).
 */
export function getAppState(
    validators: SnapshotValidator[],
    posters: SnapshotPoster[],
    consensusParameters: ConsensusParams,
): AppState {
    return {
        initial_validator_info: getInitialValidatorInfo(validators),
        initial_poster_info: posters,
        consensus_params: consensusParameters,
    };
}

/**
 * Generate a "snapshot" of the ValidatorRegistry TCR contract state (specifically,
 * only the listings designated validators at the snapshot block) by re-playing
 * all `ValidatorRegistryUpdate` events from the Kosu EventEmitter contract.
 *
 * The resulting array contains the Ethereum address, Tendermint public key, and
 * initial staked-balances (used to calculate vote power) of all listings designated
 * as validators at the specified `snapshotBlock`.
 *
 * @param kosu An initialized kosu.js instance.
 * @param snapshotBlock The Ethereum block at which to stop replaying past event logs.
 * @returns Promise resolving to array of snapshot validator data (see type definition).
 */
export async function snapshotValidatorsAtBlock(kosu: Kosu, snapshotBlock: number): Promise<SnapshotValidator[]> {
    const listings: { [key: string]: SnapshotListing } = {};
    const validators: SnapshotValidator[] = [];

    // get all events from deploy to snapshot block
    const allLogs = await kosu.eventEmitter.getPastDecodedLogs({
        fromBlock: 0,
        toBlock: snapshotBlock,
    });

    for (const log of allLogs) {
        const { decodedArgs } = log;
        switch (decodedArgs.eventType) {
            case "ValidatorRegistered": {
                const { owner, details, tendermintPublicKeyHex } = decodedArgs;
                listings[tendermintPublicKeyHex] = {
                    ethAddress: owner,
                    details,
                    publicKey: Buffer.from(tendermintPublicKeyHex.slice(2), "hex"),
                    status: "proposal",
                };
                break;
            }
            case "ValidatorRegistryUpdate": {
                const { stake, tendermintPublicKeyHex } = decodedArgs;

                // remove validator if stake set to 0
                if (stake === "0") {
                    delete listings[tendermintPublicKeyHex];
                    break;
                }

                listings[tendermintPublicKeyHex].stakeAmount = stake;
                listings[tendermintPublicKeyHex].status = "validator";
                break;
            }
            default:
                continue;
        }
    }

    // form output array with only validators
    for (const listingKey of Object.keys(listings)) {
        const listing = listings[listingKey];
        if (listing.status === "validator") {
            validators.push(listing as SnapshotValidator);
        }
    }
    return validators;
}

/**
 * Generate a "snapshot" of the PosterRegistry contract state (all posters) by
 * re-playing `PosterRegistryUpdate` events from the Kosu EventEmitter contract.
 *
 * The resulting array contains the address and balance of each account at the
 * specified snapshot block.
 *
 * @param kosu An initialized kosu.js instance.
 * @param snapshotBlock The Ethereum block at which to stop replaying past event logs.
 * @returns Promise resolving to snapshot poster info (see type definition).
 */
export async function snapshotPostersAtBlock(kosu: Kosu, snapshotBlock: number): Promise<SnapshotPoster[]> {
    const posters: SnapshotPoster[] = [];
    const postersMap: { [address: string]: SnapshotPoster } = {};

    // get all events from deploy to snapshot block
    const allLogs = await kosu.eventEmitter.getPastDecodedLogs({
        fromBlock: 0,
        toBlock: snapshotBlock,
    });

    for (const log of allLogs) {
        const { decodedArgs } = log;
        switch (decodedArgs.eventType) {
            case "PosterRegistryUpdate": {
                const { poster: address, stake: balance } = decodedArgs;

                if (balance === "0") {
                    delete posters[address];
                }

                if (!postersMap[address]) {
                    (postersMap[address] as Partial<SnapshotPoster>) = {
                        ethereum_address: address,
                    };
                }
                postersMap[address].balance = balance;
                break;
            }
            default:
                continue;
        }
    }

    for (const posterAddress of Object.keys(postersMap)) {
        posters.push(postersMap[posterAddress]);
    }

    return posters;
}

/**
 * Convert a Tendermint public key to a Tendermint address (also called node ID).
 *
 * @param publicKey Tendermint 32-byte public key buffer.
 * @returns The corresponding Tendermint address string.
 */
export function publicKeyToAddress(publicKey: Buffer): string {
    const digest = createHash("sha256");
    const hash = digest.update(publicKey).digest();
    const address = hash
        .slice(0, 20)
        .toString("hex")
        .toUpperCase();
    return address;
}

/**
 * Convert the validator snapshot data to the JSON format expected by Tendermint.
 *
 * @param validators Raw validator snapshot data.
 * @returns Tendermint-style genesis validator JSON.
 */
export function getTendermintValidators(validators: SnapshotValidator[]): GenesisValidator[] {
    const genesisValidators: GenesisValidator[] = [];
    for (const validator of validators) {
        genesisValidators.push({
            address: publicKeyToAddress(validator.publicKey),
            pub_key: {
                type: "tendermint/PubKeyEd25519",
                value: validator.publicKey.toString("base64"),
            },
            name: parseMonikerFromDetails(validator.details),
            power: "1",
        });
    }
    return genesisValidators;
}

/**
 * Allows parsing a moniker from a string that uses two types of separators to
 * store key-value pairs in a plain string.
 *
 * This method will return a moniker, if found, within a provided string (see
 * below), otherwise it will return the input string.
 *
 * @param details The input string with potential key-value pairs encoded.
 * @param itemSeparator Separator to use between key-value pairs.
 * @param valueSeparator Separator to use between key and value.
 * @returns The value corresponding to the `moniker` key if found, otherwise the input string.
 * @example
 * ```typescript
 * const stringWithMoniker = "website=https://example.com,moniker=alice"
 * console.log(parseMonikerFromDetails(stringWithMoniker)) // > "alice"
 *
 * const stringWithoutMoniker = "an ordinary string with no keys"
 * console.log(parseMonikerFromDetails(stringWithoutMoniker)) // > "an ordinary string with no keys"
 * ```
 */
export function parseMonikerFromDetails(
    details: string,
    itemSeparator: string = ",",
    valueSeparator: string = "=",
): string {
    const kvs = details.split(itemSeparator);

    // if no object pattern is detected, just use full details
    if (kvs.length < 2 || kvs.length % 2 !== 0) {
        return details;
    }

    for (const kv of kvs) {
        const [key, value] = kv.split(valueSeparator);
        if (key === "moniker" && value) {
            return value;
        }
    }

    // if false positive for conventional detail syntax or no moniker, use full details
    return details;
}

/**
 * Convert the validator snapshot data to the JSON format expected by the Kosu
 * client.
 *
 * @param validators Raw validator snapshot data.
 * @returns The array of initial validators as expected by `initial_validator_info`.
 */
export function getInitialValidatorInfo(validators: SnapshotValidator[]): InitialValidatorInfo[] {
    const initialValidatorInfo: InitialValidatorInfo[] = [];
    for (const validator of validators) {
        initialValidatorInfo.push({
            ethereum_address: validator.ethAddress,
            initial_stake: validator.stakeAmount,
            tendermint_address: publicKeyToAddress(validator.publicKey),
        });
    }
    return initialValidatorInfo;
}

/**
 * Convert a 0x-prefixed hex-encoded public key string to a base64-encoded string.
 *
 * @param publicKey 0x-prefixed hex-encoded public key string.
 * @returns The base64-encoded string representation of the public key.
 */
export function hexKeyToBase64(publicKey: string): string {
    return Buffer.from(publicKey.slice(2), "hex").toString("base64");
}

/**
 * Return a `Date` object generated from a Unix timestamp in seconds.
 *
 * @param timestamp A Unix timestamp (in seconds).
 * @returns The JavaScript Date object corresponding to that Unix time.
 */
export function dateFromTimestamp(timestamp: number): Date {
    return new Date(timestamp * 1000);
}
