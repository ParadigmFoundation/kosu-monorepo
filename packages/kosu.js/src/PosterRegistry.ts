import {BigNumber} from "@0x/utils";
import {Web3Wrapper} from "@0x/web3-wrapper";
import {artifacts, DeployedAddresses, PosterRegistryProxyContract} from "@kosu/system-contracts";
import {TransactionReceiptWithDecodedLogs} from "ethereum-protocol";
import Web3 from "web3";

import { Treasury } from "./Treasury";

/**
 * Integration with PosterRegistry contract on an Ethereum blockchain.
 *
 * @todo Refactor contract integration after migration away from truffle
 */
export class PosterRegistry {
    private readonly web3: Web3;
    private readonly treasury: Treasury;
    private contract: PosterRegistryProxyContract;
    private web3Wrapper: Web3Wrapper;
    private address: string;

    /**
     * Create a new PosterRegistry instance.
     *
     * @param options instantiation options
     * @param treasury treasury integration instance
     */
    constructor(options: KosuOptions, treasury: Treasury) {
        this.web3 = options.web3;
        this.web3Wrapper = options.web3Wrapper;
        this.treasury = treasury;
        this.address = options.posterRegistryProxyAddress;
    }

    /**
     * Asynchronously initializes the contract instance or returns it from cache
     *
     * @returns The contract
     */
    private async getContract(): Promise<PosterRegistryProxyContract> {
        if (!this.contract) {
            const networkId = await this.web3Wrapper.getNetworkIdAsync();
            const coinbase = await this.web3.eth.getCoinbase().catch(() => undefined);

            if (!this.address) {
                this.address = DeployedAddresses[networkId].PosterRegistryProxy;
            }
            if (!this.address) {
                throw new Error("Invalid network for PosterRegistry");
            }

            this.contract = new PosterRegistryProxyContract(artifacts.PosterRegistryProxy.compilerOutput.abi, this.address, this.web3Wrapper.getProvider(),  { from: coinbase });
        }
        return this.contract;
    }

    /**
     * Reads total tokens contributed to registry
     */
    public async tokensContributed(): Promise<BigNumber> {
        const contract = await this.getContract();
        return contract.tokensContributed.callAsync();
    }

    /**
     * Reads number of tokens registered for address
     *
     * @param address Address of registered user
     */
    public async tokensRegisteredFor(address: string): Promise<BigNumber> {
        const contract = await this.getContract();
        return contract.tokensRegisteredFor.callAsync(address);
    }

    /**
     * Registers tokens
     *
     * @param amount uint value of tokens to register
     */
    public async registerTokens(amount: BigNumber): Promise<TransactionReceiptWithDecodedLogs> {
        const contract = await this.getContract();
        const parsed = new BigNumber(amount);

        const coinbase = await this.web3.eth.getCoinbase();
        const treasuryTokens = await this.treasury.currentBalance(coinbase);
        const hasTreasuryBalance = treasuryTokens.gte(parsed);

        if (!hasTreasuryBalance) {
            const tokenBalance = await this.treasury.kosuToken.balanceOf(coinbase);
            const tokensNeeded = parsed.minus(treasuryTokens);
            const hasEnoughTokens = tokenBalance.gte(tokensNeeded as any);

            if (hasEnoughTokens) {
                // tslint:disable-next-line: no-console
                console.log(`${coinbase} has insufficient available Treasury balance; Depositing Tokens`);
                await this.treasury.deposit(tokensNeeded);
            } else {
                throw new Error(`${coinbase} has insufficient available tokens`);
            }
        }

        return contract.registerTokens.sendTransactionAsync(amount).then(txHash => this.web3Wrapper.awaitTransactionSuccessAsync(txHash));
    }

    /**
     * Releases tokens
     *
     * @param amount uint values of tokens to release
     */
    public async releaseTokens(amount: BigNumber ): Promise<TransactionReceiptWithDecodedLogs> {
        const contract = await this.getContract();
        return contract.releaseTokens.sendTransactionAsync(amount).then(txHash => this.web3Wrapper.awaitTransactionSuccessAsync(txHash));his.contract.releaseTokens(amount.toString(), { from: this.coinbase });
    }
}
