import { ethers, network } from "hardhat";
import fs from "fs";

async function main() {
  const [signer] = await ethers.getSigners();
  console.log("address: ", signer.address);
  const networkName = network.name;
  const luciaStableInfoDeployer = await ethers.getContractFactory(
    "LuciaStableSwapTwoPoolInfo"
  );
  const luciaStableInfo = await luciaStableInfoDeployer.deploy();
  const luciaStableInfoAddress = await luciaStableInfo.getAddress();
  console.log("LuciaStableSwapTwoPoolInfo: ", luciaStableInfoAddress);

  const luciaStableSwapTwoPoolDeployer = await ethers.getContractFactory(
    "LuciaStableSwapTwoPoolDeployer"
  );
  const luciaStableSwapTwoPool = await luciaStableSwapTwoPoolDeployer.deploy();
  const luciaStableSwapTwoPoolAddress =
    await luciaStableSwapTwoPool.getAddress();
  console.log("luciaStableSwapTwoPoolAddress: ", luciaStableSwapTwoPoolAddress);

  const luciaStableSwapThreePoolDeployer = await ethers.getContractFactory(
    "LuciaStableSwapThreePoolDeployer"
  );
  const luciaStableSwapThreePool =
    await luciaStableSwapThreePoolDeployer.deploy();
  const luciaStableSwapThreePoolAddress =
    await luciaStableSwapThreePool.getAddress();
  console.log(
    "luciaStableSwapThreePoolAddress: ",
    luciaStableSwapThreePoolAddress
  );

  const stableLPFactoryDeployer = await ethers.getContractFactory(
    "LuciaStableSwapLPFactory"
  );

  const stableLPFactory = await stableLPFactoryDeployer.deploy();
  const stableLPFactoryAddress = await stableLPFactory.getAddress();
  console.log("stableLPFactoryAddress: ", stableLPFactoryAddress);

  const stableFactoryDeployer = await ethers.getContractFactory(
    "LuciaStableSwapFactory"
  );

  const stableFactory = await stableFactoryDeployer.deploy(
    stableLPFactoryAddress,
    luciaStableSwapTwoPoolAddress,
    luciaStableSwapThreePoolAddress
  );
  const stableFactoryAddress = await stableFactory.getAddress();
  console.log("stableFactoryAddress: ", stableFactoryAddress);
  const contracts = {
    LuciaStableSwapTwoPoolInfo: luciaStableInfoAddress,
    LuciaStableSwapTwoPoolDeployer: luciaStableSwapTwoPoolAddress,
    LuciaStableSwapThreePoolDeployer: luciaStableSwapThreePoolAddress,
    LuciaStableSwapLPFactory: stableLPFactoryAddress,
    LuciaStableSwapFactory: stableFactoryAddress,
  };
  fs.writeFileSync(
    `./deployments/${networkName}-lucia.json`,
    JSON.stringify(contracts, null, 2)
  );
  // // @ts-ignore
  // await run("verify:verify", {
  //   address: WPWRAddress,
  //   constructorArguments: [],
  // });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
