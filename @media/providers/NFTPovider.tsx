import { createContext, useContext } from 'react'
import { useNFT } from '@zoralabs/nft-hooks'
import { useNFTType } from '@zoralabs/nft-hooks'

export type NFTProps = {
  contractAddress?: string | undefined
  tokenId?: string | undefined
}

const NFTContext = createContext<useNFTType>({
  data: undefined,
  error: undefined,
  currencyLoaded: false,
  marketError: undefined,
})

export function useNFTProvider() {
  return useContext(NFTContext)
}

export function NFTProvider({
  contractAddress = undefined,
  tokenId = undefined,
  ...props
}: NFTProps) {
  const { data, error, currencyLoaded, marketError } = useNFT(contractAddress, tokenId)

  return (
    <NFTContext.Provider
      value={{
        data,
        error,
        currencyLoaded,
        marketError,
      }}
      {...props}
    />
  )
}
