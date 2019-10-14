pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

import "@kosu/subcontract-sdk/contracts/SubContract.sol";
import "@kosu/subcontract-sdk/contracts/BytesDecoder.sol";
import "openzeppelin-solidity/contracts/token/ERC20/IERC20.sol";
import { SafeMath as ZepSafeMath } from "openzeppelin-solidity/contracts/math/SafeMath.sol";
import "@0x/contracts-exchange/contracts/src/interfaces/IExchange.sol";
import "@0x/contracts-exchange-libs/contracts/src/LibOrder.sol";

/** @title ZeroExV2SubContract
    @author Freydal
    @dev Implementation of a SubContract that forwards kosu orders with 0x resolution to the 0x exchange contract.
*/
contract ZeroExV2SubContract is SubContract {
    using BytesDecoder for bytes;
    using ZepSafeMath for uint;

    IExchange private _exchange;
    address private _proxy;
    string private _arguments;
    bytes4 private ERC20bytes = bytes4(keccak256("ERC20Token(address)"));

    /** @dev Initialize subContract with arguments json 0x Exchange address and the 0x erc20 proxy address.
        @notice Initialize subContract with arguments json 0x Exchange address and the 0x erc20 proxy address.
        @param args The arguments json string.
        @param exchangeAddress The 0x deployed exchange address.
        @param proxyAddress The 0x deployed erc20 proxy address.
    */
    constructor(string memory args, address exchangeAddress, address proxyAddress) public {
        _arguments = args;
        _exchange = IExchange(exchangeAddress);
        _proxy = proxyAddress;
    }

    /** @dev The arguments used to serialize kosu orders into values to generate the 0x exchange transaction.
        @notice The arguments used to serialize kosu orders into values to generate the 0x exchange transaction.
        @return String encoded JSON object used to encode contract input.
    */
    function arguments() external view returns (string memory) {
        return _arguments;
    }

    /** @dev De-serializes kosu order data to 0x order and checks validity.
        @notice De-serializes kosu order data to 0x order and checks validity.
        @param data Kosu order data serialized with arguments.
        @return Validity of order.
    */
    function isValid(bytes calldata data) external view returns (bool) {
        LibOrder.Order memory order = _getOrder(data);
        LibOrder.OrderInfo memory info = _exchange.getOrderInfo(order);
        return info.orderStatus == uint8(LibOrder.OrderStatus.FILLABLE);
    }

    /** @dev De-serializes kosu order data to 0x order and checks remaining fillable tokens.
        @notice De-serializes kosu order data to 0x order and checks remaining fillable tokens.
        @param data Kosu order data serialized with arguments.
        @return Tokens remaining to fill.
    */
    function amountRemaining(bytes calldata data) external view returns (uint) {
        LibOrder.Order memory order = _getOrder(data);
        LibOrder.OrderInfo memory info = _exchange.getOrderInfo(order);
        return order.takerAssetAmount - info.orderTakerAssetFilledAmount;
    }

    /** @dev De-serializes ksou order data to 0x order and submits to the 0x exchange for final resolution. Finalizes by forwarding along any successfully exchanged tokens.
        @notice De-serializes ksou order data to 0x order and submits to the 0x exchange for final resolution. Finalizes by forwarding along any successfully exchanged tokens.
        @param data Kosu order data serialized with arguments.
        @return Fill success.
    */
    function participate(bytes calldata data) external returns (bool) {
        LibOrder.Order memory order = _getOrder(data);
        address taker = data.getAddress(410);
        uint takeAmount = data.getUint(430);

        require(taker == tx.origin, "The taker should send the transaction");

        // TODO May want to use a different method since 0x started doing something different for gas reasons.
        require(_getTokenAssetCode(order.makerAssetData.getBytes(0, 4)) == ERC20bytes, "Maker token asset isn't ERC20");
        require(_getTokenAssetCode(order.takerAssetData.getBytes(0, 4)) == ERC20bytes, "Taker token asset isn't ERC20");

        IERC20 makerToken = IERC20(order.makerAssetData.getAddress(16));
        IERC20 takerToken = IERC20(order.takerAssetData.getAddress(16));

        takerToken.transferFrom(taker, address(this), takeAmount);
        takerToken.approve(_proxy, takeAmount);

        LibFillResults.FillResults memory fillResult = _exchange.fillOrder(order, takeAmount, _getSignature(data));

        if (fillResult.makerAssetFilledAmount > 0) {
            require(makerToken.transfer(taker, fillResult.makerAssetFilledAmount), "Didn't successfully forward exchanged tokens. Reverting.");
        }

        if (fillResult.takerAssetFilledAmount < takeAmount) {
            require(takerToken.transfer(taker, takeAmount.sub(fillResult.takerAssetFilledAmount)), "Didn't successfully return excess tokens. Reverting.");
        }

        return true;
    }

    //INTERNAL
    /** @dev Internal function to deserialize the Order data from the input bytes.
    */
    function _getOrder(bytes memory data) internal pure returns (LibOrder.Order memory) {
        return LibOrder.Order(
            data.getAddress(0),
            data.getAddress(20),
            data.getAddress(40),
            data.getAddress(60),
            data.getUint(80),
            data.getUint(112),
            data.getUint(144),
            data.getUint(176),
            data.getUint(208),
            data.getUint(240),
            data.getBytes(272, 36),
            data.getBytes(308, 36)
        );
    }

    /** @dev Internal function to deserialize the 0x signature from the input bytes.
    */
    function _getSignature(bytes memory data) internal returns (bytes memory) {
        return data.getBytes(344, 66); // Special 0x signature with a trailing code representing the signature type.
    }

    /** @dev Internal function to read the token asset code
    */
    function _getTokenAssetCode(bytes memory data) internal pure returns (bytes4 outBytes4) {
        if (data.length == 0) {
            return 0x0;
        }

        assembly {
            outBytes4 := mload(add(data, 32))
        }
    }
}
