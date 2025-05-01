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

/**
 * Global Variables
*/
let arbContract, owner, balances, network, gIndex = 0, gTokenIndex = 0;
let routerPairs = [];
let tokenPairs = [];

const main = async () => {
  network = await provider.getNetwork();

  await setup();

  log("setup", "Looking for arbitrage opportunities...");
  log("setup", `Delay: ${delay} ms`);
  while (true) {
    gIndex++;
    console.log("search", `Search for ${routerPairs.length * tokenPairs.length} paths at #${gIndex}`);
    try {
      const { rpath, tpath, amountIn, amountOut, decimals } = await search();
      if (rpath.length != 0) {
        await trade(rpath, tpath, amountIn, amountOut, decimals);
      }
    } catch (error) {
      log("search-error", error, "An error occurred");
    }

    console.log("search", `-------------------------------------------------\n`);
    await utils.sleep(delay);
  }
}

/**
 * Sub Functions 
 */
function log(type, message, subject = '') {
  console.log(`${type}:`,`${subject} => `, message);
  fs.appendFile(
    `./logs/${process.pid}-${network.name}-${type}.log`,
    `# ${utils.curr_date_time()}: ${subject} => ${JSON.stringify(message)} \n`,
    function (err) { if (err) throw err; }
  );
}

const search = async () => {
  let rpath = [], tpath = [], amountIn = 0, amountOut = 0, decimals = 0;
  try {
    // amountIn = ethers.utils.parseUnits("1.0", await tokenContract.decimals());
    if (routerPairs.length == 0 || tokenPairs.length == 0) {
      console.warn("[WARNING]: Router or Token pairs are not generated!");
      return null;
    }
    const result = await arbContract.searchArb(routerPairs, tokenPairs);

    rpath = result[0];
    tpath = result[1];
    amountIn = result[2];
    amountOut = result[3];
    decimals = result[4];
  } catch (error) {
    log("search-error", error);
  }

  if (rpath.length > 0) {
    const pNames = botlib.getProtocolNames(rpath).join(" -> ");
    const tNames = botlib.getTokenNames(tpath).join(" => ");
    let msg = `Router Path: ${pNames}` + " :: " + `Token Path: ${tNames}`;

    log("search", msg, "*** Found new arbitrage opportunity: ");
    let profitTarget = calcProfitTarget(amountIn);
    let counter = 0;
    // Search amountIn
    while (amountOut.gte(profitTarget)) {
      counter++;
      amountIn = amountIn.add(amountIn);
      profitTarget = calcProfitTarget(amountIn);
      amountOut = await arbContract.estimateCyclicArbTrade(rpath, tpath, amountIn);
    }
    if (counter > 1) {
      amountIn = amountIn.div(2);
      profitTarget = calcProfitTarget(amountIn);
      amountOut = await arbContract.estimateCyclicArbTrade(rpath, tpath, amountIn);
      log("search", `Counter=${counter} | AmountIn = ${amountIn.toString()} | AmountOut = ${amountOut.toString()} | ProfitTarget = ${profitTarget.toString()}`);
    }
  }
  return { rpath, tpath, amountIn, amountOut, decimals }
}

const calcProfitTarget = (amountIn) => {
  const multiplier = ethers.BigNumber.from(10000 + config.minBasisPointsPerTrade);
  const sizeMultiplied = amountIn.mul(multiplier);
  const divider = ethers.BigNumber.from(10000);
  const profitTarget = sizeMultiplied.div(divider);
  return profitTarget;
}

const trade = async (rpath, tpath, amountIn, amountOut, decimals) => {
  // Determine loan pool...
  // Swap
  try {
    const loanPool = pickPool(tpath[0]);

    if (loanPool == null) {
      log("trade-warning", `Loan pool doesn't exist with token ${tpath[0]}`);
      console.warn(`Loan pool doesn't exist with token ${tpath[0]}`);
      return;
    }

    const { sym, address, amount } = getLoanToken(loanPool, tpath[0]);

    const loanAmount = ethers.utils.parseUnits(String(amount), decimals);

    let tradeAmount = 0, tradeAmountOut = 0, tradeProfitTarget = 0;
    // Calculate trade amount 
    if (loanAmount.lte(amountIn.add(amountIn)) && loanAmount.gte(amountIn)) {
      tradeAmount = loanAmount;
      tradeProfitTarget = calcProfitTarget(tradeAmount);
      tradeAmountOut = await arbContract.estimateCyclicArbTrade(rpath, tpath, tradeAmount);
      if (tradeAmountOut.lt(tradeProfitTarget)) {
        tradeAmount = amountIn;
        tradeAmountOut = amountOut;
      }
    } else {
      tradeAmount = amountIn;
      tradeAmountOut = amountOut;
    }

    // 
    // log("trade", `Preparing the real trading amount for token ${sym} ${ethers.utils.formatUnits(tradeAmount, decimals)} of ${amount}...`);
    // Higher gas price (add a premium to current gas price for faster processing)
    const currentGasPrice = await provider.getGasPrice();
    const higherGasPrice = currentGasPrice.add(ethers.utils.parseUnits('10', 'gwei'));  // adding 10 Gwei for example
    const currentGasLimit = await arbContract.estimateGas.startFlashSwap(loanPool.address, tradeAmount, rpath, tpath);
    const bufferedGasLimit = Math.ceil(currentGasLimit.toNumber() * 1.2);
    // Specify transaction details
    const params = {
      gasPrice: higherGasPrice,
      gasLimit: bufferedGasLimit
    };
    let gasFee = higherGasPrice.mul(currentGasLimit);
    if (config.native.address.toLocaleLowerCase() != tpath[0].toLocaleLowerCase()) {
      gasFee = await arbContract.getAmountOutMin(rpath[0], config.native.address, tpath[0], gasFee);
    }

    tradeProfitTarget = calcProfitTarget(tradeAmount);

    if (tradeAmountOut.gte(tradeProfitTarget)) {
      if (tradeAmountOut.gt(tradeAmount.add(gasFee))) {
        const tx = await arbContract.startFlashSwap(
          loanPool.address,
          tradeAmount,
          rpath,
          tpath,
          params
        );
        const rec = await tx.wait();
        log("trade", rec, "Successfully traded!");
        log("trade-success", rec, "Successfully Traded!");
      } else {
        log("trade", `Currency: ${sym} | Trade amount: ${tradeAmount} | Gas Fee: ${gasFee} | AmountOut: ${tradeAmountOut} Proft Target: ${tradeProfitTarget}`, "** Not traded by Gas Cost");
      }
    } else {
      log("trade", `Currency: ${sym} | minPoints: ${config.minBasisPointsPerTrade} | AmountOut = ${tradeAmountOut} | ProfitTarget = ${tradeProfitTarget}`, "** Not reached to Profit Target");
    }

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
  // Generating router pairs and token pairs
  routerPairs = botlib.getValidProtocolCombinations();
  tokenPairs = botlib.getValidTokenPermutations();

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

  log("setup", "### Loading Initial balances... ###");
  balances = {};
  if (config.tokens.length == 0) {
    console.log("[ERROR]: No token is listed in the config.");
    process.exit(1);
  }
  for (let i = 0; i < config.tokens.length; i++) {
    const asset = config.tokens[i];
    const assetToken = new ethers.Contract(asset.address, tokenAbi.abi, provider);
    const balance = await assetToken.balanceOf(config.contract);
    balances[asset.address] = { sym: asset.sym, balance: balance, startBalance: balance };
  }

  const setupMsg = "\n" +
    `> Network:\n ${JSON.stringify(network)}` + "\n\n" +
    `> Router Pairs (${routerPairs.length}):\n${JSON.stringify(routerPairs)}` + "\n\n" +
    `> Token Pairs (${tokenPairs.length}):\n ${JSON.stringify(tokenPairs)}` + "\n\n"

  log("setup", setupMsg, "Environment");

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
