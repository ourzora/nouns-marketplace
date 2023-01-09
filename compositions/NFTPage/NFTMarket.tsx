import { OffchainOrderWithToken } from 'types/zora.api.generated'

import { TypeSafeNounsAuction } from 'validators/auction'
import { TypeSafeMarket } from 'validators/market'

import { NFTPrimaryAuction, NFTPrimaryAuctionActive } from '@market'
import { NFTAsks } from '@market/components/NFTAsks'
import { useNounishAuctionHelper } from '@market/hooks/useNounishAuctionHelper'
import { useNftMarketContext } from '@market/providers/NftMarketContextProvider'
import { BoxProps } from '@zoralabs/zord'

import { nftMarketWrapper } from './NFTPage.css'

interface NFTMarketProps extends BoxProps {
  offchainOrders?: OffchainOrderWithToken[]
  isOwner: boolean
  isActiveAuctionToken: boolean
  activeAuction?: TypeSafeNounsAuction
}

export function NFTMarket({
  offchainOrders,
  className,
  isOwner,
  isActiveAuctionToken,
  activeAuction,
}: NFTMarketProps) {
  const { tokenId, collectionAddress } = useNftMarketContext()

  if (activeAuction) {
    return (
      <NFTAuctionMarket
        activeAuction={activeAuction}
        isActiveAuctionToken={isActiveAuctionToken}
        tokenId={tokenId}
        collectionAddress={collectionAddress}
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

const NFTAuctionMarket = ({
  activeAuction,
  isActiveAuctionToken,
  tokenId,
  collectionAddress,
}: {
  activeAuction: TypeSafeNounsAuction
  isActiveAuctionToken: boolean
  tokenId: string
  collectionAddress: string
}) => {
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

  if (isActiveAuctionToken) {
    return (
      <NFTPrimaryAuctionActive
        collectionAddress={collectionAddress}
        tokenId={tokenId}
        primaryAuction={activeAuction}
      />
    )
  }

  return null
}
