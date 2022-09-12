import { useMemo } from 'react'
import { NounishAuction, useActiveNounishAuction } from '@noun-auction'
import { returnDao } from 'constants/collection-addresses'
import { NFTObject } from '@zoralabs/nft-hooks'
import { nftMarketWrapper } from './NFTPage.css'
import { NFTAsks } from '@market/components/NFTAsks'

interface NFTMarketProps {
  contractAddress: string
  tokenId: string
  nft: NFTObject
}

export function NFTMarket({ contractAddress, tokenId, nft }: NFTMarketProps) {
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
    />
  ) : (
    <NFTAsks
      className={nftMarketWrapper}
      nftObj={nft}
      p="x4"
      align="flex-start"
      direction="column"
    />
  )
}
