interface MigratedContracts {
    validatorRegistryProxy: ValidatorRegistryProxyContract;
    orderGateway: OrderGatewayContract;
    eventEmitter: EventEmitterContract;
    treasury: TreasuryContract;
    authorizedAddresses: AuthorizedAddressesContract;
    kosuToken: KosuTokenContract;
    validatorRegistryImpl: ValidatorRegistryContract;
    voting: VotingContract;
    posterRegistryProxy: PosterRegistryProxyContract;
    posterRegistryImpl: PosterRegistryContract;
}

interface Listing {
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

interface Challenge {
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

interface PrettyListing extends Listing {
    stakedBalance: string;
    applicationBlock: string;
    confirmationBlock: string;
    exitBlock: string;
    rewardRate: string;
    lastRewardBlock: string;
    currentChallenge: string;
}
