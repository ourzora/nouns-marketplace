import { Button, Link } from 'components'
import { clickAnimation, mediumFont } from 'styles/styles.css'

import { useMemo } from 'react'

import { useOffchainOrders } from '@market/hooks'
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

export interface NFTSidebarProps extends StackProps {}

export function NFTSidebar({ className, ...props }: NFTSidebarProps) {
  const { primarySalePrice } = useNounishAuctionProvider()
  const { nft, tokenId: tokenIdString, contractAddress } = useNFTProvider()
  const { data: offchainOrders } = useOffchainOrders(nft!)
  const { address: userAddress } = useAuth()
  const showOffchainOrders = useMemo(
    () => userAddress && offchainOrders?.length > 0,
    [offchainOrders?.length, userAddress]
  )
  const { tokenID, hasPreviousNFT, hasNextNFT, handlePrev, handleNext } = useTokenHelper(
    nft!
  )
  // const { isValidated } = useValidateContractCall({
  //   callerAddress: userAddress!, // user address
  //   contractAddress: offchainOrders
  //     ? offchainOrders[0]?.offchainOrder?.offchainOrder?.contractAddress
  //     : '', // the contract that fills the orders, eg. Seaport
  //   calldata: offchainOrders ? offchainOrders[0]?.offchainOrder?.callData : '', //
  //   value: offchainOrders ? offchainOrders[0]?.price?.chainTokenPrice?.decimal : 0, // Price in Ether (Decimal price)
  // })

  // console.log('OFF_CHAIN', offchain)

  // offchainOrder: {
  //   callData: '',
  //   contractAddress: ''
  // }s
  // price: {
  //   chainTokenPrice: {
  //     decimal: number
  //   }
  // }
  // token: {
  //   collectionName: '',
  //   tokenId: ''
  // }

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
        <Flex w="x20">
          <Button
            className={[styles.nftNextButton]}
            disabled={!hasPreviousNFT}
            onClick={handlePrev}
            variant="circle"
          >
            ←
          </Button>
          <Button
            className={[styles.nftNextButton]}
            disabled={!hasNextNFT}
            onClick={handleNext}
            variant="circle"
          >
            →
          </Button>
        </Flex>
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
          {showOffchainOrders && (
            <NFTOffchainOrders
              nft={nft}
              userAddress={userAddress!}
              offchainOrders={offchainOrders}
            />
          )}
          {primarySalePrice && <NFTProvenance nft={nft} />}
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
