import { StackProps, Stack, Label } from '@zoralabs/zord'
import { TxTimestamp } from './TxTimestamp'
import { useNounishAuctionProvider } from '@noun-auction/providers'

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
    dao: { classifierPrefix, collectionAddress },
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
