import { BigNumber } from "@0x/utils";
import { Web3Wrapper } from "@0x/web3-wrapper";
import { artifacts, DeployedAddresses, ValidatorRegistryContract } from "@kosu/system-contracts";
import { TransactionReceiptWithDecodedLogs } from "ethereum-protocol";
import Web3 from "web3";

import { Treasury } from "./Treasury";

/**
 * Integration with ValidatorRegistry contract on an Ethereum blockchain.
 */
export class ValidatorRegistry {
    private readonly web3: Web3;
    private readonly treasury: Treasury;
    private contract: ValidatorRegistryContract;
    private coinbase: string;
    private readonly web3Wrapper: Web3Wrapper;
    private address: string;

    /**
     * Create a new ValidatorRegistry instance.
     *
     * @param options instantiation options
     * @param treasury treasury integration instance
     */
    constructor(options: KosuOptions, treasury: Treasury) {
        this.web3 = options.web3;
        this.web3Wrapper = options.web3Wrapper;
        this.address = options.validatorRegistryProxyAddress;
        this.treasury = treasury;
    }

    /**
     * Asynchronously initializes the contract instance or returns it from cache
     *
     * @returns The contract
     */
    private async getContract(): Promise<ValidatorRegistryContract> {
        if (!this.contract) {
            const networkId = await this.web3Wrapper.getNetworkIdAsync();
            this.coinbase = await this.web3.eth.getCoinbase().catch(() => undefined);

            if (!this.address) {
                this.address = DeployedAddresses[networkId].ValidatorRegistryProxy;
            }
            if (!this.address) {
                throw new Error("Invalid network for ValidatorRegistry");
            }

            this.contract = new ValidatorRegistryContract(
                artifacts.ValidatorRegistry.compilerOutput.abi,
                this.address,
                this.web3Wrapper.getProvider(),
                { from: this.coinbase },
            );
        }
        return this.contract;
    }

    /**
     * Reads the application period
     */
    public async applicationPeriod(): Promise<BigNumber> {
        const contract = await this.getContract();
        return contract.applicationPeriod.callAsync();
    }

    /**
     * Reads the commit period
     */
    public async commitPeriod(): Promise<BigNumber> {
        const contract = await this.getContract();
        return contract.commitPeriod.callAsync();
    }

    /**
     * Reads the challenge period
     */
    public async challengePeriod(): Promise<BigNumber> {
        const contract = await this.getContract();
        return contract.challengePeriod.callAsync();
    }

    /**
     * Reads the exit period
     */
    public async exitPeriod(): Promise<BigNumber> {
        const contract = await this.getContract();
        return contract.exitPeriod.callAsync();
    }

    /**
     * Reads the reward period
     */
    public async rewardPeriod(): Promise<BigNumber> {
        const contract = await this.getContract();
        return contract.rewardPeriod.callAsync();
    }

    /**
     * Reads the minimum balance
     */
    public async minimumBalance(): Promise<BigNumber> {
        const contract = await this.getContract();
        return contract.minimumBalance.callAsync();
    }

    /**
     * Reads the stakeholder cut
     */
    public async stakeholderCut(): Promise<BigNumber> {
        const contract = await this.getContract();
        return contract.stakeholderCut.callAsync();
    }

    /**
     * Reads the Voting contract address
     */
    public async voting(): Promise<string> {
        const contract = await this.getContract();
        return contract.voting.callAsync();
    }

    /**
     * Reads the kosuToken address
     */
    public async kosuToken(): Promise<string> {
        const contract = await this.getContract();
        return contract.kosuToken.callAsync();
    }

    /**
     * Reads the current listing keys
     */
    public async listingKeys(): Promise<string[]> {
        const contract = await this.getContract();
        return contract.listingKeys.callAsync();
    }

    /**
     * Reads the listing for public key
     *
     * @param _pubKey hex encoded tendermint public key
     */
    public async getListing(_pubKey: string): Promise<Listing> {
        const contract = await this.getContract();
        return contract.getListing.callAsync(this.convertPubKey(_pubKey));
    }

    /**
     * Reads the requested listings
     */
    public async getListings(_pubKeys: string[]): Promise<Listing[]> {
        const contract = await this.getContract();
        return contract.getListings.callAsync(_pubKeys);
    }

    /**
     * Reads the registered listings
     */
    public async getAllListings(): Promise<Listing[]> {
        const contract = await this.getContract();
        return contract.getAllListings.callAsync();
    }

    /**
     * Reads the max reward rate
     */
    public async maxRewardRate(): Promise<BigNumber> {
        const contract = await this.getContract();
        return contract.maxRewardRate.callAsync();
    }

    /**
     * Reads the challenge by challengeId
     *
     * @param challengeId hex encoded tendermint public key
     */
    public async getChallenge(challengeId: BigNumber): Promise<Challenge> {
        const contract = await this.getContract();
        return contract.getChallenge.callAsync(challengeId);
    }

    /*    /!**
     * Reads the challenges by challengeIds
     *
     * @param challengeIds hex encoded tendermint public key
     *!/
    public async getChallenges(challengeIds: BigNumber[]): Promise<Challenge[]> {
        const contract = await this.getContract();
        return contract.getChallenges.callAsync(challengeIds);
    }*/

    /*    /!**
     * Reads all challenges
     *
     *!/
    public async getAllChallenges(): Promise<Challenge[]> {
        const contract = await this.getContract();
        return contract.getAllChallenges.callAsync();
    }*/

    /**
     * Register a new listing
     *
     * @param _pubKey hex encoded tendermint public key
     * @param _tokensToStake uint number of tokens to stake ( must be greater than minimum balance)
     * @param _rewardRate int value of tokens to earn, burn or neither per reward period
     * @param _details String value (often a url) to support listing claim
     */
    public async registerListing(
        _pubKey: string,
        _tokensToStake: BigNumber,
        _rewardRate: BigNumber,
        _details: string,
    ): Promise<TransactionReceiptWithDecodedLogs> {
        const contract = await this.getContract();

        const systemBalance = await this.treasury.systemBalance(this.coinbase);
        const maxRewardRate = await this.maxRewardRate();

        if (systemBalance.lt(_tokensToStake)) {
            const tokensShort = _tokensToStake.minus(systemBalance);
            await this.treasury.deposit(tokensShort);
        }

        if (maxRewardRate.lt(_rewardRate)) {
            throw new Error(`Reward rate: ${_rewardRate.toString()} exceeds maxmimum of ${maxRewardRate.toString()}`);
        }

        return contract.registerListing.awaitTransactionSuccessAsync(_pubKey, _tokensToStake, _rewardRate, _details);
    }

    /**
     * Confirms listing after application period
     *
     * @param _pubKey hex encoded tendermint public key
     */
    public async confirmListing(_pubKey: string): Promise<TransactionReceiptWithDecodedLogs> {
        const contract = await this.getContract();
        return contract.confirmListing.awaitTransactionSuccessAsync(_pubKey);
    }

    /**
     * Starts a challenge of a listing
     *
     * @param _pubKey hex encoded tendermint public key
     * @param _details String value (often a url) to support listing claim
     */
    public async challengeListing(_pubKey: string, _details: string): Promise<TransactionReceiptWithDecodedLogs> {
        const contract = await this.getContract();

        const listing: Listing = await this.getListing(_pubKey);
        const approval: BigNumber = await this.treasury.treasuryAllowance();
        const currentBalance: BigNumber = await this.treasury.currentBalance(this.coinbase);

        if (approval.plus(currentBalance).lt(listing.stakedBalance)) {
            await this.treasury.approveTreasury(listing.stakedBalance.minus(currentBalance));
        }

        return contract.challengeListing.awaitTransactionSuccessAsync(_pubKey, _details);
    }

    /**
     * Resolves challenge of a listing
     *
     * @param _pubKey hex encoded tendermint public key
     */
    public async resolveChallenge(_pubKey: string): Promise<TransactionReceiptWithDecodedLogs> {
        const contract = await this.getContract();
        return contract.resolveChallenge.awaitTransactionSuccessAsync(_pubKey);
    }

    /**
     * Claims the rewards of a generating/burning listing
     *
     * @param _pubKey hex encoded tendermint public key
     */
    public async claimRewards(_pubKey: string): Promise<TransactionReceiptWithDecodedLogs> {
        const contract = await this.getContract();
        return contract.claimRewards.awaitTransactionSuccessAsync(_pubKey);
    }

    /**
     * Initializes an exit of a listing from the registry
     *
     * @param _pubKey hex encoded tendermint public key
     */
    public async initExit(_pubKey: string): Promise<TransactionReceiptWithDecodedLogs> {
        const contract = await this.getContract();
        return contract.initExit.awaitTransactionSuccessAsync(_pubKey);
    }

    /**
     * Finalizes the exit of a listing
     *
     * @param _pubKey hex encoded tendermint public key
     */
    public async finalizeExit(_pubKey: string): Promise<TransactionReceiptWithDecodedLogs> {
        const contract = await this.getContract();
        return contract.finalizeExit.awaitTransactionSuccessAsync(_pubKey);
    }

    /**
     * Claims winnings from complete challenge
     *
     * @param challengeId id of challenge coinbase has contributed a winning vote to
     */
    public async claimWinnings(challengeId: BigNumber): Promise<TransactionReceiptWithDecodedLogs> {
        const contract = await this.getContract();
        return contract.claimWinnings.awaitTransactionSuccessAsync(challengeId);
    }

    /**
     * Converts public key to hex if input is not currently in hex
     *
     * todo: convert to util function
     *
     * @param _pubKey .
     * @returns hex encoded tendermint public key
     */
    public convertPubKey(_pubKey: string): string {
        let out;
        if (_pubKey.length === 66 && _pubKey.startsWith("0x")) {
            return _pubKey;
        } else if (_pubKey.startsWith("0x") && _pubKey.length < 66) {
            out = _pubKey;
        } else {
            out = `0x${Buffer.from(_pubKey, "base64").toString("hex")}`;
        }

        if (out.length > 66) {
            out = out.substr(0, 66);
        }

        return this.web3.utils.padRight(out, 64);
    }

    /**
     * Converts hex encoded public key back to tendermint base64
     *
     * todo: convert to util function
     *
     * @param _pubKey hex encoded tendermint public key
     * @returns Base64 tendermint public key
     */
    // tslint:disable-next-line: prefer-function-over-method
    public hexToBase64(_pubKey: string): string {
        return new Buffer(_pubKey.substr(2), "hex").toString("base64");
    }
}
