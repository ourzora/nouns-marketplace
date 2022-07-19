import {
  createContext,
  useContext,
  ReactNode,
  useMemo,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from 'react'
import { useNounishAuctionQuery, useActiveNounishAuctionQuery } from '@noun-auction/hooks'
import { DaoConfigProps } from '@noun-auction/typings'
import { defaultDaoConfig } from '@noun-auction/constants'
import { useContractRead } from 'wagmi'
import { numberFormatter } from '@market/utils'
import { roundTwoDecimals } from 'utils/math'
import { auctionWrapperVariants } from '@noun-auction/styles/NounishStyles.css'

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
  isComplete?: boolean
  noAuctionHistory?: boolean
  contract?: any
  timerComplete: boolean
  auctionData?: any
  setTimerComplete: Dispatch<SetStateAction<boolean>>
  layout?: keyof typeof auctionWrapperVariants['layout']
}>({
  daoConfig: defaultDaoConfig,
  timerComplete: false,
  auctionData: undefined,
  setTimerComplete: () => {},
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
  const { marketType, contractAddress, classifierPrefix, abi, auctionContractAddress } =
    daoConfig

  const { activeToken } = useActiveNounishAuctionQuery({
    marketType,
    contractAddress,
  })

  const { data: minBidIncrementPercentage } = useContractRead({
    addressOrName: auctionContractAddress,
    contractInterface: abi,
    functionName: 'minBidIncrementPercentage',
  })

  const { data, error } = useNounishAuctionQuery({
    marketType: marketType,
    contractAddress: contractAddress,
    tokenId: tokenId ? tokenId : activeToken,
  })

  const [timerComplete, setTimerComplete] = useState(false)

  const isComplete = useMemo(() => {
    // console.log(tokenId, data?.token?.markets[0])
    if (!data) {
      return false
    } else if (data?.token?.markets.length) {
      return (
        data?.token?.markets[0]?.status === 'COMPLETED' ||
        Object.values(data?.events?.nodes[0]?.properties).includes(
          `${classifierPrefix?.typePrefix}NOUNS_AUCTION_HOUSE_AUCTION_SETTLED_EVENT`
        )
      )
    } else {
      return false
    }
  }, [data])

  const noAuctionHistory = useMemo(() => {
    if (data) return data?.events?.nodes.length === 0
  }, [data])

  useEffect(() => {
    console.log('tokendata', tokenId, data?.token), [data]
  })

  const normalizedAuctionData = useMemo(() => {
    if (data && data.markets?.nodes.length) {
      const marketData = data.markets?.nodes[0]?.market
      const marketProperties = marketData?.properties

      return {
        countdown: {
          startTime: marketProperties?.startTime,
          endTime: marketProperties?.endTime,
        },
        highBid: {
          ethValue: marketProperties?.highestBidPrice?.chainTokenPrice?.raw,
          usdcValue: numberFormatter(
            roundTwoDecimals(marketProperties?.highestBidPrice?.usdcPrice?.decimal)
          ),
        },
        bidder: {
          address: marketProperties?.highestBidder,
          txHash: marketData?.transactionInfo.transactionHash,
        },
      }
    }
  }, [data])

  return (
    <NounsAuctionContext.Provider
      value={{
        data,
        error,
        isComplete,
        noAuctionHistory,
        timerComplete,
        tokenId: tokenId ? tokenId : activeToken,
        daoConfig: daoConfig,
        setTimerComplete,
        layout,
        auctionData: normalizedAuctionData,
        contract: {
          minBidIncrementPercentage: minBidIncrementPercentage,
        },
      }}
    >
      {children}
    </NounsAuctionContext.Provider>
  )
}
