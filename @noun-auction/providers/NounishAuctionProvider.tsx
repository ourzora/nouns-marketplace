import {
  createContext,
  useContext,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
} from 'react'
import {
  useNounishAuctionQuery,
  useActiveNounishAuction,
  DaoConfigProps,
} from '@noun-auction'
import { auctionWrapperVariants } from '@noun-auction/styles/NounishStyles.css'
import {
  NounishAuctionsQuery,
  NounsBuilderAuction,
  NounsDao,
} from 'types/zora.api.generated'
import { isAfter } from 'date-fns'

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
  activeAuction: NounsBuilderAuction
}>({
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
  dao,
  tokenId,
  layout,
  children,
}: NounishAuctionProviderProps) {
  const { collectionAddress } = dao
  // nouns and lil nouns
  const { data: activeOriginalNounishAuction } = useActiveNounishAuction()
  // all other nouns daos
  const { activeNounishAuction } = useNounishAuctionQuery({
    collectionAddress,
  })

  if (!activeNounishAuction || !dao) return null

  const timerComplete = isAfter(parseInt(activeNounishAuction.endTime), Date.now() * 1000)

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

  return (
    <NounsAuctionContext.Provider
      value={{
        dao: normalizedDaoConfig,
        activeAuction: activeNounishAuction,
        // nounishAuction,
        // error,
        noAuctionHistory,
        timerComplete,
        // tokenId,
        // activeAuctionId: activeNounishAuction?.tokenId,
        // FIXME
        setTimerComplete: () => {},
        layout,
        minBidIncrementPercentage: activeNounishAuction.minBidIncrementPercentage!,
        reservePrice: '0.01',
      }}
    >
      {children}
    </NounsAuctionContext.Provider>
  )

  //   const timerComplete = isAfter(
  //     parseInt(activeNounishAuction.endTime),
  //     Date.now() * 1000
  //   )
  //   const noAuctionHistory = true
  //   // useMemo(() => {
  //   //   if (data) return data?.events?.nodes.length === 0
  //   // }, [data])
  //   // console.log({ nounishAuction })
  //   return (
  //     <NounsAuctionContext.Provider
  //       value={{
  //         nounishAuction,
  //         error,
  //         noAuctionHistory,
  //         timerComplete,
  //         tokenId: tokenId ? tokenId : activeAuction?.tokenId,
  //         activeAuctionId: activeAuction ? activeAuction?.tokenId : undefined,
  //         dao,
  //         activeAuction,
  //         // FIXME
  //         // setTimerComplete,
  //         layout,
  //         minBidIncrementPercentage: activeAuction?.minBidIncrementPercentage,
  //         reservePrice: '0.01',
  //       }}
  //     >
  //       {children}
  //     </NounsAuctionContext.Provider>
  //   )
  //   }
}
