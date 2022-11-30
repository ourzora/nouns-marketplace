import { Link } from 'components'
import { mediumFont } from 'styles/styles.css'
import { OffchainOrderWithToken } from 'types/zora.api.generated'

import { usePrimarySalePrice } from 'hooks/usePrimarySalePrice'
import { useToken } from 'hooks/useToken'

import { CollectionThumbnail } from '@media'
import { DescriptionWithMaxLines } from '@shared/components'
import { NFTObject } from '@zoralabs/nft-hooks'
import { Flex, Heading, Stack, StackProps } from '@zoralabs/zord'

import { NFTMarket } from './NFTMarket'
import * as styles from './NFTPage.css'
import { NFTProvenance } from './NFTProvenance'

export interface NFTSidebarProps extends StackProps {
  nft: NFTObject
  collectionAddress: string
  tokenId: string
  offchainOrders?: OffchainOrderWithToken[]
}

export function NFTSidebar({
  nft,
  collectionAddress,
  tokenId,
  offchainOrders,
  ...props
}: NFTSidebarProps) {
  if (!collectionAddress || !tokenId) return null

  return (
    <NFTSidebarComponent
      nft={nft}
      collectionAddress={collectionAddress}
      tokenId={tokenId}
      offchainOrders={offchainOrders}
      {...props}
    />
  )
}

export function NFTSidebarComponent({
  nft,
  className,
  collectionAddress,
  tokenId,
  offchainOrders,
  ...props
}: NFTSidebarProps) {
  const { primarySalePrice } = usePrimarySalePrice({ collectionAddress })
  const { token } = useToken({ collectionAddress, tokenId })
  const fallbackTitle = `${token?.collectionName} #${token?.tokenId}`

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
          {fallbackTitle}
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
        {primarySalePrice && (
          <NFTProvenance primarySalePrice={primarySalePrice} token={token} />
        )}
        <NFTMarket
          collectionAddress={collectionAddress}
          offchainOrders={offchainOrders}
          tokenId={tokenId}
          token={token}
          nftObj={nft}
        />
      </Stack>
    </Stack>
  )
}
