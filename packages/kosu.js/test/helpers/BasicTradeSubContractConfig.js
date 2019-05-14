exports.makerArguments = [
    { dataType: "address", name: "signer" }, //0
    { dataType: "address", name: "signerToken" }, //1
    { dataType: "uint", name: "signerTokenCount" }, //2
    { dataType: "address", name: "buyerToken" }, //3
    { dataType: "uint", name: "buyerTokenCount" }, //4
    { dataType: "uint", name: "signatureV" },
    { dataType: "bytes32", name: "signatureR" },
    { dataType: "bytes32", name: "signatureS" },
];

exports.takerArguments = [
    { dataType: "uint", name: "tokensToBuy" }, //6 -> 0
];
