interface TestValues {
    maxUint: BN;
    sixEther: BN;
    fiveEther: BN;
    oneEther: BN;
    halfEther: BN;
    oneHundredWei: BN;
    fiftyWei: BN;
}

declare const testValues: TestValues;
declare const accounts: string[];
declare const contracts: MigratedContracts;
declare const web3Wrapper: Web3Wrapper;
