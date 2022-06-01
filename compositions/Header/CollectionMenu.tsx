import { useCallback, useMemo } from 'react'
import { Text, Box, Heading, Icon, Flex, Paragraph, Label } from '@zoralabs/zord'
import { ModalComposition, useModalRegistry } from '@modal'
import { useCollectionsContext } from 'providers/CollectionsProvider'
import { collectionTrigger } from './Header.css'
import { Link } from 'components/Link'

export function CollectionMenu() {
  const { collections, collectionAmount, currentCollection, setCurrentCollection } =
    useCollectionsContext()
  const { requestClose } = useModalRegistry()

  const collectionHandler = useCallback(
    (collectionName: string) => {
      setCurrentCollection(collectionName)
      requestClose()
    },
    [currentCollection, collections]
  )

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
          <Heading>Explore Collections {collectionAmount}</Heading>
          {collections.map((collection) => (
            <Link
              key={`${collection.address}-${collection.name}`}
              href={`/collections/${collection.address}`}
              passHref
            >
              <Flex
                as="a"
                onClick={() =>
                  collectionHandler(
                    /* @ts-ignore */
                    collection.name
                  )
                }
              >
                <Text>{collection.name}</Text>
              </Flex>
            </Link>
          ))}
        </Box>
      }
    />
  )
}
