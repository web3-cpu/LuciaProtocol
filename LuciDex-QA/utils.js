const dotenv = require('dotenv');
dotenv.config();

function getNetwork(networkChain) {
  let network = {
    networkName: 'PWR Chain Testnet',
    chainId: '10023',
    rpcUrl: 'https://ethereumplus.pwrlabs.io/',
    symbol: 'ETH',
    isTestnet: true,
    blockExplorer: 'https://ethplusexplorer.pwrlabs.io/',
  };

  if (networkChain == 'mumbai') {
    network.networkName = '';
    network.chainId = '';
    network.rpcUrl = '';
    network.symbol = '';
    network.blockExplorer = '';
  } else if (networkChain == 'manta') {
    network.networkName = 'MANTA';
    network.chainId = '169';
    network.rpcUrl = 'https://pacific-rpc.manta.network/http';
    network.symbol = 'ETH';
    network.blockExplorer = 'https://pacific-explorer.manta.network';
    network.isTestnet = false;
  } else if (networkChain == 'mantaTestnet') {
    network.networkName = 'MANTA_TESTNET';
    network.chainId = '3441005';
    network.rpcUrl = 'https://pacific-rpc.testnet.manta.network/http';
    network.symbol = 'ETH';
    network.blockExplorer = 'https://pacific-explorer.testnet.manta.network/';
  } else {
    return network;
  }

  return network;
}

function getInputs() {
  // Now you can access your environment variables
  const tokenA = Cypress.env('TOKEN_A');
  const tokenB = Cypress.env('TOKEN_B');
  const value = Cypress.env('VALUE');
  const chain = Cypress.env('CHAIN');
  const seedPhrase = Cypress.env('SEED_PHRASE');

  const variablesToCheck = [tokenA, tokenB, value, chain, seedPhrase];

  // Check if any environment variables are empty
  variablesToCheck.forEach(variable => {
    if (!variable) {
      throw new Error(`${variable} is empty`);
    }
  });

  if (value <= 0) {
    throw new Error(`Incorrect ${variable}`);
  }

  if (tokenA == tokenB) {
    throw new Error(`Input and output tokens are same`);
  }

  let network = getNetwork(chain);

  return { tokenA, tokenB, value, chain, seedPhrase, network };
}

module.exports = getInputs;
