import { Web3Wrapper } from "@0x/web3-wrapper";
import { DeployedAddresses, eventDecoder } from "@kosu/system-contracts";
import { DecodedLogArgs, FilterObject, LogEntry } from "ethereum-protocol";
import Web3 from "web3";
import Timeout = NodeJS.Timeout;

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
};

export class EventEmitter {
    private readonly web3Wrapper: Web3Wrapper;
    private address: string;
    private kosuWeb3Wrapper: Web3Wrapper;

    constructor(options: KosuOptions) {
        this.web3Wrapper = options.web3Wrapper;
        this.address = options.eventEmitterAddress;
    }

    public async getAddress(): Promise<string> {
        if (!this.address) {
            this.address = DeployedAddresses[await this.web3Wrapper.getNetworkIdAsync()].EventEmitter;
        }

        return this.address;
    }

    public async getPastDecodedLogs(
        config: FilterObject,
    ): Promise<Array<LogWithDecodedKosuArgs<DecodedLogArgs, DecodedKosuLogArgs>>> {
        Object.assign(config, { address: await this.getAddress() });
        return this.web3Wrapper
            .getLogsAsync(config)
            .catch(async err => {
                if (err.message.includes("more than 1000 results")) {
                    return this.getPastLogsFromKosuEndpoint(config);
                } else {
                    throw err;
                }
            })
            .then((logs: LogEntry[]) => {
                return this._decodeLogs(logs);
            });
    }

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
