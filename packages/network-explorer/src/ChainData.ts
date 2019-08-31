import { BigNumber } from "@0x/utils";
import { Kosu } from "@kosu/kosu.js";
import { cloneDeep } from "lodash";
import ws from "ws";

import { RedisWrapper } from "./RedisWrapper";

interface QueryDefinition {
    [key: string]: {
        updateEvery: number;
        updateFunc: (_this: ChainData, kosu: Kosu, db: RedisWrapper) => Promise<string>;
        timer?: NodeJS.Timer;
    };
}

export class ChainData {
    private readonly redis: RedisWrapper;
    private readonly socket: ws;
    public readonly kosu: Kosu;

    public latest: INetworkData;
    public validators: IValidator[];
    public orders: IOrder[];

    private readonly defs: QueryDefinition;
    private readonly keys: string[];

    // used to calculate average block times
    private readonly lastBlockTimes: number[] = [];
    private lastTime: number;
    private readonly averageOver: number;

    // timer set to update validator info
    private readonly validatorTimer: NodeJS.Timer;
    private readonly orderAmount: number;

    constructor(
        kosu: Kosu,
        kosuRpcUrl: string,
        definitions: QueryDefinition,
        validatorInterval: number,
        averageOver: number,
        orderAmount: number = 20,
    ) {
        this.kosu = kosu;
        this.averageOver = averageOver;
        this.orderAmount = orderAmount;
        this.defs = definitions;

        this.lastBlockTimes = [];

        this.keys = [];
        this.validators = [];
        this.orders = [];

        this.redis = new RedisWrapper();

        this.socket = new ws(kosuRpcUrl);
        this.socket.setMaxListeners(100);
        this.socket.on("open", async () => {
            await this.setup();
        });

        // set timer to update validators
        this.validatorTimer = setInterval(this.updateValidators(), validatorInterval);

        this.latest = {
            token: {
                totalSupply: "-1",
                price: "-1",
            },
            bandwidth: {
                totalLimit: "-1",
                totalOrders: "-1",
                remainingLimit: "-1",
                numberPosters: "-1",
                secToNextPeriod: "-1",
                currentEthBlock: "-1",
                periodEndEthBlock: "-1",
                rebalancePeriodNumber: "-1",
            },
            network: {
                blockHeight: "-1",
                lastBlockTime: "-1",
                avgBlockInterval: "-1",
                numberValidators: "-1",
                totalPosterStake: "-1",
                totalValidatorStake: "-1",
            },
        };
    }

    public getLatestData(): INetworkData {
        const data = cloneDeep(this.latest);
        data.validators = cloneDeep(this.validators);
        data.transactions = cloneDeep(this.orders);
        return data;
    }

    public addOrder(order: any): void {
        this.orders.push(order);
        while (this.orders.length > this.orderAmount) {
            this.orders.shift();
        }
    }

    public async updateBlockData(height: number, time: number): Promise<void> {
        if (this.lastBlockTimes.length === 0) {
            this.lastTime = time;
            this.addBlockTime(0);
        } else {
            const diff = time - this.lastTime;
            this.addBlockTime(diff);
        }

        // update in-state last-time
        this.lastTime = time;

        // recalculate average interval
        const avg = this.getAverageBlockTime();

        // set new values and update from db
        try {
            await Promise.all([
                this.redis.set("network/block_height", height),
                this.redis.set("network/last_block_time", time),
                this.redis.set("network/avg_block_interval", avg),
            ]);
            await this.setLatest();
            console.log(`successfully updated all data for block '${height}'`);
        } catch (err) {
            console.error(`failed to update one or more block data values`);
            console.error(`redis returned error: ${err}`);
        }

        return;
    }

    private async setup(): Promise<void> {
        // clear the db
        await this.redis.purgeAll();

        // setup timers and store initial value
        Object.keys(this.defs).forEach(async key => {
            const def = this.defs[key];
            this.keys.push(key);
            await this.updateVal(key)();
            def.timer = setInterval(this.updateVal(key), def.updateEvery);
        });

        // perform initial validator update after 8 seconds
        setTimeout(this.updateValidators(), 8000);
    }

    private updateVal(key: string): () => Promise<void> {
        return async () => {
            const value = await this.callFunc(key);
            if (!value || value === "" || value === "NaN" || isNaN(value)) {
                console.log(`not updating because we got null value for key '${key}' as '${value}'`);
            } else {
                await this.redis.set(key, value);
            }
            return;
        };
    }

    private async callFunc(key: string): Promise<any> {
        if (!this.defs[key] || !this.defs[key].updateFunc) {
            return;
        }

        let res = "";
        try {
            const val = this.defs[key];

            // tslint:disable no-unbound-method
            res = await val.updateFunc(this, this.kosu, this.redis);
        } catch (err) {
            console.error(`failed to update value for '${key}': ${err}`);
        }
        return res;
    }

    private addBlockTime(blockTime: number): void {
        if (this.lastBlockTimes.length < this.averageOver) {
            this.lastBlockTimes.push(blockTime);
        } else if (this.lastBlockTimes.length === this.averageOver) {
            this.lastBlockTimes.shift();
            this.lastBlockTimes.push(blockTime);
        } else {
            this.lastBlockTimes.push(blockTime);
            while (this.lastBlockTimes.length > this.averageOver) {
                this.lastBlockTimes.shift();
            }
        }
    }

    private getAverageBlockTime(): number {
        let sum = 0;
        const length = this.lastBlockTimes.length;
        this.lastBlockTimes.forEach(diff => (sum += diff));
        return Number((sum / length).toFixed(4));
    }

    private async getValue(key: string): Promise<string> {
        return this.redis.get(key);
    }

    private updateValidators(): () => Promise<void> {
        return async () => {
            this.validators = [];
            try {
                // get the current list of validator IDs
                const valListArr = await this.kosu.node.validators();

                // tslint:disable-next-line
                for (let i = 0; i < valListArr.length; i++) {
                    const validatorData = valListArr[i];

                    const currHeight = parseInt(await this.getValue("network/block_height"));
                    const firstBlock = parseInt(validatorData.firstVote);
                    const total = parseInt(validatorData.totalVotes);
                    const uptimePercent = Math.floor((total / (currHeight - firstBlock)) * 100).toString();

                    const listing = await this.kosu.validatorRegistry.getListing(validatorData.publicKey);
                    let reward: string;
                    if (listing.status === 0) {
                        reward = "0";
                    } else {
                        const raw = new BigNumber(listing.rewardRate);
                        reward = this.kosu.web3.utils.fromWei(raw.toString());
                    }

                    const { publicKey, firstVote, lastVoted, power, totalVotes, balance } = validatorData;
                    const validator: IValidator = {
                        publicKey,
                        stake: balance,

                        reward,
                        uptimePercent,
                        firstVote,
                        lastVoted,
                        totalVotes,
                        power,
                    };
                    Object.keys(validator).forEach(key => validator[key] = validator[key].toString());
                    this.validators.push(validator);
                }
                console.log(`validator data updated`);
            } catch (err) {
                console.error(`unable to update validator info: ${err.message}`);
            }
        };
    }

    public async setLatest(): Promise<void> {
        const [
            totalSupply,
            price,
            totalLimit,
            totalOrders,
            remainingLimit,
            numberPosters,
            secToNextPeriod,
            currentEthBlock,
            periodEndEthBlock,
            rebalancePeriodNumber,
            blockHeight,
            lastBlockTime,
            avgBlockInterval,
            numberValidators,
            totalPosterStake,
            totalValidatorStake,
        ] = await Promise.all([
            this.getValue("token/total_supply"),
            this.getValue("token/price"),
            this.getValue("bandwidth/total_limit"),
            this.getValue("bandwidth/total_orders"),
            this.getValue("bandwidth/remaining_limit"),
            this.getValue("bandwidth/number_posters"),
            this.getValue("bandwidth/sec_to_next_period"),
            this.getValue("bandwidth/current_eth_block"),
            this.getValue("bandwidth/period_end_eth_block"),
            this.getValue("bandwidth/rebalance_period_number"),
            this.getValue("network/block_height"),
            this.getValue("network/last_block_time"),
            this.getValue("network/avg_block_interval"),
            this.getValue("network/number_validators"),
            this.getValue("network/total_poster_stake"),
            this.getValue("network/total_validator_stake"),
        ]);
        this.latest = {
            token: { totalSupply, price },
            bandwidth: {
                totalLimit,
                totalOrders,
                remainingLimit,
                numberPosters,
                secToNextPeriod,
                currentEthBlock,
                periodEndEthBlock,
                rebalancePeriodNumber,
            },
            network: {
                blockHeight,
                lastBlockTime,
                avgBlockInterval,
                numberValidators,
                totalPosterStake,
                totalValidatorStake,
            },
            validators: cloneDeep(this.validators),
            transactions: cloneDeep(this.orders),
        };
    }
}
