/* eslint-disable camelcase */
import { ethers, run, network } from "hardhat";
import { configs } from "@luciaswap/common/config";
import { tryVerify } from "@luciaswap/common/verify";
import { writeFileSync } from "fs";

async function main() {
  // Get network data from Hardhat config (see hardhat.config.ts).
  const networkName = network.name;
  // Check if the network is supported.
  console.log(`Deploying to ${networkName} network...`);

  // Compile contracts.
  await run("compile");
  console.log("Compiled contracts...");

  const config = configs[networkName as keyof typeof configs];
  if (!config) {
    throw new Error(`No config found for network ${networkName}`);
  }

  const peripheryDeployedContracts = await import(`@luciaswap/periphery/deployments/${networkName}.json`);
  const positionManager_address = peripheryDeployedContracts.NonfungiblePositionManager;

  const MasterChef = await ethers.getContractFactory("MasterChef");
  const masterChef = await MasterChef.deploy(config.LCI, positionManager_address, config.WNATIVE);

  console.log("masterChef deployed to:", masterChef.address);
  // await tryVerify(masterChef, [config.LCI, positionManager_address]);

  // Write the address to a file.
  writeFileSync(
    `./deployments/${networkName}.json`,
    JSON.stringify(
      {
        MasterChef: masterChef.address,
      },
      null,
      2
    )
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
