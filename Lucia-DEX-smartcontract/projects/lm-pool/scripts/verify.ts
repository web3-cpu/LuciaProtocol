import { network } from 'hardhat'
import { verifyContract } from '@luciaswap/common/verify'
import { sleep } from '@luciaswap/common/sleep'
import { configs } from '@luciaswap/common/config'

async function main() {
  const networkName = network.name
  const config = configs[networkName as keyof typeof configs]

  if (!config) {
    throw new Error(`No config found for network ${networkName}`)
  }
  const deployedContracts_masterchef = await import(`@luciaswap/masterchef/deployments/${networkName}.json`)
  const deployedContracts_lm_pool = await import(`@luciaswap/lm-pool/deployments/${networkName}.json`)

  // Verify luciaLmPoolDeployer
  console.log('Verify luciaLmPoolDeployer')
  await verifyContract(deployedContracts_lm_pool.LuciaLmPoolDeployer, [deployedContracts_masterchef.MasterChef])
  await sleep(10000)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
