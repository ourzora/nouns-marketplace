import { OffchainOrderWithToken } from 'types/zora.api.generated'

import { useMemo } from 'react'
import { TypeSafeToken } from 'validators/token'

import { NFTAsks } from '@market/components/NFTAsks'
import { NounishAuction, useActiveOGNounishAuction, useOneNounsDao } from '@noun-auction'
import { useNFT } from '@zoralabs/nft-hooks'
import { BoxProps } from '@zoralabs/zord'

import { nftMarketWrapper } from './NFTPage.css'

interface NFTMarketProps extends BoxProps {
  collectionAddress: string
  tokenId: string
  token: TypeSafeToken
  offchainOrders?: OffchainOrderWithToken[]
}

export function NFTMarket({
  offchainOrders,
  className,
  collectionAddress,
  token,
  tokenId,
}: NFTMarketProps) {
  const { dao } = useOneNounsDao({ collectionAddress })
  const { data: activeAuction } = useActiveOGNounishAuction()
  const { data: nftObj } = useNFT(collectionAddress, tokenId)

  const hasNounishAuction = useMemo(
    () => activeAuction?.properties?.tokenId === tokenId && dao,
    [activeAuction?.properties?.tokenId, dao, tokenId]
  )

  if (hasNounishAuction) {
    return (
      <NounishAuction
        dao={dao!}
        hideThumbnail
        hideTitle
        hideCollectionTitle
        showLabels
        layout="sideBarBid"
        useErrorMsg
        className={className}
      />
    )
  }

  if (nftObj) {
    return (
      <NFTAsks
        offchainOrders={offchainOrders}
        className={[nftMarketWrapper, className]}
        nftObj={nftObj}
        p="x4"
        align="flex-start"
        direction="column"
      />
    )
  }

  return null
}
