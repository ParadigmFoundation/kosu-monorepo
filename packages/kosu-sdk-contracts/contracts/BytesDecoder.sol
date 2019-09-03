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

    function getInt(bytes memory this, uint index) internal pure returns (int i) {
        assembly {
            i := mload(add(add(this, index), 32))
        }
    }

    function getBytes(bytes memory this, uint start, uint length) internal pure returns (bytes memory) {
        bytes memory result = new bytes(length);
        for(uint i = start; i < length + start; i++) {
            result[i-start] = this[i];
        }
        return result;
    }

    function getSignature(bytes memory this, uint start) internal pure returns (bytes memory) {
        return getBytes(this, start, 65);
    }
}