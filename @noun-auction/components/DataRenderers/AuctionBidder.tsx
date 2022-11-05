import { useEnsName } from 'wagmi'

import { useMemo } from 'react'
import { TypeSafeNounsAuction } from 'validators/auction'

import { AddressZero } from '@ethersproject/constants'
import {
  auctionWrapperVariants,
  sideBarUpperLabel,
} from '@noun-auction/styles/NounishStyles.css'
import { isAddressMatch, lightFont, useShortAddress } from '@shared'
import { Flex, Icon, Label } from '@zoralabs/zord'

import { EnsAvatar } from './EnsAvatar'

type AuctionBidderProps = {
  label?: string
  layoutDirection?: 'row' | 'column'
  showLabels?: boolean
  useAvatar?: boolean
  layout: keyof typeof auctionWrapperVariants['layout']
  highestBidder?: string
  className?: string
  styles: {
    [key: string]: any
  }
}

export function AuctionBidder({
  label = 'Top bidder',
  layoutDirection = 'row',
  showLabels,
  useAvatar = true,
  layout,
  highestBidder,
  className,
  styles,
}: AuctionBidderProps) {
  const hasNonZeroHighestBidder = useMemo(
    () => !isAddressMatch(highestBidder, AddressZero),
    [highestBidder]
  )

  const { data: ensName } = useEnsName({
    address: highestBidder,
  })

  const shortAddress = useShortAddress(highestBidder)

  return (
    <Flex
      className={className}
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
      {...styles}
    >
      {showLabels && (
        <Label
          size="md"
          className={[layout === 'sideBarBid' && sideBarUpperLabel, lightFont]}
          color={layout === 'sideBarBid' ? 'tertiary' : 'secondary'}
          style={{ lineHeight: '1.15' }}
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
          color={hasNonZeroHighestBidder ? 'primary' : 'tertiary'}
        >
          {hasNonZeroHighestBidder ? (
            <Flex gap="x2" align="center">
              <Label size="md" gap="x1" align={'center'} style={{ lineHeight: '1.15' }}>
                {ensName ?? shortAddress}
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
