import { BigNumber } from "@0x/utils";
import { WebsocketProvider, WebsocketProviderOptions } from "@0x/web3-providers-fork";
import { OrderValidationResult, Poster, RoundInfo, Validator } from "@kosu/types";
import assert from "assert";
import { createHash } from "crypto";
import { isFunction, isString } from "lodash";
import uuid from "uuid/v4";

/**
 * A simple JSONRPC/WebSocket client for the `go-kosu` JSONRPC-API. Supports the
 * full Kosu JSONRPC, including subscriptions.
 *
 * It is built on the [web3](https://www.npmjs.com/package/web3) `WebSocketProvider`
 * JSONRPC client, through a more desirable fork provided by [0x.](https://0x.org)
 * As such, it can be configured with the same options supported by the underlying
 * client.
 *
 * It must be initialized with the URL of a `go-kosu` node serving the JSONRPC
 * over WebSocket.
 *
 * View the Kosu RPC documentation [here.](https://docs.kosu.io/go-kosu/kosu_rpc.html)
 */
export class NodeClient {
    /**
     * The default options specify a connection timeout of 3s, all other defaults
     * are inherited from `WebsocketProviderOptions`.
     */
    public static DEFAULT_OPTIONS: WebsocketProviderOptions = { timeout: 3000 };

    /**
     * Kosu validator public key's are 32 bytes long.
     */
    public static PUBLIC_KEY_LENGTH = 32;

    /**
     * Kosu validator node IDs are the first 20 bytes of the SHA-256 hash of the
     * public key.
     */
    public static NODE_ID_HASH_OFFSET = 20;

    private readonly _provider: WebsocketProvider;
    private readonly _subscriptionIdMap: { [uuid: string]: string };

    /**
     * Convert a Kosu/Tendermint public key to the corresponding node ID.
     *
     * The node ID is the first 20 bytes of the SHA-256 hash of the public key.
     *
     * @param publicKey Base64-encoded validator public key.
     * @returns The node ID (tendermint "address") for that public key.
     */
    public static publicKeyToNodeId(publicKey: string): string {
        const pub = Buffer.from(publicKey, "base64");
        assert.equal(pub.length, NodeClient.PUBLIC_KEY_LENGTH, "invalid public key");

        const hash = createHash("SHA256").update(pub);
        const digest = hash.digest();
        const nodeId = digest.slice(0, NodeClient.NODE_ID_HASH_OFFSET);
        return nodeId.toString("hex");
    }

    private static _convertValidatorData(...rawValidators: any[]): Validator[] {
        const validators = [];
        for (const validator of rawValidators) {
            // HACK: protobuf nests the balance as `balance: "value: N"`
            const balance = new BigNumber(validator.balance.split(": ")[1]);
            validators.push({ ...validator, balance });
        }
        return validators;
    }

    /**
     * Create a new NodeClient (`node`) via a connection to a Kosu node serving
     * the Kosu JSONRPC/WebSocket.
     *
     * @param url Full URL to the Kosu node's WebSocket JSONRPC endpoint.
     * @param options Options to provide the underlying `WebSocketProvider`.
     * @example
     * ```typescript
     * // create a node client (with a request/connection timeout of 1s)
     * const node = new NodeClient("wss://localhost:14342", { timeout: 1000 });
     * ```
     */
    constructor(url: string, options?: WebsocketProviderOptions) {
        this._provider = new WebsocketProvider(url, options || NodeClient.DEFAULT_OPTIONS);
        this._subscriptionIdMap = {};
    }

    /**
     * See [`kosu_addOrders`.](https://docs.kosu.io/go-kosu/kosu_rpc.html#addorders)
     *
     * Submit poster-signed orders to the Kosu node to be subsequently proposed
     * to the network. In order for them to be accepted, they must have signatures
     * from valid posters who have bonded Kosu tokens.
     *
     * See the `posterRegistry.registerTokens()` method to bond KOSU.
     *
     * @param orders Orders to submit to the node as subsequent arguments.
     * @returns Validation results from the Kosu node, and/or the transaction
     * ID's of the accepted orders.
     */
    public async addOrders(...orders: any[]): Promise<OrderValidationResult[]> {
        return this._call("kosu_addOrders", ...orders);
    }

    /**
     * See [`kosu_latestHeight`.](https://docs.kosu.io/go-kosu/kosu_rpc.html#latestheight)
     *
     * Get the height of the most recently committed and finalized Kosu block.
     *
     * @returns The most recent Kosu block number.
     */
    public async latestHeight(): Promise<number> {
        return this._call("kosu_latestHeight");
    }

    /**
     * See [`kosu_numberPosters`.](https://docs.kosu.io/go-kosu/kosu_rpc.html#numberposters)
     *
     * Get the total number registered posters from the Kosu node.
     *
     * @returns The total number of poster accounts the node is tracking.
     */
    public async numberPosters(): Promise<number> {
        return this._call("kosu_numberPosters");
    }

    /**
     * See [`kosu_queryPoster`.](https://docs.kosu.io/go-kosu/kosu_rpc.html#queryposter)
     *
     * Get finalized (committed into current state) balance and order limit data
     * about a specified poster account.
     *
     * @returns Balance and order limit data for the specified poster account.
     */
    public async queryPoster(address: string): Promise<Poster> {
        assert(/^0x[a-fA-F0-9]{40}$/.test(address), "invalid Ethereum address string");
        const raw = await this._call("kosu_queryPoster", address.toLowerCase());

        // HACK: dealing with protobuf `balance: 'value: N'` encoding
        const balance = new BigNumber(raw.balance.split(": ")[1]);
        return { ...raw, balance };
    }

    /**
     * See [`kosu_queryValidator`.](https://docs.kosu.io/go-kosu/kosu_rpc.html#queryvalidator)
     *
     * Get finalized (committed into current state) information about a Kosu
     * validator node, identified by their node ID (also called Tendermint
     * address).
     *
     * See `NodeClient.publicKeyToNodeId()` to converting a validator's encoded
     * public key to it's node ID.
     *
     * @returns Information about the requested validator (see `Validator`).
     */
    public async queryValidator(nodeId: string): Promise<Validator> {
        assert(/^[a-fA-F0-9]{40}$/.test(nodeId), "invalid nodeId string");

        // hack: dealing with protobuf decoding issues
        const raw = await this._call("kosu_queryValidator", nodeId);
        return NodeClient._convertValidatorData(raw)[0];
    }

    /**
     * See [`kosu_remainingLimit`.](https://docs.kosu.io/go-kosu/kosu_rpc.html#remaininglimit)
     *
     * Get the total number of orders that _may_ be posted this period. It is
     * equal to the sum of the unutilized bandwidth allocation for each poster
     * account for the current rebalance period.
     *
     * @returns The unutilized order bandwidth for the current period.
     */
    public async remainingLimit(): Promise<number> {
        return this._call("kosu_remainingLimit");
    }

    /**
     * See [`kosu_roundInfo`.](https://docs.kosu.io/go-kosu/kosu_rpc.html#roundinfo)
     *
     * Get the current rebalance period number, starting Ethereum block, ending
     * Ethereum block, and the maximum number of orders for the period.
     *
     * @returns Information about the current rebalance period.
     */
    public async roundInfo(): Promise<RoundInfo> {
        const { number: num, limit: lim, starts_at: startsAt, ends_at: endsAt } = await this._call("kosu_roundInfo");
        return { number: num, limit: lim, startsAt, endsAt };
    }

    /**
     * See [`kosu_totalOrders`.](https://docs.kosu.io/go-kosu/kosu_rpc.html#totalorders)
     *
     * Get the total number of orders that have been processed by the network
     * since genesis.
     *
     * @returns The total number of orders posted since network genesis.
     */
    public async totalOrders(): Promise<number> {
        return this._call("kosu_totalOrders");
    }

    /**
     * See [`kosu_validators`.](https://docs.kosu.io/go-kosu/kosu_rpc.html#validators)
     *
     * Get finalized (committed into current state) information about the current
     * full validator set. Returns the full set (not paginated).
     *
     * @returns Information about all active Kosu validators (see `Validator`).
     */
    public async validators(): Promise<Validator[]> {
        const rawValidators = await this._call("kosu_validators");
        return NodeClient._convertValidatorData(...rawValidators);
    }

    /**
     * Read about Kosu subscriptions [here](https://docs.kosu.io/go-kosu/kosu_rpc.html#subscriptions).
     *
     * See [`kosu_subscribe` for topic `newOrders`.](https://docs.kosu.io/go-kosu/kosu_rpc.html#neworders)
     *
     * Subscribe to order transaction events, and be udpdated with an array of new
     * orders each time they are included in a Kosu block.
     *
     * @param cb A callback function to handle each array of new orders.
     * @returns A UUID that can be used to cancel the new subscription (see `node.unsubscribe()`).
     */
    public async subscribeToOrders(cb: (order: any) => void): Promise<string> {
        return this._subscribe("newOrders", (res: any) => cb(res.result));
    }

    /**
     * Read about Kosu subscriptions [here](https://docs.kosu.io/go-kosu/kosu_rpc.html#subscriptions).
     *
     * See [`kosu_subscribe` for topic `newBlocks`.](https://docs.kosu.io/go-kosu/kosu_rpc.html#newblocks)
     *
     * Subscribe to new block events, and be updated with the full Tendermint block
     * after each successful commit.
     *
     * @param cb A callback function to handle new rebalance information.
     * @returns A UUID that can be used to cancel the new subscription (see `node.unsubscribe()`).
     */
    public async subscribeToBlocks(cb: (block: any) => void): Promise<string> {
        return this._subscribe("newBlocks", (res: any) => cb(res.result.block));
    }

    /**
     * Read about Kosu subscriptions [here](https://docs.kosu.io/go-kosu/kosu_rpc.html#subscriptions).
     *
     * See [`kosu_subscribe` for topic `newRebalances`.](https://docs.kosu.io/go-kosu/kosu_rpc.html#newrebalances)
     *
     * Subscribe to rebalance events, and be updated with each new rebalance round
     * information (starting block, ending block, etc.).
     *
     * @param cb A callback function to handle new rebalance information.
     * @returns A UUID that can be used to cancel the new subscription (see `node.unsubscribe()`).
     */
    public async subscribeToRebalances(cb: (roundInfo: RoundInfo) => void): Promise<string> {
        return this._subscribe("newRebalances", (res: any) => cb(res.result.round_info));
    }

    /**
     * Cancel an active subscription.
     *
     * @param subscriptionId The UUID of the subscription to cancel.
     */
    public async unsubscribe(subscriptionId: string): Promise<void> {
        assert(isString(subscriptionId), "subscriptionId must be a string");
        await this._call("kosu_unsubscribe", this._subscriptionIdMap[subscriptionId]);
    }

    private async _call(method: string, ...params: any[]): Promise<any> {
        assert(isString(method), "method must be a string");
        return this._provider.send(method, params || []);
    }

    private async _subscribe(topic: string, cb: (...args: any) => any): Promise<string> {
        assert(isString(topic), "topic must be a string");
        assert(isFunction(cb), "cb must be a function");

        const kosuSubscriptionId = await this._provider.subscribe("kosu_subscribe", topic, []);
        const mappingId = uuid();
        this._subscriptionIdMap[mappingId] = kosuSubscriptionId;
        this._provider.on(kosuSubscriptionId, cb as any);
        return mappingId;
    }
}
