import { Box, Heading, Icon, Flex, Label, Stack } from '@zoralabs/zord'
import { ModalComposition } from '@modal'
import { useCollectionsContext } from 'providers/CollectionsProvider'
import { collectionTrigger, modalWrapper } from './Header.css'
import { CollectionLink } from './CollectionLink'
import { Link } from 'components/Link'
import { lightFont } from 'styles/styles.css'
import { useModal } from '@modal'

export function CollectionMenu() {
  const { collections, collectionAmount, currentCollection } = useCollectionsContext()
  const { requestClose } = useModal()

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
            <Flex align="center" w="100%" justify="space-between">
              <Heading as="h3">
                Explore Collections
                <Box as="h3" display="inline" color="tertiary">
                  {collectionAmount}
                </Box>
              </Heading>
              <Link href="/collections" passHref>
                <Flex align="center" gap="x2" onClick={requestClose}>
                  <Label className={lightFont}>Rankings</Label>
                  <Icon id="ArrowRight" />
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
