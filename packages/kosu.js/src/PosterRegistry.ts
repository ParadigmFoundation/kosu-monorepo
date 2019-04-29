import Treasury from "./Treasury";
import Web3 from "web3";
import BN = require("bn.js");
import {KosuOptions} from "./types";

const PosterRegistryProxyContractData = require('@kosu/system-contracts').contracts.PosterRegistryProxy;
const TruffleContract = require('truffle-contract');

/**
 * Integration with PosterRegistry contract on an Ethereum blockchain.
 *
 * @todo Refactor contract integration after migration away from truffle
 */
class PosterRegistry {
    private web3: Web3;
    private treasury: Treasury;
    private readonly initializing: Promise<void>;
    private contract: any;
    private coinbase: string;

    /**
     * Create a new PosterRegistry instance.
     *
     * @param options {KosuOptions} instantiation options
     * @param treasury {Treasury} treasury integration instance
     */
    constructor(options: KosuOptions, treasury: Treasury) {
        this.web3 = options.web3;
        this.treasury = treasury;
        this.initializing = this.init(options);
    }

    /**
     * Asyncronously initializes the instance after construction
     *
     * @param options {KosuOptions} instantiation options
     * @returns A promise to await complete instantiation for further calls
     */
    async init(options: KosuOptions): Promise<void> {
        const PosterRegistryProxyContract = TruffleContract(PosterRegistryProxyContractData);
        PosterRegistryProxyContract.setProvider(this.web3.currentProvider);
        if (options.posterRegistryProxyAddress) {
            this.contract = PosterRegistryProxyContract.at(options.posterRegistryProxyAddress);
        } else {
            this.contract = await PosterRegistryProxyContract.deployed().catch(() => { throw new Error('Invalid network for PosterRegistry') });
        }

        this.coinbase = await this.web3.eth.getCoinbase().catch(() => undefined);
    }

    /**
     * Reads total tokens contributed to registry
     */
    async tokensContributed(): Promise<BN> {
        await this.initializing;
        return await this.contract.tokensContributed.call();
    }

    /**
     * Reads number of tokens registered for address
     *
     * @param address Address of registered user
     */
    async tokensRegisteredFor(address: string): Promise<BN> {
        await this.initializing;
        return await this.contract.tokensRegisteredFor.call(address);
    }

    /**
     * Registers tokens
     *
     * @param amount uint value of tokens to register
     */
    async registerTokens(amount: string | number | BN): Promise<void> {
        await this.initializing;
        if (typeof amount === 'number') {
            amount = amount.toString();
        }
        if (typeof amount === 'string') {
            amount = new BN(amount);
        }
        const coinbase = await this.web3.eth.getCoinbase();
        const treasuryTokens = await this.treasury.currentBalance(coinbase);
        const hasTreasuryBalance = treasuryTokens.gte(amount);

        if(!hasTreasuryBalance) {
            const tokenBalance = await this.treasury.kosuToken.balanceOf(coinbase);
            const tokensNeeded = amount.sub(treasuryTokens);
            const hasEnoughTokens = tokenBalance.gte(tokensNeeded);

            if (hasEnoughTokens) {
                console.log(`${coinbase} has insufficient available Treasury balance; Depositing Tokens`);
                await this.treasury.deposit(tokensNeeded);
            } else {
                new Error(`${coinbase} has insufficient available tokens`);
            }
        }

        return await this.contract.registerTokens(amount.toString(), { from: this.coinbase });
    }

    /**
     * Releases tokens
     *
     * @param amount uint values of tokens to release
     */
    async releaseTokens(amount: string | BN ): Promise<void> {
        await this.initializing;
        return await this.contract.releaseTokens(amount.toString(), { from: this.coinbase });
    }
}

export default PosterRegistry;
