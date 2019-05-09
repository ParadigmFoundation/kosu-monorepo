interface KosuOptions {
    web3Wrapper?: Web3Wrapper;
    posterRegistryProxyAddress?: string;
    kosuTokenAddress?: string;
    orderStreamURL?: string;
    orderGatewayAddress?: string;
    networkId?: number | string;
    provider?: provider;
    validatorRegistryProxyAddress?: string;
    votingAddress?: string;
    treasuryAddress?: string;
    web3?: Web3;
}

interface Order {
    subContract: string;
    maker: string;
    makerValues: any;
    makerSignature: any;
    id: any;
    poster: string;
}

interface PostableOrder extends Order {
    posterSignature: { v: any, s: any, r: any }
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