import { NounishAuction, useOneNounsDao } from '@noun-auction'
import { Heading, Stack, StackProps } from '@zoralabs/zord'

import { nftMarketWrapper } from './NFTPage.css'

export interface NFTHistoryProps extends StackProps {
  contractAddress: string
  tokenId: string
}

export function NFTHistory({ contractAddress, tokenId, ...props }: NFTHistoryProps) {
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
          showBidHistory
          layout="historyOnly"
        />
      </Stack>
    </Stack>
  )
}
