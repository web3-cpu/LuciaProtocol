/**
 * Packages
 */
const { ethers } = require('ethers');
const fs = require("fs");
require("dotenv").config();

/**
 * Local libraries
 */
const utils = require("./lib/utils");
const botlib = require("./lib/botlib");

/**
 * Global Constants
 */
const settings = require('./configs/settings.json');
const { join } = require('path');
const config = require(settings.config_path);
const provider = new ethers.providers.WebSocketProvider(`${settings.provider_uri}${process.env.PROVIDER_KEY}/`);
const wallet = new ethers.Wallet(process.env.WALLET_PRIVATE_KEY, provider);
const signer = provider.getSigner();
const delay = 1000 * config.loopDelay;
/**
 * ABIs
 * IERC, ArbSwap
 */
const tokenAbi = require(settings.abi_paths.token);
const logicAbi = require(settings.abi_paths.logic);
// Generating router pairs and token pairs
const routerPairs = botlib.getValidProtocolCombinations();
const tokenPairs = botlib.getValidTokenPermutations();

/**
 * Global Variables
*/
let arbContract, balances, network, gIndex = 0;
let decimals = {}, symbols = {}, protocols = {}; 

const main = async () => {
  network = await provider.getNetwork();

  await setup();

  const pathNum = routerPairs.length * tokenPairs.length;
  const chunk = config.chunk == 0 ? 1 : Math.floor(config.chunk / tokenPairs.length) * tokenPairs.length;
  const limit = config.limit;
  log("setup", "Looking for arbitrage opportunities...");
  log("setup", `Delay: ${delay} ms`);
  log("setup", `Total number of Paths: ${pathNum}`);
  log("setup", `Chunk size: ${chunk}`);
  log("setup", `Maximum number of arbitrage opportunities per chunk: ${limit}`);

  while (true) {
    gIndex++;
    log("search", `# Search for ${pathNum} paths at #${gIndex}`);
    for (let i = 0; i < pathNum; i += chunk) {
      console.log(`## ${utils.curr_date_time()} ------------------ Index by Chunk:`, i);
      await search(i, chunk, limit);
    }
    log("search", `# ${utils.curr_date_time()} ------------------------------------------------------`);
    await utils.sleep(delay);
  }
}

/**
 * Sub Functions 
 */
function log(type, message, subject = '') {
  if (settings.log && settings.log.console == true)
    console.log(`${type}:`, `${subject} => `, message);
  if (settings.log && settings.log.file == true)
    fs.appendFile(
      `./logs/${process.pid}-${network.name}-${type}.log`,
      `# ${utils.curr_date_time()}: ${subject} => ${JSON.stringify(message)}` + "\n",
      function (err) { if (err) throw err; }
    );
}

const search = async (start, chunk, limit) => {
  let rpaths = [], tpaths = [], arbCount = 0;
  try {
    // amountIn = ethers.utils.parseUnits("1.0", await tokenContract.decimals());
    if (routerPairs.length == 0 || tokenPairs.length == 0) {
      console.warn("[WARNING]: Router or Token pairs are not generated!");
      return null;
    }
    const result = await arbContract.searchArb(routerPairs, tokenPairs, start, chunk, limit);

    rpaths = result[0];
    tpaths = result[1];
    arbCount = result[2];
    log("search", `${arbCount} opportunities in ${chunk} Chunks and Max ${limit} opportunities at #${start}`, "Starting partial search for ");
    if (arbCount > 0) {
      for (let i = 0; i < arbCount; i++) {
        const rIndex = rpaths[i] - 1;
        const tIndex = tpaths[i] - 1;
        const rpath = routerPairs[rIndex];
        const tpath = tokenPairs[tIndex];

        const initAmount = ethers.utils.parseUnits("0.0001", decimals[tpath[0]]);

        const [isPTValid, ptAmountIn, ptAmountOut, ptProfitTarget] = await checkProfitTarget(rpath, tpath, initAmount);
        if (isPTValid) {
          const [isGasValid, tAmountIn, tAmountOut, tProfit, params, gasFee, gasFeeInToken] = await checkGasCost(rpath, tpath, ptAmountIn, ptAmountOut, ptProfitTarget);
          if (isGasValid) {
            // Process trading immediately
            await trade(rpath, tpath, tAmountIn, tAmountOut, tProfit, params, gasFee, gasFeeInToken);
          }
        }
      }
    }
    log("search", `${arbCount} opportunities in ${chunk} Chunks and ${limit} at #${start}`, "End partial search for");
  } catch (error) {
    log("search-error", error);
    log("search-error", `${arbCount} opportunities in ${chunk} Chunks and ${limit} at #${start}`);
  }

}

const checkProfitTarget = async (rpath, tpath, initAmount) => {

  log("search", '',"Checking Profit Target...");
  let counter = 0;
  let amountIn = initAmount;
  let amountOut = await arbContract.estimateCyclicArbTrade(rpath, tpath, amountIn);
  let profitTarget = calcProfitTarget(amountIn);
  // Search amountIn
  while (amountOut.gte(profitTarget)) {
    counter++;
    amountIn = amountIn.add(amountIn);
    profitTarget = calcProfitTarget(amountIn);
    amountOut = await arbContract.estimateCyclicArbTrade(rpath, tpath, amountIn);
  }
  if (counter > 0) {
    amountIn = amountIn.div(2);
    profitTarget = calcProfitTarget(amountIn);
    amountOut = await arbContract.estimateCyclicArbTrade(rpath, tpath, amountIn);
    const pNames = botlib.getProtocolNames(rpath).join(" -> ");
    const tNames = botlib.getTokenNames(tpath).join(" => ");
    let msg = `${tNames} at ${pNames}`;
    log("search", msg, "- Path")
    const dec = decimals[tpath[0]];
    log("search", `Counter=${counter - 1} | Token: ${symbols[tpath[0]]} :=> AmountIn = ${ethers.utils.formatUnits(amountIn, dec)} | AmountOut = ${ethers.utils.formatUnits(amountOut, dec)} | ProfitTarget = ${ethers.utils.formatUnits(profitTarget, dec)}`, "- Expected");
    return [true, amountIn, amountOut, profitTarget];
  } else {
    return [false, amountIn, amountOut, profitTarget];
  }
}

const checkGasCost = async (rpath, tpath, amountIn, amountOut, profitTarget) => {
  const loanPool = pickPool(tpath[0]);
  if (loanPool == null) {
    log("search", `Loan pool doesn't exist with token ${tpath[0]}`, 'Checking Gas Cost...');
    return;
  }
  const { sym, address, amount } = getLoanToken(loanPool, tpath[0]);
  const loanAmount = ethers.utils.parseUnits(String(amount), decimals[tpath[0]]);
  let tradeAmountIn = 0, tradeAmountOut = 0, tradeProfitTarget = 0;
  // Calculate trade amount 
  if (loanAmount.lte(amountIn.add(amountIn)) && loanAmount.gte(amountIn)) {
    tradeAmountIn = loanAmount;
    tradeProfitTarget = calcProfitTarget(tradeAmountIn);
    tradeAmountOut = await arbContract.estimateCyclicArbTrade(rpath, tpath, tradeAmountIn);
    if (tradeAmountOut.lt(tradeProfitTarget)) {
      tradeAmountIn = amountIn;
      tradeAmountOut = amountOut;
      tradeProfitTarget = profitTarget;
    }
  } else {
    tradeAmountIn = amountIn;
    tradeAmountOut = amountOut;
    tradeProfitTarget = profitTarget;
  }
  const [params, gasFee, gasFeeInToken] = await getGasOption(loanPool.address, rpath, tpath, tradeAmountIn);
  if (!params)
    return [false, tradeAmountIn, tradeAmountOut, tradeProfitTarget, null, null, null];
  if (tradeAmountOut.gt(tradeAmountIn.add(gasFeeInToken))) {
    log("search", `Gas Cost is covered: Currency: ${sym}, GasInToken: ${ethers.utils.formatUnits(gasFeeInToken, decimals[tpath[0]])}`, 'Checking Gas Cost...');
    return [true, tradeAmountIn, tradeAmountOut, tradeProfitTarget, params, gasFee, gasFeeInToken];
  } else {
    return [false, tradeAmountIn, tradeAmountOut, tradeProfitTarget, params, gasFee, gasFeeInToken];
  }
}

const calcProfitTarget = (amountIn) => {
  const multiplier = ethers.BigNumber.from(10000 + config.minBasisPointsPerTrade);
  const sizeMultiplied = amountIn.mul(multiplier);
  const divider = ethers.BigNumber.from(10000);
  const profitTarget = sizeMultiplied.div(divider);
  return profitTarget;
}
// const getDecimals = async (tokenAddress) => {
//   const tokenContract = getTokenContract(tokenAddress);
//   const dec = await tokenContract.decimals();
//   return dec;
// }
const getTokenContract = (address) => {
  return new ethers.Contract(address, tokenAbi.abi, provider);
}
const getGasOption = async (poolAddress, rpath, tpath, amountIn) => {
  try {
    const currentGasPrice = await provider.getGasPrice();
    const higherGasPrice = currentGasPrice.add(ethers.utils.parseUnits('10', 'gwei'));  // adding 10 Gwei for example
    const currentGasLimit = await arbContract.estimateGas.startFlashSwap(poolAddress, amountIn, rpath, tpath);
    const bufferedGasLimit = Math.ceil(currentGasLimit.toNumber() * 1.1);
    // Specify transaction details
    const params = {
      gasPrice: higherGasPrice,
      gasLimit: bufferedGasLimit
    };
    let gasFeeInToken = 0;
    let gasFee = higherGasPrice.mul(bufferedGasLimit);
    if (config.native.address.toLocaleLowerCase() != tpath[0].toLocaleLowerCase()) {
      gasFeeInToken = await arbContract.getAmountOutMin(rpath[0], config.native.address, tpath[0], gasFee);
    } else {
      gasFeeInToken = gasFee;
    }
    return [params, gasFee, gasFeeInToken];

  } catch (error) {
    log("search-error", [error.message, botlib.getProtocolNames(rpath), botlib.getTokenNames(tpath)], "Getting gas option... Swap may not be possible");
    return [null, null, null];
  }
}
const trade = async (rpath, tpath, tAmountIn, tAmountOut, tProfit, params, gasFee, gasFeeInToken) => {
  const loanPool = pickPool(tpath[0]);
  if (loanPool == null) {
    log("trade", `Loan pool doesn't exist with token ${tpath[0]}`, 'Trading');
    return;
  }
  try {
    const tx = await arbContract.startFlashSwap(
      loanPool.address,
      tAmountIn,
      rpath,
      tpath,
      params
    );
    const rnames = botlib.getProtocolNames(rpath);
    const tnames = botlib.getTokenNames(tpath);
    log("trade-success", rnames.join("->"), "Router Path");
    log("trade-success", tnames.join("->"), "Token Path");
    log("trade-success", `Currency: ${tnames[0]} | In Trade: ${tAmountIn} | Expected Out: ${tAmountOut} | Proft Target: ${tProfit} | gasFee: ${gasFeeInToken}`)
    // const rec = await tx.wait();
    // } else {
    // log("trade", `Currency: ${sym} | Trade amount: ${tradeAmount} | Gas Fee: ${gasFee} | AmountOut: ${tradeAmountOut} Proft Target: ${tradeProfitTarget}`, "** Not traded by Gas Cost");
    // }
    // } else {
    // log("trade", `Currency: ${sym} | minPoints: ${config.minBasisPointsPerTrade} | AmountOut = ${tradeAmountOut} | ProfitTarget = ${tradeProfitTarget}`, "** Not reached to Profit Target");
    // }

  } catch (error) {
    log("trade-error", error);
    console.error(error);
  }
}

const pickPool = (tokenAddress) => {
  const poolsWithToken = config.loanPools.filter(pool =>
    pool.pair.some(token => token.address.toLowerCase() === tokenAddress.toLowerCase())
  );

  if (poolsWithToken.length > 0) {
    return poolsWithToken[0];
  } else {
    console.log(`No pools found containing token with address ${address}.`);
  }
  return null;
  // // Example usage:
  // const tokenAddress = "0x2791bca1f2de4661ed88a30c99a7a9449aa84174";
  // pickPool(tokenAddress);
}

const getLoanToken = (pool, tokenAddress) => {
  const token = pool.pair.find(t => t.address.toLowerCase() === tokenAddress.toLowerCase());

  if (token) {
    return { sym: token.sym, address: token.address, amount: token.amount };
  } else {
    return null;
  }
}

const setup = async () => {

  log("setup", "### Checking the environment... ###");
  log("setup", `> Owner: ${wallet.address}`);
  log("setup", ["> Config: ", config]);
  log("setup", ["> ABI of logic contract: ", logicAbi.abi]);
  log("setup", ["> ABI of token contract: ", tokenAbi.abi]);

  arbContract = new ethers.Contract(config.contract, logicAbi.abi, wallet);

  if (arbContract.address.toLocaleLowerCase() != config.contract.toLocaleLowerCase()) {
    console.log("The arbitrage smart contract was not deployed properly.");
    process.exit(1);
  } else {
    console.log("### Testing the smart contract interaction ###");
    const rpath = routerPairs[7];
    const tpath = tokenPairs[0];
    const amount = 1000000;
    const testRes = await arbContract.estimateCyclicArbTrade(rpath, tpath, amount);
    const pNames = botlib.getProtocolNames(rpath).join(" -> ");
    const tNames = botlib.getTokenNames(tpath).join(" => ");
    console.log("Test Router Path: ", pNames);
    console.log("Test Token Path: ", tNames);
    console.log("Test AmountIn = %s  AmountOut = %s", ethers.utils.formatEther(amount), ethers.utils.formatEther(testRes));

    console.log("### Testing to pick pool from the first token ###");
    const loanPool = pickPool(tpath[0]);
    if (loanPool == null) {
      console.warn(`Loan pool doesn't exist with token ${tpath[0]}`);
    } else {
      const loanToken = getLoanToken(loanPool, tpath[0]);
      console.log(`Test Pool: ${loanPool.name} | Token: ${loanToken.sym}, Address: ${loanToken.address}, Loan: ${loanToken.amount} `);
    }
  }

  log("setup", "### Initializing mapping values ###");
  balances = {};
  decimals = {};

  if (config.tokens.length == 0) {
    console.log("[ERROR]: No token is listed in the config.");
    process.exit(1);
  }
  for (let i = 0; i < config.tokens.length; i++) {
    const asset = config.tokens[i];
    const assetToken = new ethers.Contract(asset.address, tokenAbi.abi, provider);
    const balance = await assetToken.balanceOf(config.contract);
    balances[asset.address] = { sym: asset.sym, balance: balance, startBalance: balance };
    decimals[asset.address] = await assetToken.decimals();
    symbols[asset.address] = asset.sym;
  }

  for (let i = 0; i < config.protocols.length; i++) {
    const p = config.protocols[i];
    protocols[p.router] = `${p.name} V${p.version}`;
  }

  const setupMsg = "\n" +
    `> Network:\n ${JSON.stringify(network)}` + "\n\n" +
    `> Router Pairs (${routerPairs.length}):\n${JSON.stringify(routerPairs)}` + "\n\n" +
    `> Token Pairs (${tokenPairs.length}):\n ${JSON.stringify(tokenPairs)}` + "\n\n"

  log("setup", network, "Network");
  log("setup", routerPairs, `Router Pairs (${routerPairs.length})`);
  log("setup", tokenPairs, `Token Pairs (${tokenPairs.length})`);

  setTimeout(() => {
    setInterval(() => {
      logResults();
    }, 600000);
    logResults();
  }, 120000);
}

const logResults = async () => {
  console.log(`############# LOGS #############`);
  for (let i = 0; i < config.tokens.length; i++) {
    const asset = config.tokens[i];
    //const interface = await ethers.getContractFactory('WETH9');
    const assetToken = new ethers.Contract(asset.address, tokenAbi.abi, provider);
    balances[asset.address].balance = await assetToken.balanceOf(config.contract);
    const diff = balances[asset.address].balance.sub(balances[asset.address].startBalance);
    const basisPoints = balances[asset.address].startBalance.eq(0) ? 0 : diff.mul(10000).div(balances[asset.address].startBalance);
    log("balance", `["${asset.sym}", ${basisPoints.toString()} bps]` + "\n");
  }
}

process.on('uncaughtException', function (err) {
  log("critical", err.stack);
});

process.on('unhandledRejection', (reason, p) => {
  log("exception", 'Unhandled Rejection at: ' + JSON.stringify(p) + ' - reason: ' + reason);
});

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
