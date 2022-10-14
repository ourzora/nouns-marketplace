import { useEnsName } from 'wagmi'

import {
  transactionBidder,
  transactionEventWrapper,
} from '@noun-auction/styles/NounishStyles.css'
import { lightFont, useShortAddress } from '@shared'
import { Flex, Grid, GridProps, Label, Stack } from '@zoralabs/zord'

import { EnsAvatar } from './EnsAvatar'
import { EthAmount } from './EthAmount'
import { TxTimestamp } from './TxTimestamp'

export interface BidTransactionEventProps extends GridProps {
  transactionInfo: {
    transactionHash: string
    blockTimestamp: string
  }
  sender: string
  message: string
  value: string
}

export function BidTransactionEvent({
  transactionInfo,
  sender,
  message,
  value,
  ...props
}: BidTransactionEventProps) {
  const { data: ensName } = useEnsName({
    address: sender,
  })

  const shortAddress = useShortAddress(sender)

  return (
    <Grid
      className={[transactionEventWrapper, 'nounish-auction__bid-transaction-event']}
      {...props}
    >
      <Grid className={transactionBidder}>
        <EnsAvatar w="100%" h="x12" address={sender} style={{ alignSelf: 'center' }} />
        <Stack
          justify={{
            '@initial': 'flex-start',
            '@1024': 'center',
          }}
        >
          <Flex
            direction={{
              '@initial': 'column',
              '@1024': 'row',
            }}
            gap={{
              '@initial': 'x0',
              '@1024': 'x2',
            }}
          >
            <Label style={{ lineHeight: 1.25 }}>{ensName ? ensName : shortAddress}</Label>
            <Label style={{ lineHeight: 1.25 }} className={lightFont}>
              {message}
            </Label>
          </Flex>
          <TxTimestamp transactionInfo={transactionInfo} />
        </Stack>
      </Grid>
      <Flex justify="flex-end">
        <EthAmount ethAmount={value} />
      </Flex>
    </Grid>
  )
}
