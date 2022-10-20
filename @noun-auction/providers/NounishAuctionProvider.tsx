import { formatUnits } from 'ethers/lib/utils'
import {
  NounishAuctionsQuery,
  NounsBuilderAuction,
  NounsDao,
} from 'types/zora.api.generated'

import { isAfter } from 'date-fns'

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
import {
  DaoConfigProps,
  useActiveNounishAuction,
  useNounishAuctionQuery,
} from '@noun-auction'
import { auctionWrapperVariants } from '@noun-auction/styles/NounishStyles.css'
import { LilNounsAuctionEventTypes, NounsAuctionEventTypes } from '@noun-auction/typings'
import { isAddressMatch } from '@shared'

export type NounishAuctionProviderProps = {
  tokenId?: string
  dao: NounsDao
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
  error?: any
  dao: DaoConfigProps
  tokenId?: string
  noAuctionHistory?: boolean
  contract?: any
  minBidIncrementPercentage?: number
  reservePrice: string
  timerComplete: boolean
  setTimerComplete: Dispatch<SetStateAction<boolean>>
  layout?: keyof typeof auctionWrapperVariants['layout']
  activeAuctionId: string | undefined
  activeAuction: NounsBuilderAuction
  primarySalePrice?: string
  highestBidderAddress?: string
  hasNonZeroHighestBidder?: boolean
}>({
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
  dao,
  tokenId,
  layout,
  children,
}: NounishAuctionProviderProps) {
  const { collectionAddress } = dao
  // nouns and lil nouns
  const { data: activeOriginalNounishAuction } = useActiveNounishAuction()

  // all other nouns daos
  const { activeNounishAuction: activeAuction } = useNounishAuctionQuery({
    collectionAddress,
  })

  // FIXME
  const timerComplete = isAfter(parseInt(activeAuction?.endTime!), Date.now() * 1000)

  const noAuctionHistory = true
  // useMemo(() => {
  //   if (data) return data?.events?.nodes.length === 0
  // }, [data])

  const normalizedDaoConfig: DaoConfigProps = {
    name: dao.name!,
    collectionAddress: dao.collectionAddress,
    auctionContractAddress: dao.auctionAddress,
    marketType: 'BUILDER_NOUNS_AUCTION',
    classifierPrefix: null,
    abi: undefined,
  }
  // console.log({ activeNounishAuction })

  const isSettled = false
  // const isSettled = useMemo(() => {
  //   if (noAuctionHistory) return false

  //   const settledAuctionEventType =
  //     marketType === 'NOUNS_AUCTION'
  //       ? NounsAuctionEventTypes.NOUNS_AUCTION_HOUSE_AUCTION_SETTLED_EVENT
  //       : LilNounsAuctionEventTypes.LIL_NOUNS_AUCTION_HOUSE_AUCTION_SETTLED_EVENT

  //   const settledEvents = data?.events?.nodes.filter((event: any) =>
  //     marketType === 'NOUNS_AUCTION'
  //       ? event.properties.nounsAuctionEventType === settledAuctionEventType
  //       : event.properties.lilNounsAuctionEventType === settledAuctionEventType
  //   )

  //   return !!settledEvents?.length
  // }, [data?.events?.nodes, marketType, noAuctionHistory])

  const primarySalePrice = '0'
  // const primarySalePrice = useMemo(() => {
  //   if (noAuctionHistory || !isSettled) return undefined

  //   const bidEventType =
  //     marketType === 'NOUNS_AUCTION'
  //       ? NounsAuctionEventTypes.NOUNS_AUCTION_HOUSE_AUCTION_BID_EVENT
  //       : LilNounsAuctionEventTypes.LIL_NOUNS_AUCTION_HOUSE_AUCTION_BID_EVENT

  //   const bidEvents = data?.events?.nodes
  //     .filter((event: any) =>
  //       marketType === 'NOUNS_AUCTION'
  //         ? event.properties.nounsAuctionEventType === bidEventType
  //         : event.properties.lilNounsAuctionEventType === bidEventType
  //     )
  //     .sort(getLatestBlockNumberForEvent)

  //   const firstPrice = Array.isArray(bidEvents)
  //     ? formatUnits(first(bidEvents).properties.properties.value, 18)
  //     : undefined

  //   return firstPrice
  // }, [isSettled, noAuctionHistory])

  const highestBidderAddress = useMemo(
    () => (activeAuction?.highestBidder ? activeAuction?.highestBidder : undefined),
    [activeAuction?.highestBidder]
  )
  const hasNonZeroHighestBidder = useMemo(
    () => !isAddressMatch(highestBidderAddress, AddressZero),
    [highestBidderAddress]
  )

  if (!activeAuction || !dao) return null

  return (
    <NounsAuctionContext.Provider
      value={{
        dao: normalizedDaoConfig,
        activeAuction,
        // nounishAuction,
        // error,
        noAuctionHistory,
        timerComplete,
        // activeAuctionId: activeNounishAuction?.tokenId,
        setTimerComplete: () => {},
        tokenId: tokenId,
        // DOUBLECHECK
        activeAuctionId: activeAuction.auction,
        // daoConfig: daoConfig,
        primarySalePrice,
        setTimerComplete,
        layout,
        // minBidIncrementPercentage: activeAuction.minBidIncrementPercentage!,
        reservePrice: '0.01',
        highestBidderAddress,
        hasNonZeroHighestBidder,
      }}
    >
      {children}
    </NounsAuctionContext.Provider>
  )
}
