pragma solidity ^0.5.0;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "../base/Authorizable.sol";
import "./Formula.sol";

/** @title KosuToken
    @author Freydal
    @dev KosuToken (KOSU) is an implentation of the ERC-20 interface and supporting bonding curve for mints and burns.
*/
contract KosuToken is ERC20, Authorizable {

    string public name = "KOSU";
    string public symbol = "KOSU";
    uint8 public decimals = 18;
    uint private _weiPaid = 0;
    uint32 constant private r = 850000; // ppm

    /** @dev Deploy a new ERC20 Token
        @notice Deploy a new ERC20 Token
    */
    constructor(address _auth) Authorizable(_auth) public {
    }

    /** @dev Default payable method to allow contract to accept ether being sent directly to the address.
        @notice Default payable method to allow contract to accept ether being sent directly to the address.
    */
    function () external payable {
        generateTokens(0);
    }

    function generateTokens(uint minPayout) payable public returns (uint) {
        if (msg.value == 0) return 0;

        uint tokensToMint = calculateEtherToToken(msg.value);

        require(tokensToMint >= minPayout);

        _weiPaid = _weiPaid.add(msg.value);
        _mint(msg.sender, tokensToMint);
        return tokensToMint;
    }

    function liquidateTokens(uint tokensToBurn) public {
        if (tokensToBurn == 0) return;

        uint etherToRelease = calculateTokenToEther(tokensToBurn);

        _burn(msg.sender, tokensToBurn);
        msg.sender.transfer(etherToRelease);
        _weiPaid = _weiPaid.sub(etherToRelease);
    }

    function estimateEtherToToken(uint input) public view returns (uint) {
        return calculateEtherToToken(input);
    }

    function estimateTokenToEther(uint input) public view returns (uint) {
        return calculateTokenToEther(input);
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

    function calculateEtherToToken(uint etherValue) internal view returns (uint) {
        if (_weiPaid == 0 && totalSupply() == 0) {
            require(msg.value == 1 ether);
            return 30 ether;
        } else {
            return Formula.calculatePurchaseReturn(totalSupply(), _weiPaid, r, etherValue);
        }
    }

    function calculateTokenToEther(uint numberOfTokens) internal view returns (uint) {
        return Formula.calculateSaleReturn(totalSupply(), _weiPaid, r, numberOfTokens);
    }
}
