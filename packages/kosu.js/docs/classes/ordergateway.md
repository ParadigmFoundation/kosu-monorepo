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

-   **OrderGateway**

## Index

### Constructors

-   [constructor](ordergateway.md#constructor)

### Methods

-   [amountRemaining](ordergateway.md#amountremaining)
-   [arguments](ordergateway.md#arguments)
-   [isValid](ordergateway.md#isvalid)
-   [participate](ordergateway.md#participate)

## Constructors

### constructor

\+ **new OrderGateway**(`options`: [KosuOptions](../interfaces/kosuoptions.md)): _[OrderGateway](ordergateway.md)_

_Defined in [OrderGateway.ts:46](https://github.com/ParadigmFoundation/kosu-monorepo/blob/4048650/packages/kosu.js/src/OrderGateway.ts#L46)_

Create a new OrderGateway instance.

**Parameters:**

| Name      | Type                                        | Description                                |
| --------- | ------------------------------------------- | ------------------------------------------ |
| `options` | [KosuOptions](../interfaces/kosuoptions.md) | Instantiation options (see `KosuOptions`). |

**Returns:** _[OrderGateway](ordergateway.md)_

## Methods

### amountRemaining

▸ **amountRemaining**(`order`: [Order](../interfaces/order.md)): _`Promise<BigNumber>`_

_Defined in [OrderGateway.ts:150](https://github.com/ParadigmFoundation/kosu-monorepo/blob/4048650/packages/kosu.js/src/OrderGateway.ts#L150)_

Checks amount of partial exchange tokens remaining, depending on the
implementation of the SubContract specified in the supplied order.

**Parameters:**

| Name    | Type                            | Description                                   |
| ------- | ------------------------------- | --------------------------------------------- |
| `order` | [Order](../interfaces/order.md) | The Kosu order to check amount remaining for. |

**Returns:** _`Promise<BigNumber>`_

A `BigNumber` representing the number returned by the SubContract's
implementation of the `amountRemaining` method.

---

### arguments

▸ **arguments**(`subContract`: string): _`Promise<any>`_

_Defined in [OrderGateway.ts:117](https://github.com/ParadigmFoundation/kosu-monorepo/blob/4048650/packages/kosu.js/src/OrderGateway.ts#L117)_

Read the required arguments from a deployed SubContract.

**Parameters:**

| Name          | Type   | Description                                 |
| ------------- | ------ | ------------------------------------------- |
| `subContract` | string | Address of deployed contract implementation |

**Returns:** _`Promise<any>`_

The JSON array that defines the arguments for the SubContract.

---

### isValid

▸ **isValid**(`order`: [Order](../interfaces/order.md)): _`Promise<boolean>`_

_Defined in [OrderGateway.ts:134](https://github.com/ParadigmFoundation/kosu-monorepo/blob/4048650/packages/kosu.js/src/OrderGateway.ts#L134)_

Checks validity of order data according the order's SubContract implementation.

**Parameters:**

| Name    | Type                            | Description                                              |
| ------- | ------------------------------- | -------------------------------------------------------- |
| `order` | [Order](../interfaces/order.md) | Kosu order to validate against `isValid` implementation. |

**Returns:** _`Promise<boolean>`_

---

### participate

▸ **participate**(`order`: [Order](../interfaces/order.md), `taker`: string): _`Promise<any>`_

_Defined in [OrderGateway.ts:96](https://github.com/ParadigmFoundation/kosu-monorepo/blob/4048650/packages/kosu.js/src/OrderGateway.ts#L96)_

Participate in a trade as a taker (or on behalf of one), by submitting the
maker order, and the Ethereum address of the taker. The fill transaction
is passed to the deployed OrderGateway contract and to the underlying
SubContract settlement logic.

**Parameters:**

| Name    | Type                            | Description                                                               |
| ------- | ------------------------------- | ------------------------------------------------------------------------- |
| `order` | [Order](../interfaces/order.md) | A signed Kosu maker order object with a valid `subContract`.              |
| `taker` | string                          | The Ethereum address of the taker (should be available through provider). |

**Returns:** _`Promise<any>`_

The boolean value indicating the status of the trade; `true` if the interaction was successful.
