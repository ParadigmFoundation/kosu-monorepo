import { contracts } from "@kosu/system-contracts";
import TruffleContract from "truffle-contract";
import { KosuOptions } from "./types";
import KosuToken from './KosuToken';
import Web3 from "web3";

import BN = require("bn.js");
const TreasuryContractData = contracts.Treasury;

/**
 * Integration with Treasury contract on an Ethereum blockchain.
 *
 * @todo Refactor contract integration after migration away from truffle
 */
class Treasury {
    private web3: Web3;
    kosuToken: KosuToken;
    readonly initializing: Promise<void>;
    private contract: any;
    private address: string;
    private coinbase: string;

    /**
     * Creates a new Treasury instance
     *
     * @param options {KosuOptions} initialization options
     * @param kosuToken {KosuToken} KosuToken instance
     */
    constructor(options: KosuOptions, kosuToken: KosuToken) {
        this.web3 = options.web3;
        this.kosuToken = kosuToken;
        this.initializing = this.init(options);
    }

    /**
     * Asyncronously initializes the instance after construction
     *
     * @param options {KosuOptions} instantiation options
     * @returns A promise to await complete instantiation for further calls
     */
    async init(options: KosuOptions): Promise<void> {
        const TreasuryContract = TruffleContract(TreasuryContractData);
        TreasuryContract.setProvider(this.web3.currentProvider);
        if (options.treasuryAddress) {
            this.contract = TreasuryContract.at(this.address);
        } else {
            this.contract = await TreasuryContract.deployed().catch(() => { throw new Error('Invalid network for Treasury') });
        }

        this.coinbase = await this.web3.eth.getCoinbase().catch(() => undefined);
    }

    /**
     * Deposit tokens in the treasury
     *
     * @param value uint value of tokens to deposit
     */
    async deposit(value: BN | string): Promise<void> {
        await this.initializing;
        if (typeof value == "string") {
            value = new BN(value);
        }
        const coinbase = await this.web3.eth.getCoinbase();
        const hasBalance = await this.kosuToken.balanceOf(coinbase).then((bal) => bal.gte(value as BN));
        const hasApproval = await this.kosuToken.allowance(coinbase, this.contract.address).then((all) => all.gte(value as BN));

        if(!hasBalance) {
            throw new Error(`${coinbase} has insufficient balance to deposit`);
        }

        if(!hasApproval) {
            console.log(`${coinbase} has insufficient approval; Setting approval`);
            await this.kosuToken.approve(this.contract.address, value);
        }

        return await this.contract.deposit(value.toString(), { from: this.coinbase });
    }

    /**
     * Withdraw tokens from treasury
     *
     * @param value uint value of tokens to withdraw
     */
    async withdraw(value: BN | string): Promise<void> {
        await this.initializing;
        if (typeof value == "string") {
            value = new BN(value);
        }
        return await this.contract.withdraw(value.toString(), { from: this.coinbase });
    }

    /**
     * Read addresses system balance
     *
     * @param address Ethereum address
     */
    async systemBalance(address: string): Promise<BN> {
        await this.initializing;
        return await this.contract.systemBalance.call(address);
    }

    /**
     * Read addresses system balance
     *
     * @param address Ethereum address
     */
    async currentBalance(address: string): Promise<BN> {
        await this.initializing;
        return await this.contract.currentBalance.call(address);
    }
}

export default Treasury;
