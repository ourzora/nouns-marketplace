import { TypeSafeNounsAuction } from 'validators/auction'

import { useIsAuctionCompleted } from '@noun-auction/hooks/useIsAuctionCompleted'
import { sidebarHighBid } from '@noun-auction/styles/NounishStyles.css'
import { lightFont } from '@shared'
import { Flex, Label } from '@zoralabs/zord'

import { EthAmount } from './EthAmount'

type Props = {
  // activeAuction: TypeSafeNounsAuction
  showLabels?: boolean
  layout: string
  highestBid?: string
  collectionAddress: string
  className?: any
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
  ...props
}: Props) {
  const timerComplete = useIsAuctionCompleted({
    collectionAddress,
  })
  const label = styles.label || 'Current bid'
  const layoutDirection = styles.layoutDirection || 'row'

  return (
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
          {timerComplete ? 'Winning bid' : label}
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
  )
}
