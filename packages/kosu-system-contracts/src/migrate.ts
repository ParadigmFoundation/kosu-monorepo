import { toWei, BN } from 'web3-utils';
import {MnemonicWalletSubprovider, RPCSubprovider} from "@0x/subproviders";
import Web3ProviderEngine = require("web3-provider-engine");
import {providerUtils} from "@0x/utils";
import safeRequire from "safe-node-require";
import yargs = require("yargs");
import Web3 = require("web3");
import {migrations} from "./migrations";

const mnemonic = safeRequire('./mnemonic.json');

const args = yargs
    .option('rpc-url', {
        type: 'string',
        default: 'http://localhost:8545'
    }).argv;

(async () => {
    const mnemonicSubprovider = mnemonic ? new MnemonicWalletSubprovider({ mnemonic }) : null;
    const rpcSubprovider = new RPCSubprovider(args['rpc-url']);
    const provider = new Web3ProviderEngine();
    mnemonicSubprovider ? provider.addProvider(mnemonicSubprovider) : null;
    provider.addProvider(rpcSubprovider);
    providerUtils.startProviderEngine(provider);

    const web3 = new Web3(provider);

    const normalizedFromAddress = await web3.eth.getCoinbase().then((x :string) => x.toLowerCase());

    const txDefaults = {
        from: normalizedFromAddress,
        gas: 4500000,
        gasPrice: toWei('5', 'gwei')
    };
    await migrations(provider, txDefaults);
})().catch(err => {
    console.log(err)
});