import { Flex, Stack, Label, Icon, Tag } from '@zoralabs/zord'
import { useModal } from '@modal'
import { Link } from 'components/Link'
import { CollectionThumbnail } from '@media/CollectionThumbnail'
import { lineHeight1, lightFont, mediumFont } from 'styles/styles.css'
import { useAggregate, CollectionsData } from 'hooks'
import { returnDao } from 'constants/collection-addresses'
import { useMemo } from 'react'
import * as styles from './CollectionMenu.css'
import { Span } from 'components/typography/Text'

export function CollectionLink({ collection }: { collection: CollectionsData }) {
  const { requestClose } = useModal()
  const { aggregate } = useAggregate(collection.address)
  const nftCount = aggregate?.aggregateStat.nftCount
  const floorPrice = aggregate?.aggregateStat.floorPrice

  const isDao = useMemo(
    () => returnDao(collection.address) !== undefined,
    [collection.address]
  )
  const tagText = useMemo(() => (isDao ? 'DAO' : 'COLLECTION'), [isDao])

  return (
    <Link href={`/collections/${collection.address}`} passHref>
      <Flex align="center" justify="space-between" gap="x4" onClick={requestClose}>
        <Flex align="center" gap="x4">
          <CollectionThumbnail collectionAddress={collection.address} />
          <Stack gap="x1">
            <Flex gap="x2" align="center">
              <Label size="lg" className={lineHeight1} color="text1">
                {collection.name}
              </Label>
              <Tag
                inactive
                backgroundColor="background2"
                color="text2"
                className={mediumFont}
              >
                {tagText}
              </Tag>
            </Flex>
            {floorPrice && (
              <Span color="text2" as="span" className={[styles.floor]}>
                Floor: {floorPrice} ETH
              </Span>
            )}
          </Stack>
        </Flex>
        <Flex gap="x2" align="center">
          <Label color="text2" className={lightFont}>
            {nftCount} NFTs
          </Label>
          <Icon id="ChevronRight" color="text3" />
        </Flex>
      </Flex>
    </Link>
  )
}
