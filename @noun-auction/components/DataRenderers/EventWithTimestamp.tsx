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
  return (
    <Stack>
      <Label gap="x1" style={{ textTransform: 'capitalize' }}>
        {label}
      </Label>
      <TxTimestamp transactionInfo={transactionInfo} />
    </Stack>
  )
}
