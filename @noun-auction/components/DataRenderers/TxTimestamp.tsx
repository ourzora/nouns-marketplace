import { useMemo } from 'react'
import { FlexProps, Flex, Stack, Label, Icon } from '@zoralabs/zord'
import { lightFont } from '@shared'
import { format } from 'date-fns'

export interface TxTimestampProps extends FlexProps {
  transactionInfo: {
    transactionHash: string
    blockTimestamp: string
  }
}

export function TxTimestamp({ transactionInfo }: TxTimestampProps) {
  const timeStamp = useMemo(() => {
    try {
      return format(new Date(transactionInfo.blockTimestamp), 'LLL dd, kk:mm:ss')
    } catch (err) {
      console.error(err)
      return null
    }
  }, [transactionInfo])

  return (
    <Stack>
      <Flex
        as="a"
        href={`https://etherscan.io/tx/${transactionInfo.transactionHash}`}
        target="_blank"
        rel="noreferrer"
        align="center"
        gap="x1"
      >
        <Label className={lightFont} color="tertiary">
          {timeStamp}
        </Label>
        <Icon id="ArrowRightAngle" color="tertiary" />
      </Flex>
    </Stack>
  )
}
