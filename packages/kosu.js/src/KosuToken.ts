import { BigNumber } from "@0x/utils";
import { Web3Wrapper } from "@0x/web3-wrapper";
import { artifacts, DeployedAddresses, KosuTokenContract } from "@kosu/system-contracts";
import { TransactionReceiptWithDecodedLogs } from "ethereum-protocol";
import Web3 from "web3";

/**
 * Integration with KosuToken contract on an Ethereum blockchain.
 *
 */
export class KosuToken {
    private readonly web3: Web3;
    private contract: KosuTokenContract;
    private readonly web3Wrapper: Web3Wrapper;
    private address: string;

    /**
     * Creates a new KosuToken instance
     *
     * @param options initialization options
     */
    constructor(options: KosuOptions) {
        this.web3 = options.web3;
        this.web3Wrapper = options.web3Wrapper;
        this.address = options.kosuTokenAddress;
    }

    /**
     * Asynchronously initializes the contract instance or returns it from cache
     *
     * @returns The contract
     */
    private async getContract(): Promise<KosuTokenContract> {
        if (!this.contract) {
            const networkId = await this.web3Wrapper.getNetworkIdAsync();
            const coinbase = await this.web3.eth.getCoinbase().catch(() => undefined);

            if (!this.address) {
                this.address = DeployedAddresses[networkId].KosuToken;
            }
            if (!this.address) {
                throw new Error("Invalid network for KosuToken");
            }

            this.contract = new KosuTokenContract(
                artifacts.KosuToken.compilerOutput.abi,
                this.address,
                this.web3Wrapper.getProvider(),
                { from: coinbase },
            );
        }
        return this.contract;
    }

    /**
     * Reads the total supply
     */
    public async totalSupply(): Promise<BigNumber> {
        const contract = await this.getContract();
        return contract.totalSupply.callAsync();
    }

    /**
     * Reads the balance for a user address
     *
     * @param owner Address of token holder
     */
    public async balanceOf(owner: string): Promise<BigNumber> {
        const contract = await this.getContract();
        return contract.balanceOf.callAsync(owner);
    }

    /**
     * Transfers tokens to a user
     *
     * @param to Address of token receiver
     * @param value uint value of tokens to transfer
     */
    public async transfer(to: string, value: BigNumber): Promise<TransactionReceiptWithDecodedLogs> {
        const contract = await this.getContract();
        return contract.transfer.awaitTransactionSuccessAsync(to, value);
    }

    /**
     * Transfers token from an address to a destination address
     *
     * @param from Address of token source
     * @param to Address of token destination
     * @param value uint value of tokens to transfer
     */
    public async transferFrom(from: string, to: string, value: BigNumber): Promise<TransactionReceiptWithDecodedLogs> {
        const contract = await this.getContract();
        return contract.transferFrom.awaitTransactionSuccessAsync(from, to, value);
    }

    /**
     * Sets approval for user to transfer tokens on coinbase's behalf
     *
     * @param spender Address allowed to spend coinbase's tokens
     * @param value uint value of tokens to transfer
     */
    public async approve(spender: string, value: BigNumber): Promise<TransactionReceiptWithDecodedLogs> {
        const contract = await this.getContract();
        return contract.approve.awaitTransactionSuccessAsync(spender, value);
    }

    /**
     * Reads approved allowance for user pair
     *
     * @param owner Address of source tokens
     * @param spender Address of spender of tokens
     */
    public async allowance(owner: string, spender: string): Promise<BigNumber> {
        const contract = await this.getContract();
        return contract.allowance.callAsync(owner, spender);
    }
}
