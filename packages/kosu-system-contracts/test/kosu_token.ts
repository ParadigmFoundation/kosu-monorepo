import { fromWei } from "web3-utils";
describe.only("KosuToken", () => {
    let token;

    const printInfo = async () => {
        await token.balanceOf.callAsync(accounts[0]).then(async x => {
            await web3Wrapper.getBalanceInWeiAsync(token.address).then(b => {
                const tokens = fromWei(x.toString());
                const ether = fromWei(b.toString());
                console.log(`Tokens: ${tokens}, Ether: ${ether}`);
            });
        });
    };

    before(() => {
        token = contracts.kosuToken;
    });

    it("should receive a transfer and mint some tokens", async () => {
        await printInfo();
        const resp = await web3Wrapper.sendTransactionAsync({ to: token.address, value: TestValues.oneEther, from: accounts[0] }).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash));
        await printInfo();
        await web3Wrapper.sendTransactionAsync({ to: token.address, value: TestValues.oneEther, from: accounts[0] }).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash));
        await printInfo();
        await web3Wrapper.sendTransactionAsync({ to: token.address, value: TestValues.oneEther, from: accounts[0] }).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash));
        await printInfo();
        await web3Wrapper.sendTransactionAsync({ to: token.address, value: TestValues.oneEther, from: accounts[0] }).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash));
        await printInfo();
        await web3Wrapper.sendTransactionAsync({ to: token.address, value: TestValues.oneEther, from: accounts[0] }).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash));
        await printInfo();
        await web3Wrapper.sendTransactionAsync({ to: token.address, value: TestValues.oneEther, from: accounts[0] }).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash));
        await printInfo();
        await web3Wrapper.sendTransactionAsync({ to: token.address, value: TestValues.oneEther, from: accounts[0] }).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash));
        await printInfo();
        await web3Wrapper.sendTransactionAsync({ to: token.address, value: TestValues.oneEther, from: accounts[0] }).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash));
        await printInfo();
        await web3Wrapper.sendTransactionAsync({ to: token.address, value: TestValues.oneEther, from: accounts[0] }).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash));
        await printInfo();
        await web3Wrapper.sendTransactionAsync({ to: token.address, value: TestValues.oneEther, from: accounts[0] }).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash));
        await printInfo();
        await web3Wrapper.sendTransactionAsync({ to: token.address, value: TestValues.oneEther, from: accounts[0] }).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash));
        await printInfo();
        await web3Wrapper.sendTransactionAsync({ to: token.address, value: TestValues.oneEther, from: accounts[0] }).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash));
        await printInfo();

        await token.liquidateTokens.awaitTransactionSuccessAsync(TestValues.oneEther.times(30));
        await printInfo();
        await token.liquidateTokens.awaitTransactionSuccessAsync(TestValues.oneEther);
        await printInfo();
        await token.liquidateTokens.awaitTransactionSuccessAsync(TestValues.oneEther);
        await printInfo();
        await token.liquidateTokens.awaitTransactionSuccessAsync(TestValues.oneEther);
        await printInfo();
        await token.liquidateTokens.awaitTransactionSuccessAsync(TestValues.oneEther);
        await printInfo();
        await token.liquidateTokens.awaitTransactionSuccessAsync(TestValues.oneEther);
        await printInfo();
        await token.liquidateTokens.awaitTransactionSuccessAsync(TestValues.oneEther);
        await printInfo();
        await token.liquidateTokens.awaitTransactionSuccessAsync(TestValues.oneEther);
        await printInfo();
        await token.liquidateTokens.awaitTransactionSuccessAsync(TestValues.oneEther);
        await printInfo();
        await token.liquidateTokens.awaitTransactionSuccessAsync(TestValues.oneEther);
        await printInfo();
        await token.liquidateTokens.awaitTransactionSuccessAsync(TestValues.oneEther);
        await printInfo();
        await token.liquidateTokens.awaitTransactionSuccessAsync(TestValues.oneEther);
        await printInfo();
        await token.liquidateTokens.awaitTransactionSuccessAsync(TestValues.oneEther);
        await printInfo();
        await token.liquidateTokens.awaitTransactionSuccessAsync(TestValues.oneEther);
        await printInfo();

        await token.liquidateTokens.awaitTransactionSuccessAsync(await token.balanceOf.callAsync(accounts[0]));
        await printInfo();
    });
});
