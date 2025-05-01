const { expect, assert } = require("chai");

// Fund our smart contract, but since don't own money in currency
// that we want to fund the smart contract with
// we are borrowing BUSD, so impersonate a whale
const { impersonateFundErc20 } = require("../utils/utilities");

const { abi } = require("../artifacts/contracts/LuciaDodoFlashSwap.sol/IERC20.json");
const config = require('../scripts/configs/polygon/strategy-3.json');
const { waffle } = require("hardhat");

const utils = require("../scripts/lib/utils");
const botlib = require("../scripts/lib/botlib");

const provider = waffle.provider; // allow us to interact with mainnet blockchain

const USDC_WHALE = "0x51bfacfce67821ec05d3c9bc9a8bc8300fb29564";

describe("FlashCyclicSwap contract", async function () {
  let FLASHSWAP, routerPairs = [], tokenPairs = [];

  beforeEach("Init", async function () {
    [owner] = await ethers.getSigners();
    let ownerBalance = await provider.getBalance(owner.address);
    console.log("Owner: ", owner.address);
    this.timeout(0);
    const FlashSwap = await ethers.getContractFactory("FlashCyclicSwapV3");
    FLASHSWAP = await FlashSwap.deploy();
    await FLASHSWAP.deployed();
    // routerPairs = botlib.getValidProtocolCombinations();
    // tokenPairs = botlib.getValidTokenPermutations();

    // Transfer Matic to the contract
    const sendAmount = ethers.utils.parseEther("10"); // 10 Matic tokens
    await owner.sendTransaction({
      to: FLASHSWAP.address,
      value: sendAmount,
    });

    // Check balance
    const contractBalance = await ethers.provider.getBalance(FLASHSWAP.address);
    expect(contractBalance).to.equal(sendAmount);
  });

  it("search for the arbitrages", async function () {
    // this.timeout(0);
    // console.log(config);
    // console.log("Router pair test:", routerPairs[0]);
    // console.log("Token pair test: ", tokenPairs[0]);
    // const totalSize = routerPairs.length * tokenPairs.length;
    // console.log("Total Size: ", totalSize);

    // const result = await FLASHSWAP.searchArb(routerPairs, tokenPairs, 0, 1000, 20);
    // console.log("result:", result)
  })
  it("FlashSwap", async function () {
    /*
    {
      "name": "startFlashSwap",
      "params": [
        {
          "name": "_flashLoanPool",
          "value": "0x1093ced81987bf532c2b7907b2a8525cd0c17295",
          "type": "address"
        },
        {
          "name": "_loanAmount",
          "value": "6553600000000000000",
          "type": "uint256"
        },
        {
          "name": "_routers",
          "value": [
            "0xa5e0829caced8ffdd4de3c43696c57f7d7a678ff",
            "0xa5e0829caced8ffdd4de3c43696c57f7d7a678ff",
            "0xa5e0829caced8ffdd4de3c43696c57f7d7a678ff"
          ],
          "type": "address[]"
        },
        {
          "name": "_tokens",
          "value": [
            "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
            "0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
            "0xd41cbd667ad10ab83198f40ec6ac97190309178b"
          ],
          "type": "address[]"
        }
      ]
    }
     */
    const loanAmount = ethers.utils.parseEther("0.1");
    // const loanAmount = "6553600000000000000";
    const poolAddress = "0x1093ced81987bf532c2b7907b2a8525cd0c17295";
    const routers = [
      "0xa5e0829caced8ffdd4de3c43696c57f7d7a678ff",
      "0xa5e0829caced8ffdd4de3c43696c57f7d7a678ff",
      "0xa5e0829caced8ffdd4de3c43696c57f7d7a678ff"
    ];
    const tokens = [
      "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
      "0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
      "0xd41cbd667ad10ab83198f40ec6ac97190309178b"
    ];
    // const tokens = [
    //   "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
    //   "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
    //   "0xc2132d05d31c914a87c6611c10748aeb04b58e8f"
    // ];
    const contractBalance = await ethers.provider.getBalance(FLASHSWAP.address);
    console.log("Contract MATIC Balance: ",contractBalance.toString());
    await expect(
      FLASHSWAP.startFlashSwap(
        poolAddress,
        loanAmount,
        routers,
        tokens
      )
    ).to.be.revertedWith("Trade Reverted, No Profit Made");
  });

})
