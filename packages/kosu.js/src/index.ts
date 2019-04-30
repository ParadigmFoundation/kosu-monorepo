import ValidatorRegistry from "./ValidatorRegistry";
import PosterRegistry from "./PosterRegistry";
import OrderGateway from "./OrderGateway";
import Signature from "./Signature";
import KosuToken from "./KosuToken";
import Treasury from "./Treasury";
import Voting from "./Voting";
import utils from "./utils";
import Web3 from "web3";
import {KosuOptions} from "./types";
import OrderHelper from "./OrderHelper";

const version = process.env.npm_package_version || require("../package.json").version;

class Kosu {
    public readonly web3: Web3;
    public readonly orderGateway: OrderGateway;
    public readonly orderHelper: OrderHelper;
    public readonly kosuToken: KosuToken;
    public readonly treasury: Treasury;
    public readonly voting: Voting;
    public readonly posterRegistry: PosterRegistry;
    public readonly validatorRegistry: ValidatorRegistry;
    public readonly utils: { toBytes32; NULL_ADDRESS };
    public readonly Signature: Signature;
    public readonly version: string;

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
        this.orderHelper = new OrderHelper(this.web3, this.orderGateway);

        //Utilities
        this.utils = utils;
        this.Signature = Signature;
        this.version = version;
    }
}

export default Kosu;
export { version };