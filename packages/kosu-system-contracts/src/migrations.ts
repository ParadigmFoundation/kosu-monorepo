import { Web3Wrapper } from "@0x/web3-wrapper";
import Web3ProviderEngine from "web3-provider-engine";
import { BN, toWei } from "web3-utils";

import {
    artifacts,
    AuthorizedAddressesContract,
    EventEmitterContract,
    KosuTokenContract,
    OrderGatewayContract,
    PosterRegistryContract,
    PosterRegistryProxyContract,
    TreasuryContract,
    ValidatorRegistryContract,
    ValidatorRegistryProxyContract,
    VotingContract,
} from "./index";

/**
 * Migrate contracts to the chain represented by the configured provider.
 */
export async function migrations(
    provider: Web3ProviderEngine,
    txDefaults: {},
    options: { noLogs?: boolean },
): Promise<MigratedContracts> {
    const web3Wrapper = new Web3Wrapper(provider);

    const _console = console;
    if (options.noLogs) {
        // @ts-ignore
        console = { log: () => null };
    }

    const netId = await web3Wrapper.getNetworkIdAsync();
    const validatorValues = {
        3: {
            _applicationPeriod: 84000,
            _commitPeriod: 40000,
            _challengePeriod: 60000,
            _exitPeriod: 20000,
            _rewardPeriod: 168000,
        },
        6174: {
            _applicationPeriod: 10,
            _commitPeriod: 10,
            _challengePeriod: 20,
            _exitPeriod: 5,
            _rewardPeriod: 5,
        },
        default: {
            _applicationPeriod: 8,
            _commitPeriod: 4,
            _challengePeriod: 8,
            _exitPeriod: 2,
            _rewardPeriod: 2,
        },
    };

    const config = validatorValues[netId] || validatorValues.default;

    const orderGateway = await OrderGatewayContract.deployFrom0xArtifactAsync(
        artifacts.OrderGateway,
        provider,
        txDefaults,
    );
    const authorizedAddresses = await AuthorizedAddressesContract.deployFrom0xArtifactAsync(
        artifacts.AuthorizedAddresses,
        provider,
        txDefaults,
    );
    const eventEmitter = await EventEmitterContract.deployFrom0xArtifactAsync(
        artifacts.EventEmitter,
        provider,
        txDefaults,
        authorizedAddresses.address,
    );
    const kosuToken = await KosuTokenContract.deployFrom0xArtifactAsync(
        artifacts.KosuToken,
        provider,
        txDefaults,
        authorizedAddresses.address,
    );
    const treasury = await TreasuryContract.deployFrom0xArtifactAsync(
        artifacts.Treasury,
        provider,
        txDefaults,
        kosuToken.address,
        authorizedAddresses.address,
    );
    const voting = await VotingContract.deployFrom0xArtifactAsync(
        artifacts.Voting,
        provider,
        txDefaults,
        treasury.address,
        eventEmitter.address,
    );
    const posterRegistryImpl = await PosterRegistryContract.deployFrom0xArtifactAsync(
        artifacts.PosterRegistry,
        provider,
        txDefaults,
        treasury.address,
        eventEmitter.address,
        authorizedAddresses.address,
    );
    const posterRegistryProxy = await PosterRegistryProxyContract.deployFrom0xArtifactAsync(
        artifacts.PosterRegistryProxy,
        provider,
        txDefaults,
        posterRegistryImpl.address,
        authorizedAddresses.address,
    );
    const validatorRegistryImpl = await ValidatorRegistryContract.deployFrom0xArtifactAsync(
        artifacts.ValidatorRegistry,
        provider,
        txDefaults,
        treasury.address,
        voting.address,
        authorizedAddresses.address,
        eventEmitter.address,
        config._applicationPeriod,
        config._commitPeriod,
        config._challengePeriod,
        config._exitPeriod,
        config._rewardPeriod,
    );
    const validatorRegistryProxy = await ValidatorRegistryProxyContract.deployFrom0xArtifactAsync(
        artifacts.ValidatorRegistryProxy,
        provider,
        txDefaults,
        validatorRegistryImpl.address,
        authorizedAddresses.address,
    );

    const transactions = [
        {
            hash: await authorizedAddresses.authorizeAddress.sendTransactionAsync(treasury.address),
            success: () => {
                console.log(`Authorized address: ${treasury.address}`);
            },
        },
        {
            hash: await authorizedAddresses.authorizeAddress.sendTransactionAsync(voting.address),
            success: () => {
                console.log(`Authorized address: ${voting.address}`);
            },
        },
        {
            hash: await authorizedAddresses.authorizeAddress.sendTransactionAsync(posterRegistryImpl.address),
            success: () => {
                console.log(`Authorized address: ${posterRegistryImpl.address}`);
            },
        },
        {
            hash: await authorizedAddresses.authorizeAddress.sendTransactionAsync(posterRegistryProxy.address),
            success: () => {
                console.log(`Authorized address: ${posterRegistryProxy.address}`);
            },
        },
        {
            hash: await authorizedAddresses.authorizeAddress.sendTransactionAsync(validatorRegistryProxy.address),
            success: () => {
                console.log(`Authorized address: ${validatorRegistryProxy.address}`);
            },
        },
        {
            hash: await kosuToken.mint.sendTransactionAsync(new BN(toWei("1000000000"))),
            success: () => {
                console.log(`Minted ${toWei("1000000000")} tokens`);
            },
        },
        {
            hash: await authorizedAddresses.authorizeAddress.sendTransactionAsync(validatorRegistryImpl.address),
            success: () => {
                console.log(`Authorized address: ${validatorRegistryImpl.address}`);
            },
        },
    ];

    await Promise.all(
        transactions.map(tx =>
            web3Wrapper.awaitTransactionSuccessAsync(tx.hash).then(() => {
                tx.success();
            }),
        ),
    );

    console = _console;

    return {
        orderGateway,
        authorizedAddresses,
        eventEmitter,
        kosuToken,
        treasury,
        voting,
        posterRegistryImpl,
        posterRegistryProxy,
        validatorRegistryImpl,
        validatorRegistryProxy,
    };
}
