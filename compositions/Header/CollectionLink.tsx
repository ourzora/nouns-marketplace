import { useCallback } from 'react'
import { Flex, Stack, Label, Eyebrow, Icon } from '@zoralabs/zord'
import { useModalRegistry } from '@modal'
import { Link } from 'components/Link'
import { CollectionThumbnail } from '@media/CollectionThumbnail'
import { lightGreyType, leadingTight, lightFont } from 'styles/styles.css'
import { CollectionsData } from 'hooks/zdk/useCollections'

export function CollectionLink({ collection }: { collection: CollectionsData }) {
  const { requestClose } = useModalRegistry()

  return (
    <Link href={`/collections/${collection.collectionInfo.address}`} passHref>
      <Flex align="center" justify="space-between" gap="x4" onClick={requestClose}>
        <Flex align="center" gap="x4">
          <CollectionThumbnail collectionAddress={collection.collectionInfo.address} />
          <Stack>
            <Label size="lg" className={leadingTight}>
              {collection.collectionInfo.name}
            </Label>
            <Eyebrow className={[lightGreyType, lightFont]}>
              Floor Price: {collection?.aggregateStat?.floorPrice} ETH
            </Eyebrow>
          </Stack>
        </Flex>
        <Flex gap="x2" align="center">
          <Label className={[lightGreyType, lightFont]}>
            {collection?.aggregateStat?.nftCount} NFTs
          </Label>
          <Icon id="ChevronRight" />
        </Flex>
      </Flex>
    </Link>
  )
}
