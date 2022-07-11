import { PageWrapper, Seo } from 'components'
import { nftService } from 'services/nftService'
import { NFTObject } from '@zoralabs/nft-hooks'
import { useEffect } from 'react'
import { RawDisplayer } from 'components/utils/RawDisplayer'
import { Accordion, Heading, Separator, Stack, Icon, Box, Flex } from '@zoralabs/zord'
import { Link } from 'components'

const NFT = ({ nft }: { nft: NFTObject }) => {
  return (
    <PageWrapper direction="column" p="x4">
      <Seo
        title={nft?.metadata?.name}
        description={nft?.metadata?.description}
        ogImage={nft?.media?.poster?.uri}
      />
      <Stack>
        <Stack>
          <Link href={`/test/collections/${nft?.nft?.contract?.address}`}>
            <Flex align="center" gap="x2">
              <Box>
                <Icon
                  id="ArrowRight"
                  size="lg"
                  style={{ transform: 'rotate(180deg)' }}
                ></Icon>
              </Box>
              <Heading>Contract: {nft?.nft?.contract?.name}</Heading>
            </Flex>
          </Link>
          <Separator my="x2" />
          <Stack>
            <Heading size="xs">Metadata:</Heading>
            <RawDisplayer data={nft.metadata} />
          </Stack>
          <Accordion label="zdkFetchStrategy.fetchNFT">
            <RawDisplayer data={nft} />
          </Accordion>
          <Separator mt="x2" />
        </Stack>
      </Stack>
    </PageWrapper>
  )
}

export const getServerSideProps = nftService

export default NFT
