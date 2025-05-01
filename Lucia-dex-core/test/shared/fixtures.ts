import { BigNumber } from 'ethers'
import { ethers } from 'hardhat'
import { MockTimeLuciaPool } from '../../typechain/MockTimeLuciaPool'
import { TestERC20 } from '../../typechain/TestERC20'
import { LuciaFactory } from '../../typechain/LuciaFactory'
import { TestLuciaCallee } from '../../typechain/TestLuciaCallee'
import { TestLuciaRouter } from '../../typechain/TestLuciaRouter'
import { MockTimeLuciaPoolDeployer } from '../../typechain/MockTimeLuciaPoolDeployer'

import { Fixture } from 'ethereum-waffle'

interface FactoryFixture {
  factory: LuciaFactory
}

async function factoryFixture(): Promise<FactoryFixture> {
  const factoryFactory = await ethers.getContractFactory('LuciaFactory')
  const factory = (await factoryFactory.deploy()) as LuciaFactory
  return { factory }
}

interface TokensFixture {
  token0: TestERC20
  token1: TestERC20
  token2: TestERC20
}

async function tokensFixture(): Promise<TokensFixture> {
  const tokenFactory = await ethers.getContractFactory('TestERC20')
  const tokenA = (await tokenFactory.deploy(BigNumber.from(2).pow(255))) as TestERC20
  const tokenB = (await tokenFactory.deploy(BigNumber.from(2).pow(255))) as TestERC20
  const tokenC = (await tokenFactory.deploy(BigNumber.from(2).pow(255))) as TestERC20

  const [token0, token1, token2] = [tokenA, tokenB, tokenC].sort((tokenA, tokenB) =>
    tokenA.address.toLowerCase() < tokenB.address.toLowerCase() ? -1 : 1
  )

  return { token0, token1, token2 }
}

type TokensAndFactoryFixture = FactoryFixture & TokensFixture

interface PoolFixture extends TokensAndFactoryFixture {
  swapTargetCallee: TestLuciaCallee
  swapTargetRouter: TestLuciaRouter
  createPool(
    fee: number,
    tickSpacing: number,
    firstToken?: TestERC20,
    secondToken?: TestERC20
  ): Promise<MockTimeLuciaPool>
}

// Monday, October 5, 2020 9:00:00 AM GMT-05:00
export const TEST_POOL_START_TIME = 1601906400

export const poolFixture: Fixture<PoolFixture> = async function (): Promise<PoolFixture> {
  const { factory } = await factoryFixture()
  const { token0, token1, token2 } = await tokensFixture()

  const MockTimeLuciaPoolDeployerFactory = await ethers.getContractFactory('MockTimeLuciaPoolDeployer')
  const MockTimeLuciaPoolFactory = await ethers.getContractFactory('MockTimeLuciaPool')

  const calleeContractFactory = await ethers.getContractFactory('TestLuciaCallee')
  const routerContractFactory = await ethers.getContractFactory('TestLuciaRouter')

  const swapTargetCallee = (await calleeContractFactory.deploy()) as TestLuciaCallee
  const swapTargetRouter = (await routerContractFactory.deploy()) as TestLuciaRouter

  return {
    token0,
    token1,
    token2,
    factory,
    swapTargetCallee,
    swapTargetRouter,
    createPool: async (fee, tickSpacing, firstToken = token0, secondToken = token1) => {
      const mockTimePoolDeployer = (await MockTimeLuciaPoolDeployerFactory.deploy()) as MockTimeLuciaPoolDeployer
      const tx = await mockTimePoolDeployer.deploy(
        factory.address,
        firstToken.address,
        secondToken.address,
        fee,
        tickSpacing
      )

      const receipt = await tx.wait()
      const poolAddress = receipt.events?.[0].args?.pool as string
      return MockTimeLuciaPoolFactory.attach(poolAddress) as MockTimeLuciaPool
    },
  }
}
