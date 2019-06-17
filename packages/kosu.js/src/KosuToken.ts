import { BigNumber } from "@0x/utils";
import { Web3Wrapper } from "@0x/web3-wrapper";
import { artifacts, DeployedAddresses, KosuTokenContract } from "@kosu/system-contracts";
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
     * An instance of the lower-level contract wrapper for the Kosu token, auto-
     * generated from the Solidity source code.
     */
    private contract: KosuTokenContract;

    /**
     * An instance of a 0x `Web3Wrapper` used for some RPC calls and for certain
     * methods.
     */
    private readonly web3Wrapper: Web3Wrapper;

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
     * @returns the KosuToken contract instance.
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
        return contract.transfer.awaitTransactionSuccessAsync(to, value);
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
        return contract.transferFrom.awaitTransactionSuccessAsync(from, to, value);
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
        return contract.approve.awaitTransactionSuccessAsync(spender, value);
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
}
