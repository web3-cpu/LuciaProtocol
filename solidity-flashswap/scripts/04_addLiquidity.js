// Uniswap contract addresses
WETH_ADDRESS= '0x746a48E39dC57Ff14B872B8979E20efE5E5100B1'
FACTORY_ADDRESS= '0x96E303b6D807c0824E83f954784e2d6f3614f167'
SWAP_ROUTER_ADDRESS= '0x9CC8B5379C40E24F374cd55973c138fff83ed214'
NFT_DESCRIPTOR_ADDRESS= '0xd3b893cd083f07Fe371c1a87393576e7B01C52C6'
POSITION_DESCRIPTOR_ADDRESS= '0x3BFbbf82657577668144921b96aAb72BC170646C'
POSITION_MANAGER_ADDRESS= '0x930b218f3e63eE452c13561057a8d5E61367d5b7'

// Pool addresses
USDT_USDC_500= '0x62641cea5B767B24832231BDFcc02B93622cF271'
USDT_USDC_3000= '0x76d940283D0cD804C3Bcf31DaD6095048570D022'
USDT_USDC_10000= '0x78c68936D55914E1aa45Fc1CD6dCaEda99820982'

// Token addresses
TETHER_ADDRESS= '0x04d7478fDF318C3C22cECE62Da9D78ff94807D77'
USDC_ADDRESS= '0xd9abC93F81394Bd161a1b24B03518e0a570bDEAd'

const artifacts = {
  NonfungiblePositionManager: require("@uniswap/v3-periphery/artifacts/contracts/NonfungiblePositionManager.sol/NonfungiblePositionManager.json"),
  Usdt: require("../artifacts/contracts/Tether.sol/Tether.json"),
  Usdc: require("../artifacts/contracts/UsdCoin.sol/UsdCoin.json"),
  UniswapV3Pool: require("@uniswap/v3-core/artifacts/contracts/UniswapV3Pool.sol/UniswapV3Pool.json"),
};

const { Contract } = require("ethers")
const { Token } = require('@uniswap/sdk-core')
const { Pool, Position, nearestUsableTick } = require('@uniswap/v3-sdk')

async function getPoolData(poolContract) {
  const [tickSpacing, fee, liquidity, slot0] = await Promise.all([
    poolContract.tickSpacing(),
    poolContract.fee(),
    poolContract.liquidity(),
    poolContract.slot0(),
  ])

  return {
    tickSpacing: tickSpacing,
    fee: fee,
    liquidity: liquidity,
    sqrtPriceX96: slot0[0],
    tick: slot0[1],
  }
}

LIQUIDITY = ethers.utils.parseEther('100')
DEADLINE = Math.floor(Date.now() / 1000) + (60 * 10)
POOL_ADDRESSES = [USDT_USDC_500, USDT_USDC_3000, USDT_USDC_10000] // ,


async function main() {
  const [owner, signer2] = await ethers.getSigners();
  const provider = waffle.provider;

  const nonfungiblePositionManager = new Contract(
    POSITION_MANAGER_ADDRESS,
    artifacts.NonfungiblePositionManager.abi,
    provider
  )
  const usdtContract = new Contract(TETHER_ADDRESS,artifacts.Usdt.abi,provider)
  const usdcContract = new Contract(USDC_ADDRESS,artifacts.Usdc.abi,provider)

  await usdtContract.connect(owner).approve(POSITION_MANAGER_ADDRESS, ethers.utils.parseEther('9999999'))
  await usdcContract.connect(owner).approve(POSITION_MANAGER_ADDRESS, ethers.utils.parseEther('9999999'))

  const UsdtToken = new Token(31337, TETHER_ADDRESS, 18, 'USDT', 'Tether')
  const UsdcToken = new Token(31337, USDC_ADDRESS, 18, 'USDC', 'UsdCoin')

  const poolContract1 = new Contract(USDT_USDC_500, artifacts.UniswapV3Pool.abi, provider)
  const poolContract2 = new Contract(USDT_USDC_3000, artifacts.UniswapV3Pool.abi, provider)
  const poolContract3 = new Contract(USDT_USDC_10000, artifacts.UniswapV3Pool.abi, provider)

  const poolData = {}
  poolData[USDT_USDC_500] = await getPoolData(poolContract1)
  poolData[USDT_USDC_3000] = await getPoolData(poolContract2)
  poolData[USDT_USDC_10000] = await getPoolData(poolContract3)

  // appears I cannot interact with contracts in the async map
  const mintParams = {}
  POOL_ADDRESSES.map(async poolAddress => {
    pd = poolData[poolAddress]

    const poolObj = new Pool(
      UsdtToken,
      UsdcToken,
      pd.fee,
      pd.sqrtPriceX96.toString(),
      pd.liquidity.toString(),
      pd.tick
    )

    const tickLower = nearestUsableTick(pd.tick, pd.tickSpacing) - pd.tickSpacing * 100
    const tickUpper = nearestUsableTick(pd.tick, pd.tickSpacing) + pd.tickSpacing * 100

    const positionObj = new Position({
      pool: poolObj,
      liquidity: LIQUIDITY,
      tickLower: tickLower,
      tickUpper: tickUpper,
    })

    const { amount0: amount0Desired, amount1: amount1Desired} = positionObj.mintAmounts
    const params = {
      token0: TETHER_ADDRESS,
      token1: USDC_ADDRESS,
      fee: pd.fee,
      tickLower: tickLower,
      tickUpper: tickUpper,
      amount0Desired: amount0Desired.toString(),
      amount1Desired: amount1Desired.toString(),
      amount0Min: 0,
      amount1Min: 0,
      recipient: signer2.address,
      deadline: DEADLINE
    }

    mintParams[poolAddress] = params
  })

  const tx1 = await nonfungiblePositionManager.connect(owner).mint(mintParams[USDT_USDC_500], { gasLimit: '1000000' })
  await tx1.wait()

  const tx2 = await nonfungiblePositionManager.connect(owner).mint(mintParams[USDT_USDC_3000], { gasLimit: '1000000' })
  await tx2.wait()

  const tx3 = await nonfungiblePositionManager.connect(owner).mint(mintParams[USDT_USDC_10000], { gasLimit: '1000000' })
  await tx3.wait()
  console.log('done')
}

/*
npx hardhat run --network localhost scripts/04_addLiquidity.js
*/

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });