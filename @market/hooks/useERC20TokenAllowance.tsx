import { BigNumberish } from '@ethersproject/bignumber'
import { MaxUint256 } from '@ethersproject/constants'
import { ContractTransaction } from '@ethersproject/contracts'
import { BaseErc20Factory } from '@zoralabs/core/dist/typechain'
import { useAuth } from './useAuth'
import { useMemo } from 'react'
import useSWR from 'swr'
import { defaultProvider } from '../utils/connectors'
import { calculateGasMargin } from '../utils/transactions'

export function useERC20TokenAllowance(
  erc20TokenAddress: string,
  contractToApprove: string,
  requiredAllowance: BigNumberish = MaxUint256
) {
  const { address: owner, signer } = useAuth()
  const tokenContract = BaseErc20Factory.connect(
    erc20TokenAddress,
    signer || defaultProvider
  )

  const {
    data: allowance,
    error,
    ...rest
  } = useSWR(
    owner ? ['fetchCurrencyAllowance', owner, contractToApprove] : null,
    (_, owner, spender) => tokenContract.allowance(owner, spender)
  )

  async function approve(): Promise<ContractTransaction> {
    if (!tokenContract) {
      throw new Error('No Contract Address provided')
    }

    let useExact = false

    const estimatedGas = await tokenContract.estimateGas
      .approve(contractToApprove, MaxUint256)
      .catch(() => {
        useExact = true
        return tokenContract.estimateGas.approve(contractToApprove, requiredAllowance)
      })

    return tokenContract.approve(
      contractToApprove,
      useExact ? requiredAllowance : MaxUint256,
      {
        gasLimit: calculateGasMargin(estimatedGas),
      }
    )
  }

  const approved = useMemo(
    () => allowance && allowance.gte(requiredAllowance),
    [allowance, requiredAllowance]
  )

  return {
    loading: typeof allowance === 'undefined',
    approved,
    approve,
    allowance,
    ...rest,
  }
}
