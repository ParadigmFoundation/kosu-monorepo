pragma solidity ^0.5.0;

/** @title SignatureVerification
*/
contract SignatureVerification {

  /** @dev Select and convert signer address from maker submitted data by assuming it is the first entry
      @notice Select and convert signer address from maker submitted data by assuming it is the first entry
      @param data Kosu Order serialized based on makerArguments.
      @return Kosu Order signer address
  */
  function getSigner(bytes32[] memory data) pure public returns (address) {
    return address(bytes20(data[0]));
  }

  /** @dev Default implementation that only hashes the signer. This method should be overridden.
      @notice Default implementation that only hashes the signer. This method should be overridden.
      @param data Kosu Order serialized based on makerArguments.
      @return Hashed order.
  */
  function getOrderHash(bytes32[] memory data) pure public returns (bytes32) {
    return keccak256(abi.encodePacked(getSigner(data)));
  }

  /** @dev Validates the signed order assuming the last three maker values are v, r and s.
      @notice Validates the signed order assuming the last three maker values are v, r and s.
      @param data Kosu Order serialized based on makerArguments.
      @return Validity of the signature boolean
  */
  function verify(bytes32[] memory data) pure public returns (bool) {
    uint8   v = uint8(bytes1(data[data.length - 3]));
    bytes32 r = data[data.length - 2];
    bytes32 s = data[data.length - 1];

    return checkSignature(getSigner(data), getOrderHash(data), v, r, s);
  }

  /** @dev Recovers the hash with the v, r and s.  And compares to the signer.
      @notice Recovers the hash with the v, r and s.  And compares to the signer.
      @param signer Signer address
      @param orderHash Hashed Kosu order
      @param v Signature v
      @param r Signature r
      @param s Signature s
      @return Validity of the signature boolean
  */
  function checkSignature(address signer, bytes32 orderHash, uint8 v, bytes32 r, bytes32 s) pure public returns (bool) {
    bytes32 hash = keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", orderHash));
    address recoveredAddress = ecrecover(hash, v, r, s);
    return signer == recoveredAddress;
  }

}
