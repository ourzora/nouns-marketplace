import { useMemo } from 'react'
import { Flex, Label, Icon } from '@zoralabs/zord'
import { useEnsName } from 'wagmi'
import { useShortAddress } from 'hooks/useShortAddress'
import { SharedDataRendererProps } from '@noun-auction/typings'
import { lightFont } from 'styles/styles.css'

export function AuctionBidder({
  label = 'Top bidder',
  layoutDirection = 'row',
  txHash,
  address,
}: {
  address: string
  txHash: string
} & SharedDataRendererProps) {
  const { data: ensName } = useEnsName({
    address: address,
  })

  const shortAddress = useShortAddress(address)

  const buildTxLink = useMemo(() => `https://etherscan.io/tx/${txHash}`, [txHash])

  return (
    <Flex
      direction={layoutDirection}
      as="a"
      href={buildTxLink}
      target="_blank"
      rel="noreferrer"
      align={layoutDirection === 'row' ? 'center' : 'flex-start'}
      wrap="wrap"
    >
      <Label
        size="lg"
        className={lightFont}
        color="secondary"
        style={{ lineHeight: '1.15' }}
      >
        {label}&nbsp;
      </Label>
      <Label size="lg" style={{ lineHeight: '1.15' }}>
        <Flex gap="x1" align={'center'} style={{ lineHeight: '1.15' }}>
          {ensName ? ensName : shortAddress}
          <Icon id="ArrowRightAngle" />
        </Flex>
      </Label>
    </Flex>
  )
}
