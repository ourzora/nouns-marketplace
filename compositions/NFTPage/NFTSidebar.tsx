import { Link } from 'components'
import { mediumFont } from 'styles/styles.css'
import { OffchainOrderWithToken } from 'types/zora.api.generated'

import { usePrimarySalePrice } from 'hooks/usePrimarySalePrice'
import { useToken } from 'hooks/useToken'

import { useMemo } from 'react'
import { TypeSafeMarket } from 'validators/market'
import { TypeSafeToken } from 'validators/token'

import { CollectionThumbnail } from '@media'
import { useNounishAuctionQuery } from '@noun-auction'
import { useIsOwner } from '@shared'
import { DescriptionWithMaxLines } from '@shared/components'
import { Flex, Heading, Stack, StackProps } from '@zoralabs/zord'

import { NFTMarket } from './NFTMarket'
import * as styles from './NFTPage.css'
import { NFTProvenance } from './NFTProvenance'

export interface NFTSidebarProps extends StackProps {
  collectionAddress: string
  tokenId: string
  offchainOrders?: OffchainOrderWithToken[]
  token: TypeSafeToken
  markets: TypeSafeMarket[]
}

export function NFTSidebar({
  collectionAddress,
  tokenId,
  offchainOrders,
  ...props
}: Omit<NFTSidebarProps, 'token' | 'markets'>) {
  const { token, markets } = useToken({ collectionAddress, tokenId })

  if (!token) return null

  return (
    <NFTSidebarComponent
      markets={markets}
      collectionAddress={collectionAddress}
      tokenId={tokenId}
      offchainOrders={offchainOrders}
      token={token}
      {...props}
    />
  )
}

export function NFTSidebarComponent({
  className,
  collectionAddress,
  tokenId,
  offchainOrders,
  token,
  markets,
  ...props
}: NFTSidebarProps) {
  const { primarySalePrice, hasPrimarySalePrice } = usePrimarySalePrice({
    collectionAddress,
  })
  const { activeAuction } = useNounishAuctionQuery({
    collectionAddress,
  })

  const isActiveAuctionToken = useMemo(
    () => activeAuction?.tokenId === tokenId,
    [activeAuction?.tokenId, tokenId]
  )

  const { isOwner } = useIsOwner(token)

  return (
    <Stack
      id="nft-info-sidebar"
      className={[styles.nftInfoSidebar, className]}
      {...props}
    >
      <Flex>
        <Link href={`/collections/${token.collectionAddress}`}>
          <CollectionThumbnail
            collectionAddress={token.collectionAddress}
            showTitle
            size="xxs"
            radius="round"
            p="x2"
            pr="x5"
            backgroundColor="background2"
            borderRadius="round"
          />
        </Link>
      </Flex>
      <Flex justify="space-between" align="center">
        <Heading as="h1" size="xl">
          {token?.name}
        </Heading>
      </Flex>

      <DescriptionWithMaxLines
        baseLineheight={30}
        maxLines={2}
        paragraphClassName={mediumFont}
        overflowY="hidden"
        description={token.description}
      />
      <Stack gap="x4" mt="auto">
        {hasPrimarySalePrice && (
          <NFTProvenance primarySalePrice={primarySalePrice} token={token} />
        )}
        {activeAuction && (
          <NFTMarket
            activeAuction={activeAuction}
            isActiveAuctionToken={isActiveAuctionToken}
            markets={markets}
            isOwner={isOwner}
            tokenId={tokenId}
            collectionAddress={token.collectionAddress}
            collectionName={token.collectionName}
            offchainOrders={offchainOrders}
          />
        )}
      </Stack>
    </Stack>
  )
}
