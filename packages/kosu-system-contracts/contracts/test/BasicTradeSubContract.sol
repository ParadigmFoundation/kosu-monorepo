pragma solidity ^0.5.0;

import "@kosu/subcontract-sdk/contracts/SubContract.sol";
import "@kosu/subcontract-sdk/contracts/BytesDecoder.sol";
import "@kosu/subcontract-sdk/contracts/SignatureVerification.sol";


contract BasicTradeSubContract is SubContract {
    using BytesDecoder for bytes;

    mapping(bytes32 => uint) bought;
    string private _arguments;


    event OriginalBytes(bytes val);
    event AddressVal(address val);
    event UintVal(uint val);

    constructor(string memory args) public {
        _arguments = args;
    }

    function test(bytes memory test) public {
        emit OriginalBytes(test);
        emit AddressVal(test.getAddress(0));
        emit AddressVal(test.getAddress(20));
        emit UintVal(test.getUint(40));
        emit AddressVal(test.getAddress(72));
        emit UintVal(test.getUint(92));
//        emit SignatureBytes(test.getBytes());
    }

    function arguments() external view returns (string memory) {
        return _arguments;
    }

    function isValid(bytes calldata data) external view returns (bool) {
        //TODO
        return false;
    }

    function amountRemaining(bytes calldata data) external view returns (uint) {
        //TODO
        return 0;
    }

    function participate(bytes calldata data) external returns (bool) {
//        // 1. Standard validation
//        require(verify(makerData));
//
//        // 2. Contract specific validation
//        uint signerTokenCount = uint(makerData[2]);
//        uint signerTokenCountToTake = uint(takerData[0]);
//        require(bought[getOrderHash(makerData)] + signerTokenCountToTake <= signerTokenCount);
//
//        // transfer maker -> taker
//        require(sendFromMaker(makerData, takerData));
//        // transfer taker -> maker
//        require(sendFromTaker(makerData, takerData));
//        bought[getOrderHash(makerData)] = bought[getOrderHash(makerData)] + signerTokenCountToTake;

        return true;
    }

//    function getOrderHash(bytes32[] makerData) returns (bytes32) {
//        address signerToken = address(makerData[1]);
//        uint signerTokenCount = uint(makerData[2]);
//        address buyerToken = address(makerData[3]);
//        uint buyerTokenCount = uint(makerData[4]);
//        return keccak256(getSigner(makerData), signerToken, signerTokenCount, buyerToken, buyerTokenCount);
//    }
//
//    function sendFromMaker(bytes32[] makerData, bytes32[] takerData) returns (bool) {
//        //        TODO: Shouldn't use tx.origin?
//        return Token(address(makerData[1])).transferFrom(address(makerData[0]), address(tx.origin), uint(takerData[0]));
//    }
//
//    function sendFromTaker(bytes32[] makerData, bytes32[] takerData) returns (bool) {
//        uint tokensTakerCount = ratioFor(uint(makerData[4]), uint(takerData[0]), uint(makerData[2]));
//
//
//        return Token(address(makerData[3])).transferFrom(address(tx.origin), address(makerData[0]), tokensTakerCount);
//    }
}