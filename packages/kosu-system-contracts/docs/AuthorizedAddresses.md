# AuthorizedAddresses

Common registry of system contract addresses authorized to access internal methods.

## Contents

-   [Methods](undefined)
    -   [authorizeAddress](#authorizeaddress)
    -   [isAddressAuthorized](#isaddressauthorized)
    -   [transferOwnership](#transferownership)
    -   [unauthorizeAddress](#unauthorizeaddress)

## Methods

### authorizeAddress

Authorizes the address by setting the mapping value to true.

#### Signature

```solidity
function authorizeAddress(a address) public
```

#### Parameters:

| Parameter | Type      | Description          |
| --------- | --------- | -------------------- |
| `a`       | `address` | Address to authorize |

### isAddressAuthorized

Verify address authorization.

#### Signature

```solidity
function isAddressAuthorized(a address) public view (bool)
```

#### Parameters:

| Parameter | Type      | Description           |
| --------- | --------- | --------------------- |
| `a`       | `address` | Address to authorize. |

#### Returns:

Address authorization

### transferOwnership

Allows the current owner to transfer control of the contract to a newOwner.

#### Signature

```solidity
function transferOwnership(newOwner address) public
```

#### Parameters:

| Parameter  | Type      | Description                           |
| ---------- | --------- | ------------------------------------- |
| `newOwner` | `address` | The address to transfer ownership to. |

### unauthorizeAddress

Disables the address previous authorization by setting the mapping value to false.

#### Signature

```solidity
function unauthorizeAddress(a address) public
```

#### Parameters:

| Parameter | Type      | Description            |
| --------- | --------- | ---------------------- |
| `a`       | `address` | Address to unauthorize |
