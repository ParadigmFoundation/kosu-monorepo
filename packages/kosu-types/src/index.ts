import { BigNumber } from "@0x/utils";
import { Web3Wrapper } from "@0x/web3-wrapper";
import {
    AuthorizedAddressesContract,
    BasicTradeSubContractContract,
    EventEmitterContract,
    KosuTokenContract,
    OrderGatewayContract,
    PosterRegistryContract,
    TreasuryContract,
    ValidatorRegistryContract,
    VotingContract,
    ZeroExV2SubContractContract,
} from "@kosu/system-contracts";
import BN from "bn.js";
import { LogWithDecodedArgs, TransactionReceipt } from "ethereum-types";
import Web3 from "web3";
import { Provider } from "web3/providers";

export interface MigratedContracts {
    orderGateway: OrderGatewayContract;
    eventEmitter: EventEmitterContract;
    treasury: TreasuryContract;
    authorizedAddresses: AuthorizedAddressesContract;
    kosuToken: KosuTokenContract;
    validatorRegistry: ValidatorRegistryContract;
    voting: VotingContract;
    posterRegistry: PosterRegistryContract;
    zeroExV2SubContract: ZeroExV2SubContractContract;
}

export interface MigratedTestContracts extends MigratedContracts {
    basicTradeSubContract?: BasicTradeSubContractContract;
}

export interface Listing {
    status: number;
    stakedBalance: BigNumber;
    applicationBlock: BigNumber;
    confirmationBlock: BigNumber;
    exitBlock: BigNumber;
    rewardRate: BigNumber;
    lastRewardBlock: BigNumber;
    tendermintPublicKey: string;
    owner: string;
    currentChallenge: BigNumber;
    details: string;
}

export interface Challenge {
    listingKey: string;
    challenger: string;
    voterTotal: BigNumber;
    balance: BigNumber;
    pollId: BigNumber;
    challengeEnd: BigNumber;
    finalized: boolean;
    passed: boolean;
    details: string;
    listingSnapshot: Listing;
}

export interface PrettyListing {
    stakedBalance: string;
    applicationBlock: string;
    confirmationBlock: string;
    exitBlock: string;
    rewardRate: string;
    lastRewardBlock: string;
    currentChallenge: string;
}

export interface KosuOptions {
    provider?: Provider;
    networkId?: number | string;
    web3?: Web3;
    web3Wrapper?: Web3Wrapper;
    kosuNodeUrl?: string;
    votingAddress?: string;
    treasuryAddress?: string;
    kosuTokenAddress?: string;
    eventEmitterAddress?: string;
    orderGatewayAddress?: string;
    posterRegistryAddress?: string;
    validatorRegistryAddress?: string;
}

export interface Order {
    subContract: string;
    maker: string;
    makerValues: any;
    takerValues?: any;
    makerSignature?: any;
    arguments?: any;
    id: any;
    poster: string;
}

export interface PostableOrder extends Order {
    posterSignature: string;
}

export interface TakeableOrder extends Order {
    takerValues: any;
}

export interface OrderArgument {
    name: string;
    datatype: string;
}

export interface KosuUtils {
    toBytes32(value: string): number | string | BN;
    NULL_ADDRESS: string;
}

export interface Signature {
    generate(web3: Web3, messageHex: string, signer: string): Promise<string>;
    validate(messageHex: string, signature: string, signer: string): boolean;
    recoverAddress(messageHex: any, signature: string): string;
    sign(web3: Web3, messageHex: string, signer: string): Promise<string>;
}

export interface DecodedKosuLogArgs {
    eventType: string;
    owner?: string;
    details?: string;
    poster?: string;
    tendermintPublicKeyHex?: string;
    stake?: string;
}

export interface LogWithDecodedKosuArgs<A, B> extends LogWithDecodedArgs<A> {
    event: string;
    args: A;
    decodedArgs: B;
}

export interface OrderValidationResult {
    accepted: string[];
    rejected: OrderRejectionInfo[];
}

export interface OrderRejectionInfo {
    order: string;
    reason: string;
}

export interface Poster {
    balance: BigNumber;
    limit: number;
}

export interface Validator {
    balance: BigNumber;
    power: number;
    publicKey: string;
    firstVote: number;
    lastVoted: number;
    lastProposed: number;
    totalVotes: number;
    active: number;
    applied: number;
}

export interface RoundInfo {
    number: number;
    startsAt: number;
    endsAt: number;
    limit: number;
}

export interface KosuDeploymentReceipts {
    OrderGateway: TransactionReceipt;
    AuthorizedAddresses: TransactionReceipt;
    EventEmitter: TransactionReceipt;
    KosuToken: TransactionReceipt;
    Treasury: TransactionReceipt;
    Voting: TransactionReceipt;
    PosterRegistry: TransactionReceipt;
    ValidatorRegistry: TransactionReceipt;
    ZeroExV2SubContract: TransactionReceipt;
}

export interface KosuAddresses {
    OrderGateway: string;
    AuthorizedAddresses: string;
    EventEmitter: string;
    KosuToken: string;
    Treasury: string;
    Voting: string;
    PosterRegistry: string;
    ValidatorRegistry: string;
    ZeroExV2SubContract: string;
}

export interface KosuDeployments {
    [key: string]: KosuDeploymentReceipts;
}

/**
 * Type definition for a Tendermint-produced Kosu block.
 */
export interface KosuBlock {
    header: KosuBlockHeader;
    data: KosuBlockData;
    evidence: KosuBlockEvidence;
    last_commit: KosuLastCommitData;
}

export interface KosuBlockHeader {
    version: KosuHeaderVersion;
    chainId: string;
    height: number;
    time: string;
    numTxs: number;
    totalTxs: number;
    lastBlockId: BlockId;
    lastCommitHash: string;
    dataHash: string;
    validatorsHash: string;
    nextValidatorsHash: string;
    consensusHash: string;
    appHash: string;
    lastResultsHash: string;
    evidenceHash: string;
    proposerAddress: string;
}

export interface KosuHeaderVersion {
    block: number;
    app: number;
}

export interface BlockId {
    hash: string;
    parts: BlockIdParts;
}

export interface BlockIdParts {
    total: number;
    hash: string;
}

export interface KosuBlockData {
    txs: string[] | null;
}

export interface KosuBlockEvidence {
    evidence: any[] | null;
}

export interface KosuLastCommitData {
    precommits: PreCommit[] | null;
    blockId: BlockId;
}

export interface PreCommit {
    type: number;
    height: number;
    round: number;
    blockId: BlockId;
    timestamp: string;
    validatorAddress: string;
    validatorIndex: number;
    signature: string;
}
