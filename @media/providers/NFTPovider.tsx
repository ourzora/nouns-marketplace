import { ReactNode } from 'react'
import { createContext, useContext } from 'react'
import { NFTObject, useNFT } from '@zoralabs/nft-hooks'
import { useNFTType } from '@zoralabs/nft-hooks'

export type NFTProps = {
  contractAddress?: string | undefined
  tokenId?: string | undefined
  initialData?: NFTObject
  children?: ReactNode
}

export interface NFTContextTypes {
  hooksData: useNFTType
  initialData: NFTObject | undefined
  tokenId?: string
  isNounsContract?: boolean
}

const NFTContext = createContext<NFTContextTypes>({
  hooksData: {
    data: undefined,
    error: undefined,
    currencyLoaded: false,
    marketError: undefined,
  },
  initialData: undefined,
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

  const isNounsContract = contractAddress === '0x9c8ff314c9bc7f6e59a9d9225fb22946427edc03'

  return (
    <NFTContext.Provider
      value={{
        hooksData: {
          data,
          error,
          currencyLoaded,
          marketError,
        },
        initialData,
        tokenId,
        isNounsContract,
      }}
      {...props}
    >
      {children}
    </NFTContext.Provider>
  )
}
