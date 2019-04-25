import * as Web3 from "web3";
import { Treasury } from "./Treasury";
import { KosuOptions } from "./types";
import TruffleContract from "truffle-contract";
import { contracts } from "@kosu/system-contracts";

import BN = require("bn.js");
const VotingContractData = contracts.Voting;

export class Voting {
    private web3: Web3;
    private treasury: Treasury;
    private initializing: Promise<void>;
    private contract: any;
    private coinbase: string;

    constructor(options, treasury) {
        this.web3 = options.web3;
        this.treasury = treasury;
        this.initializing = this.init(options);
    }

    async init(options: KosuOptions): Promise<void> {
        const VotingContract = TruffleContract(VotingContractData);
        VotingContract.setProvider(this.web3.currentProvider);
        if (options.votingAddress) {
            this.contract = VotingContract.at(options.votingAddress);
        } else {
            this.contract = await VotingContract.deployed().catch(() => { throw new Error('Invalid network for Voting contract') });
        }

        this.coinbase = await this.web3.eth.getCoinbase().catch(() => undefined);
    }

    async commitVote(_pollId: string | number, _vote: string, _tokensToCommit: string | number): Promise<void> {
        await this.initializing;

        const systemBalance = await this.treasury.systemBalance(this.coinbase);
        const totalTokens = this.web3.utils.toBN(_tokensToCommit);
        if(systemBalance.lt(totalTokens)) {
            const tokensShort = totalTokens.sub(systemBalance);
            await this.treasury.deposit(tokensShort);
        }

        console.log(`Commiting vote ${_vote} with ${_tokensToCommit} DIGM tokens`);
        await this.contract.commitVote(_pollId, _vote, _tokensToCommit, { from: this.coinbase });
    }

    async revealVote(_pollId: string | number, _voteOption: string, _voteSalt: string): Promise<void> {
        await this.initializing;
        await this.contract.revealVote(_pollId, _voteOption, _voteSalt, { from: this.coinbase });
    }

    async winningOption(_pollId: string | number): Promise<BN> {
        await this.initializing;
        return await this.contract.winningOption.call(_pollId);
    }

    async totalWinningTokens(_pollId: string | number): Promise<BN> {
        await this.initializing;
        return await this.contract.totalWinningTokens.call(_pollId);
    }

    async userWinningTokens(_pollId: string | number, _userAddress: string = this.coinbase): Promise<BN> {
        await this.initializing;
        return await this.contract.userWinningTokens.call(_pollId, _userAddress);
    }

    encodeVote(_voteOption: string, _voteSalt: string): string {
        return this.web3.utils.soliditySha3({ t: 'uint', v: _voteOption }, { t: 'uint', v: _voteSalt });
    }
}
