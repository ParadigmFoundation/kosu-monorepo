import {decodeKosuEvents} from "@kosu/utils";

import {KosuToken, Treasury, ValidatorRegistry} from "../src";

describe("ValidatorRegistry", () => {
    let kosuToken: KosuToken;
    let treasury: Treasury;
    let validatorRegistry: ValidatorRegistry;

    before(() => {
        kosuToken = new KosuToken(enhancementOptions);
        treasury = new Treasury(enhancementOptions, kosuToken);
        validatorRegistry = new ValidatorRegistry(enhancementOptions, treasury);
    });

    it("should allow validator interactions", async () => {
        const pubKey = "0x010203";

        const resp = await validatorRegistry.registerListing(
            pubKey,
            await validatorRegistry.minimumBalance(),
            TestValues.zero,
            "string",
        );
        decodeKosuEvents(resp.logs)[0].eventType.should.eq("ValidatorRegistered");

        const keys = await validatorRegistry.listingKeys();
        keys.length.should.eq(1);
        keys[0].should.contain(pubKey);
        const listing = await validatorRegistry.getListing(pubKey);
        const listings = await validatorRegistry.getListings([pubKey]);
        const allListings = await validatorRegistry.getAllListings();
        listing.should.deep.equals(listings[0]);
        allListings.should.deep.include(listing);
        const resp2 = await validatorRegistry.challengeListing(pubKey, "string");
        const decoded2 = decodeKosuEvents(resp2.logs);
        const { challengeId } = decoded2[1];
        const challenge = await validatorRegistry.getChallenge(challengeId);
        const challenges = await validatorRegistry.getChallenges([challengeId]);
        const allChallenges = await validatorRegistry.getAllChallenges();
        challenge.should.deep.equals(challenges[0]);
        allChallenges.should.deep.include(challenge);
        await testHelpers.skipChallengePeriod(resp2.blockNumber);
        await validatorRegistry.resolveChallenge(pubKey).should.eventually.be.fulfilled;
        const resp3 = await validatorRegistry.confirmListing(pubKey);
        const decoded3 = decodeKosuEvents(resp3.logs);
        decoded3[0].eventType.should.eq("ValidatorConfirmed");
        decoded3[1].eventType.should.eq("ValidatorRegistryUpdate");
        const resp4 = await validatorRegistry.initExit(pubKey);
        const decoded4 = decodeKosuEvents(resp4.logs);
        decoded4[0].eventType.should.eq("ValidatorRegistryUpdate");
        await testHelpers.skipExitPeriod(resp4.blockNumber);
        await validatorRegistry.finalizeExit(pubKey);

        await testHelpers.clearTreasury(accounts[0]);
        await treasury.systemBalance(accounts[0]).then(x => x.eq(0)).should.eventually.be.true;
    });
});
