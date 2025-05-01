require("dotenv").config();
const { ethers } = require("ethers");
const { aaveABI } = require("./src/networkInfo");

async function getEventInBatches() {
  const provider = new ethers.AlchemyProvider("matic", process.env.ID);
  //  const provider = new ethers.JsonRpcProvider(
  //    "https://api.avax.network/ext/bc/C/rpc"
  //  );
  const address = "0x794a61358d6845594f94dc1db02a252b5b4814ad";

  const contract = new ethers.Contract(address, aaveABI, provider);

  const filter = {
    address: address,
    topics: [
      ethers.id(
        "LiquidationCall(address,address,address,uint256,uint256,address,bool)"
      ),
    ],
    fromBlock: 0,
    toBlock: 40566224,
  };

  const logs = await provider.getLogs(filter);

  // logs.forEach((log) => {
  // const parsedLog = contract.interface.parseLog(log);
  // const borrower = parsedLog.args[3];
  // const liquidatedFundsInUsd = parsedLog.args[4];

  /* first check if borrower address as key exist already
   * if user does add liquidated amount and increase liquidated
   * count with 1 else create a new data with borrower address
   * as key and liquidated amount and liquidated count(1) as value
   */
  // });
}

getEventInBatches();
