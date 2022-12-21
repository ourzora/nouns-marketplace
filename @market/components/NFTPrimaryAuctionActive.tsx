import { TypeSafeNounsAuction } from 'validators/auction'

import { useAuctionDataTable } from '@market/hooks'
import { useNounishAuctionHelper } from '@market/hooks/useNounishAuctionHelper'
import { PlaceNounsBid } from '@noun-auction'
import { DataTable, PriceWithLabel } from '@shared'
import { NFTObject } from '@zoralabs/nft-hooks'
import { FlexProps, Stack } from '@zord'

interface NFTPrimaryAuctionActiveProps extends FlexProps {
  nftObj: NFTObject
  primaryAuction: TypeSafeNounsAuction
}

export function NFTPrimaryAuctionActive({
  nftObj,
  primaryAuction,
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
      <DataTable rowSize="md" items={formattedAuctionDataTable} />
      <Stack gap="x4" backgroundColor="accent" borderRadius="phat" p="x6">
        {formattedCryptoHighestBidPrice && formattedUSDHighestBidPrice && (
          <PriceWithLabel
            symbol="ETH"
            cryptoAmount={formattedCryptoHighestBidPrice}
            usdAmount={hasBid ? formattedUSDHighestBidPrice : '$0'}
            label="Current Bid"
            invertColor
          />
        )}
        {nftObj?.nft?.contract.address && (
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
