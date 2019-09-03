const BasicTradeSubContract = require("@kosu/system-contracts/dist/generated-wrappers/basic_trade_sub_contract.js")
    .BasicTradeSubContractContract;
const BasicTradeSubContractArtifact = require("@kosu/system-contracts/generated-artifacts/BasicTradeSubContract.json");
const BasicTradeSubContractConfig = require("./BasicTradeSubContractConfig.json");

module.exports = async (provider, options) => {
    global.basicTradeSubContract = await BasicTradeSubContract.deployFrom0xArtifactAsync(
        BasicTradeSubContractArtifact,
        provider,
        options,
        JSON.stringify(BasicTradeSubContractConfig),
    );
};
