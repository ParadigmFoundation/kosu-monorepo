# Kosu SubContractSDK

This SDK is designed to provide a entry point for custom settlement logic for orders transmitted though the Kosu
Order Stream Network. The SubContract provides the standard methods that the Kosu system uses to encode input data
for submission to the Ethereum blockchain.

Implementation of custom settlement logic compatible with the Kosu platform will require the extension of the
SubContract to include the required functions to enable proper configuration of the standardized input for the
participation transaction.

## SubContract

### makerArguments

The maker arguments will be leveraged by [TODO-connect](https://github.com/ParadigmFoundation/TODO) to provide a translation from a human readable
Kosu order into SubContract participate bytes32 array input.

### takerArguments

The taker arguments will be leveraged by [TODO-connect](https://github.com/ParadigmFoundation/TODO) to define required arguments for the user
participating in the terms defined by the Kosu order and provide a translation of that input into the SubContract
bytes32 array input.

### participate

The participate function will be called to initiate the financial exchange transaction. The
contract creator is going to be responsible for transforming the input bytes32 more appropriate types based on the
maker and taker arguments they have defined. After a successful exchange a boolean true may be returned.

### isValid

The isValid function will be called to determine if an order is still valid. The function should
transform the input data then run validation to determine if the order still has available balances to exchange and is
signed correctly.

### amountRemaining

The amountRemaining function will be called to deterimine how many tokens are still available. The function should
take the maker information and use the internal accounting to look up how many of the offered tokens remain unclaimed.

##### Example implementations of popular settlement logic frameworks created by the Paradigm team are located [here](https://github.com/ParadigmFoundation/TODO).

## Creating a Kosu SubContract

### Installation

`npm i @kosu/subcontract-sdk`

### Usage

###### Import the SubContract

```solidity
import "@kosu/subcontract-sdk/contracts/SubContract.sol";
```

###### Extend SubContract

```solidity
contract YourContract is SubContract {

}
```

###### Implement the required methods

```solidity
//Optional, but the maker and taker arguments must be set before use.
constructor(_makerArguments, _takerArguments) {
  makerArguments = _makerArguments;
  takerArguments = _takerArguments;
}

function participate(bytes32[] makerData, bytes32[) takerData) public returns (bool) {
    //Your settlement implementation
    return true;
}

function isValid(bytes32[] makerData) public view returns (bool) {
    //Your validation implementation
    return false;
}

function amountRemaining(bytes32[] makerData) public view returns (uint) {
    //Your accounting implementation
    return 0;
}
```

##### Defining arguments

###### The arguments are a JSON string that is of the following structure:

Arguments are an ordered list where the array index in this json object correspond to the contracts bytes32 input index.

```
[
  {
    "dataType": "address", //The solidity data type the variable will be expected to
    "name":"maker" //The name of the key in the Kosu Connect input
  }, //index 0 of bytes32 input
  { "dataType": "uint", "name": "count" }, //index 1 of bytes32 input
  { "dataType": "address", "name": "taker" } //index 2 of bytes32 input
]
```

###### The arguments above would correspond to input in the following format

```
{
  "maker": "0x01234abc...",
  "count": "2000",
  "taker": "0x0321cba..."
}
```

###### Typecasting solidity function input

Assuming the example arguments were defined as the makerArguments. Usage of them in the solidity may look like:

```solidity
function participate(bytes32[] makerData, bytes32[) takerData) public returns (bool) {
    address maker = address(makerData[0]);
    uint count = uint(makerData[1]);
    address taker = address(makerData[2]);

    //Boolean values don't have a casting mechanism I'm aware of, but are represented as a 0
    //or 1 when cast to a uint.
    bool boolean = uint(takerData[0]) > 0

    return true;
}
```
