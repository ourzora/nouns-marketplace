import { NounsDao } from 'types/zora.api.generated'

import { isAfter } from 'date-fns'

import { Dispatch, ReactNode, SetStateAction, createContext, useContext } from 'react'

import {
  DaoConfigProps,
  useActiveOGNounishAuction,
  useNounishAuctionQuery,
} from '@noun-auction'
import { auctionWrapperVariants } from '@noun-auction/styles/NounishStyles.css'

export type NounishAuctionProviderProps = {
  tokenId?: string
  dao: NounsDao
  children?: ReactNode
  layout?: keyof typeof auctionWrapperVariants['layout']
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
  highestBidderAddress?: string
  hasNonZeroHighestBidder?: boolean
}>({} as any)

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
  const { data: activeOriginalNounishAuction } = useActiveOGNounishAuction()

  // all other nouns daos
  const { activeAuction } = useNounishAuctionQuery({
    collectionAddress,
  })

  // FIXME
  const timerComplete = isAfter(parseInt(activeAuction?.endTime!), Date.now() * 1000)

  const normalizedDaoConfig: DaoConfigProps = {
    name: dao.name!,
    collectionAddress: dao.collectionAddress,
    auctionContractAddress: dao.auctionAddress,
    marketType: 'LIL_NOUNS_AUCTION',
    classifierPrefix: null,
    abi: undefined,
  }

  return (
    <NounsAuctionContext.Provider
      value={
        {
          dao: normalizedDaoConfig,
          timerComplete,
          setTimerComplete: () => {},
          tokenId: tokenId,
          layout,
          // minBidIncrementPercentage: activeAuction.minBidIncrementPercentage!,
          reservePrice: '0.01',
        } as any
      }
    >
      {children}
    </NounsAuctionContext.Provider>
  )
}
