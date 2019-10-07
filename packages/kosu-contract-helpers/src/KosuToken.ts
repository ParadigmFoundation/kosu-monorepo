import { BigNumber } from "@0x/utils";
import { Web3Wrapper } from "@0x/web3-wrapper";
import { DeployedAddresses, KosuTokenContract } from "@kosu/system-contracts";
import { TransactionReceiptWithDecodedLogs } from "ethereum-protocol";
import Web3 from "web3";

/**
 * The `KosuToken` class is a wrapper for the Kosu ERC-20 token contract, and
 * provides all necessary methods for interacting with the contract on any
 * Ethereum network for which the contract has been deployed.
 *
 * If instantiated outside the `Kosu` class, an instance of `web3` and of the
 * `web3Wrapper` must be supplied in the options object.
 */
export class KosuToken {
    /**
     * An instance of `web3` used to interact with the Ethereum blockchain.
     */
    private readonly web3: Web3;

    /**
     * An instance of a 0x `Web3Wrapper` used for some RPC calls and for certain
     * methods.
     */
    private readonly web3Wrapper: Web3Wrapper;

    /**
     * An instance of the lower-level contract wrapper for the Kosu token, auto-
     * generated from the Solidity source code.
     */
    private contract: KosuTokenContract;

    /**
     * The current KosuToken deployed address, loaded based on the detected
     * `networkId` from a mapping of known deployed addresses.
     */
    private address: string;

    /**
     * Creates a new KosuToken instance, supplied with an options object.
     *
     * The KosuToken address _may_ be passed in as `options.kosuTokenAddress`, but
     * can also be loaded during each method call from the known deployed addresses.
     *
     * @param options initialization options object (incl. `web3` and `web3wrapper`)
     * @example
     * ```typescript
     * const options = { web3: new Web3(window.ethereum), web3Wrapper };
     * const kosuToken = new KosuToken(options);
     * ```
     */
    constructor(options: KosuOptions) {
        this.web3 = options.web3;
        this.web3Wrapper = options.web3Wrapper;
        this.address = options.kosuTokenAddress;
    }

    /**
     * Asynchronously initializes the contract instance or returns it from cache.
     *
     * @returns The low-level KosuToken contract wrapper instance.
     */
    private async getContract(): Promise<KosuTokenContract> {
        if (!this.contract) {
            const networkId = await this.web3Wrapper.getNetworkIdAsync();
            const coinbase = await this.web3.eth.getCoinbase().catch(
                /* istanbul ignore next */
                () => undefined,
            );

            if (!this.address) {
                /* istanbul ignore next */
                this.address = DeployedAddresses[networkId].KosuToken.contractAddress;
            }
            if (!this.address) {
                /* istanbul ignore next */
                throw new Error("Invalid network for KosuToken");
            }

            this.contract = new KosuTokenContract(this.address, this.web3Wrapper.getProvider(), { from: coinbase });
        }
        return this.contract;
    }

    /**
     * Reads the total supply of KOSU, resolves to a `BigNumber` of the amount of
     * tokens in units of wei.
     *
     * @returns The total KOSU supply in wei.
     */
    public async totalSupply(): Promise<BigNumber> {
        const contract = await this.getContract();
        return contract.totalSupply.callAsync();
    }

    /**
     * Reads the balance for a user address, returned in wei.
     *
     * @param owner The Ethereum address of a token holder.
     * @returns The `owner`'s KOSU balance in wei.
     */
    public async balanceOf(owner: string): Promise<BigNumber> {
        const contract = await this.getContract();
        return contract.balanceOf.callAsync(owner);
    }

    /**
     * Transfers tokens to an address, from the current `coinbase` account.
     *
     * @param to Ethereum Address of token receiver.
     * @param value The `uint` value of tokens to transfer (in wei).
     * @returns The transaction's receipt after inclusion in a block.
     */
    public async transfer(to: string, value: BigNumber): Promise<TransactionReceiptWithDecodedLogs> {
        const contract = await this.getContract();
        return contract.transfer.awaitTransactionSuccessAsync(to, new BigNumber(value.toString()));
    }

    /**
     * Transfers token from an address to a destination address.
     *
     * @param from Address of token source.
     * @param to Address of token destination.
     * @param value The `uint` value of tokens to transfer (in wei).
     * @returns The transaction receipt after it has been included in a block.
     */
    public async transferFrom(from: string, to: string, value: BigNumber): Promise<TransactionReceiptWithDecodedLogs> {
        const contract = await this.getContract();
        return contract.transferFrom.awaitTransactionSuccessAsync(from, to, new BigNumber(value.toString()));
    }

    /**
     * Sets approval for user to transfer tokens on `coinbase`'s behalf.
     *
     * @param spender Address allowed to spend `coinbase`'s tokens.
     * @param value The uint value (in wei) to approve `spender` for.
     * @returns The transaction receipt after it has been included in a block.
     */
    public async approve(spender: string, value: BigNumber): Promise<TransactionReceiptWithDecodedLogs> {
        const contract = await this.getContract();
        return contract.approve.awaitTransactionSuccessAsync(spender, new BigNumber(value.toString()));
    }

    /**
     * Reads approved allowance for a given `owner` and `spender` account.
     *
     * @param owner Address of source tokens
     * @param spender Address of spender of tokens
     * @returns The allowance granted to the `spender` in units of wei.
     */
    public async allowance(owner: string, spender: string): Promise<BigNumber> {
        const contract = await this.getContract();
        return contract.allowance.callAsync(owner, spender);
    }

    /**
     * Calculated tokens to be minted from deposited ether.
     *
     * @param etherInput Amount of ether to be submitted to generate tokens.
     * @returns Estimation of tokens to be minted.
     */
    public async estimateEtherToToken(etherInput: BigNumber): Promise<BigNumber> {
        const contract = await this.getContract();
        return contract.estimateEtherToToken.callAsync(new BigNumber(etherInput.toString()));
    }

    /**
     * Calculates ether to be returned for burning tokens.
     *
     * @param tokensToBurn Amount of tokens to burn for returned ether.
     * @returns Estimation of ether to be returned.
     */
    public async estimateTokenToEther(tokensToBurn: BigNumber): Promise<BigNumber> {
        const contract = await this.getContract();
        return contract.estimateTokenToEther.callAsync(new BigNumber(tokensToBurn.toString()));
    }

    /**
     * Sends ether to the contract to bond tokens.
     *
     * @param value Amount of wei to deposit
     * @param minPayout Minimum amount of tokens required to be minted to prevent transaction from reverting.
     * @returns Logs from the transaction block.
     */
    public async bondTokens(value: BigNumber, minPayout: BigNumber): Promise<TransactionReceiptWithDecodedLogs> {
        const contract = await this.getContract();
        return contract.bondTokens.awaitTransactionSuccessAsync(new BigNumber(minPayout.toString()), {
            value: new BigNumber(value.toString()),
        });
    }

    /**
     * Releases tokens to be burned and return bonded ether.
     *
     * @param tokensToBurn Amount of tokens to burn for returned ether.
     * @returns Logs from the transaction block.
     */
    public async releaseTokens(tokensToBurn: BigNumber): Promise<TransactionReceiptWithDecodedLogs> {
        const contract = await this.getContract();
        return contract.releaseTokens.awaitTransactionSuccessAsync(new BigNumber(tokensToBurn.toString()));
    }

    /**
     * Sends ether to the contract to bond tokens.
     *
     * @param value Amount of wei to deposit
     * @returns Logs from the transaction block.
     */
    public async pay(value: BigNumber): Promise<TransactionReceiptWithDecodedLogs> {
        const contract = await this.getContract();
        const txData = {
            from: await this.web3.eth.getCoinbase(),
            to: contract.address,
            value: new BigNumber(value.toString()),
        };
        return this.web3Wrapper
            .sendTransactionAsync({
                ...txData,
                gas: await this.web3Wrapper.estimateGasAsync(txData),
            })
            .then(async txHash => this.web3Wrapper.awaitTransactionSuccessAsync(txHash));
    }
}
