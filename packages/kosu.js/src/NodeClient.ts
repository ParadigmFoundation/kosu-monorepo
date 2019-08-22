import { WebsocketProvider, WebsocketProviderOptions } from "@0x/web3-providers-fork";
import uuid from "uuid/v4";

export class NodeClient {
    public static DEFAULT_OPTIONS: WebsocketProviderOptions = { timeout: 3000 };

    private readonly _provider: WebsocketProvider;
    private readonly _heartbeatInterval: number;
    private readonly _subscriptionIdMap: { [uuid: string]: string };

    private static _convertValidatorData(...rawValidators: any[]): Validator[] {
        const validators = [];
        for (const validator of rawValidators) {
            const balance = parseInt(validator.balance.split(": ")[1]);
            validators.push({ ...validator, balance });
        }
        return validators;
    }

    constructor(url: string, options?: WebsocketProviderOptions) {
        this._provider = new WebsocketProvider(url, options || NodeClient.DEFAULT_OPTIONS);
        this._subscriptionIdMap = {};
    }

    public async addOrders(...orders: any[]): Promise<OrderValidationResult[]> {
        return this._call("kosu_addOrders", ...orders);
    }

    public async latestHeight(): Promise<number> {
        return this._call("kosu_latestHeight");
    }

    public async numberPosters(): Promise<number> {
        return this._call("kosu_numberPosters");
    }

    public async queryPoster(address: string): Promise<Poster> {
        if (/^0x[a-fA-F0-9]{40}$/.test(address)) {
            throw new Error("invalid Ethereum address string");
        }
        return this._call("kosu_queryPoster", address.toLowerCase());
    }

    public async queryValidator(nodeId: string): Promise<Validator> {
        if (!/^[a-fA-F0-9]{40}$/.test(nodeId)) {
            throw new Error("invalid validator node ID string");
        }

        // hack: dealing with protobuf decoding issues
        const raw = await this._call("kosu_queryValidator", nodeId);
        return NodeClient._convertValidatorData(raw)[0];
    }

    public async remainingLimit(): Promise<number> {
        return this._call("kosu_remainingLimit");
    }

    public async roundInfo(): Promise<RoundInfo> {
        const {
            number: num,
            limit,
            starts_at: startsAt,
            ends_at: endsAt,
        } = await this._call("kosu_roundInfo");
        return { number: num, limit, startsAt, endsAt };
    }

    public async totalOrders(): Promise<number> {
        return this._call("kosu_totalOrders");
    }

    public async validators(): Promise<Validator[]> {
        const rawValidators = await this._call("kosu_validators");
        return NodeClient._convertValidatorData(...rawValidators);
    }

    public async subscribeToOrders(cb: (orders: any[]) => void): Promise<string> {
        const id = await this._subscribe("newOrders");
        const subId = this._subscriptionIdMap[id];
        this._provider.on(subId, cb as any);
        return id;
    }

    public async subscribeToBlocks(cb: (orders: any[]) => void): Promise<string> {
        const id = await this._subscribe("newBlocks");
        const subId = this._subscriptionIdMap[id];
        this._provider.on(subId, cb as any);
        return id;
    }

    public async subscribeToRebalances(cb: (orders: any[]) => void): Promise<string> {
        const id = await this._subscribe("newRebalances");
        const subId = this._subscriptionIdMap[id];
        this._provider.on(subId, cb as any);
        return id;
    }

    public async unsubscribe(subscriptionId: string): Promise<void> {
        const kosuSubscriptionId = this._subscriptionIdMap[subscriptionId];
        await this._call("kosu_unsubscribe", kosuSubscriptionId);
    }

    private async _call(method: string, ...params: any[]): Promise<any> {
        return this._provider.send(method, params || []);
    }

    private async _subscribe(topic: string): Promise<string> {
        const kosuSubscriptionId = await this._provider.subscribe("kosu_subscribe", topic, []);
        const mappingId = uuid();
        this._subscriptionIdMap[mappingId] = kosuSubscriptionId;
        return mappingId;
    }
}
