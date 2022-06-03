import { useCallback, useEffect } from 'react'
import { Flex, Stack, Label, Eyebrow, Icon } from '@zoralabs/zord'
import { useModal } from '@modal'
import { Link } from 'components/Link'
import { CollectionThumbnail } from '@media/CollectionThumbnail'
import { useCollection } from 'hooks/zdk/useCollection'
import { lightGreyType, leadingTight, lightFont } from 'styles/styles.css'

export function CollectionLink({ collectionAddress }: { collectionAddress: string }) {
  const { requestClose } = useModal()

  const { collection } = useCollection(collectionAddress)

  useEffect(() => {
    console.log(collection)
  }, [collection])

  return (
    <Link href={`/collections/${collectionAddress}`} passHref>
      <Flex align="center" justify="space-between" gap="x4" onClick={requestClose}>
        <Flex align="center" gap="x4">
          <CollectionThumbnail collectionAddress={collectionAddress} />
          <Stack>
            <Label size="lg" className={leadingTight}>
              {collectionAddress}
            </Label>
            <Eyebrow className={[lightGreyType, lightFont]}>
              Floor Price: {collectionAddress} ETH
            </Eyebrow>
          </Stack>
        </Flex>
        <Flex gap="x2" align="center">
          <Label className={[lightGreyType, lightFont]}>{collectionAddress} NFTs</Label>
          <Icon id="ChevronRight" />
        </Flex>
      </Flex>
    </Link>
  )
}
