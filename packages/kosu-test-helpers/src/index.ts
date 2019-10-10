import { BigNumber } from "@0x/utils";
import { Web3Wrapper } from "@0x/web3-wrapper";

import { decodeKosuEvents } from "@kosu/contract-utils";
import { DeployedAddresses } from "@kosu/migrations";
import { MigratedTestContracts } from "@kosu/types";
import * as Wrappers from "@kosu/system-contracts/dist/src/wrappers";

import { TestValues } from "./test_values";

export class TestHelpers {
    public web3Wrapper: Web3Wrapper;
    public migratedContracts: MigratedTestContracts;
    private accounts: string[];

    private minimumBalance: BigNumber;
    private exitPeriod: BigNumber;
    private challengePeriod: BigNumber;
    private stakeholderCut: BigNumber;
    private commitPeriod: BigNumber;
    private applicationPeriod: BigNumber;
    private rewardPeriod: BigNumber;
    private readonly initializing: Promise<void>;

    constructor(
        web3Wrapper: Web3Wrapper,
        config: { from?: string; migratedContracts?: MigratedTestContracts; networkId?: number },
    ) {
        this.web3Wrapper = web3Wrapper;
        if (config.migratedContracts) {
            this.migratedContracts = config.migratedContracts;
        } else if (config.networkId) {
            const receipts = DeployedAddresses[config.networkId];
            if (!receipts) {
                throw new Error(`TestHelpers can't find addresses for ${config.networkId}`);
            }
            if (!config.from) {
                throw new Error("Will need a configured from to initialize contracts");
            }
            const contracts = {};

            Object.keys(receipts).forEach(contractName => {
                contracts[contractName.charAt(0).toLowerCase() + contractName.slice(1)] = new Wrappers[
                    `${contractName}Contract`
                ](receipts[contractName].contractAddress, this.web3Wrapper.getProvider(), {
                    from: config.from,
                });
            });
            this.migratedContracts = contracts as MigratedTestContracts;
        }
        this.initializing = this.init();
    }

    private async init(): Promise<void> {
        this.accounts = await this.web3Wrapper.getAvailableAddressesAsync();
        this.minimumBalance = await this.migratedContracts.validatorRegistry.minimumBalance.callAsync();
        this.exitPeriod = await this.migratedContracts.validatorRegistry.exitPeriod.callAsync();
        this.challengePeriod = await this.migratedContracts.validatorRegistry.challengePeriod.callAsync();
        this.stakeholderCut = await this.migratedContracts.validatorRegistry.stakeholderCut.callAsync();
        this.commitPeriod = await this.migratedContracts.validatorRegistry.commitPeriod.callAsync();
        this.rewardPeriod = await this.migratedContracts.validatorRegistry.rewardPeriod.callAsync();
        this.applicationPeriod = await this.migratedContracts.validatorRegistry.applicationPeriod.callAsync();
    }

    public async getAccounts(): Promise<string[]> {
        await this.initializing;
        return this.accounts;
    }

    public async skipBlocks(num: number): Promise<void> {
        await this.initializing;
        for (let i = 0; i < num; i++) {
            await this.web3Wrapper
                .sendTransactionAsync({ from: this.accounts[0], to: this.accounts[1], value: 0 })
                .then(txHash => this.web3Wrapper.awaitTransactionSuccessAsync(txHash));
        }
    }

    public async ensureTokenBalance(address: string, desiredValue: BigNumber): Promise<void> {
        await this.initializing;
        const currentBalance = await this.migratedContracts.kosuToken.balanceOf.callAsync(address);
        if (currentBalance.lt(desiredValue)) {
            const balanceNeeded = desiredValue.minus(currentBalance);
            const approxRate = await this.migratedContracts.kosuToken.estimateEtherToToken.callAsync(TestValues.oneWei);
            const approxDeposit = balanceNeeded
                .dividedBy(approxRate)
                .multipliedBy(1.5)
                .dividedToIntegerBy(1);
            await this.migratedContracts.kosuToken.bondTokens.awaitTransactionSuccessAsync(TestValues.zero, {
                from: address,
                value: approxDeposit,
            });
        } else if (currentBalance.gt(desiredValue)) {
            const overage = currentBalance.minus(desiredValue);
            await this.migratedContracts.kosuToken.transfer.awaitTransactionSuccessAsync(this.accounts[0], overage, {
                from: address,
            });
        }

        const finalBalance = await this.migratedContracts.kosuToken.balanceOf.callAsync(address);
        if (finalBalance.lt(desiredValue)) {
            throw new Error(
                `Ensure ${address} has balanceOf ${desiredValue.toString()} failed. Final balance: ${finalBalance}`,
            );
        }
    }

    public async ensureTreasuryBalance(address: string, desiredValue: BigNumber): Promise<void> {
        await this.initializing;
        const currentBalance = await this.migratedContracts.treasury.currentBalance.callAsync(address);
        if (currentBalance.lt(desiredValue)) {
            const balanceNeeded = desiredValue.minus(currentBalance);
            await this.ensureTokenBalance(address, balanceNeeded);
            await this.migratedContracts.kosuToken.approve.awaitTransactionSuccessAsync(
                this.migratedContracts.treasury.address,
                balanceNeeded,
                { from: address },
            );
            await this.migratedContracts.treasury.deposit.awaitTransactionSuccessAsync(balanceNeeded, {
                from: address,
            });
        }

        if (await this.migratedContracts.treasury.currentBalance.callAsync(address).then(val => val.lt(desiredValue))) {
            throw new Error(`Ensure ${address} has treasury balance of ${desiredValue.toString()} failed`);
        }
    }

    public async clearTreasury(address: string): Promise<void> {
        const systemBalance = await this.migratedContracts.treasury.systemBalance.callAsync(address);
        if (systemBalance.gt(0)) {
            const currentBalance = await this.migratedContracts.treasury.currentBalance.callAsync(address);
            if (systemBalance.gt(currentBalance)) {
                const posterBonded = await this.migratedContracts.posterRegistry.tokensRegisteredFor.callAsync(address);
                this.migratedContracts.posterRegistry.releaseTokens.awaitTransactionSuccessAsync(posterBonded, {
                    from: address,
                });
                if (posterBonded.lt(systemBalance.minus(currentBalance))) {
                    const listings = await this.migratedContracts.validatorRegistry.getAllListings.callAsync();

                    for (const listing of listings) {
                        if (listing.owner.toLocaleLowerCase() === address.toLocaleLowerCase()) {
                            await this.exitListing(listing.tendermintPublicKey, address);
                        }
                    }
                }
            }
            const unlockBlock = await this.migratedContracts.treasury.tokenLocksExpire.callAsync(address);
            await this.skipTo(unlockBlock.toNumber());
            await this.migratedContracts.treasury.withdraw.awaitTransactionSuccessAsync(
                /*systemBalance*/ currentBalance,
                {
                    from: address,
                },
            );
        }
    }

    public async prepareListing(
        tendermintPublicKey: string,
        options: { stake?: BigNumber; reward?: BigNumber; details?: string; from?: string } = {},
    ): Promise<void> {
        await this.initializing;
        if (!options.from) {
            options.from = this.accounts[0];
        }
        const { stake, reward, details } = options;
        await this.migratedContracts.kosuToken.approve.awaitTransactionSuccessAsync(
            this.migratedContracts.treasury.address,
            stake || this.minimumBalance,
            options,
        );
        const result = await this.migratedContracts.validatorRegistry.registerListing.awaitTransactionSuccessAsync(
            tendermintPublicKey,
            stake || this.minimumBalance,
            reward || new BigNumber("0"),
            details || "details",
            options,
        );
        await this.skipApplicationPeriod(result.blockNumber);
    }

    public async prepareConfirmedListing(
        tendermintPublicKey: string,
        options: { stake?: BigNumber; reward?: BigNumber; details?: string; from?: string } = {},
    ): Promise<void> {
        if (!options.from) {
            options.from = this.accounts[0];
        }
        await this.prepareListing(tendermintPublicKey, options);
        const listing = await this.migratedContracts.validatorRegistry.getListing.callAsync(tendermintPublicKey);
        if (listing.rewardRate.lt(0)) {
            const tokensNeeded = await this.migratedContracts.kosuToken.estimateEtherToToken.callAsync(
                listing.rewardRate.times(-1),
            );
            await this.ensureTreasuryBalance(options.from, tokensNeeded);
        }
        await this.migratedContracts.validatorRegistry.confirmListing.awaitTransactionSuccessAsync(
            tendermintPublicKey,
            options,
        );
    }

    public async exitListing(publicKey: string, from: string = this.accounts[0]): Promise<void> {
        await this.initializing;
        const { exitBlock, currentChallenge } = await this.migratedContracts.validatorRegistry.getListing.callAsync(
            publicKey,
        );

        if ((await this.migratedContracts.validatorRegistry.getListing.callAsync(publicKey)).status === 0) {
            return;
        }

        if ((await this.migratedContracts.validatorRegistry.getListing.callAsync(publicKey)).status === 3) {
            const challengeBlock = await this.migratedContracts.validatorRegistry.getChallenge
                .callAsync(currentChallenge)
                .then(c => c.challengeEnd.toNumber());
            await this.finishChallenge(publicKey, challengeBlock);
        }

        if ((await this.migratedContracts.validatorRegistry.getListing.callAsync(publicKey)).status !== 4) {
            await this.migratedContracts.validatorRegistry.initExit.awaitTransactionSuccessAsync(publicKey, {
                from,
            });
        }

        if ((await this.migratedContracts.validatorRegistry.getListing.callAsync(publicKey)).status === 4) {
            await this.finishExit(
                publicKey,
                from,
                (await this.migratedContracts.validatorRegistry.getListing.callAsync(publicKey)).exitBlock.toNumber(),
            );
        }
    }

    public async finishExit(publicKey: string, from: string = this.accounts[0], initBlock?: number): Promise<void> {
        await this.initializing;
        await this.skipExitPeriod(initBlock || (await this.web3Wrapper.getBlockNumberAsync()));
        await this.migratedContracts.validatorRegistry.finalizeExit.awaitTransactionSuccessAsync(publicKey, { from });
    }

    public async finishChallenge(publicKey: string, challengeBlock?: number): Promise<void> {
        await this.initializing;
        await this.skipChallengePeriod(challengeBlock || (await this.web3Wrapper.getBlockNumberAsync()));
        await this.migratedContracts.validatorRegistry.resolveChallenge.awaitTransactionSuccessAsync(publicKey);
    }

    public async skipExitPeriod(start: number): Promise<void> {
        await this.initializing;
        const target = this.exitPeriod.plus(start).toNumber();
        await this.skipTo(target);
    }

    public async skipChallengePeriod(start: number): Promise<void> {
        await this.initializing;
        const target = this.challengePeriod.plus(start).toNumber();
        await this.skipTo(target);
    }

    public async skipApplicationPeriod(start: number): Promise<void> {
        await this.initializing;
        const target = this.applicationPeriod.plus(start).toNumber();
        await this.skipTo(target);
    }

    public async skipCommitPeriod(start: number): Promise<void> {
        await this.initializing;
        const target = this.commitPeriod.plus(start).toNumber();
        await this.skipTo(target);
    }

    public async skipRewardPeriods(start: number = null, count: number = 1): Promise<void> {
        await this.initializing;
        const target = this.rewardPeriod
            .multipliedBy(count)
            .plus(start || (await this.web3Wrapper.getBlockNumberAsync()))
            .toNumber();
        await this.skipTo(target);
    }

    public async skipTo(endBlock: number): Promise<void> {
        await this.initializing;
        while ((await this.web3Wrapper.getBlockNumberAsync()) < endBlock) {
            await this.skipBlocks(1);
        }
    }

    public async toStakeholderCut(value: string | number | BigNumber): Promise<string> {
        await this.initializing;
        return new BigNumber(value)
            .times(new BigNumber(this.stakeholderCut))
            .div(new BigNumber("100"))
            .toString();
    }

    public async prepareTokens(from: string, funds: BigNumber): Promise<void> {
        await this.migratedContracts.kosuToken.approve.awaitTransactionSuccessAsync(
            this.migratedContracts.treasury.address,
            new BigNumber(funds),
            { from },
        );
        const currentBalance = await this.migratedContracts.kosuToken.balanceOf.callAsync(from);
        if (currentBalance.lt(funds)) {
            const tokenPerWei = await this.migratedContracts.kosuToken.estimateEtherToToken.callAsync(
                new BigNumber("1"),
            );
            const needed = funds.minus(currentBalance);
            const weiToDeposit = needed.div(tokenPerWei).plus("1");
            await this.web3Wrapper.sendTransactionAsync({
                to: this.migratedContracts.kosuToken.address,
                from,
                value: weiToDeposit.toString(),
                gas: "70000",
            });
        }
        await this.migratedContracts.treasury.deposit.awaitTransactionSuccessAsync(new BigNumber(funds), { from });
    }

    public async cleanAccounts(): Promise<void> {
        for (const account of this.accounts) {
            await this.clearTreasury(account);
            if (account !== this.accounts[0]) {
                await this.ensureTokenBalance(account, TestValues.zero);
            }
            await this.migratedContracts.kosuToken.approve.awaitTransactionSuccessAsync(
                this.migratedContracts.treasury.address,
                TestValues.zero,
                {
                    from: account,
                },
            );
        }
    }

    public async variablePoll(
        start: number,
        end: number,
        options: { win?: BigNumber; lose?: BigNumber } = {},
    ): Promise<{ blockNumber: number; pollId: BigNumber }> {
        const base = await this.web3Wrapper.getBlockNumberAsync();
        const creationBlock = base + 1;
        const commitEnd = creationBlock + start;
        const revealEnd = commitEnd + end;
        const { logs, blockNumber } = await this.migratedContracts.voting.createPoll.awaitTransactionSuccessAsync(
            new BigNumber(commitEnd),
            new BigNumber(revealEnd),
            options.win || new BigNumber(0),
            options.lose || new BigNumber(0),
        );
        const { pollId } = decodeKosuEvents(logs)[0];
        return { blockNumber, pollId: new BigNumber(pollId) };
    }
}

export { TestValues };
