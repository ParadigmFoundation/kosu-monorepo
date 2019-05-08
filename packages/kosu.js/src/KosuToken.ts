import BN = require("bn.js");
import TruffleContract = require("truffle-contract");
import Web3 from "web3";

// tslint:disable-next-line: no-var-requires
const KosuTokenContractData = require("@kosu/system-contracts").contracts.KosuToken;

/**
 * Integration with KosuToken contract on an Ethereum blockchain.
 *
 * @todo Refactor contract integration after migration away from truffle
 */
export class KosuToken {
    private readonly web3: Web3;
    private readonly initializing: Promise<void>;
    private contract: any;
    private coinbase: string;

    /**
     * Creates a new KosuToken instance
     *
     * @param options initialization options
     */
    constructor(options: KosuOptions) {
        this.web3 = options.web3;
        this.initializing = this.init(options);
    }

    /**
     * Asynchronously initializes the instance after construction
     *
     * @param options instantiation options
     * @returns A promise to await complete instantiation for further calls
     */
    public async init(options: KosuOptions): Promise<void> {
        const KosuTokenContract = TruffleContract(KosuTokenContractData);
        KosuTokenContract.setProvider(this.web3.currentProvider);

        this.contract = options.kosuTokenAddress
            ? KosuTokenContract.at(options.kosuTokenAddress)
            : await KosuTokenContract.deployed().catch(() => {
                  throw new Error("Invalid network for KosuToken");
              });

        this.coinbase = await this.web3.eth.getCoinbase().catch(() => undefined);
    }

    /**
     * Reads the total supply
     */
    public async totalSupply(): Promise<BN> {
        await this.initializing;
        return this.contract.totalSupply.call();
    }

    /**
     * Reads the balance for a user address
     *
     * @param owner Address of token holder
     */
    public async balanceOf(owner: string): Promise<BN> {
        await this.initializing;
        return this.contract.balanceOf.call(owner);
    }

    /**
     * Transfers tokens to a user
     *
     * @param to Address of token receiver
     * @param value uint value of tokens to transfer
     */
    public async transfer(to: string, value: number | string | BN): Promise<void> {
        await this.initializing;
        return this.contract.transfer(to, value.toString(), { from: this.coinbase });
    }

    /**
     * Transfers token from an address to a destination address
     *
     * @param from Address of token source
     * @param to Address of token destination
     * @param value uint value of tokens to transfer
     */
    public async transferFrom(from: string, to: string, value: number | string | BN): Promise<void> {
        await this.initializing;
        return this.contract.transferFrom(from, to, value.toString(), { from: this.coinbase });
    }

    /**
     * Sets approval for user to transfer tokens on coinbase's behalf
     *
     * @param spender Address allowed to spend coinbase's tokens
     * @param value uint value of tokens to transfer
     */
    public async approve(spender: string, value: number | string | BN): Promise<void> {
        await this.initializing;
        return this.contract.approve(spender, value.toString(), { from: this.coinbase });
    }

    /**
     * Reads approved allowance for user pair
     *
     * @param owner Address of source tokens
     * @param spender Address of spender of tokens
     */
    public async allowance(owner: string, spender: string): Promise<BN> {
        await this.initializing;
        return this.contract.allowance.call(owner, spender);
    }
}
