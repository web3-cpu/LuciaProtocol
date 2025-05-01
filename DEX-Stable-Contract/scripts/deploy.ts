import { ethers, network } from "hardhat";
import fs from "fs";

async function main() {
  const [signer] = await ethers.getSigners();
  console.log("address: ", signer.address);
  const networkName = network.name;
  const WNativeDeployer = await ethers.getContractFactory("WPWR");

  const wNativeDeployer = await WNativeDeployer.deploy();
  const WPWRAddress = await wNativeDeployer.getAddress();
  console.log("WPWRAddress: ", WPWRAddress);

  const MultiCallDeployer = await ethers.getContractFactory("Multicall3");
  const multiCallDeployer = await MultiCallDeployer.deploy();
  const multiCallAddress = await multiCallDeployer.getAddress();
  console.log("multiCallAddress: ", multiCallAddress);
  const luciaMultiCallDeployer = await ethers.getContractFactory(
    "LuciaInterfaceMulticallV2"
  );
  const luciaMultiCall = await luciaMultiCallDeployer.deploy();
  const luciaMultiCallAddress = await luciaMultiCall.getAddress();
  console.log("luciaMultiCallAddress: ", luciaMultiCallAddress);

  const LCIDeployer = await ethers.getContractFactory("LCIToken");
  const LCIToken = await LCIDeployer.deploy();
  const LCIAddress = await LCIToken.getAddress();
  console.log("LCIAddress: ", LCIAddress);

  const contracts = {
    WPWRAddress,
    multiCallAddress,
    LCIAddress,
    luciaMultiCallAddress,
  };
  fs.writeFileSync(
    `./deployments/${networkName}.json`,
    JSON.stringify(contracts, null, 2)
  );
  // @ts-ignore
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
