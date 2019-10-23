import { soliditySHA3 } from "ethereumjs-abi";
import { bufferToHex } from "ethereumjs-util";
import { toTwosComplement } from "web3-utils";

describe("OrderGateway", () => {
    it("should serialize and sign the data", async () => {
        const order = {
            signer: accounts[0],
            signerToken: contracts.kosuToken.address,
            signerTokenCount: 40,
            buyerToken: contracts.kosuToken.address,
            buyerTokenCount: 80,
        };

        const { signer } = order;

        const datatypes = [];
        const values = [];
        const args = await contracts.orderGateway.arguments
            .callAsync(contracts.basicTradeSubContract.address)
            .then(rawJson => JSON.parse(rawJson));
        args.maker.forEach(argument => {
            if (argument.name.includes("signature")) {
                return;
            }
            if (order[argument.name] !== undefined) {
                datatypes.push(argument.datatype);
                values.push(order[argument.name].toString());
            }
        });
        const orderHex = bufferToHex(soliditySHA3(datatypes, values));

        let raw: string;

        try {
            raw = await web3.eth.personal.sign(orderHex, signer);
        } catch (e) {
            raw = await web3.eth.sign(orderHex, signer);
        }

        const hex = `${order.signer}${order.signerToken.substr(2)}${toTwosComplement(order.signerTokenCount).substr(2)}${order.buyerToken.substr(2)}${toTwosComplement(order.buyerTokenCount).substr(2)}${raw.substr(2)}${toTwosComplement(order.signerTokenCount).substr(2)}`;

        await contracts.orderGateway.isValid
            .callAsync(contracts.basicTradeSubContract.address, hex)
            .should.eventually.eq(true);
        await contracts.orderGateway.amountRemaining
            .callAsync(contracts.basicTradeSubContract.address, hex)
            .then(x => x.toString())
            .should.eventually.eq(order.signerTokenCount.toString());
        await contracts.kosuToken.approve.awaitTransactionSuccessAsync(
            contracts.basicTradeSubContract.address,
            TestValues.maxUint,
        );
        const { logs } = await web3Wrapper.awaitTransactionSuccessAsync(
            await contracts.orderGateway.participate.sendTransactionAsync(contracts.basicTradeSubContract.address, hex),
        );
        logs[0].event.should.eq("Transfer");
        logs[0].data.should.eq(toTwosComplement(order.signerTokenCount));
        logs[1].event.should.eq("Approval");
        logs[2].event.should.eq("Transfer");
        logs[2].data.should.eq(toTwosComplement(order.buyerTokenCount));
        logs[3].event.should.eq("Approval");
    });
});
