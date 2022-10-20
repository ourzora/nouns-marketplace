import { returnDao } from 'constants/collection-addresses'

import { NounishAuction, useOneNounsDao } from '@noun-auction'
import { useNFTProvider } from '@shared'
import { Heading, Stack, StackProps } from '@zoralabs/zord'

import { nftMarketWrapper } from './NFTPage.css'

export interface NFTHistoryProps extends StackProps {}

export function NFTHistory({ ...props }: NFTHistoryProps) {
  const { contractAddress, tokenId } = useNFTProvider()

  const { dao } = useOneNounsDao({ contractAddress })

  if (!dao) return null

  return (
    <Stack
      {...props}
      px={{
        '@initial': 'x4',
        '@1024': 'x0',
      }}
    >
      <Stack className={nftMarketWrapper}>
        <Heading as="h3">History</Heading>
        <NounishAuction
          showAuctionRow={false}
          dao={dao}
          tokenId={tokenId}
          showBidHistory
          layout="historyOnly"
        />
      </Stack>
    </Stack>
  )
}
