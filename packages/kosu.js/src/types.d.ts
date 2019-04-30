export interface KosuOptions {
    posterRegistryProxyAddress?: string;
    kosuTokenAddress?: string;
    orderStreamURL?: string;
    orderGatewayAddress?: string;
    networkId?: number | string;
    provider?: provider;
    validatorRegistryProxyAddress?: string;
    votingAddress?: string;
    treasuryAddress?: string;
    web3?: Web3
}

export interface Order {
    subContract: string;
    maker: string;
    makerValues: any;
    makerSignature: any;
    id: any;
    poster: string;
}

export interface PostableOrder extends Order {
    posterSignature: { v: any, s: any, r: any }
}