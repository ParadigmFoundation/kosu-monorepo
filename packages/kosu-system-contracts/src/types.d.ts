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
