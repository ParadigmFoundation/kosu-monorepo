import * as Web3 from "web3";
import BN = require("bn.js");

const KosuTokenContractData = require('@kosu/system-contracts').contracts.KosuToken;
const TruffleContract = require('truffle-contract');

export class KosuToken {
    private web3: Web3;
    private readonly initializing: Promise<void>;
    private contract: any;
    private coinbase: string;

    constructor(options) {
        this.web3 = options.web3;
        this.initializing = this.init(options);
    }

    async init(options) {
        const KosuTokenContract = TruffleContract(KosuTokenContractData);
        KosuTokenContract.setProvider(this.web3.currentProvider);
        if (options.kosuTokenAddress) {
            this.contract = KosuTokenContract.at(options.kosuTokenAddress);
        } else {
            this.contract = await KosuTokenContract.deployed().catch(() => { throw new Error('Invalid network for KosuToken') });
        }

        this.coinbase = await this.web3.eth.getCoinbase().catch(() => undefined);
    }

    async totalSupply(): Promise<BN> {
        await this.initializing;
        return await this.contract.totalSupply.call();
    }

    async balanceOf(owner): Promise<BN> {
        await this.initializing;
        return await this.contract.balanceOf.call(owner);
    }

    async transfer(to, value): Promise<void> {
        await this.initializing;
        return await this.contract.transfer(to, value.toString(), { from: this.coinbase });
    }

    async transferFrom(from, to, value): Promise<void> {
        await this.initializing;
        return await this.contract.transferFrom(from, to, value.toString(), { from: this.coinbase });
    }

    async approve(spender, value): Promise<void> {
        await this.initializing;
        return await this.contract.approve(spender, value.toString(), { from: this.coinbase });
    }

    async allowance(owner, spender): Promise<BN> {
        await this.initializing;
        return await this.contract.allowance.call(owner, spender);
    }


}
