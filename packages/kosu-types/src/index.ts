import {
    AuthorizedAddressesContract,
    BasicTradeSubContractContract,
    EventEmitterContract,
    KosuTokenContract,
    OrderGatewayContract,
    PosterRegistryContract,
    TreasuryContract,
    ValidatorRegistryContract,
    VotingContract,
    ZeroExV2SubContractContract,
} from "@kosu/system-contracts";
import { BigNumber } from "bignumber.js";

export interface MigratedContracts {
    orderGateway: OrderGatewayContract;
    eventEmitter: EventEmitterContract;
    treasury: TreasuryContract;
    authorizedAddresses: AuthorizedAddressesContract;
    kosuToken: KosuTokenContract;
    validatorRegistry: ValidatorRegistryContract;
    voting: VotingContract;
    posterRegistry: PosterRegistryContract;
    zeroExV2SubContract: ZeroExV2SubContractContract;
}

export interface MigratedTestContracts extends MigratedContracts {
    basicTradeSubContract?: BasicTradeSubContractContract;
}

export interface Listing {
    status: number;
    stakedBalance: BigNumber;
    applicationBlock: BigNumber;
    confirmationBlock: BigNumber;
    exitBlock: BigNumber;
    rewardRate: BigNumber;
    lastRewardBlock: BigNumber;
    tendermintPublicKey: string;
    owner: string;
    currentChallenge: BigNumber;
    details: string;
}

export interface Challenge {
    listingKey: string;
    challenger: string;
    voterTotal: BigNumber;
    balance: BigNumber;
    pollId: BigNumber;
    challengeEnd: BigNumber;
    finalized: boolean;
    passed: boolean;
    details: string;
    listingSnapshot: Listing;
}

export interface PrettyListing {
    stakedBalance: string;
    applicationBlock: string;
    confirmationBlock: string;
    exitBlock: string;
    rewardRate: string;
    lastRewardBlock: string;
    currentChallenge: string;
}
