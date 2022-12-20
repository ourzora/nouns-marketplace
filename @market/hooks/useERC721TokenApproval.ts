import useSWR from 'swr'

import { useMemo } from 'react'

import { ContractTransaction } from '@ethersproject/contracts'
import { useAuth } from '@shared/hooks'
import { Erc721Factory } from '@zoralabs/core/dist/typechain'

export function useERC721TokenApproval(contractAddress?: string, spender?: string) {
  const { address: account, signer } = useAuth()
  const contract = useMemo(() => {
    if (!signer || !contractAddress) {
      return
    }

    return Erc721Factory.connect(contractAddress.toLowerCase(), signer)
  }, [contractAddress, signer])

  const { data: approved, ...rest } = useSWR(
    contract && contractAddress && account && spender
      ? ['isApprovedForAll', contract, account, spender]
      : null,
    (_, contract, userAddress, spender) =>
      contract.isApprovedForAll(userAddress, spender),
    {
      refreshInterval: 10000,
    }
  )

  function approve(): Promise<ContractTransaction> {
    if (!contract || !spender) {
      throw new Error('No connected contract instance || spender address')
    }

    return contract?.setApprovalForAll(spender, true)
  }

  return { loading: typeof approved === 'undefined', approved, approve, ...rest }
}
