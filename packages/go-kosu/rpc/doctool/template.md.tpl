# JSON RPC

Kosu exposes a JSON-RPC 2.0 API based on the [go-ethereum/rpc](https://godoc.org/github.com/ethereum/go-ethereum/rpc) package.

JSON-RPC is a stateless, light-weight remote procedure call (RPC) protocol,
the protocol specification can be found [here](https://www.jsonrpc.org/specification).

### Usage

You can start the bridge with the following command:

```bash
kosud rpc
```

For more information use `kosud rpc --help`.

By default the HTTP and WS endpoints are bound to ports `14341` and `14342` respectively.
Note that the subscriptions operations are only available via WebSockets.

The current API exposes all of its methods under the `kosu` namespace
which means that the method call should be prefixed with `kosu_`.

#### Method call example

To perform a request calling the `foo` method we should:

```json
{ "jsonrpc": "2.0", "method": "kosu_foo", "params": [], "id": 1 }
```

For subscriptions, we use the `kosu_subscribe` method, and the event name is specified within the first parameter.

#### Subscription example

To subscribe to the `newBlocks` events we should:

```json
{ "jsonrpc": "2.0", "method": "kosu_subscribe", "params": ["newBlocks"], "id": 1 }
```

# API

## Methods

{{- range .Types }}
{{ range .Methods}}
### _{{ .Method }}_

{{ .Text }}
{{- end -}}
{{- end }}
## Subscriptions

Subscriptions allow you to subscribe to a particular resource or _topic_.
In order to initiate a subscription you must call the `kosu_subscribe` method
and pass the topic as the first argument.

The response returns a subscription id followed by zero or more events

Subscriptions are deleted when the user sends an unsubscribe request or when the connection which was used to create the subscription is closed.

_Example_:

```json
// Create a subscription to `myTopic`
>> { "jsonrpc": "2.0", "method": "kosu_subscribe", "id": 42, "params": ["myTopic"]  }
<< { "jsonrpc": "2.0", "id":42, "result":"0xcd0c3e8af590364c09d0fa6a1210faf5" }

// Incoming events
<< {"jsonrpc":"2.0","method":"kosu_subscription","params":{"subscription":"0xcd0c3e8af590364c09d0fa6a1210faf5","result":{"event":"payload"}}}
<< {"jsonrpc":"2.0","method":"kosu_subscription","params":{"subscription":"0xcd0c3e8af590364c09d0fa6a1210faf5","result":{"more":"data"}}}

// Delete subscription
>> {"id": 42, "method": "kosu_unsubscribe", "params": ["0xcd0c3e8af590364c09d0fa6a1210faf5"]}
<< {"jsonrpc":"2.0","id":1,"result":true}
```

_note_: `<<` and `>>` are not part of the response, instead it denotes the flow of data.

{{- range .Types }}
{{ range .Subscriptions}}
### _{{ .Method }}_

{{ .Text }}
{{- end -}}
{{- end -}}
