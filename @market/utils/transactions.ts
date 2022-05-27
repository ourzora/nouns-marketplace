import { BigNumber, BigNumberish } from '@ethersproject/bignumber'
import { MaxUint256 } from '@ethersproject/constants'
import { Wallet } from '@ethersproject/wallet'
import { BaseErc20Factory } from '@zoralabs/core/dist/typechain'
import { Signer } from 'ethers'
import { NETWORK_CHAIN_ID } from './connectors'

export enum WalletCallStatus {
  INITIAL = 'INITIAL',
  PROMPTED = 'PROMPTED',
  CONFIRMING = 'CONFIRMING',
  CONFIRMED = 'CONFIRMED',
  ERRORED = 'ERRORED',
}

export const ETHERSCAN_BASE_URL =
  NETWORK_CHAIN_ID === 1 ? 'https://etherscan.io' : 'https://rinkeby.etherscan.io'

export function calculateGasMargin(value: BigNumber): BigNumber {
  return value
    .mul(BigNumber.from(10000).add(BigNumber.from(1000)))
    .div(BigNumber.from(10000))
}

export async function approveToken(
  wallet: Wallet | Signer,
  address: string,
  spender: string,
  amount: BigNumberish = MaxUint256
) {
  let useExact = false
  const tokenContract = BaseErc20Factory.connect(address, wallet)

  const estimatedGas = await tokenContract.estimateGas
    .approve(spender, MaxUint256)
    .catch(() => {
      useExact = true
      return tokenContract.estimateGas.approve(spender, amount)
    })

  return tokenContract.approve(spender, useExact ? amount : MaxUint256, {
    gasLimit: calculateGasMargin(estimatedGas),
  })
}
