import { network } from 'hardhat'
import { verifyContract } from '@luciaswap/common/verify'
import { sleep } from '@luciaswap/common/sleep'

async function main() {
  const networkName = network.name
  const deployedContracts = await import(`@luciaswap/core/deployments/${networkName}.json`)

  // Verify LuciaPoolDeployer
  console.log('Verify LuciaPoolDeployer')
  await verifyContract(deployedContracts.LuciaPoolDeployer)
  await sleep(10000)

  // Verify luciaFactory
  console.log('Verify luciaFactory')
  await verifyContract(deployedContracts.LuciaFactory, [deployedContracts.LuciaPoolDeployer])
  await sleep(10000)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
