import { createContext, useContext, ReactNode } from 'react'
import { useNounishAuctionQuery, useActiveNounishAuctionQuery } from '@noun-auction/hooks'
import { NounAuctionQueryProps } from '@noun-auction/data'
import { returnDaoAuctionContract } from 'constants/collection-addresses'

const NounsAuctionContext = createContext<{
  data?: any
  error?: any
  auctionConfigParams?: NounAuctionQueryProps
  auctionContractAddress?: string
}>({})

export function useNounishAuctionProvider() {
  return useContext(NounsAuctionContext)
}

export type NounishAuctionProviderProps = {
  auctionConfigParams: NounAuctionQueryProps
  children?: ReactNode
}

export function NounishAuctionProvider({
  auctionConfigParams,
  children,
}: NounishAuctionProviderProps) {
  const { marketType, contractAddress, tokenId } = auctionConfigParams

  const auctionContractAddress = returnDaoAuctionContract(contractAddress)

  const { activeToken } = useActiveNounishAuctionQuery({
    marketType,
    contractAddress,
  })

  const { data, error } = useNounishAuctionQuery({
    marketType: marketType,
    contractAddress: contractAddress,
    tokenId: tokenId ? tokenId : activeToken,
  })

  return (
    <NounsAuctionContext.Provider
      value={{
        data,
        error,
        auctionContractAddress: auctionContractAddress,
        auctionConfigParams: {
          marketType: marketType,
          contractAddress: contractAddress,
          tokenId: tokenId ? tokenId : activeToken,
        },
      }}
    >
      {children}
    </NounsAuctionContext.Provider>
  )
}
