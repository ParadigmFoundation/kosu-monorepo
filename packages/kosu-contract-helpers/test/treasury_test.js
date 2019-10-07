describe("Treasury", () => {
    describe("pay", () => {
        it("should generate treasury balance", async () => {
            const initialSystemBalance = await kosu.treasury.systemBalance(accounts[0]);
            await kosu.treasury.pay(TestValues.oneEther);
            const finalSystemBalance = await kosu.treasury.systemBalance(accounts[0]);
            const difference = finalSystemBalance.minus(initialSystemBalance);
            difference.toNumber().should.be.gt(0);

            await kosu.treasury.withdraw(difference);
            await kosu.kosuToken.releaseTokens(difference);
        });
    });
});
