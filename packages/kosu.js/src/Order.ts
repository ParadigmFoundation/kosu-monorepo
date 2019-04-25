import { soliditySHA3 as solSHA3 } from "ethereumjs-abi";
import { bufferToHex } from "ethereumjs-util";
import { OrderGateway } from "./OrderGateway";
import { Signature } from "./Signature";
import { KosuOrder } from "./types";
import * as Web3 from 'web3';
import utils from "./utils";
import BN from "bn.js"

export class Order {
  private readonly subContract: string;
  private maker: string;
  private makerArguments: string | any[];
  private takerArguments: string | any[];
  private makerValues: any;
  private makerSignature: any;
  private posterSignature: any;
  private id: any;
  poster: string;
  static orderGateway: OrderGateway;
  static web3: Web3;

  constructor(options: KosuOrder) {
    if(!Order.web3.utils.isAddress(options.subContract)) throw new Error('subContract is not a valid address');

    this.subContract      = options.subContract;
    this.maker            = options.maker;
    this.makerArguments   = options.makerArguments;
    this.takerArguments   = options.takerArguments;
    this.makerValues      = options.makerValues;
    this.makerSignature   = options.makerSignature;
    this.posterSignature  = options.posterSignature;
    this.id               = options.id;
  }

  async make() {
    await this._checkArguments();

    let signature = await Signature.generate(Order.web3, this.makerHex(), this.maker);
    this.makerSignature = signature;

    this.makerValues.signatureV = signature.v;
    this.makerValues.signatureR = signature.r;
    this.makerValues.signatureS = signature.s;
  }

  async isValid() {
    await this._checkArguments();
    const makerValuesBytes = this._serialize(this.makerArguments, this.makerValues);
    return await Order.orderGateway.isValid(this.subContract, makerValuesBytes);
  }

  async amountRemaining(): Promise<BN> {
    await this._checkArguments();
    const makerValuesBytes = this._serialize(this.makerArguments, this.makerValues);
    return await Order.orderGateway.amountRemaining(this.subContract, makerValuesBytes);
  }

  async take(taker, takerValues) {
    await this._checkArguments();
    const makerValuesBytes = this._serialize(this.makerArguments, this.makerValues);
    const takerValuesBytes = this._serialize(this.takerArguments, takerValues);
    return await Order.orderGateway.participate(this.subContract, this.id, makerValuesBytes, takerValuesBytes, taker)
  }

  async prepareForPost(poster) {
    this.poster = poster || this.maker;
    this._clearArguments();
    await this._checkArguments();
    this.posterSignature = await Signature.generate(Order.web3, this.posterHex(), this.poster)
  }

  async estimateGasCost(taker, takerValues) {
    await this._checkArguments();
    const makerValuesBytes = this._serialize(this.makerArguments, this.makerValues);
    const takerValuesBytes = this._serialize(this.takerArguments, takerValues);
    return await Order.orderGateway.participateEstimateGas(this.subContract, this.id, makerValuesBytes, takerValuesBytes, taker)
  }

  recoverMaker() {
    return Signature.recoverAddress(this.makerHex(), this.makerSignature);
  }

  recoverPoster() {
    return Signature.recoverAddress(this.posterHex(), this.posterSignature);
  }

  toJSON() {
    return {
      subContract: this.subContract,
      maker: this.maker,
      makerArguments: this.makerArguments,
      takerArguments: this.takerArguments,
      makerValues: this.makerValues,
      makerSignature: this.makerSignature,
      posterSignature: this.posterSignature,
      id: this.id
    }
  }

  makerHex() {
    return this._hexFor('maker');
  }

  posterHex() {
    return this._hexFor('poster');
  }

  private _serialize(args, values) {
    return args.map(arg => utils.toBytes32( values[arg.name] ));
  }

  private _shouldInclude(argument) {
    return this.makerValues[argument.name] != undefined;
  }

  private static _toHex(dataTypes, values) {
    return bufferToHex(solSHA3(dataTypes, values));
  }

  private _hexFor(signer) {
    this._checkArguments();
    let dataTypes = [], values = [];
    typeof this.makerArguments !== "string" ? this.makerArguments.forEach((argument) => {
      if (signer == 'maker' && argument.name.includes('signature')) return;
      if (this._shouldInclude(argument)) {
        dataTypes.push(argument.dataType);
        values.push(this.makerValues[argument.name].toString());
      }
    }) : null;
    return Order._toHex(dataTypes, values);
  }

  private _clearArguments() {
    delete this.makerArguments;
    delete this.takerArguments;
  }

  private async _checkArguments() {
    /*
      Retrieves required arguments from subcontract
      if they are missing and parses JSON strings.
    */
    if(typeof this.makerArguments === 'undefined') this.makerArguments = await Order.orderGateway.makerArguments(this.subContract);
    if(typeof this.takerArguments === 'undefined') this.takerArguments = await Order.orderGateway.takerArguments(this.subContract);

    if(typeof this.makerArguments === 'string') this.makerArguments = JSON.parse(this.makerArguments);
    if(typeof this.takerArguments === 'string') this.takerArguments = JSON.parse(this.takerArguments);
  }

}
