import { LogDecoder } from "@0x/contracts-test-utils";
import { BlockchainLifecycle } from "@0x/dev-utils";
import { CoverageSubprovider } from "@0x/sol-coverage";
import { SolCompilerArtifactAdapter } from "@0x/sol-trace";
import { GanacheSubprovider, RPCSubprovider } from "@0x/subproviders";
import { BigNumber, providerUtils } from "@0x/utils";
import { Web3Wrapper } from "@0x/web3-wrapper";
import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import Web3 from "web3";
import Web3ProviderEngine from "web3-provider-engine";
import { toWei } from "web3-utils";

import { artifacts } from "../src";
import { migrations } from "../src/migrations";

const useGeth = process.argv.includes("geth");
const runCoverage = process.argv.includes("runCoverage");

chai.use(chaiAsPromised);
chai.should();

let coverageSubprovider;

before(async () => {
    const provider = new Web3ProviderEngine();

    if (useGeth) {
        const rpcSubprovider = new RPCSubprovider(process.env.WEB3_URI);
        provider.addProvider(rpcSubprovider);
    } else {
        if (runCoverage) {
            console.log("running coverage");
            const artifactAdapter = new SolCompilerArtifactAdapter();
            coverageSubprovider = new CoverageSubprovider(
                artifactAdapter,
                "0xc521f483f607eb5ea4d6b2dfdbd540134753a865",
                { ignoreFilesGlobs: ["**/node_modules/**", "**/IValidatorRegistry.sol", "**/IPosterRegistry.sol"] },
            );
            provider.addProvider(coverageSubprovider);
        }

        const ganacheSubprovider = new GanacheSubprovider({ mnemonic: process.env.npm_package_config_test_mnemonic });
        provider.addProvider(ganacheSubprovider);
    }

    providerUtils.startProviderEngine(provider);

    const web3 = new Web3(provider);
    const web3Wrapper = new Web3Wrapper(provider);

    web3Wrapper.abiDecoder.addABI(artifacts.EventEmitter.compilerOutput.abi, artifacts.EventEmitter.contractName);
    web3Wrapper.abiDecoder.addABI(artifacts.KosuToken.compilerOutput.abi, artifacts.KosuToken.contractName);

    // @ts-ignore
    await new BlockchainLifecycle(web3Wrapper).startAsync();

    const normalizedFromAddress = await web3.eth.getCoinbase().then((x: string) => x.toLowerCase());

    const txDefaults = {
        from: normalizedFromAddress,
        gas: 4500000,
        gasPrice: toWei("5", "gwei"),
    };

    const contracts = await migrations(provider, txDefaults);
    const accounts = await web3.eth.getAccounts().then(a => a.map(v => v.toLowerCase()));

    const testValues: TestValues = {
        zero: new BigNumber("0"),
        oneWei: new BigNumber("1"),
        fiftyWei: new BigNumber("50"),
        oneHundredWei: new BigNumber("100"),
        halfEther: new BigNumber(toWei("0.5")),
        oneEther: new BigNumber(toWei("1")),
        fiveEther: new BigNumber(toWei("5")),
        sixEther: new BigNumber(toWei("6")),
        oneHundredEther: new BigNumber(toWei("100")),
        maxUint: new BigNumber(2).pow(new BigNumber(256)).minus(new BigNumber(1)),
    };

    const testHelpers = {
        clearTreasury: async address => {
            const transactions = [];
            const systemBalance = await contracts.treasury.systemBalance.callAsync(address);
            if (systemBalance.gt(0)) {
                const currentBalance = await contracts.treasury.currentBalance.callAsync(address);
                if (systemBalance.gt(currentBalance)) {
                    transactions.push(
                        contracts.treasury.releaseTokens.awaitTransactionSuccessAsync(
                            address,
                            systemBalance.minus(currentBalance),
                        ),
                    );
                }
                transactions.push(
                    contracts.treasury.withdraw.awaitTransactionSuccessAsync(systemBalance, { from: address }),
                );
                await Promise.all(transactions);
            }
        },
        ensureTokenBalance: async (address: string, desiredValue: BigNumber): Promise<void> => {
            const transactions = [];
            await contracts.kosuToken.balanceOf.callAsync(address).then(async balance => {
                if (balance.gt(desiredValue)) {
                    transactions.push(
                        contracts.kosuToken.transfer.awaitTransactionSuccessAsync(
                            accounts[0],
                            balance.minus(desiredValue),
                            {
                                from: address,
                            },
                        ).should.eventually.be.fulfilled,
                    );
                } else if (balance.lt(desiredValue)) {
                    transactions.push(
                        contracts.kosuToken.transfer.awaitTransactionSuccessAsync(address, desiredValue.minus(balance))
                            .should.eventually.be.fulfilled,
                    );
                }
            });
            await Promise.all(transactions);
            await contracts.kosuToken.balanceOf
                .callAsync(address)
                .then(val => val.toString())
                .should.eventually.eq(
                    desiredValue.toString(),
                    `Ensure ${address} has balanceOf ${desiredValue.toString()} failed`,
                );
        },
        skipBlocks: async (num): Promise<void> => {
            const _num = typeof num === "number" ? num : num.toNumber();
            for (let i = 0; i < _num; i++) {
                await web3Wrapper
                    .sendTransactionAsync({ from: accounts[0], to: accounts[1], value: 0 })
                    .then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash));
            }
        },
        cleanAccounts: async () => {
            const transactions = [];
            for (const account of accounts) {
                await testHelpers.clearTreasury(account);
                if (account !== accounts[0]) {
                    await testHelpers.ensureTokenBalance(account, testValues.zero);
                }
                transactions.push(
                    contracts.kosuToken.approve.awaitTransactionSuccessAsync(
                        contracts.treasury.address,
                        testValues.zero,
                        {
                            from: account,
                        },
                    ),
                );
            }
        },
    };

    Object.assign(global, { ...testHelpers, txDefaults, testValues, contracts, accounts, web3, web3Wrapper });
});

after(async () => {
    if (coverageSubprovider) {
        await coverageSubprovider.writeCoverageAsync();
    }
});
