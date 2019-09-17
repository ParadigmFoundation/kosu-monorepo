import commander, { Command } from "commander";

export const cli: Command = new commander.Command();

const description = `\
Simple CLI for snap-shotting Kosu contract system to generate a Kosu network genesis file.

Be sure to view the documentation (docs.kosu.io) for more information and usage instructions.

The following options are required:
    -n, --chain-id <name>
    -p, --provider-url <url>
    -b, --snapshot-block <number>
    -t, --start-time <number>\
`;

cli.version("0.0.0")
    .description(description)
    .option("-n, --chain-id <name>", "Specify the resulting Kosu chain ID")
    .option("-p, --provider-url <url>", "HTTP Ethereum JSONRPC provider")
    .option("-b, --snapshot-block <number>", "The block height at which to snapshot Kosu contract system state")
    .option("-t, --start-time <number>", "Unix timestamp (in seconds) of network start")
    .option("-f, --finality-threshold <number>", "Minimum age of Ethereum blocks before submitting attestations", "10")
    .option("-l, --period-limit <number>", "Maximum number of order messages to accept per rebalance period", "100000")
    .option("-L, --period-length <number>", "The length of each rebalance period (in Ethereum blocks)", "5")
    .option("-m, --max-order-bytes <number>", "The maximum size of a single order transaction", "4096")
    .option("-c, --confirmation-threshold <number>", "Amount of network vote power needed to accept witness events (updated each block)", "0")
    .option("-B, --blocks-before-pruning <number>", "The number of blocks to wait before pruning old attestations", "50");
