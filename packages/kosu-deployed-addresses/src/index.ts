import { DeployedAddresses } from "@kosu/migrations";
import {KosuAddresses, KosuDeploymentReceipts} from "@kosu/types";

/**
 * Get the deployment receipts for a desired network by id.
 *
 * @param networkId Ethereum network id.
 * @returns The deployment receipts for the Kosu contracts.
 */
const getReceiptsForNetwork = (networkId: number | string): KosuDeploymentReceipts => {
    return DeployedAddresses[id.toString()];
};

/**
 * Get the deployment addresses for a desired network by id.
 *
 * @param networkId Ethereum network id.
 * @returns The addresses for the Kosu contracts.
 */
const getAddressesForNetwork = (networkId: number | string): KosuAddresses => {
    const receipts = DeployedAddresses[id.toString()];
    return {
        OrderGateway: receipts.OrderGateway.contractAddress,
        AuthorizedAddresses: receipts.AuthorizedAddresses.contractAddress,
        EventEmitter: receipts.EventEmitter.contractAddress,
        KosuToken: receipts.KosuToken.contractAddress,
        Treasury: receipts.Treasury.contractAddress,
        Voting: receipts.Voting.contractAddress,
        PosterRegistry: receipts.PosterRegistry.contractAddress,
        ValidatorRegistry: receipts.ValidatorRegistry.contractAddress,
        ZeroExV2SubContract: receipts.ZeroExV2SubContract.contractAddress
    };
};

export { DeployedAddresses, getReceiptsForNetwork, getAddressesForNetwork };
