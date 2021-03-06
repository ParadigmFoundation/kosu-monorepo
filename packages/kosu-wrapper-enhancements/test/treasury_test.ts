import { KosuToken, Treasury } from "../src";

describe("Treasury", () => {
    let kosuToken: KosuToken;
    let treasury: Treasury;

    before(() => {
        kosuToken = new KosuToken(enhancementOptions);
        treasury = new Treasury(enhancementOptions, kosuToken);
    });

    describe("pay", () => {
        it("should generate treasury balance", async () => {
            const initialSystemBalance = await treasury.systemBalance(accounts[0]);
            await treasury.pay(TestValues.oneEther);
            const finalSystemBalance = await treasury.systemBalance(accounts[0]);
            const difference = finalSystemBalance.minus(initialSystemBalance);
            difference.toNumber().should.be.gt(0);

            await treasury.withdraw(difference);
            await kosuToken.releaseTokens(difference);
        });
    });

    describe("proxy authorization", () => {
        it("should authorize and deauthorize", async () => {
            await treasury.isProxyFor(accounts[0], accounts[1]).should.eventually.eq(false);
            await treasury.authorizeProxy(accounts[1]);
            await treasury.isProxyFor(accounts[0], accounts[1]).should.eventually.eq(true);
            await treasury.deauthorizeProxy(accounts[1]);
            await treasury.isProxyFor(accounts[0], accounts[1]).should.eventually.eq(false);
        });
    });
});
