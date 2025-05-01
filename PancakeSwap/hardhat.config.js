// require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-waffle");
require('dotenv').config()

const BINANCE_MAINNET_KEY = process.env.BINANCE_MAINNET_KEY;
const BINANCE_TESTNET_KEY = process.env.BINANCE_TESTNET_KEY;

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
})

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  networks: {
    hardhat: {
      forking: {
        url: "https://bsc-dataseed.binance.org"
      }
    }, 
    testnet: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545/",
      chainId: 97,
      accounts: [BINANCE_TESTNET_KEY]
    }
    // mainnet: {
    //   url: "https://bsc-dataseed.binance.org",
    //   chainId: 56,
    //   gasPrice: 20000000000,
    //   accounts: [BINANCE_MAINNET_KEY]
    // }
  },
  solidity: {
    compilers: [
      {version: "0.5.5"}, 
      {version: "0.6.6"},
      {version: "0.7.0"}
    ],
  }
};
