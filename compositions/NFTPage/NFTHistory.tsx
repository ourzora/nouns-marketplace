import { Stack, StackProps } from '@zoralabs/zord'
import { returnDao } from 'constants/collection-addresses'
import { NounishAuction } from '@noun-auction'
import { useNFTProvider } from '@shared'

export interface NFTHistoryProps extends StackProps {}

export function NFTHistory({ ...props }: NFTHistoryProps) {
  const { contractAddress, tokenId } = useNFTProvider()

  const dao = returnDao(contractAddress)

  if (!dao) return null

  return (
    <Stack {...props}>
      <NounishAuction
        showAuctionRow={false}
        daoConfig={dao}
        tokenId={tokenId}
        showBidHistory
        showLabels
        layout="historyOnly"
        /* Wrapper Styling */
        borderColor="secondary"
        borderStyle="solid"
        borderWidth="normal"
        borderRadius="phat"
        backgroundColor="primary"
        px="x4"
        pt="x5"
        pb="x2"
      />
    </Stack>
  )
}
