import { TypeSafeNounsAuction } from 'validators/auction'

import { useNounishAuctionHelper } from '@market/hooks/useNounishAuctionHelper'
import { NFTObject } from '@zoralabs/nft-hooks'
import { FlexProps } from '@zoralabs/zord'

import { NFTPrimaryAuctionActive, NFTPrimaryAuctionEndedSettlement } from './'

export interface NFTPrimaryAuctionProps extends FlexProps {
  nftObj: NFTObject
  primaryAuction: TypeSafeNounsAuction
}

export function NFTPrimaryAuction({
  nftObj,
  primaryAuction,
  ...props
}: NFTPrimaryAuctionProps) {
  const { isEnded } = useNounishAuctionHelper({
    auction: primaryAuction,
  })

  if (!primaryAuction) return null

  if (isEnded) {
    // Anyone can settle auction

    return (
      <NFTPrimaryAuctionEndedSettlement
        nftObj={nftObj}
        primaryAuction={primaryAuction}
        {...props}
      />
    )
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
    <NFTPrimaryAuctionActive nftObj={nftObj} primaryAuction={primaryAuction} {...props} />
  )
}
