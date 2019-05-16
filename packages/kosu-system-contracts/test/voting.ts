import { BigNumber } from "@0x/utils";
import { soliditySha3 } from "web3-utils";

import { decodeKosuEvents, KosuTokenContract, TreasuryContract, VotingContract } from "../src";
import { migrations } from "../src/migrations";

describe("Voting", function() {
    this.timeout(10000);
    let voting: VotingContract;
    let kosuToken: KosuTokenContract;
    let treasury: TreasuryContract;

    const prepareTokens = async (from, funds) => {
        await kosuToken.approve
            .sendTransactionAsync(treasury.address, funds, { from })
            .then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.fulfilled;
        await treasury.deposit
            .sendTransactionAsync(new BigNumber(funds), { from })
            .then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.fulfilled;
    };

    const shortPoll = async () => {
        await prepareTokens(accounts[0], testValues.fiveEther);
        return variablePoll(1, 1);
    };

    const variablePoll = async (start: number, end: number) => {
        const base = await web3Wrapper.getBlockNumberAsync().then(x => parseInt(x));
        const creationBlock = base + 1;
        const commitEnd = creationBlock + start;
        const revealEnd = commitEnd + end;
        const result = await voting.createPoll
            .sendTransactionAsync(commitEnd, revealEnd)
            .then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash));
        const { pollId } = decodeKosuEvents(result.logs)[0];
        return pollId;
    };

    const twoOnePoll = async () => {
        await prepareTokens(accounts[0], testValues.fiveEther);
        return variablePoll(2, 1);
    };

    const oneTwoPoll = async () => {
        await prepareTokens(accounts[0], testValues.fiveEther);
        return variablePoll(1, 2);
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

        await clearTreasury(accounts[0]);
        await clearTreasury(accounts[1]);
    });

    afterEach(async () => {
        await clearTreasury(accounts[0]);
        await clearTreasury(accounts[1]);
    });

    describe("createPoll", () => {
        it("should allow a poll to be created", async () => {
            const nextPoll = await voting.nextPollId.callAsync();
            const result = await voting.createPoll
                .sendTransactionAsync(block1, block2)
                .then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.fulfilled;
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
            await voting.createPoll
                .sendTransactionAsync(block2, block1)
                .then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.rejected;
        });

        it("should not allow the commit end to be equal to reveal end", async () => {
            await voting.createPoll
                .sendTransactionAsync(block1, block1)
                .then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.rejected;
        });
    });

    describe("commitVote", () => {
        let pollId;
        beforeEach(async () => {
            pollId = await shortPoll();
        });

        it("should allow a user to commit a vote", async () => {
            await voting.commitVote
                .sendTransactionAsync(pollId, secret1, testValues.fiveEther)
                .then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.fulfilled;
        });

        it("should not let a vote to be commited after the commit phase", async () => {
            await skipBlocks(1);
            await voting.commitVote
                .sendTransactionAsync(pollId, secret1, testValues.fiveEther)
                .then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.rejected;
        });

        it("should require tokens to vote", async () => {
            await voting.commitVote
                .sendTransactionAsync(pollId, secret1, testValues.fiveEther, { from: accounts[2] })
                .then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.rejected;
        });

        it("should not let a voter commit twice", async () => {
            const testPoll = await twoOnePoll();
            await voting.commitVote
                .sendTransactionAsync(testPoll, secret1, testValues.fiveEther)
                .then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.fulfilled;
            await voting.commitVote
                .sendTransactionAsync(testPoll, secret1, testValues.fiveEther)
                .then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.rejected;
        });
    });

    describe("revealVote", () => {
        let pollId;
        beforeEach(async () => {
            pollId = await shortPoll();
        });

        it("should allow a user to reveal a vote", async () => {
            await voting.commitVote
                .sendTransactionAsync(pollId, secret1, testValues.fiveEther)
                .then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.fulfilled;
            await voting.revealVote
                .sendTransactionAsync(pollId, vote1, salt)
                .then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.fulfilled;
        });

        it("should not allow a user to reveal without commiting", async () => {
            await skipBlocks(1);

            await voting.revealVote
                .sendTransactionAsync(pollId, vote1, salt)
                .then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.rejected;
        });

        it("should not allow a change in salt", async () => {
            await voting.commitVote
                .sendTransactionAsync(pollId, secret1, testValues.fiveEther)
                .then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.fulfilled;
            await voting.revealVote
                .sendTransactionAsync(pollId, vote1, new BigNumber("24"))
                .then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.rejected;
        });

        it("should not allow a change in vote", async () => {
            await voting.commitVote
                .sendTransactionAsync(pollId, secret1, testValues.fiveEther)
                .then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.fulfilled;
            await voting.revealVote
                .sendTransactionAsync(pollId, vote2, salt)
                .then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.rejected;
        });

        it("should not allow a voter to reveal twice", async () => {
            const testPoll = await oneTwoPoll();
            await voting.commitVote
                .sendTransactionAsync(testPoll, secret1, testValues.fiveEther)
                .then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.fulfilled;
            await voting.revealVote
                .sendTransactionAsync(testPoll, vote1, salt)
                .then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.fulfilled;
            await voting.revealVote
                .sendTransactionAsync(testPoll, vote1, salt)
                .then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.rejected;
        });

        it("should not allow a voter to reveal when the tokens are gone", async () => {
            await treasury.withdraw.sendTransactionAsync(await treasury.currentBalance.callAsync(accounts[0]));
            const testPoll = await oneTwoPoll();
            await voting.commitVote
                .sendTransactionAsync(testPoll, secret1, testValues.fiveEther)
                .then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.fulfilled;

            await treasury.withdraw.sendTransactionAsync(testValues.oneWei);

            await voting.revealVote
                .sendTransactionAsync(testPoll, vote1, salt)
                .then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.rejected;
        });
    });

    describe("winningOption", () => {
        it("should report the correct winningOption", async () => {
            await kosuToken.transfer.sendTransactionAsync(accounts[1], testValues.fiveEther);
            await prepareTokens(accounts[0], testValues.fiveEther);
            await prepareTokens(accounts[1], testValues.fiveEther);
            const pollId = await variablePoll(2, 2);
            await voting.commitVote
                .sendTransactionAsync(pollId, secret1, testValues.oneEther)
                .then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.fulfilled;
            await voting.commitVote
                .sendTransactionAsync(pollId, secret2, testValues.fiveEther, { from: accounts[1] })
                .then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.fulfilled;
            await voting.revealVote
                .sendTransactionAsync(pollId, vote1, salt)
                .then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.fulfilled;
            await voting.revealVote
                .sendTransactionAsync(pollId, vote2, salt, { from: accounts[1] })
                .then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.fulfilled;

            await skipBlocks(new BigNumber(1));
            await voting.winningOption
                .callAsync(pollId)
                .then(x => x.toString())
                .should.eventually.eq("2");
        });

        it("should report the first winning option in a tie", async () => {
            await kosuToken.transfer.sendTransactionAsync(accounts[1], testValues.fiveEther);
            await prepareTokens(accounts[0], testValues.fiveEther);
            await prepareTokens(accounts[1], testValues.fiveEther);
            const pollId = await variablePoll(2, 2);
            await voting.commitVote
                .sendTransactionAsync(pollId, secret1, testValues.fiveEther)
                .then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.fulfilled;
            await voting.commitVote
                .sendTransactionAsync(pollId, secret2, testValues.fiveEther, { from: accounts[1] })
                .then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.fulfilled;
            await voting.revealVote
                .sendTransactionAsync(pollId, vote2, salt, { from: accounts[1] })
                .then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.fulfilled;
            await voting.revealVote
                .sendTransactionAsync(pollId, vote1, salt)
                .then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.fulfilled;

            await skipBlocks(new BigNumber(1));
            await voting.winningOption
                .callAsync(pollId)
                .then(x => x.toString())
                .should.eventually.eq("2");
        });
    });

    describe("totalWinningTokens", () => {
        it("should report the correct number of total tokens contributed", async () => {
            await kosuToken.transfer.sendTransactionAsync(accounts[1], testValues.fiveEther);
            await prepareTokens(accounts[0], testValues.fiveEther);
            await prepareTokens(accounts[1], testValues.fiveEther);
            const pollId = await variablePoll(2, 2);
            await voting.commitVote
                .sendTransactionAsync(pollId, secret1, testValues.oneEther)
                .then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.fulfilled;
            await voting.commitVote
                .sendTransactionAsync(pollId, secret1, testValues.fiveEther, { from: accounts[1] })
                .then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.fulfilled;
            await voting.revealVote
                .sendTransactionAsync(pollId, vote1, salt)
                .then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.fulfilled;
            await voting.revealVote
                .sendTransactionAsync(pollId, vote1, salt, { from: accounts[1] })
                .then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.fulfilled;

            await skipBlocks(new BigNumber(1));
            await voting.totalWinningTokens
                .callAsync(pollId)
                .then(x => x.toString())
                .should.eventually.eq(testValues.sixEther.toString());
        });
    });

    describe("userWinningTokens", () => {
        it("should report 0 when not a winning vote", async () => {
            await kosuToken.transfer.sendTransactionAsync(accounts[1], testValues.fiveEther);
            await prepareTokens(accounts[0], testValues.fiveEther);
            await prepareTokens(accounts[1], testValues.fiveEther);
            const pollId = await variablePoll(2, 2);
            await voting.commitVote
                .sendTransactionAsync(pollId, secret1, testValues.oneEther)
                .then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.fulfilled;
            await voting.commitVote
                .sendTransactionAsync(pollId, secret2, testValues.fiveEther, { from: accounts[1] })
                .then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.fulfilled;
            await voting.revealVote
                .sendTransactionAsync(pollId, vote1, salt)
                .then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.fulfilled;
            await voting.revealVote
                .sendTransactionAsync(pollId, vote2, salt, { from: accounts[1] })
                .then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.fulfilled;

            await skipBlocks(new BigNumber(1));
            await voting.userWinningTokens
                .callAsync(pollId, accounts[0])
                .then(x => x.toString())
                .should.eventually.eq("0");
        });

        it("should report the correct number of tokens", async () => {
            await kosuToken.transfer.sendTransactionAsync(accounts[1], testValues.fiveEther);
            await prepareTokens(accounts[0], testValues.fiveEther);
            await prepareTokens(accounts[1], testValues.fiveEther);
            const pollId = await variablePoll(2, 2);
            await voting.commitVote
                .sendTransactionAsync(pollId, secret1, testValues.oneEther)
                .then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.fulfilled;
            await voting.commitVote
                .sendTransactionAsync(pollId, secret2, testValues.fiveEther, { from: accounts[1] })
                .then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.fulfilled;
            await voting.revealVote
                .sendTransactionAsync(pollId, vote1, salt)
                .then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.fulfilled;
            await voting.revealVote
                .sendTransactionAsync(pollId, vote2, salt, { from: accounts[1] })
                .then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.fulfilled;

            await skipBlocks(new BigNumber(1));
            await voting.userWinningTokens
                .callAsync(pollId, accounts[1])
                .then(x => x.toString())
                .should.eventually.eq(testValues.fiveEther.toString());
        });
    });
});
