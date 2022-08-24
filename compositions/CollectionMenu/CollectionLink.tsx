import { Flex, Stack, Label, Eyebrow, Icon } from '@zoralabs/zord'
import { useModal } from '@modal'
import { Link } from 'components/Link'
import { CollectionThumbnail } from '@media/CollectionThumbnail'
import { lightGreyType, leadingTight } from 'styles/styles.css'
import { useAggregate, CollectionsData } from 'hooks'

import { lightFont } from '@shared'

export function CollectionLink({ collection }: { collection: CollectionsData }) {
  const { requestClose } = useModal()
  const { aggregate } = useAggregate(collection.address)

  return (
    <Link href={`/collections/${collection.address}`}>
      <Flex align="center" justify="space-between" gap="x4" onClick={requestClose}>
        <Flex align="center" gap="x4">
          <CollectionThumbnail collectionAddress={collection.address} />
          <Stack>
            <Label size="lg" className={leadingTight}>
              {collection.name}
            </Label>
            {aggregate?.aggregateStat?.floorPrice !== null && (
              <Eyebrow className={[lightGreyType, lightFont]}>
                Floor Price: {aggregate?.aggregateStat?.floorPrice} ETH
              </Eyebrow>
            )}
          </Stack>
        </Flex>
        <Flex gap="x2" align="center">
          <Label color="tertiary" className={[lightFont]}>
            {aggregate?.aggregateStat?.nftCount} NFTs
          </Label>
          <Icon id="ChevronRight" color="tertiary" />
        </Flex>
      </Flex>
    </Link>
  )
}
