import ValidatorRegistry from "./ValidatorRegistry";
import PosterRegistry from "./PosterRegistry";
import OrderGateway from "./OrderGateway";
import Signature from "./Signature";
import KosuToken from "./KosuToken";
import {KosuOptions} from "./types";
import Treasury from "./Treasury";
import Voting from "./Voting";
import Order from "./Order";
import utils from "./utils";
import Web3 from "web3";

class Kosu {
    private readonly web3: Web3;
    private readonly orderGateway: OrderGateway;
    private readonly kosuToken: KosuToken;
    private readonly treasury: Treasury;
    private voting: Voting;
    private posterRegistry: PosterRegistry;
    private validatorRegistry: ValidatorRegistry;
    public Order: any;
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

        //Utilities
        this.utils = utils;
        this.Signature = Signature;
        this.version = Kosu.version;
    }
}

Kosu.version = process.env.npm_package_version || require("../package.json").version;

export default Kosu;
