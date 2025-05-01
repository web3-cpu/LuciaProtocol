# Lucia DEX Core Contracts


## How to deploy

### Assume starting state

1. Fresh install of Ubuntu
2. node version 18
3. npm version 9.6.7
4. npx installed
5. You have a .env file with the following variables:

```
INFURA_API_KEY=
ETHERSCAN_API_KEY=
```


### Run

1. `npm install --only=dev`
2. `cd contracts` ensure the contracts are in there 
3. `cd ..` then `npx hardhat compile`

Expected success condition

<img width="548" alt="image" src="https://github.com/user-attachments/assets/b008a748-7ea4-42b7-b17e-56bd3f5a9079">



## How to test

### On Sepolia

`npx hardhat test --network sepolia`

### On Local

In a new terminal tab

`npx hardhat node`

Then in your original tab

`npx hardhat test --network localhost`

Currently we can expect 80% of the tests to pass. The failures may be due to the time it takes to sync blocks on local. Further investigation is needed. 