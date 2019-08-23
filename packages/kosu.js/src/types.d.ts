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

interface LogWithDecodedKosuArgs<A, B> extends LogWithDecodedArgs {
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
