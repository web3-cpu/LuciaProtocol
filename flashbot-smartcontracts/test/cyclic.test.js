const { expect, assert } = require("chai");

// Fund our smart contract, but since don't own money in currency
// that we want to fund the smart contract with
// we are borrowing BUSD, so impersonate a whale
const { impersonateFundErc20 } = require("../utils/utilities");

const { abi } = require("../artifacts/contracts/LuciaDodoFlashSwap.sol/IERC20.json");
const config = require('../config/polygon.json');
const { waffle } = require("hardhat");

const provider = waffle.provider; // allow us to interact with mainnet blockchain

const USDC_WHALE = "0x51bfacfce67821ec05d3c9bc9a8bc8300fb29564";

describe("FlashCyclicSwap contract", () => {
  let FLASHSWAP, BORROW_AMOUNT, FUND_AMOUNT, initialFundingHuman, txArbitrage, gasUsedUSD, DECIMALS;

  const BASE_TOKEN_ADDRESS = config.baseAssets[0].address;
  const tokenBase = new ethers.Contract(BASE_TOKEN_ADDRESS, abi, provider);

  beforeEach(async () => {
    [owner] = await ethers.getSigners();
    let ownerBalance = await provider.getBalance(owner.address);

    const FlashSwap = await ethers.getContractFactory("FlashCyclicSwap");
    FLASHSWAP = await FlashSwap.deploy();
    await FLASHSWAP.deployed();

    DECIMALS = await tokenBase.decimals();
    const flashSwapBalance = await tokenBase.balanceOf(USDC_WHALE);
    console.log("whale balance: ", flashSwapBalance);

    const borrowAmountHuman = "1";
    BORROW_AMOUNT = ethers.utils.parseUnits(borrowAmountHuman, DECIMALS);

    // Configure Funding - For Testing only
    initialFundingHuman = "10";
    FUND_AMOUNT = ethers.utils.parseUnits(initialFundingHuman, DECIMALS);


    // Fund our contract - For Testing ONLY
    await impersonateFundErc20(tokenBase, USDC_WHALE, FLASHSWAP.address, initialFundingHuman, DECIMALS);

  })


  describe("Arbitrage Execution", async () => {
    it("ensures the contract is fudned", async () => {
      const flashSwapBalance = await FLASHSWAP.getBalance(BASE_TOKEN_ADDRESS);

      const flashSwapBalanceHuman = ethers.utils.formatUnits(flashSwapBalance, DECIMALS);

      console.log(flashSwapBalanceHuman);
      expect(Number(flashSwapBalanceHuman)).equal(Number(initialFundingHuman));
    })

    it("executes the arbitrage", async function () {
      this.timeout(0);
      const loanAmount = BORROW_AMOUNT;
      const flashLoanPool = config.flashLoanPools[0].address;
      const router1 = config.routers[0].address;
      const router2 = config.routers[1].address;
      const router3 = config.routers[2].address;
      const token1 = config.baseAssets[0].address;
      const token2 = config.tokens[2].address;
      const token3 = config.tokens[3].address;

      const routers = [];
      const tokens = [];
      for(i = 0; i < 3; i++) {
        routers.push(config.routers[i].address);
        tokens.push(config.tokens[i + 1].address);
      }

      // await FLASHSWAP.addRouters(routers);
      // await FLASHSWAP.addTokens(tokens);

      // console.log(routers);
      // console.log(tokens);

     await expect(
      FLASHSWAP.startFlashSwap(
          flashLoanPool,
          loanAmount,
          routers,
          tokens
      )
     ).to.be.revertedWith("Trade Reverted, No Profit Made");

    })

    it("search for the arbitrages", async function () {
      this.timeout(0);
      // Search arb opportunities
      // const arbOpp = await FLASHSWAP.triCrossSearch(BASE_TOKEN_ADDRESS, BORROW_AMOUNT);
      let borrowAmountHuman = "1";
      for(i1 = 0; i1 < config.routers.length; i1++) {
        const router1 = config.routers[i1];
        for(i2 = 0; i2 < config.routers.length; i2++) {
          const router2 = config.routers[i2];
          for(i3 = 0; i3 < config.routers.length; i3++) {
            const router3 = config.routers[i3];
            for(i4 = 0; i4 < config.routers.length; i4++) {
              const router4 = config.routers[i4];
              for(j1 = 0; j1 < config.baseAssets.length; j1++) {
                const token1 = config.baseAssets[j1];
                const baseToken = new ethers.Contract(token1.address, abi, provider);
                if (token1.sym == "USDC" || token1.sym == "USDT") {
                  borrowAmountHuman = "10";
                } else if (token1.sym == "WETH") {
                  borrowAmountHuman ="0.01";
                } else {
                  borrowAmountHuman = "10";
                }
                const dec = await baseToken.decimals();
                const loanAmount = ethers.utils.parseUnits(borrowAmountHuman, dec);
                for(j2 = 0; j2 < config.tokens.length; j2++) {
                  const token2 = config.tokens[j2];
                  for(j3 = 0; j3 < config.tokens.length; j3++) {
                    const token3 = config.tokens[j3];
                    for(j4 = 0; j4 < config.tokens.length; j4++) {
                      const token4 = config.tokens[j4];
                      if (token1.address == token3.address && token2.address == token3.address && token3.address == token4.address) continue;
                      const amtBack = await FLASHSWAP.estimateCyclicArbTrade(
                        [router1.address, router2.address, router3.address, router4.address], 
                        [token1.address, token2.address, token3.address, token4.address], 
                        loanAmount
                      );
                      //const amtBackHuman = ethers.utils.formatUnits(amtBack, dec);
                      if (amtBack.gt(0)) {
    
                        console.log(`--- Router: ${router1.dex} -> ${router2.dex} -> ${router3.dex} ${router4.dex}---`);
                        console.log(`Swapping: ${token1.sym} -> ${token2.sym} -> ${token3.sym} -> ${token4.sym} -> ${token1.sym}`);
                        console.log(`Result (${token1.sym}): Loan: ${ethers.utils.formatUnits(loanAmount, dec)} => Final: ${ethers.utils.formatUnits(amtBack, dec)}`);
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    })

  })
})
