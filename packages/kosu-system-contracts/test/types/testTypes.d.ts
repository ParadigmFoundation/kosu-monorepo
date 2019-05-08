interface TestValues {
    maxUint: BigNumber;
    sixEther: BigNumber;
    fiveEther: BigNumber;
    oneEther: BigNumber;
    halfEther: BigNumber;
    oneHundredWei: BigNumber;
    fiftyWei: BigNumber;
    zero: BigNumber;
}

declare const testValues: TestValues;
declare const accounts: string[];
declare const contracts: MigratedContracts;
declare const web3Wrapper: Web3Wrapper;
declare const skipBlocks: any;
declare const txDefaults: any;
