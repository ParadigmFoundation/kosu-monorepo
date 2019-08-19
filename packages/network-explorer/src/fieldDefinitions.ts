import { Kosu } from "@kosu/kosu.js";
import { BigNumber } from "@0x/utils";

export const fields = {
    "token/total_supply": {
        updateEvery: 60000,
        updateFunc: async (_this, kosu, query, db) => {
            const val = await kosu.kosuToken.totalSupply();
            return val.toString();
        },
    },
    "token/price": {
        updateEvery: 60000,
        updateFunc: async (_this, kosu: Kosu, query, db) => {
            const one = new BigNumber(1);
            const val = await kosu.kosuToken.estimateEtherToToken(one);
            return val.toFixed(5);
        },
    },
    "bandwidth/total_limit": {
        updateEvery: 1800000,
        updateFunc: async (_this, _, query, __) => {
            const roundInfo = await query.call(_this, "kosu_roundInfo");
            return roundInfo.limit;
        },
    },
    "bandwidth/total_orders": {
        updateEvery: 3000,
        updateFunc: async (_this, _, __, ___) => {
            return "not implemented";
        },
    },
    "bandwidth/remaining_limit": {
        updateEvery: 4000,
        updateFunc: async (_this, _, __, ___) => {
            return "not implemented";
        },
    },
    "bandwidth/number_posters": {
        updateEvery: 60000,
        updateFunc: async (_this, _, __, ___) => {
            return "not implemented";
        },
    },
    "bandwidth/sec_to_next_period": {
        updateEvery: 3500,
        updateFunc: async (_this, kosu: Kosu, query, db) => {
            // initial query
            const roundInfo = await query.call(_this, "kosu_roundInfo");

            const ethBlock = await kosu.web3.eth.getBlockNumber();
            const roundEnd = roundInfo.ends_at.toString();

            // set values while we have them
            await db.set("bandwidth/current_eth_block", ethBlock);
            await db.set("bandwidth/period_end_eth_block", roundEnd);

            // calculate difference
            const diff = parseInt(roundEnd) - parseInt(ethBlock);
            if (diff <= 0) {
                return "15";
            } else {
                const sec = (diff * 15) + 15;
                return sec.toString();
            }
        },
    },
    "bandwidth/rebalance_period_number": {
        updateEvery: 10000,
        updateFunc: async (_this, _, query, __) => {
            const roundInfo = await query.call(_this, "kosu_roundInfo");
            return roundInfo.number;
        },
    },
    "network/number_validators": {
        updateEvery: 5000,
        updateFunc: async (_this, _, query, __) => {
            const validators = await query.call(_this, "kosu_validators");
            return validators.length.toString();
        },
    },
    "network/total_validator_stake": {
        updateEvery: 3600000,
        updateFunc: async (_this, _, __, ___) => {
            return "0";
        },
    },
    "network/total_poster_stake": {
        updateEvery: 60000,
        updateFunc: async (_this, kosu: Kosu, _, __) => {
            const raw = await kosu.posterRegistry.tokensContributed();
            return raw.toString();
        },
    },
};
