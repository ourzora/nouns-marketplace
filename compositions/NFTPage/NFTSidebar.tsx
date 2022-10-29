import { Link } from 'components'
import { mediumFont } from 'styles/styles.css'

import { useMemo } from 'react'

import { CollectionThumbnail } from '@media'
import { useNounishAuctionProvider } from '@noun-auction'
import { useNFTProvider, useTitleWithFallback } from '@shared'
import { DescriptionWithMaxLines } from '@shared/components'
import { useAuth, useTokenHelper } from '@shared/hooks'
import { Flex, Heading, Stack, StackProps } from '@zoralabs/zord'

import { NFTMarket } from './NFTMarket'
import { NFTOffchainOrders } from './NFTOffchainOrders'
import * as styles from './NFTPage.css'
import { NFTProvenance } from './NFTProvenance'

export interface NFTSidebarProps extends StackProps {
  offchainOrders?: any
}

export function NFTSidebar({ offchainOrders, className, ...props }: NFTSidebarProps) {
  const { primarySalePrice } = useNounishAuctionProvider()
  const { nft, tokenId: tokenIdString, contractAddress } = useNFTProvider()
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
          {/* {showOffchainOrders && (
            <NFTOffchainOrders
              nft={nft}
              userAddress={userAddress}
              offchainOrders={offchainOrders}
            />
          )} */}
          {primarySalePrice && <NFTProvenance nft={nft} />}
          <NFTMarket
            offchainOrders={offchainOrders}
            contractAddress={nft.nft.contract.address}
            tokenId={nft.nft.tokenId}
            nft={nft}
          />
        </Stack>
      )}
    </Stack>
  )
}
