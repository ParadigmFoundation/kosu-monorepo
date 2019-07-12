import { MnemonicWalletSubprovider, RPCSubprovider } from "@0x/subproviders";
import { BigNumber, providerUtils } from "@0x/utils";
import { Web3Wrapper } from "@0x/web3-wrapper";
import safeRequire from "safe-node-require";
import Web3 from "web3";
import Web3ProviderEngine from "web3-provider-engine";
import yargs from "yargs";

import { artifacts, DeployedAddresses, KosuTokenContract } from "..";

const args = yargs
    .option("rpc-url", {
        type: "string",
        default: "http://localhost:8545",
    })
    .boolean("test-mnemonic").argv;
let mnemonic = safeRequire("./mnemonic.json");
if (args["test-mnemonic"] || !mnemonic) {
    mnemonic = process.env.npm_package_config_test_mnemonic;
}

(async () => {
    const rpcSubprovider = new RPCSubprovider(args["rpc-url"]);
    const provider = new Web3ProviderEngine();
    provider.addProvider(rpcSubprovider);
    providerUtils.startProviderEngine(provider);
    const web3 = new Web3(args["rpc-url"]);
    const web3Wrapper = new Web3Wrapper(provider);

    const networkId = await web3.eth.net.getId();

    const kosuToken = new KosuTokenContract(
        artifacts.KosuToken.compilerOutput.abi,
        DeployedAddresses[networkId].KosuToken,
        provider,
    );
    const addresses = await web3.eth.getAccounts();

    for (const account of addresses) {
        const expectedAmount = await kosuToken.estimateEtherToToken.callAsync(new BigNumber(web3.utils.toWei("60")));
        /* tslint:disable */
        await kosuToken.bondTokens.awaitTransactionSuccessAsync(new BigNumber("0"), { from: account.toLowerCase(), gas: 4500000, value: new BigNumber(web3.utils.toWei("60")) })
            .then(
            () => console.log(`Minted ${expectedAmount.toString()} tokens for ${account}.`),
            async reason => {
                console.log(`Failed to mint tokens with ${account} due to:`);
                console.log(reason);
                return Promise.reject();
            },
        );
    }
})().catch(err => console.log(err));
