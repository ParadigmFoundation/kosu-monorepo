import { BigNumber } from "@0x/utils";
import { artifacts, DeployedAddresses, OrderGatewayContract } from "@kosu/system-contracts";
import Web3 from "web3";

import { OrderSerializer } from "./OrderSerializer";

/**
 * Integration with OrderGateway contract on an Ethereum blockchain.
 *
 * @todo Refactor contract integration after migration away from truffle
 */
export class OrderGateway {
    private readonly web3: Web3;
    private readonly initializing: Promise<void>;
    private address: string;
    private contract: OrderGatewayContract;

    /**
     * Create a new OrderGateway instance.
     *
     * @param options instantiation options
     */
    constructor(options: KosuOptions) {
        this.web3 = options.web3;
        this.address = options.orderGatewayAddress;
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
        const abi = artifacts.OrderGateway.compilerOutput.abi;

        if (!this.address) {
            this.address = DeployedAddresses[networkId].OrderGateway;
        }
        if (!this.address) {
            throw new Error("Invalid network for OrderGateway");
        }

        this.contract = new OrderGatewayContract(abi, this.address, this.web3.currentProvider, {
            from: await this.web3.eth.getCoinbase(),
        });
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
        await this.contract.participate.sendTransactionAsync(
            order.subContract,
            order.id || 1,
            makerValuesBytes,
            takerValuesBytes,
            { from: taker },
        );
    }

    /**
     * @todo deprecate
     */
    public async participateEstimateGas(order: Order, takerValues: any[], taker: string): Promise<number> {
        await this.initializing;
        const makerArguments = await this.makerArguments(order.subContract);
        const takerArguments = await this.takerArguments(order.subContract);
        const makerValuesBytes = OrderSerializer.serializeMaker(makerArguments, order);
        const takerValuesBytes = OrderSerializer.serializeTaker(takerArguments, takerValues);

        return this.contract.participate.estimateGasAsync(
            order.subContract,
            order.id || 1,
            makerValuesBytes,
            takerValuesBytes,
            { from: taker },
        );
    }

    /**
     * Read maker arguments
     *
     * @param subContract Address of deployed contract implementation
     */
    public async makerArguments(subContract: string): Promise<any[]> {
        await this.initializing;
        return JSON.parse(await this.contract.makerArguments.callAsync(subContract));
    }

    /**
     * Read taker arguments
     *
     * @param subContract Address of deployed contract implementation
     */
    public async takerArguments(subContract: string): Promise<any[]> {
        await this.initializing;
        return JSON.parse(await this.contract.takerArguments.callAsync(subContract));
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

        return this.contract.isValid.callAsync(order.subContract, makerValuesBytes);
    }

    /**
     * Checks amount of partial exchange tokens remaining
     *
     * @param order Kosu order to validate
     * @todo refactor makerData types after possible pending changes
     */
    public async amountRemaining(order: Order): Promise<BigNumber> {
        await this.initializing;
        const makerArguments = await this.makerArguments(order.subContract);
        const makerValuesBytes = OrderSerializer.serializeMaker(makerArguments, order);

        return this.contract.amountRemaining.callAsync(order.subContract, makerValuesBytes);
    }
}
