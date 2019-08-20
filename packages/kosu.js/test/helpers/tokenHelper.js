const contracts = require("@kosu/system-contracts/dist/src");
const TestTokenWrapper = contracts.TestTokenContract;
const TestTokenArtifact = contracts.artifacts.TestToken;
const BigNumber = require("@0x/utils").BigNumber;

function wrap(contract) {
    return {
        name: function name() {
            return contract.name.callAsync();
        },
        symbol: function symbol() {
            return contract.symbol.callAsync();
        },
        totalSupply: function totalSupply() {
            return contract.totalSupply.callAsync();
        },
        decimals: function decimals() {
            return contract.decimals.callAsync();
        },
        balanceOf: function balanceOf(owner) {
            return contract.balanceOf.callAsync(owner);
        },
        allowance: function allowance(owner, spender) {
            return contract.allowance.callAsync(owner, spender);
        },
        approve: async function approve(spender, value, from = null) {
            if (from === null) from = await web3.eth.getCoinbase();
            return contract.approve.awaitTransactionSuccessAsync(spender, new BigNumber(value.toString()), { from: from });
        },
        transferFrom: async function transferFrom(fromAddress, to, value, from = null) {
            if (from === null) from = await web3.eth.getCoinbase();
            return contract.transferFrom.awaitTransactionSuccessAsync(fromAddress, to, new BigNumber(value.toString()), { from: from });
        },
        transfer: async function transfer(to, value, from = null) {
            if (from === null) from = await web3.eth.getCoinbase();
            return contract.transfer.awaitTransactionSuccessAsync(to, new BigNumber(value.toString()), { from: from });
        },
    };
}

module.exports = async () => {

    const tkaContract = await TestTokenWrapper.deployFrom0xArtifactAsync(TestTokenArtifact, provider, { from: accounts[7] }, "Token A", "TKA");
    const tkbContract = await TestTokenWrapper.deployFrom0xArtifactAsync(TestTokenArtifact, provider, { from: accounts[8] }, "Token B", "TKB");

    global.TKA = tkaContract.address;
    global.tka = wrap(tkaContract);

    global.TKB = tkbContract.address;
    global.tkb = wrap(tkbContract);
};
