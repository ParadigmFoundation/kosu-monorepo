import { BlockchainLifecycle } from "@0x/dev-utils";
import { runMigrationsAsync as runZeroExMigrationsAsync } from "@0x/migrations";
import { CoverageSubprovider } from "@0x/sol-coverage";
import { RevertTraceSubprovider, SolCompilerArtifactAdapter } from "@0x/sol-trace";
import { GanacheSubprovider, RPCSubprovider } from "@0x/subproviders";
import { providerUtils } from "@0x/utils";
import { Web3Wrapper } from "@0x/web3-wrapper";
import { migrations } from "@kosu/migrations";
import { artifacts, BasicTradeSubContractContract } from "@kosu/system-contracts";
import { TestHelpers, TestValues } from "@kosu/test-helpers";
import { MigratedTestContracts } from "@kosu/types";
import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import chaiSubset from "chai-subset";
import { ContractArtifact } from "ethereum-types";
import Web3 from "web3";
import Web3ProviderEngine from "web3-provider-engine";
import { toWei } from "web3-utils";

const runCoverage = process.argv.includes("runCoverage");
const trace = process.argv.includes("trace");

chai.use(chaiAsPromised);
chai.use(chaiSubset);
chai.should();

// let coverageSubprovider;

before(async () => {
    // @ts-ignore
    const web3 = new Web3(provider);
    const web3Wrapper = new Web3Wrapper(provider);

    web3Wrapper.abiDecoder.addABI(artifacts.EventEmitter.compilerOutput.abi, artifacts.EventEmitter.contractName);
    web3Wrapper.abiDecoder.addABI(artifacts.KosuToken.compilerOutput.abi, artifacts.KosuToken.contractName);
    web3Wrapper.abiDecoder.addABI(
        artifacts.BasicTradeSubContract.compilerOutput.abi,
        artifacts.BasicTradeSubContract.contractName,
    );

    // @ts-ignore
    await new BlockchainLifecycle(web3Wrapper).startAsync();

    const accounts = await web3Wrapper.getAvailableAddressesAsync();
    const normalizedFromAddress = accounts[0].toLowerCase();

    const txDefaults = {
        from: normalizedFromAddress,
        gas: 6500000,
        gasPrice: toWei("5", "gwei"),
    };

    const contracts: MigratedTestContracts = await migrations(provider, txDefaults, { noLogs: true });
    contracts.basicTradeSubContract = await BasicTradeSubContractContract.deployFrom0xArtifactAsync(
        artifacts.BasicTradeSubContract,
        provider,
        txDefaults,
        JSON.stringify(argumentsJson),
    );
    contracts.kosuToken.bondTokens.awaitTransactionSuccessAsync(TestValues.zero, {
        value: TestValues.oneEther.times(200),
    });
    if (!useGeth) {
        await web3.eth.personal.importRawKey(
            // @ts-ignore
            "0xf2f48ee19680706196e2e339e5da3491186e0c4c5030670656b0e0164837257d",
            "password",
        );
        await web3.eth.personal.unlockAccount("0x5409ed021d9299bf6814279a6a1411a7e866a631", "password", 60000000);
        await web3Wrapper.sendTransactionAsync({
            from: accounts[9],
            to: "0x5409ed021d9299bf6814279a6a1411a7e866a631",
            value: TestValues.oneHundredEther.minus(TestValues.oneEther),
        });
        await runZeroExMigrationsAsync(provider, { ...txDefaults, from: "0x5409ed021d9299bf6814279a6a1411a7e866a631" });
    }

    const testHelpers = new TestHelpers(web3Wrapper, { migratedContracts: contracts });

    Object.assign(global, {
        testHelpers,
        txDefaults,
        TestValues,
        contracts,
        accounts,
        web3,
        web3Wrapper,
        provider,
    });
});

// after(async () => {
//     if (coverageSubprovider) {
//         await coverageSubprovider.writeCoverageAsync();
//     }
// });

const argumentsJson = {
    maker: [
        { datatype: "address", name: "signer" }, // 0
        { datatype: "address", name: "signerToken" }, // 1
        { datatype: "uint", name: "signerTokenCount" }, // 2
        { datatype: "address", name: "buyerToken" }, // 3
        { datatype: "uint", name: "buyerTokenCount" }, // 4
        { datatype: "signature", name: "signature", signatureFields: [0, 1, 2, 3, 4] }, // 5
    ],
    taker: [
        { datatype: "uint", name: "tokensToBuy" }, // 6
    ],
};
