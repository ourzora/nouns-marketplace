import { formatUnits } from 'ethers/lib/utils'

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react'

import { first } from 'lodash'

import { AddressZero } from '@ethersproject/constants'
import { defaultDaoConfig } from '@noun-auction/constants'
import { useNounishAuctionQuery } from '@noun-auction/hooks'
import { useActiveNounishAuction } from '@noun-auction/hooks/useActiveNounishAuction'
import { auctionWrapperVariants } from '@noun-auction/styles/NounishStyles.css'
import {
  ActiveNounishAuctionResponse,
  DaoConfigProps,
  LilNounsAuctionEventTypes,
  NounsAuctionEventTypes,
} from '@noun-auction/typings'
import { isAddressMatch } from '@shared'

export type NounishAuctionProviderProps = {
  tokenId?: string
  daoConfig: DaoConfigProps
  children?: ReactNode
  layout?: keyof typeof auctionWrapperVariants['layout']
}

function getLatestBlockNumberForEvent(a: any, b: any) {
  return a.transactionInfo.blockNumber &&
    b.transactionInfo.blockNumber &&
    a.transactionInfo.blockNumber > b.transactionInfo.blockNumber
    ? -1
    : 1
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
  primarySalePrice?: string
  highestBidderAddress?: string
  hasNonZeroHighestBidder?: boolean
}>({
  daoConfig: defaultDaoConfig,
  timerComplete: false,
  activeAuctionId: undefined,
  setTimerComplete: () => {},
  activeAuction: undefined,
  reservePrice: '0.01',
  primarySalePrice: undefined,
  highestBidderAddress: undefined,
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

  const isSettled = useMemo(() => {
    if (noAuctionHistory) return false

    const settledAuctionEventType =
      marketType === 'NOUNS_AUCTION'
        ? NounsAuctionEventTypes.NOUNS_AUCTION_HOUSE_AUCTION_SETTLED_EVENT
        : LilNounsAuctionEventTypes.LIL_NOUNS_AUCTION_HOUSE_AUCTION_SETTLED_EVENT

    const settledEvents = data?.events?.nodes.filter((event: any) =>
      marketType === 'NOUNS_AUCTION'
        ? event.properties.nounsAuctionEventType === settledAuctionEventType
        : event.properties.lilNounsAuctionEventType === settledAuctionEventType
    )

    return !!settledEvents?.length
  }, [data?.events?.nodes, marketType, noAuctionHistory])

  const primarySalePrice = useMemo(() => {
    if (noAuctionHistory || !isSettled) return undefined

    const bidEventType =
      marketType === 'NOUNS_AUCTION'
        ? NounsAuctionEventTypes.NOUNS_AUCTION_HOUSE_AUCTION_BID_EVENT
        : LilNounsAuctionEventTypes.LIL_NOUNS_AUCTION_HOUSE_AUCTION_BID_EVENT

    const bidEvents = data?.events?.nodes
      .filter((event: any) =>
        marketType === 'NOUNS_AUCTION'
          ? event.properties.nounsAuctionEventType === bidEventType
          : event.properties.lilNounsAuctionEventType === bidEventType
      )
      .sort(getLatestBlockNumberForEvent)

    const firstPrice = Array.isArray(bidEvents)
      ? formatUnits(first(bidEvents).properties.properties.value, 18)
      : undefined

    return firstPrice
  }, [data?.events?.nodes, isSettled, marketType, noAuctionHistory])

  const highestBidderAddress = useMemo(
    () =>
      activeAuction?.properties?.highestBidder
        ? activeAuction?.properties?.highestBidder
        : undefined,
    [activeAuction?.properties?.highestBidder]
  )
  const hasNonZeroHighestBidder = useMemo(
    () => !isAddressMatch(highestBidderAddress, AddressZero),
    [highestBidderAddress]
  )

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
        primarySalePrice,
        setTimerComplete,
        layout,
        minBidIncrementPercentage: activeAuction?.properties?.minBidIncrementPercentage,
        reservePrice: '0.01',
        highestBidderAddress,
        hasNonZeroHighestBidder,
      }}
    >
      {children}
    </NounsAuctionContext.Provider>
  )
}
