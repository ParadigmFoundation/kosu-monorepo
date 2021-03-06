const json2md = require("json2md");
const exec = require("child_process").exec;
const fs = require("fs");
const path = require("path");
const deployedAddresses = JSON.parse(
    fs.readFileSync(path.resolve("./src", "deployedAddresses.json"), { encoding: "utf8" }),
);

const NETWORKS = {
    "1": {
        name: "Mainnet",
        endpoint: "CHANGEME",
        etherscan: "https://etherscan.io/address/",
    },
    "3": {
        name: "Ropsten",
        endpoint: "https://ropsten.infura.io",
        etherscan: "https://ropsten.etherscan.io/address/",
    },
    "6174": {
        name: "Kosu Dev PoA",
        endpoint: "https://ethnet.zaidan.io/kosu",
    },
    "6175": {
        name: "Kosu CI Test",
        endpoint: "http://kosu-geth:8545",
    },
};

const PATHS = {
    OrderGateway: "../kosu-system-contracts/contracts/external/OrderGateway.sol",
    AuthorizedAddresses: "../kosu-system-contracts/contracts/access_control/AuthorizedAddresses.sol",
    EventEmitter: "../kosu-system-contracts/contracts/event/EventEmitter.sol",
    KosuToken: "../kosu-system-contracts/contracts/lib/KosuToken.sol",
    Treasury: "../kosu-system-contracts/contracts/treasury/Treasury.sol",
    Voting: "../kosu-system-contracts/contracts/voting/Voting.sol",
    PosterRegistry: "../kosu-system-contracts/contracts/poster/PosterRegistry.sol",
    ValidatorRegistry: "../kosu-system-contracts/contracts/validator/ValidatorRegistry.sol",
    ZeroExV2SubContract: "../kosu-system-contracts/contracts/sub-contracts/ZeroExV2SubContract.sol",
};

const printTableCorrectly = (jsonOutput, table) => {
    const parts = [];
    parts.push(`| ${table.headers.join(" | ")} |`);
    parts.push(`| ${table.headers.map(() => " -- |").join("")}`);
    for (row of table.rows) {
        parts.push(
            `| ${row.map(e => (typeof e.link == "object" ? `[${e.link.title}](${e.link.source})` : e)).join(" | ")} |`,
        );
    }
    jsonOutput.push(parts.join("\n"));
};

const getReadme = async () => {
    return new Promise((resolve, reject) => {
        exec("./bin/kosu-migrate.js --help", (err, stdout) => {
            if (err) {
                reject(err);
            } else {
                resolve(stdout);
            }
        });
    });
};

(async () => {
    const jsonOutput = [];

    jsonOutput.push({ h1: "Kosu Migrations" });
    jsonOutput.push({
        p: "This repository contains the migrations necessary to initialize the Kosu contract system.",
    });
    jsonOutput.push({ p: "These contracts are **under active development and may change extensively at any time**." });
    jsonOutput.push({ h2: "kosu-migrate cli utility" });
    jsonOutput.push({ p: "The `kosu-migrate` utility is included as a binary to the packages." });
    jsonOutput.push({
        code: {
            content: [await getReadme()],
        },
    });
    jsonOutput.push({ h2: "Deployed addresses" });
    jsonOutput.push({
        p:
            "Below are the deployed addresses for the core Kosu protocol contract system on the Ropsten test network, as well as an internal test network.",
    });

    for (key of Object.keys(deployedAddresses)) {
        const networkInfo = NETWORKS[key.toString()];
        jsonOutput.push({ h3: networkInfo.name });
        jsonOutput.push({
            ul: [`**Network ID:** ${key}`, `**ETHNET URL:** \`${networkInfo.endpoint}\``],
        });

        const contracts = deployedAddresses[key];
        const rows = [];

        for (contractName of Object.keys(contracts)) {
            const contract = contracts[contractName];
            const etherscan = networkInfo.etherscan;

            rows.push([
                { link: { title: contractName, source: PATHS[contractName] } },
                new Date(contract.timestamp * 1000).toLocaleDateString("en-US", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "2-digit",
                }),
                etherscan
                    ? { link: { title: contract.contractAddress, source: `${etherscan}${contract.contractAddress}` } }
                    : contract.contractAddress,
            ]);
        }

        printTableCorrectly(jsonOutput, {
            headers: ["Contract Name", "Last Deploy Date", "Deployed Address"],
            rows,
        });
        // jsonOutput.push({
        //     table: {
        //         headers: ["Contract Name", "Last Deploy Date", "Deployed Address"],
        //         rows,
        //     },
        // });
    }

    fs.writeFileSync(path.resolve(".", "README.md"), json2md(jsonOutput));
})();
