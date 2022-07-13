import { Heading, Stack, Flex, Paragraph, Box, BoxProps } from '@zoralabs/zord'
import { CollectionThumbnail } from '@media/CollectionThumbnail'
import { FillAskInfo } from '@market'
import { useIsOwner } from '@market/hooks'
import { Link } from 'components'
import { clickAnimation, lightFont } from 'styles/styles.css'
import { NFTCardMarket } from '@market'
import { useNFTProvider } from '@shared/providers/NFTProvider'
import { nftInfoSidebar, nftInfoSidebarWrapper, askInfoWrapper } from './NFTPage.css'
import { returnDao } from 'constants/collection-addresses'
import { MarketUi } from './MarketUi'

export interface NFTInfoSidebar extends BoxProps {}

export function NFTInfoSidebar({ ...props }: NFTInfoSidebar) {
  const { initialData: nft, tokenId } = useNFTProvider()

  if (!nft || !tokenId) return null

  const { isOwner } = useIsOwner(nft)

  const dao = nft?.nft && returnDao(nft.nft.contract.address)
  /*
  const { data, error } = useNounishAuctionQuery({
    marketType: marketType,
    contractAddress: contractAddress,
    tokenId: tokenId ? tokenId : activeToken
  })
  */

  return (
    <Box id="nft-info-sidebar" className={nftInfoSidebar} {...props}>
      <Stack className={nftInfoSidebarWrapper}>
        <Flex>
          <Link href={`/collections/${nft?.nft?.contract.address}`}>
            <CollectionThumbnail
              collectionAddress={nft?.nft?.contract.address}
              useTitle
              size="xxs"
              radius="round"
              p="x2"
              pr="x5"
              backgroundColor="tertiary"
              borderRadius="round"
              className={clickAnimation}
            />
          </Link>
        </Flex>
        <Heading as="h1" size="xl">
          {nft?.metadata?.name}
        </Heading>
        <Paragraph size="lg" className={lightFont}>
          {nft?.metadata?.description}
        </Paragraph>
        {!isOwner && (
          <Stack className={askInfoWrapper}>
            <FillAskInfo showBalance={false} nft={nft} />
          </Stack>
        )}
        {nft?.nft && (
          <MarketUi
            contractAddress={nft.nft.contract.address}
            tokenId={nft.nft.tokenId}
            nft={nft}
          />
        )}
      </Stack>
    </Box>
  )
}
