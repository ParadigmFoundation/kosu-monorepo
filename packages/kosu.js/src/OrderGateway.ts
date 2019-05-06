import BN = require("bn.js");
import Web3 from "web3";
import Contract from "web3/eth/contract";

import { OrderSerializer } from "./OrderSerializer";

// tslint:disable-next-line: no-var-requires
const OrderGatewayContractData = require("@kosu/system-contracts").contracts.OrderGateway;

/**
 * Integration with OrderGateway contract on an Ethereum blockchain.
 *
 * @todo Refactor contract integration after migration away from truffle
 */
export class OrderGateway {
    private readonly web3: Web3;
    private readonly initializing: Promise<void>;
    private address: string;
    private contract: Contract;

    // @ts-ignore
    private Participation: any;

    /**
     * Create a new OrderGateway instance.
     *
     * @param options instantiation options
     */
    constructor(options: KosuOptions) {
        this.web3 = options.web3;
        this.initializing = this.init(options);
    }

    /**
     * Asyncronously initializes the instance after construction
     *
     * @param options instantiation options
     * @returns A promise to await complete instantiation for further calls
     */
    private async init(options: KosuOptions): Promise<void> {
        const networkId = options.networkId || (await options.web3.eth.net.getId());
        if (options.orderGatewayAddress) {
            this.address = options.orderGatewayAddress;
            this.contract = new this.web3.eth.Contract(OrderGatewayContractData.abi, this.address);
        } else if (OrderGatewayContractData.networks[networkId]) {
            this.address = OrderGatewayContractData.networks[networkId].address;
            this.contract = new this.web3.eth.Contract(OrderGatewayContractData.abi, this.address);
        } else {
            throw new Error("Invalid network for OrderGateway");
        }
        this.Participation = this.contract.events.Participation;
    }

    /**
     * Participate in the terms of an order
     *
     * @param order A Kosu order
     * @param takerValues Taker values to fulfill the order
     * @param taker address of the taker
     * @todo refactor makerData types after possible pending changes
     */
    public async participate(order: Order, takerValues: any[], taker: string): Promise<void> {
        await this.initializing;
        const makerArguments = await this.makerArguments(order.subContract);
        const takerArguments = await this.takerArguments(order.subContract);
        const makerValuesBytes = OrderSerializer.serializeMaker(makerArguments, order);
        const takerValuesBytes = OrderSerializer.serializeTaker(takerArguments, takerValues);

        const transaction = this._participateTransaction(
            order.subContract,
            order.id,
            makerValuesBytes,
            takerValuesBytes,
        );
        // let gas = await transaction.estimateGas({ from: taker });
        const gas = 4000000; // TODO: Gas cost is causing issues across many usages of this function.  This needs to be further investigated. Hard coding ot mitigate teh issue for now.
        return transaction.send({ from: taker, gas });
    }

    /**
     * @todo deprecate
     */
    public async participateEstimateGas(order: Order, takerValues: any[], taker: string): Promise<any> {
        await this.initializing;
        const makerArguments = await this.makerArguments(order.subContract);
        const takerArguments = await this.takerArguments(order.subContract);
        const makerValuesBytes = OrderSerializer.serializeMaker(makerArguments, order);
        const takerValuesBytes = OrderSerializer.serializeTaker(takerArguments, takerValues);

        const transaction = this._participateTransaction(
            order.subContract,
            order.id,
            makerValuesBytes,
            takerValuesBytes,
        );
        return transaction.estimateGas({ from: taker });
    }

    /**
     * Read maker arguments
     *
     * @param subContract Address of deployed contract implementation
     */
    public async makerArguments(subContract: string): Promise<any[]> {
        await this.initializing;
        return JSON.parse(await this.contract.methods.makerArguments(subContract).call());
    }

    /**
     * Read taker arguments
     *
     * @param subContract Address of deployed contract implementation
     */
    public async takerArguments(subContract: string): Promise<any[]> {
        await this.initializing;
        return JSON.parse(await this.contract.methods.takerArguments(subContract).call());
    }

    /**
     * Checks validity of order data
     *
     * @param order Kosu order to validate
     * @todo refactor makerData types after possible pending changes
     */
    public async isValid(order: Order): Promise<boolean> {
        await this.initializing;
        const makerArguments = await this.makerArguments(order.subContract);
        const makerValuesBytes = OrderSerializer.serializeMaker(makerArguments, order);

        return this.contract.methods.isValid(order.subContract, makerValuesBytes).call();
    }

    /**
     * Checks amount of partial exchange tokens remaining
     *
     * @param order Kosu order to validate
     * @todo refactor makerData types after possible pending changes
     */
    public async amountRemaining(order: Order): Promise<BN> {
        await this.initializing;
        const makerArguments = await this.makerArguments(order.subContract);
        const makerValuesBytes = OrderSerializer.serializeMaker(makerArguments, order);

        return this.contract.methods.amountRemaining(order.subContract, makerValuesBytes).call();
    }

    /**
     * React to one event
     *
     * @param callback Reaction callback to function
     * @param filter .
     * @todo check types or refactor
     */
    public oneEvent(callback: any, filter: any = {}): void {
        // @todo find correct type for this.Contract
        (this.contract as any).once("Participation", filter, callback);
    }

    /**
     * todo: typedef on return value
     *
     * @param subContract Address of deployed contract implementation
     * @param id Id value generated on orders submission through the Kosu order stream
     * @param makerData serialized maker data
     * @param takerData serialized taker data
     * @todo refactor makerData types after possible pending changes
     */
    // tslint:disable-next-line: typedef
    private _participateTransaction(subContract: string, id: string = "", makerData: string[], takerData: string[]) {
        return this.contract.methods.participate(subContract, id, makerData, takerData);
    }
}
