import { ethers } from "hardhat";

async function main() {
  const [signer] = await ethers.getSigners();
  console.log("address: ", signer.address);
  const LCIDeployer = await ethers.getContractFactory("Mock");

  const LCIToken = await LCIDeployer.deploy("MockB", "MCKB");
  console.log("deployed");
  const LCIAddress = await LCIToken.getAddress();
  console.log("deployedAddress: ", LCIAddress);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
// main().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });
main();
