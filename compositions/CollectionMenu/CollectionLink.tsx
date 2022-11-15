import { Link } from 'components/Link'
import { returnDao } from 'constants/collection-addresses'
import { leadingTight, lightFont, mediumFont } from 'styles/styles.css'

import { useAggregate } from 'hooks'

import { useMemo } from 'react'
import { TypeSafeDao } from 'validators/dao'

import { CollectionThumbnail } from '@media'
import { useModal } from '@modal'
import { Eyebrow, Flex, Icon, Label, Stack, Tag } from '@zoralabs/zord'

import * as styles from './CollectionMenu.css'

export function CollectionLink({ collection }: { collection: TypeSafeDao }) {
  const { requestClose } = useModal()
  const { aggregate, nftCount, floorPrice } = useAggregate(collection.collectionAddress)
  // const nftCount = aggregate?.aggregateStat.nftCount
  // const floorPrice = aggregate?.aggregateStat.floorPrice

  const isDao = useMemo(
    () => returnDao(collection.collectionAddress) !== undefined,
    [collection.collectionAddress]
  )
  const tagText = useMemo(() => (isDao ? 'DAO' : 'COLLECTION'), [isDao])

  return (
    <Link href={`/collections/${collection.collectionAddress}`} passHref>
      <Flex align="center" justify="space-between" gap="x4" onClick={requestClose}>
        <Flex align="center" gap="x4">
          <CollectionThumbnail collectionAddress={collection.collectionAddress} />
          <Stack gap="x1">
            <Flex gap="x2" align="center">
              <Label size="lg" className={leadingTight} color="text1">
                {collection.name}
              </Label>
              <Tag inactive backgroundColor="background2">
                {tagText}
              </Tag>
            </Flex>
            {floorPrice && (
              <Eyebrow color="text2" as="p" className={[styles.floor, mediumFont]}>
                Floor: {floorPrice} ETH
              </Eyebrow>
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
