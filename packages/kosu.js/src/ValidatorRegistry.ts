import BN = require("bn.js");
import * as Web3 from "web3";

import { Treasury } from "./Treasury";
import { KosuOptions } from "./types";
const ValidatorRegistryProxyContractData = require('@kosu/system-contracts').contracts.ValidatorRegistryProxy;
const TruffleContract = require('truffle-contract');

export class ValidatorRegistry {
    readonly web3: Web3;
    readonly treasury: Treasury;
    readonly initializing: Promise<void>;
    private contract: any;
    private coinbase: string;

    constructor(options: KosuOptions, treasury: Treasury) {
        this.web3 = options.web3;
        this.treasury = treasury;
        this.initializing = this.init(options);
    }

    async init(options: KosuOptions): Promise<void> {
        const ValidatorRegistryProxyContract = TruffleContract(ValidatorRegistryProxyContractData);
        ValidatorRegistryProxyContract.setProvider(this.web3.currentProvider);
        if (options.validatorRegistryProxyAddress) {
            this.contract = ValidatorRegistryProxyContract.at(options.validatorRegistryProxyAddress);
        } else {
            this.contract = await ValidatorRegistryProxyContract.deployed().catch(() => {
                throw new Error('Invalid network for ValidatorRegistry')
            });
        }

        this.coinbase = await this.web3.eth.getCoinbase().catch(() => undefined);
    }

    async applicationPeriod(): Promise<BN> {
        await this.initializing;
        return await this.contract.applicationPeriod.call();
    }

    async commitPeriod(): Promise<BN> {
        await this.initializing;
        return await this.contract.commitPeriod.call();
    }

    async challengePeriod(): Promise<BN> {
        await this.initializing;
        return await this.contract.challengePeriod.call();
    }

    async exitPeriod(): Promise<BN> {
        await this.initializing;
        return await this.contract.exitPeriod.call();
    }

    async rewardPeriod(): Promise<BN> {
        await this.initializing;
        return await this.contract.rewardPeriod.call();
    }

    async minimumBalance(): Promise<BN> {
        await this.initializing;
        return await this.contract.minimumBalance.call();
    }

    async stakeholderCut(): Promise<BN> {
        await this.initializing;
        return await this.contract.stakeholderCut.call();
    }

    async voting(): Promise<string> {
        await this.initializing;
        return await this.contract.voting.call();
    }

    async token(): Promise<string> {
        await this.initializing;
        return await this.contract.token.call();
    }

    async validators(): Promise<[string]> {
        await this.initializing;
        return await this.contract.validators.call();
    }

    async getListing(_pubKey: string): Promise<any> {
        await this.initializing;
        //TODO convert pub key if needed?
        return await this.contract.getListing.call(_pubKey);
    }

    async registerListing(_pubKey: string, _tokensToStake: string | number, _rewardRate: string | number | BN): Promise<void> {
        await this.initializing;

        const systemBalance = await this.treasury.systemBalance(this.coinbase);
        const totalTokens = this.web3.utils.toBN(_tokensToStake);

        if(systemBalance.lt(totalTokens)) {
            const tokensShort = totalTokens.sub(systemBalance);
            await this.treasury.deposit(tokensShort);
        }

        await this.contract.registerListing(_pubKey, _tokensToStake, _rewardRate, { from: this.coinbase });
    }

    async confirmListing(_pubKey): Promise<void> {
        await this.initializing;
        await this.contract.confirmListing(_pubKey, { from: this.coinbase });
    }

    async challengeListing(_pubKey: string): Promise<void> {
        //TODO Check balance after looking up specific listing's tokens commited
        await this.initializing;
        await this.contract.challengeListing(_pubKey, { from: this.coinbase });
    }

    async resolveChallenge(_pubKey: string): Promise<void> {
        await this.initializing;
        await this.contract.resolveChallenge(_pubKey, { from: this.coinbase });
    }

    async claimRewards(_pubKey: string): Promise<void> {
        await this.initializing;
        await this.contract.claimRewards(_pubKey, { from: this.coinbase });
    }

    async initExit(_pubKey: string): Promise<void> {
        await this.initializing;
        await this.contract.initExit(_pubKey, { from: this.coinbase });
    }

    async finalizeExit(_pubKey: string): Promise<void> {
        await this.initializing;
        await this.contract.finalizeExit(_pubKey, { from: this.coinbase });
    }

    async claimWinnings(challengeId: string | number): Promise<void> {
        await this.initializing;
        await this.contract.claimWinnings(challengeId, { from: this.coinbase });
    }

    convertPubKey(_pubKey: string): string {
        if(_pubKey.length === 66 && _pubKey.startsWith('0x')) return _pubKey;

        return '0x' + Buffer.from(_pubKey, 'base64').toString('hex');
    }

    hexToBase64(_value: string): string {
        return new Buffer(_value.substr(2), 'hex').toString('base64');
    }
}
