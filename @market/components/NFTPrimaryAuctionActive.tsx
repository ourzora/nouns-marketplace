import { NFTOffchainOrders } from 'compositions'
import { OffchainOrderWithToken } from 'types/zora.api.generated'

import { useMemo } from 'react'
import { TypeSafeNounsAuction } from 'validators/auction'

import { FillV3AskModal } from '@market/components/FillV3AskModal'
import { useAskHelper, useRelevantMarket } from '@market/hooks'
import { useNounishAuctionHelper } from '@market/hooks/useNounishAuctionHelper'
import { PrivateAskSidebar } from '@market/modules/PrivateAsk/PrivateAskSidebar'
import { UniversalListAskModal } from '@market/modules/PrivateAsk/UniversalListAskModal'
import { PriceWithLabel, formatCryptoVal, numberFormatterUSDC } from '@shared'
import { useIsOwner } from '@shared/hooks/useIsOwner'
import { NFTObject } from '@zoralabs/nft-hooks'
import { Box, FlexProps, Label, Stack } from '@zoralabs/zord'

export interface NFTPrimaryAuctionProps extends FlexProps {
  // nftObj: NFTObject
  primaryAuction: TypeSafeNounsAuction
}

export function NFTPrimaryAuctionActive({
  // nftObj,
  primaryAuction,
  ...props
}: NFTPrimaryAuctionProps) {
  const { highestBidPrice } = useNounishAuctionHelper({ auction: primaryAuction })

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
      <Label>EndsIn</Label>
      <Box>
        <Stack gap="x2">
          <PriceWithLabel
            symbol="ETH"
            // cryptoAmount={formatCryptoVal(highestBidPrice?.nativePrice.decimal)}
            cryptoAmount={highestBidPrice?.nativePrice.decimal.toString()!}
            usdAmount={formattedUSD}
            label="Current Bid"
          />
        </Stack>
      </Box>
    </Stack>
  )

  return <Box>I AM AN UNENDED PRIMARY AUCTION</Box> // show sidebar panel with: active price / countdown + Place Bid button
}
