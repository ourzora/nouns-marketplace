import { useState } from 'react'
import { Box, Icon, Flex, Label, Stack, color } from '@zoralabs/zord'
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
