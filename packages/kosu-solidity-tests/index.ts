import {GanacheSubprovider, RPCSubprovider} from "@0x/subproviders";
import {providerUtils} from "@0x/utils";
import {artifacts} from "@kosu/system-contracts";
import {TestValues} from "@kosu/test-helpers/dist/src";
import Gas from "eth-gas-reporter";
import fs from "fs";
import Mocha from "mocha";
import path from "path";
import Web3ProviderEngine from "web3-provider-engine";

// Instantiate a Mocha instance.
const mocha = new Mocha();

mocha.timeout(0);
mocha.slow(2000);
mocha.bail(true);

const useGeth = process.argv.includes("geth");
const provider = new Web3ProviderEngine();

if (useGeth) {
    const rpcSubprovider = new RPCSubprovider(process.env.WEB3_URI);

    provider.addProvider(rpcSubprovider);
} else {
    // const artifactAdapter = new SolCompilerArtifactAdapter();
    // if (runCoverage) {
    //     coverageSubprovider = new CoverageSubprovider(
    //         artifactAdapter,
    //         "0xc521f483f607eb5ea4d6b2dfdbd540134753a865",
    //         {
    //             ignoreFilesGlobs: [
    //                 "**/node_modules/openzeppelin-solidity/**",
    //                 "**/node_modules/@kosu/subcontract-sdk/contracts/SubContract.sol",
    //                 "**/IPosterRegistry.sol",
    //             ],
    //         },
    //     );
    //     provider.addProvider(coverageSubprovider);
    // } else if (trace) {
    //     const traceSubprovider = new RevertTraceSubprovider(
    //         artifactAdapter,
    //         "0xc521f483f607eb5ea4d6b2dfdbd540134753a865",
    //     );
    //     provider.addProvider(traceSubprovider);
    // }

    const ganacheSubprovider = new GanacheSubprovider({
        mnemonic: process.env.npm_package_config_test_mnemonic,
        network_id: 6175,
        default_balance_ether: TestValues.fiveHundredEther.multipliedBy(10),
    });
    console.log(ganacheSubprovider);
    provider.addProvider(ganacheSubprovider);
}

providerUtils.startProviderEngine(provider);

if (useGeth) {
    mocha.reporter(Gas, {
        onlyCalledMethods: true,
        artifactType: "0xProject-v2",
        provider,
        currency: "usd",
        gasPrice: "15",
        artifacts,
        url: process.env.WEB3_URI,
    });
}

Object.assign(global, {
    provider,
    useGeth,
    artifacts,
});

const testDir = "./dist/test/";

// Add each .js file to the mocha instance
fs.readdirSync(testDir).filter(file => {
    // Only keep the .js files
    return file.substr(-3) === ".js";

}).forEach(file => {
    mocha.addFile(
        path.join(testDir, file),
    );
});

// Run the tests.
mocha.run(failures => {
    process.exitCode = failures ? 1 : 0;  // exit with non-zero status if there were failures
});
