describe("KosuToken", () => {
    describe("totalSupply", () => {
        it("should return the total supply of the token", async () => {
            await kosu.kosuToken.totalSupply().then(supply => {
                supply.gt(0).should.be.true;
            });
        });
    });

    describe("balanceOf", () => {
        it("should see the users balance", async () => {
            await kosu.kosuToken.balanceOf(accounts[0]).then(balance => {
                balance.gt(0).should.be.true;
            });
        });
    });

    describe("transfer", () => {
        it("should succeed with the expected log", async () => {
            await kosu.kosuToken.transfer(accounts[0], 1, { from: accounts[0] }).then(({ logs }) => {
                logs.length.should.eq(1);
            });
        });
    });

    describe("transferFrom", () => {
        it("should succeed with the expected log", async () => {
            await kosu.kosuToken.approve(accounts[0], 1, { from: accounts[0] });
            await kosu.kosuToken.transferFrom(accounts[0], accounts[0], 1, { from: accounts[0] }).then(({ logs }) => {
                logs.length.should.eq(2);
            });
        });
    });

    describe("approve", () => {
        it("should succeed with the expected log", async () => {
            await kosu.kosuToken.approve(accounts[0], 1, { from: accounts[0] }).then(({ logs }) => {
                logs.length.should.eq(1);
            });
        });
    });

    describe("allowance", () => {
        it("should report the allowance", async () => {
            await kosu.kosuToken.approve(accounts[0], 1, { from: accounts[0] });
            await kosu.kosuToken.allowance(accounts[0], accounts[0]).then(allowance => {
                allowance.eq(1).should.eq(true);
            });
        });
    });
});
