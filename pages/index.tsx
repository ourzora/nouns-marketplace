import { Stack } from '@zoralabs/zord'
import { PageHeader, PageWrapper, Seo } from 'components'
import { CollectionRanking } from 'compositions/CollectionRanking'
import { DaoTable } from 'compositions/Daos'
import React, { ReactNode } from 'react'
import { zdk } from '@shared'
import { collectionAddresses } from 'constants/collection-addresses'
import {
  CollectionSortKey,
  CollectionsQuery,
  SortDirection,
} from '@zoralabs/zdk/dist/queries/queries-sdk'
interface Props {
  children?: ReactNode
}

interface State {
  hasError: boolean
}

export type CollectionParsed = CollectionsQuery['collections']['nodes']

function Home(props: { collections: CollectionParsed }) {
  console.log(props)

  return (
    <PageWrapper direction="column" gap="x6">
      <Seo />
      <PageHeader headline="The Nouns Marketplace" />
      <Stack px="x4">
        <DaoTable />
        <CollectionRanking collections={props.collections} />
      </Stack>
    </PageWrapper>
  )
}

export async function getStaticProps() {
  const data = await zdk.collections({
    where: { collectionAddresses: collectionAddresses },
    sort: { sortDirection: SortDirection.Asc, sortKey: CollectionSortKey.None },
  })

  const collections = data.collections

  return {
    props: {
      collections: collections.nodes,
    },
  }
}

export default Home
