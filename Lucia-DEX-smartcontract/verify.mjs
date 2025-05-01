#!/usr/bin/env zx
// import 'zx/globals'

const networks = {
  pwrTestnet: 'pwrTestnet',
}

let network = 'pwrTestnet'
console.log(network, 'network')
if (!network || !networks[network]) {
  throw new Error(`env NETWORK: ${network}`)
}

await $`yarn workspace @luciaswap/core run hardhat run scripts/verify.ts --network ${network}`

await $`yarn workspace @luciaswap/periphery run hardhat run scripts/verify.ts --network ${network}`

await $`yarn workspace @luciaswap/smart-router run hardhat run scripts/verify.ts --network ${network}`

await $`yarn workspace @luciaswap/masterchef run hardhat run scripts/verify.ts --network ${network}`

await $`yarn workspace @luciaswap/lm-pool run hardhat run scripts/verify.ts --network ${network}`

console.log(chalk.blue('Done!'))
