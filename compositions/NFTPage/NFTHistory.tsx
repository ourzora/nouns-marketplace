import { NounishAuction, useOneNounsDao } from '@noun-auction'
import { Heading, Stack, StackProps } from '@zord'

import { nftMarketWrapper } from './NFTPage.css'

export interface NFTHistoryProps extends StackProps {
  collectionAddress: string
  tokenId: string
}

export function NFTHistory({ collectionAddress, tokenId, ...props }: NFTHistoryProps) {
  const { dao } = useOneNounsDao({ collectionAddress })

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
