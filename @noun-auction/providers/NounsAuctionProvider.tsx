import { createContext, useContext, useState, ReactNode } from 'react'
import { useInterval } from '@shared'
import { useNounAuction, useAuction } from '@noun-auction/hooks'

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
  const { data, error } = useAuction(tokenId)

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
