import {
    assetDataUtils,
    BigNumber,
    ContractWrappers,
    generatePseudoRandomSalt,
    orderHashUtils,
    signatureUtils,
} from "0x.js";
import { numberToHex, toTwosComplement } from "web3-utils";

const NULL_ADDRESS = "0x0000000000000000000000000000000000000000";

describe("ZeroExV2SubContract", () => {
    it("facilitate a 0x transfer", async () => {
        const value = new BigNumber(100);
        const kosuToken = contracts.kosuToken;
        const _arguments = JSON.parse(await contracts.zeroExV2SubContract.arguments.callAsync());
        const networkId = await web3Wrapper.getNetworkIdAsync();
        const zeroExWrappers = new ContractWrappers(provider, { networkId: [6174, 6175].includes(networkId) ? 50 : networkId });

        const zeroExOrder = {
            makerAddress: accounts[0],
            takerAddress: NULL_ADDRESS,
            feeRecipientAddress: NULL_ADDRESS,
            senderAddress: NULL_ADDRESS,
            makerAssetAmount: value,
            takerAssetAmount: value,
            makerFee: new BigNumber(0),
            takerFee: new BigNumber(0),
            expirationTimeSeconds: new BigNumber(Date.now().toString()), // In ms so 1000 * now is plenty in the future
            salt: generatePseudoRandomSalt(),
            makerAssetData: assetDataUtils.encodeERC20AssetData(kosuToken.address),
            takerAssetData: assetDataUtils.encodeERC20AssetData(kosuToken.address),
            exchangeAddress: zeroExWrappers.exchange.address,
        };

        const signedZeroExOrder = await signatureUtils.ecSignOrderAsync(
            provider,
            zeroExOrder,
            zeroExOrder.makerAddress,
        );

        await kosuToken.approve.awaitTransactionSuccessAsync(zeroExWrappers.erc20Proxy.address, value);
        await kosuToken.transfer.awaitTransactionSuccessAsync(accounts[1], value);
        await kosuToken.approve.awaitTransactionSuccessAsync(contracts.zeroExV2SubContract.address, value, {
            from: accounts[1],
        });

        let makerBytes = "0x";
        _arguments.maker.forEach(arg => {
            switch (arg.datatype) {
                case "address":
                    makerBytes = makerBytes + signedZeroExOrder[arg.name].slice(2);
                    break;
                case "uint":
                    makerBytes = makerBytes + toTwosComplement(numberToHex(signedZeroExOrder[arg.name])).slice(2);
                    break;
                case "bytes":
                    makerBytes = makerBytes + signedZeroExOrder[arg.name].slice(2);
                    break;
                default:
                    break;
            }
        });

        let fullBytes = makerBytes;
        fullBytes = fullBytes + accounts[1].slice(2);
        fullBytes = fullBytes + toTwosComplement(numberToHex(signedZeroExOrder.takerAssetAmount)).slice(2);

        await contracts.zeroExV2SubContract.isValid
            .callAsync(makerBytes)
            .should.eventually.eq(true, "Order is invalid");
        await contracts.zeroExV2SubContract.amountRemaining
            .callAsync(makerBytes)
            .then(x => x.toString())
            .should.eventually.eq("100", "Order does not have tokens available.");

        const { logs } = await contracts.zeroExV2SubContract.participate
            .sendTransactionAsync(fullBytes, { from: accounts[1] })
            .then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash));
        logs.forEach((log, index) => {
            logs[index] = { event: log.event, ...log.args };
        });
        const finalTransfer = logs[logs.length - 1];
        finalTransfer.event.should.eq("Transfer");
        finalTransfer.from.should.eq(contracts.zeroExV2SubContract.address.toLowerCase());
        finalTransfer.to.should.eq(accounts[1].toLowerCase());
        finalTransfer.value.toString().should.eq("100");

        await kosuToken.transfer.awaitTransactionSuccessAsync(accounts[0], value, { from: accounts[1] });
    });
});
