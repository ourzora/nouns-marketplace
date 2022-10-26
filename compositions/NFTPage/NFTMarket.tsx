import { useMemo } from 'react'
import { TypeSafeToken } from 'validators/token'

import { NFTAsks } from '@market/components/NFTAsks'
import { NounishAuction, useActiveOGNounishAuction, useOneNounsDao } from '@noun-auction'
import { BoxProps } from '@zoralabs/zord'

import { nftMarketWrapper } from './NFTPage.css'

interface NFTMarketProps extends BoxProps {
  collectionAddress: string
  tokenId: string
  token: TypeSafeToken
}

export function NFTMarket({
  className,
  collectionAddress,
  token,
  tokenId,
}: NFTMarketProps) {
  const { dao } = useOneNounsDao({ collectionAddress })
  const { data: activeAuction } = useActiveOGNounishAuction()

  const hasNounishAuction = useMemo(
    () => activeAuction?.properties?.tokenId === tokenId && dao,
    [activeAuction?.properties?.tokenId, dao, tokenId]
  )

  return hasNounishAuction && dao ? (
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
      token={token}
      p="x4"
      align="flex-start"
      direction="column"
    />
  )
}
