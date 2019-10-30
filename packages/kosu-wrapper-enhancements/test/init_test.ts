import { GanacheSubprovider } from "@0x/subproviders";
import { providerUtils } from "@0x/utils";
import { Web3Wrapper } from "@0x/web3-wrapper";
import { bootstrapTests, deployTestToken, kosuSubContractHelper, TestHelpers, TestValues } from "@kosu/test-helpers";
import chai from "chai";
import CAP from "chai-as-promised";
import Web3 from "web3";
import { provider } from "web3-core";
import Web3ProviderEngine from "web3-provider-engine";

chai.use(CAP);

const useGeth = process.argv.includes("geth");

before(async () => {
    chai.should();

    const { web3Wrapper, migratedContracts } = await bootstrapTests(useGeth);
    const networkId = await web3Wrapper.getNetworkIdAsync();
    const accounts = await web3Wrapper.getAvailableAddressesAsync();

    const enhancementOptions = {
        provider: web3Wrapper.getProvider(),
        networkId,
        web3Wrapper,
        votingAddress: migratedContracts.voting.address,
        treasuryAddress: migratedContracts.treasury.address,
        kosuTokenAddress: migratedContracts.kosuToken.address,
        eventEmitterAddress: migratedContracts.eventEmitter.address,
        orderGatewayAddress: migratedContracts.orderGateway.address,
        posterRegistryAddress: migratedContracts.posterRegistry.address,
        validatorRegistryAddress: migratedContracts.validatorRegistry.address,
    };

    const { signatureValidatorSubContract, basicTradeSubContract } = await kosuSubContractHelper(web3Wrapper);

    const tokenA = await deployTestToken(web3Wrapper, "Token A", "TKA", { from: accounts[7] });
    const tokenB = await deployTestToken(web3Wrapper, "Token B", "TKB", { from: accounts[8] });

    const nullProvider = new Web3ProviderEngine();
    const nullGanacheSubprovider = new GanacheSubprovider({});
    nullProvider.addProvider(nullGanacheSubprovider);
    providerUtils.startProviderEngine(nullProvider);
    Object.assign(global, {
        TestValues,
        web3: new Web3((web3Wrapper.getProvider() as unknown) as provider),
        web3Wrapper,
        nullWeb3Wrapper: new Web3Wrapper(nullProvider),
        testHelpers: new TestHelpers(web3Wrapper, { migratedContracts, networkId }),
        assert: chai.assert,
        migratedContracts,
        enhancementOptions,
        accounts,
    });
});
