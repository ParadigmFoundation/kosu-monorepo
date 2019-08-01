> **[kosu.js](../README.md)**

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

## Index

### Constructors

* [constructor](ordergateway.md#constructor)

### Properties

* [address](ordergateway.md#private-address)
* [contract](ordergateway.md#private-contract)
* [initializing](ordergateway.md#private-initializing)
* [web3](ordergateway.md#private-web3)
* [web3Wrapper](ordergateway.md#private-web3wrapper)

### Methods

* [amountRemaining](ordergateway.md#amountremaining)
* [arguments](ordergateway.md#arguments)
* [init](ordergateway.md#private-init)
* [isValid](ordergateway.md#isvalid)
* [participate](ordergateway.md#participate)

## Constructors

###  constructor

\+ **new OrderGateway**(`options`: [KosuOptions](../interfaces/kosuoptions.md)): *[OrderGateway](ordergateway.md)*

*Defined in [OrderGateway.ts:46](https://github.com/ParadigmFoundation/kosu-monorepo/blob/5992fd1/packages/kosu.js/src/OrderGateway.ts#L46)*

Create a new OrderGateway instance.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`options` | [KosuOptions](../interfaces/kosuoptions.md) | Instantiation options (see `KosuOptions`).  |

**Returns:** *[OrderGateway](ordergateway.md)*

## Properties

### `Private` address

• **address**: *string*

*Defined in [OrderGateway.ts:40](https://github.com/ParadigmFoundation/kosu-monorepo/blob/5992fd1/packages/kosu.js/src/OrderGateway.ts#L40)*

The address of the deployed OrderGateway contract for the detected network.

___

### `Private` contract

• **contract**: *`OrderGatewayContract`*

*Defined in [OrderGateway.ts:46](https://github.com/ParadigmFoundation/kosu-monorepo/blob/5992fd1/packages/kosu.js/src/OrderGateway.ts#L46)*

An instance of the lower-level contract wrapper for the Kosu OrderGateway,
auto-generated from the Solidity source code.

___

### `Private` initializing

• **initializing**: *`Promise<void>`*

*Defined in [OrderGateway.ts:35](https://github.com/ParadigmFoundation/kosu-monorepo/blob/5992fd1/packages/kosu.js/src/OrderGateway.ts#L35)*

A promise that resolves when initialization has completed successfully.

___

### `Private` web3

• **web3**: *`Web3`*

*Defined in [OrderGateway.ts:24](https://github.com/ParadigmFoundation/kosu-monorepo/blob/5992fd1/packages/kosu.js/src/OrderGateway.ts#L24)*

An instance of `web3` used to interact with the Ethereum blockchain.

___

### `Private` web3Wrapper

• **web3Wrapper**: *`Web3Wrapper`*

*Defined in [OrderGateway.ts:30](https://github.com/ParadigmFoundation/kosu-monorepo/blob/5992fd1/packages/kosu.js/src/OrderGateway.ts#L30)*

An instance of a 0x `Web3Wrapper` used for some RPC calls and for certain
methods.

## Methods

###  amountRemaining

▸ **amountRemaining**(`order`: [Order](../interfaces/order.md)): *`Promise<BigNumber>`*

*Defined in [OrderGateway.ts:150](https://github.com/ParadigmFoundation/kosu-monorepo/blob/5992fd1/packages/kosu.js/src/OrderGateway.ts#L150)*

Checks amount of partial exchange tokens remaining, depending on the
implementation of the SubContract specified in the supplied order.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`order` | [Order](../interfaces/order.md) | The Kosu order to check amount remaining for. |

**Returns:** *`Promise<BigNumber>`*

A `BigNumber` representing the number returned by the SubContract's
implementation of the `amountRemaining` method.

___

###  arguments

▸ **arguments**(`subContract`: string): *`Promise<any>`*

*Defined in [OrderGateway.ts:117](https://github.com/ParadigmFoundation/kosu-monorepo/blob/5992fd1/packages/kosu.js/src/OrderGateway.ts#L117)*

Read the required arguments from a deployed SubContract.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`subContract` | string | Address of deployed contract implementation |

**Returns:** *`Promise<any>`*

The JSON array that defines the arguments for the SubContract.

___

### `Private` init

▸ **init**(`options`: [KosuOptions](../interfaces/kosuoptions.md)): *`Promise<void>`*

*Defined in [OrderGateway.ts:66](https://github.com/ParadigmFoundation/kosu-monorepo/blob/5992fd1/packages/kosu.js/src/OrderGateway.ts#L66)*

Asynchronously initializes the instance after construction.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`options` | [KosuOptions](../interfaces/kosuoptions.md) | Instantiation options (see `KosuOptions` type). |

**Returns:** *`Promise<void>`*

A promise to await complete instantiation for further calls

___

###  isValid

▸ **isValid**(`order`: [Order](../interfaces/order.md)): *`Promise<boolean>`*

*Defined in [OrderGateway.ts:134](https://github.com/ParadigmFoundation/kosu-monorepo/blob/5992fd1/packages/kosu.js/src/OrderGateway.ts#L134)*

Checks validity of order data according the order's SubContract implementation.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`order` | [Order](../interfaces/order.md) | Kosu order to validate against `isValid` implementation.  |

**Returns:** *`Promise<boolean>`*

___

###  participate

▸ **participate**(`order`: [Order](../interfaces/order.md), `taker`: string): *`Promise<any>`*

*Defined in [OrderGateway.ts:96](https://github.com/ParadigmFoundation/kosu-monorepo/blob/5992fd1/packages/kosu.js/src/OrderGateway.ts#L96)*

Participate in a trade as a taker (or on behalf of one), by submitting the
maker order, and the Ethereum address of the taker. The fill transaction
is passed to the deployed OrderGateway contract and to the underlying
SubContract settlement logic.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`order` | [Order](../interfaces/order.md) | A signed Kosu maker order object with a valid `subContract`. |
`taker` | string | The Ethereum address of the taker (should be available through provider). |

**Returns:** *`Promise<any>`*

The boolean value indicating the status of the trade; `true` if the interaction was successful.