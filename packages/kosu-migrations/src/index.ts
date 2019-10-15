import { KosuDeployments } from "@kosu/types";

import * as deployedAddresses from "./deployedAddresses.json";

export const DeployedAddresses = deployedAddresses as KosuDeployments;

export { migrations } from "./migrations";
