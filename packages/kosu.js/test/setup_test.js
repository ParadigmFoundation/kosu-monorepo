const Web3 = require("web3");
const chai = require("chai");
const CAP = require("chai-as-promised");
const Web3ProviderEngine = require("web3-provider-engine");
const providerUtils = require("@0x/utils").providerUtils;
const GanacheSubprovider = require("@0x/subproviders").GanacheSubprovider;
const migrations = require("@kosu/system-contracts/dist/src/migrations").migrations;

const { Kosu } = require("../src");

const tokenHelper = require("./helpers/tokenHelper.js");
const kosuContractHelper = require("./helpers/kosuContractHelper");

chai.use(CAP);

before(async () => {
    global.assert = chai.assert;
    chai.should();

    const ganacheSubprovider = new GanacheSubprovider({});

    const provider = new Web3ProviderEngine();
    provider.addProvider(ganacheSubprovider);

    providerUtils.startProviderEngine(provider);

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
