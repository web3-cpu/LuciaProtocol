require("dotenv").config();
const { ethers } = require("ethers");
const {
  aaveABI,
  compoundABI,
  aaveV3NetworkInfo,
  compoundNetworkInfo,
} = require("./networkInfo");

async function getData(networkArray, abi, protocol) {
  for (let i = 0; i < networkArray.length; i++) {
    const provider = new ethers.AlchemyProvider(
      networkArray[i].network,
      process.env.ID
    );

    const contract = new ethers.Contract(
      networkArray[i].address,
      abi,
      provider
    );

    let filter;

    if (protocol == "compoundV3") {
      filter = contract.filters.AbsorbCollateral();
    } else if (protocol == "aaveV3") {
      filter = contract.filters.LiquidationCall();
    }

    const eventLog = await contract.queryFilter(filter, 0);

    // Todo
    // create DB to store the data gotten below.
    // for (let i = 0; i < eventLog.length; i++) {
    //   const borrower = eventLog[i].args[1];
    //   const liquidatedFundsInUsd = eventLog[i].args[4] / 1e8;

    /* first check if borrower address as key exist already
     * if user does add liquidated amount and increase liquidated
     * count with 1 else create a new data with borrower address
     * as key and liquidated amount and liquidated count(1) as value
     */
    // }
  }
}

getData(aaveV3NetworkInfo, aaveABI, "aaveV3");
getData(compoundNetworkInfo, compoundABI, "compoundV3");
