import { TypeSafeNounsAuction } from 'validators/auction'

import { useNounishAuctionHelper } from '@market/hooks/useNounishAuctionHelper'
import { FlexProps } from '@zoralabs/zord'

import { NFTPrimaryAuctionActive, NFTPrimaryAuctionEndedSettlement } from './'

export interface NFTPrimaryAuctionProps extends FlexProps {
  primaryAuction: TypeSafeNounsAuction
  collectionAddress: string
  tokenId: string
  isActiveAuctionToken: boolean
}

export function NFTPrimaryAuction({
  primaryAuction,
  collectionAddress,
  tokenId,
  isActiveAuctionToken,
  ...props
}: NFTPrimaryAuctionProps) {
  const { isEnded } = useNounishAuctionHelper({
    auction: primaryAuction,
  })

  if (!primaryAuction) return null

  if (isEnded) {
    // Anyone can settle auction
    return <NFTPrimaryAuctionEndedSettlement primaryAuction={primaryAuction} {...props} />
  }

  // if (isEnded) { // @Oleg: please ignore for now. Won't be shown.
  //   return (
  //     <NFTPrimaryAuctionEndedSummary
  //       nftObj={nftObj}
  //       primaryAuction={primaryAuction}
  //       {...props}
  //     />
  //   )
  // }

  return (
    <NFTPrimaryAuctionActive
      collectionAddress={collectionAddress}
      tokenId={tokenId}
      primaryAuction={primaryAuction}
      {...props}
    />
  )
}
