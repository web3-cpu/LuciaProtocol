const { ethers } = require("hardhat");

async function deploy() {
    const tokenFactory = await ethers.getContractFactory("MockToken");
    token = await tokenFactory.deploy("MOCK", "MockToken");
    await token.waitForDeployment()

    console.log("Mock Token Contract deployed to:", token.target);

    // Deploy the LuciAirdrop contract
    const airdropFactory = await ethers.getContractFactory("LuciAirdrop");
    const futureTime = Math.floor(Date.now() / 1000) + 3600; // 1 hour from now
    airdrop = await airdropFactory.deploy(token.target, futureTime);
    await airdrop.waitForDeployment()

    console.log("Airdrop Contract deployed to:", token.target);
}

deploy();