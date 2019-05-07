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
    applicationBlock: number;
    tendermintPublicKey: string;
    owner: string;
}
