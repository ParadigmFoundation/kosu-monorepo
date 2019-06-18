import { soliditySHA3 } from "ethereumjs-abi";
import { bufferToHex } from "ethereumjs-util";
import { toTwosComplement } from "web3-utils";

import { BasicTradeSubContractContract } from "../generated-wrappers/basic_trade_sub_contract";
import { artifacts } from "../src";

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
            .callAsync(contracts.subContract.address)
            .then(raw => JSON.parse(raw));
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

        const hex =
            order.signer +
            order.signerToken.substr(2) +
            toTwosComplement(order.signerTokenCount).substr(2) +
            order.buyerToken.substr(2) +
            toTwosComplement(order.buyerTokenCount).substr(2) +
            raw.substr(2) +
            toTwosComplement(order.signerTokenCount).substr(2);

        await contracts.orderGateway.isValid.callAsync(contracts.subContract.address, hex).should.eventually.eq(true);
        await contracts.orderGateway.amountRemaining
            .callAsync(contracts.subContract.address, hex)
            .then(x => x.toString())
            .should.eventually.eq(order.signerTokenCount.toString());
        await contracts.kosuToken.approve.awaitTransactionSuccessAsync(
            contracts.subContract.address,
            testValues.maxUint,
        );
        const { logs } = await web3Wrapper.awaitTransactionSuccessAsync(
            await contracts.orderGateway.participate.sendTransactionAsync(contracts.subContract.address, hex),
        );
        logs[0].event.should.eq("Transfer");
        logs[0].data.should.eq(toTwosComplement(order.signerTokenCount));
        logs[1].event.should.eq("Approval");
        logs[2].event.should.eq("Transfer");
        logs[2].data.should.eq(toTwosComplement(order.buyerTokenCount));
        logs[3].event.should.eq("Approval");
    });
});
