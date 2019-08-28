import { ContractArtifact } from "ethereum-types";
import { fromWei } from "web3-utils";

import { artifacts, KosuTokenContract } from "..";

describe("KosuToken", () => {
    let token, from, kosuToken;

    before(async () => {
        token = await KosuTokenContract.deployFrom0xArtifactAsync(
            artifacts.KosuToken as ContractArtifact,
            provider,
            txDefaults,
            "0x0000000000000000000000000000000000000000",
        );
        from = accounts[0];
        kosuToken = contracts.kosuToken;
    });

    describe("parameterization", () => {
        it("should fail with incorrect initial deposit", async () => {
            await web3Wrapper.sendTransactionAsync({ to: token.address, value: TestValues.twoEther, from }).should
                .eventually.be.rejected;
        });

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
            TestValues.twoEther
                .div(10)
                .toString()
                .should.eq(endingEther.toString());
        });

        it("should have expected tokens balance at given ether balance", async () => {
            await web3Wrapper
                .sendTransactionAsync({
                    to: token.address,
                    value: TestValues.fourHundredEther.minus(await web3Wrapper.getBalanceInWeiAsync(token.address)),
                    from,
                })
                .then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash));

            const finalBalance = await token.balanceOf.callAsync(from);
            const finalSupply = await token.totalSupply.callAsync();
            const endingEther = await web3Wrapper.getBalanceInWeiAsync(token.address);

            "90635575928012811022820".should.eq(finalBalance.toString());
            "90635575928012811022820".should.eq(finalSupply.toString());
            TestValues.fourHundredEther.toString().should.eq(endingEther.toString());
        });
    });

    describe("bonding", () => {
        describe("fallback", () => {
            it("should generate tokens with fallback function", async () => {
                const startingBalance = await kosuToken.balanceOf.callAsync(from);
                const startingSupply = await kosuToken.totalSupply.callAsync();
                const startingEther = await web3Wrapper.getBalanceInWeiAsync(kosuToken.address);
                const estimate = await kosuToken.estimateEtherToToken.callAsync(TestValues.oneEther);

                await web3Wrapper
                    .sendTransactionAsync({ to: kosuToken.address, value: TestValues.oneEther, from })
                    .then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash));

                const finalBalance = await kosuToken.balanceOf.callAsync(from);
                const finalSupply = await kosuToken.totalSupply.callAsync();
                const endingEther = await web3Wrapper.getBalanceInWeiAsync(kosuToken.address);

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
            it("should generate tokens with bondTokens", async () => {
                const startingBalance = await kosuToken.balanceOf.callAsync(from);
                const startingSupply = await kosuToken.totalSupply.callAsync();
                const startingEther = await web3Wrapper.getBalanceInWeiAsync(kosuToken.address);
                const estimate = await kosuToken.estimateEtherToToken.callAsync(TestValues.oneEther);

                await kosuToken.bondTokens.awaitTransactionSuccessAsync(TestValues.zero, {
                    value: TestValues.oneEther,
                });

                const finalBalance = await kosuToken.balanceOf.callAsync(from);
                const finalSupply = await kosuToken.totalSupply.callAsync();
                const endingEther = await web3Wrapper.getBalanceInWeiAsync(kosuToken.address);

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
                const startingBalance = await kosuToken.balanceOf.callAsync(from);
                const startingSupply = await kosuToken.totalSupply.callAsync();
                const startingEther = await web3Wrapper.getBalanceInWeiAsync(kosuToken.address);
                const estimate = await kosuToken.estimateTokenToEther.callAsync(TestValues.oneEther);

                await kosuToken.releaseTokens.awaitTransactionSuccessAsync(TestValues.oneEther);

                const finalBalance = await kosuToken.balanceOf.callAsync(from);
                const finalSupply = await kosuToken.totalSupply.callAsync();
                const endingEther = await web3Wrapper.getBalanceInWeiAsync(kosuToken.address);

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
                await kosuToken.releaseTokens.awaitTransactionSuccessAsync(await kosuToken.balanceOf.callAsync(from));

                const finalBalance = await kosuToken.balanceOf.callAsync(from);
                const finalSupply = await kosuToken.totalSupply.callAsync();
                const endingEther = await web3Wrapper.getBalanceInWeiAsync(kosuToken.address);

                "0".should.eq(finalBalance.toString());
                "0".should.eq(finalSupply.toString());
                "0".should.eq(endingEther.toString());
            });
        });
    });
});
