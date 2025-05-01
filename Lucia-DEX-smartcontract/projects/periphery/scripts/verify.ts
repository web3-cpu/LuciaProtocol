import { verifyContract } from '@luciaswap/common/verify'
import { sleep } from '@luciaswap/common/sleep'
import { configs } from '@luciaswap/common/config'

async function main() {
  const networkName = network.name
  const config = configs[networkName as keyof typeof configs]

  if (!config) {
    throw new Error(`No config found for network ${networkName}`)
  }
  const deployedContracts_core = await import(`@luciaswap/core/deployments/${networkName}.json`)
  const deployedContracts_periphery = await import(`@luciaswap/periphery/deployments/${networkName}.json`)

  // Verify swapRouter
  console.log('Verify swapRouter')
  await verifyContract(deployedContracts_periphery.SwapRouter, [
    deployedContracts_core.LuciaPoolDeployer,
    deployedContracts_core.LuciaFactory,
    config.WNATIVE,
  ])
  await sleep(10000)

  // Verify nonfungibleTokenPositionDescriptor
  console.log('Verify nonfungibleTokenPositionDescriptor')
  await verifyContract(deployedContracts_periphery.NonfungibleTokenPositionDescriptor)
  await sleep(10000)

  // Verify NonfungiblePositionManager
  console.log('Verify NonfungiblePositionManager')
  await verifyContract(deployedContracts_periphery.NonfungiblePositionManager, [
    deployedContracts_core.LuciaPoolDeployer,
    deployedContracts_core.LuciaFactory,
    config.WNATIVE,
    deployedContracts_periphery.NonfungibleTokenPositionDescriptor,
  ])
  await sleep(10000)

  // Verify luciaInterfaceMulticall
  console.log('Verify luciaInterfaceMulticall')
  await verifyContract(deployedContracts_periphery.LuciaInterfaceMulticall)
  await sleep(10000)

  // Verify v3Migrator
  console.log('Verify v3Migrator')
  await verifyContract(deployedContracts_periphery.V3Migrator, [
    deployedContracts_core.LuciaPoolDeployer,
    deployedContracts_core.LuciaFactory,
    config.WNATIVE,
    deployedContracts_periphery.NonfungiblePositionManager,
  ])
  await sleep(10000)

  // Verify tickLens
  console.log('Verify tickLens')
  await verifyContract(deployedContracts_periphery.TickLens)
  await sleep(10000)

  // Verify QuoterV2
  console.log('Verify QuoterV2')
  await verifyContract(deployedContracts_periphery.QuoterV2, [
    deployedContracts_core.LuciaPoolDeployer,
    deployedContracts_core.LuciaFactory,
    config.WNATIVE,
  ])
  await sleep(10000)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
