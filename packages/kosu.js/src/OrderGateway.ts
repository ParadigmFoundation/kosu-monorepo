import Web3 from "web3";
import {KosuOptions, Order} from "./types";
import {Contract} from "web3-eth-contract";
import BN = require("bn.js");
import OrderSerializer from "./OrderSerializer";

const OrderGatewayContractData = require('@kosu/system-contracts').contracts.OrderGateway;

/**
 * Integration with OrderGateway contract on an Ethereum blockchain.
 *
 * @todo Refactor contract integration after migration away from truffle
 */
class OrderGateway {
  private web3: Web3;
  private initializing: Promise<void>;
  private address: string;
  private contract: Contract;
  private Participation: any;

  /**
   * Create a new OrderGateway instance.
   *
   * @param options {KosuOptions} instantiation options
   */
  constructor(options: KosuOptions) {
    this.web3 = options.web3;
    this.initializing = this.init(options);
  }

  /**
   * Asyncronously initializes the instance after construction
   *
   * @param options {KosuOptions} instantiation options
   * @returns A promise to await complete instantiation for further calls
   */
  async init(options: KosuOptions): Promise<void> {
    const networkId = options.networkId || await options.web3.eth.net.getId();
    if (options.orderGatewayAddress) {
      this.address = options.orderGatewayAddress;
      this.contract = new this.web3.eth.Contract(OrderGatewayContractData.abi, this.address);
    } else if (OrderGatewayContractData.networks[networkId]) {
      this.address = OrderGatewayContractData.networks[networkId].address;
      this.contract = new this.web3.eth.Contract(OrderGatewayContractData.abi, this.address);
    } else {
      throw new Error('Invalid network for OrderGateway')
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
  async participate(order: Order, takerValues: any[], taker: string): Promise<void> {
    const makerArguments = await this.makerArguments(order.subContract);
    const takerArguments = await this.takerArguments(order.subContract);
    const makerValuesBytes = OrderSerializer.serializeMaker(makerArguments, order);
    const takerValuesBytes = OrderSerializer.serializeTaker(takerArguments, takerValues);

    const transaction = this._participateTransaction(order.subContract, order.id, makerValuesBytes, takerValuesBytes);
    // let gas = await transaction.estimateGas({ from: taker });
    let gas = 4000000; //TODO: Gas cost is causing issues across many usages of this function.  This needs to be further investigated. Hard coding ot mitigate teh issue for now.
    return await transaction.send({ from: taker, gas });
  }

  /**
   * @todo depricate
   */
  async participateEstimateGas(order: Order, takerValues: any[], taker: string): Promise<any> {
    const makerArguments = await this.makerArguments(order.subContract);
    const takerArguments = await this.takerArguments(order.subContract);
    const makerValuesBytes = OrderSerializer.serializeMaker(makerArguments, order);
    const takerValuesBytes = OrderSerializer.serializeTaker(takerArguments, takerValues);

    const transaction = this._participateTransaction(order.subContract, order.id, makerValuesBytes, takerValuesBytes);
    return await transaction.estimateGas({ from: taker })
  }

  /**
   * Read maker arguments
   *
   * @param subContract Address of deployed contract implementation
   */
  async makerArguments(subContract: string): Promise<any[]> {
    return JSON.parse(await this.contract.methods.makerArguments(subContract).call());
  }

  /**
   * Read taker arguments
   *
   * @param subContract Address of deployed contract implementation
   */
  async takerArguments(subContract: string): Promise<any[]> {
    return JSON.parse(await this.contract.methods.takerArguments(subContract).call());
  }

  /**
   * Checks validity of order data
   *
   * @param order Kosu order to validate
   * @todo refactor makerData types after possible pending changes
   */
  async isValid(order: Order): Promise<boolean> {
    const makerArguments = await this.makerArguments(order.subContract);
    const makerValuesBytes = OrderSerializer.serializeMaker(makerArguments, order);

    return await this.contract.methods.isValid(order.subContract, makerValuesBytes).call();
  }

  /**
   * Checks amount of partial exchange tokens remaining
   *
   * @param order Kosu order to validate
   * @todo refactor makerData types after possible pending changes
   */
  async amountRemaining(order: Order): Promise<BN> {
    const makerArguments = await this.makerArguments(order.subContract);
    const makerValuesBytes = OrderSerializer.serializeMaker(makerArguments, order);

    return await this.contract.methods.amountRemaining(order.subContract, makerValuesBytes).call();
  }

  /**
   * React to one event
   *
   * @param callback Reaction callback to function
   * @param filter
   * @todo check types or refactor
   */
  oneEvent(callback: any, filter: any = {}): void {
    this.contract.once('Participation', filter, callback);
  }

  /**
   *
   * @param subContract Address of deployed contract implementation
   * @param id Id value generated on orders submission through the Kosu order stream
   * @param makerData serialized maker data
   * @param takerData serialized taker data
   * @todo refactor makerData types after possible pending changes
   */
  private _participateTransaction(subContract: string, id: string = '', makerData: string[], takerData: string[]) {
    return this.contract.methods.participate(subContract, id, makerData, takerData);
  }
}

export default OrderGateway;
