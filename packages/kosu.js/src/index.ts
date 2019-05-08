import Web3 from "web3";

import { KosuToken } from "./KosuToken";
import { OrderGateway } from "./OrderGateway";
import { OrderHelper } from "./OrderHelper";
import { PosterRegistry } from "./PosterRegistry";
import { Signature } from "./Signature";
import { Treasury } from "./Treasury";
import { NULL_ADDRESS, toBytes32 } from "./utils";
import { ValidatorRegistry } from "./ValidatorRegistry";
import { Voting } from "./Voting";

// tslint:disable-next-line: no-var-requires
const version = process.env.npm_package_version || require("../package.json").version;

export class Kosu {
    public readonly web3: Web3;
    public readonly orderGateway: OrderGateway;
    public readonly orderHelper: OrderHelper;
    public readonly kosuToken: KosuToken;
    public readonly treasury: Treasury;
    public readonly voting: Voting;
    public readonly posterRegistry: PosterRegistry;
    public readonly validatorRegistry: ValidatorRegistry;
    public readonly utils: KosuUtils;
    public readonly Signature: Signature;
    public readonly version: string;

    constructor(options: KosuOptions = { provider: "https://ropsten.infura.io" }) {
        // Configuring web3
        this.web3 = new Web3(options.provider);
        options.web3 = this.web3;

        // Initializing contract objects
        this.orderGateway = new OrderGateway(options);
        this.kosuToken = new KosuToken(options);
        this.treasury = new Treasury(options, this.kosuToken);
        this.voting = new Voting(options, this.treasury);
        this.posterRegistry = new PosterRegistry(options, this.treasury);
        this.validatorRegistry = new ValidatorRegistry(options, this.treasury);
        this.orderHelper = new OrderHelper(this.web3, this.orderGateway);

        // Utilities
        this.utils = { toBytes32, NULL_ADDRESS };
        this.Signature = Signature;
        this.version = version;
    }
}

export {
    KosuToken,
    OrderGateway,
    OrderHelper,
    PosterRegistry,
    Signature,
    Treasury,
    ValidatorRegistry,
    Voting,
    toBytes32,
    NULL_ADDRESS,
};
