import { Button } from 'components/Button'
import { SearchInput } from 'compositions'
import { useCollectionsContext } from 'providers/CollectionsProvider'
import { mediumFont, noTextWrap } from 'styles/styles.css'

import { useCallback, useMemo, useState } from 'react'

import { ModalComposition } from '@modal'
import { lightFont } from '@shared'
import { useHasScrolled } from '@shared/hooks/useHasScrolled'
import { Box, Flex, Heading, Icon, Label, Paragraph, Stack, Text } from '@zoralabs/zord'

import * as styles from './CollectionMenu.css'
import { CollectionNavList } from './CollectionNavList'

export function CollectionMenu() {
  const { collections, daos, currentCollection, currentCollectionCount } =
    useCollectionsContext()
  const menuItems = useMemo(() => daos.concat(collections), [collections, daos])
  const menuItemCount = useMemo(() => menuItems.length, [menuItems])
  const { hasScrolled, scrollEvent } = useHasScrolled()
  const [filter, setFilter] = useState<string>('')
  const filteredItems = useMemo(
    () =>
      menuItems.filter((item) =>
        item?.name?.toLowerCase().includes(filter.toLowerCase())
      ),
    [filter, menuItems]
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
          {currentCollectionCount ? (
            <Label
              as="span"
              color="text3"
              size="md"
              display={{
                '@initial': 'none',
                '@1024': 'inline',
              }}
              className={[lightFont, noTextWrap]}
            >
              {currentCollectionCount}
            </Label>
          ) : null}
          <Icon id="ChevronDown" size="md" color="secondary" />
        </Button>
      }
      content={
        <Stack as="menu" gap="x6" className={styles.modalWrapper}>
          <Stack px="x8" pt="x8" gap="x6">
            <Heading as="h2">
              Browse
              <Text as="span" color="text3" ml="x2">
                {menuItemCount}
              </Text>
            </Heading>
            <SearchInput
              placeholder="Quick search..."
              className="collectionmenu-quicksearch"
              inputClassNameOverrides={mediumFont}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(event.target.value)
              }
            />
          </Stack>
          <Box
            px="x8"
            pb="x8"
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
                  <Paragraph className={mediumFont} color="text3">
                    Nothing found
                  </Paragraph>
                </Flex>
              )}
            </Box>
          </Box>
        </Stack>
      }
    />
  )
}
