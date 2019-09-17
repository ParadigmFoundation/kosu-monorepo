import assert from "assert";
import { Command } from "commander";

import { ConsensusParams } from "../types";

export function loadConsensusParameters(program: Command): ConsensusParams {
    const {
        finalityThreshold,
        periodLimit,
        periodLength,
        maxOrderBytes,
        confirmationThreshold,
        blocksBeforePruning,
    } = program;
    return {
        finality_threshold: parseInt(finalityThreshold, 10),
        period_limit: parseInt(periodLimit, 10),
        period_length: parseInt(periodLength, 10),
        max_order_bytes: parseInt(maxOrderBytes, 10),
        confirmation_threshold: parseInt(confirmationThreshold, 10),
        blocks_before_pruning: parseInt(blocksBeforePruning, 10),
    };
}

export function validateOptions(program: Command): void {
    const { chainId, providerUrl, snapshotBlock, startTime } = program;

    assert(chainId, "The chain ID is required (-n or --chain-id)");
    assert(snapshotBlock, "Snapshot block is required (-b or --snapshot-block)");
    assert(startTime, "Start Unix timestamp is required (-b or --snapshot-block)");
    assert(providerUrl, "A HTTP Ethereum JSONRPC provider must be specified (-p or --provider-url)");
}
