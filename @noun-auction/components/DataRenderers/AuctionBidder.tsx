import { useEnsName } from 'wagmi'

import Link from 'next/link'

import { useMemo } from 'react'

import { SharedDataRendererProps, useNounishAuctionProvider } from '@noun-auction'
import { sideBarUpperLabel } from '@noun-auction/styles/NounishStyles.css'
import { lightFont, useShortAddress } from '@shared'
import { addressToEtherscanLink } from '@shared/utils/addressToEtherscanLink'
import { Flex, Icon, Label } from '@zoralabs/zord'

import { EnsAvatar } from './EnsAvatar'

export function AuctionBidder({
  label = 'Top bidder',
  layoutDirection = 'row',
  showLabels,
  useAvatar = true,
  ...props
}: {
  useAvatar?: boolean
} & SharedDataRendererProps) {
  const { layout, highestBidderAddress, hasNonZeroHighestBidder } =
    useNounishAuctionProvider()

  const { data: ensName } = useEnsName({
    address: highestBidderAddress,
  })

  const shortAddress = useShortAddress(highestBidderAddress)
  const bidderEtherscanLink = useMemo(
    () =>
      highestBidderAddress ? addressToEtherscanLink(highestBidderAddress) : undefined,
    [highestBidderAddress]
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
              {bidderEtherscanLink && (
                <Link href={bidderEtherscanLink} passHref>
                  <a>
                    <Flex gap="x1">
                      <Label
                        size="md"
                        gap="x1"
                        align={'center'}
                        style={{ lineHeight: '1.15' }}
                      >
                        {ensName ?? shortAddress}
                      </Label>
                      {useAvatar && (
                        <>
                          {layout !== 'sideBarBid' && highestBidderAddress ? (
                            <EnsAvatar address={highestBidderAddress} />
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
        </Label>
      </Flex>
    </Flex>
  )
}
