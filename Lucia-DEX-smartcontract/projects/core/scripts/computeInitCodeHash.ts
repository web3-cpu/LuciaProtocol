import { ethers } from 'hardhat'
import LuciaPoolArtifact from '../artifacts/contracts/LuciaPool.sol/LuciaPool.json'

const hash = ethers.utils.keccak256(LuciaPoolArtifact.bytecode)
console.log(hash)
