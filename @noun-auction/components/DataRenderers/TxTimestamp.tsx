import { format } from 'date-fns'

import { useMemo } from 'react'

import * as Sentry from '@sentry/react'
import { lightFont } from '@shared'
import { Flex, FlexProps, Icon, Label, Stack } from '@zoralabs/zord'

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
      Sentry.captureException(err)
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
        <Label className={lightFont} color="text3">
          {timeStamp}
        </Label>
        <Icon id="ArrowRightAngle" color="text3" />
      </Flex>
    </Stack>
  )
}
