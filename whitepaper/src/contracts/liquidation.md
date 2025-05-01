# Liquidation

In order to maintain supply, 


## Cash Advances

There will be a penalty to use cash advances. Let's say the current collateralization ratio is 99%. You have 3 borrowers

```
Alice   3  ETH
Bob     99 ETH
Barley  99 ETH
Brian   99 ETH
```

Let's say Bob, Barley and Brian all attempt to cash advance 100 ETH. The balance of the protocol is now 0. Alice had 3 ETH but ended up with 0. 

In order to stop this from happening. There must be a cash advance limit. 


## Payment Processing

Rate limiting for small transactions is what will make this protocol idea. 


## Liquidation Threshold

This is how things currently work in Aave

```
User A  --$100 of ETH-->  Pool
User B  <-$80 of USD---   ⬡
```


The goal is for investors so that they won't lose money. Selling collateral happens automatically 