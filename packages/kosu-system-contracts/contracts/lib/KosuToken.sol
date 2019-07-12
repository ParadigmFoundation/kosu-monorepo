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

    /** @dev Fallback payable method to allow contract to accept ether being sent directly to the address.
        @notice Fallback payable method to allow contract to accept ether being sent directly to the address.
    */
    function () external payable {
        bondTokens(0);
    }

    /** @dev Uses the ether paid to calculate and mint tokens.
        @notice Uses the ether paid to calculate and mint tokens.
        @param minPayout The minimum number of tokens to mint otherwise the transaction is reverted. This should prevent a front runner modifying the output.
    */
    function bondTokens(uint minPayout) payable public returns (uint) {
        if (msg.value == 0) return 0;

        uint tokensToMint = calculateEtherToToken(msg.value);

        require(tokensToMint >= minPayout);

        _weiPaid = _weiPaid.add(msg.value);
        _mint(msg.sender, tokensToMint);
        return tokensToMint;
    }

    /** @dev Burns the input amount of tokens returning the calculated amount of ether.
        @notice Burns the input amount of tokens returning the calculated amount of ether.
        @param tokensToBurn The number of tokens to burn
    */
    function releaseTokens(uint tokensToBurn) public {
        if (tokensToBurn == 0) return;

        uint etherToRelease = calculateTokenToEther(tokensToBurn);

        _burn(msg.sender, tokensToBurn);
        msg.sender.transfer(etherToRelease);
        _weiPaid = _weiPaid.sub(etherToRelease);
    }

    /** @dev Estimates the number of tokens to generate with the input ether at the current state.
        @notice Estimates the number of tokens to generate with the input ether at the current state.
        @param input The amount of ether to contribute
        @return Number of tokens that would be generated
    */
    function estimateEtherToToken(uint input) public view returns (uint) {
        return calculateEtherToToken(input);
    }

    /** @dev Estimates the amount of ether to return with the input number of tokens to burn.
        @notice Estimates the amount of ether to return with the input number of tokens to burn.
        @param input The number of tokens to burn
        @return Amount of ether to receive
    */
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

    /** @dev Uses a modified BancorFormula to calculate the number of tokens to generate input parameters.
    */
    function calculateEtherToToken(uint etherValue) internal view returns (uint) {
        if (_weiPaid == 0 && totalSupply() == 0) {
            return 30 ether;
        } else {
            return Formula.calculatePurchaseReturn(totalSupply(), _weiPaid, r, etherValue);
        }
    }

    /** @dev Uses a modified BancorFormula to calculate the amount of ether to release with input parameters.
    */
    function calculateTokenToEther(uint numberOfTokens) internal view returns (uint) {
        return Formula.calculateSaleReturn(totalSupply(), _weiPaid, r, numberOfTokens);
    }
}
