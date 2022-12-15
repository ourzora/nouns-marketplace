import { OffchainOrderWithToken } from 'types/zora.api.generated'

import { TypeSafeMarket } from 'validators/market'

import { NFTPrimaryAuction } from '@market'
import { NFTAsks } from '@market/components/NFTAsks'
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
}

export function NFTMarket({
  offchainOrders,
  className,
  collectionAddress,
  tokenId,
  collectionName,
  isOwner,
  markets,
}: NFTMarketProps) {
  const { activeAuction, hasActiveAuction } = useNounishAuctionQuery({
    collectionAddress,
  })

  if (hasActiveAuction) {
    return (
      <NFTPrimaryAuction
        collectionAddress={collectionAddress}
        tokenId={tokenId}
        primaryAuction={activeAuction!}
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
