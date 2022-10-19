import { PageHeader, PageWrapper, Seo } from 'components'
import { CollectionRanking, DaoTable } from 'compositions'
import { collectionsService } from 'services/collectionsService'
import * as styles from 'styles/styles.css'
import { SWRConfig } from 'swr'
import useSWR from 'swr'

import React from 'react'

import { CollectionsQuery } from '@zoralabs/zdk/dist/queries/queries-sdk'
import { Grid, Stack } from '@zoralabs/zord'

export type CollectionParsed = CollectionsQuery['collections']['nodes']

function Home(props: { fallback: CollectionParsed }) {
  const { data } = useSWR('collections', collectionsService)

  return (
    <SWRConfig value={{ fallback: props.fallback }}>
      <PageWrapper direction="column" gap="x6" align="center">
        <Seo />

        <Grid px="x4" gap="x2" className={styles.homepageGrid} justifyContent="center">
          <PageHeader headline="The Nouns Marketplace" />
          <DaoTable className={styles.homepageTable} />
          <CollectionRanking
            collections={data?.props?.fallback}
            className={styles.homepageTable}
          />
        </Grid>

        {/* <Stack px="x4">
          <DaoTable />
          <CollectionRanking collections={data?.props?.fallback} />
        </Stack> */}
      </PageWrapper>
    </SWRConfig>
  )
}

export const getServerSideProps = collectionsService

export default Home
