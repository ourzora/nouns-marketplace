import { ReactNode } from 'react'
import { createContext, useContext } from 'react'

import { NFTObject, useNFT, useNFTType } from '@zoralabs/nft-hooks'

export type NFTProps = {
  contractAddress?: string | undefined
  tokenId?: string | undefined
  initialData?: NFTObject
  children?: ReactNode
}

export interface NFTContextTypes {
  hooksData: useNFTType
  nft: NFTObject | undefined
  tokenId?: string
  contractAddress?: string
}

const NFTContext = createContext<NFTContextTypes>({
  hooksData: {
    data: undefined,
    error: undefined,
    currencyLoaded: false,
    marketError: undefined,
  },
  nft: undefined,
})

export function useNFTProvider() {
  return useContext(NFTContext)
}

export function NFTProvider({
  contractAddress = undefined,
  tokenId = undefined,
  initialData,
  children,
  ...props
}: NFTProps) {
  const { data, error, currencyLoaded, marketError } = useNFT(contractAddress, tokenId)

  return (
    <NFTContext.Provider
      value={{
        hooksData: {
          data,
          error,
          currencyLoaded,
          marketError,
        },
        nft: data ?? initialData,
        tokenId,
        contractAddress,
      }}
      {...props}
    >
      {children}
    </NFTContext.Provider>
  )
}
