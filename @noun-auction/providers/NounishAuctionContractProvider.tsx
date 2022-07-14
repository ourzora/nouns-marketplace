import { createContext, useContext, useEffect, ReactNode } from 'react'
import { useContractABI } from 'hooks'
import { useNounBidIncrement } from '@noun-auction/hooks'
import { useContractRead } from 'wagmi'

export type ContractProps = {
  auctionContractAddress: string
  children: ReactNode
}

const NounishAuctionContractContext = createContext<{
  abi?: any
  auctionContractAddress?: string
}>({})

export function useNounishAuctionContract() {
  return useContext(NounishAuctionContractContext)
}

export function NounishAuctionContractProvider({
  auctionContractAddress,
  children,
}: ContractProps) {
  const { contractABI } = useContractABI(auctionContractAddress)

  const { data: minBidIncrementPercentage } = useContractRead({
    addressOrName: auctionContractAddress as string,
    contractInterface: contractABI,
    functionName: 'minBidIncrementPercentage',
  })

  useEffect(() => {
    console.log('minBidIncrementPercentage', minBidIncrementPercentage)
  }, [minBidIncrementPercentage])

  return (
    <NounishAuctionContractContext.Provider
      value={{
        abi: contractABI,
        auctionContractAddress,
      }}
    >
      {children}
    </NounishAuctionContractContext.Provider>
  )
}
