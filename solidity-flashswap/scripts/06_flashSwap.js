const { Contract } = require("ethers")

// Uniswap contract address
WETH_ADDRESS= '0x746a48E39dC57Ff14B872B8979E20efE5E5100B1'
FACTORY_ADDRESS= '0x96E303b6D807c0824E83f954784e2d6f3614f167'
SWAP_ROUTER_ADDRESS= '0x9CC8B5379C40E24F374cd55973c138fff83ed214'
NFT_DESCRIPTOR_ADDRESS= '0xd3b893cd083f07Fe371c1a87393576e7B01C52C6'
POSITION_DESCRIPTOR_ADDRESS= '0x3BFbbf82657577668144921b96aAb72BC170646C'
POSITION_MANAGER_ADDRESS= '0x930b218f3e63eE452c13561057a8d5E61367d5b7'

// Token addresses
TETHER_ADDRESS= '0x04d7478fDF318C3C22cECE62Da9D78ff94807D77';
USDC_ADDRESS= '0xd9abC93F81394Bd161a1b24B03518e0a570bDEAd';

const WETH9 = require("../WETH9.json")
const artifacts = {
  UniswapV3Factory: require("@uniswap/v3-core/artifacts/contracts/UniswapV3Factory.sol/UniswapV3Factory.json"),
  SwapRouter: require("@uniswap/v3-periphery/artifacts/contracts/SwapRouter.sol/SwapRouter.json"),
  NFTDescriptor: require("@uniswap/v3-periphery/artifacts/contracts/libraries/NFTDescriptor.sol/NFTDescriptor.json"),
  NonfungibleTokenPositionDescriptor: require("@uniswap/v3-periphery/artifacts/contracts/NonfungibleTokenPositionDescriptor.sol/NonfungibleTokenPositionDescriptor.json"),
  NonfungiblePositionManager: require("@uniswap/v3-periphery/artifacts/contracts/NonfungiblePositionManager.sol/NonfungiblePositionManager.json"),
  Usdt: require("../artifacts/contracts/Tether.sol/Tether.json"),
  Usdc: require("../artifacts/contracts/UsdCoin.sol/UsdCoin.json"),
  WETH9,
};

const toEth = (wei) => ethers.utils.formatEther(wei)

async function main() {
  const provider = waffle.provider;
  const [owner, signer2] = await ethers.getSigners();

  Flash = await ethers.getContractFactory('PairFlash', signer2);
  flash = await Flash.deploy(SWAP_ROUTER_ADDRESS, FACTORY_ADDRESS, WETH_ADDRESS);
  console.log('flash', flash.address)

  const usdtContract = new Contract(TETHER_ADDRESS,artifacts.Usdt.abi,provider)
  const usdcContract = new Contract(USDC_ADDRESS,artifacts.Usdc.abi,provider)

  let usdtBalance = await usdtContract.connect(provider).balanceOf(signer2.address)
  let usdcBalance = await usdcContract.connect(provider).balanceOf(signer2.address)
  console.log('-------------------- BEFORE')
  console.log('usdtBalance', toEth(usdtBalance.toString()))
  console.log('usdcBalance', toEth(usdcBalance.toString()))
  console.log('--------------------')

  const tx = await flash.connect(signer2).initFlash(
    [
      TETHER_ADDRESS,
      USDC_ADDRESS,
      500,
      ethers.utils.parseEther('1'),
      ethers.utils.parseEther('1'),
      3000,
      10000
    ],
    { gasLimit: ethers.utils.hexlify(1000000) }
  );
  await tx.wait()

  usdtBalance = await usdtContract.connect(provider).balanceOf(signer2.address)
  usdcBalance = await usdcContract.connect(provider).balanceOf(signer2.address)
  console.log('-------------------- AFTER')
  console.log('usdtBalance', toEth(usdtBalance.toString()))
  console.log('usdcBalance', toEth(usdcBalance.toString()))
  console.log('--------------------')
}

/*
npx hardhat run --network localhost scripts/06_flashSwap.js
*/

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });