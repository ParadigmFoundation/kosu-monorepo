import { KosuToken } from "../src";

describe("KosuToken", () => {
    let kosuToken: KosuToken;

    before(() => {
        kosuToken = new KosuToken(enhancementOptions);
    });

    describe("totalSupply", () => {
        it("should return the total supply of the token", async () => {
            await kosuToken.totalSupply().then(supply => {
                assert(supply.gt(0));
            });
        });
    });

    describe("balanceOf", () => {
        it("should see the users balance", async () => {
            await kosuToken.balanceOf(accounts[0]).then(balance => {
                assert(balance.gt(0));
            });
        });
    });

    describe("transfer", () => {
        it("should succeed with the expected log", async () => {
            await kosuToken.transfer(accounts[0], 1).then(({ logs }) => {
                logs.length.should.eq(1);
            });
        });
    });

    describe("transferFrom", () => {
        it("should succeed with the expected log", async () => {
            await kosuToken.approve(accounts[0], 1);
            await kosuToken.transferFrom(accounts[0], accounts[0], 1).then(({ logs }) => {
                logs.length.should.eq(2);
            });
        });
    });

    describe("approve", () => {
        it("should succeed with the expected log", async () => {
            await kosuToken.approve(accounts[0], 1).then(({ logs }) => {
                logs.length.should.eq(1);
            });
        });
    });

    describe("allowance", () => {
        it("should report the allowance", async () => {
            await kosuToken.approve(accounts[0], 1);
            await kosuToken.allowance(accounts[0], accounts[0]).then(allowance => {
                allowance.eq(1).should.eq(true);
            });
        });
    });

    describe("bondTokens", () => {
        it("should bond ether for tokens", async () => {
            const initialBalance = await kosuToken.balanceOf(accounts[0]);
            await kosuToken.pay(TestValues.oneEther);
            const finalBalance = await kosuToken.balanceOf(accounts[0]);
            const difference = finalBalance.minus(initialBalance);
            difference.toNumber().should.be.gt(0);

            await kosuToken.releaseTokens(difference);
        });
    });

    describe("releaseTokens", () => {
        it("should burn tokens for ether", async () => {
            const initialBalance = await kosuToken.balanceOf(accounts[0]);
            await kosuToken.pay(TestValues.oneEther);
            const finalBalance = await kosuToken.balanceOf(accounts[0]);
            const difference = finalBalance.minus(initialBalance);
            difference.toNumber().should.be.gt(0);

            const initialEth = await web3Wrapper.getBalanceInWeiAsync(accounts[0]);
            await kosuToken.releaseTokens(difference);
            const finalEth = await web3Wrapper.getBalanceInWeiAsync(accounts[0]);
            finalEth
                .minus(initialEth)
                .toNumber()
                .should.be.gt(0);
        });
    });

    describe("estimateEtherToToken", () => {
        it("should estimate tokens generated from ether", async () => {
            await kosuToken.estimateEtherToToken(TestValues.oneEther).then(val => val.toNumber().should.be.gt(0));
        });
    });

    describe("estimateTokenToEther", () => {
        it("should estimate ether returned from tokens", async () => {
            await kosuToken.estimateTokenToEther(TestValues.oneEther).then(val => val.toNumber().should.be.gt(0));
        });
    });

    describe("pay", () => {
        it("should generate tokens", async () => {
            const initialBalance = await kosuToken.balanceOf(accounts[0]);
            await kosuToken.pay(TestValues.oneEther);
            const finalBalance = await kosuToken.balanceOf(accounts[0]);
            const difference = finalBalance.minus(initialBalance);
            difference.toNumber().should.be.gt(0);

            await kosuToken.releaseTokens(difference);
        });
    });
});
