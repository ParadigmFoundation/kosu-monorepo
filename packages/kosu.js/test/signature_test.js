const { Signature } = require("../src/Signature");

describe("Signature", () => {
    describe("generate()", () => {
        it("generates a signature given an array of data types and an array of values", async () => {
            const dataTypes = ["address", "address", "uint", "uint", "address"];
            const values = [accounts[1], accounts[2], 42, 57, accounts[3]];
            const hash = Signature.hash(dataTypes, values);
            const signer = accounts[5];

            let signature = await Signature.generate(web3, hash, signer);
            assert.equal(typeof signature, "string");
        });
    });

    describe("validate()", () => {
        it("should validate a signature signer is equal to its recovered address", async () => {
            const dataTypes = ["address", "address", "uint", "uint", "address"];
            const values = [accounts[1], accounts[2], 42, 57, accounts[3]];
            const hash = Signature.hash(dataTypes, values);
            const signer = accounts[5];

            let signature = await Signature.generate(web3, hash, signer);
            Signature.validate(hash, signature, signer).should.be.true;
        });

        it("should validate a signature signer is not equal to recovered address", async () => {
            const dataTypes = ["address", "address", "uint", "uint", "address"];
            const values = [accounts[1], accounts[2], 42, 57, accounts[3]];
            const hash = Signature.hash(dataTypes, values);
            const signer = accounts[5];

            let signature = await Signature.generate(web3, hash, signer);

            Signature.validate(hash, signature, "wrong").should.be.false;
        });
    });

    describe("sign()", () => {});
});
