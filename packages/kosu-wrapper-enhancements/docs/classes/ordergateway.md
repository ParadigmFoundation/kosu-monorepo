[wrapper-enhancements](../README.md) › [Globals](../globals.md) › [OrderGateway](ordergateway.md)

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

* [address](ordergateway.md#address)
* [contract](ordergateway.md#contract)
* [initializing](ordergateway.md#initializing)
* [web3Wrapper](ordergateway.md#web3wrapper)

### Methods

* [amountRemaining](ordergateway.md#amountremaining)
* [arguments](ordergateway.md#arguments)
* [isValid](ordergateway.md#isvalid)
* [participate](ordergateway.md#participate)

## Constructors

###  constructor

\+ **new OrderGateway**(`options`: KosuOptions): *[OrderGateway](ordergateway.md)*

*Defined in [OrderGateway.ts:40](https://github.com/ParadigmFoundation/kosu-monorepo/blob/821f0d85/packages/kosu-wrapper-enhancements/src/OrderGateway.ts#L40)*

Create a new OrderGateway instance.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`options` | KosuOptions | Instantiation options (see `KosuOptions`).  |

**Returns:** *[OrderGateway](ordergateway.md)*

## Properties

###  address

• **address**: *string*

*Defined in [OrderGateway.ts:34](https://github.com/ParadigmFoundation/kosu-monorepo/blob/821f0d85/packages/kosu-wrapper-enhancements/src/OrderGateway.ts#L34)*

The address of the deployed OrderGateway contract for the detected network.

___

###  contract

• **contract**: *OrderGatewayContract*

*Defined in [OrderGateway.ts:40](https://github.com/ParadigmFoundation/kosu-monorepo/blob/821f0d85/packages/kosu-wrapper-enhancements/src/OrderGateway.ts#L40)*

An instance of the lower-level contract wrapper for the Kosu OrderGateway,
auto-generated from the Solidity source code.

___

###  initializing

• **initializing**: *Promise‹void›*

*Defined in [OrderGateway.ts:29](https://github.com/ParadigmFoundation/kosu-monorepo/blob/821f0d85/packages/kosu-wrapper-enhancements/src/OrderGateway.ts#L29)*

A promise that resolves when initialization has completed successfully.

___

###  web3Wrapper

• **web3Wrapper**: *Web3Wrapper*

*Defined in [OrderGateway.ts:24](https://github.com/ParadigmFoundation/kosu-monorepo/blob/821f0d85/packages/kosu-wrapper-enhancements/src/OrderGateway.ts#L24)*

An instance of a 0x `Web3Wrapper` used for some RPC calls and for certain
methods.

## Methods

###  amountRemaining

▸ **amountRemaining**(`subContract`: string, `bytes`: string): *Promise‹BigNumber›*

*Defined in [OrderGateway.ts:135](https://github.com/ParadigmFoundation/kosu-monorepo/blob/821f0d85/packages/kosu-wrapper-enhancements/src/OrderGateway.ts#L135)*

Checks amount of partial exchange tokens remaining, depending on the
implementation of the SubContract specified in the supplied order.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`subContract` | string | The subContract address; |
`bytes` | string | The Kosu order serialized into subContract specific bytes. |

**Returns:** *Promise‹BigNumber›*

A `BigNumber` representing the number returned by the SubContract's
implementation of the `amountRemaining` method.

___

###  arguments

▸ **arguments**(`subContract`: string): *Promise‹any›*

*Defined in [OrderGateway.ts:102](https://github.com/ParadigmFoundation/kosu-monorepo/blob/821f0d85/packages/kosu-wrapper-enhancements/src/OrderGateway.ts#L102)*

Read the required arguments from a deployed SubContract.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`subContract` | string | Address of deployed contract implementation |

**Returns:** *Promise‹any›*

The JSON array that defines the arguments for the SubContract.

___

###  isValid

▸ **isValid**(`subContract`: string, `bytes`: string): *Promise‹boolean›*

*Defined in [OrderGateway.ts:120](https://github.com/ParadigmFoundation/kosu-monorepo/blob/821f0d85/packages/kosu-wrapper-enhancements/src/OrderGateway.ts#L120)*

Checks validity of order data according the order's SubContract implementation.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`subContract` | string | The subContract address; |
`bytes` | string | The Kosu order serialized into subContract specific bytes.  |

**Returns:** *Promise‹boolean›*

___

###  participate

▸ **participate**(`subContract`: string, `bytes`: string, `taker`: string): *Promise‹any›*

*Defined in [OrderGateway.ts:86](https://github.com/ParadigmFoundation/kosu-monorepo/blob/821f0d85/packages/kosu-wrapper-enhancements/src/OrderGateway.ts#L86)*

Participate in a trade as a taker (or on behalf of one), by submitting the
maker order, and the Ethereum address of the taker. The fill transaction
is passed to the deployed OrderGateway contract and to the underlying
SubContract settlement logic.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`subContract` | string | The subContract address; |
`bytes` | string | The Kosu order serialized into subContract specific bytes. |
`taker` | string | The Ethereum address of the taker (should be available through provider). |

**Returns:** *Promise‹any›*

The boolean value indicating the status of the trade; `true` if the interaction was successful.
