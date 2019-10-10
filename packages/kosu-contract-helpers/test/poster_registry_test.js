describe("PosterRegistry", () => {
    describe("pay", () => {
        it("should generate treasury balance", async () => {
            const initialSystemBalance = await kosu.treasury.systemBalance(accounts[0]);
            const initialPosterBalance = await kosu.posterRegistry.tokensRegisteredFor(accounts[0]);
            await kosu.posterRegistry.pay(TestValues.oneEther);
            const finalSystemBalance = await kosu.treasury.systemBalance(accounts[0]);
            const finalPosterBalance = await kosu.posterRegistry.tokensRegisteredFor(accounts[0]);

            const difference = finalSystemBalance.minus(initialSystemBalance);
            const posterDifference = finalPosterBalance.minus(initialPosterBalance);

            difference.toString().should.eq(posterDifference.toString());

            await kosu.posterRegistry.releaseTokens(difference);
            await kosu.treasury.withdraw(difference);
            await kosu.kosuToken.releaseTokens(difference);
        });
    });
});
