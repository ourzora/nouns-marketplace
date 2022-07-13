import { createContext, useContext, ReactNode } from 'react'
import { useContractABI } from 'hooks'

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
