import {
  createContext,
  useContext,
  ReactNode,
  useMemo,
  useState,
  Dispatch,
  SetStateAction,
} from 'react'
import { useNounishAuctionQuery } from '@noun-auction/hooks'
import { DaoConfigProps, ActiveNounishAuctionResponse } from '@noun-auction/typings'
import { defaultDaoConfig } from '@noun-auction/constants'
import { auctionWrapperVariants } from '@noun-auction/styles/NounishStyles.css'
import { useActiveNounishAuction } from '@noun-auction/hooks/useActiveNounishAuction'

export type NounishAuctionProviderProps = {
  tokenId?: string
  daoConfig: DaoConfigProps
  children?: ReactNode
  layout?: keyof typeof auctionWrapperVariants['layout']
}

const NounsAuctionContext = createContext<{
  data?: any
  error?: any
  daoConfig: DaoConfigProps
  tokenId?: string
  noAuctionHistory?: boolean
  contract?: any
  minBidIncrementPercentage?: number
  reservePrice: string
  timerComplete: boolean
  setTimerComplete: Dispatch<SetStateAction<boolean>>
  layout?: keyof typeof auctionWrapperVariants['layout']
  activeAuctionId: string | undefined
  activeAuction: ActiveNounishAuctionResponse
}>({
  daoConfig: defaultDaoConfig,
  timerComplete: false,
  activeAuctionId: undefined,
  setTimerComplete: () => {},
  activeAuction: undefined,
  reservePrice: '0.01',
})

export function useNounishAuctionProvider() {
  return useContext(NounsAuctionContext)
}

export function NounishAuctionProvider({
  daoConfig,
  tokenId,
  layout,
  children,
}: NounishAuctionProviderProps) {
  const { marketType, contractAddress } = daoConfig

  const [timerComplete, setTimerComplete] = useState(false)

  const { data: activeAuction } = useActiveNounishAuction(daoConfig.marketType)

  const { data, error } = useNounishAuctionQuery({
    marketType: marketType,
    contractAddress: contractAddress,
    tokenId: tokenId ? tokenId : activeAuction?.properties?.tokenId,
  })

  const noAuctionHistory = useMemo(() => {
    if (data) return data?.events?.nodes.length === 0
  }, [data])

  return (
    <NounsAuctionContext.Provider
      value={{
        data,
        error,
        noAuctionHistory,
        timerComplete,
        tokenId: tokenId ? tokenId : activeAuction?.properties?.tokenId,
        activeAuctionId: activeAuction ? activeAuction?.properties?.tokenId : undefined,
        daoConfig: daoConfig,
        activeAuction: activeAuction,
        setTimerComplete,
        layout,
        minBidIncrementPercentage: activeAuction?.properties?.minBidIncrementPercentage,
        reservePrice: '0.01',
      }}
    >
      {children}
    </NounsAuctionContext.Provider>
  )
}
