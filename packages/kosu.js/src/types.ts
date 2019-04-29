import Web3 from "web3";
import { provider } from "web3-providers";

export interface KosuOptions {
    orderStreamURL?: string;
    orderGatewayAddress?: string;
    networkId?: number | string;
    provider?: provider;
    validatorRegistryProxyAddress?: string;
    votingAddress?: string;
    treasuryAddress?: string;
    web3?: Web3
}

export interface KosuOrder {
    id: any;
    posterSignature: any;
    makerSignature: any;
    makerValues: any[];
    takerArguments: any[];
    makerArguments: any[];
    maker: string;
    subContract: string;
}