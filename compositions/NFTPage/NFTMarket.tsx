import { OffchainOrderWithToken } from 'types/zora.api.generated'

import { TypeSafeNounsAuction } from 'validators/auction'
import { TypeSafeMarket } from 'validators/market'

import { NFTPrimaryAuction, NFTPrimaryAuctionActive } from '@market'
import { NFTAsks } from '@market/components/NFTAsks'
import { useNounishAuctionHelper } from '@market/hooks/useNounishAuctionHelper'
import { useNounishAuctionQuery } from '@noun-auction'
import { BoxProps } from '@zoralabs/zord'

import { nftMarketWrapper } from './NFTPage.css'

interface NFTMarketProps extends BoxProps {
  collectionAddress: string
  offchainOrders?: OffchainOrderWithToken[]
  tokenId: string
  collectionName: string
  isOwner: boolean
  markets: TypeSafeMarket[]
  isActiveAuctionToken: boolean
  activeAuction: TypeSafeNounsAuction
}

export function NFTMarket({
  offchainOrders,
  className,
  collectionAddress,
  tokenId,
  collectionName,
  isOwner,
  markets,
  isActiveAuctionToken,
  activeAuction,
  ...props
}: NFTMarketProps) {
  const { isClaimable } = useNounishAuctionHelper({
    auction: activeAuction,
  })

  if (isClaimable) {
    return (
      <NFTPrimaryAuction
        isActiveAuctionToken={isActiveAuctionToken}
        collectionAddress={collectionAddress}
        tokenId={tokenId}
        primaryAuction={activeAuction!}
      />
    )
  }

  if (activeAuction && isActiveAuctionToken) {
    return (
      <NFTPrimaryAuctionActive
        collectionAddress={collectionAddress}
        tokenId={tokenId}
        primaryAuction={activeAuction}
        {...props}
      />
    )
  }

  return (
    <NFTAsks
      isOwner={isOwner}
      offchainOrders={offchainOrders}
      className={[nftMarketWrapper, className]}
      p="x4"
      align="flex-start"
      direction="column"
    />
  )
}
