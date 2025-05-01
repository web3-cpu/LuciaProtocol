# Install the dependencies
````
npm install
````

# Setup the .env file

Add the .env file at the root of the project and add the below variables in it

````
CYPRESS_TOKEN_A=
CYPRESS_TOKEN_B=
CYPRESS_VALUE=
CYPRESS_CHAIN=
CYPRESS_SEED_PHRASE=
````

## Environment variable options 

### Note
All environment variables must be assigned values for the tests to work correctly.

#### Input and Output Token
The input and output token variables require the contract address of the token (deployed on the selected chain) except when using ETH as for having input/output token as ETH, you can simple use ETH as the value. 

##### Manta (Mainnet)

````
LCI: 0x9169b17072c87b318d0DF76C17159DbD0A270c6E
WETH: 0x0Dc808adcE2099A9F62AA87D9670745AbA741746
````

##### Manta (Testnet)

````
LCI: 0x91cB120A15f3cA53A6232f9f6EEFD7e3D678a8C8
WPWR: 0x609CCF7C0080495993F6f70e83cE1486b6fe3D19
````

###### Polygon Mumbai

````
LCI: 0x5af9580cb5Cb8231e46d530E1815AaF7bD643Ae1
WPWR: 0x67733EAC8c97562A742CBE19Bf1e8076FB2BD836
````

###### PWRChain (Testnet)

````
LCI: 0x2AF85Ec4ae658C14738d6306094E9CD5E81f7947
WPWR: 0x37132496B0Ba8eB28434ecb77bF7F7c268893C35
````

#### Value

The value can be anything between 1 and the total value that the wallet address contains. It is the no. of tokens you plan to swap to get the output token.

#### Chain

1. manta
2. mantaTestnet
3. mumbai
4. powerTestnet

#### Seed phrase

The seed phrase is the secret phrase of the wallet that you intend to use in the test. For example, to use the following seed phrase, you can assign it to the variable like this

````
CYPRESS_SEED_PHRASE=test test test test test test test test test test test test
````

# Run the test

## Test E2E

#### Linux | MacOS
````
npm run test:e2e
````

#### Windows
````
npm run test:e2e-windows
````

## Liquidity Pool

#### Linux | MacOS
````
npm run test:liquidity
````

#### Windows
````
npm run test:liquidity-windows
````

## Swap

#### Linux | MacOS
````
npm run test:swap
````

#### Windows
````
npm run test:swap-windows
````