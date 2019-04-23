import ValidatorRegistry from "./ValidatorRegistry";
import PosterRegistry from "./PosterRegistry";
import OrderStream from "./OrderStream";
import OrderGateway from "./OrderGateway";
import {version} from "../package.json";
import Signature from "./Signature";
import KosuToken from "./KosuToken";
import {KosuOptions} from "./types";
import Treasury from "./Treasury";
import Voting from "./Voting";
import Order from "./Order";
import utils from "./utils";
import * as Web3 from "web3";

class KosuConnect {
    private readonly web3: Web3;
    private readonly orderGateway: OrderGateway;
    private readonly kosuToken: KosuToken;
    private readonly treasury: Treasury;
    private voting: Voting;
    private posterRegistry: PosterRegistry;
    private validatorRegistry: ValidatorRegistry;
    public Order: any;
    private orderStream: OrderStream;
    private utils: { toBytes32; NULL_ADDRESS };
    private Signature: Signature;
    static version: string;
    public version: string;

    constructor(options: KosuOptions = { provider: 'https://ropsten.infura.io' }) {
        //Configuring web3
        this.web3 = new Web3(options.provider);
        options.web3 = this.web3;

        //Initializing contract objects
        this.orderGateway = new OrderGateway(options);
        this.kosuToken = new KosuToken(options);
        this.treasury = new Treasury(options, this.kosuToken);
        this.voting = new Voting(options, this.treasury);
        this.posterRegistry = new PosterRegistry(options, this.treasury);
        this.validatorRegistry = new ValidatorRegistry(options, this.treasury);

        //Bootstrapping Order object
        Order.web3 = this.web3;
        Order.orderGateway = this.orderGateway;
        this.Order = Order;

        //Configuring OrderStream
        let endpoint = options.orderStreamURL || 'bs2.paradigm.market';
        this.orderStream = new OrderStream(endpoint);

        //Utilities
        this.utils = utils;
        this.Signature = Signature;
        this.version = KosuConnect.version;
    }
}

KosuConnect.version = version;

export default KosuConnect;
// module.exports = KosuConnect;
