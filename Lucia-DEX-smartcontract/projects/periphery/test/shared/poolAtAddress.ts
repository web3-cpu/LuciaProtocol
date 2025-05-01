import { abi as POOL_ABI } from '@luciaswap/core/artifacts/contracts/LuciaPool.sol/LuciaPool.json'
import { Contract, Wallet } from 'ethers'
import { ILuciaPool } from '../../typechain-types'

export default function poolAtAddress(address: string, wallet: Wallet): ILuciaPool {
  return new Contract(address, POOL_ABI, wallet) as ILuciaPool
}
