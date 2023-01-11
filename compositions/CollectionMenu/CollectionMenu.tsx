import { SearchInput } from 'compositions'
import { useCollectionsContext } from 'providers/CollectionsProvider'
import { noTextWrap } from 'styles/styles.css'

import { useNounsDaos } from 'hooks/useNounsDaos'

import { useCallback, useMemo, useState } from 'react'

import { ModalComposition } from '@modal'
import { useHasScrolled } from '@shared/hooks/useHasScrolled'
import { Box, Button, Flex, Heading, Icon, Label, Paragraph, Stack, Text } from '@zord'

import * as styles from './CollectionMenu.css'
import { CollectionNavList } from './CollectionNavList'

export function CollectionMenu() {
  const { currentCollection, currentCollectionCount } = useCollectionsContext()
  const daos = useNounsDaos({ limit: 50 })
  const daoCount = useMemo(() => daos.length, [daos])
  const { hasScrolled, scrollEvent } = useHasScrolled()
  const [filter, setFilter] = useState<string>('')
  const filteredItems = useMemo(
    () => daos.filter((item) => item?.name?.toLowerCase().includes(filter.toLowerCase())),
    [filter, daos]
  )
  const hasResults = useMemo(() => filteredItems.length > 0, [filteredItems])

  const handleChange = useCallback((value: string) => {
    try {
      setFilter(value)
    } catch (e) {
      console.error(e)
      return
    }
  }, [])

  return (
    <ModalComposition
      modalName={`collections-menu`}
      modalContentOverrides={styles.modal}
      trigger={
        <Button
          as="div"
          size="md"
          variant="secondary"
          className={[styles.collectionTrigger, noTextWrap]}
        >
          {currentCollection}
          {currentCollectionCount && (
            <Label
              as="span"
              color="text3"
              size="md"
              display={{
                '@initial': 'none',
                '@1024': 'inline',
              }}
              className={[noTextWrap]}
            >
              {currentCollectionCount}
            </Label>
          )}
          <Icon id="ChevronDown" size="md" color="secondary" />
        </Button>
      }
      content={
        <Stack as="menu" gap="x6" className={styles.modalWrapper}>
          <Stack
            px={{ '@initial': 'x5', '@1024': 'x8' }}
            pt={{ '@initial': 'x5', '@1024': 'x8' }}
            gap="x6"
          >
            <Heading as="h2">
              Browse
              <Text as="span" color="text3" ml="x2">
                {daoCount}
              </Text>
            </Heading>
            <SearchInput
              placeholder="Quick search..."
              className="collectionmenu-quicksearch"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(event.target.value)
              }
            />
          </Stack>
          <Box
            px={{ '@initial': 'x5', '@1024': 'x8' }}
            pb="x10" // don't match paddingTop, extra p needed to bump above address bar
            className={[styles.filterUnscrolled, hasScrolled && styles.filterScrolled]}
          >
            <Box
              overflowY="scroll"
              className={[styles.filteredItems]}
              onScroll={scrollEvent}
            >
              {hasResults ? (
                <CollectionNavList items={filteredItems} />
              ) : (
                <Flex justify="center" align="center" h="x20">
                  <Paragraph color="text3">Nothing found</Paragraph>
                </Flex>
              )}
            </Box>
          </Box>
        </Stack>
      }
    />
  )
}
