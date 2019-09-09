import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import { AddressInfo } from "net";

import { router } from "./routes";
import { genericErrorHandler, notFoundHandler } from "./utils";

const {
    PORT = "8000",
} = process.env;

const app = express();

app.use(bodyParser.json());
app.use(cors());

// impl.
app.use("/", router);

app.use("/", notFoundHandler());
app.use(genericErrorHandler());

export const server = app.listen(PORT, () => {
    const info = server.address();
    const { address, port } = (info as AddressInfo);
    console.log(`order-server started on: ${address}:${port}`);
});
