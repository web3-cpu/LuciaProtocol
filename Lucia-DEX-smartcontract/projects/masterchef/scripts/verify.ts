import { network } from "hardhat";
import { verifyContract } from "@luciaswap/common/verify";
import { sleep } from "@luciaswap/common/sleep";
import { configs } from "@luciaswap/common/config";

async function main() {
  const networkName = network.name;
  const config = configs[networkName as keyof typeof configs];

  if (!config) {
    throw new Error(`No config found for network ${networkName}`);
  }
  const deployedContracts_masterchef = await import(`@luciaswap/masterchef/deployments/${networkName}.json`);
  const deployedContracts_periphery = await import(`@luciaswap/periphery/deployments/${networkName}.json`);

  // Verify masterChef
  console.log("Verify masterChefV3");
  await verifyContract(deployedContracts_masterchef.MasterChef, [
    config.LCI,
    deployedContracts_periphery.NonfungiblePositionManager,
    config.WNATIVE,
  ]);
  await sleep(10000);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
