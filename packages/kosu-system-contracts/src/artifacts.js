"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const AuthorizedAddresses = __importStar(require("../generated-artifacts/AuthorizedAddresses.json"));
const BasicTradeSubContract = __importStar(require("../generated-artifacts/BasicTradeSubContract.json"));
const EventEmitter = __importStar(require("../generated-artifacts/EventEmitter.json"));
const KosuToken = __importStar(require("../generated-artifacts/KosuToken.json"));
const OrderGateway = __importStar(require("../generated-artifacts/OrderGateway.json"));
const PosterRegistry = __importStar(require("../generated-artifacts/PosterRegistry.json"));
const PosterRegistryProxy = __importStar(require("../generated-artifacts/PosterRegistryProxy.json"));
const Treasury = __importStar(require("../generated-artifacts/Treasury.json"));
const ValidatorRegistry = __importStar(require("../generated-artifacts/ValidatorRegistry.json"));
const Voting = __importStar(require("../generated-artifacts/Voting.json"));
exports.artifacts = {
    AuthorizedAddresses: AuthorizedAddresses,
    EventEmitter: EventEmitter,
    OrderGateway: OrderGateway,
    PosterRegistryProxy: PosterRegistryProxy,
    KosuToken: KosuToken,
    PosterRegistry: PosterRegistry,
    Treasury: Treasury,
    ValidatorRegistry: ValidatorRegistry,
    Voting: Voting,
    BasicTradeSubContract: BasicTradeSubContract,
};
