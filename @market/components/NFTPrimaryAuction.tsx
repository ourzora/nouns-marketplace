import { useMemo } from 'react'
import { TypeSafeNounsAuction } from 'validators/auction'

import { useNounishAuctionHelper } from '@market/hooks/useNounishAuctionHelper'
import { isAddressMatch, useAuth } from '@shared'
import { NFTObject } from '@zoralabs/nft-hooks'
import { Box, FlexProps } from '@zoralabs/zord'

import {
  NFTPrimaryAuctionActive,
  NFTPrimaryAuctionEndedSettlement,
  NFTPrimaryAuctionEndedSummary,
} from './'

export interface NFTPrimaryAuctionProps extends FlexProps {
  nftObj: NFTObject
  primaryAuction: TypeSafeNounsAuction
}

export function NFTPrimaryAuction({
  nftObj,
  primaryAuction,
  ...props
}: NFTPrimaryAuctionProps) {
  const { address: userAddress } = useAuth()
  const { hasWinner, winnerAddress, isEnded } = useNounishAuctionHelper({
    auction: primaryAuction,
  })
  const isClaimable = useMemo(
    // User is winner, can claim NFT
    () => isEnded && hasWinner && isAddressMatch(userAddress, winnerAddress),
    [isEnded, hasWinner, userAddress, winnerAddress]
  )

  console.log('PRIMARY', primaryAuction)

  if (!primaryAuction) return null

  //if (isEnded) {     // Anyone can settle auction
  if (isClaimable) {
    // User is winner, can claim NFT

    return (
      <NFTPrimaryAuctionEndedSettlement
        nftObj={nftObj}
        primaryAuction={primaryAuction}
        {...props}
      />
    )
  }

  if (isEnded) {
    return (
      <NFTPrimaryAuctionEndedSummary
        nftObj={nftObj}
        primaryAuction={primaryAuction}
        {...props}
      />
    )
  }

  return (
    <NFTPrimaryAuctionActive nftObj={nftObj} primaryAuction={primaryAuction} {...props} />
  )
}
