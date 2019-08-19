import { Kosu } from "@kosu/kosu.js";
import uuid from "uuid/v4";
import Web3 from "web3";
import ws, { Server } from "ws";

import { blockHandlerClosure } from "./blockHandler";
import { ChainData } from "./ChainData";
import { connectionHandlerClosure } from "./connectionHandler";
import { fields } from "./fieldDefinitions";
import { orderHandlerClosure } from "./orderHandler";
import { nodeQuery, socketErrorHandlerClosure } from "./utils";

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

// open three sockets 1) subscribe to new blocks 2) rpc connection 3) new orders
const kosuSub = new ws(KOSU_JSONRPC_URL);
const kosuRpc = new ws(KOSU_JSONRPC_URL);
const kosuOrders = new ws(KOSU_JSONRPC_URL);

kosuOrders.on("error", socketErrorHandlerClosure("error in kosu node order subscription connection"));
kosuOrders.on("message", orderHandlerClosure(chain));
kosuOrders.on("open", async () => {
    const id = await nodeQuery(kosuOrders, "kosu_subscribe", ["newOrders"]);
    console.log(`subscribed to orders stream (${id})`);
});

kosuSub.on("error", socketErrorHandlerClosure("error in kosu node subscription connection"));
kosuSub.on("message", blockHandlerClosure(clients, chain));
kosuSub.on("open", async () => {
    const id = await nodeQuery(kosuSub, "kosu_subscribe", ["newBlocks"]);
    console.log(`subscribed to block stream (${id})`);
});

kosuSub.on("error", socketErrorHandlerClosure("error in kosu node RPC connection"));
server.on("connection", connectionHandlerClosure(clients, kosu, kosuRpc, chain));
kosuRpc.on("open", () => {
    console.log("connected to kosu node");
});
