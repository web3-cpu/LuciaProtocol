import { tryVerify } from '@luciaswap/common/verify'
import { ContractFactory } from 'ethers'
import { ethers, network } from 'hardhat'
import fs from 'fs'

type ContractJson = { abi: any; bytecode: string }
const artifacts: { [name: string]: ContractJson } = {
  // eslint-disable-next-line global-require
  LuciaPoolDeployer: require('../artifacts/contracts/LuciaPoolDeployer.sol/LuciaPoolDeployer.json'),
  // eslint-disable-next-line global-require
  LuciaFactory: require('../artifacts/contracts/LuciaFactory.sol/LuciaFactory.json'),
}

async function main() {
  const [owner] = await ethers.getSigners()
  const networkName = network.name
  console.log('owner', owner.address)

  let luciaPoolDeployer_address = ''
  let luciaPoolDeployer
  const LuciaPoolDeployer = new ContractFactory(
    artifacts.LuciaPoolDeployer.abi,
    artifacts.LuciaPoolDeployer.bytecode,
    owner
  )
  if (!luciaPoolDeployer_address) {
    luciaPoolDeployer = await LuciaPoolDeployer.deploy()

    luciaPoolDeployer_address = luciaPoolDeployer.address
    console.log('luciaPoolDeployer', luciaPoolDeployer_address)
  } else {
    luciaPoolDeployer = new ethers.Contract(luciaPoolDeployer_address, artifacts.LuciaPoolDeployer.abi, owner)
  }

  let luciaFactory_address = ''
  let luciaFactory
  if (!luciaFactory_address) {
    const LuciaFactory = new ContractFactory(artifacts.LuciaFactory.abi, artifacts.LuciaFactory.bytecode, owner)
    luciaFactory = await LuciaFactory.deploy(luciaPoolDeployer_address)

    luciaFactory_address = luciaFactory.address
    console.log('luciaFactory', luciaFactory_address)
  } else {
    luciaFactory = new ethers.Contract(luciaFactory_address, artifacts.LuciaFactory.abi, owner)
  }

  // Set FactoryAddress for luciaPoolDeployer.
  await luciaPoolDeployer.setFactoryAddress(luciaFactory_address)

  const contracts = {
    LuciaFactory: luciaFactory_address,
    LuciaPoolDeployer: luciaPoolDeployer_address,
  }

  fs.writeFileSync(`./deployments/${networkName}.json`, JSON.stringify(contracts, null, 2))
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
