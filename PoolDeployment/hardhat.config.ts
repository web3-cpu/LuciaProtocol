import 'dotenv/config';
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const private_key = process.env.PRIVATE_KEY as string

const config: HardhatUserConfig = {
  networks: {
    localhost: {
      url: 'http://127.0.0.1:8545'
    },
    mumbai: {
      url: 'https://polygon-mumbai-bor.publicnode.com',
      accounts: [private_key]
    },
    polygon: {
      url: 'https://polygon-mainnet.public.blastapi.io',
      accounts: [private_key]
    }
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: '7AIT7DHQTMN8CB6D6B2MISK7YNFCAYTI64'
  },
  solidity: {
    compilers: [
      {
        version: '0.8.19',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        }
      }
    ]
  },
};

export default config;
