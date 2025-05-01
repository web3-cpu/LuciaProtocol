# LuciaSwap

This repository contains the core smart contracts for the LuciaSwap Protocol.
For higher level contracts, see the [periphery](../periphery/)
repository.

## Local deployment

In order to deploy this code to a local testnet, you should install the npm package
`@luciaswap/core`
and import the factory bytecode located at
`@luciaswap/core/artifacts/contracts/LuciaFactory.sol/LuciaFactory.json`.
For example:

```typescript
import {
  abi as FACTORY_ABI,
  bytecode as FACTORY_BYTECODE,
} from '@luciaswap/core/artifacts/contracts/LuciaFactory.sol/LuciaFactory.json'

// deploy the bytecode
```

This will ensure that you are testing against the same bytecode that is deployed to
mainnet and public testnets, and all LuciaSwap code will correctly interoperate with
your local deployment.

## Using solidity interfaces

The LuciaSwap interfaces are available for import into solidity smart contracts
via the npm artifact `@luciaswap/core`, e.g.:

```solidity
import '@luciaswap/core/contracts/interfaces/ILuciaPool.sol';

contract MyContract {
  ILuciaPool pool;

  function doSomethingWithPool() {
    // pool.swap(...);
  }
}
```
