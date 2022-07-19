import { useMemo } from 'react'
import { GridProps, Flex, Grid, Stack, Label } from '@zoralabs/zord'
import { useEnsName } from 'wagmi'
import { EnsAvatar } from './EnsAvatar'
import { EthAmount } from './EthAmount'
import { useShortAddress } from 'hooks'
import {
  transactionEventWrapper,
  lightFont,
} from '@noun-auction/styles/NounishStyles.css'
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
    <Grid className={[transactionEventWrapper]} {...props}>
      <Flex gap="x4">
        <EnsAvatar w="x12" h="x12" address={sender} />
        <Stack>
          <Flex align="center">
            <Label>{ensName ? ensName : shortAddress}</Label>
            <Label className={lightFont}>&nbsp;{message}</Label>
          </Flex>
          <TxTimestamp transactionInfo={transactionInfo} />
        </Stack>
      </Flex>
      <Flex justify="flex-end">
        <EthAmount ethAmount={value} />
      </Flex>
    </Grid>
  )
}
