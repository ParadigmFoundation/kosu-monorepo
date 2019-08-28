import { Kosu } from "@kosu/kosu.js";
import Web3 from "web3";
import { Server } from "ws";

import { blockHandlerClosure } from "./blockHandler";
import { ChainData } from "./ChainData";
import { connectionHandlerClosure } from "./connectionHandler";
import { fields } from "./fieldDefinitions";
import { orderHandlerClosure } from "./orderHandler";

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
const kosu = new Kosu({ provider: web3.currentProvider, kosuNodeUrl: KOSU_JSONRPC_URL });
const server = new Server({
    port: parseInt(PORT),
    host: HOST || HOSTNAME,
});

// main chain data manager
const chain = new ChainData(kosu, KOSU_JSONRPC_URL, fields, 10000, 10, 20);

(async () => {
    const ordersSubId = await kosu.node.subscribeToOrders(orderHandlerClosure(chain));
    const blocksSubId = await kosu.node.subscribeToBlocks(blockHandlerClosure(clients, chain));

    server.on("connection", connectionHandlerClosure(clients, kosu));

    console.log(
        `started with:\n\t - orders subscription ID: ${ordersSubId}\n\t - blocks subscription ID: ${blocksSubId}`,
    );
})().catch((e: any) => console.log(e));
