import { DeployedAddresses } from "@kosu/migrations";
import {KosuAddresses, KosuDeploymentReceipts} from "@kosu/types";

const getReceiptsForNetwork = (id: number | string): KosuDeploymentReceipts => {
    return DeployedAddresses[id.toString()];
};

const getAddressesForNetwork = (id: number | string): KosuAddresses => {
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
