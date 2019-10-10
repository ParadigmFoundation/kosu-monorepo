const DeployedAddresses = require("@kosu/migrations").DeployedAddresses[6174];
const decodeKosuEvents = require("@kosu/contract-utils").decodeKosuEvents;

describe("ValidatorRegistry", () => {
    it("should allow validator interactions", async () => {
        const pubKey = "0x010203";

        const resp = await kosu.validatorRegistry.registerListing(
            pubKey,
            await kosu.validatorRegistry.minimumBalance(),
            TestValues.zero,
            "string",
        );
        decodeKosuEvents(resp.logs)[0].eventType.should.eq("ValidatorRegistered");

        const keys = await kosu.validatorRegistry.listingKeys();
        keys.length.should.eq(1);
        keys[0].should.contain(pubKey);
        const listing = await kosu.validatorRegistry.getListing(pubKey);
        const listings = await kosu.validatorRegistry.getListings([pubKey]);
        const allListings = await kosu.validatorRegistry.getAllListings();
        listing.should.deep.equals(listings[0]);
        allListings.should.deep.contain(listing);
        const resp2 = await kosu.validatorRegistry.challengeListing(pubKey, "string");
        const decoded2 = decodeKosuEvents(resp2.logs);
        const { challengeId } = decoded2[1];
        const challenge = await kosu.validatorRegistry.getChallenge(challengeId);
        const challenges = await kosu.validatorRegistry.getChallenges([challengeId]);
        const allChallenges = await kosu.validatorRegistry.getAllChallenges();
        challenge.should.deep.equals(challenges[0]);
        allChallenges.should.deep.contain(challenge);
        await testHelpers.skipChallengePeriod(resp2.blockNumber);
        await kosu.validatorRegistry.resolveChallenge(pubKey).should.eventually.be.fulfilled;
        const resp3 = await kosu.validatorRegistry.confirmListing(pubKey);
        const decoded3 = decodeKosuEvents(resp3.logs);
        decoded3[0].eventType.should.eq("ValidatorConfirmed");
        decoded3[1].eventType.should.eq("ValidatorRegistryUpdate");
        const resp4 = await kosu.validatorRegistry.initExit(pubKey);
        const decoded4 = decodeKosuEvents(resp4.logs);
        decoded4[0].eventType.should.eq("ValidatorRegistryUpdate");
        await testHelpers.skipExitPeriod(resp4.blockNumber);
        await kosu.validatorRegistry.finalizeExit(pubKey);

        await testHelpers.clearTreasury(accounts[0]);
        await kosu.treasury.systemBalance(accounts[0]).then(x => x.eq(0)).should.eventually.be.true;
    });
});
