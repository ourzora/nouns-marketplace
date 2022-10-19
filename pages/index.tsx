import { PageHeader, PageWrapper, Seo } from 'components'
import { CollectionRanking, DaoTable } from 'compositions'
import { collectionsService } from 'services/collectionsService'
import { SWRConfig } from 'swr'
import useSWR from 'swr'

import React from 'react'

import { CollectionsQuery } from '@zoralabs/zdk/dist/queries/queries-sdk'
import { Stack } from '@zoralabs/zord'

export type CollectionParsed = CollectionsQuery['collections']['nodes']

function Home(props: { fallback: CollectionParsed }) {
  const { data } = useSWR('collections', collectionsService)

  return (
    <SWRConfig value={{ fallback: props.fallback }}>
      <PageWrapper direction="column" gap="x6">
        <Seo />
        <PageHeader headline="The Nouns Marketplace" />
        <Stack px="x4">
          <DaoTable />
          <CollectionRanking collections={data?.props?.fallback} />
        </Stack>
      </PageWrapper>
    </SWRConfig>
  )
}

export const getServerSideProps = collectionsService

export default Home
