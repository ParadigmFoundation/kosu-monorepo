import { IClientMap } from "./connectionHandler";
import { safeSend } from "./utils";

/**
 * Handler closure for the Kosu 'newBlocks' subscription, which broadcasts the
 * latest chain data to all connected clients each time there is a new Kosu block
 * produced.
 *
 * @param clients mapping of serverId's to connected client socket instances
 */
export function blockHandlerClosure(clients: IClientMap): (msg: any) => void {
    return (msg: any) => {
        const parsed = JSON.parse(msg.toString());

        if (parsed.id) {
            console.log(`new subscription ID: '${parsed.id}'`);
            return;
        }

        const { result } = parsed.params;
        const { block } = result;

        const { height, time } = block.header;
        const date = new Date(time);
        const timestamp = Math.floor(date.getTime() / 1000);

        // update clients with new block data, and latest chain state
        let counter = 0;
        Object.keys(clients).forEach((serverId: string) => {
            const { client, id } = clients[serverId];
            const message = { id, data: { height, time: timestamp } };
            safeSend(client, message);
            counter++;
        });
        console.log(`finished sending updated network data to clients (${counter})`);
    };
}
