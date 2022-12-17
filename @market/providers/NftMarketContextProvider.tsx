import { createContext, useContext } from 'react'
import { TypeSafeMarket } from 'validators/market'

type NftMarketContextType = {
  tokenId: string
  collectionAddress: string
  collectionName: string
  markets: TypeSafeMarket[]
}

export const NftMarketContext = createContext<NftMarketContextType>(
  {} as NftMarketContextType
)
export const useNftMarketContext = () => useContext(NftMarketContext)
