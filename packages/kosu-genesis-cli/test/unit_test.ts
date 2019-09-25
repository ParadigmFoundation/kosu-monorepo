import { BigNumber } from "@0x/utils";
import assert from "assert";

import {
    dateFromTimestamp,
    getAppState,
    getInitialValidatorInfo,
    getTendermintValidators,
    hexKeyToBase64,
    parseMonikerFromDetails,
    publicKeyToAddress,
} from "..";

describe("Snapshot function blockchain-less tests (unit tests)", function (): void {
    it("#dateFromTimestamp", function (): void {
        const date = new Date();
        const ts = date.getTime() / 1000;
        const generatedDate = dateFromTimestamp(ts);

        const expectedTime = date.toLocaleString();
        const actualTime = generatedDate.toLocaleString();
        assert.strictEqual(actualTime, expectedTime, "local time strings should match");
    });

    it("#parseMonikerFromDetails", function (): void {
        const expectedMoniker = "alice";
        const stringWithMoniker = `website=https://example.com,moniker=${expectedMoniker}`;
        const stringWithoutMoniker = "an ordinary string with no keys";

        assert.strictEqual(parseMonikerFromDetails(stringWithMoniker), expectedMoniker, "moniker should match when string contains one");
        assert.strictEqual(parseMonikerFromDetails(stringWithoutMoniker), stringWithoutMoniker, "with no moniker, output should match input");
    });

    it("#hexKeyToBase64", function (): void {
        const knownKey = Buffer.allocUnsafe(32);
        const knownHexKey = `0x${knownKey.toString("hex").toUpperCase()}`;
        const expectedBase64Key = knownKey.toString("base64");

        const actualBase64Key = hexKeyToBase64(knownHexKey);
        assert.strictEqual(actualBase64Key, expectedBase64Key, "base64 keys should match test case");
    });

    it("#publicKeyToAddress", function (): void {
        const knownHexKey = "0x2D03EA48ADDC6B56DC1D456ED8778C8152EDC74F58572306BB3353DDEFFAE2E5";
        const expectedAddress = "6E759A69DAF556E8C492D6AA9E263A6168F688B7";

        const publicKey = Buffer.from(knownHexKey.slice(2), "hex");
        const generatedAddress = publicKeyToAddress(publicKey);

        assert.strictEqual(generatedAddress, expectedAddress, "generated address should match test case");
    });

    it("#getInitialValidatorInfo", function (): void {
        const testPubKey = Buffer.allocUnsafe(32);
        const testEthAddress = `0x${Buffer.allocUnsafe(20).toString("hex")}`;
        const testTendermintAddress = publicKeyToAddress(testPubKey);
        const testInitialStake = new BigNumber("500e18").toString();

        const testSnapshots = [
            {
                publicKey: testPubKey,
                ethAddress: testEthAddress,
                details: "test case",
                stakeAmount: testInitialStake,
                status: "validator",
            },
        ];

        const expectedValidatorInfo = [
            {
                ethereum_address: testEthAddress,
                tendermint_address: testTendermintAddress,
                initial_stake: testInitialStake,
            },
        ];

        const actualValidatorInfo = getInitialValidatorInfo(testSnapshots);
        assert.strictEqual(
            actualValidatorInfo.length,
            expectedValidatorInfo.length,
            "validator info array length should match",
        );

        const { ethereum_address, tendermint_address, initial_stake } = actualValidatorInfo[0];
        assert.strictEqual(ethereum_address, testEthAddress, "ethereum address should match snapshot");
        assert.strictEqual(tendermint_address, testTendermintAddress, "tendermint address should match snapshot");
        assert.strictEqual(initial_stake, testInitialStake, "initial stakes should match snapshot");
    });

    it("#getTendermintValidators", function (): void {
        const testPubKey = Buffer.allocUnsafe(32);
        const testEthAddress = `0x${Buffer.allocUnsafe(20).toString("hex")}`;
        const testTendermintAddress = publicKeyToAddress(testPubKey);
        const testDetails = "test case";

        const testSnapshots = [
            {
                publicKey: testPubKey,
                ethAddress: testEthAddress,
                details: testDetails,
                stakeAmount: new BigNumber("500e18").toString(),
                status: "validator",
            },
        ];

        const expectedTendermintValidators = [
            {
                address: testTendermintAddress,
                pub_key: {
                    type: "tendermint/PubKeyEd25519",
                    value: testPubKey.toString("base64"),
                },
                name: testDetails,
            },
        ];

        const actualTendermintValidators = getTendermintValidators(testSnapshots);
        assert.strictEqual(
            actualTendermintValidators.length,
            expectedTendermintValidators.length,
            "validator info array length should match",
        );

        const { address, name } = actualTendermintValidators[0];
        assert.strictEqual(address, testTendermintAddress, "tendermint address should match expected");
        assert.strictEqual(name, testDetails, "validator name should match snapshot details");
    });

    it("#getAppState", function (): void {
        const testPubKey = Buffer.allocUnsafe(32);
        const testEthAddress = `0x${Buffer.allocUnsafe(20).toString("hex")}`;
        const testTendermintAddress = publicKeyToAddress(testPubKey);
        const testInitialStake = new BigNumber("500e18").toString();

        const testPosterAddress = `0x${Buffer.allocUnsafe(20).toString("hex")}`;
        const testPosterBalance = new BigNumber("42e18");

        const testSnapshotBlock = 9999;
        const testConsensusParams = {
            finality_threshold: 11,
            period_limit: 12,
            period_length: 13,
            max_order_bytes: 14,
            blocks_before_pruning: 15,
        };
        const testValidatorSnapshots = [
            {
                publicKey: testPubKey,
                ethAddress: testEthAddress,
                stakeAmount: testInitialStake,
                status: "validator",
                details: "test case",
            },
        ];
        const testPosterSnapshots = [
            {
                address: testPosterAddress,
                balance: testPosterBalance,
            },
        ];

        const expectedAppState = {
            initial_validator_info: [
                {
                    tendermint_address: testTendermintAddress,
                    ethereum_address: testEthAddress,
                    initial_stake: testInitialStake,
                },
            ],
            initial_poster_info: [
                {
                    address: testPosterAddress,
                    balance: testPosterBalance,
                },
            ],
            snapshot_block: testSnapshotBlock,
            consensus_params: testConsensusParams,
        };

        const actualAppState = getAppState(
            testValidatorSnapshots,
            testPosterSnapshots,
            testSnapshotBlock,
            testConsensusParams,
        );
        assert.deepStrictEqual(actualAppState, expectedAppState, "generated app state should match expected");
    });
});
