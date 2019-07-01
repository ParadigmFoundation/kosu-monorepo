pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

import "@kosu/subcontract-sdk/contracts/SubContract.sol";
import "@kosu/subcontract-sdk/contracts/BytesDecoder.sol";
import "openzeppelin-solidity/contracts/token/ERC20/IERC20.sol";
import { SafeMath as ZepSafeMath } from "openzeppelin-solidity/contracts/math/SafeMath.sol";
import "@0x/contracts-exchange/contracts/src/interfaces/IExchange.sol";
import "@0x/contracts-exchange-libs/contracts/src/LibOrder.sol";
import "@0x/contracts-utils/contracts/src/LibBytes.sol";



/** @title ZeroExV2SubContract
    @author Freydal
    @dev Implementation of a sub contract that forwards a 0x - kosu order to the zero ex contract system
*/
contract ZeroExV2SubContract is SubContract {
    using BytesDecoder for bytes;
    using LibBytes for bytes;
    using ZepSafeMath for uint;

    IExchange private _exchange;
    address private _proxy;
    string private _arguments;
    bytes4 private ERC20bytes = bytes4(keccak256("ERC20Token(address)"));

    /** @dev Constructor
        @notice Constructor
        @param args The arguments json string.
        @param exchangeAddress The 0x deployed exchange address.
        @param proxyAddress The 0x deployed erc20 proxy address.
    */
    constructor(string memory args, address exchangeAddress, address proxyAddress) public {
        _arguments = args;
        _exchange = IExchange(exchangeAddress);
        _proxy = proxyAddress;
    }

    /** @dev The arguments used to serialize kosu orders.
        @notice The arguments used to serialize kosu orders.
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
        LibOrder.Order memory order = getOrder(data);
        LibOrder.OrderInfo memory info = _exchange.getOrderInfo(order);
        return info.orderStatus == uint8(LibOrder.OrderStatus.FILLABLE);
    }

    /** @dev De-serializes kosu order data to 0x order and checks remaining fillable tokens.
        @notice De-serializes kosu order data to 0x order and checks remaining fillable tokens.
        @param data Kosu order data serialized with arguments.
        @return Tokens remaining to fill.
    */
    function amountRemaining(bytes calldata data) external view returns (uint) {
        LibOrder.Order memory order = getOrder(data);
        LibOrder.OrderInfo memory info = _exchange.getOrderInfo(order);
        return order.takerAssetAmount - info.orderTakerAssetFilledAmount;
    }

    /** @dev De-serializes ksou order data to 0x order and submits to the 0x exchange.
        @notice De-serializes ksou order data to 0x order and submits to the 0x exchange.
        @param data Kosu order data serialized with arguments.
        @return Fill success.
    */

    function participate(bytes calldata data) external returns (bool) {
        LibOrder.Order memory order = getOrder(data);
        address taker = data.getAddress(410);
        uint takeAmount = data.getUint(430);

        // TODO May want to use a different method since 0x started doing something different for gas reasons.
        require(order.makerAssetData.readBytes4(0) == ERC20bytes, "Maker token asset isn't ERC20");
        require(order.takerAssetData.readBytes4(0) == ERC20bytes, "Taker token asset isn't ERC20");

        // TODO May want to do somethign different to get the addresses
        // makerTokdenAssetData.getAddress(lastBitIndex)
        IERC20 makerToken = IERC20(order.makerAssetData.getAddress(16));
        IERC20 takerToken = IERC20(order.takerAssetData.getAddress(16));

        takerToken.transferFrom(taker, address(this), takeAmount);
        takerToken.approve(_proxy, takeAmount);

        LibFillResults.FillResults memory fillResult = _exchange.fillOrder(order, takeAmount, getSignature(data));

        if (fillResult.makerAssetFilledAmount > 0) {
            require(makerToken.transfer(taker, fillResult.makerAssetFilledAmount), "Didn't successfully forward exchanged tokens. Reverting.");
        }

        if (fillResult.takerAssetFilledAmount < takeAmount) {
            require(takerToken.transfer(taker, takeAmount.sub(fillResult.takerAssetFilledAmount)), "Didn't successfully return excess tokens. Reverting.");
        }

        return true;
    }

    /** @dev Internal function to deserialize the Order data from the input bytes.
    */
    function getOrder(bytes memory data) internal pure returns (LibOrder.Order memory) {
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
    function getSignature(bytes memory data) internal returns (bytes memory) {
        return data.getBytes(344, 66);
    }

    }
}
