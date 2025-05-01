require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

/**
 * @type import('hardhat/config').HardhatUserConfig
 */


const ETH_PRIVATE_KEY = process.env.ETH_PRIVATE_KEY;
const GOERLI_PRIVATE_KEY = process.env.GOERLI_PRIVATE_KEY;
const FANTOM_PRIVATE_KEY = process.env.FANTOM_PRIVATE_KEY;


module.exports = {
    networks: {
        hardhat: {
            forking: {
                url: process.env.POLYGON_URL,
                blockNumber: 46107170
            }
        },
        matic: {
            url: process.env.POLYGON_URL,
            accounts: [ETH_PRIVATE_KEY],
            // gasPrice: 35000000000,
            // saveDeployments: true,
        }
    },
    solidity: {
        compilers: [
            { version: "0.8.7" },
            { version: "0.7.6" },
            { version: "0.6.6" }
        ]
    },
};
