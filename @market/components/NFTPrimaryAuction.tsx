import { useMemo } from 'react'
import { TypeSafeNounsAuction } from 'validators/auction'

import { useNounishAuctionHelper } from '@market/hooks/useNounishAuctionHelper'
import { NFTObject } from '@zoralabs/nft-hooks'
import { FlexProps } from '@zord'

import { NFTPrimaryAuctionActive, NFTPrimaryAuctionEndedSettlement } from './'

export interface NFTPrimaryAuctionProps extends FlexProps {
  nftObj: NFTObject
  primaryAuction: TypeSafeNounsAuction
  isActiveAuctionToken: boolean
}

export function NFTPrimaryAuction({
  nftObj,
  primaryAuction,
  isActiveAuctionToken,
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

  if (isActiveAuctionToken) {
    return (
      <NFTPrimaryAuctionActive
        nftObj={nftObj}
        primaryAuction={primaryAuction}
        {...props}
      />
    )
  }

  return null
}
