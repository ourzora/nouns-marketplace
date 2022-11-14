import { useNounishAuctionProvider } from '@noun-auction'
import { Label, Stack, StackProps } from '@zoralabs/zord'

import { TxTimestamp } from './TxTimestamp'

export interface EventWithTimestampProps extends StackProps {
  label: string
  transactionInfo: {
    transactionHash: string
    blockTimestamp: string
  }
}

export function EventWithTimestamp({ transactionInfo, label }: EventWithTimestampProps) {
  const {
    tokenId,
    daoConfig: { classifierPrefix, contractAddress },
  } = useNounishAuctionProvider()

  return (
    <Stack>
      <Label gap="x1" style={{ textTransform: 'capitalize' }}>
        {label}
      </Label>
      <TxTimestamp transactionInfo={transactionInfo} />
    </Stack>
  )
}
