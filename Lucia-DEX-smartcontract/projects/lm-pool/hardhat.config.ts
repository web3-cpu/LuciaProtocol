import { HardhatUserConfig } from 'hardhat/config'
import '@nomicfoundation/hardhat-toolbox'
import '@typechain/hardhat'
import 'dotenv/config'
import { NetworkUserConfig } from 'hardhat/types'
import 'solidity-docgen'
require('dotenv').config({ path: require('find-config')('.env') })

const pwrTestnet: NetworkUserConfig = {
  url: process.env.POWER_RPC,
  chainId: 10023,
  accounts: [process.env.KEY_TESTNET!],
}

const mumbai: NetworkUserConfig = {
  url: process.env.MUMBAI_RPC,
  accounts: [process.env.KEY_TESTNET!],
  chainId: 80001,
}
const manta: NetworkUserConfig = {
  url: process.env.MANTA_RPC,
  accounts: [process.env.KEY_TESTNET!],
  chainId: 3441005,
}
const config: HardhatUserConfig = {
  solidity: {
    version: '0.7.6',
  },
  networks: {
    hardhat: {},
    ...(process.env.KEY_TESTNET && { pwrTestnet }),
    ...(process.env.KEY_TESTNET && { mumbai }),
    ...(process.env.KEY_TESTNET && { manta }),
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  paths: {
    sources: './contracts/',
    tests: './test',
    cache: './cache',
    artifacts: './artifacts',
  },
}

export default config
