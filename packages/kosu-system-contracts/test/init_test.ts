import {LogDecoder} from "@0x/contracts-test-utils";
import {GanacheSubprovider} from "@0x/subproviders";
import {providerUtils} from "@0x/utils";
import {Web3Wrapper} from "@0x/web3-wrapper";
import {BigNumber} from "@0x/utils";
import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import Web3 from "web3";
import Web3ProviderEngine from "web3-provider-engine";
import { toWei } from "web3-utils";

import { eventDecoder } from "..";
import {migrations} from "../src/migrations";

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
  const ganacheSubprovider = new GanacheSubprovider({});

  const provider = new Web3ProviderEngine();
  provider.addProvider(ganacheSubprovider);

  providerUtils.startProviderEngine(provider);

  const web3 = new Web3(provider);
  const web3Wrapper = new Web3Wrapper(provider);

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
      // tslint:disable-next-line: no-inferred-empty-object-type
      await new Promise((resolve, reject) => {
        web3.currentProvider.send({
          jsonrpc: "2.0",
          method: "evm_mine",
          params: [],
          id: 1,

        // @ts-ignore
        }, (err, _) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });
    }
  };

  Object.assign(global, { skipBlocks, testValues, contracts, accounts, web3, web3Wrapper });
});
