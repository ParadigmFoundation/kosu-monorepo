import { encodeVote } from "@kosu/utils";

import { KosuToken, Treasury, Voting } from "../src";
import {BigNumber} from "bignumber.js";

describe("Voting", () => {
    let kosuToken: KosuToken;
    let treasury: Treasury;
    let voting: Voting;

    before(() => {
        kosuToken = new KosuToken(enhancementOptions);
        treasury = new Treasury(enhancementOptions, kosuToken);
        voting = new Voting(enhancementOptions, treasury);
    });

    it("should interact with a Voting poll", async () => {
        const voteValue = TestValues.oneWei;
        const voteSalt = TestValues.fiveEther;
        const encodedVote = encodeVote(voteValue, voteSalt);

        const { blockNumber, pollId } = await testHelpers.variablePoll(10, 10);
        const commitEnd = blockNumber + 10;
        const revealEnd = blockNumber + 21;
        await voting.commitVote(pollId, encodedVote, TestValues.oneWei).should.be.fulfilled;
        await testHelpers.skipTo(commitEnd);
        await voting.revealVote(pollId, voteValue, voteSalt);
        await testHelpers.skipTo(revealEnd);
        await voting
            .winningOption(pollId)
            .then(x => x.toString())
            .should.eventually.eq(voteValue.toString());
        await voting
            .totalWinningTokens(pollId)
            .then(x => x.toString())
            .should.eventually.eq(voteValue.toString());
        await voting
            .totalRevealedTokens(pollId)
            .then(x => x.toString())
            .should.eventually.eq(voteValue.toString());
        await voting
            .userWinningTokens(pollId)
            .then(x => x.toString())
            .should.eventually.eq(voteValue.toString());
    });

    it("should interact with a Voting poll as proxy", async () => {
        const voteValue = TestValues.oneWei;
        const voteSalt = TestValues.fiveEther;
        const encodedVote = encodeVote(voteValue, voteSalt);
        await kosuToken.transfer(accounts[1], TestValues.oneEther);
        const t = await treasury.getContract();
        const kt = await kosuToken.getContract();
        await kt.approve.awaitTransactionSuccessAsync(t.address, TestValues.oneEther, { from: accounts[1] });
        await t.deposit.awaitTransactionSuccessAsync(TestValues.oneEther, { from: accounts[1] });
        await t.authorizeProxy.sendTransactionAsync(accounts[0], { from: accounts[1] });

        const { blockNumber, pollId } = await testHelpers.variablePoll(10, 10);
        const commitEnd = blockNumber + 10;
        const revealEnd = blockNumber + 21;
        await voting.commitProxyVote(pollId, accounts[1], encodedVote, TestValues.oneWei).should.be.fulfilled;
        await testHelpers.skipTo(commitEnd);
        await voting.revealProxyVote(pollId, accounts[1], voteValue, voteSalt);
        await testHelpers.skipTo(revealEnd);
        await voting
            .winningOption(pollId)
            .then(x => x.toString())
            .should.eventually.eq(voteValue.toString());
        await voting
            .totalWinningTokens(pollId)
            .then(x => x.toString())
            .should.eventually.eq(voteValue.toString());
        await voting
            .totalRevealedTokens(pollId)
            .then(x => x.toString())
            .should.eventually.eq(voteValue.toString());
        await voting
            .userWinningTokens(pollId, accounts[1])
            .then(x => x.toString())
            .should.eventually.eq(voteValue.toString());

        await t.deauthorizeProxy.callAsync(accounts[0], { from: accounts[1] });
    });
});
