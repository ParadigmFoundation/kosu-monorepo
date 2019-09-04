pragma solidity ^0.5.0;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "../base/Authorizable.sol";
import "./Formula.sol";

/** @title KosuToken
    @author Freydal
    @dev KosuToken (KOSU) is an implementation of the ERC-20 interface and supporting bonding curve for mints and burns.
*/
contract KosuToken is ERC20, Authorizable {

    string public name = "KOSU";
    string public symbol = "KOSU";
    uint8 public decimals = 18;
    uint private _weiPaid = 0;
    uint32 constant private r = 290000; // ppm

    /** @dev Initializes KosuToken with the authorizedAddresses shared permission contract to protect functions.
        @notice Initializes KosuToken with the authorizedAddresses shared permission contract to protect functions.
    */
    constructor(address _auth) Authorizable(_auth) public {
    }

    /** @dev Fallback payable function to allow the contract address to directly accept ether to be forwarded to the bonding function.
        @notice Fallback payable function to allow the contract address to directly accept ether to be forwarded to the bonding function.
    */
    function () external payable {
        bondTokens(0);
    }

    /** @dev Receives ether as a backing currency to be used against the bonding curve to mint tokens.
        @notice Receives ether as a backing currency to be used against the bonding curve to mint tokens.
        @param minPayout The minimum number of tokens to mint otherwise the transaction is reverted. This should prevent a front runner modifying the output.
    */
    function bondTokens(uint minPayout) payable public returns (uint) {
        if (msg.value == 0) return 0;

        uint tokensToMint = calculateEtherToToken(msg.value);

        require(tokensToMint >= minPayout, "payout below requested minimum");

        _weiPaid = _weiPaid.add(msg.value);
        _mint(msg.sender, tokensToMint);
        return tokensToMint;
    }

    /** @dev Burns the input tokens and releases the calculated amount of ether backing the tokens destroyed.
        @notice Burns the input tokens and releases the calculated amount of ether backing the tokens destroyed.
        @param tokensToBurn The number of the users tokens to burn.
    */
    function releaseTokens(uint tokensToBurn) public {
        if (tokensToBurn == 0) return;

        uint etherToRelease = calculateTokenToEther(tokensToBurn);

        _burn(msg.sender, tokensToBurn);
        msg.sender.transfer(etherToRelease);
        _weiPaid = _weiPaid.sub(etherToRelease);
    }

    /** @dev Estimates the number of tokens that would be minted with the input ether at the current ether and token balances.
        @notice Estimates the number of tokens that would be minted with the input ether at the current ether and token balances.
        @param input The amount of ether to contribute.
        @return Number of tokens that would be minted.
    */
    function estimateEtherToToken(uint input) public view returns (uint) {
        return calculateEtherToToken(input);
    }

    /** @dev Estimates the amount of ether to be released with the input number of tokens to burn.
        @notice Estimates the amount of ether to be released with the input number of tokens to burn.
        @param input The number of tokens to burn.
        @return Amount of ether to release.
    */
    function estimateTokenToEther(uint input) public view returns (uint) {
        return calculateTokenToEther(input);
    }

    /** @dev Voluntarily burn tokens.
        @notice Voluntarily burn tokens.
        @param amount Number of tokens to burn.
    */
    function burn(uint amount) public isAuthorized {
        _burn(msg.sender, amount);
    }

    /** @dev Authorized addresses (mostly contract systems) may manually mint new tokens to desired addresses.
        @notice Authorized addresses (mostly contract systems) may manually mint new tokens to desired addresses.
        @param _address Address to mint tokens to.
        @param amount Number of tokens to mint.
    */
    function mintTo(address _address, uint amount) public isAuthorized {
        _mint(_address, amount);
    }

    /** @dev Uses a modified BancorFormula to calculate the number of tokens to mint for input ether value.
    */
    function calculateEtherToToken(uint etherValue) internal view returns (uint) {
        if (_weiPaid == 0 && totalSupply() == 0) {
            require(etherValue == (2 ether)/10, "First transaction must be .2 ether");
            return 10000 ether;
        } else {
            return Formula.calculatePurchaseReturn(totalSupply(), _weiPaid, r, etherValue);
        }
    }

    /** @dev Uses a modified BancorFormula to calculate the amount of ether to release for input token value.
    */
    function calculateTokenToEther(uint numberOfTokens) internal view returns (uint) {
        return Formula.calculateSaleReturn(totalSupply(), _weiPaid, r, numberOfTokens);
    }
}
