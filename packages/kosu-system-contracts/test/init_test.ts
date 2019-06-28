import { LogDecoder } from "@0x/contracts-test-utils";
import { BlockchainLifecycle } from "@0x/dev-utils";
import { CoverageSubprovider } from "@0x/sol-coverage";
import { RevertTraceSubprovider, SolCompilerArtifactAdapter } from "@0x/sol-trace";
import { GanacheSubprovider, RPCSubprovider } from "@0x/subproviders";
import { providerUtils } from "@0x/utils";
import { Web3Wrapper } from "@0x/web3-wrapper";
import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { ContractArtifact } from "ethereum-types";
import Web3 from "web3";
import Web3ProviderEngine from "web3-provider-engine";
import { toTwosComplement, toWei } from "web3-utils";

import { BasicTradeSubContractContract } from "../generated-wrappers/basic_trade_sub_contract";
import { artifacts } from "../src";
import { migrations } from "../src/migrations";
import { TestHelpers, TestValues } from "../src/test-helpers";

const useGeth = process.argv.includes("geth");
const runCoverage = process.argv.includes("runCoverage");
const trace = process.argv.includes("trace");

chai.use(chaiAsPromised);
chai.should();

let coverageSubprovider;

before(async () => {
    const provider = new Web3ProviderEngine();

    if (useGeth) {
        const rpcSubprovider = new RPCSubprovider(process.env.WEB3_URI);
        provider.addProvider(rpcSubprovider);
    } else {
        const artifactAdapter = new SolCompilerArtifactAdapter();
        if (runCoverage) {
            coverageSubprovider = new CoverageSubprovider(
                artifactAdapter,
                "0xc521f483f607eb5ea4d6b2dfdbd540134753a865",
                {
                    ignoreFilesGlobs: [
                        "**/node_modules/openzeppelin-solidity/**",
                        "**/node_modules/@kosu/subcontract-sdk/contracts/SubContract.sol",
                        "**/IPosterRegistry.sol",
                    ],
                },
            );
            provider.addProvider(coverageSubprovider);
        } else if (trace) {
            const traceSubprovider = new RevertTraceSubprovider(
                artifactAdapter,
                "0xc521f483f607eb5ea4d6b2dfdbd540134753a865",
            );
            provider.addProvider(traceSubprovider);
        }

        const ganacheSubprovider = new GanacheSubprovider({ mnemonic: process.env.npm_package_config_test_mnemonic, network_id: 6174 });
        provider.addProvider(ganacheSubprovider);
    }

    providerUtils.startProviderEngine(provider);

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

    const normalizedFromAddress = await web3.eth.getCoinbase().then((x: string) => x.toLowerCase());

    const txDefaults = {
        from: normalizedFromAddress,
        gas: 4500000,
        gasPrice: toWei("5", "gwei"),
    };

    const contracts = (await migrations(provider, txDefaults, { noLogs: true })) as MigratedTestContracts;
    contracts.basicTradeSubContract = await BasicTradeSubContractContract.deployFrom0xArtifactAsync(
        artifacts.BasicTradeSubContract as ContractArtifact,
        web3.currentProvider,
        txDefaults,
        JSON.stringify(argumentsJson),
    );

    const testHelpers = new TestHelpers(web3Wrapper, { migratedContracts: contracts });

    Object.assign(global, {
        testHelpers,
        txDefaults,
        TestValues,
        contracts,
        accounts: await testHelpers.getAccounts(),
        web3,
        web3Wrapper,
        provider,
    });
});

after(async () => {
    if (coverageSubprovider) {
        await coverageSubprovider.writeCoverageAsync();
    }
});

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
