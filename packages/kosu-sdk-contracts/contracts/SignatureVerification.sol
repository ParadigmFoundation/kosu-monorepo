pragma solidity ^0.5.0;

import "openzeppelin-solidity/contracts/cryptography/ECDSA.sol";
import "./BytesDecoder.sol";

/** @title SignatureVerification
*/
library SignatureVerification {
  using ECDSA for bytes32;
  using BytesDecoder for bytes;

  /** @dev Select and convert signer address from maker submitted data by assuming it is the first entry
      @notice Select and convert signer address from maker submitted data by assuming it is the first entry
      @param data Kosu Order serialized based on arguments.
      @return Kosu Order signer address
  */
  function getSigner(bytes memory data) pure internal returns (address) {
    return data.getAddress(0);
  }

  /** @dev Default implementation that only hashes the signer. This method should be overridden.
      @notice Default implementation that only hashes the signer. This method should be overridden.
      @param data Kosu Order serialized based on arguments.
      @return Hashed order.
  */
  function getOrderHash(bytes memory data) pure internal returns (bytes32) {
    return keccak256(abi.encodePacked(getSigner(data)));
  }

  /** @dev Validates the signed order assuming the last three maker values are v, r and s.
      @notice Validates the signed order assuming the last three maker values are v, r and s.
      @param data Kosu Order serialized based on makerArguments.
      @return Validity of the signature boolean
  */
  function verify(bytes memory data) pure internal returns (bool) {
//    bytes memory signature = data.length - 65;
//
//    return checkSignature(getSigner(data), getOrderHash(data), v, r, s);
    return false;
  }

  /** @dev Recovers the hash with the v, r and s.  And compares to the signer.
      @notice Recovers the hash with the v, r and s.  And compares to the signer.
      @param signer Signer address
      @param orderHash Hashed Kosu order
      @param signature The signature
      @return Validity of the signature boolean
  */
  function checkSignature(address signer, bytes32 orderHash, bytes memory signature) pure internal returns (bool) {
    return signer == orderHash.toEthSignedMessageHash().recover(signature);
  }

}
