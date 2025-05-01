// Scope of this file: given an input of addresses return name (ticker) and symbol 
const axios = require('axios');
require('dotenv').config();
const ethers = require('ethers');
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;
const POLYGONSCAN_API_KEY = process.env.POLYGONSCAN_API_KEY;
const HTTPS_URL = process.env.HTTPS_URL;
const MATIC_HTTPS_URL = process.env.MATIC_HTTPS_URL;


const getBlockExplorerUrl = (network,tokenAddress) => {
  let base = '';
  let apiKey = '';
  if (network === 'POLYGON') {
    base = `https://api.polygonscan.com/`
    apiKey = POLYGONSCAN_API_KEY;
  } else if (network === 'ETHEREUM') {
    base = `https://api.etherscan.io/`
    apiKey = ETHERSCAN_API_KEY;
  }
  let queryString = `api?module=contract&action=getabi&address=${tokenAddress}&apikey=${apiKey}`;
  return base + queryString;
}


/**
 * @param network {string} - Must be either 'POLYGON' or 'ETHEREUM'
 * @param tokenAddress {string} - Must be a erc20 address
 */
const getAbi = async (network,tokenAddress) => {
  let layer_url;
  if (typeof network == 'undefined') {
    throw new Error('Network must be type string');
  } else if (network === 'POLYGON') {
    layer_url = getBlockExplorerUrl(network,tokenAddress);
  } else if (network === 'ETHEREUM') {
    layer_url = getBlockExplorerUrl(network,tokenAddress);
  } else {
    throw new Error('Network type not supported');
  }
  const res = await axios.get(layer_url);
  return JSON.parse(res.data.result); 
}

/**
 * @param network {object} - Object of json format
 */
function checkIfProxy(ABI) {
  if (JSON.stringify(ABI).includes('proxyOwner') && JSON.stringify(ABI).includes('proxyType')){
    return true;
  } 
  return false;
}

/**
 * @param network {string} - Must be either 'POLYGON' or 'ETHEREUM'
 * @param tokenAddress {string} - Must be a erc20 address
 */
const lookupNameAndSymbol = async (network, tokenAddress) => {
  const ethProvider = new ethers.providers.JsonRpcProvider(HTTPS_URL);
  const polygonProvider = new ethers.providers.JsonRpcProvider(MATIC_HTTPS_URL);
  let provider = network === 'ETHEREUM' ? ethProvider : polygonProvider; // should add error checking
  const ABI = await getAbi(network,tokenAddress);
  const isProxy = checkIfProxy(ABI);
  const testToken = new ethers.Contract(tokenAddress, ABI, provider);
  if (isProxy) {
    let impl = await testToken.implementation();
    let result = await lookupNameAndSymbol(network, impl);
    return result;
  }
  const name = await testToken.name();
  const symbol = await testToken.symbol();
  return {
  	name,
  	symbol
  }
}

module.exports = {
  lookupNameAndSymbol
}
