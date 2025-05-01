import { ethers } from "hardhat";

async function main() {

  const lciToken = await ethers.deployContract("LCI");

  await lciToken.waitForDeployment();
  let token_address = await lciToken.getAddress();

  console.log("LCI token deployed under this address:", token_address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
