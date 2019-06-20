pragma solidity ^0.5.0;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "../base/Authorizable.sol";

/** @title KosuToken
    @author Freydal
    @dev KosuToken (KOSU) is an implentation of the ERC-20 interface, supporting mints and burns.
*/
contract KosuToken is ERC20, Authorizable {

    string public name = "KOSU";
    string public symbol = "KOSU";
    uint8 public decimals = 18;

    /** @dev Deploy a new ERC20 Token
        @notice Deploy a new ERC20 Token
    */
    constructor(address _auth) Authorizable(_auth) public {
    }

    /** @dev Burn tokens
        @notice Burn tokens
        @param amount Number of tokens to destroy
    */
    function burn(uint amount) public isAuthorized {
        _burn(msg.sender, amount);
    }

    /** @dev Mint tokens
        @notice Mint tokens
        @param amount Number of tokens to create
    */
    function mint(uint amount) public isAuthorized {
        _mint(msg.sender, amount);
    }

    /** @dev Mint tokens to specified address
        @notice Mint tokens to specified address
        @param _address Address to receive tokens
        @param amount Number of tokens to create.
    */
    function mintTo(address _address, uint amount) public isAuthorized {
        _mint(_address, amount);
    }
}
