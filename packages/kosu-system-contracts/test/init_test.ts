import {LogDecoder} from "@0x/contracts-test-utils";
import { BlockchainLifecycle } from "@0x/dev-utils";
import {GanacheSubprovider, RPCSubprovider} from "@0x/subproviders";
import {BigNumber, providerUtils} from "@0x/utils";
import {Web3Wrapper} from "@0x/web3-wrapper";
import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import Web3 from "web3";
import Web3ProviderEngine from "web3-provider-engine";
import { toWei } from "web3-utils";

import {migrations} from "../src/migrations";

const useGeth = process.argv.includes("geth");

chai.use(chaiAsPromised);
chai.should();

const testValues: TestValues = {
  zero: new BigNumber("0"),
  fiftyWei: new BigNumber("50"),
  oneHundredWei: new BigNumber("100"),
  halfEther: new BigNumber(toWei("0.5")),
  oneEther: new BigNumber(toWei("1")),
  fiveEther: new BigNumber(toWei("5")),
  sixEther: new BigNumber(toWei("6")),
  maxUint: new BigNumber(2).pow(new BigNumber(256)).minus(new BigNumber(1)),
};

before(async () => {

  const provider = new Web3ProviderEngine();

  if (useGeth) {
    const rpcSubprovider = new RPCSubprovider(process.env.WEB3_URI);
    provider.addProvider(rpcSubprovider);
  } else {
    const ganacheSubprovider = new GanacheSubprovider({});
    provider.addProvider(ganacheSubprovider);
  }

  providerUtils.startProviderEngine(provider);

  const web3 = new Web3(provider);
  const web3Wrapper = new Web3Wrapper(provider);

  await new BlockchainLifecycle(web3Wrapper).startAsync();

  const normalizedFromAddress = await web3.eth.getCoinbase().then((x: string) => x.toLowerCase());

  const txDefaults = {
    from: normalizedFromAddress,
    gas: 4500000,
    gasPrice: toWei("5", "gwei"),
  };

  const contracts = await migrations(provider, txDefaults, { noLogs: true });
  const accounts = await web3.eth.getAccounts().then(a => a.map(v => v.toLowerCase()));

  const skipBlocks = async num => {
    for (let i = 0; i < num; i++) {
      await web3Wrapper.sendTransactionAsync({ from: accounts[0], to: accounts[1], value: 0 });
    }
  };

  Object.assign(global, { skipBlocks, txDefaults, testValues, contracts, accounts, web3, web3Wrapper });
});
