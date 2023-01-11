import { ROUTES } from 'constants/routes'

import React from 'react'

import { Flex, FlexProps, Separator, Stack } from '@zord'

import { CollectionNavItem } from './CollectionNavItem'

export const ALL_COLLECTION_VIEWS = ['about', 'nfts', 'activity'] as const
type ActiveCollectionPageViewTuple = typeof ALL_COLLECTION_VIEWS
export type ActiveCollectionPageView = ActiveCollectionPageViewTuple[number]

interface SearchEntityTypeProps extends FlexProps {
  collectionAddress: string
  nftCount?: number
  setActiveView: React.Dispatch<React.SetStateAction<ActiveCollectionPageView>>
}

export function CollectionNav({
  collectionAddress,
  nftCount,
  className,
  setActiveView,
  ...props
}: SearchEntityTypeProps) {
  return (
    <Stack w="100%">
      <Flex
        className={[className]}
        justify="center"
        gap={{ '@initial': 'x2', '@576': 'x4', '@1024': 'x6' }}
        {...props}
      >
        <CollectionNavItem
          collectionAddress={collectionAddress}
          pageSection={ROUTES.nfts.url}
          count={nftCount}
          setActiveView={setActiveView}
        >
          {ROUTES.nfts.title}
        </CollectionNavItem>
        <CollectionNavItem
          collectionAddress={collectionAddress}
          pageSection={ROUTES.about.url}
          setActiveView={setActiveView}
        >
          {ROUTES.about.title}
        </CollectionNavItem>

        {/* <CollectionNavItem
          collectionAddress={collectionAddress}
          pageSection={ROUTES.activity.url}
          setActiveView={setActiveView}
        >
          {ROUTES.activity.title}
        </CollectionNavItem> */}
      </Flex>
      <Separator />
    </Stack>
  )
}
