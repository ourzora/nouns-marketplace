import { Box, Heading, Icon, Flex, Label, Stack } from '@zoralabs/zord'
import { ModalComposition } from '@modal'
import { useCollectionsContext } from 'providers/CollectionsProvider'
import { collectionTrigger, modalWrapper } from './Header.css'
import { CollectionLink } from './CollectionLink'
import { Link } from 'components/Link'
import { lightFont, noTextWrap } from 'styles/styles.css'
import { useModal } from '@modal'

export function CollectionMenu() {
  const {
    collections,
    collectionAmount,
    daos,
    daosAmount,
    currentCollection,
    currentCollectionCount,
  } = useCollectionsContext()

  const { requestClose } = useModal()

  return (
    <ModalComposition
      modalName={`collections-menu`}
      trigger={
        <Flex
          align="center"
          borderRadius="curved"
          backgroundColor="tertiary"
          m="auto"
          px="x6"
        >
          <Label
            py={{
              '@initial': 'x1',
              '@1024': 'x2',
            }}
            as="span"
            size="lg"
            color="secondary"
            className={[noTextWrap]}
          >
            {currentCollection}
          </Label>
          {currentCollectionCount ? (
            <Label
              as="span"
              className={[lightFont, noTextWrap]}
              color="tertiary"
              size="lg"
            >
              &nbsp;{currentCollectionCount}
            </Label>
          ) : null}
          <Icon id="ChevronDown" size="md" color="secondary" ml="x2" />
        </Flex>
      }
      content={
        <Box p="x8">
          <Stack gap="x6" className={modalWrapper}>
            <Flex align="center" w="100%" justify="space-between">
              <Heading as="h3" size="sm">
                Explore Daos
                <Box as="h3" display="inline" color="tertiary">
                  &nbsp;{daosAmount}
                </Box>
              </Heading>
            </Flex>
            <Stack gap="x4">
              {daos.map((collection) => (
                <CollectionLink
                  key={`${collection.address}-${collection.name}`}
                  collection={collection}
                />
              ))}
            </Stack>
            <Flex align="center" w="100%" justify="space-between">
              <Heading as="h3" size="sm">
                Explore Collections
                <Box as="h3" display="inline" color="tertiary">
                  &nbsp;{collectionAmount}
                </Box>
              </Heading>
            </Flex>
            <Stack gap="x4">
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
