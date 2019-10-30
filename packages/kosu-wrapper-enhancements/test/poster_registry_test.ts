import { KosuToken, PosterRegistry, Treasury } from "../src";

describe("PosterRegistry", () => {
    let kosuToken: KosuToken;
    let treasury: Treasury;
    let posterRegistry: PosterRegistry;

    before(() => {
        kosuToken = new KosuToken(enhancementOptions);
        treasury = new Treasury(enhancementOptions, kosuToken);
        posterRegistry = new PosterRegistry(enhancementOptions, treasury);
    });

    describe("pay", () => {
        it("should generate treasury balance", async () => {
            const initialSystemBalance = await treasury.systemBalance(accounts[0]);
            const initialPosterBalance = await posterRegistry.tokensRegisteredFor(accounts[0]);
            await posterRegistry.pay(TestValues.oneEther);
            const finalSystemBalance = await treasury.systemBalance(accounts[0]);
            const finalPosterBalance = await posterRegistry.tokensRegisteredFor(accounts[0]);

            const difference = finalSystemBalance.minus(initialSystemBalance);
            const posterDifference = finalPosterBalance.minus(initialPosterBalance);

            difference.toString().should.eq(posterDifference.toString());

            await posterRegistry.releaseTokens(difference);
            await treasury.withdraw(difference);
            await kosuToken.releaseTokens(difference);
        });
    });
});
