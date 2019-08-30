import { ChainData } from "./ChainData";
import { IClientMap } from "./connectionHandler";
import { safeSend } from "./utils";

/**
 * Handler closure for the Kosu 'newBlocks' subscription, which broadcasts the
 * latest chain data to all connected clients each time there is a new Kosu block
 * produced.
 *
 * @param clients mapping of serverId's to connected client socket instances
 */
export function blockHandlerClosure(clients: IClientMap, chain: ChainData): (msg: any) => Promise<void> {
    return async (block: any) => {
        const { height, time } = block.header;
        const date = new Date(time);
        const timestamp = Math.floor(date.getTime() / 1000);

        // store latest chain data
        await chain.updateBlockData(height, timestamp);

        // update clients with new block data, and latest chain state
        let counter = 0;
        const data = chain.getLatestData();
        Object.keys(clients).forEach((serverId: string) => {
            const { client, id } = clients[serverId];
            safeSend(client, { id, data });
            counter++;
        });
        console.log(`finished sending updated network data to clients (${counter})`);
    };
}
