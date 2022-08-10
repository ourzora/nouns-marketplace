import { useMemo } from 'react'
import useSWR from 'swr'
import { ContractTransaction } from '@ethersproject/contracts'
import { Erc721Factory } from '@zoralabs/core/dist/typechain'
import { useAuth } from '@shared'

export function useERC721TokenApproval(contractAddress?: string, spender?: string) {
  const { address: account, signer } = useAuth()
  const contract = useMemo(() => {
    if (!signer || !contractAddress) {
      return
    }

    return Erc721Factory.connect(contractAddress, signer)
  }, [contractAddress, signer])

  const { data: approved, ...rest } = useSWR(
    contract && contractAddress && account && spender
      ? ['isApprovedForAll', contract, account, spender]
      : null,
    (_, contract, userAddress, spender) => contract.isApprovedForAll(userAddress, spender)
  )

  function approve(): Promise<ContractTransaction> {
    if (!contract || !spender) {
      throw new Error('No connected contract instance || spender address')
    }

    return contract?.setApprovalForAll(spender, true)
  }

  return { loading: typeof approved === 'undefined', approved, approve, ...rest }
}
