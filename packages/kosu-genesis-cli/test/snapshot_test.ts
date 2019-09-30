import { BlockchainLifecycle } from "@0x/dev-utils";
import { GanacheSubprovider } from "@0x/subproviders";
import { BigNumber, providerUtils } from "@0x/utils";
import { Web3Wrapper } from "@0x/web3-wrapper";
import { Kosu } from "@kosu/kosu.js";
import { migrations } from "@kosu/system-contracts/src/migrations";
import { TestHelpers } from "@kosu/system-contracts/src/test-helpers";
import chai from "chai";
import CAP from "chai-as-promised";
import Web3 from "web3";
import Web3ProviderEngine from "web3-provider-engine";

import { snapshotPostersAtBlock, snapshotValidatorsAtBlock } from "..";

describe("Snapshot tests with contract system (integration tests)", function (): void {
    let kosu: Kosu;
    let assert: Chai.AssertStatic;
    let provider: Web3ProviderEngine;
    let blockchainLifecycle: BlockchainLifecycle;
    let web3: Web3;
    let web3Wrapper: Web3Wrapper;
    let accounts: string[];
    let testHelpers: TestHelpers;
    let config: any;

    const validatorBlockNumbers = [];
    // tslint:disable
    this.beforeAll(async () => {
        chai.use(CAP);
        chai.should();
        assert = chai.assert;

        provider = new Web3ProviderEngine();

        const ganacheSubprovider = new GanacheSubprovider({
            network_id: 6175,
            mnemonic: process.env.npm_package_config_test_mnemonic,
        });
        provider.addProvider(ganacheSubprovider);
        providerUtils.startProviderEngine(provider);

        web3 = new Web3(provider);
        accounts = await web3.eth.getAccounts();
        web3Wrapper = new Web3Wrapper(provider);
        blockchainLifecycle = new BlockchainLifecycle(web3Wrapper);
        await blockchainLifecycle.startAsync();

        const migratedContracts = await migrations(provider, { from: accounts[0].toLowerCase() });

        config = {
            provider,
            networkId: await web3.eth.net.getId(),
            from: accounts[0].toLowerCase(),
            migratedContracts,
            votingAddress: migratedContracts.voting.address,
            treasuryAddress: migratedContracts.treasury.address,
            kosuTokenAddress: migratedContracts.kosuToken.address,
            eventEmitterAddress: migratedContracts.eventEmitter.address,
            orderGatewayAddress: migratedContracts.orderGateway.address,
            posterRegistryAddress: migratedContracts.posterRegistry.address,
            validatorRegistryAddress: migratedContracts.validatorRegistry.address,
        };

        testHelpers = new TestHelpers(web3Wrapper as any, config);
        kosu = new Kosu(config);
    });

    it("should connect to web3", () => {
        accounts.length.should.be.gte(10, "There should be 10 ETH accounts.");
    });

    it("should bond tokens for each account", async () => {
        const ether = new BigNumber("1e18");
        for (const address of accounts) {
            await web3.eth.sendTransaction({
                from: address,
                to: config.kosuTokenAddress,
                value: `0x${ether.toString(16)}`,
            });
            await testHelpers.skipBlocks(2);
            const balance = await kosu.kosuToken.balanceOf(address);
            assert(balance.isGreaterThan(0), "should have kosu tokens");
        }
    });

    it("should prepare some validators", async () => {
        for (const address of accounts) {
            const publicKey = web3.utils.padRight(address, 32, "0");
            await testHelpers.prepareConfirmedListing(publicKey, {
                stake: new BigNumber("500e18"),
                details: address.toLowerCase(),
                reward: new BigNumber(0),
            });
            validatorBlockNumbers.push(await web3.eth.getBlockNumber());
            const listing = await kosu.validatorRegistry.getListing(publicKey);
            (listing.status as string).should.be.equals(2);
        }
    });

    it("should prepare a poster", async () => {
        await testHelpers.prepareTokens(accounts[0], new BigNumber("1e18"));
        await kosu.posterRegistry.registerTokens(new BigNumber("1e18"));
        const registered = await kosu.posterRegistry.tokensRegisteredFor(accounts[0]);
        registered.isGreaterThan(0).should.be.true;
    });

    it("should create an accurate validator snapshot for the current block", async () => {
        const currentBlock = await web3.eth.getBlockNumber();
        const listings = await kosu.validatorRegistry.getAllListings();

        const expectedSnapshot = [];
        for (const listing of listings) {
            if (listing.status !== 2) {
                continue;
            }

            // address will be the first 20-bytes of the public key (incl. the 0x)
            const publicKey = Buffer.from(listing.tendermintPublicKey.slice(2), "hex");
            const ethAddress = accounts[0].toLowerCase();
            const details = listing.tendermintPublicKey.slice(0, 42).toLowerCase();
            const stakeAmount = listing.stakedBalance.toString();
            const status = "validator";
            expectedSnapshot.push({ publicKey, ethAddress, details, stakeAmount, status });
        }

        const generatedSnapshot = await snapshotValidatorsAtBlock(kosu, currentBlock);
        expectedSnapshot.should.eql(generatedSnapshot, "snapshot should match expected");
    });

    it("should create an accurate validator snapshot for the previous block", async () => {
        const snapshotBlock = validatorBlockNumbers[8];

        const expectedSnapshotLength = 9;
        const generatedSnapshot = await snapshotValidatorsAtBlock(kosu, snapshotBlock);
        expectedSnapshotLength.should.eql(
            generatedSnapshot.length,
            "snapshot length should be less before last validator joins",
        );
    });

    it("should produce an empty validator snapshot from the 0th block", async () => {
        const snapshotBlock = 0;

        const expectedSnapshotLength = 0;
        const generatedSnapshot = await snapshotValidatorsAtBlock(kosu, snapshotBlock);
        expectedSnapshotLength.should.eql(generatedSnapshot.length, "validator snapshot length should be 0");
    });

    it("should produce an empty poster snapshot from the 0th block", async () => {
        const snapshotBlock = 0;

        const expectedSnapshotLength = 0;
        const generatedSnapshot = await snapshotPostersAtBlock(kosu, snapshotBlock);
        expectedSnapshotLength.should.eql(generatedSnapshot.length, "poster snapshot length should be 0");
    });

    it("should produce a poster snapshot that matches the expected snapshot", async () => {
        const currentBlock = await web3.eth.getBlockNumber();
        const expectedSnapshot = [
            {
                ethereum_address: accounts[0].toLowerCase(),
                balance: new BigNumber("1e18").toString(),
            },
        ];
        const generatedSnapshot = await snapshotPostersAtBlock(kosu, currentBlock);
        expectedSnapshot.should.eql(generatedSnapshot, "poster snapshot should match expected");
    });
});
