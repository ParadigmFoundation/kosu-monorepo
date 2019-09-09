import { NodeClient } from "@kosu/kosu.js";
import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import { AddressInfo } from "net";

import { DB } from "./db";
import { router } from "./routes";
import { genericErrorHandler, notFoundHandler, orderInsertionHandler } from "./utils";

const {
    KOSU_JSONRPC_URL = "ws://localhost:14342",

    PORT = "8000",

    MYSQL_HOST = "127.0.0.1",
    MYSQL_PORT = "3306",
    MYSQL_USER = "root",
    MYSQL_PASSWORD = "root",
    MYSQL_DATABASE = "order_db",
} = process.env;

// setup api server
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use("/", router);
app.use("/", notFoundHandler());
app.use(genericErrorHandler());

// setup kosu node and order db connection
const node = new NodeClient(KOSU_JSONRPC_URL);
const db = new DB({
    host: MYSQL_HOST,
    database: MYSQL_DATABASE,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD,
    port: parseInt(MYSQL_PORT),
});

// subscribe to new orders and insert into db
node.subscribeToOrders(orderInsertionHandler(db)).catch(err => {
    console.log("[%o] error in insertion handler: %s", new Date(), err);
});

export const server = app.listen(PORT, () => {
    const { address, port } = (server.address() as AddressInfo);
    console.log(`order-server started on: ${address}:${port}`);
});
