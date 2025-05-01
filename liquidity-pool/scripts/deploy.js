const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("deploying contracts with the account: ", deployer.address);
  console.log("Account balance: ",await deployer.getBalance().toString());

  const LuciaToken = await ethers.getContractFactory("LuciaToken");
  const luciaToken = await LuciaToken.deploy()
  console.log("LuciaToken Address: ",luciaToken.address);

  const Bank = await ethers.getContractFactory("Bank");
  const bank = await Bank.deploy();
}


main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  })
