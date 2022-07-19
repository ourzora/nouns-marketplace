import { useMemo } from 'react'
import { useEnsName } from 'wagmi'
import { Flex, Label, Icon } from '@zoralabs/zord'

// @noun-auction
import { SharedDataRendererProps } from '@noun-auction/typings'
import { EnsAvatar } from './EnsAvatar'
import { useNounishAuctionProvider } from '@noun-auction/providers'
import { sideBarUpperLabel } from '@noun-auction/styles/NounishStyles.css'

// @shared
import { useShortAddress } from 'hooks/useShortAddress'
import { lightFont } from 'styles/styles.css'

export function AuctionBidder({
  label = 'Top bidder',
  layoutDirection = 'row',
  showLabels,
  txHash,
  address,
  ...props
}: {
  address: string
  txHash: string
} & SharedDataRendererProps) {
  const { data: ensName } = useEnsName({
    address: address,
  })
  const { layout } = useNounishAuctionProvider()
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
      {...props}
    >
      {showLabels && (
        <Label
          size="md"
          className={[layout === 'sideBarBid' && sideBarUpperLabel, lightFont]}
          color={layout === 'sideBarBid' ? 'tertiary' : 'secondary'}
          style={{ lineHeight: '1.15' }}
          textAlign="right"
        >
          {label}&nbsp;
        </Label>
      )}
      <Flex>
        <Label
          size="md"
          style={{ lineHeight: '1.15' }}
          align="right"
          className={sideBarUpperLabel}
        >
          <Flex gap="x2" align="center">
            <Flex gap="x1" align={'center'} style={{ lineHeight: '1.15' }}>
              {ensName ? ensName : shortAddress}
            </Flex>
            {layout !== 'sideBarBid' ? (
              <EnsAvatar address={address} />
            ) : (
              <Icon id="ArrowRightAngle" />
            )}
          </Flex>
        </Label>
      </Flex>
    </Flex>
  )
}
