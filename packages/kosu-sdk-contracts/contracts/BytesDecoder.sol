pragma solidity ^0.5.0;

library BytesDecoder {
    function getAddress(bytes memory this, uint index) internal pure returns (address a) {
        assembly {
            a := mload(add(add(this, index), 20))
        }
    }

    function getUint(bytes memory this, uint index) internal pure returns (uint ui) {
        assembly {
            ui := mload(add(add(this, index), 32))
        }
    }
}