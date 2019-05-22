import {Web3Wrapper} from "@0x/web3-wrapper";
import {DeployedAddresses, eventDecoder} from "@kosu/system-contracts";
import {DecodedLogArgs, FilterObject, LogWithDecodedArgs} from "ethereum-protocol";

export class EventEmitter {
    private readonly web3Wrapper: Web3Wrapper;
    private address: string;

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
        return this.web3Wrapper.getLogsAsync(config).then(logs => {
            return logs.map(log => {
                const decoded: LogWithDecodedArgs<DecodedLogArgs> = this.web3Wrapper.abiDecoder.tryToDecodeLogOrNoop(log) as LogWithDecodedArgs<DecodedLogArgs>;
                return eventDecoder(decoded.args);
            });
        });
    }
}
