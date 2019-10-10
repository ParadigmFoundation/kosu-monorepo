import { Web3Wrapper } from "@0x/web3-wrapper";
import { eventDecoder } from "@kosu/contract-utils";
import { DeployedAddresses } from "@kosu/migrations";
import Timeout = NodeJS.Timeout;
import { DecodedKosuLogArgs, KosuOptions, LogWithDecodedKosuArgs } from "@kosu/types";
import { DecodedLogArgs, FilterObject, LogEntry } from "ethereum-protocol";
import Web3 from "web3";

const KosuEndpoints = {
    1: {
        http: `https://ethnet.zaidan.io/mainnet`,
        ws: `wss://ethnet.zaidan.io/ws/mainnet`,
    },
    3: {
        http: `https://ethnet.zaidan.io/ropsten`,
        ws: `wss://ethnet.zaidan.io/ws/ropsten`,
    },
    42: {
        http: `https://ethnet.zaidan.io/kovan`,
        ws: `wss://ethnet.zaidan.io/ws/kovan`,
    },
    6174: {
        http: `https://ethnet.zaidan.io/kosu`,
        ws: `wss://ethnet.zaidan.io/ws/kosu`,
    },
};

/**
 * The `EventEmitter` class simplifies interaction with the Kosu `EventEmitter`
 * contract. It provides methods to access historical decoded event logs, and
 * to subscribe to future events.
 */
export class EventEmitter {
    /**
     * The `web3Wrapper` instance with the contract's ABI loaded.
     */
    private readonly web3Wrapper: Web3Wrapper;

    /**
     * The address of the deployed `EventEmitter` contract for the current Ethereum
     * network.
     */
    private address: string;

    /**
     * A separate `web3Wrapper` instance that can be configured with the Kosu
     * development proof-of-authority network for testing purposes.
     */
    private kosuWeb3Wrapper: Web3Wrapper;

    /**
     * Create a new `EventEmitter` instance.
     *
     * @param options Options object with `web3Wrapper` and optional `eventEmitterAddress`.
     */
    constructor(options: KosuOptions) {
        this.web3Wrapper = options.web3Wrapper;
        this.address = options.eventEmitterAddress;
    }

    /**
     * Return the address of the configured deployed contract. If not already cached,
     * will return the deployed address for the detected network ID (if available).
     */
    public async getAddress(): Promise<string> {
        if (!this.address) {
            const networkId = await this.web3Wrapper.getNetworkIdAsync();
            const receipts = DeployedAddresses[networkId];
            if (!receipts || !receipts.EventEmitter) {
                throw new Error("No known Kosu deployment for detected networkId.");
            }
            this.address = receipts.EventEmitter.contractAddress;
        }
        return this.address;
    }

    /**
     * Get all past decoded logs from the Kosu `EventEmitter` contract, with the
     * oldest event at position 0.
     *
     * @param config Configure logs query (see `options` for `web3wrapper.getLogsAsync`)
     * @returns An array of event logs with decoded arguments from the EventEmitter.
     */
    public async getPastDecodedLogs(
        config: FilterObject,
    ): Promise<Array<LogWithDecodedKosuArgs<DecodedLogArgs, DecodedKosuLogArgs>>> {
        Object.assign(config, { address: await this.getAddress() });
        return this.web3Wrapper
            .getLogsAsync(config)
            .catch(
                /* istanbul ignore next */
                async err => {
                    if (err.message.includes("more than 1000 results")) {
                        return this.getPastLogsFromKosuEndpoint(config);
                    } else {
                        throw err;
                    }
                },
            )
            .then((logs: LogEntry[]) => {
                return this._decodeLogs(logs);
            });
    }

    /**
     * @todo document better (and confirm)
     *
     * @param start The first block to process events with the `callback` for.
     * @param callback A callback function to be called on an array of each new event log.
     */
    public getFutureDecodedLogs(
        start: number,
        callback: (a: Array<LogWithDecodedKosuArgs<DecodedLogArgs, DecodedKosuLogArgs>>) => void,
    ): Timeout {
        let fromBlock: number = start;
        return setInterval(async () => {
            const logs: LogEntry[] = await this.web3Wrapper.getLogsAsync({
                fromBlock,
                address: await this.getAddress(),
            });
            if (logs.length > 0) {
                fromBlock = logs[logs.length - 1].blockNumber + 1;
                callback(this._decodeLogs(logs));
            }
        }, 1000);
    }

    /**
     * Load all historical even logs from the Kosu EventEmitter contract that is
     * deployed on the Kosu private test-network.
     *
     * @param config Filter object for querying past logs (see `web3Wrapper.getLogsAsync`).
     */
    /* istanbul ignore next */
    private async getPastLogsFromKosuEndpoint(config: FilterObject): Promise<any[]> {
        const chainId = await this.web3Wrapper.getNetworkIdAsync();
        if (!this.kosuWeb3Wrapper) {
            const kosuWeb3 = new Web3(KosuEndpoints[chainId].http);
            this.kosuWeb3Wrapper = new Web3Wrapper(kosuWeb3.currentProvider);
        }

        return this.kosuWeb3Wrapper.getLogsAsync(config);
    }

    private _decodeLogs(logs: LogEntry[]): Array<LogWithDecodedKosuArgs<DecodedLogArgs, DecodedKosuLogArgs>> {
        return logs.map(log => {
            const decoded: LogWithDecodedKosuArgs<
                DecodedLogArgs,
                DecodedKosuLogArgs
            > = (this.web3Wrapper.abiDecoder.tryToDecodeLogOrNoop(log) as unknown) as LogWithDecodedKosuArgs<
                DecodedLogArgs,
                DecodedKosuLogArgs
            >;
            decoded.decodedArgs = eventDecoder(decoded.args);
            return decoded;
        });
    }
}
