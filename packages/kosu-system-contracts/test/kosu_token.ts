import { ContractArtifact } from "ethereum-types";
import { fromWei } from "web3-utils";

import { artifacts, KosuTokenContract } from "..";

describe("KosuToken", () => {
    let token, from;

    before(async () => {
        token = await KosuTokenContract.deployFrom0xArtifactAsync(
            artifacts.KosuToken as ContractArtifact,
            provider,
            txDefaults,
            "0x0000000000000000000000000000000000000000",
        );
        from = accounts[0];
    });

    describe("bonding", () => {
        it("should have expected initial output with parameterization", async () => {
            await web3Wrapper
                .sendTransactionAsync({ to: token.address, value: TestValues.twoEther.div("10"), from })
                .then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash));

            const finalBalance = await token.balanceOf.callAsync(from);
            const finalSupply = await token.totalSupply.callAsync();
            const endingEther = await web3Wrapper.getBalanceInWeiAsync(token.address);

            TestValues.oneEther
                .times(10000)
                .toString()
                .should.eq(finalBalance.toString());
            TestValues.oneEther
                .times(10000)
                .toString()
                .should.eq(finalSupply.toString());
            TestValues.twoEther.div(10).toString().should.eq(endingEther.toString());
        });

        describe("fallback", () => {
            it("should generate tokens with fallback function", async () => {
                const startingBalance = await token.balanceOf.callAsync(from);
                const startingSupply = await token.totalSupply.callAsync();
                const startingEther = await web3Wrapper.getBalanceInWeiAsync(token.address);
                const estimate = await token.estimateEtherToToken.callAsync(TestValues.oneEther);

                await web3Wrapper
                    .sendTransactionAsync({ to: token.address, value: TestValues.oneEther, from })
                    .then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash));

                const finalBalance = await token.balanceOf.callAsync(from);
                const finalSupply = await token.totalSupply.callAsync();
                const endingEther = await web3Wrapper.getBalanceInWeiAsync(token.address);

                startingBalance
                    .plus(estimate)
                    .toString()
                    .should.eq(finalBalance.toString());
                startingSupply
                    .plus(estimate)
                    .toString()
                    .should.eq(finalSupply.toString());
                startingEther
                    .plus(TestValues.oneEther)
                    .toString()
                    .should.eq(endingEther.toString());
            });
        });

        describe("bondTokens", () => {
            it("should generate tokens with fallback function", async () => {
                const startingBalance = await token.balanceOf.callAsync(from);
                const startingSupply = await token.totalSupply.callAsync();
                const startingEther = await web3Wrapper.getBalanceInWeiAsync(token.address);
                const estimate = await token.estimateEtherToToken.callAsync(TestValues.oneEther);

                await token.bondTokens.awaitTransactionSuccessAsync(TestValues.zero, { value: TestValues.oneEther });

                const finalBalance = await token.balanceOf.callAsync(from);
                const finalSupply = await token.totalSupply.callAsync();
                const endingEther = await web3Wrapper.getBalanceInWeiAsync(token.address);

                startingBalance
                    .plus(estimate)
                    .toString()
                    .should.eq(finalBalance.toString());
                startingSupply
                    .plus(estimate)
                    .toString()
                    .should.eq(finalSupply.toString());
                startingEther
                    .plus(TestValues.oneEther)
                    .toString()
                    .should.eq(endingEther.toString());
            });
        });

        describe("releaseTokens", () => {
            it("should sell tokens on the curve", async () => {
                const startingBalance = await token.balanceOf.callAsync(from);
                const startingSupply = await token.totalSupply.callAsync();
                const startingEther = await web3Wrapper.getBalanceInWeiAsync(token.address);
                const estimate = await token.estimateTokenToEther.callAsync(TestValues.oneEther);

                await token.releaseTokens.awaitTransactionSuccessAsync(TestValues.oneEther);

                const finalBalance = await token.balanceOf.callAsync(from);
                const finalSupply = await token.totalSupply.callAsync();
                const endingEther = await web3Wrapper.getBalanceInWeiAsync(token.address);

                startingBalance
                    .minus(TestValues.oneEther)
                    .toString()
                    .should.eq(finalBalance.toString(), "balance");
                startingSupply
                    .minus(TestValues.oneEther)
                    .toString()
                    .should.eq(finalSupply.toString(), "supply");
                startingEther
                    .minus(estimate)
                    .toString()
                    .should.eq(endingEther.toString(), "ether");
            });

            it("should empty the contract", async () => {
                await token.releaseTokens.awaitTransactionSuccessAsync(await token.balanceOf.callAsync(from));

                const finalBalance = await token.balanceOf.callAsync(from);
                const finalSupply = await token.totalSupply.callAsync();
                const endingEther = await web3Wrapper.getBalanceInWeiAsync(token.address);

                "0".should.eq(finalBalance.toString());
                "0".should.eq(finalSupply.toString());
                "0".should.eq(endingEther.toString());
            });
        });
    });
});
