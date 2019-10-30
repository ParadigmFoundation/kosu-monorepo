import { PromiseWithTransactionHash } from "@0x/base-contract";
import { BlockchainLifecycle } from "@0x/dev-utils";
import { GanacheSubprovider, RPCSubprovider } from "@0x/subproviders";
import { BigNumber, providerUtils } from "@0x/utils";
import { TxData, Web3Wrapper } from "@0x/web3-wrapper";
import { getMigratedContractsForNetwork } from "@kosu/deployed-addresses";
import { migrations } from "@kosu/migrations";
import {
    artifacts,
    BasicTradeSubContractContract,
    SignatureValidatorSubContractContract,
    TestTokenContract,
} from "@kosu/system-contracts";
import { MigratedContracts } from "@kosu/types";
import { TransactionReceiptWithDecodedLogs } from "ethereum-protocol";
import Web3ProviderEngine from "web3-provider-engine";

import BasicTradeSubContractConfig from "./BasicTradeSubContractConfig.json";

const { BasicTradeSubContract, SignatureValidatorSubContract, TestToken } = artifacts;

export const bootstrapTests = async (
    useGeth: boolean,
): Promise<{ migratedContracts: MigratedContracts; web3Wrapper: Web3Wrapper }> => {
    const provider = new Web3ProviderEngine();
    if (useGeth) {
        const rpcSubprovider = new RPCSubprovider(process.env.WEB3_URI);
        provider.addProvider(rpcSubprovider);
    } else {
        const ganacheSubprovider = new GanacheSubprovider({
            network_id: 6175,
            mnemonic: process.env.npm_package_config_test_mnemonic,
        });
        provider.addProvider(ganacheSubprovider);
    }

    providerUtils.startProviderEngine(provider);

    const web3Wrapper = new Web3Wrapper(provider);
    await new BlockchainLifecycle(web3Wrapper).startAsync();
    const accounts = await web3Wrapper.getAvailableAddressesAsync();

    const migratedContracts = useGeth
        ? await getMigratedContractsForNetwork(web3Wrapper)
        : await migrations(provider, { from: accounts[0].toLowerCase() });

    return { web3Wrapper, migratedContracts };
};

export const kosuSubContractHelper = async (
    web3Wrapper: Web3Wrapper,
    options?: Partial<TxData>,
): Promise<{
    basicTradeSubContract: BasicTradeSubContractContract;
    signatureValidatorSubContract: SignatureValidatorSubContractContract;
}> => {
    const provider = web3Wrapper.getProvider();
    const from = await web3Wrapper.getAvailableAddressesAsync().then(x => x[0]);

    const basicTradeSubContract = await BasicTradeSubContractContract.deployFrom0xArtifactAsync(
        BasicTradeSubContract,
        provider,
        options || { from },
        JSON.stringify(BasicTradeSubContractConfig),
    );
    const signatureValidatorSubContract = await SignatureValidatorSubContractContract.deployFrom0xArtifactAsync(
        SignatureValidatorSubContract,
        provider,
        options || { from },
    );

    return { basicTradeSubContract, signatureValidatorSubContract };
};

interface EasyToken {
    symbol: () => Promise<string>;
    transferFrom: (
        fromAddress: string,
        to: string,
        value: BigNumber | string | number,
        from?: string,
    ) => PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>;
    transfer: (
        to: string,
        value: BigNumber | string | number,
        from?: string,
    ) => PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>;
    totalSupply: () => Promise<BigNumber>;
    approve: (
        spender: string,
        value: BigNumber | string | number,
        from?: string,
    ) => PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>;
    decimals: () => Promise<number>;
    name: () => Promise<string>;
    allowance: (owner: string, spender: string) => Promise<BigNumber>;
    balanceOf: (owner: string) => Promise<BigNumber>;
}

const wrap = (contract: TestTokenContract, coinbase: string): EasyToken => {
    return {
        name: () => contract.name.callAsync(),
        symbol: () => contract.symbol.callAsync(),
        totalSupply: () => contract.totalSupply.callAsync(),
        decimals: () => contract.decimals.callAsync(),
        balanceOf: (owner: string) => contract.balanceOf.callAsync(owner),
        allowance: (owner: string, spender: string) => contract.allowance.callAsync(owner, spender),
        approve: (spender: string, value: BigNumber | string | number, from: string = coinbase) => {
            return contract.approve.awaitTransactionSuccessAsync(spender, new BigNumber(value.toString()), {
                from,
            });
        },
        transferFrom: (
            fromAddress: string,
            to: string,
            value: BigNumber | string | number,
            from: string = coinbase,
        ) => {
            return contract.transferFrom.awaitTransactionSuccessAsync(
                fromAddress,
                to,
                new BigNumber(value.toString()),
                { from },
            );
        },
        transfer: (to: string, value: BigNumber | string | number, from: string = coinbase) => {
            return contract.transfer.awaitTransactionSuccessAsync(to, new BigNumber(value.toString()), { from });
        },
    };
};

export const deployTestToken = async (
    web3Wrapper: Web3Wrapper,
    name: string,
    symbol: string,
    config?: Partial<TxData>,
): Promise<{ easyToken: EasyToken; testToken: TestTokenContract }> => {
    const from = await web3Wrapper.getAvailableAddressesAsync().then(x => x[0]);

    const provider = web3Wrapper.getProvider();
    const coinbase = await web3Wrapper.getAvailableAddressesAsync().then(as => as[0]);
    const testToken = await TestTokenContract.deployFrom0xArtifactAsync(
        TestToken,
        provider,
        config || { from },
        name,
        symbol,
    );
    const easyToken = wrap(testToken, coinbase);
    return {
        testToken,
        easyToken,
    };
};
