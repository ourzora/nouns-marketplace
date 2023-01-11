import { TypeSafeNounsAuction } from 'validators/auction'

import { useNounishAuctionHelper } from '@market/hooks/useNounishAuctionHelper'
import { SettleAuction } from '@noun-auction'
import { NFTObject } from '@zoralabs/nft-hooks'
import { FlexProps, Paragraph, Well } from '@zord'

interface SettlementProps extends FlexProps {
  nftObj: NFTObject
  primaryAuction: TypeSafeNounsAuction
}

const paragraphCopy = {
  claimant: 'Ownership will be transferred after you claim the NFT',
  everyoneElse:
    'Ownership will be transferred to the winner after you settle the auction', // @BJ TODO: add copy for other users
}

export function NFTPrimaryAuctionEndedSettlement({
  nftObj,
  primaryAuction,
  ...props
}: SettlementProps) {
  const { isClaimable } = useNounishAuctionHelper({
    auction: primaryAuction,
  })

  return (
    <Well gap="x4" p="x6" borderRadius="phat" {...props}>
      <SettleAuction
        auctionContractAddress={primaryAuction.address}
        layout="sideBarBid"
        buttonVariant="primary"
        settlementType={isClaimable ? 'claim' : 'settle'}
      />

      <Paragraph size="md" color="text2">
        {isClaimable ? paragraphCopy.claimant : paragraphCopy.everyoneElse}
      </Paragraph>
    </Well>
  )
}
