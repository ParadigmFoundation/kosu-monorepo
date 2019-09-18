import { getContractAddressesForNetworkOrThrow } from "@0x/contract-addresses";
import { Web3Wrapper } from "@0x/web3-wrapper";
import { ContractArtifact } from "ethereum-types";
import Web3ProviderEngine from "web3-provider-engine";
import { toWei } from "web3-utils";

import {
    artifacts,
    AuthorizedAddressesContract,
    EventEmitterContract,
    KosuTokenContract,
    OrderGatewayContract,
    PosterRegistryContract,
    TreasuryContract,
    ValidatorRegistryContract,
    VotingContract,
    ZeroExV2SubContractContract,
} from "./index";

/**
 * Migrate contracts to the chain represented by the configured provider.
 */
export async function migrations(
    provider: Web3ProviderEngine,
    txDefaults: { from: string },
    options: { noLogs?: boolean } = {},
): Promise<MigratedContracts> {
    const web3Wrapper = new Web3Wrapper(provider);

    const _console = console;
    if (options.noLogs) {
        // @ts-ignore
        console = { log: () => null };
    }

    try {
        const netId = await web3Wrapper.getNetworkIdAsync();
        const validatorValues = {
            1: {
                _applicationPeriod: 60000,
                _commitPeriod: 20000,
                _challengePeriod: 30000,
                _exitPeriod: 60000,
                _rewardPeriod: 6000,
                _exitLockPeriod: 30000,
                _winningVoteLockPeriod: 20000,
                _losingVoteLockPeriod: 10000,
            },
            3: {
                _applicationPeriod: 60000,
                _commitPeriod: 20000,
                _challengePeriod: 30000,
                _exitPeriod: 60000,
                _rewardPeriod: 6000,
                _exitLockPeriod: 30000,
                _winningVoteLockPeriod: 20000,
                _losingVoteLockPeriod: 10000,
            },
            6174: {
                _applicationPeriod: 600,
                _commitPeriod: 600,
                _challengePeriod: 1000,
                _exitPeriod: 600,
                _rewardPeriod: 600,
                _exitLockPeriod: 600,
                _winningVoteLockPeriod: 600,
                _losingVoteLockPeriod: 300,
            },
            6175: {
                _applicationPeriod: 10,
                _commitPeriod: 20,
                _challengePeriod: 40,
                _exitPeriod: 5,
                _rewardPeriod: 5,
                _exitLockPeriod: 5,
                _winningVoteLockPeriod: 4,
                _losingVoteLockPeriod: 2,
            },
            default: {
                _applicationPeriod: 8,
                _commitPeriod: 4,
                _challengePeriod: 8,
                _exitPeriod: 2,
                _rewardPeriod: 4,
                _exitLockPeriod: 5,
                _winningVoteLockPeriod: 4,
                _losingVoteLockPeriod: 2,
            },
        };
        const zeroExAddresses = getContractAddressesForNetworkOrThrow([6174, 6175].includes(netId) ? 50 : netId);
        const config = validatorValues[netId] || validatorValues.default;

        const orderGateway = await OrderGatewayContract.deployFrom0xArtifactAsync(
            artifacts.OrderGateway as ContractArtifact,
            provider,
            txDefaults,
        );
        const authorizedAddresses = await AuthorizedAddressesContract.deployFrom0xArtifactAsync(
            artifacts.AuthorizedAddresses as ContractArtifact,
            provider,
            txDefaults,
        );
        const eventEmitter = await EventEmitterContract.deployFrom0xArtifactAsync(
            artifacts.EventEmitter as ContractArtifact,
            provider,
            txDefaults,
            authorizedAddresses.address,
        );
        const kosuToken = await KosuTokenContract.deployFrom0xArtifactAsync(
            artifacts.KosuToken as ContractArtifact,
            provider,
            txDefaults,
            authorizedAddresses.address,
        );
        const treasury = await TreasuryContract.deployFrom0xArtifactAsync(
            artifacts.Treasury as ContractArtifact,
            provider,
            txDefaults,
            kosuToken.address,
            authorizedAddresses.address,
        );
        const voting = await VotingContract.deployFrom0xArtifactAsync(
            artifacts.Voting as ContractArtifact,
            provider,
            txDefaults,
            treasury.address,
            eventEmitter.address,
        );
        const posterRegistry = await PosterRegistryContract.deployFrom0xArtifactAsync(
            artifacts.PosterRegistry as ContractArtifact,
            provider,
            txDefaults,
            treasury.address,
            eventEmitter.address,
        );
        const validatorRegistry = await ValidatorRegistryContract.deployFrom0xArtifactAsync(
            artifacts.ValidatorRegistry as ContractArtifact,
            provider,
            txDefaults,
            treasury.address,
            voting.address,
            eventEmitter.address,
            config._applicationPeriod,
            config._commitPeriod,
            config._challengePeriod,
            config._exitPeriod,
            config._rewardPeriod,
            config._exitLockPeriod,
            config._winningVoteLockPeriod,
            config._losingVoteLockPeriod,
        );
        const zeroExV2SubContract = await ZeroExV2SubContractContract.deployFrom0xArtifactAsync(
            artifacts.ZeroExV2SubContract as ContractArtifact,
            provider,
            txDefaults,
            JSON.stringify(zeroExArguments),
            zeroExAddresses.exchange,
            zeroExAddresses.erc20Proxy,
        );

        /* tslint:disable */
        await authorizedAddresses.authorizeAddress.awaitTransactionSuccessAsync(treasury.address).then(() => {
            console.log(`Authorized address: ${treasury.address}`);
        });

        await authorizedAddresses.authorizeAddress.awaitTransactionSuccessAsync(voting.address).then(() => {
            console.log(`Authorized address: ${voting.address}`);
        });

        await authorizedAddresses.authorizeAddress.awaitTransactionSuccessAsync(posterRegistry.address).then(() => {
            console.log(`Authorized address: ${posterRegistry.address}`);
        });

        await authorizedAddresses.authorizeAddress.awaitTransactionSuccessAsync(validatorRegistry.address).then(() => {
            console.log(`Authorized address: ${validatorRegistry.address}`);
        });

        await treasury.setVoting.awaitTransactionSuccessAsync(voting.address);
        /* tslint:enable */

        await web3Wrapper
            .sendTransactionAsync({
                ...txDefaults,
                to: kosuToken.address,
                value: toWei("0.2"),
            })
            .then(txHash =>
                web3Wrapper.awaitTransactionSuccessAsync(txHash).then(() => {
                    console.log("Submitted initial bonding transaction.");
                }),
            );

        if (options.noLogs) {
            console = _console;
        }

        return {
            orderGateway,
            authorizedAddresses,
            eventEmitter,
            kosuToken,
            treasury,
            voting,
            posterRegistry,
            validatorRegistry,
            zeroExV2SubContract,
        };
    } catch (e) {
        if (options.noLogs) {
            console = _console;
        }
        throw e;
    }
}

const zeroExArguments = {
    maker: [
        { datatype: "address", name: "makerAddress" },
        { datatype: "address", name: "takerAddress" },
        { datatype: "address", name: "feeRecipientAddress" },
        { datatype: "address", name: "senderAddress" },
        { datatype: "uint", name: "makerAssetAmount" },
        { datatype: "uint", name: "takerAssetAmount" },
        { datatype: "uint", name: "makerFee" },
        { datatype: "uint", name: "takerFee" },
        { datatype: "uint", name: "expirationTimeSeconds" },
        { datatype: "uint", name: "salt" },
        { datatype: "bytes", name: "makerAssetData" },
        { datatype: "bytes", name: "takerAssetData" },
        { datatype: "bytes", name: "signature" },
    ],
    taker: [{ datatype: "address", name: "taker" }, { datatype: "uint", name: "takerAssetAmount" }],
};
