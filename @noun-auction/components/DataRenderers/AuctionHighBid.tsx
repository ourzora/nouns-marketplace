import { useMemo } from 'react'

import { sidebarHighBid } from '@noun-auction/styles/NounishStyles.css'
import { lightFont } from '@shared'
import { Flex, FlexProps, Label } from '@zoralabs/zord'

import { EthAmount } from './EthAmount'

interface HighBidProps extends FlexProps {
  showLabels?: boolean
  layout: string
  highestBid?: string
  collectionAddress: string
  className?: any
  auctionCompleted: boolean
  label?: string
}

export function AuctionHighBid({
  showLabels,
  highestBid,
  layout,
  direction = 'row',
  label = 'Current bid',
  auctionCompleted,
}: HighBidProps) {
  return useMemo(
    () => (
      <Flex direction={direction} gap={direction === 'row' ? 'x2' : 'x0'}>
        {showLabels && (
          <Label
            size={layout === 'sideBarBid' ? 'lg' : 'md'}
            className={lightFont}
            style={{ lineHeight: '1.15' }}
            align={layout === 'sideBarBid' ? 'left' : 'right'}
            color={layout === 'sideBarBid' ? 'tertiary' : 'secondary'}
            mb={layout === 'sideBarBid' ? 'x2' : 'x0'}
          >
            {auctionCompleted ? 'Winning bid' : label}
          </Label>
        )}
        {highestBid && (
          <EthAmount
            style={{ lineHeight: '1.15' }}
            size="md"
            align={layout === 'sideBarBid' ? 'left' : 'right'}
            className={layout === 'sideBarBid' && sidebarHighBid}
            ethAmount={highestBid}
          />
        )}
      </Flex>
    ),
    [direction, showLabels, layout, auctionCompleted, label, highestBid]
  )
}
