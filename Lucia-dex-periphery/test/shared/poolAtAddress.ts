import { abi as POOL_ABI } from '@lucia/v3-core/artifacts/contracts/LuciaPool.sol/LuciaPool.json'
import { Contract, Wallet } from 'ethers'
import { ILuciaPool } from '../../typechain'

export default function poolAtAddress(address: string, wallet: Wallet): ILuciaPool {
  return new Contract(address, POOL_ABI, wallet) as ILuciaPool
}
