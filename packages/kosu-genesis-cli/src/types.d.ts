export interface GenesisBlock {
    genesis_time: string;
    chain_id: string;
    validators: GenesisValidator[];
    app_hash: string;
    app_state: AppState;
}

export interface ConsensusParams {
    finality_threshold: number;
    period_limit: number;
    period_length: number;
    max_order_bytes: number;
    blocks_before_pruning: number;
}

export interface AppState {
    consensus_params: ConsensusParams;
    initial_validator_info: InitialValidatorInfo[];
    initial_poster_info: SnapshotPoster[];
    snapshot_block: number;
}

export interface InitialValidatorInfo {
    tendermint_address: string;
    ethereum_address: string;
    initial_stake: string;
}

export interface GenesisValidator {
    address: string;
    pub_key: {
        type: string;
        value: string;
    };
    power: string;
    name: string;
}

export interface SnapshotListing {
    publicKey: Buffer;
    ethAddress: string;
    details: string;
    stakeAmount?: string;
    status: "proposal" | "validator";
}

export interface SnapshotValidator extends SnapshotListing {
    stakeAmount: string;
    status: "validator";
}

export interface SnapshotPoster {
    address: string;
    balance: string;
}
