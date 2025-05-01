import { ethers, network } from 'hardhat'
import { configs } from '@luciaswap/common/config'
import { tryVerify } from '@luciaswap/common/verify'
import fs from 'fs'
import { abi } from '@luciaswap/core/artifacts/contracts/LuciaFactory.sol/LuciaFactory.json'

import { parseEther } from 'ethers/lib/utils'
const currentNetwork = network.name

async function main() {
  const [owner] = await ethers.getSigners()
  // Remember to update the init code hash in SC for different chains before deploying
  const networkName = network.name
  const config = configs[networkName as keyof typeof configs]
  if (!config) {
    throw new Error(`No config found for network ${networkName}`)
  }

  const v3DeployedContracts = await import(`@luciaswap/core/deployments/${networkName}.json`)
  const mcV3DeployedContracts = await import(`@luciaswap/masterchef/deployments/${networkName}.json`)

  const luciaFactory_address = v3DeployedContracts.LuciaFactory

  const LuciaLmPoolDeployer = await ethers.getContractFactory('LuciaLmPoolDeployer')
  const luciaLmPoolDeployer = await LuciaLmPoolDeployer.deploy(mcV3DeployedContracts.MasterChef)

  console.log('luciaLmPoolDeployer deployed to:', luciaLmPoolDeployer.address)
  console.log('luciaFactory_address: ', luciaFactory_address)
  const luciaFactory = new ethers.Contract(luciaFactory_address, abi, owner)
  console.log('setting')
  await luciaFactory.setLmPoolDeployer(luciaLmPoolDeployer.address)
  console.log('setted')
  const contracts = {
    LuciaLmPoolDeployer: luciaLmPoolDeployer.address,
  }
  fs.writeFileSync(`./deployments/${networkName}.json`, JSON.stringify(contracts, null, 2))
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
