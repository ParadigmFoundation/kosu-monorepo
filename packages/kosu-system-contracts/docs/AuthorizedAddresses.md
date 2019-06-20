# AuthorizedAddresses

Common registry of system contract addresses authrorized to access internal methods.

## Contents

-   [Methods](undefined)
    -   [authorizeAddress](#authorizeAddress)
    -   [constructor](#constructor)
    -   [isAddressAuthorized](#isAddressAuthorized)
    -   [isOwner](#isOwner)
    -   [owner](#owner)
    -   [renounceOwnership](#renounceOwnership)
    -   [transferOwnership](#transferOwnership)
    -   [unauthorizeAddress](#unauthorizeAddress)

## Methods

### authorizeAddress

Authorizes the address by setting the mapping value to true.

#### Signature

```solidity
function authorizeAddress(a address)
```

#### Parameters:

| Parameter | Type      | Description          |
| --------- | --------- | -------------------- |
| `a`       | `address` | Address to authorize |

### constructor

Constructor initializes with the creator permission set to true.

#### Signature

```solidity
constructor()
```

### isAddressAuthorized

Verify if address is authorized by reading contract mapping

#### Signature

```solidity
function isAddressAuthorized(a address)
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
function renounceOwnership()
```

### transferOwnership

Allows the current owner to transfer control of the contract to a newOwner.

#### Signature

```solidity
function transferOwnership(newOwner address)
```

#### Parameters:

| Parameter  | Type      | Description                           |
| ---------- | --------- | ------------------------------------- |
| `newOwner` | `address` | The address to transfer ownership to. |

### unauthorizeAddress

Unauthorizes the address by setting the mapping value to false.

#### Signature

```solidity
function unauthorizeAddress(a address)
```

#### Parameters:

| Parameter | Type      | Description            |
| --------- | --------- | ---------------------- |
| `a`       | `address` | Address to unauthorize |
