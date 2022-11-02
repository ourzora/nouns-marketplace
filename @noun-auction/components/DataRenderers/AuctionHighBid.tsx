import { useMemo } from 'react'
import { TypeSafeNounsAuction } from 'validators/auction'

import { useIsAuctionCompleted } from '@noun-auction/hooks/useIsAuctionCompleted'
import { sidebarHighBid } from '@noun-auction/styles/NounishStyles.css'
import { lightFont } from '@shared'
import { Flex, Label } from '@zoralabs/zord'

import { EthAmount } from './EthAmount'

type Props = {
  showLabels?: boolean
  layout: string
  highestBid?: string
  collectionAddress: string
  className?: any
  auctionCompleted: boolean
  styles: {
    [k: string]: any
  }
}

export function AuctionHighBid({
  showLabels,
  collectionAddress,
  highestBid,
  layout,
  styles,
  auctionCompleted,
  ...props
}: Props) {
  const label = styles.label || 'Current bid'
  const layoutDirection = styles.layoutDirection || 'row'

  // console.log('AuctionHighBid', { auctionCompleted, highestBid })

  return useMemo(
    () => (
      <Flex
        direction={layoutDirection}
        gap={layoutDirection === 'row' ? 'x2' : 'x0'}
        {...props}
      >
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
    [highestBid, label, layout, layoutDirection, props, showLabels, auctionCompleted]
  )
}
