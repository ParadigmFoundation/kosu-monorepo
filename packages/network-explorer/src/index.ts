import { Kosu } from "@kosu/kosu.js";
import uuid from "uuid/v4";
import Web3 from "web3";
import ws, { Server } from "ws";

import { blockHandlerClosure } from "./blockHandler";
import { ChainData } from "./ChainData";
import { connectionHandlerClosure } from "./connectionHandler";
import { fields } from "./fieldDefinitions";

const {
    HOST,
    HOSTNAME,
    PORT = "4242",

    ETHEREUM_JSONRPC_URL = "https://ropsten.infura.io",
    KOSU_JSONRPC_URL = "ws://localhost:14342",
} = process.env;

// caches serverId => (socket, clientId)
const clients: any = {};

const web3 = new Web3(ETHEREUM_JSONRPC_URL);
const kosu = new Kosu({ provider: web3.currentProvider });
const server = new Server({
    port: parseInt(PORT),
    host: HOST || HOSTNAME,
});

// main chain data manager
const chain = new ChainData(
    kosu,
    KOSU_JSONRPC_URL,
    fields,
    10000,
    10,
    20,
);

const kosuSub = new ws(KOSU_JSONRPC_URL);
const kosuRpc = new ws(KOSU_JSONRPC_URL);

kosuSub.on("message", blockHandlerClosure(clients, chain));
kosuSub.on("open", () => {
    kosuSub.send(JSON.stringify({
        jsonrpc: "2.0",
        id: uuid(),
        method: "kosu_subscribe",
        params: ["newBlocks"],
    }));
});
kosuSub.on("error", (err: any) => {
    const log = err && err.message ? err.message : err;
    console.error(`error in kosu node subscription connection: ${log}`);
});

kosuRpc.on("open", () => {
    console.log("connected to kosu node");
});

kosuRpc.on("error", (err: any) => {
    const log = err && err.message ? err.message : err;
    console.error(`error in kosu node RPC connection: ${log}`);
});

server.on("connection", connectionHandlerClosure(clients, kosu, kosuRpc, chain));
