import { Box, Heading, Icon, Flex, Label, Stack } from '@zoralabs/zord'
import { ModalComposition } from '@modal'
import { useCollectionsContext } from 'providers/CollectionsProvider'
import { collectionTrigger } from './Header.css'

import { CollectionLink } from './CollectionLink'

export function CollectionMenu() {
  const { collections, collectionAmount, currentCollection } = useCollectionsContext()

  if (collections?.length === 0) {
    return null
  }

  return (
    <ModalComposition
      modalName={`collections-menu`}
      trigger={
        <Flex align="center" className={collectionTrigger}>
          <Label py="x2" as="span" display="flex" align="center" h="100%" size="lg">
            {currentCollection?.name}:
          </Label>
          <Label>{currentCollection?.aggregateStat?.nftCount} NFTs</Label>
          <Icon id="ChevronDown" size="md" />
        </Flex>
      }
      content={
        <Box p="x8">
          <Stack gap="x6">
            <Heading>Explore Collections {collectionAmount}</Heading>
            {collections.map((collection) => (
              <CollectionLink
                key={`${collection.address}-${collection.name}`}
                collection={collection}
              />
            ))}
          </Stack>
        </Box>
      }
    />
  )
}
