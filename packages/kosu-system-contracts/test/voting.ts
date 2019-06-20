import { BigNumber } from "@0x/utils";
import { soliditySha3 } from "web3-utils";

import { decodeKosuEvents, KosuTokenContract, TreasuryContract, VotingContract } from "../src";

describe("Voting", () => {
    let voting: VotingContract;
    let kosuToken: KosuTokenContract;
    let treasury: TreasuryContract;

    const shortPoll = async () => {
        await testHelpers.prepareTokens(accounts[0], TestValues.fiveEther);
        return testHelpers.variablePoll(1, 1);
    };

    const twoOnePoll = async () => {
        await testHelpers.prepareTokens(accounts[0], TestValues.fiveEther);
        return testHelpers.variablePoll(2, 1);
    };

    const oneTwoPoll = async () => {
        await testHelpers.prepareTokens(accounts[0], TestValues.fiveEther);
        return testHelpers.variablePoll(1, 2);
    };

    const salt = new BigNumber("42");
    const vote1 = new BigNumber("1");
    const vote2 = new BigNumber("2");
    const block1 = vote1;
    const block2 = vote2;
    const secret1 = soliditySha3({ t: "uint", v: new BigNumber("1") }, { t: "uint", v: salt });
    const secret2 = soliditySha3({ t: "uint", v: new BigNumber("2") }, { t: "uint", v: salt });

    before(async () => {
        voting = contracts.voting;
        kosuToken = contracts.kosuToken;
        treasury = contracts.treasury;

        await testHelpers.clearTreasury(accounts[0]);
        await testHelpers.clearTreasury(accounts[1]);
    });

    afterEach(async () => {
        await testHelpers.clearTreasury(accounts[0]);
        await testHelpers.clearTreasury(accounts[1]);
    });

    describe("createPoll", () => {
        it("should allow a poll to be created", async () => {
            const nextPoll = await voting.nextPollId.callAsync();
            const result = await voting.createPoll.awaitTransactionSuccessAsync(block1, block2).should.eventually.be
                .fulfilled;
            const decodedLogs = decodeKosuEvents(result.logs)[0];

            decodedLogs.eventType.should.eq("PollCreated");
            decodedLogs.pollCreator.should.eq(accounts[0].toLowerCase());
            decodedLogs.pollId.should.eq(nextPoll.toString());

            await voting.nextPollId
                .callAsync()
                .then(x => x.toString())
                .should.eventually.eq(nextPoll.plus(1).toString());
        });

        it("should not allow the commit end to be before reveal end", async () => {
            await voting.createPoll.awaitTransactionSuccessAsync(block2, block1).should.eventually.be.rejected;
        });

        it("should not allow the commit end to be equal to reveal end", async () => {
            await voting.createPoll.awaitTransactionSuccessAsync(block1, block1).should.eventually.be.rejected;
        });
    });

    describe("commitVote", () => {
        let pollId;
        beforeEach(async () => {
            pollId = await shortPoll();
        });

        it("should allow a user to commit a vote", async () => {
            await voting.commitVote.awaitTransactionSuccessAsync(pollId, secret1, TestValues.fiveEther).should
                .eventually.be.fulfilled;
        });

        it("should not let a vote to be commited after the commit phase", async () => {
            await testHelpers.skipBlocks(1);
            await voting.commitVote.awaitTransactionSuccessAsync(pollId, secret1, TestValues.fiveEther).should
                .eventually.be.rejected;
        });

        it("should require tokens to vote", async () => {
            await voting.commitVote.awaitTransactionSuccessAsync(pollId, secret1, TestValues.fiveEther, {
                from: accounts[2],
            }).should.eventually.be.rejected;
        });

        it("should not let a voter commit twice", async () => {
            const testPoll = await twoOnePoll();
            await voting.commitVote.awaitTransactionSuccessAsync(testPoll, secret1, TestValues.fiveEther).should
                .eventually.be.fulfilled;
            await voting.commitVote.awaitTransactionSuccessAsync(testPoll, secret1, TestValues.fiveEther).should
                .eventually.be.rejected;
        });
    });

    describe("revealVote", () => {
        let pollId;
        beforeEach(async () => {
            pollId = await shortPoll();
        });

        it("should allow a user to reveal a vote", async () => {
            await voting.commitVote.awaitTransactionSuccessAsync(pollId, secret1, TestValues.fiveEther).should
                .eventually.be.fulfilled;
            await voting.revealVote.awaitTransactionSuccessAsync(pollId, vote1, salt).should.eventually.be.fulfilled;
        });

        it("should not allow a user to reveal without commiting", async () => {
            await testHelpers.skipBlocks(1);

            await voting.revealVote.awaitTransactionSuccessAsync(pollId, vote1, salt).should.eventually.be.rejected;
        });

        it("should not allow a change in salt", async () => {
            await voting.commitVote.awaitTransactionSuccessAsync(pollId, secret1, TestValues.fiveEther).should
                .eventually.be.fulfilled;
            await voting.revealVote.awaitTransactionSuccessAsync(pollId, vote1, new BigNumber("24")).should.eventually
                .be.rejected;
        });

        it("should not allow a change in vote", async () => {
            await voting.commitVote.awaitTransactionSuccessAsync(pollId, secret1, TestValues.fiveEther).should
                .eventually.be.fulfilled;
            await voting.revealVote.awaitTransactionSuccessAsync(pollId, vote2, salt).should.eventually.be.rejected;
        });

        it("should not allow a voter to reveal twice", async () => {
            const testPoll = await oneTwoPoll();
            await voting.commitVote.awaitTransactionSuccessAsync(testPoll, secret1, TestValues.fiveEther).should
                .eventually.be.fulfilled;
            await voting.revealVote.awaitTransactionSuccessAsync(testPoll, vote1, salt).should.eventually.be.fulfilled;
            await voting.revealVote.awaitTransactionSuccessAsync(testPoll, vote1, salt).should.eventually.be.rejected;
        });

        it("should not allow a voter to reveal when the tokens are gone", async () => {
            await treasury.withdraw.awaitTransactionSuccessAsync(await treasury.currentBalance.callAsync(accounts[0]));
            const testPoll = await oneTwoPoll();
            await voting.commitVote.awaitTransactionSuccessAsync(testPoll, secret1, TestValues.fiveEther).should
                .eventually.be.fulfilled;

            await treasury.withdraw.awaitTransactionSuccessAsync(TestValues.oneWei);

            await voting.revealVote.awaitTransactionSuccessAsync(testPoll, vote1, salt).should.eventually.be.rejected;
        });
    });

    describe("winningOption", () => {
        it("should report the correct winningOption", async () => {
            await kosuToken.transfer.awaitTransactionSuccessAsync(accounts[1], TestValues.fiveEther);
            await testHelpers.prepareTokens(accounts[0], TestValues.fiveEther);
            await testHelpers.prepareTokens(accounts[1], TestValues.fiveEther);
            const pollId = await testHelpers.variablePoll(2, 2);
            await voting.commitVote.awaitTransactionSuccessAsync(pollId, secret1, TestValues.oneEther).should.eventually
                .be.fulfilled;
            await voting.commitVote.awaitTransactionSuccessAsync(pollId, secret2, TestValues.fiveEther, {
                from: accounts[1],
            }).should.eventually.be.fulfilled;
            await voting.revealVote.awaitTransactionSuccessAsync(pollId, vote1, salt).should.eventually.be.fulfilled;
            await voting.revealVote.awaitTransactionSuccessAsync(pollId, vote2, salt, { from: accounts[1] }).should
                .eventually.be.fulfilled;

            await testHelpers.skipBlocks(new BigNumber(1));
            await voting.winningOption
                .callAsync(pollId)
                .then(x => x.toString())
                .should.eventually.eq("2");
        });

        it("should report the first winning option in a tie", async () => {
            await kosuToken.transfer.awaitTransactionSuccessAsync(accounts[1], TestValues.fiveEther);
            await testHelpers.prepareTokens(accounts[0], TestValues.fiveEther);
            await testHelpers.prepareTokens(accounts[1], TestValues.fiveEther);
            const pollId = await testHelpers.variablePoll(2, 2);
            await voting.commitVote.awaitTransactionSuccessAsync(pollId, secret1, TestValues.fiveEther).should
                .eventually.be.fulfilled;
            await voting.commitVote.awaitTransactionSuccessAsync(pollId, secret2, TestValues.fiveEther, {
                from: accounts[1],
            }).should.eventually.be.fulfilled;
            await voting.revealVote.awaitTransactionSuccessAsync(pollId, vote2, salt, { from: accounts[1] }).should
                .eventually.be.fulfilled;
            await voting.revealVote.awaitTransactionSuccessAsync(pollId, vote1, salt).should.eventually.be.fulfilled;

            await testHelpers.skipBlocks(new BigNumber(1));
            await voting.winningOption
                .callAsync(pollId)
                .then(x => x.toString())
                .should.eventually.eq("2");
        });
    });

    describe("totalWinningTokens", () => {
        it("should report the correct number of total tokens contributed", async () => {
            await kosuToken.transfer.awaitTransactionSuccessAsync(accounts[1], TestValues.fiveEther);
            await testHelpers.prepareTokens(accounts[0], TestValues.fiveEther);
            await testHelpers.prepareTokens(accounts[1], TestValues.fiveEther);
            const pollId = await testHelpers.variablePoll(2, 2);
            await voting.commitVote.awaitTransactionSuccessAsync(pollId, secret1, TestValues.oneEther).should.eventually
                .be.fulfilled;
            await voting.commitVote.awaitTransactionSuccessAsync(pollId, secret1, TestValues.fiveEther, {
                from: accounts[1],
            }).should.eventually.be.fulfilled;
            await voting.revealVote.awaitTransactionSuccessAsync(pollId, vote1, salt).should.eventually.be.fulfilled;
            await voting.revealVote.awaitTransactionSuccessAsync(pollId, vote1, salt, { from: accounts[1] }).should
                .eventually.be.fulfilled;

            await testHelpers.skipBlocks(new BigNumber(1));
            await voting.totalWinningTokens
                .callAsync(pollId)
                .then(x => x.toString())
                .should.eventually.eq(TestValues.sixEther.toString());
        });
    });

    describe("userWinningTokens", () => {
        it("should report 0 when not a winning vote", async () => {
            await kosuToken.transfer.awaitTransactionSuccessAsync(accounts[1], TestValues.fiveEther);
            await testHelpers.prepareTokens(accounts[0], TestValues.fiveEther);
            await testHelpers.prepareTokens(accounts[1], TestValues.fiveEther);
            const pollId = await testHelpers.variablePoll(2, 2);
            await voting.commitVote.awaitTransactionSuccessAsync(pollId, secret1, TestValues.oneEther).should.eventually
                .be.fulfilled;
            await voting.commitVote.awaitTransactionSuccessAsync(pollId, secret2, TestValues.fiveEther, {
                from: accounts[1],
            }).should.eventually.be.fulfilled;
            await voting.revealVote.awaitTransactionSuccessAsync(pollId, vote1, salt).should.eventually.be.fulfilled;
            await voting.revealVote.awaitTransactionSuccessAsync(pollId, vote2, salt, { from: accounts[1] }).should
                .eventually.be.fulfilled;

            await testHelpers.skipBlocks(new BigNumber(1));
            await voting.userWinningTokens
                .callAsync(pollId, accounts[0])
                .then(x => x.toString())
                .should.eventually.eq("0");
        });

        it("should report the correct number of tokens", async () => {
            await kosuToken.transfer.awaitTransactionSuccessAsync(accounts[1], TestValues.fiveEther);
            await testHelpers.prepareTokens(accounts[0], TestValues.fiveEther);
            await testHelpers.prepareTokens(accounts[1], TestValues.fiveEther);
            const pollId = await testHelpers.variablePoll(2, 2);
            await voting.commitVote.awaitTransactionSuccessAsync(pollId, secret1, TestValues.oneEther).should.eventually
                .be.fulfilled;
            await voting.commitVote.awaitTransactionSuccessAsync(pollId, secret2, TestValues.fiveEther, {
                from: accounts[1],
            }).should.eventually.be.fulfilled;
            await voting.revealVote.awaitTransactionSuccessAsync(pollId, vote1, salt).should.eventually.be.fulfilled;
            await voting.revealVote.awaitTransactionSuccessAsync(pollId, vote2, salt, { from: accounts[1] }).should
                .eventually.be.fulfilled;

            await testHelpers.skipBlocks(new BigNumber(1));
            await voting.userWinningTokens
                .callAsync(pollId, accounts[1])
                .then(x => x.toString())
                .should.eventually.eq(TestValues.fiveEther.toString());
        });
    });
});
