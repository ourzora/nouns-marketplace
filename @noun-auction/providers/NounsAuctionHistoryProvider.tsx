import { createContext, useContext, useState, ReactNode } from 'react'
import { useInterval } from '@shared'
import { useNounAuctionsHistory } from '@noun-auction/hooks'
import { FetchDataTypes } from '@noun-auction/typings'

const AuctionHistoryContext = createContext<
  {
    auctionsHistory: any | undefined
  } & FetchDataTypes
>({
  auctionsHistory: undefined,
})

export function useNounAuctionHistoryProvider() {
  return useContext(AuctionHistoryContext)
}

export function NounsAuctionHistoryProvider({ children }: { children?: ReactNode }) {
  const [date, setDate] = useState<any>(undefined)

  const { auctionsHistory, loading, error, errorMsg } = useNounAuctionsHistory({
    refreshInterval: date,
  })

  useInterval(() => {
    const date = new Date()
    setDate(date)
  }, 5000)

  return (
    <AuctionHistoryContext.Provider
      value={{
        auctionsHistory: auctionsHistory,
        loading,
        error,
        errorMsg,
      }}
    >
      {children}
    </AuctionHistoryContext.Provider>
  )
}
