> ## [kosu.js](../README.md)

[Globals](../globals.md) / [OrderGateway](ordergateway.md) /

# Class: OrderGateway

Integration with OrderGateway contract on an Ethereum blockchain.

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

*Defined in [src/OrderGateway.ts:16](url)*

Create a new OrderGateway instance.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`options` | `KosuOptions` | instantiation options  |

**Returns:** *[OrderGateway](ordergateway.md)*

___

## Properties

### `Private` address

● **address**: *string*

*Defined in [src/OrderGateway.ts:15](url)*

___

### `Private` contract

● **contract**: *[OrderGatewayContract](ordergatewaycontract.md)*

*Defined in [src/OrderGateway.ts:16](url)*

___

### `Private` initializing

● **initializing**: *`Promise<void>`*

*Defined in [src/OrderGateway.ts:13](url)*

___

### `Private` web3

● **web3**: *`Web3`*

*Defined in [src/OrderGateway.ts:12](url)*

___

### `Private` web3Wrapper

● **web3Wrapper**: *`Web3Wrapper`*

*Defined in [src/OrderGateway.ts:14](url)*

___

## Methods

###  amountRemaining

▸ **amountRemaining**(`order`: `Order`): *`Promise<BigNumber>`*

*Defined in [src/OrderGateway.ts:98](url)*

Checks amount of partial exchange tokens remaining

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`order` | `Order` | Kosu order to validate  |

**Returns:** *`Promise<BigNumber>`*

___

###  arguments

▸ **arguments**(`subContract`: string): *`Promise<any>`*

*Defined in [src/OrderGateway.ts:75](url)*

Read maker arguments

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`subContract` | string | Address of deployed contract implementation  |

**Returns:** *`Promise<any>`*

___

### `Private` init

▸ **init**(`options`: `KosuOptions`): *`Promise<void>`*

*Defined in [src/OrderGateway.ts:36](url)*

Asyncronously initializes the instance after construction

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`options` | `KosuOptions` | instantiation options |

**Returns:** *`Promise<void>`*

A promise to await complete instantiation for further calls

___

###  isValid

▸ **isValid**(`order`: `Order`): *`Promise<boolean>`*

*Defined in [src/OrderGateway.ts:85](url)*

Checks validity of order data

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`order` | `Order` | Kosu order to validate  |

**Returns:** *`Promise<boolean>`*

___

###  participate

▸ **participate**(`order`: `Order`, `taker`: string): *`Promise<any>`*

*Defined in [src/OrderGateway.ts:59](url)*

Participate in the terms of an order

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`order` | `Order` | A Kosu order |
`taker` | string | address of the taker  |

**Returns:** *`Promise<any>`*

___