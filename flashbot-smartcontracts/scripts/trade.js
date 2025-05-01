const hre = require("hardhat");
const fs = require("fs");
require("dotenv").config();
const { abi } = require("../artifacts/contracts/LuciaDodoFlashSwap.sol/IERC20.json");
let config, arb, owner, inTrade, balances, gIndex = 0, gTokenIndex = 0;
const network = hre.network.name;

if (network === 'matic') config = require('../config/polygon.json');
const provider = new ethers.providers.InfuraProvider(network, process.env.INFURA_KEY);
console.log(`Loaded ${config.routes.length} routes`);

const main = async () => {
  await setup();
  await detectArbOpportunity();
}

function curr_date_time() {
  var d = new Date(),
    seconds = d.getSeconds().toString().length == 1 ? '0' + d.getSeconds() : d.getSeconds(),
    minutes = d.getMinutes().toString().length == 1 ? '0' + d.getMinutes() : d.getMinutes(),
    hours = d.getHours().toString().length == 1 ? '0' + d.getHours() : d.getHours(),
    months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return days[d.getDay()] + '-' + months[d.getMonth()] + '-' + d.getDate() + '-' + d.getFullYear() + '-' + hours + '-' + minutes + '-' + seconds;
}

function generatePermutations(arr, length) {
  if (!Array.isArray(arr) || arr.length === 0) {
    throw new Error('Input array must be a non-empty array.');
  }

  if (length <= 0 || length > arr.length) {
    throw new Error('Length should be a positive integer less than or equal to the array length.');
  }

  const result = [];
  permuteHelper([], arr, length, result);
  return result;
}

function permuteHelper(current, remaining, length, result) {
  if (current.length === length) {
    result.push([...current]);
  } else {
    for (let i = 0; i < remaining.length; i++) {
      const next = remaining.splice(i, 1)[0];
      current.push(next);
      permuteHelper(current, remaining, length, result);
      current.pop();
      remaining.splice(i, 0, next);
    }
  }
}

// Example usage:
// const inputArray = ['A', 'B', 'C', 'D', 'E', 'F'];
// const length = 2;
// const permutations = generatePermutations(inputArray, length);

// console.log(permutations.length)
// console.log(permutations);

function generateCombinationsWithDuplicates(arr, length) {
  if (!Array.isArray(arr) || arr.length === 0) {
    throw new Error('Input array must be a non-empty array.');
  }

  if (length <= 0) {
    throw new Error('Length should be a positive integer.');
  }

  const result = [];
  combineHelper([], arr, length, result);
  return result;
}

function combineHelper(current, arr, length, result) {
  if (current.length === length) {
    result.push([...current]);
    return;
  }

  for (let i = 0; i < arr.length; i++) {
    current.push(arr[i]);
    combineHelper(current, arr, length, result);
    current.pop();
  }
}

// Example usage:
// const inputArray = ['A', 'B', 'C', 'D'];
// const length = 4;
// const combinations = generateCombinationsWithDuplicates(inputArray, length);

// console.log(combinations.length);
// console.log(combinations);


function log(type, message) {
  fs.appendFile(
    `./data/${process.pid}-${network}-${type}.log`,
    `# ${curr_date_time()}: ` + message,
    function (err) { }
  );
}
const detectArbOpportunity = async () => {
  const flashLoanPool = config.flashLoanPools[0].address;
  try {
    for (j1 = 0; j1 < config.baseAssets.length; j1++) {
      const token1 = config.baseAssets[j1];
      const baseToken = new ethers.Contract(token1.address, abi, provider);
      const dec = await baseToken.decimals();

      const loanAmount = ethers.utils.parseUnits(ethers.BigNumber.from(token1.loan).toString(), dec);
      const multiplier = ethers.BigNumber.from(config.minBasisPointsPerTrade + 10000);
      const sizeMultiplied = loanAmount.mul(multiplier);
      const divider = ethers.BigNumber.from(10000);
      const profitTarget = sizeMultiplied.div(divider);

      for (j2 = 0; j2 < config.tokens.length; j2++) {
        const token2 = config.tokens[j2];
        for (j3 = 0; j3 < config.tokens.length; j3++) {
          const token3 = config.tokens[j3];
          for (j4 = 0; j4 < config.tokens.length; j4++) {
            const token4 = config.tokens[j4];
            if (token1.address == token3.address && token2.address == token3.address && token3.address == token4.address) continue;
            gTokenIndex++;

            for (i1 = 0; i1 < config.routers.length; i1++) {
              const router1 = config.routers[i1];
              for (i2 = 0; i2 < config.routers.length; i2++) {
                const router2 = config.routers[i2];
                for (i3 = 0; i3 < config.routers.length; i3++) {
                  const router3 = config.routers[i3];
                  for (i4 = 0; i4 < config.routers.length; i4++) {
                    const router4 = config.routers[i4];
                    const routers = [router1.address, router2.address, router3.address, router4.address];
                    const tokens = [token1.address, token2.address, token3.address, token4.address];
                    gIndex++;
                    let amtBack;
                    console.log(`Processing the request #${gIndex} ...`);
                    try {
                      amtBack = await arb.estimateCyclicArbTrade(routers, tokens, loanAmount);
                      if (amtBack.gt(loanAmount.mul(99).div(100))) {
                        log(
                          "scan",
                          `Parsing paths (${gTokenIndex}:${gIndex}): ` + "\n" +
                          `>> ${token1.sym}(${router1.dex}) -> ${token2.sym}(${router2.dex}) -> ${token3.sym}(${router3.dex}) -> ${token4.sym}(${router4.dex})` + "\n" +
                          `>>> Loan (${token1.sym}): ${ethers.utils.formatUnits(loanAmount, dec)} => Result: ${ethers.utils.formatUnits(amtBack, dec)}` + "\n\n"
                        );
                      }
                    } catch (error) {
                      log(
                        "scan-error",
                        `> Parsing error paths (${gTokenIndex}:${gIndex}): ` + "\n" +
                        `>> ${token1.sym}(${router1.dex}) -> ${token2.sym}(${router2.dex}) -> ${token3.sym}(${router3.dex}) -> ${token4.sym}(${router4.dex})` + "\n"
                      );
                    }
                    try {
                      if (amtBack.gt(profitTarget)) {
                        await cyclicTrade(flashLoanPool, loanAmount, routers, tokens);
                        log(
                          "trade",
                          `> Trading paths (${gTokenIndex}:${gIndex}): ` + "\n" +
                          `>> ${token1.sym}(${router1.dex}) -> ${token2.sym}(${router2.dex}) -> ${token3.sym}(${router3.dex}) -> ${token4.sym}(${router4.dex})` + "\n" +
                          `>>> Loan (${token1.sym}): ${ethers.utils.formatUnits(loanAmount, dec)} < Target: ${ethers.utils.formatUnits(profitTarget, dec)} < Result: ${ethers.utils.formatUnits(amtBack, dec)}` + "\n\n"
                        );
                      }
                    } catch (error) {
                      log(
                        "trade-error",
                        `> Trading error paths (${gTokenIndex}:${gIndex}): ` + "\n" +
                        `>> ${token1.sym}(${router1.dex}) -> ${token2.sym}(${router2.dex}) -> ${token3.sym}(${router3.dex}) -> ${token4.sym}(${router4.dex})` + "\n" +
                        `>>> Loan (${token1.sym}): ${ethers.utils.formatUnits(loanAmount, dec)} < Target: ${ethers.utils.formatUnits(profitTarget, dec)} < Result: ${ethers.utils.formatUnits(amtBack, dec)}` + "\n\n"
                      );
                    }
                  }
                }
              }
            }
          }
        }
      }
    }

    await detectArbOpportunity();
  } catch (e) {
    console.log(e);
    await detectArbOpportunity();
  }
}

const cyclicTrade = async (flashLoanPool, loanAmount, routers, tokens) => {
  if (inTrade === true) {
    await detectArbOpportunity();
    return false;
  }
  try {
    inTrade = true;
    console.log('> Making cyclicTrade...');

    const tx = await arb.connect(owner).startFlashSwap(
      flashLoanPool,
      loanAmount,
      routers,
      tokens
    );
    await tx.wait();
    inTrade = false;
    await detectArbOpportunity();
  } catch (e) {
    console.log(e);
    inTrade = false;
    await detectArbOpportunity();
  }
}

const setup = async () => {
  [owner] = await ethers.getSigners();
  console.log(`Owner: ${owner.address}`);
  const IArb = await ethers.getContractFactory('FlashCyclicSwap');
  arb = await IArb.attach(config.arbContract);
  balances = {};
  for (let i = 0; i < config.baseAssets.length; i++) {
    const asset = config.baseAssets[i];
    const assetToken = new ethers.Contract(asset.address, abi, provider);
    const balance = await assetToken.balanceOf(config.arbContract);
    const loan = asset.loan.toString();
    console.log(`${asset.sym} Loan Amount ${loan}`);
    balances[asset.address] = { sym: asset.sym, balance: balance, startBalance: balance };
  }
  setTimeout(() => {
    setInterval(() => {
      logResults();
    }, 600000);
    logResults();
  }, 120000);
}

const logResults = async () => {
  console.log(`############# LOGS #############`);
  for (let i = 0; i < config.baseAssets.length; i++) {
    const asset = config.baseAssets[i];
    //const interface = await ethers.getContractFactory('WETH9');
    const assetToken = new ethers.Contract(asset.address, abi, provider);
    balances[asset.address].balance = await assetToken.balanceOf(config.arbContract);
    const diff = balances[asset.address].balance.sub(balances[asset.address].startBalance);
    const basisPoints = balances[asset.address].startBalance.eq(0) ? 0 : diff.mul(10000).div(balances[asset.address].startBalance);
    console.log(`#  ${asset.sym}: ${basisPoints.toString()}bps`);
    log("balance", `["${asset.sym}", ${basisPoints.toString()} bps]` + "\n");
  }
}

process.on('uncaughtException', function (err) {
  console.log('UnCaught Exception 83: ' + err);
  console.error(err.stack);
  fs.appendFile('./critical.txt', err.stack, function () { });
});

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: ' + p + ' - reason: ' + reason);
});

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
