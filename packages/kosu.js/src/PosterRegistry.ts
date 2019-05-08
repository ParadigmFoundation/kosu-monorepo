import BN = require("bn.js");
import TruffleContract from "truffle-contract";
import Web3 from "web3";

import { Treasury } from "./Treasury";

// tslint:disable-next-line: no-var-requires
const PosterRegistryProxyContractData = require("@kosu/system-contracts").contracts.PosterRegistryProxy;

/**
 * Integration with PosterRegistry contract on an Ethereum blockchain.
 *
 * @todo Refactor contract integration after migration away from truffle
 */
export class PosterRegistry {
    private readonly web3: Web3;
    private readonly treasury: Treasury;
    private readonly initializing: Promise<void>;
    private contract: any;
    private coinbase: string;

    /**
     * Create a new PosterRegistry instance.
     *
     * @param options instantiation options
     * @param treasury treasury integration instance
     */
    constructor(options: KosuOptions, treasury: Treasury) {
        this.web3 = options.web3;
        this.treasury = treasury;
        this.initializing = this.init(options);
    }

    /**
     * Asyncronously initializes the instance after construction
     *
     * @param options instantiation options
     * @returns A promise to await complete instantiation for further calls
     */
    public async init(options: KosuOptions): Promise<void> {
        const PosterRegistryProxyContract = TruffleContract(PosterRegistryProxyContractData);
        PosterRegistryProxyContract.setProvider(this.web3.currentProvider);

        // tslint:disable-next-line: prefer-conditional-expression
        if (options.posterRegistryProxyAddress) {
            this.contract = PosterRegistryProxyContract.at(options.posterRegistryProxyAddress);
        } else {
            this.contract = await PosterRegistryProxyContract.deployed().catch(() => {
                throw new Error("Invalid network for PosterRegistry");
            });
        }

        this.coinbase = await this.web3.eth.getCoinbase().catch(() => undefined);
    }

    /**
     * Reads total tokens contributed to registry
     */
    public async tokensContributed(): Promise<BN> {
        await this.initializing;
        return this.contract.tokensContributed.call();
    }

    /**
     * Reads number of tokens registered for address
     *
     * @param address Address of registered user
     */
    public async tokensRegisteredFor(address: string): Promise<BN> {
        await this.initializing;
        return this.contract.tokensRegisteredFor.call(address);
    }

    /**
     * Registers tokens
     *
     * @param amount uint value of tokens to register
     */
    public async registerTokens(amount: string | number | BN): Promise<void> {
        await this.initializing;
        const parsed = new BN(amount);

        const coinbase = await this.web3.eth.getCoinbase();
        const treasuryTokens = await this.treasury.currentBalance(coinbase);
        const hasTreasuryBalance = treasuryTokens.gte(parsed);

        if (!hasTreasuryBalance) {
            const tokenBalance = await this.treasury.kosuToken.balanceOf(coinbase);
            const tokensNeeded = parsed.sub(treasuryTokens);
            const hasEnoughTokens = tokenBalance.gte(tokensNeeded);

            if (hasEnoughTokens) {
                // tslint:disable-next-line: no-console
                console.log(`${coinbase} has insufficient available Treasury balance; Depositing Tokens`);
                await this.treasury.deposit(tokensNeeded);
            } else {
                throw new Error(`${coinbase} has insufficient available tokens`);
            }
        }

        return this.contract.registerTokens(parsed.toString(), { from: this.coinbase });
    }

    /**
     * Releases tokens
     *
     * @param amount uint values of tokens to release
     */
    public async releaseTokens(amount: string | BN): Promise<void> {
        await this.initializing;
        return this.contract.releaseTokens(amount.toString(), { from: this.coinbase });
    }
}
