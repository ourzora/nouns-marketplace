import { Link } from 'components'
import { OffchainOrderWithToken } from 'types/zora.api.generated'

import { usePrimarySalePrice } from 'hooks/usePrimarySalePrice'
import { useToken } from 'hooks/useToken'

import { CollectionThumbnail } from '@media'
import { DescriptionWithMaxLines } from '@shared/components'
import { Flex, Heading, Stack, StackProps } from '@zord'

import { NFTMarket } from './NFTMarket'
import * as styles from './NFTPage.css'
import { NFTProvenance } from './NFTProvenance'

export interface NFTSidebarProps extends StackProps {
  collectionAddress: string
  tokenId: string
  offchainOrders?: OffchainOrderWithToken[]
}

export function NFTSidebar({
  collectionAddress,
  tokenId,
  offchainOrders,
  ...props
}: NFTSidebarProps) {
  if (!collectionAddress || !tokenId) return null

  return (
    <NFTSidebarComponent
      collectionAddress={collectionAddress}
      tokenId={tokenId}
      offchainOrders={offchainOrders}
      {...props}
    />
  )
}

export function NFTSidebarComponent({
  className,
  collectionAddress,
  tokenId,
  offchainOrders,
  ...props
}: NFTSidebarProps) {
  const { primarySalePrice, hasPrimarySalePrice } = usePrimarySalePrice({
    collectionAddress,
  })
  const { token } = useToken({ collectionAddress, tokenId })

  if (!token) return null

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
        baseLineheight={24}
        maxLines={2}
        overflowY="hidden"
        description={token.description}
      />
      <Stack gap="x4" mt="auto">
        {hasPrimarySalePrice && (
          <NFTProvenance primarySalePrice={primarySalePrice} token={token} />
        )}
        <NFTMarket
          collectionAddress={collectionAddress}
          offchainOrders={offchainOrders}
        />
      </Stack>
    </Stack>
  )
}
