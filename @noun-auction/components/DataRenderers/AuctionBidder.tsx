import { useEnsName } from 'wagmi'

import Link from 'next/link'

import { useMemo } from 'react'

import { AddressZero } from '@ethersproject/constants'
import { auctionWrapperVariants } from '@noun-auction/styles/NounishStyles.css'
import { isAddressMatch, useShortAddress } from '@shared'
import { addressToEtherscanLink } from '@shared/utils/addressToEtherscanLink'
import { Flex, FlexProps, Heading, Icon, Label, Paragraph } from '@zord'

import { EnsAvatar } from './EnsAvatar'

interface AuctionBidderProps extends FlexProps {
  label?: string
  showLabels?: boolean
  useAvatar?: boolean
  layout: keyof typeof auctionWrapperVariants['layout']
  highestBidder?: string
  className?: string
}

export function AuctionBidder({
  label = 'Top bidder',
  direction = 'row',
  showLabels,
  useAvatar = true,
  layout,
  highestBidder,
  className,
  ...props
}: AuctionBidderProps) {
  const hasNonZeroHighestBidder = useMemo(
    () => !isAddressMatch(highestBidder, AddressZero),
    [highestBidder]
  )

  const { data: ensName } = useEnsName({
    address: highestBidder,
  })

  const shortAddress = useShortAddress(highestBidder)
  const bidderEtherscanLink = useMemo(
    () => (highestBidder ? addressToEtherscanLink(highestBidder) : undefined),
    [highestBidder]
  )

  return (
    <Flex
      className={className}
      direction={direction}
      gap={direction === 'row' ? 'x2' : 'x2'}
      align={direction === 'row' ? 'center' : 'flex-start'}
      wrap="wrap"
      display={{
        '@initial': `${layout === 'row' ? 'none' : 'flex'}`,
        '@1024': 'flex',
      }}
      {...props}
    >
      {showLabels && (
        <Paragraph color={layout === 'sideBarBid' ? 'tertiary' : 'secondary'}>
          {label}&nbsp;
        </Paragraph>
      )}
      {/* <Flex> */}
      <Heading
        size="xs"
        // size="md"
        align="right"
        // color={hasNonZeroHighestBidder ? 'primary' : 'tertiary'}
      >
        {hasNonZeroHighestBidder ? (
          <Flex gap="x2" align="center">
            {bidderEtherscanLink && (
              <Link href={bidderEtherscanLink} passHref rel="noreferrer" target="_blank">
                <a>
                  <Flex gap="x1">
                    <Heading size="xs" align="center">
                      {ensName ?? shortAddress}
                    </Heading>
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
                </a>
              </Link>
            )}
          </Flex>
        ) : (
          <>No bids</>
        )}
      </Heading>
      {/* </Flex> */}
    </Flex>
  )
}
