describe("Voting", () => {
    it("should interact with a Voting poll", async () => {
        const voteValue = TestValues.oneWei;
        const voteSalt = TestValues.fiveEther;
        const encodedVote = kosu.voting.encodeVote(voteValue, voteSalt);

        const pollId = await testHelpers.variablePoll(3, 1);
        await kosu.voting.commitVote(pollId, encodedVote, TestValues.oneWei).should.be.fulfilled;
        await kosu.voting.revealVote(pollId, voteValue, voteSalt);
        await kosu.voting.winningOption(pollId).then(x => x.toString()).should.eventually.eq(voteValue.toString());
        await kosu.voting.totalWinningTokens(pollId).then(x => x.toString()).should.eventually.eq(voteValue.toString());
        await kosu.voting.totalRevealedTokens(pollId).then(x => x.toString()).should.eventually.eq(voteValue.toString());
        await kosu.voting.userWinningTokens(pollId).then(x => x.toString()).should.eventually.eq(voteValue.toString());
    });
});
