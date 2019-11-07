import { BigNumber } from "@0x/utils";
import { Web3Wrapper } from "@0x/web3-wrapper";
import { DeployedAddresses } from "@kosu/migrations";
import { VotingContract } from "@kosu/system-contracts";
import { KosuOptions } from "@kosu/types";
import { TransactionReceiptWithDecodedLogs } from "ethereum-protocol";

import { Treasury } from "./Treasury";

/**
 * Integration with Voting contract on an Ethereum blockchain.
 */
export class Voting {
    public readonly treasury: Treasury;
    public readonly web3Wrapper: Web3Wrapper;
    public address: string;
    private contract: any;
    private coinbase: string;

    /**
     * Create a new Voting instance.
     *
     * @param options instantiation options
     * @param treasury treasury integration instance
     */
    constructor(options: KosuOptions, treasury?: Treasury) {
        this.web3Wrapper = options.web3Wrapper;
        this.address = options.votingAddress;
        this.treasury = treasury || new Treasury(options);
    }

    /**
     * Asynchronously initializes the contract instance or returns it from cache
     *
     * @returns The contract
     */
    public async getContract(): Promise<VotingContract> {
        if (!this.contract) {
            const networkId = await this.web3Wrapper.getNetworkIdAsync();
            this.coinbase = await this.web3Wrapper.getAvailableAddressesAsync().then(as => as[0]);

            if (!this.address) {
                /* istanbul ignore next */
                this.address = DeployedAddresses[networkId].Voting.contractAddress;
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
            const tokensShort = new BigNumber(_tokensToCommit.toString()).minus(systemBalance);
            await this.treasury.deposit(tokensShort);
        }

        // tslint:disable-next-line: no-console
        console.log(`Committing vote ${_vote} with ${_tokensToCommit} DIGM tokens`);
        return contract.commitVote.awaitTransactionSuccessAsync(
            new BigNumber(_pollId.toString()),
            _vote,
            new BigNumber(_tokensToCommit.toString()),
        );
    }

    /**
     * Commits proxy vote to voting contract
     *
     * @param _pollId uint poll index
     * @param _account ethereum address vote will be commited for
     * @param _vote encoded vote option
     * @param _tokensToCommit uint number of tokens to be commited to vote
     */
    public async commitProxyVote(
        _pollId: BigNumber,
        _account: string,
        _vote: string,
        _tokensToCommit: BigNumber,
    ): Promise<TransactionReceiptWithDecodedLogs> {
        const contract = await this.getContract();

        const systemBalance = await this.treasury.systemBalance(_account);
        if (systemBalance.lt(_tokensToCommit)) {
            throw new Error(`${_account} doesn't have sufficient tokens for a proxy vote.`);
        }

        // tslint:disable-next-line: no-console
        console.log(`Committing proxy vote for ${_account} of ${_vote} with ${_tokensToCommit} DIGM tokens`);
        return contract.commitProxyVote.awaitTransactionSuccessAsync(
            new BigNumber(_pollId.toString()),
            _account,
            _vote,
            new BigNumber(_tokensToCommit.toString()),
        );
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
        return contract.revealVote.awaitTransactionSuccessAsync(
            new BigNumber(_pollId.toString()),
            new BigNumber(_voteOption.toString()),
            new BigNumber(_voteSalt.toString()),
        );
    }

    /**
     * Reveals vote on voting contract
     *
     * @param _pollId uint poll index
     * @param _account ethereum address vote will be revealed for
     * @param _voteOption uint representation of vote position
     * @param _voteSalt uint salt used to encode vote option
     */
    public async revealProxyVote(
        _pollId: BigNumber,
        _account: string,
        _voteOption: BigNumber,
        _voteSalt: BigNumber,
    ): Promise<TransactionReceiptWithDecodedLogs> {
        const contract = await this.getContract();
        return contract.revealProxyVote.awaitTransactionSuccessAsync(
            new BigNumber(_pollId.toString()),
            _account,
            new BigNumber(_voteOption.toString()),
            new BigNumber(_voteSalt.toString()),
        );
    }

    /**
     * Reads the winning option for poll
     *
     * @param _pollId uint poll index
     */
    public async winningOption(_pollId: BigNumber): Promise<BigNumber> {
        const contract = await this.getContract();
        return contract.winningOption.callAsync(new BigNumber(_pollId.toString()));
    }

    /**
     * Reads the total winning tokens for poll
     *
     * @param _pollId uint poll index
     */
    public async totalWinningTokens(_pollId: BigNumber): Promise<BigNumber> {
        const contract = await this.getContract();
        return contract.totalWinningTokens.callAsync(new BigNumber(_pollId.toString()));
    }

    /**
     * Reads the total winning tokens for poll
     *
     * @param _pollId uint poll index
     */
    public async totalRevealedTokens(_pollId: BigNumber): Promise<BigNumber> {
        const contract = await this.getContract();
        return contract.totalRevealedTokens.callAsync(new BigNumber(_pollId.toString()));
    }

    /**
     * Reads users winning tokens committed for poll
     *
     * @param _pollId uint poll index
     * @param _userAddress address of user whose winning contribution is
     */
    public async userWinningTokens(_pollId: BigNumber, _userAddress: string = this.coinbase): Promise<BigNumber> {
        const contract = await this.getContract();
        const [bool, value] = await contract.userWinningTokens.callAsync(
            new BigNumber(_pollId.toString()),
            _userAddress,
        );
        if (!bool) {
            throw new Error("Poll hasn't ended"); // This should be fine since previously the transaction would have reverted.
        }
        return value;
    }
}
