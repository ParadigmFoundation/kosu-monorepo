import { Web3Wrapper } from "@0x/web3-wrapper";
import { DeployedAddresses, eventDecoder } from "@kosu/system-contracts";
import { DecodedLogArgs, FilterObject, LogWithDecodedArgs } from "ethereum-protocol";
import Web3 from "web3";

// TODO: move to some const file?
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

    public async getPastDecodedLogs(config: FilterObject): Promise<any[]> {
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
            .then((logs: any[]) => {
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
            });
    }

    private async getPastLogsFromKosuEndpoint(config: FilterObject): Promise<any[]> {
        const chainId = await this.web3Wrapper.getNetworkIdAsync();
        if (!this.kosuWeb3Wrapper) {
            const kosuWeb3 = new Web3(KosuEndpoints[chainId].http);
            this.kosuWeb3Wrapper = new Web3Wrapper(kosuWeb3.currentProvider);
        }

        return this.kosuWeb3Wrapper.getLogsAsync(config);
    }
}
