pragma solidity ^0.5.0;

import "@kosu/subcontract-sdk/contracts/SubContract.sol";
import "@kosu/subcontract-sdk/contracts/BytesDecoder.sol";
import "@kosu/subcontract-sdk/contracts/SignatureVerification.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "openzeppelin-solidity/contracts/math/SafeMath.sol";


contract SignatureValidatorSubContract is SubContract {
    using BytesDecoder for bytes;
    string private _arguments = '{"maker":[{"datatype":"address","name":"testAddress"},{"datatype":"uint","name":"testUint"},{"datatype":"int","name":"testInt"},{"datatype":"bytes","name":"twoBytes"},{"datatype":"bytes","name":"fiveBytes"},{"datatype":"signature","name":"signature", "signatureFields": [0, 1, 2, 3, 4]}],"taker":[]}';

    function arguments() external view returns (string memory) {
        return _arguments;
    }

    function isValid(bytes calldata data) external view returns (bool) {
        address testAddress = data.getAddress(0);
        uint testUint = data.getUint(20);
        int testInt = data.getInt(52);
        bytes memory twoBytes = data.getBytes(84, 2);
        bytes memory fiveBytes = data.getBytes(86, 5);
        bytes memory signature = data.getSignature(91);
        bytes32 hash = getOrderHash(data);

        return SignatureVerification.verifySignature(tx.origin, hash, signature);
    }

    function amountRemaining(bytes calldata data) external view returns (uint) {
        return 0;
    }

    function participate(bytes calldata data) external returns (bool) {
        return true;
    }

    function getOrderHash(bytes memory data) internal view returns (bytes32) {
        address testAddress = data.getAddress(0);
        uint testUint = data.getUint(20);
        int testInt = data.getInt(52);
        bytes memory twoBytes = data.getBytes(84, 2);
        bytes memory fiveBytes = data.getBytes(86, 5);

        return keccak256(abi.encodePacked(testAddress, testUint, testInt, twoBytes, fiveBytes));
    }
}