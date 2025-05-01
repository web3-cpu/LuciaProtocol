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
const config = require(settings.config_path);
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
const pathNum = routerPairs.length * tokenPairs.length;
const chunk = config.chunk == 0 ? 1 : Math.floor(config.chunk / tokenPairs.length) * tokenPairs.length;
const limit = config.limit;

log("setup", "Looking for arbitrage opportunities...");
log("setup", `Delay: ${delay} ms`);
log("setup", `Total number of Paths: ${pathNum}`);
log("setup", `Chunk size: ${chunk}`);
log("setup", `Maximum number of arbitrage opportunities per chunk: ${limit}`);

/**
 * Global Variables
*/
let arbContract, balances, gIndex = 0;
let decimals = {}, symbols = {}, protocols = {}, basisAmounts = {};
let provider, wallet, signer, network;

const main = async () => {
  try {
    await setup();
    await worker();
  } catch (error) {
    log("error", error, "Main Level");
    await setup();
    await worker();
  }
}

const worker = async () => {
  while (true) {
    try {
      gIndex++;
      log("search", `# Search for ${pathNum} paths at #${gIndex}`);
      for (let i = 0; i < pathNum; i += chunk) {
        console.log(`## ${utils.curr_date_time()} ------------------ Index by Chunk:`, i);
        await search(i, chunk, limit);
        await utils.sleep(delay);
      }
      log("search", `# ${utils.curr_date_time()} ------------------------------------------------------`);
    } catch (error) {
      log("error", error, "Worker Level");
    }
    await utils.sleep(delay);
  }
}

/**
 * Sub Functions 
 */

const setup = async () => {

  log("setup", "### Checking the environment... ###");
  log("setup", ["> Config: ", config]);
  log("setup", ["> ABI of logic contract: ", logicAbi.abi]);
  log("setup", ["> ABI of token contract: ", tokenAbi.abi]);

  if (settings.provider_http != "") {
    provider = new ethers.providers.JsonRpcProvider(`${settings.provider_http}${process.env.PROVIDER_KEY}/`);
  } else if (settings.provider_wss != "") {
    provider = new ethers.providers.WebSocketProvider(`${settings.provider_wss}${process.env.PROVIDER_KEY}/`);
  } else {
    provider = new ethers.providers.JsonRpcProvider(`${settings.provider_uri}${process.env.PROVIDER_KEY}/`);
  }
  wallet = new ethers.Wallet(process.env.WALLET_PRIVATE_KEY, provider);
  signer = provider.getSigner();
  network = await provider.getNetwork();

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
    basisAmounts[asset.address] = !asset.basisAmount ? config.basisAmount : asset.basisAmount;
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
        const rnames = botlib.getProtocolNames(rpath);
        const tnames = botlib.getTokenNames(tpath);
        const initAmount = parseUnits(basisAmounts[tpath[0]], decimals[tpath[0]]);

        log("search", `${i} out of ${arbCount}`, "Checking Profitable Opportunity...");
        log("search", rnames.join('->'), "- Router Path");
        log("search", tnames.join('->'), "- Token  Path");
        log("search", `${formatUnits(initAmount, decimals[tpath[0]])} ${symbols[tpath[0]]}`, "- Basis Amount");

        const [isValid, tAmountIn, tAmountOut, tProfitTarget, gasInfo] = await checkProfit(rpath, tpath, initAmount);
        if (isValid) {
          // Process trading immediately
          await trade(rpath, tpath, tAmountIn, tAmountOut, tProfitTarget, gasInfo);
        }
      }
    }
    log("search", `${arbCount} opportunities in ${chunk} Chunks and ${limit} at #${start}`, "End partial search for");
  } catch (error) {
    log("search-error", error);
    log("search-error", `${arbCount} opportunities in ${chunk} Chunks and ${limit} at #${start}`);
  }

}

const checkProfit = async (rpath, tpath, initAmount) => {

  try {
    let counter = 0;
    // let gasInfo = await estimateGas(rpath, tpath, initAmount);
    // if (!gasInfo) {
    //   return [false, 0, 0, 0, null];
    // }

    let amountIn = initAmount;
    let amountOut = await arbContract.estimateCyclicArbTrade(rpath, tpath, amountIn);
    let profitTarget = calcProfitTarget(amountIn);

    // Search amountIn
    let prevAmountIn, prevAmountOut, prevProfitTarget, prevGasInfo;

    while (amountOut.gte(profitTarget)) {
      prevAmountIn = amountIn;
      prevAmountOut = amountOut;
      prevProfitTarget = profitTarget;

      counter++;
      amountIn = amountIn.mul(config.multiplier);
      profitTarget = calcProfitTarget(amountIn);
      amountOut = await arbContract.estimateCyclicArbTrade(rpath, tpath, amountIn);

    }

    let gasInfo = null, isValid = false;
    if (counter > 0) {
      amountIn = prevAmountIn;
      amountOut = prevAmountOut;
      profitTarget = prevProfitTarget;
      gasInfo = await estimateGas(rpath, tpath, amountIn);
      if (gasInfo) {
        if (amountOut.gte(profitTarget.add(gasInfo.gasFeeInToken))) isValid = true;
        else isValid = false;
      }
    }
    const dec = decimals[tpath[0]];
    log("search", `Counter=${counter} || ${symbols[tpath[0]]} : AmountIn = ${formatUnits(amountIn, dec)} `
      + `| AmountOut = ${formatUnits(amountOut, dec)} | ProfitTarget = ${formatUnits(profitTarget, dec)}`,
      "-- Estimated Indexes");
    if (gasInfo)
      log("search", `${formatUnits(gasInfo.gasFee, decimals[config.native.sym])} ${config.native.sym}` +
        ` (=${formatUnits(gasInfo.gasFeeInToken, decimals[tpath[0]])} ${symbols[tpath[0]]})`, "-- Estimated Gas");
    else {
      if (counter > 0)
        log("search", `Can not estimate it by transaction reverted`, `-- Estimated Gas`);
      else
        log("search", `Not estimated by unreachable profit target`, `-- Estimated Gas`);
    }

    return [isValid, amountIn, amountOut, profitTarget, gasInfo];
  } catch (error) {
    log("search-error", error, "Checking Profit...");
    return [false, 0, 0, 0, null];
  }
}

const estimateGas = async (rpath, tpath, amountIn) => {
  const loanPool = pickPool(tpath[0]);
  if (loanPool == null) {
    log("search", `Loan pool doesn't exist with token ${tpath[0]}`, 'Checking Gas Cost...');
    return null;
  }
  const gasInfo = await getGasOption(loanPool.address, rpath, tpath, amountIn);
  return gasInfo;
}

const calcProfitTarget = (amountIn) => {
  const multiplier = ethers.BigNumber.from(10000 + config.minBasisPointsPerTrade);
  const sizeMultiplied = amountIn.mul(multiplier);
  const divider = ethers.BigNumber.from(10000);
  const profitTarget = sizeMultiplied.div(divider);
  return profitTarget;
}

const getGasOption = async (poolAddress, rpath, tpath, amountIn) => {
  try {
    const currentGasPrice = await provider.getGasPrice();
    const higherGasPrice = currentGasPrice.add(parseUnits('10', 'gwei'));  // adding 10 Gwei for example
    const currentGasLimit = await arbContract.estimateGas.startFlashSwap(poolAddress, amountIn, rpath, tpath);
    const bufferedGasLimit = Math.ceil(currentGasLimit.toNumber() * 1.1);
    // Specify transaction details
    const gasOption = {
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
    return { gasOption, gasFee, gasFeeInToken };

  } catch (error) {
    log("search-error", error.message, "Getting gas option");
    return null;
  }
}
const trade = async (rpath, tpath, tAmountIn, tAmountOut, tProfit, gasInfo) => {
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
      gasInfo.gasOption
    );
    const rnames = botlib.getProtocolNames(rpath);
    const tnames = botlib.getTokenNames(tpath);
    log("trade", rnames.join("->"), "Router Path");
    log("trade", tnames.join("->"), "Token Path");
    log("trade", `Currency: ${tnames[0]} | In Trade: ${tAmountIn} | Expected Out: ${tAmountOut} | Proft Target: ${tProfit}`, "Sucessful Trade");
    log("trade", `Gas Used: ${formatUnits(gasInfo.gasFee, decimals[config.native.sym])} ${config.native.sym}` +
      ` (=${formatUnits(gasInfo.gasFeeInToken, decimals[tpath[0]])} ${symbols[tpath[0]]})`, "Successful Trade");
  } catch (error) {
    log("trade-error", error);
    console.error(error);
  }
}

const formatUnits = (val, dec) => {
  return ethers.utils.formatUnits(val, dec);
}
const parseUnits = (val, dec) => {
  return ethers.utils.parseUnits(val.toString(), dec);
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

function log(type, message, subject = '') {
  if (settings.log && settings.log.console == true)
    console.log(`${type}:`, `${subject} => `, message);
  if (settings.log && settings.log.file == true)
    fs.appendFile(
      `${__dirname}/logs/${process.pid}-${type}.log`,
      `# ${utils.curr_date_time()}: ${subject} => ${JSON.stringify(message)}` + "\n",
      function (err) { if (err) throw err; }
    );
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
