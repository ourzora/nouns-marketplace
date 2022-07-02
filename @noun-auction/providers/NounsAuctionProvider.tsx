import { createContext, useContext, ReactNode } from 'react'
import { useNounAuction } from '@noun-auction/hooks'

const NounsAuctionContext = createContext<{
  // auctionData: any | undefined,
  data?: any
  error?: any
  tokenId?: any
}>({
  // auctionData: undefined
})

export function useNounsAuctionProvider() {
  return useContext(NounsAuctionContext)
}

export function NounsAuctionProvider({
  tokenId,
  children,
}: {
  tokenId: string
  children?: ReactNode
}) {
  const { data, error } = useNounAuction(tokenId)

  console.log(data)

  return (
    <NounsAuctionContext.Provider
      value={{
        data,
        error,
        tokenId,
      }}
    >
      {children}
    </NounsAuctionContext.Provider>
  )
}
