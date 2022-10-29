import { Link } from 'components'
import { mediumFont } from 'styles/styles.css'

import { usePrimarySalePrice } from 'hooks/usePrimarySalePrice'
import { useToken } from 'hooks/useToken'

import { CollectionThumbnail } from '@media'
import { DescriptionWithMaxLines } from '@shared/components/DescriptionWithMaxLines/DescriptionWithMaxLines'
import { Flex, Heading, Stack, StackProps } from '@zoralabs/zord'

import { NFTMarket } from './NFTMarket'
import * as styles from './NFTPage.css'
import { NFTProvenance } from './NFTProvenance'

export interface NFTSidebarProps extends StackProps {
  collectionAddress: string
  tokenId: string
}

export function NFTSidebar({ collectionAddress, tokenId, ...props }: NFTSidebarProps) {
  if (!collectionAddress || !tokenId) return null

  return (
    <NFTSidebarComponent
      collectionAddress={collectionAddress}
      tokenId={tokenId}
      {...props}
    />
  )
}

export function NFTSidebarComponent({
  className,
  collectionAddress,
  tokenId,
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
        <Link href={`/collections/${token.tokenContract}`}>
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
      >
        {token.description}
      </DescriptionWithMaxLines>
      <Stack gap="x4" mt="auto">
        {primarySalePrice && (
          <NFTProvenance primarySalePrice={primarySalePrice} token={token} />
        )}
        <NFTMarket
          collectionAddress={collectionAddress}
          tokenId={tokenId}
          token={token}
        />
      </Stack>
    </Stack>
  )
}
