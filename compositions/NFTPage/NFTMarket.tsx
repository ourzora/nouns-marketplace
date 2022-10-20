import { returnDao } from 'constants/collection-addresses'

import { useMemo } from 'react'

import { NFTAsks } from '@market/components/NFTAsks'
import { NounishAuction, useActiveNounishAuction, useOneNounsDao } from '@noun-auction'
import { NFTObject } from '@zoralabs/nft-hooks'
import { BoxProps } from '@zoralabs/zord'

import { nftMarketWrapper } from './NFTPage.css'

interface NFTMarketProps extends BoxProps {
  contractAddress: string
  tokenId: string
  nft: NFTObject
}

export function NFTMarket({ className, contractAddress, tokenId, nft }: NFTMarketProps) {
  const dao = useOneNounsDao({ contractAddress })

  const { data: activeAuction } = useActiveNounishAuction()

  const hasNounishAuction = useMemo(
    () => activeAuction?.properties?.tokenId === tokenId && dao,
    [activeAuction?.properties?.tokenId, dao, tokenId]
  )

  return hasNounishAuction ? (
    <NounishAuction
      dao={dao}
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
