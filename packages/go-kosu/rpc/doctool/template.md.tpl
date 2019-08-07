# JSON RPC

Kosu expses a JSON-RPC 2.0 API based on the [go-ethereum/rpc](https://godoc.org/github.com/ethereum/go-ethereum/rpc) package.

JSON-RPC is a stateless, light-weight remote procedure call (RPC) protocol,
the protocol specification can be found [here](https://www.jsonrpc.org/specification)

### Usage

You can start the bridge with the following command:

```bash
kosud rpc
```

For more information use `kosud rpc --help`.

By default the HTTP and WS endpoints are binded to ports `14341` and `14342` repectively.
Note that the subscriptions operations are only available via WebSockets.

The current API exposes all of its methods under the `kosu` namespace
which means that the method call should be prefixed with `kosu_`.

#### Method call example

To perform a request calling the `foo` method we should:

```json
{ "jsonrpc": "2.0", "method": "kosu_foo", "params": [], "id": 1 }
```

For subscriptions, we use the `kosu_subscribe` method, and the event name is specified within the first param

#### Subscription example

To subscribe to the `newBlocks` events we should:

```json
{ "jsonrpc": "2.0", "method": "kosu_subscribe", "params": ["newBlocks"], "id": 1 }
```

# API

## Methods

{{- range .Types }}
{{ range .Entries }}
### _{{ .Method }}_

{{ .Text }}
{{- end -}}
{{- end -}}
