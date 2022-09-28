import { useScrollPosition } from '@n8tb1t/use-scroll-position'
import { Text, Icon, Button, Label, Stack, Heading, Flex, Box } from '@zoralabs/zord'
import { ModalComposition } from '@modal'
import { useCollectionsContext } from 'providers/CollectionsProvider'
import { mediumFont, noTextWrap } from 'styles/styles.css'
import { CollectionNavList } from './CollectionNavList'
import { lightFont } from '@shared'
import { useCallback, useMemo, useRef, useState } from 'react'
import * as styles from './CollectionMenu.css'
import { SearchInput } from 'compositions/SearchInput/SearchInput'

export function CollectionMenu() {
  const { collections, daos, currentCollection, currentCollectionCount } =
    useCollectionsContext()
  const menuItems = useMemo(() => daos.concat(collections), [collections, daos])
  const menuItemCount = useMemo(() => menuItems.length, [menuItems])
  const [filter, setFilter] = useState<string>('')
  const filteredItems = useMemo(
    () =>
      menuItems.filter((item) =>
        item?.name?.toLowerCase().includes(filter.toLowerCase())
      ),
    [filter, menuItems]
  )

  // ↓↓↓ Detect scroll to enable 2px top border
  const [hasScrolled, setHasScrolled] = useState(false)
  const parentRef = useRef() as React.MutableRefObject<HTMLDivElement>
  const childRef = useRef() as React.MutableRefObject<HTMLDivElement>

  useScrollPosition(
    ({ currPos }) => {
      setHasScrolled(currPos.y > 4)
    },
    [],
    childRef,
    false,
    10,
    parentRef
  )
  // ↑↑↑

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
        <Stack as="menu" p="x8" gap="x6" className={styles.modalWrapper}>
          <Flex>
            <Heading as="h2">
              Collections
              <Text as="span" color="text3" ml="x2">
                {menuItemCount}
              </Text>
            </Heading>
          </Flex>
          <SearchInput
            placeholder="Quick search..."
            className="collectionmenu-quicksearch"
            inputClassNameOverrides={mediumFont}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              handleChange(event.target.value)
            }
          />
          <Box
            overflowY="scroll"
            className={[styles.filteredItems, hasScrolled && styles.filterScrolled]}
            ref={parentRef}
          >
            {filteredItems && <CollectionNavList items={filteredItems} ref={childRef} />}
          </Box>
        </Stack>
      }
    />
  )
}
