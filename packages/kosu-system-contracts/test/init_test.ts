import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { eventDecoder } from "..";
import { toBN, toWei } from 'web3-utils';
import {GanacheSubprovider} from "@0x/subproviders";
import Web3ProviderEngine = require("web3-provider-engine");
import {providerUtils} from "@0x/utils";
import Web3 = require("web3");
import {migrations} from "../src/migrations";
import {Web3Wrapper} from "@0x/web3-wrapper";

chai.use(chaiAsPromised);
chai.should();


const values = {
  maxUint: toBN(2).pow(toBN(256)).sub(toBN(1)),
  sixEther: toWei('6'),
  fiveEther: toWei('5'),
  oneEther: toWei('1'),
  halfEther: toWei('0.5'),
};

before(async () => {
  const ganacheSubprovider = new GanacheSubprovider({});

  const provider = new Web3ProviderEngine();
  provider.addProvider(ganacheSubprovider);

  providerUtils.startProviderEngine(provider);

  const web3 = new Web3(provider);
  const web3Wrapper = new Web3Wrapper(provider);


  const normalizedFromAddress = await web3.eth.getCoinbase().then((x :string) => x.toLowerCase());

  const txDefaults = {
    from: normalizedFromAddress,
    gas: 4500000,
    gasPrice: toWei('5', 'gwei')
  };

  const contracts = await migrations(provider, txDefaults);
  const accounts = await web3.eth.getAccounts().then(a => a.map(v => v.toLowerCase()));


  const skipBlocks = async (number) => {
    for(let i = 0; i < number; i++) {
      await new Promise((resolve, reject) => {

        web3.currentProvider.send({
          jsonrpc: "2.0",
          method: "evm_mine",
          params: [],
          id: 1
        }, (err, res) => {
          if(err) reject(err);
          else resolve();
        });
      });
    }
  };

  Object.assign(global, { skipBlocks, ...values, contracts, accounts, web3, web3Wrapper });
});
