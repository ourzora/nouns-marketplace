import { OffchainOrderWithToken } from 'types/zora.api.generated'

import { useMemo } from 'react'
import { TypeSafeNounsAuction } from 'validators/auction'

import { NFTPrimaryAuction } from '@market'
import { NFTAsks } from '@market/components/NFTAsks'
import { useNounishAuctionHelper } from '@market/hooks/useNounishAuctionHelper'
import { useNounishAuctionQuery } from '@noun-auction'
import { useNFTProvider } from '@shared'
import { NFTObject } from '@zoralabs/nft-hooks'
import { BoxProps } from '@zord'

import { nftMarketWrapper } from './NFTPage.css'

interface NFTMarketProps extends BoxProps {
  collectionAddress: string
  offchainOrders?: OffchainOrderWithToken[]
}

export function NFTMarket({
  offchainOrders,
  className,
  collectionAddress,
}: NFTMarketProps) {
  const { nft: nftObj } = useNFTProvider()
  const { activeAuction } = useNounishAuctionQuery({
    collectionAddress,
  })
  if (nftObj && activeAuction) {
    return (
      <NFTMarketComponent
        className={className}
        nftObj={nftObj}
        activeAuction={activeAuction}
        offchainOrders={offchainOrders}
        collectionAddress={collectionAddress}
      />
    )
  }

  return null
}

export function NFTMarketComponent({
  offchainOrders,
  className,
  nftObj,
  activeAuction,
}: NFTMarketProps & {
  nftObj: NFTObject
  activeAuction: TypeSafeNounsAuction
}) {
  const isActiveAuctionToken = useMemo(
    () => activeAuction?.tokenId === nftObj?.nft?.tokenId,
    [nftObj?.nft?.tokenId, activeAuction?.tokenId]
  )

  const { isClaimable } = useNounishAuctionHelper({
    auction: activeAuction,
  })

  if (isActiveAuctionToken || isClaimable) {
    return (
      <NFTPrimaryAuction
        nftObj={nftObj}
        primaryAuction={activeAuction}
        isActiveAuctionToken={isActiveAuctionToken}
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
