import { BigNumber } from "@0x/utils";
import { Kosu } from "@kosu/kosu.js";

import { RedisWrapper } from "./RedisWrapper";

export const fields = {
    "token/total_supply": {
        updateEvery: 30000,
        updateFunc: async (_this, kosu: Kosu, _: RedisWrapper) => {
            const val = await kosu.kosuToken.totalSupply();
            return val.toString();
        },
    },
    "token/price": {
        updateEvery: 30000,
        updateFunc: async (_this, kosu: Kosu, _: RedisWrapper) => {
            const one = new BigNumber(kosu.web3.utils.toWei("1"));
            const val = await kosu.kosuToken.estimateTokenToEther(one);
            return val.toString();
        },
    },
    "bandwidth/total_limit": {
        updateEvery: 1800000,
        updateFunc: async (_this, kosu: Kosu, _: RedisWrapper) => {
            const roundInfo = await kosu.node.roundInfo();
            return roundInfo.limit.toString();
        },
    },
    "bandwidth/total_orders": {
        updateEvery: 3000,
        updateFunc: async (_this, kosu: Kosu, _: RedisWrapper) => {
            try {
                const orders = await kosu.node.totalOrders();
                return orders.toString();
            } catch (error) {
                return "0";
            }
        },
    },
    "bandwidth/remaining_limit": {
        updateEvery: 4000,
        updateFunc: async (_this, kosu: Kosu, _: RedisWrapper) => {
            const limit = await kosu.node.remainingLimit();
            return limit.toString();
        },
    },
    "bandwidth/number_posters": {
        updateEvery: 5000,
        updateFunc: async (_this, kosu: Kosu, _: RedisWrapper) => {
            const posters = await kosu.node.numberPosters();
            return posters.toString();
        },
    },
    "bandwidth/sec_to_next_period": {
        updateEvery: 3500,
        updateFunc: async (_this, kosu: Kosu, db: RedisWrapper) => {
            // initial query
            const roundInfo = await kosu.node.roundInfo();

            const ethBlock = await kosu.web3.eth.getBlockNumber();
            const roundEnd = roundInfo.endsAt.toString();

            // set values while we have them
            await db.set("bandwidth/current_eth_block", ethBlock);
            await db.set("bandwidth/period_end_eth_block", roundEnd);

            // calculate difference
            const diff = parseInt(roundEnd) - parseInt(ethBlock);
            if (diff <= 0) {
                return "15";
            } else {
                const sec = diff * 15 + 15;
                return sec.toString();
            }
        },
    },
    "bandwidth/rebalance_period_number": {
        updateEvery: 10000,
        updateFunc: async (_this, kosu: Kosu, _: RedisWrapper) => {
            const roundInfo = await kosu.node.roundInfo();
            return roundInfo.number;
        },
    },
    "network/number_validators": {
        updateEvery: 5000,
        updateFunc: async (_this, kosu: Kosu, _: RedisWrapper) => {
            const validators = await kosu.node.validators();
            return validators.length.toString();
        },
    },
    "network/total_validator_stake": {
        updateEvery: 3600000,
        updateFunc: async (_this, kosu: Kosu, _: RedisWrapper) => {
            let totalStake = new BigNumber(0);
            const validators = await kosu.node.validators();
            for (const validator of validators) {
                totalStake = totalStake.plus(validator.balance);
            }
            return totalStake.toString();
        },
    },
    "network/total_poster_stake": {
        updateEvery: 60000,
        updateFunc: async (_this, kosu: Kosu, _: RedisWrapper) => {
            const raw = await kosu.posterRegistry.tokensContributed();
            return raw.toString();
        },
    },
};
