const systemContracts = require("@kosu/system-contracts");
const BasicTradeSubContract = systemContracts.BasicTradeSubContractContract;
const SignatureValidatorSubContract = systemContracts.SignatureValidatorSubContractContract;
const BasicTradeSubContractArtifact = systemContracts.artifacts.BasicTradeSubContract;
const signatureValidatorSubContractArtifact = systemContracts.artifacts.SignatureValidatorSubContract;
const BasicTradeSubContractConfig = require("./BasicTradeSubContractConfig.json");

module.exports = async (provider, options) => {
    global.basicTradeSubContract = await BasicTradeSubContract.deployFrom0xArtifactAsync(
        BasicTradeSubContractArtifact,
        provider,
        options,
        JSON.stringify(BasicTradeSubContractConfig),
    );
    global.signatureValidatorSubContract = await SignatureValidatorSubContract.deployFrom0xArtifactAsync(
        signatureValidatorSubContractArtifact,
        provider,
        options,
    );
};
