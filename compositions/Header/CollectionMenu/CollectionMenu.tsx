import { Box, Icon, Button, Label, Stack } from '@zoralabs/zord'
import { ModalComposition } from '@modal'
import { useCollectionsContext } from 'providers/CollectionsProvider'
import { noTextWrap } from 'styles/styles.css'
import { CollectionNavList } from './CollectionNavList'
import { lightFont } from '@shared'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import {
  label,
  tabsButton,
  tabsList,
  modalWrapper,
  collectionTrigger,
} from './CollectionMenu.css'

// Exports
export const Tabs = TabsPrimitive.Root
export const TabsList = TabsPrimitive.List
export const TabsTrigger = TabsPrimitive.Trigger
export const TabsContent = TabsPrimitive.Content

enum tabs {
  DAOS = 'Daos',
  COLLECTIONS = 'Collections',
}

export function CollectionMenu() {
  const {
    collections,
    collectionAmount,
    daos,
    daosAmount,
    currentCollection,
    currentCollectionCount,
  } = useCollectionsContext()
  const menuCategories = [
    {
      id: tabs.DAOS,
      label: tabs.DAOS,
      items: daos,
      count: daosAmount,
    },
    {
      id: tabs.COLLECTIONS,
      label: tabs.COLLECTIONS,
      items: collections,
      count: collectionAmount,
    },
  ]

  return (
    <ModalComposition
      modalName={`collections-menu`}
      trigger={
        <Button
          as="div"
          size="md"
          variant="secondary"
          className={[collectionTrigger, noTextWrap]}
        >
          {currentCollection}
          {currentCollectionCount ? (
            <Label
              as="span"
              color="tertiary"
              size="md"
              display={{
                '@initial': 'none',
                '@1024': 'inline',
              }}
              className={[lightFont, noTextWrap]}
            >
              {currentCollectionCount ?? '...'}
            </Label>
          ) : null}
          <Icon id="ChevronDown" size="md" color="secondary" />
        </Button>
      }
      content={
        <Stack as="menu" gap="x6" className={modalWrapper}>
          <Tabs defaultValue={tabs.DAOS} data-orientation="horizontal">
            <TabsList aria-label="Choose your menu" className={tabsList}>
              <TabsTrigger value={tabs.DAOS} className={tabsButton}>
                <Box as="span" className={label}>
                  {tabs.DAOS}
                </Box>
                &nbsp;&nbsp;{daosAmount}
              </TabsTrigger>
              <TabsTrigger value={tabs.COLLECTIONS} className={tabsButton}>
                <Box as="span" className={label}>
                  {tabs.COLLECTIONS}
                </Box>
                &nbsp;&nbsp;{collectionAmount}
              </TabsTrigger>
            </TabsList>
            <TabsContent value={tabs.DAOS}>
              <CollectionNavList items={daos} pt="x22" p="x6" />
            </TabsContent>
            <TabsContent value={tabs.COLLECTIONS}>
              <CollectionNavList items={collections} pt="x22" p="x6" />
            </TabsContent>
          </Tabs>
        </Stack>
      }
    />
  )
}
