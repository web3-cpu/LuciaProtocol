require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    hardhat: {
      initialDate: "2021-04-04T00:00:00.000+00:00",
      saveDeployments: true,
      allowUnlimitedContractSize: true,
      tags: ["ido", "presale", "test"],
    },
    ropsten: {
      url: `https://ropsten.infura.io/v3/${process.env.INFURA_ID}`,
      tags: ["ido", "presale", "test"],
      chainId: 3,
      accounts: real_accounts,
      gas: 2100000,
      gasPrice: 8000000000
    },
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${process.env.INFURA_ID}`,
      tags: ["ido", "presale", "test"],
      chainId: 4,
      accounts: real_accounts,
      gas: 2100000,
      gasPrice: 8000000000
    },
    testnet: {
      url: `https://api.avax-test.network/ext/bc/C/rpc`,
      chainId: 43113,
      accounts: real_accounts,
      gas: 'auto',
      gasPrice: 25000000000,
      blockGasLimit: 0x1fffffffffffff,
      allowUnlimitedContractSize: true,
      timeout: 1800000
    },
    mainnet: {
      url: `https://api.avax.network/ext/bc/C/rpc`,
      chainId: 43114,
      accounts: real_accounts,
      gas: 'auto',
      gasPrice: 25000000000,
      blockGasLimit: 0x1fffffffffffff,
      allowUnlimitedContractSize: true,
      timeout: 1800000
    }
  },
};
