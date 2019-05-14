const Web3Wrapper = require("@0x/web3-wrapper").Web3Wrapper;
const Web3 = require("web3");
const chai = require("chai");
const CAP = require("chai-as-promised");
const Web3ProviderEngine = require("web3-provider-engine");
const providerUtils = require("@0x/utils").providerUtils;
const GanacheSubprovider = require("@0x/subproviders").GanacheSubprovider;
const RPCSubprovider = require("@0x/subproviders").RPCSubprovider;
const migrations = require("@kosu/system-contracts/dist/src/migrations").migrations;
const Lifecycle = require("@0x/dev-utils").BlockchainLifecycle;
const { Kosu } = require("../src");

const tokenHelper = require("./helpers/tokenHelper.js");
const kosuContractHelper = require("./helpers/kosuContractHelper");

chai.use(CAP);

const useGeth = process.argv.includes("geth");

before(async () => {
    global.assert = chai.assert;
    chai.should();

    const provider = new Web3ProviderEngine();

    if (useGeth) {
        const rpcSubprovider = new RPCSubprovider(process.env.WEB3_URI);
        provider.addProvider(rpcSubprovider);
    } else {
        const ganacheSubprovider = new GanacheSubprovider({});
        provider.addProvider(ganacheSubprovider);
    }

    providerUtils.startProviderEngine(provider);

    const web3Wrapper = new Web3Wrapper(provider);
    await new Lifecycle(web3Wrapper).startAsync();

    global.web3 = new Web3(provider);
    global.accounts = await web3.eth.personal.getAccounts();
    global.MAX_UINT = web3.utils
        .toBN("2")
        .pow(web3.utils.toBN("256"))
        .sub(web3.utils.toBN("1"))
        .toString();

    const migratedContracts = await migrations(
        provider,
        { from: accounts[0].toLowerCase(), gas: "4500000" },
        { noLogs: true },
    );

    global.kosu = new Kosu({
        provider: web3.currentProvider,
        networkId: await web3.eth.net.getId(),
        posterRegistryProxyAddress: migratedContracts.posterRegistryProxy.address,
        kosuTokenAddress: migratedContracts.kosuToken.address,
        orderGatewayAddress: migratedContracts.orderGateway.address,
        validatorRegistryProxyAddress: migratedContracts.validatorRegistryProxy.address,
        votingAddress: migratedContracts.voting.address,
        treasuryAddress: migratedContracts.treasury.address,
    });

    await kosuContractHelper();
    await tokenHelper();
});

it("should connect to web3", () => {
    assert.equal(accounts.length, 10, "There should be 10 ETH accounts.");
});

it("should have the version set", () => {
    assert.equal(require("../package").version, kosu.version);
});
