import { Kosu } from "@kosu/kosu.js";
import { cloneDeep } from "lodash";
import uuid from "uuid/v4";
import ws from "ws";

import { RedisWrapper } from "./RedisWrapper";

interface QueryDefinition {
    [key: string]: {
        updateEvery: number;
        updateFunc: (
            _this: ChainData,
            kosu: Kosu,
            query: (
                method: string,
                params: any[],
                timeout: number,
            ) => Promise<any>,
            db: RedisWrapper,
        ) => Promise<string>;
        timer?: NodeJS.Timer;
    };
}

export class ChainData {
    private readonly redis: RedisWrapper;
    private readonly socket: ws;
    private readonly kosu: Kosu;

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
                total_supply: "-1",
                price: "-1",
            },
            bandwidth: {
                total_limit: "-1",
                total_orders: "-1",
                remaining_limit: "-1",
                number_posters: "-1",
                sec_to_next_period: "-1",
                current_eth_block: "-1",
                period_end_eth_block: "-1",
                rebalance_period_number: "-1",
            },
            network: {
                block_height: "-1",
                last_block_time: "-1",
                avg_block_interval: "-1",
                number_validators: "-1",
                total_poster_stake: "-1",
                total_validator_stake: "-1",
            },
        };
    }

    public getLatest(key?: string): any {
        if (!key) {
            return cloneDeep(this.latest);
        }
        const [one, two] = key.split("/");
        return this.latest[one][two];
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
                console.log(`set new value for '${key}' as '${value}'`);
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
            res = await val.updateFunc(this, this.kosu, this.query, this.redis);
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
        this.lastBlockTimes.forEach(diff => sum += diff);
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
                const valListArr = await this.query("kosu_validators", null, 5000);

                // tslint:disable-next-line
                for (let i = 0; i < valListArr.length; i++) {
                    const validatorData = valListArr[i];

                    const currHeight = parseInt(this.getLatest("network/block_height"));
                    const firstBlock = parseInt(validatorData.firstVote);
                    const uptimePercent = Math.floor((validatorData.totalVotes / ((currHeight - firstBlock))) * 100);

                    const validator: IValidator = {
                        public_key: validatorData.publicKey,

                        // HACK: balance encoded as { balance: 'value: 0' }
                        stake: validatorData.balance.split(": ")[1],

                        // TODO: load from contract system
                        reward: "not implemented",

                        uptime_percent: uptimePercent.toString(),
                        first_block: firstBlock.toString(),
                        last_voted: validatorData.firstVote.toString(),
                        power: validatorData.power.toString(),
                    };
                    this.validators.push(validator);
                }
            } catch (err) {
                console.error(`unable to update validator info: ${err.message}`);
            }
        };
    }

    private async query(
        method: string,
        params: any[],
        timeout: number = 4000,
    ): Promise<any> {
        return new Promise((resolve, reject) => {
            const requestId = uuid();
            let handler: (m: any) => void;

            const timer = setTimeout(() => {
                this.socket.off("message", handler);
                clearInterval(timer);
                reject(`timeout: failed query with method: "${method}"`);
            }, timeout);

            handler = (msg: any) => {
                const parsed = JSON.parse(msg.toString());
                if (parsed.id === requestId) {
                    this.socket.off("message", handler);
                    clearInterval(timer);
                    resolve(parsed.result);
                }
            };

            this.socket.on("message", handler);
            this.socket.send(JSON.stringify({
                jsonrpc: "2.0",
                id: requestId,
                method,
                params,
            }));
        }).catch((err: any) => {
            console.error(`failed node query: ${err}`);
        });
    }

    public async setLatest(): Promise<void> {
        const [
            total_supply,
            price,
            total_limit,
            total_orders,
            remaining_limit,
            number_posters,
            sec_to_next_period,
            current_eth_block,
            period_end_eth_block,
            rebalance_period_number,
            block_height,
            last_block_time,
            avg_block_interval,
            number_validators,
            total_poster_stake,
            total_validator_stake,
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
            token: { total_supply, price },
            bandwidth: {
                total_limit,
                total_orders,
                remaining_limit,
                number_posters,
                sec_to_next_period,
                current_eth_block,
                period_end_eth_block,
                rebalance_period_number,
            },
            network: {
                block_height,
                last_block_time,
                avg_block_interval,
                number_validators,
                total_poster_stake,
                total_validator_stake,
            },
            validators: cloneDeep(this.validators),
            transactions: cloneDeep(this.orders),
        };
    }
}
