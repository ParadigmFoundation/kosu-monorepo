import { Web3Wrapper } from "@0x/web3-wrapper";
import { DeployedAddresses } from "@kosu/migrations";
import {
    AuthorizedAddressesContract,
    EventEmitterContract,
    KosuTokenContract,
    OrderGatewayContract,
    PosterRegistryContract,
    TreasuryContract,
    ValidatorRegistryContract,
    VotingContract,
    ZeroExV2SubContractContract,
} from "@kosu/system-contracts";
import { KosuAddresses, KosuDeploymentReceipts, MigratedContracts } from "@kosu/types";

/**
 * Get the deployment receipts for a desired network by id.
 *
 * @param networkId Ethereum network id.
 * @returns The deployment receipts for the Kosu contracts.
 */
const getReceiptsForNetwork = (networkId: number | string): KosuDeploymentReceipts => {
    return DeployedAddresses[networkId.toString()];
};

/**
 * Get the deployment addresses for a desired network by id.
 *
 * @param networkId Ethereum network id.
 * @returns The addresses for the Kosu contracts.
 */
const getAddressesForNetwork = (networkId: number | string): KosuAddresses => {
    const receipts = DeployedAddresses[networkId.toString()];
    return {
        OrderGateway: receipts.OrderGateway.contractAddress,
        AuthorizedAddresses: receipts.AuthorizedAddresses.contractAddress,
        EventEmitter: receipts.EventEmitter.contractAddress,
        KosuToken: receipts.KosuToken.contractAddress,
        Treasury: receipts.Treasury.contractAddress,
        Voting: receipts.Voting.contractAddress,
        PosterRegistry: receipts.PosterRegistry.contractAddress,
        ValidatorRegistry: receipts.ValidatorRegistry.contractAddress,
        ZeroExV2SubContract: receipts.ZeroExV2SubContract.contractAddress,
    };
};

/**
 * Get the deployment addresses for a desired network by id.
 *
 * @param web3Wrapper A `Web3Wrapper` instance to get contract info.
 * @returns The contract instances.
 */
const getMigratedContractsForNetwork = async (web3Wrapper: Web3Wrapper): Promise<MigratedContracts> => {
    const networkId = await web3Wrapper.getNetworkIdAsync();
    const provider = web3Wrapper.getProvider();
    const addresses = getAddressesForNetwork(networkId);

    if (!addresses) {
        throw new Error(`Contracts are not deployed on ${networkId}`);
    }

    return {
        orderGateway: new OrderGatewayContract(addresses.OrderGateway, provider),
        eventEmitter: new EventEmitterContract(addresses.AuthorizedAddresses, provider),
        treasury: new TreasuryContract(addresses.EventEmitter, provider),
        authorizedAddresses: new AuthorizedAddressesContract(addresses.KosuToken, provider),
        kosuToken: new KosuTokenContract(addresses.Treasury, provider),
        validatorRegistry: new ValidatorRegistryContract(addresses.Voting, provider),
        voting: new VotingContract(addresses.PosterRegistry, provider),
        posterRegistry: new PosterRegistryContract(addresses.ValidatorRegistry, provider),
        zeroExV2SubContract: new ZeroExV2SubContractContract(addresses.ZeroExV2SubContract, provider),
    };
};

export { DeployedAddresses, getReceiptsForNetwork, getAddressesForNetwork };
