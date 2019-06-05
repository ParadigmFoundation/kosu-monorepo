# `@kosu/web-helpers`

Quick and simple web tools for checking Kosu network status, and interacting with the current Kosu contract system (on Ropsten).

In the future, may be expanded for other network stats and utilities.

## Design

Opens a WebSocket connection to the ABCI server, where it subscribes to `NewBlock` events, and updates height accordingly in the HTML page.

_More coming soon._

## Develop

Run a local static server with build files:

```bash
# directly
$ ./scripts/dev.sh

# with yarn
yarn develop
```

## Deploy

Deploy client files to static site:

```bash
# directly
$ ./scripts/deploy.sh

# with yarn
yarn deploy
```

View live changes at [`https://status.orderstream.network/`](https://status.orderstream.network/)

## Notes

-   Currently only supports one node (height and order-counter only)
-   Plans to add other stats as well
