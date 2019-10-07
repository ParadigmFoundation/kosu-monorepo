describe("Voting", () => {
    it("should interact with a Voting poll", async () => {
        const voteValue = TestValues.oneWei;
        const voteSalt = TestValues.fiveEther;
        const encodedVote = kosu.voting.encodeVote(voteValue, voteSalt);

        const { blockNumber, pollId } = await testHelpers.variablePoll(10, 10);
        const commitEnd = blockNumber + 10;
        const revealEnd = blockNumber + 21;
        await kosu.voting.commitVote(pollId, encodedVote, TestValues.oneWei).should.be.fulfilled;
        await testHelpers.skipTo(commitEnd);
        await kosu.voting.revealVote(pollId, voteValue, voteSalt);
        await testHelpers.skipTo(revealEnd);
        await kosu.voting
            .winningOption(pollId)
            .then(x => x.toString())
            .should.eventually.eq(voteValue.toString());
        await kosu.voting
            .totalWinningTokens(pollId)
            .then(x => x.toString())
            .should.eventually.eq(voteValue.toString());
        await kosu.voting
            .totalRevealedTokens(pollId)
            .then(x => x.toString())
            .should.eventually.eq(voteValue.toString());
        await kosu.voting
            .userWinningTokens(pollId)
            .then(x => x.toString())
            .should.eventually.eq(voteValue.toString());
    });
});
