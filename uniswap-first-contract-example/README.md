# Basic Uniswap Integration Environment
Learn to build your first on chain integration here: https://uniswap.org/blog/your-first-uniswap-integration. 

## Next up

You can keep building with this environment, or clone the repo again to start fresh. To continue learning, try adding some more advanced functions:

* Build a simple front end: The provided test demonstrate how to use Javascript to interact with your contract. Can you move that logic to a Simple Swap website?
* Add an Exact Output swap function to SimpleSwap: Right now our contract takes in a quantity of WETH and swaps for the maximum amount of DAI. This new method should take in an amount of DAI and swap the correct amount of WETH to get that.
* Write a GeneralSwap contract: Our contract was hard coded to only swap WETH for DAI. Can you write a contract that can swap between any ERC-20 pairs?
* Write a Quote contract: Create a new contract that gets current prices for swaps without actually performing a swap.
* Deploy your contract to a test net: Right now your contract is only deployed on your test node, can you deploy it to a test net like Goerli?
