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

interface KosuOptions {
    provider?: provider;
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

interface Order {
    subContract: string;
    maker: string;
    makerValues: any;
    takerValues?: any;
    makerSignature?: any;
    arguments?: any;
    id: any;
    poster: string;
}

interface PostableOrder extends Order {
    posterSignature: string;
}

interface TakeableOrder extends Order {
    takerValues: any;
}

interface OrderArgument {
    name: string;
    datatype: string;
}

interface KosuUtils {
    toBytes32(value: string): number | string | BN;
    NULL_ADDRESS: string;
}

interface Signature {
    generate(web3: Web3, messageHex: string, signer: string): Promise<string>;
    validate(messageHex: string, signature: string, signer: string): boolean;
    recoverAddress(messageHex: any, signature: string): string;
    sign(web3: Web3, messageHex: string, signer: string): Promise<string>;
}

interface DecodedKosuLogArgs {}

interface LogWithDecodedKosuArgs<A, B> extends LogWithDecodedArgs<A> {
    event: string;
    args: A;
    decodedArgs: B;
}

interface OrderValidationResult {
    accepted: string[];
    rejected: OrderRejectionInfo[];
}

interface OrderRejectionInfo {
    order: string;
    reason: string;
}

interface Poster {
    balance: BigNumber;
    limit: number;
}

interface Validator {
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

interface RoundInfo {
    number: number;
    startsAt: number;
    endsAt: number;
    limit: number;
}
