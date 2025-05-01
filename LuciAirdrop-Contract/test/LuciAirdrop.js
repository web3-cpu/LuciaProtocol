const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("LuciAirdrop", function () {
  let token;
  let airdrop;
  let owner;
  let addr1;
  let addr2;
  let addr3;

  before(async function () {
    // Get signers
    [owner, addr1, addr2, addr3] = await ethers.getSigners();

    // Deploy a mock ERC-20 token
    const Token = await ethers.getContractFactory("MockToken");
    token = await Token.deploy("MockToken", "MockToken");
    await token.waitForDeployment()

    // Deploy the LuciAirdrop contract
    const LuciAirdrop = await ethers.getContractFactory("LuciAirdrop");
    const futureTime = Math.floor(Date.now() / 1000) + 3600; // 1 hour from now
    airdrop = await LuciAirdrop.deploy(token.target, futureTime);
    await airdrop.waitForDeployment()

    // Transfer some tokens to the Airdrop contract
    await token.connect(owner).mint(ethers.parseUnits("1000", 18), airdrop.target);
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await airdrop.owner()).to.equal(owner.address);
    });

    it("Should set the right unlock time", async function () {
      const unlockTime = await airdrop.unlockTime();
      expect(unlockTime).to.be.gt(Math.floor(Date.now() / 1000));
    });
  });

  describe("Operations", function () {
    it("Only owner can set new unlock time", async function () {
      const newUnlockTime = Math.floor(Date.now() / 1000) + 7200;
      await expect(airdrop.setUnlockTime(newUnlockTime))
        .to.emit(airdrop, 'UnlockTimeSet')
        .withArgs(newUnlockTime);

      // Attempt by non-owner should fail
      await expect(airdrop.connect(addr1).setUnlockTime(newUnlockTime))
        .to.be.revertedWith("Caller is not the owner");
    });
  });
  describe("Add Rewards", function () {
    it('should revert if address and rewards lengths are different', async () => {
      const addresses = ['0x680dA8312316000E6E0B738a343E9eB049e3b014', '0x476350ECfE56FC0120d66416596f81ca6bF43148'];
      const rewards = [100, 200, 300];

      await expect(airdrop.addBatchRewards(addresses, rewards)).to.be.revertedWith(
        'Length of address and rewards should be same'
      );
    });

    it('should add rewards to addresses', async () => {
      const addresses = [addr1, addr2, addr3];
      const rewards = [100, 200, 300];

      await airdrop.addBatchRewards(addresses, rewards);

      // Check if rewards were added correctly
      expect(await airdrop.connect(addr1).getRewardsAmount()).to.equal(100);
      expect(await airdrop.connect(addr2).getRewardsAmount()).to.equal(200);
      expect(await airdrop.connect(addr3).getRewardsAmount()).to.equal(300);
    });
  });
  describe("Withdraw", function () {
    it('should withdraw rewards for the user', async () => {
      const addresses = [addr1];
      const rewards = [100];

      await airdrop.connect(owner).addBatchRewards(addresses, rewards);
      await airdrop.connect(addr1).withdraw();

      // Check if the user received the correct amount
      expect(await token.balanceOf(addr1)).to.equal(200);
    });
    it('should withdraw tokens by the owner', async () => {
      await airdrop.connect(owner).withdrawByOwner(150);

      // Check if the owner received the correct amount
      expect(await token.balanceOf(owner.address)).to.equal(150);
    });
    it('should revert if insufficient token balance for owner withdrawal', async () => {
      await expect(airdrop.connect(owner).withdrawByOwner(ethers.parseUnits("1000", 18))).to.be.rejectedWith(
        'Insufficient token balance in contract'
      );
    });
  });
});
