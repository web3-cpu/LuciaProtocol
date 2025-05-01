# cex-to-dex
Centralized Exchange price feed

## How to use

Assumptions: You already have a Kraken API key and a Kraken private key  

> If not, generate those on Kraken before continuing further   

Copy `.env.example` to into a `.env` file

Put the Kraken keys in the `.env` file 

Start with command

```zsh
node index.js
```

### Expected behavior 

Test the route 

```zsh
curl localhost:3000/
```

you should see price information in the terminal logs

## Vision

Primary features   
* Query a number of centralized exchanges
* Create histogram views
* Perform calculations for arbitrage opportunities that span both CEX's and DEX's

## Design

The JSON model for storing time-series data for a cryptocurrency exchange should be designed to efficiently represent each data point, typically consisting of a timestamp, price, volume, and other relevant information. Here's a simplified JSON model for this purpose:

```json
{
  "exchange": "Exchange Name",
  "pair": "Trading Pair",
  "timestamp": 1636323600,  // Unix timestamp
  "open": 60000.00,         // Opening price
  "high": 60500.00,         // Highest price
  "low": 59800.00,          // Lowest price
  "close": 60250.00,        // Closing price
  "volume": 1000.0         // Trading volume
}
```


### Explanation of the JSON model:

- `"exchange"`: Represents the name of the cryptocurrency exchange.
- `"pair"`: Denotes the trading pair (e.g., BTC/USD, ETH/BTC).
- `"timestamp"`: Stores the timestamp of the data point, typically in Unix timestamp format. It represents the time at which the data was recorded.
- `"open"`: Records the opening price of the cryptocurrency for the given time period (e.g., opening price in the last hour).
- `"high"`: Captures the highest price during the time period.
- `"low"`: Stores the lowest price during the time period.
- `"close"`: Represents the closing price at the end of the time period.
- `"volume"`: Records the trading volume during the time period (e.g., the total volume of trades in the last hour).


### Assets that are intersecting on Kraken and UniV3

* SNX: Uni has Synthetix on Polygon, Kraken has Synthetix on Ethereum L1
* LINK: Uni has Chainlink on Polygon, Kraken has Chainlink on Ethereum L1
* AAVE: Uni has Aave on Polygon, Kraken has Aaave on Ethereum L1


### Current list of Todos

- [ ] Query Kraken
- [ ] Venn Diagram

# Implementation

Use this model for capturing timeseries data until prometheus is in place

```json
[
    {
        "timestamp": "2023-11-15T08:00:00Z",
        "data": {
            "temperature": 25,
            "humidity": 60,
            "pressure": 1015
        }
    },
    {
        "timestamp": "2023-11-15T08:15:00Z",
        "data": {
            "temperature": 28,
            "humidity": 58,
            "pressure": 1014
        }
    }
]

```

Will we need to do 


## Misc

### Average transaction fees as of Nov 6th 2023

* $11.89
* $10.49
* $10.46
* $12.24
* $8.93
* $11.31
* $5.14
* $5.89





