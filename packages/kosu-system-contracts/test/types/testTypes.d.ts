interface TestValues {
    maxUint: BigNumber;
    oneHundredEther: BigNumber;
    sixEther: BigNumber;
    fiveEther: BigNumber;
    oneEther: BigNumber;
    halfEther: BigNumber;
    oneHundredWei: BigNumber;
    fiftyWei: BigNumber;
    zero: BigNumber;
    oneWei: BigNumber;
}

declare const testValues: TestValues;
declare const accounts: string[];
declare const contracts: MigratedContracts;
declare const web3Wrapper: Web3Wrapper;
declare const web3: Web3;
declare function clearTreasury(address: string): Promise<void>;
declare function ensureTokenBalance(address: string, desiredValue: BigNumber): Promise<void>;
declare function cleanAccounts(): Promise<void>;
declare function skipBlocks(val: BigNumber): Promise<void>;
declare const txDefaults: any;
