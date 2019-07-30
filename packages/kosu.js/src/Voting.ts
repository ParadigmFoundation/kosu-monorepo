import { BigNumber } from "@0x/utils";
import { Web3Wrapper } from "@0x/web3-wrapper";
import { DeployedAddresses, VotingContract } from "@kosu/system-contracts";
import { TransactionReceiptWithDecodedLogs } from "ethereum-protocol";
import Web3 from "web3";

import { Treasury } from "./Treasury";

/**
 * Integration with Voting contract on an Ethereum blockchain.
 */
export class Voting {
    private readonly web3: Web3;
    private readonly treasury: Treasury;
    private readonly web3Wrapper: Web3Wrapper;
    private address: string;
    private contract: any;
    private coinbase: string;

    /**
     * Create a new Voting instance.
     *
     * @param options instantiation options
     * @param treasury treasury integration instance
     */
    constructor(options: KosuOptions, treasury: Treasury) {
        this.web3 = options.web3;
        this.web3Wrapper = options.web3Wrapper;
        this.address = options.votingAddress;
        this.treasury = treasury;
    }

    /**
     * Asynchronously initializes the contract instance or returns it from cache
     *
     * @returns The contract
     */
    private async getContract(): Promise<VotingContract> {
        if (!this.contract) {
            const networkId = await this.web3Wrapper.getNetworkIdAsync();
            this.coinbase = await this.web3.eth.getCoinbase().catch(
                /* istanbul ignore next */
                () => undefined,
            );

            if (!this.address) {
                /* istanbul ignore next */
                this.address = DeployedAddresses[networkId].Voting;
            }
            if (!this.address) {
                /* istanbul ignore next */
                throw new Error("Invalid network for Voting");
            }

            this.contract = new VotingContract(this.address, this.web3Wrapper.getProvider(), { from: this.coinbase });
        }
        return this.contract;
    }

    /**
     * Commits vote to voting contract
     *
     * @param _pollId uint poll index
     * @param _vote encoded vote option
     * @param _tokensToCommit uint number of tokens to be commited to vote
     */
    public async commitVote(
        _pollId: BigNumber,
        _vote: string,
        _tokensToCommit: BigNumber,
    ): Promise<TransactionReceiptWithDecodedLogs> {
        const contract = await this.getContract();

        const systemBalance = await this.treasury.systemBalance(this.coinbase);
        if (systemBalance.lt(_tokensToCommit)) {
            const tokensShort = _tokensToCommit.minus(systemBalance);
            await this.treasury.deposit(tokensShort);
        }

        // tslint:disable-next-line: no-console
        console.log(`Committing vote ${_vote} with ${_tokensToCommit} DIGM tokens`);
        return contract.commitVote.awaitTransactionSuccessAsync(_pollId, _vote, _tokensToCommit);
    }

    /**
     * Reveals vote on voting contract
     *
     * @param _pollId uint poll index
     * @param _voteOption uint representation of vote position
     * @param _voteSalt uint salt used to encode vote option
     */
    public async revealVote(
        _pollId: BigNumber,
        _voteOption: BigNumber,
        _voteSalt: BigNumber,
    ): Promise<TransactionReceiptWithDecodedLogs> {
        const contract = await this.getContract();
        return contract.revealVote.awaitTransactionSuccessAsync(_pollId, _voteOption, _voteSalt);
    }

    /**
     * Reads the winning option for poll
     *
     * @param _pollId uint poll index
     */
    public async winningOption(_pollId: BigNumber): Promise<BigNumber> {
        const contract = await this.getContract();
        return contract.winningOption.callAsync(_pollId);
    }

    /**
     * Reads the total winning tokens for poll
     *
     * @param _pollId uint poll index
     */
    public async totalWinningTokens(_pollId: BigNumber): Promise<BigNumber> {
        const contract = await this.getContract();
        return contract.totalWinningTokens.callAsync(_pollId);
    }

    /**
     * Reads the total winning tokens for poll
     *
     * @param _pollId uint poll index
     */
    public async totalRevealedTokens(_pollId: BigNumber): Promise<BigNumber> {
        const contract = await this.getContract();
        return contract.totalRevealedTokens.callAsync(_pollId);
    }

    /**
     * Reads users winning tokens committed for poll
     *
     * @param _pollId uint poll index
     * @param _userAddress address of user whose winning contribution is
     */
    public async userWinningTokens(_pollId: BigNumber, _userAddress: string = this.coinbase): Promise<BigNumber> {
        const contract = await this.getContract();
        return contract.userWinningTokens.callAsync(_pollId, _userAddress);
    }

    /**
     * Encodes a vote by hashing the option and salt
     *
     * @param _voteOption .
     * @param _voteSalt .
     *
     * @returns Encoded vote
     */
    public encodeVote(_voteOption: string, _voteSalt: string): string {
        return this.web3.utils.soliditySha3({ t: "uint", v: _voteOption }, { t: "uint", v: _voteSalt });
    }
}
