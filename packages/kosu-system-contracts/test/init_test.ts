import { LogDecoder } from "@0x/contracts-test-utils";
import { BlockchainLifecycle } from "@0x/dev-utils";
import { CoverageSubprovider } from "@0x/sol-coverage";
import { SolCompilerArtifactAdapter } from "@0x/sol-trace";
import { GanacheSubprovider, RPCSubprovider } from "@0x/subproviders";
import { BigNumber, providerUtils } from "@0x/utils";
import { Web3Wrapper } from "@0x/web3-wrapper";
import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { soliditySHA3 as solSHA3 } from "ethereumjs-abi";
import { bufferToHex } from "ethereumjs-util";
import Web3 from "web3";
import Web3ProviderEngine from "web3-provider-engine";
import { toTwosComplement, toWei } from "web3-utils";

import { BasicTradeSubContractContract } from "../generated-wrappers/basic_trade_sub_contract";
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

describe.only("SubContract", () => {
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

    let subContract;

    before(async () => {
        subContract = await BasicTradeSubContractContract.deployFrom0xArtifactAsync(
            artifacts.BasicTradeSubContract,
            web3.currentProvider,
            txDefaults,
            JSON.stringify(argumentsJson),
        );
    });

    it("should serialize and sign the data", async () => {
        const order = {
            signer: accounts[0],
            signerToken: contracts.kosuToken.address,
            signerTokenCount: 40,
            buyerToken: contracts.kosuToken.address,
            buyerTokenCount: 80,
        };

        const { signer } = order;

        const datatypes = [];
        const values = [];
        argumentsJson.maker.forEach(argument => {
            if (argument.name.includes("signature")) {
                return;
            }
            if (order[argument.name] !== undefined) {
                datatypes.push(argument.datatype);
                values.push(order[argument.name].toString());
            }
        });
        const orderHex = bufferToHex(solSHA3(datatypes, values));

        let raw: string;

        try {
            // @ts-ignore
            raw = await web3.eth.personal.sign(orderHex, signer);
        } catch (e) {
            raw = await web3.eth.sign(orderHex, signer);
        }

        const hex =
            order.signer +
            order.signerToken.substr(2) +
            toTwosComplement(order.signerTokenCount).substr(2) +
            order.buyerToken.substr(2) +
            toTwosComplement(order.buyerTokenCount).substr(2) +
            raw.substr(2) +
            toTwosComplement(order.signerTokenCount).substr(2);

        await contracts.kosuToken.approve.awaitTransactionSuccessAsync(subContract.address, testValues.maxUint);
        const resp = await web3Wrapper.awaitTransactionSuccessAsync(
            await subContract.participate.sendTransactionAsync(hex),
        );
        console.log(JSON.stringify(resp.logs, null, 2));
        console.log(JSON.stringify(order, null, 2));
        console.log(JSON.stringify(raw, null, 2));
    });
});

after(async () => {
    if (coverageSubprovider) {
        await coverageSubprovider.writeCoverageAsync();
    }
});
