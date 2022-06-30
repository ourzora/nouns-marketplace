import { useCallback, useEffect, useMemo, useState } from 'react'
import { useBaseERC20 } from './useBaseERC20'
import { BigNumber } from '@ethersproject/bignumber'
import { AddressZero } from '@ethersproject/constants'
import useAsyncEffect from './useAsyncEffect'
import { useAuth } from './useAuth'
import { usePrevious } from './usePrevious'
import { useInterval } from '@shared/hooks/useInterval'
import { isAddressMatch } from '../utils/validators'

export function useCurrencyBalance(
  tokenAddress?: string,
  amountRequired?: string
): [BigNumber | undefined, boolean, () => Promise<void>] {
  const { user: account, provider, signer } = useAuth()
  const [balance, setBalance] = useState<BigNumber | undefined>()
  const previousAddress = usePrevious(tokenAddress)
  const contract = useBaseERC20(tokenAddress, signer || undefined)

  const fetchAndUpdateBalance = useCallback(async () => {
    if (!account || !account.address) {
      return
    }
    if (tokenAddress && isAddressMatch(tokenAddress, AddressZero)) {
      const balance = await provider.getBalance(account?.address)
      setBalance(balance)
      return
    } else {
      const balance = await contract?.balanceOf(account?.address)
      setBalance(balance)
    }
  }, [account, contract, provider, tokenAddress])

  useInterval(async () => {
    await fetchAndUpdateBalance()
  }, 15000)

  useAsyncEffect(async () => {
    if (!balance) {
      await fetchAndUpdateBalance()
    }
  }, [balance, contract])

  useEffect(() => {
    if (previousAddress !== tokenAddress) {
      setBalance(undefined)
    }
  }, [balance, previousAddress, tokenAddress])

  const hasRequiredAmount = useMemo(() => {
    if (!balance || !amountRequired) {
      return false
    }
    return balance.gte(amountRequired)
  }, [amountRequired, balance])

  return [balance, hasRequiredAmount, fetchAndUpdateBalance]
}
