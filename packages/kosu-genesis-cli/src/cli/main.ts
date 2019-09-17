#!/usr/bin/env node
import { Kosu } from "@kosu/kosu.js";
import chalk from "chalk";
import Web3 from "web3";

import { generateGenesisFromBlock } from "../functions";

import { cli, loadConsensusParameters, validateOptions } from ".";

async function main(): Promise<void> {
    validateOptions(cli.parse(process.argv));

    const {
        chainId,
        providerUrl,
        snapshotBlock,
        startTime,
    } = cli;

    const consensusParameters = loadConsensusParameters(cli);

    let kosu: Kosu;
    try {
        const provider = new Web3(providerUrl).currentProvider;
        kosu = new Kosu({ provider });
    } catch (error) {
        throw new Error(`Failed to setup provider: ${error}`);
    }

    try {
        const genesis = await generateGenesisFromBlock(
            kosu,
            chainId,
            parseInt(snapshotBlock),
            parseInt(startTime),
            consensusParameters,
        );

        // output formatted genesis file to stdout
        console.log(JSON.stringify(genesis, null, 2));
    } catch (error) {
        throw new Error(`Failed to generate genesis: ${error.message}`);
    }
}

process.on("unhandledRejection", (reason: any) => {
    const message = reason && reason.message ? reason.message : reason;
    console.error(chalk.red(`Critical failure: ${message}`));
});

main();
