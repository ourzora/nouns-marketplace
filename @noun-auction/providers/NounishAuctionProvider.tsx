import { createContext, useContext, ReactNode, useMemo } from 'react'
import { useNounishAuctionQuery, useActiveNounishAuctionQuery } from '@noun-auction/hooks'
import { NounAuctionQueryProps } from '@noun-auction/data'
import { returnDaoAuctionContract } from 'constants/collection-addresses'

export type ClassifierPrefixProps = {
  keyPrefix: string
  typePrefix: string
} | null

const NounsAuctionContext = createContext<{
  data?: any
  error?: any
  auctionConfigParams?: NounAuctionQueryProps
  auctionContractAddress?: string
  classifierPrefix?: ClassifierPrefixProps
  isComplete?: boolean
}>({})

export function useNounishAuctionProvider() {
  return useContext(NounsAuctionContext)
}

export type NounishAuctionProviderProps = {
  auctionConfigParams: NounAuctionQueryProps
  children?: ReactNode
  classifierPrefix?: ClassifierPrefixProps
}

export function NounishAuctionProvider({
  auctionConfigParams,
  classifierPrefix,
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

  const isComplete = useMemo(() => {
    console.log('data', data)
    if (!data) {
      return false
    } else {
      return (
        data?.token?.markets[0]?.status === 'COMPLETED' ||
        Object.values(data?.events?.nodes[0]?.properties).includes(
          `${classifierPrefix?.typePrefix}NOUNS_AUCTION_HOUSE_AUCTION_SETTLED_EVENT`
        )
      )
    }
  }, [data])

  return (
    <NounsAuctionContext.Provider
      value={{
        data,
        error,
        auctionContractAddress: auctionContractAddress,
        classifierPrefix,
        isComplete,
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
