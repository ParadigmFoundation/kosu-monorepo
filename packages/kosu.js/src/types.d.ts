interface KosuOptions {
    provider?: provider;
    networkId?: number | string;
    web3?: Web3;
    web3Wrapper?: Web3Wrapper;
    orderStreamURL?: string;
    votingAddress?: string;
    treasuryAddress?: string;
    kosuTokenAddress?: string;
    eventEmitterAddress?: string;
    orderGatewayAddress?: string;
    posterRegistryProxyAddress?: string;
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
