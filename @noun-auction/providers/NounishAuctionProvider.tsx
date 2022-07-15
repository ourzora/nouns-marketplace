import {
  createContext,
  useContext,
  ReactNode,
  useMemo,
  useState,
  Dispatch,
  SetStateAction,
} from 'react'
import { useNounishAuctionQuery, useActiveNounishAuctionQuery } from '@noun-auction/hooks'
import { DaoConfigProps } from '@noun-auction/typings'
import { defaultDaoConfig } from '@noun-auction/constants'
import { useContractRead } from 'wagmi'

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
  contract?: any
  timerComplete: boolean
  setTimerComplete: Dispatch<SetStateAction<boolean>>
}>({
  daoConfig: defaultDaoConfig,
  timerComplete: false,
  setTimerComplete: () => {},
})

export function useNounishAuctionProvider() {
  return useContext(NounsAuctionContext)
}

export function NounishAuctionProvider({
  daoConfig,
  tokenId,
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
    console.log(data?.token?.markets[0]?.status)
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

  return (
    <NounsAuctionContext.Provider
      value={{
        data,
        error,
        isComplete,
        tokenId: tokenId ? tokenId : activeToken,
        daoConfig: daoConfig,
        timerComplete,
        setTimerComplete,
        contract: {
          minBidIncrementPercentage: minBidIncrementPercentage,
        },
      }}
    >
      {children}
    </NounsAuctionContext.Provider>
  )
}
