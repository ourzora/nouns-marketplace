import { useEffect, useMemo } from 'react'
import { useEnsName } from 'wagmi'
import { Flex, Label, Icon } from '@zoralabs/zord'
import { AddressZero } from '@ethersproject/constants'

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
  useAvatar = true,
  useTxLink = false,
  ...props
}: {
  useAvatar?: boolean
} & SharedDataRendererProps & { useTxLink?: boolean }) {
  const { layout, auctionData } = useNounishAuctionProvider()

  const { data: ensName } = useEnsName({
    address: auctionData?.rpcData?.bidder,
  })

  const shortAddress = useShortAddress(auctionData?.rpcData?.bidder)

  const buildTxLink = useMemo(
    () => `https://etherscan.io/tx/${auctionData?.bidder.txHash}`,
    [auctionData?.bidder.txHash]
  )

  return (
    <Flex
      direction={layoutDirection}
      as={useTxLink ? 'a' : 'div'}
      href={useTxLink ? buildTxLink : ''}
      target="_blank"
      gap={layoutDirection === 'row' ? 'x2' : 'x0'}
      rel="noreferrer"
      align={layoutDirection === 'row' ? 'center' : 'flex-start'}
      wrap="wrap"
      display={{
        '@initial': `${layout === 'row' ? 'none' : 'flex'}`,
        '@1024': 'flex',
      }}
      pointerEvents={useTxLink ? 'all' : 'none'}
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
          className={[sideBarUpperLabel]}
          color={auctionData?.rpcData?.bidder !== AddressZero ? 'primary' : 'tertiary'}
        >
          {auctionData?.rpcData?.bidder !== AddressZero ? (
            <Flex gap="x2" align="center">
              <Label size="md" gap="x1" align={'center'} style={{ lineHeight: '1.15' }}>
                {ensName ? ensName : shortAddress}
              </Label>
              {useAvatar && (
                <>
                  {layout !== 'sideBarBid' ? (
                    <EnsAvatar address={auctionData?.rpcData?.bidder} />
                  ) : (
                    <Icon id="ArrowRightAngle" />
                  )}
                </>
              )}
            </Flex>
          ) : (
            <>No bids</>
          )}
        </Label>
      </Flex>
    </Flex>
  )
}
