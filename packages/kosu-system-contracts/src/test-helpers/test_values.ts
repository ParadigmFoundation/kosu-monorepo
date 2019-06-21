import { BigNumber } from "@0x/utils";
import { toWei } from "web3-utils";

export const TestValues = {
    zero: new BigNumber("0"),
    oneWei: new BigNumber("1"),
    fiftyWei: new BigNumber("50"),
    oneHundredWei: new BigNumber("100"),
    halfEther: new BigNumber(toWei("0.5")),
    oneEther: new BigNumber(toWei("1")),
    fiveEther: new BigNumber(toWei("5")),
    sixEther: new BigNumber(toWei("6")),
    oneHundredEther: new BigNumber(toWei("100")),
    fiveHundredEther: new BigNumber(toWei("500")),
    maxUint: new BigNumber(2).pow(new BigNumber(256)).minus(new BigNumber(1)),
};
