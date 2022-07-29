import { useState } from 'react'
import { Box, Icon, Button, Label, Stack, color } from '@zoralabs/zord'
import { ModalComposition } from '@modal'
import { useCollectionsContext } from 'providers/CollectionsProvider'
import { modalWrapper } from '../Header.css'
import { lightFont, noTextWrap } from 'styles/styles.css'
import { CollectionNavList } from './CollectionNavList'
import { HorizontalMenu } from 'components'

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

  const [tab, setTab] = useState<string>(tabs.DAOS)

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
          borderRadius="curved"
          display="flex"
          w={{
            '@initial': 'auto',
            '@768': 'auto',
          }}
          style={{
            height: 42,
            paddingLeft: 16,
            paddingRight: 16,
            gridGap: 10,
          }}
        >
          {currentCollection}
          {currentCollectionCount ? (
            <Label
              as="span"
              className={[lightFont, noTextWrap]}
              color="tertiary"
              size="lg"
              display={{
                '@initial': 'none',
                '@1024': 'inline',
              }}
            >
              {currentCollectionCount}
            </Label>
          ) : null}
          <Icon id="ChevronDown" size="md" color="secondary" />
        </Button>
      }
      content={
        <Box p="x8">
          <Stack as="menu" gap="x6" className={modalWrapper}>
            <HorizontalMenu
              items={menuCategories}
              setId={setTab}
              currentId={tab}
              position="sticky"
              top="x0"
              backgroundColor="primary"
              style={{
                borderBottom: `1px solid ${color.black10}`,
                zIndex: 100,
              }}
            />
            {menuCategories.map((category) => (
              <CollectionNavList
                key={category.id}
                items={category.items}
                display={category.id === tab ? 'flex' : 'none'}
              />
            ))}
          </Stack>
        </Box>
      }
    />
  )
}
