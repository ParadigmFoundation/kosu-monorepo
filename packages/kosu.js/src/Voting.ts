import { contracts } from "@kosu/system-contracts";
import BN = require("bn.js");
import TruffleContract from "truffle-contract";
import Web3 from "web3";

import { Treasury } from "./Treasury";

const VotingContractData = contracts.Voting;

/**
 * Integration with Voting contract on an Ethereum blockchain.
 *
 * @todo Refactor contract integration after migration away from truffle
 */
export class Voting {
    private readonly web3: Web3;
    private readonly treasury: Treasury;
    private readonly initializing: Promise<void>;
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
        this.treasury = treasury;
        this.initializing = this.init(options);
    }

    /**
     * Asynchronously initializes the instance after construction
     *
     * @param options instantiation options
     * @returns A promise to await complete instantiation for further calls
     */
    public async init(options: KosuOptions): Promise<void> {
        const VotingContract = TruffleContract(VotingContractData);
        VotingContract.setProvider(this.web3.currentProvider);

        this.contract = options.votingAddress ?
            VotingContract.at(options.votingAddress) :
            await VotingContract.deployed().catch(() => { throw new Error("Invalid network for Voting contract"); });

        this.coinbase = await this.web3.eth.getCoinbase().catch(() => undefined);
    }

    /**
     * Commits vote to voting contract
     *
     * @param _pollId uint poll index
     * @param _vote encoded vote option
     * @param _tokensToCommit uint number of tokens to be commited to vote
     */
    public async commitVote(_pollId: string | number, _vote: string, _tokensToCommit: string | number): Promise<void> {
        await this.initializing;

        const systemBalance = await this.treasury.systemBalance(this.coinbase);
        const totalTokens = this.web3.utils.toBN(_tokensToCommit);
        if (systemBalance.lt(totalTokens)) {
            const tokensShort = totalTokens.sub(systemBalance);
            await this.treasury.deposit(tokensShort);
        }

        // tslint:disable-next-line: no-console
        console.log(`Committing vote ${_vote} with ${_tokensToCommit} DIGM tokens`);
        await this.contract.commitVote(_pollId, _vote, _tokensToCommit, { from: this.coinbase });
    }

    /**
     * Reveals vote on voting contract
     *
     * @param _pollId uint poll index
     * @param _voteOption uint representation of vote position
     * @param _voteSalt uint salt used to encode vote option
     */
    public async revealVote(_pollId: string | number, _voteOption: string, _voteSalt: string): Promise<void> {
        await this.initializing;
        await this.contract.revealVote(_pollId, _voteOption, _voteSalt, { from: this.coinbase });
    }

    /**
     * Reads the winning option for poll
     *
     * @param _pollId uint poll index
     */
    public async winningOption(_pollId: string | number): Promise<BN> {
        await this.initializing;
        return this.contract.winningOption.call(_pollId);
    }

    /**
     * Reads the total winning tokens for poll
     *
     * @param _pollId uint poll index
     */
    public async totalWinningTokens(_pollId: string | number): Promise<BN> {
        await this.initializing;
        return this.contract.totalWinningTokens.call(_pollId);
    }

    /**
     * Reads users winning tokens committed for poll
     *
     * @param _pollId uint poll index
     * @param _userAddress address of user whose winning contribution is
     */
    public async userWinningTokens(_pollId: string | number, _userAddress: string = this.coinbase): Promise<BN> {
        await this.initializing;
        return this.contract.userWinningTokens.call(_pollId, _userAddress);
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
