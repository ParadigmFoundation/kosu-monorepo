> ## [kosu.js](../README.md)

[Globals](../globals.md) / [OrderGateway](ordergateway.md) /

# Class: OrderGateway

Integration with OrderGateway contract on an Ethereum blockchain.\

Instances of the `OrderGateway` class are able to communicate with the deployed
OrderGateway contract for the detected network. Can be used to participate in
trades (executing maker orders) or to call methods on deployed `SubContract`
implementations, such as checking the fillable amount remaining for an order,
or checking the validity of a maker order.

This class is also used to load the required `arguments` for maker order's
specified SubContract during serialization and signature generation.

## Hierarchy

* **OrderGateway**

### Index

#### Constructors

* [constructor](ordergateway.md#constructor)

#### Properties

* [address](ordergateway.md#private-address)
* [contract](ordergateway.md#private-contract)
* [initializing](ordergateway.md#private-initializing)
* [web3](ordergateway.md#private-web3)
* [web3Wrapper](ordergateway.md#private-web3wrapper)

#### Methods

* [amountRemaining](ordergateway.md#amountremaining)
* [arguments](ordergateway.md#arguments)
* [init](ordergateway.md#private-init)
* [isValid](ordergateway.md#isvalid)
* [participate](ordergateway.md#participate)

## Constructors

###  constructor

\+ **new OrderGateway**(`options`: `KosuOptions`): *[OrderGateway](ordergateway.md)*

*Defined in [src/OrderGateway.ts:46](url)*

Create a new OrderGateway instance.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`options` | `KosuOptions` | Instantiation options (see `KosuOptions`).  |

**Returns:** *[OrderGateway](ordergateway.md)*

___

## Properties

### `Private` address

● **address**: *string*

*Defined in [src/OrderGateway.ts:40](url)*

The address of the deployed OrderGateway contract for the detected network.

___

### `Private` contract

● **contract**: *[OrderGatewayContract](ordergatewaycontract.md)*

*Defined in [src/OrderGateway.ts:46](url)*

An instance of the lower-level contract wrapper for the Kosu OrderGateway,
auto-generated from the Solidity source code.

___

### `Private` initializing

● **initializing**: *`Promise<void>`*

*Defined in [src/OrderGateway.ts:35](url)*

A promise that resolves when initialization has completed successfully.

___

### `Private` web3

● **web3**: *`Web3`*

*Defined in [src/OrderGateway.ts:24](url)*

An instance of `web3` used to interact with the Ethereum blockchain.

___

### `Private` web3Wrapper

● **web3Wrapper**: *`Web3Wrapper`*

*Defined in [src/OrderGateway.ts:30](url)*

An instance of a 0x `Web3Wrapper` used for some RPC calls and for certain
methods.

___

## Methods

###  amountRemaining

▸ **amountRemaining**(`order`: `Order`): *`Promise<BigNumber>`*

*Defined in [src/OrderGateway.ts:146](url)*

Checks amount of partial exchange tokens remaining, depending on the
implementation of the SubContract specified in the supplied order.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`order` | `Order` | The Kosu order to check amount remaining for. |

**Returns:** *`Promise<BigNumber>`*

A `BigNumber` representing the number returned by the SubContract's
implementation of the `amountRemaining` method.

___

###  arguments

▸ **arguments**(`subContract`: string): *`Promise<any>`*

*Defined in [src/OrderGateway.ts:114](url)*

Read the required arguments from a deployed SubContract.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`subContract` | string | Address of deployed contract implementation |

**Returns:** *`Promise<any>`*

The JSON array that defines the arguments for the SubContract.

___

### `Private` init

▸ **init**(`options`: `KosuOptions`): *`Promise<void>`*

*Defined in [src/OrderGateway.ts:66](url)*

Asynchronously initializes the instance after construction.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`options` | `KosuOptions` | Instantiation options (see `KosuOptions` type). |

**Returns:** *`Promise<void>`*

A promise to await complete instantiation for further calls

___

###  isValid

▸ **isValid**(`order`: `Order`): *`Promise<boolean>`*

*Defined in [src/OrderGateway.ts:130](url)*

Checks validity of order data according the order's SubContract implementation.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`order` | `Order` | Kosu order to validate against `isValid` implementation.  |

**Returns:** *`Promise<boolean>`*

___

###  participate

▸ **participate**(`order`: `Order`, `taker`: string): *`Promise<any>`*

*Defined in [src/OrderGateway.ts:93](url)*

Participate in a trade as a taker (or on behalf of one), by submitting the
maker order, and the Ethereum address of the taker. The fill transaction
is passed to the deployed OrderGateway contract and to the underlying
SubContract settlement logic.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`order` | `Order` | A signed Kosu maker order object with a valid `subContract`. |
`taker` | string | The Ethereum address of the taker (should be available through provider). |

**Returns:** *`Promise<any>`*

The boolean value indicating the status of the trade; `true` if the interaction was successful.

___