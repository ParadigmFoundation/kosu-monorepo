# AuthorizedAddresses

Common registry of system contract addresses authrorized to access internal methods.

## Contents

-   [Methods](undefined)
    -   [authorizeAddress](#authorizeaddress)
    -   [constructor](#constructor)
    -   [isAddressAuthorized](#isaddressauthorized)
    -   [isOwner](#isowner)
    -   [owner](#owner)
    -   [renounceOwnership](#renounceownership)
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

### constructor

Constructor initializes with the creator permission set to true.

#### Signature

```solidity
undefined
```

### isAddressAuthorized

Verify if address is authorized by reading contract mapping

#### Signature

```solidity
function isAddressAuthorized(a address) public view (bool)
```

#### Parameters:

| Parameter | Type      | Description                      |
| --------- | --------- | -------------------------------- |
| `a`       | `address` | Address to get authorized value. |

#### Returns:

True if the address is authorized, false otherwise.

### renounceOwnership

Allows the current owner to relinquish control of the contract.

#### Signature

```solidity
function renounceOwnership() public
```

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

Unauthorizes the address by setting the mapping value to false.

#### Signature

```solidity
function unauthorizeAddress(a address) public
```

#### Parameters:

| Parameter | Type      | Description            |
| --------- | --------- | ---------------------- |
| `a`       | `address` | Address to unauthorize |
