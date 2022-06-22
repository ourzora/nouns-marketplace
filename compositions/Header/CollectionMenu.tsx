import { Box, Heading, Icon, Flex, Label, Stack } from '@zoralabs/zord'
import { ModalComposition } from '@modal'
import { useCollectionsContext } from 'providers/CollectionsProvider'
import { collectionTrigger, modalWrapper } from './Header.css'
import { CollectionLink } from './CollectionLink'
import { Link } from 'components/Link'
import { lightFont, noTextWrap } from 'styles/styles.css'
import { useModal } from '@modal'

export function CollectionMenu() {
  const { collections, collectionAmount, currentCollection, currentCollectionCount } =
    useCollectionsContext()
  const { requestClose } = useModal()

  return (
    <ModalComposition
      modalName={`collections-menu`}
      trigger={
        <Flex
          align="center"
          borderRadius="curved"
          backgroundColor="tertiary"
          margin="auto"
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
              {currentCollectionCount}
            </Label>
          ) : null}
          <Icon id="ChevronDown" size="md" color="secondary" ml="x2" />
        </Flex>
      }
      content={
        <Box p="x8">
          <Stack gap="x6">
            <Flex align="center" w="100%" justify="space-between">
              <Heading as="h3">
                Explore Collections
                <Box as="h3" display="inline" color="tertiary">
                  &nbsp;{collectionAmount}
                </Box>
              </Heading>
              <Link href="/collections" passHref>
                <Flex gap="x2" align="center" onClick={requestClose}>
                  <Label color="tertiary" className={lightFont}>
                    Rankings
                  </Label>
                  <Icon id="ChevronRight" color="tertiary" />
                </Flex>
              </Link>
            </Flex>
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
