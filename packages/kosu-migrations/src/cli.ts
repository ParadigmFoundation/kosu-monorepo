import { MnemonicWalletSubprovider, RPCSubprovider } from "@0x/subproviders";
import { BigNumber, providerUtils } from "@0x/utils";
import { Web3Wrapper } from "@0x/web3-wrapper";
import { KosuTokenContract } from "@kosu/system-contracts";
import fs from "fs";
import safeRequire from "safe-node-require";
import Web3 from "web3";
import Web3ProviderEngine from "web3-provider-engine";
import { toWei } from "web3-utils";
import yargs from "yargs";

import * as deployedAddresses from "./deployedAddresses.json";
import { migrations } from "./migrations";

const args = yargs
    .option("rpc-url", {
        type: "string",
        description: "Full RPC url",
        default: "http://localhost:8545",
    })
    .option("force-fresh", {
        description: "Ensure the deploying address has no previous network transactions",
        type: "boolean",
    })
    .option("bond-tokens", {
        alias: "b",
        description: "Bond tokens for available addresses",
        type: "boolean",
    })
    .option("rpc-bond", {
        description: "Bond tokens for all available unlocked addresses in the provided rpc-url",
        type: "boolean",
    })
    .option("bond-only", {
        description: "Skip migrations and bond tokens",
        type: "boolean",
    })
    .option("ether-to-bond", {
        alias: "e",
        type: "number",
        description:
            "Value in ether to bond for all available addresses (addresses with insufficient balance are skipped)",
        default: 60,
    })
    .alias("h", "help")
    .boolean("test-mnemonic").argv;

let mnemonic = safeRequire("./mnemonic.json");
if (args.testMnemonic || !mnemonic) {
    mnemonic = process.env.npm_package_config_test_mnemonic;
}

const bondTokens = async provider => {
    const web3Wrapper = new Web3Wrapper(provider);
    const web3 = new Web3(provider);
    const networkId = await web3Wrapper.getNetworkIdAsync();
    const addresses = await web3Wrapper.getAvailableAddressesAsync();

    const kosuToken = new KosuTokenContract(
        deployedAddresses[networkId.toString()].KosuToken.contractAddress,
        provider,
    );

    for (const account of addresses) {
        if (account.toLowerCase() === "0x5409ed021d9299bf6814279a6a1411a7e866a631".toLowerCase() && await web3.eth.getTransactionCount(account) === 0) {
            continue;
        }
        const valueInWei = new BigNumber(Web3.utils.toWei(args.etherToBond.toString()));
        const expectedAmount = await kosuToken.estimateEtherToToken.callAsync(valueInWei);
        const accountBalance = await web3Wrapper.getBalanceInWeiAsync(account);
        if (accountBalance.lt(valueInWei)) {
            console.log(`Skipping ${account}, insufficient balance`);
            continue;
        }

        /* tslint:disable */
        await kosuToken.bondTokens
            .awaitTransactionSuccessAsync(new BigNumber("0"), {
                from: account.toLowerCase(),
                gas: 4500000,
                value: valueInWei,
            })
            .then(
                () => console.log(`Minted ${expectedAmount.toString()} tokens for ${account}.`),
                async reason => {
                    console.log(`Failed to mint tokens with ${account} due to:`);
                    console.log(reason);
                    return Promise.reject();
                },
            );
    }
};

(async () => {
    const mnemonicSubprovider = mnemonic ? new MnemonicWalletSubprovider({ mnemonic }) : null;
    const rpcSubprovider = new RPCSubprovider(args.rpcUrl);
    const providerEngine = new Web3ProviderEngine();
    if (mnemonicSubprovider) {
        providerEngine.addProvider(mnemonicSubprovider);
    }
    providerEngine.addProvider(rpcSubprovider);
    providerUtils.startProviderEngine(providerEngine);

    const web3 = new Web3(providerEngine);
    const web3Wrapper = new Web3Wrapper(providerEngine);
    const networkId = await web3Wrapper.getNetworkIdAsync();
    const addresses = await web3Wrapper.getAvailableAddressesAsync();
    const normalizedFromAddress = addresses[0].toLowerCase();

    const txDefaults = {
        from: normalizedFromAddress,
        gasPrice: toWei("5", "gwei"),
    };

    if (!args.bondOnly) {
        if (args.forceFresh) {
            for (let i = 0; i < 3; i++) {
                await web3Wrapper.sendTransactionAsync({
                    from: addresses[1],
                    to: addresses[0],
                    value: "0",
                    gas: "4500000",
                    gasPrice: "0",
                });
            }
        }

        if ((await web3.eth.getTransactionCount(normalizedFromAddress)) > 0 && args.forceFresh) {
            throw new Error("Reset Kosu Chain");
        }
        const migratedContracts = await migrations(providerEngine, txDefaults, {});

        const contracts = {};
        for (const contractKey of Object.keys(migratedContracts)) {
            const contract = migratedContracts[contractKey];
            contracts[contract.contractName] = contract.txReceipt;
            contracts[contract.contractName].timestamp = await web3.eth
                .getBlock(contract.txReceipt.blockNumber.toString())
                .then(b => b.timestamp);
        }
        deployedAddresses[networkId] = contracts;
        // @ts-ignore
        delete deployedAddresses.default;

        await new Promise<void>((resolve, reject) =>
            fs.writeFile("./src/deployedAddresses.json", JSON.stringify(deployedAddresses), () => resolve()),
        );
    }

    if (args.bondTokens || args.bondOnly) {
        bondTokens(providerEngine);
        if (args.rpcBond) {
            bondTokens(new Web3.providers.HttpProvider(args.rpcUrl));
        }
    }
})().catch(err => {
    console.log(err);
    process.exit(1);
});
