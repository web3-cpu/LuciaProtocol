import { HardhatUserConfig } from "hardhat/config";
import { NetworkUserConfig } from "hardhat/types";
import "@typechain/hardhat";
import "@nomicfoundation/hardhat-toolbox";
require("dotenv").config({ path: require("find-config")(".env") });

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.8.19",
        settings: {
          optimizer: {
            enabled: true,
          },
        },
      },
      {
        version: "0.8.12",
        settings: {
          optimizer: {
            enabled: true,
          },
        },
      },
      {
        version: "0.6.12",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: "0.4.18",
        settings: {
          optimizer: {
            enabled: true,
          },
        },
      },
    ],
  },
  networks: {
    pwrTestnet: {
      url: "https://ethereumplus.pwrlabs.io/",
      accounts: [process.env.PRIVATE_KEY || ""],
      chainId: 10023,
    },
    bscTestnet: {
      url: "https://data-seed-prebsc-1-s1.bnbchain.org:8545",
      chainId: 97,
      accounts: [process.env.PRIVATE_KEY!],
      gasPrice: 10000000000,
    },
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/ea9KrBV9zsW_cfdeR083V97CT7_DffJ7",
      accounts: [process.env.PRIVATE_KEY!],
      chainId: 11155111,
      gasPrice: 10000000000,
    },
    mumbai: {
      url: "https://polygon-mumbai.g.alchemy.com/v2/s-pENCOtQVlxIO9v-4Ywd_ZvGKZv47-n",
      accounts: [process.env.PRIVATE_KEY!],
      chainId: 80001,
      gasPrice: 10000000000,
    },
    manta: {
      url: "https://pacific-rpc.manta.network/http",
      accounts: [process.env.PRIVATE_KEY!],
    },
  },
  etherscan: {
    apiKey: {
      mumbai: process.env.ETHERSCAN_API_KEY || "",
      manta: "abc",
    },
    customChains: [
      {
        network: "manta",
        chainId: 169,
        urls: {
          apiURL: "https://pacific-explorer.manta.network/api",
          browserURL: "https://pacific-explorer.manta.network",
        },
      },
    ],
  },
  sourcify: {
    enabled: false,
  },
};

export default config;
