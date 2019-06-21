import { MnemonicWalletSubprovider, RPCSubprovider } from "@0x/subproviders";
import { BigNumber, providerUtils } from "@0x/utils";
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
    const mnemonicSubprovider = mnemonic ? new MnemonicWalletSubprovider({ mnemonic }) : null;
    const rpcSubprovider = new RPCSubprovider(args["rpc-url"]);
    const provider = new Web3ProviderEngine();
    if (mnemonicSubprovider) {
        provider.addProvider(mnemonicSubprovider);
    }
    provider.addProvider(rpcSubprovider);
    providerUtils.startProviderEngine(provider);
    const web3 = new Web3(provider);
    const networkId = await web3.eth.net.getId();

    const kosuToken = new KosuTokenContract(
        artifacts.KosuToken.compilerOutput.abi,
        DeployedAddresses[networkId].KosuToken,
        provider,
    );
    const aLot = new BigNumber(web3.utils.toWei("100000"));
    const from = await web3.eth.getCoinbase();
    const addresses = ["0xAA554D0c5ff879387Fc234dE5D22EC02983baA27", "0x8b366a3d4e46aC5406F12766Ad33E6482Ce4F081"];
    addresses.push.apply(addresses, await web3.eth.getAccounts());

    for (const account of addresses) {
        await kosuToken.transfer.awaitTransactionSuccessAsync(account, aLot, { from, gas: 4500000 }).then(
            () => console.log(`Transferred ${aLot.toString()} tokens to ${account}.`),
            reason => {
                console.log(`Failed to send tokens to ${account} due to:`);
                console.log(reason);
                return Promise.reject();
            },
        );
    }
})().catch(err => console.log(err));
