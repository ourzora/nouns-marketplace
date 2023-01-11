import { Link } from 'components/Link'

import { useAggregate } from 'hooks'

import { TypeSafeDao } from 'validators/dao'

import { CollectionThumbnail } from '@media'
import { useModal } from '@modal'
import { useWindowWidth } from '@shared/hooks'
import { Flex, Heading, Icon, Label, Span, Stack } from '@zord'

import * as styles from './CollectionMenu.css'

export function CollectionLink({ collection }: { collection: TypeSafeDao }) {
  const { requestClose } = useModal()
  const { nftCount, floorPrice } = useAggregate(collection.collectionAddress)
  const { isSmall } = useWindowWidth()

  return (
    <Link href={`/collections/${collection.collectionAddress}`} passHref>
      <Flex align="center" justify="space-between" gap="x4" onClick={requestClose}>
        <Flex align="center" gap="x4">
          <CollectionThumbnail
            size={isSmall ? 'xs' : 'sm'}
            collectionAddress={collection.collectionAddress}
          />
          <Stack gap="x1">
            <Flex gap="x2" align="center">
              <Heading size="xs" inline color="text1">
                {collection.name}
              </Heading>
            </Flex>
            {floorPrice && (
              <Span color="text2" as="p" className={[styles.floor]}>
                Floor: {floorPrice} ETH
              </Span>
            )}
          </Stack>
        </Flex>
        <Flex gap="x2" align="center">
          <Label color="text2">{nftCount} NFTs</Label>
          <Icon id="ChevronRight" color="text3" />
        </Flex>
      </Flex>
    </Link>
  )
}
