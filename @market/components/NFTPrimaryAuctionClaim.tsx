import { TypeSafeNounsAuction } from 'validators/auction'

import { useNounishAuctionHelper } from '@market/hooks/useNounishAuctionHelper'
import { PriceWithLabel } from '@shared'
import { NFTObject } from '@zoralabs/nft-hooks'
import { FlexProps, Paragraph, Well } from '@zord'

interface ClaimProps extends FlexProps {
  nftObj: NFTObject
  primaryAuction: TypeSafeNounsAuction
}

export function NFTPrimaryAuctionClaim({ nftObj, primaryAuction, ...props }: ClaimProps) {
  const { formattedCryptoHighestBidPrice, formattedUSDHighestBidPrice } =
    useNounishAuctionHelper({
      auction: primaryAuction,
    })

  return (
    <Well gap="x4" p="x6" borderRadius="phat" {...props}>
      {formattedCryptoHighestBidPrice && formattedUSDHighestBidPrice && (
        <PriceWithLabel
          symbol="ETH"
          cryptoAmount={formattedCryptoHighestBidPrice}
          usdAmount={formattedUSDHighestBidPrice}
          label="Sold for"
        />
      )}
      <Paragraph size="md" color="text2">
        Ownership will be transferred after you claim the NFT
      </Paragraph>
    </Well>
  )
}
