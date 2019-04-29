import BN = require("bn.js");
import Web3 from "web3";

import Treasury from "./Treasury";
import { KosuOptions } from "./types";
const ValidatorRegistryProxyContractData = require('@kosu/system-contracts').contracts.ValidatorRegistryProxy;
const TruffleContract = require('truffle-contract');

/**
 * Integration with ValidatorRegistry contract on an Ethereum blockchain.
 *
 * @todo Refactor contract integration after migration away from truffle
 */
class ValidatorRegistry {
    readonly web3: Web3;
    readonly treasury: Treasury;
    readonly initializing: Promise<void>;
    private contract: any;
    private coinbase: string;

    /**
     * Create a new ValidatorRegistry instance.
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

    /**
     * Reads the application period
     */
    async applicationPeriod(): Promise<BN> {
        await this.initializing;
        return await this.contract.applicationPeriod.call();
    }

    /**
     * Reads the commit period
     */
    async commitPeriod(): Promise<BN> {
        await this.initializing;
        return await this.contract.commitPeriod.call();
    }

    /**
     * Reads the challenge period
     */
    async challengePeriod(): Promise<BN> {
        await this.initializing;
        return await this.contract.challengePeriod.call();
    }

    /**
     * Reads the exit period
     */
    async exitPeriod(): Promise<BN> {
        await this.initializing;
        return await this.contract.exitPeriod.call();
    }

    /**
     * Reads the reward period
     */
    async rewardPeriod(): Promise<BN> {
        await this.initializing;
        return await this.contract.rewardPeriod.call();
    }

    /**
     * Reads the minimum balance
     */
    async minimumBalance(): Promise<BN> {
        await this.initializing;
        return await this.contract.minimumBalance.call();
    }

    /**
     * Reads the stakeholder cut
     */
    async stakeholderCut(): Promise<BN> {
        await this.initializing;
        return await this.contract.stakeholderCut.call();
    }

    /**
     * Reads the Voting contract address
     */
    async voting(): Promise<string> {
        await this.initializing;
        return await this.contract.voting.call();
    }

    /**
     * Reads the token address
     */
    async token(): Promise<string> {
        await this.initializing;
        return await this.contract.token.call();
    }

    /**
     * Reads the current validators
     */
    async validators(): Promise<[string]> {
        await this.initializing;
        return await this.contract.validators.call();
    }

    /**
     * Reads the listing for public key
     *
     * @param _pubKey hex encoded tendermint public key
     */
    async getListing(_pubKey: string): Promise<any> {
        await this.initializing;
        //TODO convert pub key if needed?
        return await this.contract.getListing.call(_pubKey);
    }

    /**
     * Register a new listing
     *
     * @param _pubKey hex encoded tendermint public key
     * @param _tokensToStake uint number of tokens to stake ( must be greater than minimum balance)
     * @param _rewardRate int value of tokens to earn, burn or neither per reward period
     */
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

    /**
     * Confirms listing after application period
     *
     * @param _pubKey hex encoded tendermint public key
     */
    async confirmListing(_pubKey): Promise<void> {
        await this.initializing;
        await this.contract.confirmListing(_pubKey, { from: this.coinbase });
    }

    /**
     * Starts a challenge of a listing
     *
     * @param _pubKey hex encoded tendermint public key
     */
    async challengeListing(_pubKey: string): Promise<void> {
        //TODO Check balance after looking up specific listing's tokens commited
        await this.initializing;
        await this.contract.challengeListing(_pubKey, { from: this.coinbase });
    }

    /**
     * Resolves challenge of a listing
     *
     * @param _pubKey hex encoded tendermint public key
     */
    async resolveChallenge(_pubKey: string): Promise<void> {
        await this.initializing;
        await this.contract.resolveChallenge(_pubKey, { from: this.coinbase });
    }

    /**
     * Claims the rewards of a generating/burning listing
     *
     * @param _pubKey hex encoded tendermint public key
     */
    async claimRewards(_pubKey: string): Promise<void> {
        await this.initializing;
        await this.contract.claimRewards(_pubKey, { from: this.coinbase });
    }

    /**
     * Initializes an exit of a listing from the registry
     *
     * @param _pubKey hex encoded tendermint public key
     */
    async initExit(_pubKey: string): Promise<void> {
        await this.initializing;
        await this.contract.initExit(_pubKey, { from: this.coinbase });
    }

    /**
     * Finalizes the exit of a listing
     *
     * @param _pubKey hex encoded tendermint public key
     */
    async finalizeExit(_pubKey: string): Promise<void> {
        await this.initializing;
        await this.contract.finalizeExit(_pubKey, { from: this.coinbase });
    }

    /**
     * Claims winnings from complete challenge
     *
     * @param challengeId id of challenge coinbase has contributed a winning vote to
     */
    async claimWinnings(challengeId: string | number): Promise<void> {
        await this.initializing;
        await this.contract.claimWinnings(challengeId, { from: this.coinbase });
    }

    /**
     * Converts public key to hex if input is not currently in hex
     *
     * @param _pubKey
     * @returns hex encoded tendermint public key
     */
    convertPubKey(_pubKey: string): string {
        if(_pubKey.length === 66 && _pubKey.startsWith('0x')) return _pubKey;

        return '0x' + Buffer.from(_pubKey, 'base64').toString('hex');
    }

    /**
     * Converts hex encoded public key back to tendermint base64
     *
     * @param _pubKey hex encoded tendermint public key
     * @returns Base64 tendermint public key
     */
    hexToBase64(_pubKey: string): string {
        return new Buffer(_pubKey.substr(2), 'hex').toString('base64');
    }
}

export default ValidatorRegistry;
