import { getContractAddressesForNetworkOrThrow } from "@0x/contract-addresses";
import { Web3Wrapper } from "@0x/web3-wrapper";
import { ContractArtifact } from "ethereum-types";
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
    VotingContract,
    ZeroExV2SubContractContract,
} from "./index";

/**
 * Migrate contracts to the chain represented by the configured provider.
 */
export async function migrations(
    provider: Web3ProviderEngine,
    txDefaults: {},
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
                _rewardPeriod: 4,
            },
        };
        const zeroExAddresses = getContractAddressesForNetworkOrThrow(netId === 6174 ? 50 : netId);
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
            authorizedAddresses.address,
        );
        const posterRegistryProxy = await PosterRegistryProxyContract.deployFrom0xArtifactAsync(
            artifacts.PosterRegistryProxy as ContractArtifact,
            provider,
            txDefaults,
            posterRegistry.address,
            authorizedAddresses.address,
        );
        const validatorRegistry = await ValidatorRegistryContract.deployFrom0xArtifactAsync(
            artifacts.ValidatorRegistry as ContractArtifact,
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
        const zeroExV2SubContract = await ZeroExV2SubContractContract.deployFrom0xArtifactAsync(
            artifacts.ZeroExV2SubContract as ContractArtifact,
            provider,
            txDefaults,
            JSON.stringify(zeroExArguments),
            zeroExAddresses.exchange,
            zeroExAddresses.erc20Proxy,
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
                hash: await authorizedAddresses.authorizeAddress.sendTransactionAsync(posterRegistry.address),
                success: () => {
                    console.log(`Authorized address: ${posterRegistry.address}`);
                },
            },
            {
                hash: await authorizedAddresses.authorizeAddress.sendTransactionAsync(posterRegistryProxy.address),
                success: () => {
                    console.log(`Authorized address: ${posterRegistryProxy.address}`);
                },
            },
            {
                hash: await kosuToken.mint.sendTransactionAsync(new BN(toWei("1000000000"))),
                success: () => {
                    console.log(`Minted ${toWei("1000000000")} tokens`);
                },
            },
            {
                hash: await authorizedAddresses.authorizeAddress.sendTransactionAsync(validatorRegistry.address),
                success: () => {
                    console.log(`Authorized address: ${validatorRegistry.address}`);
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
            posterRegistryProxy,
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
