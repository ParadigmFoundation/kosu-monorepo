import * as Web3 from "web3";
import {KosuOptions} from "./types";
import {Contract} from "web3-eth-contract";
import BN = require("bn.js");

const OrderGatewayContractData = require('@kosu/system-contracts').contracts.OrderGateway;

class OrderGateway {
  private web3: Web3;
  private initializing: Promise<void>;
  private address: string;
  private contract: Contract;
  private Participation: any;

  constructor(options: KosuOptions) {
    this.web3 = options.web3;
    this.initializing = this.init(options);
  }

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

  async participate(subContract: string, id: string, makerData: any[], takerData: any[], taker: string): Promise<void> {
    const transaction = this._participateTransaction(subContract, id, makerData, takerData);
    // let gas = await transaction.estimateGas({ from: taker });
    let gas = 4000000; //TODO: Gas cost is causing issues across many usages of this function.  This needs to be further investigated. Hard coding ot mitigate teh issue for now.
    return await transaction.send({ from: taker, gas });
  }

  async participateEstimateGas(subContract: string, id: string, makerData: any[], takerData: any[], taker: any): Promise<any> {
    const transaction = this._participateTransaction(subContract, id, makerData, takerData);
    return await transaction.estimateGas({ from: taker })
  }

  async makerArguments(subContract: string): Promise<string> {
    return await this.contract.methods.makerArguments(subContract).call();
  }

  async takerArguments(subContract: string): Promise<string> {
    return await this.contract.methods.takerArguments(subContract).call();
  }

  async isValid(subContract: string, makerData: any[]): Promise<boolean> {
    return await this.contract.methods.isValid(subContract, makerData).call();
  }

  async amountRemaining(subContract: string, makerData: any[]): Promise<BN> {
    return await this.contract.methods.amountRemaining(subContract, makerData).call();
  }

  oneEvent(callback, filter = {}): void {
    this.contract.once('Participation', filter, callback);
  }

  _participateTransaction(subContract: string, id = '', makerData: any[], takerData: any[]) {
    return this.contract.methods.participate(subContract, id, makerData, takerData);
  }
}

export default OrderGateway;
