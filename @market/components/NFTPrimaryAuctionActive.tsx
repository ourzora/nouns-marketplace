import { TypeSafeNounsAuction } from 'validators/auction'

import { useAuctionDataTable } from '@market/hooks'
import { useNounishAuctionHelper } from '@market/hooks/useNounishAuctionHelper'
import { PlaceNounsBid } from '@noun-auction'
import { DataTable, PriceWithLabel } from '@shared'
import { FlexProps, Stack } from '@zoralabs/zord'

interface NFTPrimaryAuctionActiveProps extends FlexProps {
  primaryAuction: TypeSafeNounsAuction
  collectionAddress: string
  tokenId: string
}

export function NFTPrimaryAuctionActive({
  primaryAuction,
  collectionAddress,
  tokenId,
  ...props
}: NFTPrimaryAuctionActiveProps) {
  const { formattedCryptoHighestBidPrice, formattedUSDHighestBidPrice, hasBid } =
    useNounishAuctionHelper({
      auction: primaryAuction,
    })

  const { formattedAuctionDataTable } = useAuctionDataTable({
    primaryAuction,
  })

  return (
    <Stack gap="x4" {...props}>
      <DataTable rowSize="lg" items={formattedAuctionDataTable} />
      <Stack gap="x4" backgroundColor="accent" borderRadius="phat" p="x6">
        {formattedCryptoHighestBidPrice && formattedUSDHighestBidPrice && (
          <PriceWithLabel
            symbol="ETH"
            cryptoAmount={formattedCryptoHighestBidPrice}
            usdAmount={hasBid ? formattedUSDHighestBidPrice : 0}
            label="Current Bid"
            invertColor
          />
        )}
        <PlaceNounsBid
          layout="sideBarBid"
          collectionAddress={collectionAddress}
          tokenId={tokenId}
          enableModal
        />
      </Stack>
    </Stack>
  )
}
