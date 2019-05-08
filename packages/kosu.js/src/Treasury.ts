import { contracts } from "@kosu/system-contracts";
import BN = require("bn.js");
import TruffleContract from "truffle-contract";
import Web3 from "web3";

import { KosuToken } from "./KosuToken";

const TreasuryContractData = contracts.Treasury;

/**
 * Integration with Treasury contract on an Ethereum blockchain.
 *
 * @todo Refactor contract integration after migration away from truffle
 */
export class Treasury {
    public readonly kosuToken: KosuToken;

    private readonly web3: Web3;
    private readonly initializing: Promise<void>;
    private readonly address: string;
    private contract: any;
    private coinbase: string;

    /**
     * Creates a new Treasury instance
     *
     * @param options initialization options
     * @param kosuToken KosuToken instance
     */
    constructor(options: KosuOptions, kosuToken: KosuToken) {
        this.web3 = options.web3;
        this.kosuToken = kosuToken;
        this.initializing = this.init(options);
    }

    /**
     * Asyncronously initializes the instance after construction
     *
     * @param options instantiation options
     * @returns A promise to await complete instantiation for further calls
     */
    private async init(options: KosuOptions): Promise<void> {
        const TreasuryContract = TruffleContract(TreasuryContractData);
        TreasuryContract.setProvider(this.web3.currentProvider);
        if (options.treasuryAddress) {
            this.contract = TreasuryContract.at(this.address);
        } else {
            this.contract = await TreasuryContract.deployed().catch(() => {
                throw new Error("Invalid network for Treasury");
            });
        }

        this.coinbase = await this.web3.eth.getCoinbase().catch(() => undefined);
    }

    /**
     * Deposit tokens in the treasury
     *
     * @param value uint value of tokens to deposit
     */
    public async deposit(value: BN | string): Promise<void> {
        await this.initializing;
        const parsed = typeof value === "string" ? new BN(value) : value;
        const coinbase = await this.web3.eth.getCoinbase();
        const hasBalance = await this.kosuToken.balanceOf(coinbase).then(bal => bal.gte(parsed));
        const hasApproval = await this.kosuToken
            .allowance(coinbase, this.contract.address)
            .then(all => all.gte(parsed));

        if (!hasBalance) {
            throw new Error(`${coinbase} has insufficient balance to deposit`);
        }

        if (!hasApproval) {
            // tslint:disable-next-line: no-console
            console.log(`${coinbase} has insufficient approval; Setting approval`);
            await this.kosuToken.approve(this.contract.address, parsed);
        }

        return this.contract.deposit(parsed.toString(), { from: this.coinbase });
    }

    /**
     * Withdraw tokens from treasury
     *
     * @param value uint value of tokens to withdraw
     */
    public async withdraw(value: BN | string): Promise<void> {
        await this.initializing;
        const parsed = typeof value === "string" ? new BN(value) : value;
        return this.contract.withdraw(parsed.toString(), { from: this.coinbase });
    }

    /**
     * Read addresses system balance
     *
     * @param address Ethereum address
     */
    public async systemBalance(address: string): Promise<BN> {
        await this.initializing;
        return this.contract.systemBalance.call(address);
    }

    /**
     * Read addresses system balance
     *
     * @param address Ethereum address
     */
    public async currentBalance(address: string): Promise<BN> {
        await this.initializing;
        return this.contract.currentBalance.call(address);
    }
}
