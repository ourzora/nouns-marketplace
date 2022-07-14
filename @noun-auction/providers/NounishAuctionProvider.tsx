import { createContext, useContext, ReactNode, useMemo } from 'react'
import { useNounishAuctionQuery, useActiveNounishAuctionQuery } from '@noun-auction/hooks'
import { DaoConfigProps } from '@noun-auction/typings'
import { defaultDaoConfig } from '@noun-auction/constants'

export type NounishAuctionProviderProps = {
  tokenId?: string
  daoConfig: DaoConfigProps
  children?: ReactNode
}

const NounsAuctionContext = createContext<{
  data?: any
  error?: any
  daoConfig: DaoConfigProps
  tokenId?: string
  isComplete?: boolean
}>({
  daoConfig: defaultDaoConfig,
})

export function useNounishAuctionProvider() {
  return useContext(NounsAuctionContext)
}

export function NounishAuctionProvider({
  daoConfig,
  tokenId,
  children,
}: NounishAuctionProviderProps) {
  const { marketType, contractAddress, classifierPrefix } = daoConfig

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
    console.log('data', data?.events?.nodes[0])
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
        isComplete,
        tokenId: tokenId ? tokenId : activeToken,
        daoConfig: daoConfig,
      }}
    >
      {children}
    </NounsAuctionContext.Provider>
  )
}
