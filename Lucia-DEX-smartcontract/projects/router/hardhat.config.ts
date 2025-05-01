import type { HardhatUserConfig, NetworkUserConfig } from 'hardhat/types'
import '@nomiclabs/hardhat-ethers'
import '@nomiclabs/hardhat-web3'
import '@nomiclabs/hardhat-truffle5'
import 'hardhat-abi-exporter'
import 'hardhat-contract-sizer'
import 'dotenv/config'
import 'hardhat-tracer'
import '@nomiclabs/hardhat-etherscan'
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
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {},
    ...(process.env.KEY_TESTNET && { pwrTestnet }),
    ...(process.env.KEY_TESTNET && { mumbai }),
    ...(process.env.KEY_TESTNET && { manta }),
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY || '',
  },
  solidity: {
    compilers: [
      {
        version: '0.7.6',
        settings: {
          optimizer: {
            enabled: true,
            runs: 10,
          },
        },
      },
      {
        version: '0.8.10',
        settings: {
          optimizer: {
            enabled: true,
            runs: 10,
          },
        },
      },
      {
        version: '0.6.6',
        settings: {
          optimizer: {
            enabled: true,
            runs: 10,
          },
        },
      },
      {
        version: '0.5.16',
        settings: {
          optimizer: {
            enabled: true,
            runs: 10,
          },
        },
      },
      {
        version: '0.4.18',
        settings: {
          optimizer: {
            enabled: true,
            runs: 10,
          },
        },
      },
    ],
    overrides: {
      '@luciaswap/core/contracts/libraries/FullMath.sol': {
        version: '0.7.6',
        settings: {},
      },
      '@luciaswap/core/contracts/libraries/TickBitmap.sol': {
        version: '0.7.6',
        settings: {},
      },
      '@luciaswap/core/contracts/libraries/TickMath.sol': {
        version: '0.7.6',
        settings: {},
      },
      '@luciaswap/periphery/contracts/libraries/PoolAddress.sol': {
        version: '0.7.6',
        settings: {},
      },
      'contracts/libraries/PoolTicksCounter.sol': {
        version: '0.7.6',
        settings: {},
      },
    },
  },
  paths: {
    sources: './contracts',
    tests: './test',
    cache: './cache',
    artifacts: './artifacts',
  },
  // abiExporter: {
  //   path: "./data/abi",
  //   clear: true,
  //   flat: false,
  // },
  docgen: {
    pages: 'files',
  },
}

export default config
