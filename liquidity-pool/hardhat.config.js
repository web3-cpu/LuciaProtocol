require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

/**
 * @type import('hardhat/config').HardhatUserConfig
 */


const ETH_PRIVATE_KEY = process.env.ETH_PRIVATE_KEY;
const GOERLI_PRIVATE_KEY = process.env.GOERLI_PRIVATE_KEY;



module.exports = {
    networks: {
        hardhat: {
            forking: {
                url: "https://eth-mainnet.g.alchemy.com/v2/hawfJJMQo6wK1wwUZ0ooKkFgJo5msFC9"
            }
        },
        testnet: {
            url: "https://eth-goerli.g.alchemy.com/v2/6HWzIeLTOo7dw6Trg3WJxJJ5yJ1MghxU",
            chainId: 5,
            accounts: [GOERLI_PRIVATE_KEY]
        },
        mainnet: {
            url: "https://eth-mainnet.g.alchemy.com/v2/hawfJJMQo6wK1wwUZ0ooKkFgJo5msFC9",
            chainId: 1,
            accounts: [ETH_PRIVATE_KEY]
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
