import { Box, Heading, Icon, Flex, Label, Stack } from '@zoralabs/zord'
import { ModalComposition } from '@modal'
import { useCollectionsContext } from 'providers/CollectionsProvider'
import { collectionTrigger, modalWrapper } from './Header.css'
import { CollectionLink } from './CollectionLink'

export function CollectionMenu() {
  const { collections, collectionAmount, currentCollection } = useCollectionsContext()

  return (
    <ModalComposition
      modalName={`collections-menu`}
      trigger={
        <Flex align="center" className={collectionTrigger}>
          <Label
            py={{
              '@initial': 'x1',
              '@1024': 'x2',
            }}
            as="span"
            display="flex"
            align="center"
            h="100%"
            size="lg"
          >
            {currentCollection}&nbsp;
          </Label>
          <Icon id="ChevronDown" size="md" />
        </Flex>
      }
      content={
        <Box p="x8">
          <Stack gap="x6">
            <Heading>Explore Collections {collectionAmount}</Heading>
            <Stack className={modalWrapper} gap="x4">
              {collections.map((collection) => (
                <CollectionLink
                  key={`${collection.address}-${collection.name}`}
                  collection={collection}
                />
              ))}
            </Stack>
          </Stack>
        </Box>
      }
    />
  )
}
