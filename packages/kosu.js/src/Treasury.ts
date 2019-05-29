import { BigNumber } from "@0x/utils";
import { Web3Wrapper } from "@0x/web3-wrapper";
import { artifacts, DeployedAddresses, TreasuryContract } from "@kosu/system-contracts";
import { TransactionReceiptWithDecodedLogs } from "ethereum-protocol";
import Web3 from "web3";

import { KosuToken } from "./KosuToken";

/**
 * Integration with Treasury contract on an Ethereum blockchain.
 *
 * @todo Refactor contract integration after migration away from truffle
 */
export class Treasury {
    public readonly kosuToken: KosuToken;

    private readonly web3: Web3;
    private address: string;
    private contract: TreasuryContract;
    private readonly web3Wrapper: Web3Wrapper;

    /**
     * Creates a new Treasury instance
     *
     * @param options initialization options
     * @param kosuToken KosuToken instance
     */
    constructor(options: KosuOptions, kosuToken: KosuToken) {
        this.web3 = options.web3;
        this.web3Wrapper = options.web3Wrapper;
        this.kosuToken = kosuToken;
        this.address = options.treasuryAddress;
    }

    /**
     * Asynchronously initializes the contract instance or returns it from cache
     *
     * @returns The contract
     */
    private async getContract(): Promise<TreasuryContract> {
        if (!this.contract) {
            const networkId = await this.web3Wrapper.getNetworkIdAsync();
            const coinbase = await this.web3.eth.getCoinbase().catch(() => undefined);

            if (!this.address) {
                this.address = DeployedAddresses[networkId].Treasury;
            }
            if (!this.address) {
                throw new Error("Invalid network for Treasury");
            }

            this.contract = new TreasuryContract(
                artifacts.Treasury.compilerOutput.abi,
                this.address,
                this.web3Wrapper.getProvider(),
                { from: coinbase },
            );
        }
        return this.contract;
    }

    /**
     * Deposit tokens in the treasury
     *
     * @param value uint value of tokens to deposit
     */
    public async deposit(value: BigNumber): Promise<TransactionReceiptWithDecodedLogs> {
        const contract = await this.getContract();
        const coinbase = await this.web3.eth.getCoinbase();
        const hasBalance = await this.kosuToken.balanceOf(coinbase).then(bal => bal.gte(value));
        const hasApproval = await this.kosuToken.allowance(coinbase, this.address).then(all => all.gte(value));

        if (!hasBalance) {
            throw new Error(`${coinbase} has insufficient balance to deposit`);
        }

        if (!hasApproval) {
            console.log(`${coinbase} has insufficient approval; Setting approval`);
            await this.kosuToken.approve(this.address, value);
        }

        return contract.deposit.awaitTransactionSuccessAsync(value);
    }

    /**
     * Withdraw tokens from treasury
     *
     * @param value uint value of tokens to withdraw
     */
    public async withdraw(value: BigNumber): Promise<TransactionReceiptWithDecodedLogs> {
        const contract = await this.getContract();
        return contract.withdraw.awaitTransactionSuccessAsync(value);
    }

    /**
     * Read addresses system balance
     *
     * @param address Ethereum address
     */
    public async systemBalance(address: string): Promise<BigNumber> {
        const contract = await this.getContract();
        return contract.systemBalance.callAsync(address);
    }

    /**
     * Read addresses system balance
     *
     * @param address Ethereum address
     */
    public async currentBalance(address: string): Promise<BigNumber> {
        const contract = await this.getContract();
        return contract.currentBalance.callAsync(address);
    }
}
