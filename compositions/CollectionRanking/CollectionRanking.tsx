import { CollectionDescriptionModal } from 'modals'
import { CollectionParsed } from 'pages'

import { useMemo } from 'react'

import { Flex, Heading, Stack, StackProps } from '@zoralabs/zord'

import { rankingWrapper } from './CollectionRanking.css'
import { RankingRow } from './RankingRow'

export const statRows = ['Volume', 'Items', 'Floor', 'Owners']

interface CollectionRankingTableProps extends StackProps {
  collections?: CollectionParsed
}

export function CollectionRanking({
  collections,
  className,
  ...props
}: CollectionRankingTableProps) {
  const hasCollections = useMemo(
    () => collections && collections.length > 0,
    [collections]
  )
  return (
    <Stack className={[rankingWrapper, className]}>
      <Flex gap="x2" align="center">
        <Heading as="h2" size="lg">
          Collections
        </Heading>

        <CollectionDescriptionModal />
      </Flex>
      {hasCollections && (
        <Stack
          gap={{
            '@initial': 'x4',
            '@1024': 'x6',
          }}
        >
          {collections!.map((collection) => (
            <RankingRow key={collection.address} collection={collection} />
          ))}
        </Stack>
      )}
    </Stack>
  )
}
