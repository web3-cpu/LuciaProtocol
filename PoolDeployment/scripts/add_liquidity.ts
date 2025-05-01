const { ethers } = require('ethers');
const { Pool } = require('@uniswap/v3-sdk');
const { NonfungiblePositionManager } = require('@uniswap/v3-periphery');
// Replace with your Infura or Ethereum RPC URL
const provider = new ethers.providers.JsonRpcProvider('YOUR_INFURA_URL');
// Your Ethereum wallet's private key
const privateKey = process.env.PRIVAKE_KEY;
const wallet = new ethers.Wallet(privateKey, provider);
// Address of the Uniswap V3 NFT position manager
const positionManagerAddress = '0xC36442b4a4522E871399CD717aBDD847Ab11FE88';
const positionManager = new NonfungiblePositionManager(
    positionManagerAddress,
    wallet
);
async function createLiquidityPosition() {
    // Specify your token and pool details
    const token0 = '0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889';
    const token1 = '0x295353Dc0861688950A4b4C2956e80E1408ACA7b';
    const fee = '3000'; // 0.3% fee tier
    const tickLower = '-5000'; // Lower tick range
    const tickUpper = '5000'; // Upper tick range
    const amount0Desired = ethers.utils.parseEther('100'); // Amount of token0 to provide
    const amount1Desired = ethers.utils.parseEther('200'); // Amount of token1 to provide
    const nonce = await positionManager.getNonce(wallet.address);
    const tx = await positionManager.connect(wallet).createAndInitializePosition({
        tokenId: nonce.toHexString(),
        fee,
        tickLower,
        tickUpper,
        amount0Desired,
        amount1Desired,
        amount0Min: 0,
        amount1Min: 0,
        recipient: wallet.address,
        deadline: Math.floor(Date.now() / 1000) + 600, // 10-minute deadline
    });
    await tx.wait();
    console.log('Liquidity position created!');
}