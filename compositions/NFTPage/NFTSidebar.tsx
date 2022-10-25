import { Link } from 'components'
import { clickAnimation, mediumFont } from 'styles/styles.css'

import { usePrimarySalePrice } from 'hooks/usePrimarySalePrice'

import { CollectionThumbnail } from '@media'
import { useNFTProvider, useTitleWithFallback } from '@shared'
import { DescriptionWithMaxLines } from '@shared/components/DescriptionWithMaxLines/DescriptionWithMaxLines'
import { useTokenHelper } from '@shared/hooks'
import { Flex, Heading, Stack, StackProps } from '@zoralabs/zord'

import { NFTMarket } from './NFTMarket'
import * as styles from './NFTPage.css'
import { NFTProvenance } from './NFTProvenance'

export interface NFTSidebarProps extends StackProps {
  contractAddress: string
}

export function NFTSidebar({ className, contractAddress, ...props }: NFTSidebarProps) {
  const { primarySalePrice } = usePrimarySalePrice({ contractAddress })

  // FIXME: looks obsolete
  const { nft, tokenId: tokenIdString } = useNFTProvider()
  const { tokenID } = useTokenHelper(nft!)

  const { fallbackTitle } = useTitleWithFallback({
    contractAddress,
    tokenId: tokenIdString,
    defaultTitle: nft?.metadata?.name,
  })

  if (!nft || !tokenID || !contractAddress) return null

  return (
    <Stack
      id="nft-info-sidebar"
      className={[styles.nftInfoSidebar, className]}
      {...props}
    >
      <Flex>
        <Link href={`/collections/${nft?.nft?.contract.address}`}>
          <CollectionThumbnail
            initialNFT={nft}
            collectionAddress={nft?.nft?.contract.address}
            useTitle
            size="xxs"
            radius="round"
            p="x2"
            pr="x5"
            backgroundColor="background2"
            borderRadius="round"
            className={clickAnimation}
          />
        </Link>
      </Flex>
      <Flex justify="space-between" align="center">
        <Heading as="h1" size="xl">
          {fallbackTitle}
        </Heading>
      </Flex>
      {nft?.metadata?.description && (
        <DescriptionWithMaxLines
          baseLineheight={30}
          maxLines={2}
          paragraphClassName={mediumFont}
          overflowY="hidden"
        >
          {nft?.metadata?.description}
        </DescriptionWithMaxLines>
      )}
      {nft?.nft && ( // Clamp to bottom of container
        <Stack gap="x4" mt="auto">
          {primarySalePrice && (
            <NFTProvenance primarySalePrice={primarySalePrice} nft={nft} />
          )}
          <NFTMarket
            contractAddress={nft.nft.contract.address}
            tokenId={nft.nft.tokenId}
            nft={nft}
          />
        </Stack>
      )}
    </Stack>
  )
}
