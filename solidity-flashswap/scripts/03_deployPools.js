// Token addresses
TETHER_ADDRESS= '0x04d7478fDF318C3C22cECE62Da9D78ff94807D77';
USDC_ADDRESS= '0xd9abC93F81394Bd161a1b24B03518e0a570bDEAd';

// Uniswap contract address
WETH_ADDRESS= '0x746a48E39dC57Ff14B872B8979E20efE5E5100B1'
FACTORY_ADDRESS= '0x96E303b6D807c0824E83f954784e2d6f3614f167'
SWAP_ROUTER_ADDRESS= '0x9CC8B5379C40E24F374cd55973c138fff83ed214'
NFT_DESCRIPTOR_ADDRESS= '0xd3b893cd083f07Fe371c1a87393576e7B01C52C6'
POSITION_DESCRIPTOR_ADDRESS= '0x3BFbbf82657577668144921b96aAb72BC170646C'
POSITION_MANAGER_ADDRESS= '0x930b218f3e63eE452c13561057a8d5E61367d5b7'

const artifacts = {
  UniswapV3Factory: require("@uniswap/v3-core/artifacts/contracts/UniswapV3Factory.sol/UniswapV3Factory.json"),
  NonfungiblePositionManager: require("@uniswap/v3-periphery/artifacts/contracts/NonfungiblePositionManager.sol/NonfungiblePositionManager.json"),
};

const { Contract, BigNumber } = require("ethers")
const bn = require('bignumber.js')
bn.config({ EXPONENTIAL_AT: 999999, DECIMAL_PLACES: 40 })

const provider = waffle.provider;

function encodePriceSqrt(reserve1, reserve0) {
  return BigNumber.from(
    new bn(reserve1.toString())
      .div(reserve0.toString())
      .sqrt()
      .multipliedBy(new bn(2).pow(96))
      .integerValue(3)
      .toString()
  )
}

const nonfungiblePositionManager = new Contract(
  POSITION_MANAGER_ADDRESS,
  artifacts.NonfungiblePositionManager.abi,
  provider
)
const factory = new Contract(
  FACTORY_ADDRESS,
  artifacts.UniswapV3Factory.abi,
  provider
)

async function deployPool(token0, token1, fee, price) {
  const [owner] = await ethers.getSigners();
  await nonfungiblePositionManager.connect(owner).createAndInitializePoolIfNecessary(
    token0,
    token1,
    fee,
    price,
    { gasLimit: 5000000 }
  )
  const poolAddress = await factory.connect(owner).getPool(
    token0,
    token1,
    fee,
  )
  return poolAddress
}


async function main() {
  const usdtUsdc500 = await deployPool(TETHER_ADDRESS, USDC_ADDRESS, 500, encodePriceSqrt(1, 1))
  const usdtUsdc3000 = await deployPool(TETHER_ADDRESS, USDC_ADDRESS, 3000, encodePriceSqrt(1, 2))
  const usdtUsdc10000 = await deployPool(TETHER_ADDRESS, USDC_ADDRESS, 10000, encodePriceSqrt(2, 1))

  console.log('USDT_USDC_500=', `'${usdtUsdc500}'`)
  console.log('USDT_USDC_3000=', `'${usdtUsdc3000}'`)
  console.log('USDT_USDC_10000=', `'${usdtUsdc10000}'`)
}

/*
npx hardhat run --network localhost scripts/03_deployPools.js
*/

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
