import { BigNumber } from "@0x/utils";
import { Web3Wrapper } from "@0x/web3-wrapper";

import { decodeKosuEvents } from "../eventDecoder";

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

    constructor(web3Wrapper: Web3Wrapper, migratedContracts: MigratedTestContracts) {
        this.web3Wrapper = web3Wrapper;
        this.migratedContracts = migratedContracts;
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
        const transactions = [];
        await this.migratedContracts.kosuToken.balanceOf.callAsync(address).then(async balance => {
            if (balance.gt(desiredValue)) {
                transactions.push(
                    this.migratedContracts.kosuToken.transfer.awaitTransactionSuccessAsync(
                        this.accounts[0],
                        balance.minus(desiredValue),
                        {
                            from: address,
                        },
                    ),
                );
            } else if (balance.lt(desiredValue)) {
                transactions.push(
                    this.migratedContracts.kosuToken.transfer.awaitTransactionSuccessAsync(
                        address,
                        desiredValue.minus(balance),
                    ),
                );
            }
        });
        await Promise.all(transactions);
        if (
            (await this.migratedContracts.kosuToken.balanceOf.callAsync(address).then(val => val.toString())) !==
            desiredValue.toString()
        ) {
            throw new Error(`Ensure ${address} has balanceOf ${desiredValue.toString()} failed`);
        }
    }

    public async clearTreasury(address: string): Promise<void> {
        const transactions = [];
        const systemBalance = await this.migratedContracts.treasury.systemBalance.callAsync(address);
        if (systemBalance.gt(0)) {
            const currentBalance = await this.migratedContracts.treasury.currentBalance.callAsync(address);
            if (systemBalance.gt(currentBalance)) {
                // TODO address this
                // transactions.push(
                //     this.migratedContracts.treasury.releaseTokens.awaitTransactionSuccessAsync(
                //         address,
                //         systemBalance.minus(currentBalance),
                //     ),
                // );
            }
            transactions.push(
                this.migratedContracts.treasury.withdraw.awaitTransactionSuccessAsync(
                    /*systemBalance*/ currentBalance,
                    {
                        from: address,
                    },
                ),
            );
            await Promise.all(transactions);
        }
    }

    public async prepareListing(
        tendermintPublicKey: string,
        options: { stake?: BigNumber; reward?: BigNumber; details?: string } = {},
    ): Promise<void> {
        await this.initializing;
        const { stake, reward, details } = options;
        await this.migratedContracts.kosuToken.approve.awaitTransactionSuccessAsync(
            this.migratedContracts.treasury.address,
            stake || this.minimumBalance,
        );
        const result = await this.migratedContracts.validatorRegistry.registerListing.awaitTransactionSuccessAsync(
            tendermintPublicKey,
            stake || this.minimumBalance,
            reward || new BigNumber("0"),
            details || "details",
        );
        await this.skipApplicationPeriod(result.blockNumber);
    }

    public async exitListing(publicKey: string, from: string = this.accounts[0]): Promise<void> {
        await this.initializing;
        const { status } = await this.migratedContracts.validatorRegistry.getListing.callAsync(publicKey);
        const result = await this.migratedContracts.validatorRegistry.initExit.awaitTransactionSuccessAsync(publicKey, {
            from,
        });
        if (status === 1) {
            await this.clearTreasury(from);
        } else {
            await this.finishExit(publicKey, from, result.blockNumber);
        }
    }

    public async finishExit(publicKey: string, from: string = this.accounts[0], initBlock?: number): Promise<void> {
        await this.initializing;
        await this.skipExitPeriod(initBlock || (await this.web3Wrapper.getBlockNumberAsync()));
        await this.migratedContracts.validatorRegistry.finalizeExit.awaitTransactionSuccessAsync(publicKey, { from });
        await this.clearTreasury(from);
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

    private async skipTo(endBlock: number): Promise<void> {
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
        await this.migratedContracts.treasury.deposit.awaitTransactionSuccessAsync(new BigNumber(funds), { from });
    }

    public async cleanAccounts(): Promise<void> {
        const transactions = [];
        for (const account of this.accounts) {
            await this.clearTreasury(account);
            if (account !== this.accounts[0]) {
                await this.ensureTokenBalance(account, TestValues.zero);
            }
            transactions.push(
                this.migratedContracts.kosuToken.approve.awaitTransactionSuccessAsync(
                    this.migratedContracts.treasury.address,
                    TestValues.zero,
                    {
                        from: account,
                    },
                ),
            );
        }
    }

    public async variablePoll(start: number, end: number): Promise<number> {
        const base = await this.web3Wrapper.getBlockNumberAsync();
        const creationBlock = base + 1;
        const commitEnd = creationBlock + start;
        const revealEnd = commitEnd + end;
        const result = await this.migratedContracts.voting.createPoll.awaitTransactionSuccessAsync(
            commitEnd,
            revealEnd,
        );
        const { pollId } = decodeKosuEvents(result.logs)[0];
        return pollId;
    }
}

export { TestValues };
