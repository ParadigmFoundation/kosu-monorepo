import Order from "./Order.js";

const WebSocket: any = require('isomorphic-ws');
const fetch: any = require('node-fetch');

class OrderStream {
  private readonly endpoint: string;

  constructor(endpoint) {
    this.endpoint = endpoint;
  }

  async add(order: Order) {
    if(order.recoverPoster().toLowerCase() === order.poster.toLowerCase()) {
      let url = `https://${this.endpoint}/post`;

      let response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(order),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      return await response.json();
    } else {
      throw new Error('The order is not signed for posting.')
    }
  }

  listen(callback) {
    let url = `wss://${this.endpoint}/stream`;
    let ws = new WebSocket(url);
    ws.onmessage = function incoming(data) {
      callback(data);
    }
  }



}

export default OrderStream;
