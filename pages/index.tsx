import { HomePageHeader, PageWrapper, Seo } from 'components'
import { CollectionRanking, DaoTable } from 'compositions'
import { collectionsService } from 'services/collectionsService'
import * as styles from 'styles/styles.css'
import { SWRConfig } from 'swr'
import useSWR from 'swr'

import React from 'react'

import { CollectionsQuery } from '@zoralabs/zdk/dist/queries/queries-sdk'
import { Grid } from '@zoralabs/zord'

export type CollectionParsed = CollectionsQuery['collections']['nodes']

function Home(props: { fallback: CollectionParsed }) {
  const { data } = useSWR('collections', collectionsService)

  return (
    <SWRConfig value={{ fallback: props.fallback }}>
      <PageWrapper direction="column" gap="x6" align="center">
        <Seo />

        <Grid
          px={{ '@initial': 'x4', '@1024': 'x8' }}
          gap="x2"
          className={styles.pageGrid}
          justify="center"
        >
          <HomePageHeader
            headline="The Nouns Marketplace"
            mt={{ '@initial': 'x6', '@1024': 'x24' }}
            mb={{ '@initial': 'x8', '@1024': 'x24' }}
          />
          <DaoTable className={styles.homepageTable} />
          <CollectionRanking
            collections={data?.props?.fallback}
            className={styles.homepageTable}
          />
        </Grid>
      </PageWrapper>
    </SWRConfig>
  )
}

export const getServerSideProps = collectionsService

export default Home
