// import { BigNumber } from 'ethers'
import BigNumber from 'bignumber.js'

import { useMemo } from 'react'
import { TypeSafeNounsAuction } from 'validators/auction'

import { useNounishAuctionHelper } from '@market/hooks/useNounishAuctionHelper'
import { AuctionCountdown, PlaceNounsBid } from '@noun-auction'
import { useIsAuctionCompleted } from '@noun-auction/hooks/useIsAuctionCompleted'
import { PriceWithLabel, formatCryptoVal, numberFormatterUSDC } from '@shared'
import { NFTObject } from '@zoralabs/nft-hooks'
import { Box, FlexProps, Label, Stack } from '@zoralabs/zord'

interface NFTPrimaryAuctionActiveProps extends FlexProps {
  nftObj: NFTObject
  primaryAuction: TypeSafeNounsAuction
}

export function NFTPrimaryAuctionActive({
  nftObj,
  primaryAuction,
  ...props
}: NFTPrimaryAuctionActiveProps) {
  const { highestBidPrice, highestBidder, endTime, isEnded, now } =
    useNounishAuctionHelper({
      auction: primaryAuction,
    })
  // const {
  //   // countdownText,
  //   isEnded } = useIsAuctionCompleted({
  //   activeAuction: primaryAuction,
  // })

  const cryptoPrice = useMemo(
    () =>
      highestBidPrice?.nativePrice.raw
        ? formatCryptoVal(parseFloat(highestBidPrice?.nativePrice.raw))
        : '...',
    [highestBidPrice?.nativePrice.raw]
  )
  const formattedUSD = useMemo(
    () =>
      highestBidPrice?.usdcPrice?.decimal
        ? numberFormatterUSDC(highestBidPrice?.usdcPrice?.decimal)
        : '...',
    [highestBidPrice?.usdcPrice?.decimal]
  )

  return (
    <Stack gap="x2">
      {/* REPLACE WITH DATA TABLE */}
      <Label>TopBidder</Label>
      {/* <Label>EndsIn {countdownText}</Label> */}

      <AuctionCountdown
        auctionCompleted={isEnded}
        auctionEndTime={endTime}
        // showLabels
        align="flex-start"
        direction="column"
      />

      <Stack gap="x4" backgroundColor="accent" borderRadius="phat" p="x6">
        {cryptoPrice && (
          <PriceWithLabel
            symbol="ETH"
            cryptoAmount={cryptoPrice}
            usdAmount={formattedUSD}
            label="Current Bid"
            invertColor
          />
        )}
        {nftObj.nft?.contract.address && (
          <PlaceNounsBid
            layout="sideBarBid"
            collectionAddress={nftObj.nft?.contract.address}
            tokenId={nftObj.nft?.tokenId}
            enableModal
          />
        )}
      </Stack>
    </Stack>
  )
}
