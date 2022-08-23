import { useMemo } from 'react'
import { useEnsName } from 'wagmi'
import { Flex, Label, Icon } from '@zoralabs/zord'
import { AddressZero } from '@ethersproject/constants'

// @noun-auction
import { SharedDataRendererProps } from '@noun-auction/typings'
import { EnsAvatar } from './EnsAvatar'
import { useNounishAuctionProvider } from '@noun-auction/providers'
import { sideBarUpperLabel } from '@noun-auction/styles/NounishStyles.css'

// @shared
import { lightFont, useShortAddress, isAddressMatch } from '@shared'

export function AuctionBidder({
  label = 'Top bidder',
  layoutDirection = 'row',
  showLabels,
  useAvatar = true,
  ...props
}: {
  useAvatar?: boolean
} & SharedDataRendererProps) {
  const { layout, activeAuction } = useNounishAuctionProvider()

  const { data: ensName } = useEnsName({
    address: activeAuction?.properties?.highestBidder || undefined,
  })

  const shortAddress = useShortAddress(activeAuction?.properties?.highestBidder)

  const highestBidder = useMemo(
    () =>
      activeAuction?.properties?.highestBidder
        ? activeAuction?.properties?.highestBidder
        : undefined,
    [activeAuction, activeAuction?.properties?.highestBidder]
  )

  return (
    <Flex
      direction={layoutDirection}
      target="_blank"
      gap={layoutDirection === 'row' ? 'x2' : 'x0'}
      rel="noreferrer"
      align={layoutDirection === 'row' ? 'center' : 'flex-start'}
      wrap="wrap"
      display={{
        '@initial': `${layout === 'row' ? 'none' : 'flex'}`,
        '@1024': 'flex',
      }}
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
          color={!isAddressMatch(highestBidder, AddressZero) ? 'primary' : 'tertiary'}
        >
          {!isAddressMatch(highestBidder, AddressZero) ? (
            <Flex gap="x2" align="center">
              <Label size="md" gap="x1" align={'center'} style={{ lineHeight: '1.15' }}>
                {ensName ? ensName : shortAddress}
              </Label>
              {useAvatar && (
                <>
                  {layout !== 'sideBarBid' && highestBidder ? (
                    <EnsAvatar address={highestBidder} />
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
