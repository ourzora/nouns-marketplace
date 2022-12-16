import { HorizontalMenu, HorizontalMenuProps } from 'components'

// import { ROUTES } from 'constants/routes'
// import { MotionFlex, MotionStack } from 'components/Motion';
// import { SearchResults } from 'hooks/useSearch';
import React from 'react'

import { useCollectionFilters } from '@filter'
import { Stack, color } from '@zoralabs/zord'

import * as styles from './CollectionHeader.css'

// import { FlexProps, Separator } from '@zoralabs/zord'

// import { SearchEntityFilterItem } from './SearchEntityFilterItem';
// import * as styles from './SearchEntityTypeSelector.css';

interface CollectionActivityHeaderProps {
  activeView: ActiveCollectionPageView
  setActiveView: React.Dispatch<React.SetStateAction<ActiveCollectionPageView>>
  // setActiveView: React.SetStateAction<ActiveCollectionPageView>
}

export type ActiveCollectionPageView = 'about' | 'nfts' | 'activity'

export function CollectionNav({
  setActiveView,
  activeView,
}: CollectionActivityHeaderProps) {
  const items: HorizontalMenuProps['items'] = [
    {
      id: 'about',
      label: 'About',
      handler: () => setActiveView('about'),
    },
    {
      id: 'nfts',
      label: 'NFTs',
      handler: () => setActiveView('nfts'),
    },
    {
      id: 'activity',
      label: 'Activity',
      handler: () => setActiveView('activity'),
    },
  ]

  return (
    <HorizontalMenu
      items={items}
      useCustomHandler
      currentId={activeView}
      className={styles.menu}
    />
  )
}

// interface SearchEntityTypeProps extends FlexProps {
//   searchResults?: SearchResults | null
// }

// export function SearchEntityTypeSelector({
//   searchResults,
//   className,
//   ...props
// }: SearchEntityTypeProps) {
//   const totalLength = useMemo(
//     () =>
//       (searchResults?.collections?.length || 0) + (searchResults?.tokens?.length || 0),
//     // + (searchResults?.users?.length || 0)
//     [searchResults?.collections?.length, searchResults?.tokens?.length]
//   )

//   return (
//     <MotionStack
//       initial="hidden"
//       variants={{
//         visible: { opacity: 1, pointerEvents: 'auto' },
//         hidden: { opacity: 0, pointerEvents: 'none' },
//       }}
//       animate={totalLength > 0 ? 'visible' : 'hidden'}
//       transition={{ duration: 0.2 }}
//       w="100%"
//     >
//       <MotionFlex
//         className={[styles.entityFilterList, className]}
//         justify="center"
//         gap={{ '@initial': 'x2', '@576': 'x4', '@1024': 'x6' }}
//         layout
//         {...props}
//       >
//         <SearchEntityFilterItem
//           url={ROUTES.searchCollections.url}
//           count={searchResults?.collections?.length}
//         >
//           {ROUTES.searchCollections.title}
//         </SearchEntityFilterItem>

//         <SearchEntityFilterItem
//           url={ROUTES.searchTokens.url}
//           count={searchResults?.tokens?.length}
//         >
//           {ROUTES.searchTokens.title}
//         </SearchEntityFilterItem>

//         <SearchEntityFilterItem
//           url={ROUTES.searchUsers.url}
//           //count={searchResults?.users?.length}
//           count={0}
//         >
//           {ROUTES.searchUsers.title}
//         </SearchEntityFilterItem>
//       </MotionFlex>

//       <Separator />
//     </MotionStack>
//   )
// }
