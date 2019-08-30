import { Kosu } from "@kosu/kosu.js";
import ws from "ws";

import { nodeQuery, safeSend } from "./utils";

/**
 * Main closure for handling client requests over WebSocket.
 *
 * @param socket the client connection instance
 * @param serverId the server-side ID used to identify the client
 * @param kosu instantiated kosu.js instance
 * @param kosuRpc socket connection to kosu node JSONRPC server
 */
export function requestHandlerClosure(socket: ws, serverId: string, kosu: Kosu): (m: ws.Data) => Promise<void> {
    return async (msg: ws.Data) => {
        let parsed: IWsRequest;
        const res: IWsResponse = { id: null, code: 1 };

        try {
            parsed = JSON.parse(msg.toString());
        } catch (err) {
            res.data = `bad request: failed to parse`;
            safeSend(socket, res);
            return;
        }

        const { id, method, param } = parsed;
        if (!id || !method || !param) {
            res.data = `missing required parameters`;
        } else if (!/(balance|limit)/.test(method)) {
            res.data = `invalid method: '${method}'`;
        } else if (!/^0x[a-fA-F0-9]{40}$/.test(param)) {
            res.data = `invalid poster address`;
        } else {
            let resp;
            if (method === "balance") {
                const raw = await kosu.kosuToken.balanceOf(param.toLowerCase());
                resp = raw.toString();
            } else if (method === "limit") {
                try {
                    const raw = await kosu.node.queryPoster(param);
                    resp = raw.limit.toString();
                } catch {
                    resp = "0";
                }
            }

            if (resp) {
                res.data = resp;
                res.code = 0;
                res.id = id;
            } else {
                res.data = "node reported failed query, might have no balance";
            }
        }

        safeSend(socket, res);
        console.log(`handled request from client '${serverId}' with code '${res.code}'`);
    };
}
