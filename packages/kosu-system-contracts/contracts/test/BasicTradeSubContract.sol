pragma solidity ^0.5.0;

import "@kosu/subcontract-sdk/contracts/SubContract.sol";
import "@kosu/subcontract-sdk/contracts/BytesDecoder.sol";
import "@kosu/subcontract-sdk/contracts/SignatureVerification.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "openzeppelin-solidity/contracts/math/SafeMath.sol";


contract BasicTradeSubContract is SubContract {
    using BytesDecoder for bytes;
    using SafeMath for uint;

    mapping(bytes32 => uint) bought;
    string private _arguments;


    event OriginalBytes(bytes val);
    event SignatureBytes(bytes val);
    event AddressVal(address val);
    event UintVal(uint val);

    constructor(string memory args) public {
        _arguments = args;
    }

    function test(bytes memory test) public returns (bool){
        address signer = test.getAddress(0);
        address signerToken = test.getAddress(20);
        uint signerTokenCount = test.getUint(40);
        address buyerToken = test.getAddress(72);
        uint buyerTokenCount = test.getUint(92);
        bytes memory signature = test.getSignature(124);

        bytes32 hash = getOrderHash(test);

        return SignatureVerification.verifySignature(signer, hash, signature);
    }

    function arguments() external view returns (string memory) {
        return _arguments;
    }

    function isValid(bytes calldata data) external view returns (bool) {
        address signer = data.getAddress(0);
        address signerToken = data.getAddress(20);
        uint signerTokenCount = data.getUint(40);
        address buyerToken = data.getAddress(72);
        uint buyerTokenCount = data.getUint(92);
        bytes memory signature = data.getSignature(124);
        bytes32 hash = getOrderHash(data);

        return SignatureVerification.verifySignature(signer, hash, signature) && bought[hash] < signerTokenCount;
    }

    function amountRemaining(bytes calldata data) external view returns (uint) {
        address signer = data.getAddress(0);
        address signerToken = data.getAddress(20);
        uint signerTokenCount = data.getUint(40);
        address buyerToken = data.getAddress(72);
        uint buyerTokenCount = data.getUint(92);
        bytes memory signature = data.getSignature(124);
        bytes32 hash = getOrderHash(data);

        if (SignatureVerification.verifySignature(signer, hash, signature)) {
            return  signerTokenCount - bought[hash];
        } else {
            return 0;
        }

    }

    function participate(bytes calldata data) external returns (bool) {
        address signer = data.getAddress(0);
        address signerToken = data.getAddress(20);
        uint signerTokenCount = data.getUint(40);
        address buyerToken = data.getAddress(72);
        uint buyerTokenCount = data.getUint(92);
        bytes memory signature = data.getSignature(124);
        uint tokensToTake = data.getUint(189);

        bytes32 hash = getOrderHash(data);
//         1. Standard validation
        require(SignatureVerification.verifySignature(signer, hash, signature));
        require(bought[hash] + tokensToTake <= signerTokenCount);

        // transfer maker -> taker
        require(ERC20(signerToken).transferFrom(signer, tx.origin, tokensToTake));
        // transfer taker -> maker
        uint tokensTakerCount = ratioFor(buyerTokenCount, tokensToTake, signerTokenCount);
        require(ERC20(buyerToken).transferFrom(tx.origin, signer, tokensTakerCount));
        bought[hash] = bought[hash] + tokensTakerCount;

        return true;
    }

    function getOrderHash(bytes memory data) internal view returns (bytes32) {
        address signer = data.getAddress(0);
        address signerToken = data.getAddress(20);
        uint signerTokenCount = data.getUint(40);
        address buyerToken = data.getAddress(72);
        uint buyerTokenCount = data.getUint(92);
        return keccak256(abi.encodePacked(signer, signerToken, signerTokenCount, buyerToken, buyerTokenCount));
    }

    function ratioFor(uint value, uint numerator, uint denominator) internal pure returns (uint) {
        return value.mul(numerator).div(denominator);
    }
}