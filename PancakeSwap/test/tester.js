const { expect, assert } = require("chai");

// Fund our smart contract, but since don't own money in currency
// that we want to fund the smart contract with
// we are borrowing BUSD, so impersonate a whale
const { impersonateFundErc20 } = require("../utils/utilities");

const { abi } = require("../artifacts/contracts/interfaces/IERC20.sol/IERC20.json");
const { waffle } = require("hardhat");

const provider = waffle.provider; // allow us to interact with mainnet blockchain

const BUSD_WHALE = "0xf977814e90da44bfa03b6295a0616a897441acec";
const BUSD = "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56";
const USDT = "0x55d398326f99059fF775485246999027B3197955";
const CAKE = "0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82";
const CROX = "0x2c094F5A7D1146BB93850f629501eB749f6Ed491";


describe("FlashSwap contract", () => {
  let FLASHSWAP, BORROW_AMOUNT, FUND_AMOUNT, initiateFundHuman, txArbitrage, gasUsedUSD;
  const DECIMALS = 18;

  const BUSD_WHALE = "0xf977814e90da44bfa03b6295a0616a897441acec";
  const BUSD = "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56";
  const USDT = "0x55d398326f99059fF775485246999027B3197955";
  const CAKE = "0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82";
  const CROX = "0x2c094F5A7D1146BB93850f629501eB749f6Ed491";

  const BASE_TOKEN_ADDRESS = BUSD;
  const tokenBase = new ethers.Contract(BASE_TOKEN_ADDRESS, abi, provider);

  beforeEach(async () => {
    [owner] = await ethers.getSigners();
    let ownerBalance = await provider.getBalance(owner.address);


    const FlashSwap = await ethers.getContractFactory("PancakeFlashSwap");
    FLASHSWAP = await FlashSwap.deploy();
    await FLASHSWAP.deployed();
    const flashSwapBalance = await FLASHSWAP.getBalanceOfTokenForUser(BASE_TOKEN_ADDRESS, BUSD_WHALE);
    console.log("whale balance: ", flashSwapBalance);

    const borrowAmountHuman = "1";
    BORROW_AMOUNT = ethers.utils.parseUnits(borrowAmountHuman, DECIMALS);

    // Configure Funding - For Testing only
    initialFundingHuman = "100";
    FUND_AMOUNT = ethers.utils.parseUnits(initialFundingHuman, DECIMALS);


    // Fund our contract - For Testing ONLY
    await impersonateFundErc20(tokenBase, BUSD_WHALE, FLASHSWAP.address, initialFundingHuman);

  })


  describe("Arbitrage Execution", async () => {
    it("ensures the contract is fudned", async () => {
      const flashSwapBalance = await FLASHSWAP.getBalanceOfToken(BASE_TOKEN_ADDRESS);

      const flashSwapBalanceHuman = ethers.utils.formatUnits(flashSwapBalance, DECIMALS);

      console.log(flashSwapBalanceHuman);
      expect(Number(flashSwapBalanceHuman)).equal(Number(initialFundingHuman));
    })

    it("executes the arbitrage", async () => {
      txArbitrage = await FLASHSWAP.startArbitrage(BASE_TOKEN_ADDRESS, BORROW_AMOUNT);
      assert(txArbitrage);

      // print balances
      const contractBalanceBUSD = await FLASHSWAP.getBalanceOfToken(BUSD);
      const formattedBalBUSD = Number(ethers.utils.formatUnits(contractBalanceBUSD, DECIMALS));
      console.log("Balance Of BUSD: ", formattedBalBUSD);

      const contractBalanceCROX = await FLASHSWAP.getBalanceOfToken(CROX);
      const formattedBalCROX = Number(ethers.utils.formatUnits(contractBalanceCROX, DECIMALS));
      console.log("Balance Of CROX: ", formattedBalCROX);

      const contractBalanceCAKE = await FLASHSWAP.getBalanceOfToken(CAKE);
      const formattedBalCAKE = Number(ethers.utils.formatUnits(contractBalanceCAKE, DECIMALS));
      console.log("Balance Of CAKE: ", formattedBalCAKE);
    })
  })



})
