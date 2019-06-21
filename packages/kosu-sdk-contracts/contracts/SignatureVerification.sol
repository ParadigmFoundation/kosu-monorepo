pragma solidity ^0.5.0;

import "openzeppelin-solidity/contracts/cryptography/ECDSA.sol";
import "./BytesDecoder.sol";

/** @title SignatureVerification
*/
library SignatureVerification {
  using ECDSA for bytes32;
  using BytesDecoder for bytes;

  /** @dev Recovers the hash with the v, r and s.  And compares to the signer.
      @notice Recovers the hash with the v, r and s.  And compares to the signer.
      @param signer Signer address
      @param orderHash Hashed Kosu order
      @param signature The signature
      @return Validity of the signature boolean
  */
  function verifySignature(address signer, bytes32 orderHash, bytes memory signature) pure internal returns (bool) {
    return signer == orderHash.toEthSignedMessageHash().recover(signature);
  }

}
