const json2md = require("json2md");
const fs = require("fs");
const path = require("path");

const PATHS = {
    OrderGateway: "./contracts/external/OrderGateway.sol",
    AuthorizedAddresses: "./contracts/access_control/AuthorizedAddresses.sol",
    EventEmitter: "./contracts/event/EventEmitter.sol",
    KosuToken: "./contracts/lib/KosuToken.sol",
    Treasury: "./contracts/treasury/Treasury.sol",
    Voting: "./contracts/voting/Voting.sol",
    PosterRegistry: "./contracts/poster/PosterRegistry.sol",
    ValidatorRegistry: "./contracts/validator/ValidatorRegistry.sol",
    ZeroExV2SubContract: "./contracts/sub-contracts/ZeroExV2SubContract.sol",
};

(() => {
    const jsonOutput = [];

    jsonOutput.push({ h1: "Kosu System Contracts" });
    jsonOutput.push({
        p:
            "This repository contains the contract system that implements the Kosu protocol, in conjunction with `go-kosu`.",
    });
    jsonOutput.push({
        p:
            "These contracts support the inner workings of the Kosu network, including validator governance, poster access control, and general economic coordination.",
    });
    jsonOutput.push({ p: "These contracts are **under active development and may change extensively at any time**." });

    const contracts = [];
    for (const contractName of Object.keys(PATHS)) {
        contracts.push(`[${contractName}](./docs/${contractName}.md) ([source](${PATHS[contractName]}))`);
    }
    jsonOutput.push({ ul: contracts });

    fs.writeFileSync(path.resolve(".", "README.md"), json2md(jsonOutput));
})();
