const { expect } = require('chai')
// const { parseEther } = require('ethers/lib/utils')
const { ethers, upgrades } = require('hardhat')

describe('Lending Smart Contract', () => {
  let LUCILendingFactory, LUCIMockFactory
  let luciLending, luciToken
  let accounts

  before(async () => {
    await upgrades.silenceWarnings();

    LUCILendingFactory = await ethers.getContractFactory('LUCILending')
    LUCIMockFactory = await ethers.getContractFactory('LUCIMock')

    accounts = await ethers.getSigners()
  })

  beforeEach(async () => {
    luciToken = await LUCIMockFactory.connect(accounts[0]).deploy("LUCI", "LUCI")
    await luciToken.waitForDeployment()

    luciLending = await upgrades.deployProxy(LUCILendingFactory, [luciToken.target, [luciToken.target]], { initializer: "initialize" })
    await luciLending.waitForDeployment()
    luciLending.connect(accounts[0]).initialize(luciToken.target, [luciToken.target])

    await (await luciToken.connect(accounts[0]).mint(1000, accounts[0].address)).wait()
    await (await luciToken.connect(accounts[0]).approve(luciLending.target, 1000)).wait()
  })

  it('Test LuciToken', async () => {
    await (await luciToken.connect(accounts[0]).mint(100, accounts[0].address)).wait()
    expect(await luciToken.balanceOf(accounts[0].address)).to.equal(1100n)
  })

  it("should initialize the contract correctly", async function () {
    // Check if the BASE_ASSET variable is set correctly
    expect(await luciLending.BASE_ASSET()).to.equal(luciToken.target);
  });

  // Supply
  it("should supply collateral", async function () {
    // Supply collateral
    const asset = luciToken.target; // Replace with the desired asset address
    const amount = 100; // Replace with the desired amount
    await luciLending.supply(asset, amount);

    // Assert the state changes
    expect(await luciLending.suppliedCollateral(accounts[0].address)).to.equal(amount);
    expect(await luciLending.totalSuppliedAssets(asset)).to.equal(amount);
  });

  // Borrow
  it("should revert if amount is zero", async function () {
    await expect(luciLending.borrow(0, 6)).to.be.rejectedWith(
      "LUCILending_Amount_Cannot_Be_Zero"
    );
  });

  it("should revert if loan length is not within approved range", async function () {
    await expect(luciLending.borrow(100, 15)).to.be.rejectedWith(
      "LUCILending_Loan_Length_Not_Within_Approved_Range"
    );
  });

  it("should revert if user has already borrowed", async function () {
    // Mocking the user as having already borrowed
    await luciLending.supply(luciToken.target, 100);
    await (await luciLending.setCreditScore(4000, 100, 100)).wait();
    await (await luciLending.borrow(100, 10)).wait();

    await expect(luciLending.borrow(200, 6)).to.be.rejectedWith(
      "LUCILending_AlreadyBorrowed"
    );
  });

  it("should revert if amount is above user's available collateral", async function () {
    // Mocking the user's available collateral as 150
    await luciLending.supply(luciToken.target, 150);
    await (await luciLending.setCreditScore(4000, 100, 100)).wait();

    await expect(luciLending.borrow(200, 6)).to.be.rejectedWith(
      "LUCILending_Amount_Above_User_Available_Collateral"
    );
  });

  it("should update the contract state correctly when borrowing", async function () {
    // Mocking the user's available collateral as 300
    await luciLending.supply(luciToken.target, 300);
    await (await luciLending.setCreditScore(4000, 100, 100)).wait();

    await expect(luciLending.borrow(200, 6))
      .to.emit(luciLending, "Borrow")
      .withArgs(accounts[0].address, 200);

    // Asserting the updated contract state
    expect(await luciLending.borrowedCollateral(accounts[0].address)).to.equal(200);
    expect(await luciLending.amountRemaining(accounts[0].address)).to.equal(200);
  });

  // Repay Loan
  it("should revert when there is no pending repayment", async function () {
    // Call the repayLoan function and expect it to revert
    await expect(luciLending.repayLoan(100)).to.be.rejectedWith(
      "LUCILending_No_Pending_Repayment"
    );
  });

  it("should revert when the amount is greater than the monthly due", async function () {
    await luciLending.supply(luciToken.target, 100);
    await (await luciLending.setCreditScore(4000, 100, 100)).wait();
    await (await luciLending.borrow(100, 10)).wait();

    // Call the repayLoan function and expect it to revert
    await expect(luciLending.repayLoan(0)).to.be.rejectedWith(
      "LUCILending_Cannot_Pay_Less_Than_Monthly_Due"
    );
  });

  it("should repay the loan correctly", async function () {
    await luciLending.supply(luciToken.target, 100);
    await (await luciLending.setCreditScore(4000, 100, 100)).wait();
    await (await luciLending.borrow(100, 10)).wait();

    // Call the repayLoan function
    await (await luciLending.connect(accounts[0]).repayLoan(10)).wait();

    // Perform assertions to verify the expected behavior
    expect(await luciLending.amountRemaining(accounts[0].address)).to.equal(100);
  });

  // Calculate Repayment Per Month
  it("should calculate repayment per month correctly", async function () {
    const principal = 1000;
    const termInMonths = 12;
    const expectedMonthlyRepayment = 10;

    const result = await luciLending.calculateRepaymentPerMonth(
      principal,
      termInMonths
    );

    expect(result).to.equal(expectedMonthlyRepayment);
  });

  // Set Credit Score Weight
  it("should revert if the sum of parameters is not one", async function () {
    const w1 = 10;
    const w2 = 20;
    const w3 = 30;
    const w4 = 40;
    const w5 = 50;

    await expect(luciLending.setCreditScoreWeight(w1, w2, w3, w4, w5)).to.be.rejectedWith(
      "LUCILending_CreditScoreWeight_Sum_Should_Be_One"
    );
  });

  it("should set credit score parameters correctly", async function () {
    const w1 = 30;
    const w2 = 20;
    const w3 = 20;
    const w4 = 15;
    const w5 = 15;

    await luciLending.setCreditScoreWeight(w1, w2, w3, w4, w5);

    expect(await luciLending.initialCreditScoreW1()).to.equal(w1);
    expect(await luciLending.guarantorScoreW2()).to.equal(w2);
    expect(await luciLending.paymentHistoryW3()).to.equal(w3);
    expect(await luciLending.loanUtilizationRateW4()).to.equal(w4);
    expect(await luciLending.kycW5()).to.equal(w5);
  });

  // Set Credit Score
  it("should set credit score correctly", async function () {
    const initialCreditScore = 80;
    const guarantorScore = 90;
    const kyc = 95;

    await luciLending.connect(accounts[0]).setCreditScore(initialCreditScore, guarantorScore, kyc);

    expect(await luciLending.initialCreditScore(accounts[0].address)).to.equal(initialCreditScore);
    expect(await luciLending.guarantorScore(accounts[0].address)).to.equal(guarantorScore);
    expect(await luciLending.kyc(accounts[0].address)).to.equal(kyc);
  });

  // Set Threshold
  it("should set Threshold correctly", async function () {
    const threshold = 1000;

    await luciLending.setThreshold(threshold);

    expect(await luciLending.threshold()).to.equal(threshold);
  });
})