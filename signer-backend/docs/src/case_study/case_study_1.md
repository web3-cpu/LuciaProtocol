# Case Study

**author: Ling Qing Meng**  

[Contact](https://www.linkedin.com/in/ling-qing-meng-90a35552/)  

### Intro

How does one verify what a blockchain is used for? You can obviously go read blogs that compare and contrast the differences but how does one tell if those authors are correct? Well in order to be at the point of fully understanding the differences you need to be well versed in the core concepts surrounding it. 

- Consensus Algorithms
- Trustless Network
- Permissionless Network
- Supply Cap

I'm going to share how by comparing these core concept's you'll see if the claims in some new blockchain will be of merit. 

A cryptocurrency's usecase can often be deduced by the consensus algorithm. This algorithm is responsible for maintaining the global state of the network in a way that guarantees authentic transactions even if the individual actors (or nodes) are untrusted.  

[More about consensus algorithms](https://www.coindesk.com/short-guide-blockchain-consensus-protocols/)
![Marco Iansiti is a professor at the Harvard Business School, whose primary research interest is technology and economics](https://i.imgur.com/CVLttUc.png)


### Bitcoin - A Store of Value

The original cryptocurrency Bitcoin is the most recognized and perhaps even the most controversial. As the media tends have bitcoin branded as the face that represents cryptocurrencies as a whole, this tends to misinform the public. Bitcoin's primary objective is to be used as a store of value. It's commonly compared to "digital gold".  

Most people think of gold as a currency. First we need to make that clarification. Gold is a store of value, but is it a currency? Well it can be used (poorly) as a currency. It's hard to carry a lot of, it's not easy to make large transactions easily as you may need to bring an armored truck to do so safely. You would also need a scale to do it accurately. 

> Gold is an anti-fiat hedge, and is well suited to being a store of value. 

The reason is the amount of gold on Earth is finite, it's impossible to make more of it(without a neutron star black hole), and you have to spend an ever increasing amount of money to mine more of it. That fact is what allowed banks to first distribute paper currency, because if you trust the bank you can trust that they will exchange the bank notes for an equivalent amount of gold. And you knew gold had value because it is used for a few things such as jewelry, it has universal appeal. 

> Bitcoin is an anti-fiat hedge, and is well suited to being a store of value. 

You'll also see that Bitcoin has a controlled supply of 21 Million. This decreasing-supply algorithm was chosen because it approximates the rate at which commodities like gold are mined.

### Ethereum - A Resource which powers Applications on the Blockchain

I have a very unique view on Ethereum's value proposition. So if you're not familiar with Ethereum, I'd suggest you read up on it quick. [Here's a great intro guide](https://medium.com/@preethikasireddy/how-does-ethereum-work-anyway-22d1df506369)
<!--more-->
Ethereum currently has a proof of work consensus algorithm which means that it can also be used as a store of value like Bitcoin. It differs from bitcoin though because you're able to write Turing complete programs that can interact with the Blockchain on a global scale. Anyone now can program applications on the global EVM  (Ethereum Virtual Machine), and the costs of computing are supplied by a gas cost given in Ether.

Unlike Bitcoin, Ethereum does not specify that it will have a hard cap. On their [organization's website](https://blog.ethereum.org/2014/04/10/the-issuance-model-in-ethereum/) you'll see that they only guarantee that the rate of issuance will not increase. 

Terminology refresher
- Gas: The fee for interacting with the Ethereum network. This includes the transaction fee for sending Ether from A to B (just like BTC's transaction fee), the fee for invoking smart contract methods, the fee for deploying a new smart contract onto the EVM.
- Ether: The native currency of Ethereum, commonly referred as 'Eth'.
- EVM: The Ethereum virtual machine is an abstract (virtual) computer defined by a common global specification.

Now that we understand the difference's I'd like to introduce you to how I see Ethereum

> Ethereum is a commodity, a fuel that powers applications that create more efficiency, and it can also be used as a store of value. 

A common comparison can now be made, if Bitcoin is digital gold, Ethereum can be considered digital oil/gas. (Hell, it even has the name gas to represent the fee for each transaction or smart contract method invoke, which is then given to miners, thus it makes sense that both digital gold and gas are mineable just like their corporeal counterparts)

Blockchains that support Smart Contracts such as Ethereum are best suited as tools to replace marketplace inefficiencies. In this article, I refer to marketplaces as any setting that serve as a meeting ground between service providers and consumers, e.g. a website like Upwork that connects freelancers with business owners, or a website like Airbnb that connects home owners with travelers looking for accommodations. One inefficiency current marketplaces have is that there must exist a trusted third parties that facilitates not just the initial introduction between the two parties but also facilitates transactions in a way that's fair for both sides.

As Decentralized Marketplaces evolve, the role of the third party facilitator is automated freeing up costs associated with operating that platform. Now what happens is that new markets will emerge that weren't possible in the past, but with a more efficient automated marketplace the upfront costs of finding providers/consumers are lowered.

And its not only marketplaces, there are tons of 3-party systems in place today that ICO startups are looking to disrupt. A quick list would include
* Trade Finance: 3rd party financial institution oversee credit and fair payment across importers and exporters
* Shipment Brokerage: 3rd party insurance company oversee delivery safety and success across shippers and carriers.
* Retail Insurance: 3rd party retailers give insurance policy to everyday consumers for auto, home, rent, life. However those insurance companies themselves are actually require service from reinsurance companies (they insure the insurers) in the event that an extreme black swan event doesn't bankrupt the retail insurer.
* Utility: Energy companies overcharge day to day consumers on electricity to cover credit from nonpaying customers.

### Extending this Methodology

So now we can give a few examples of this method in action. 

#### Litecoin
Litecoin is a blockchain that's very similar to Bitcoin except that a few parameters are modified to allow slightly faster transaction times and cost. We can then concldue that it's primary functionality is to indeed be a store of value (secondary to Bitcoin).    

#### Hyperledger Fabric
Hyperledger is a blockchain tailored for enterprise (B2B) use. It's similar to Ethereum in that is has turing complete smart contracts. It's difference is that there's no concept of mining and thus there's no tradeable currency involved. This is an important point to consider if you're choosing the best technology for an application, many people worry about what happens if the price of Ethereum crashes, well I say what happens if the price of Ethereum skyrockets? How does one handle a 10x increase in gas cost for say a high frequency trading application? 

#### Oracles
This cryptocurrency uses a Proof of Authority consensus algorithm. In many applications built ontop of Smart Contracts there's no solution that can perfectly defend against malicious actors either trying to exploit individual transactions or compromise the network as a whole. Oracles recognizes the need for manual verification (as provided by a licensed Notary Public) and allows the most straightforward support for having manual validators. 


### Tags



```
---
title: Defining a crypto currency's usecase
date: 2017-11-27 23:19:50
thumbnail: https://i.imgur.com/CVLttUc.png
tags:
- Ethereum
- Tokens
- Blockchain
category: "Concepts"
author: Ling Qing Meng
featured: true
---
```



