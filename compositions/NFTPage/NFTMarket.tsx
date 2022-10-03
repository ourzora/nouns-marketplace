import { useMemo } from 'react'
import { NounishAuction, useActiveNounishAuction } from '@noun-auction'
import { returnDao } from 'constants/collection-addresses'
import { NFTObject } from '@zoralabs/nft-hooks'
import { nftMarketWrapper } from './NFTPage.css'
import { NFTAsks } from '@market/components/NFTAsks'
import { BoxProps } from '@zoralabs/zord'

interface NFTMarketProps extends BoxProps {
  contractAddress: string
  tokenId: string
  nft: NFTObject
}

export function NFTMarket({ className, contractAddress, tokenId, nft }: NFTMarketProps) {
  const dao = returnDao(contractAddress)
  const { data: activeAuction } = useActiveNounishAuction(dao?.marketType)
  const hasNounishAuction = useMemo(
    () => activeAuction?.properties?.tokenId === tokenId && dao,
    [activeAuction?.properties?.tokenId, dao, tokenId]
  )

  return hasNounishAuction ? (
    <NounishAuction
      daoConfig={dao!}
      hideThumbnail
      hideTitle
      hideCollectionTitle
      showLabels
      layout="sideBarBid"
      useErrorMsg
      className={className}
    />
  ) : (
    <NFTAsks
      className={[nftMarketWrapper, className]}
      nftObj={nft}
      p="x4"
      align="flex-start"
      direction="column"
    />
  )
}
