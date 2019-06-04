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
    makerSignature: any;
    makerArguments?: any;
    takerArguments?: any;
    id: any;
    poster: string;
}

interface PostableOrder extends Order {
    posterSignature: { v: any; s: any; r: any };
}

interface OrderArgument {
    name: string;
    dataType: string;
}

interface SignatureVRS {
    v: number;
    r: Buffer | Uint8Array;
    s: Buffer | Uint8Array;
}

interface KosuUtils {
    toBytes32(value: string): number | string | BN;
    NULL_ADDRESS: string;
}

interface DecodedKosuLogArgs {}

interface LogWithDecodedKosuArgs<A, B> extends LogWithDecodedArgs {
    event: string;
    args: A;
    decodedArgs: B;
}
