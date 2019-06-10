import {MnemonicWalletSubprovider, RPCSubprovider} from "@0x/subproviders";
import {BigNumber, providerUtils} from "@0x/utils";
import Web3 from "web3";
import safeRequire from "safe-node-require";
import Web3ProviderEngine from "web3-provider-engine";
import yargs from "yargs";

import {artifacts, DeployedAddresses, KosuTokenContract} from "../src";

const args = yargs
    .option("rpc-url", {
        type: "string",
        default: "http://localhost:8545",
    })
    .boolean("test-mnemonic").argv;
let mnemonic = safeRequire("./mnemonic.json");
if (args["test-mnemonic"] || !mnemonic) { mnemonic = process.env.npm_package_config_test_mnemonic; }

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

    const kosuToken = new KosuTokenContract(artifacts.KosuToken.compilerOutput.abi, DeployedAddresses[networkId].KosuToken, provider);
    const aLot = new BigNumber(web3.utils.toWei("100000"));
    const from = await web3.eth.getCoinbase();

    await kosuToken.transfer.awaitTransactionSuccessAsync("0xAA554D0c5ff879387Fc234dE5D22EC02983baA27", aLot, { from });
    await kosuToken.transfer.awaitTransactionSuccessAsync("0x8b366a3d4e46aC5406F12766Ad33E6482Ce4F081", aLot, { from });
})().catch(err => console.log(err));
