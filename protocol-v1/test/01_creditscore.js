const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const { ethers } = require("hardhat");
const { getEventObject } = require("./helpers/events");

describe("Credit Score", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployCreditScore() {
    // Contracts are deployed using the first signer/account by default
    const [owner, account1, account2] = await ethers.getSigners();
    const supply1 = 10000;
    const supply2 = 20000;
    const supplyUsers = 5000;

    /// deploy the AddressesProvider contract
    const AddressesProvider = await ethers.getContractFactory(
      "AddressesProvider"
    );
    const addressesProvider = await AddressesProvider.deploy();

    /// deploy the CredProtocol contract
    const CredProtocol = await ethers.getContractFactory("CredProtocol");
    const credProtocol = await CredProtocol.deploy();

    /// deploy the Guarantor contract
    const Guarantor = await ethers.getContractFactory("Guarantor");
    const guarantor = await Guarantor.deploy();

    /// deploy the KYC contract
    const KYC = await ethers.getContractFactory("KYC");
    const kyc = await KYC.deploy();

    /// set addresses into the provider
    await addressesProvider.setCredProtocol(credProtocol.target);
    await addressesProvider.setGuarantorEngine(guarantor.target);
    await addressesProvider.setKYCEngine(kyc.target);

    /// deploy the Lucia Factory contract
    const LuciaFactory = await ethers.getContractFactory("LuciaFactory");
    const luciaFactory = await LuciaFactory.deploy(addressesProvider.target);

    /// create Credit Score Engine via Factory
    let tx = await luciaFactory.deployCreditScoreEngine();
    let emittedEvent = await getEventObject(tx, "CreditScoreEngineCreated");

    const CreditScore = await ethers.getContractFactory("CreditScore");
    const creditScore = await CreditScore.attach(emittedEvent.engine);

    await addressesProvider.setCreditScoreEngine(creditScore.target);

    console.log(`\tCreditScore deployed to: ${creditScore.target}`);
    console.log(`\tCredProtocol deployed to: ${credProtocol.target}`);
    console.log(`\tGuarantor deployed to: ${guarantor.target}`);
    console.log(`\tKYC deployed to: ${kyc.target}`);
    console.log(`\tOwner: ${owner.address}`);

    return {
      luciaFactory,
      creditScore,
      credProtocol,
      guarantor,
      kyc,
      owner,
      account1,
      account2,
    };
  }

  describe("CreditScore unit tests", function () {
    let deployedInfo;

    before(async () => {
      deployedInfo = await loadFixture(deployCreditScore);
    });

    it("Should test to register in the CreditScore contract.", async function () {
      const account1 = deployedInfo.account1;
      await deployedInfo.creditScore.register(account1.address);
    });

    it("Should test to get score data in the CreditScore contract.", async function () {
      const account1 = deployedInfo.account1;
      const scoreData = await deployedInfo.creditScore.scoreData(
        account1.address
      );
      expect(scoreData.zkVerified).to.be.equal(true);
      expect(scoreData.initScore).to.be.equal(ethers.parseEther("2.0"));
    });

    it("Should test to get score function in the CreditScore contract.", async function () {
      const account1 = deployedInfo.account1;
      const creditScore = await deployedInfo.creditScore.score(
        account1.address
      );
      expect(creditScore).to.be.equal(
        ethers.parseEther("0.288888888888888888")
      );
    });

    it("Should test to reverts in the CreditScore contract.", async function () {
      const account1 = deployedInfo.account1;
      await expect(
        deployedInfo.creditScore.register(account1.address)
      ).to.revertedWithCustomError(deployedInfo.creditScore, "LUCIA_ERROR"); /// ACCOUNT_ALREADY_REGISTERED

      await expect(
        deployedInfo.creditScore.scoreData(ethers.ZeroAddress)
      ).to.revertedWithCustomError(deployedInfo.creditScore, "LUCIA_ERROR"); /// ACCOUNT_NOT_FOUND
    });

    it("Should test to upgrade the CreditScore contract.", async function () {
      const factory = deployedInfo.luciaFactory;
      const proxy = deployedInfo.creditScore;
      const CreditScoreV2 = await ethers.getContractFactory("CreditScoreV2");
      const creditScoreV2 = await CreditScoreV2.deploy();
      await factory.upgradeTo(proxy.target, creditScoreV2.target);
      deployedInfo.creditScore = await CreditScoreV2.attach(proxy.target);
    });
  });
});
