import { HomePageHeader, PageWrapper, Seo } from 'components'
import { DaoTable } from 'compositions'
import { DAO_PAGE_LIMIT } from 'constants/pagination'
import * as styles from 'styles/styles.css'
import { NounsDaosQuery } from 'types/zora.api.generated'

import { NOUNS_DAOS_QUERY } from 'data/nounsDaos'

import { useNounsDaos } from 'hooks/useNounsDaos'

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { TypeSafeDao } from 'validators/dao'

import * as Sentry from '@sentry/react'
import { zoraApiFetcher } from '@shared'
import { CollectionsQuery } from '@zoralabs/zdk/dist/queries/queries-sdk'
import { Button, Eyebrow, Flex, Grid, Paragraph, Stack } from '@zoralabs/zord'

export type CollectionParsed = CollectionsQuery['collections']['nodes']

function Home(props: { ssrDAOQuery: NounsDaosQuery; daos: TypeSafeDao[] }) {
  const { daos: ssrDAOS, ssrDAOQuery } = props
  const [currentCursor, setCurrentCursor] = useState<string>('')
  const [cursorCache, setCursorCache] = useState<string[]>([])

  const {
    // response: daoQueryResponse,
    daos: clientDaos,
    pageInfo,
    // isValidating,
  } = useNounsDaos({
    limit: DAO_PAGE_LIMIT,
    after: currentCursor,
    fallbackData: currentCursor === '' ? ssrDAOQuery : undefined,
    // fallbackData: ssrDAOQuery,
  })

  const daos = useMemo(() => clientDaos ?? ssrDAOS, [clientDaos, ssrDAOS])
  const hasDaos = useMemo(() => daos?.length > 0, [daos])
  console.log('daos.length', daos?.length)
  console.log('daos', daos)

  useEffect(() => {
    if (!pageInfo?.endCursor || pageInfo.endCursor === currentCursor) {
      console.log('CONDITIONAL RETURN')
      return
    }
    const fetchedCursor = pageInfo.endCursor
    let newCursorCache: string[] = cursorCache

    // Add new cursor to pagination cache if it's not already there
    if (!cursorCache.includes(fetchedCursor)) {
      // console.log('ADDING TO CACHE:', fetchedCursor, cursorCache.length)
      newCursorCache.push(fetchedCursor)
      setCursorCache(newCursorCache)
      console.log('NEXT:', fetchedCursor)
    }
  }, [
    pageInfo?.endCursor,
    //cursorCache,
    currentCursor,
  ])

  useEffect(() => console.log(cursorCache), [cursorCache])

  const prevCursor =
    cursorCache.indexOf(currentCursor) < 1
      ? ''
      : cursorCache[cursorCache.indexOf(currentCursor) - 1]

  const nextCursor = pageInfo?.hasNextPage
    ? cursorCache[cursorCache.indexOf(currentCursor) + 1]
    : ''

  const pagePrev = useCallback(() => {
    console.log('SETTING PREV TO: ', prevCursor)
    setCurrentCursor(prevCursor)
  }, [prevCursor])

  const pageNext = useCallback(() => {
    console.log('SETTING NEXT TO: ', nextCursor)
    setCurrentCursor(nextCursor)
  }, [nextCursor])

  return (
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

        {hasDaos && <DaoTable daos={daos} className={styles.homepageTable} />}
      </Grid>
      {hasDaos && (
        <Stack gap="x1">
          <Flex gap="x2">
            {currentCursor !== '' && (
              <Button
                //  loading={isValidating}
                onClick={pagePrev}
              >
                Prev {prevCursor === '' ? 'INITIAL' : prevCursor}
              </Button>
            )}
            {nextCursor && (
              <Button
                // loading={isValidating}
                onClick={pageNext}
              >
                Next {nextCursor}
              </Button>
            )}
            {pageInfo && !pageInfo?.hasNextPage && <Eyebrow>All DAOs Loaded</Eyebrow>}
          </Flex>
          <Paragraph size="sm">cursorCache: [{cursorCache.toString()}]</Paragraph>
          <Paragraph size="sm">{`prev: ${
            prevCursor === '' ? 'INITIAL' : prevCursor
          }`}</Paragraph>
          <Paragraph size="sm">{`current: ${currentCursor}`}</Paragraph>
          <Paragraph size="sm">{`next: ${nextCursor}`}</Paragraph>
          <Paragraph size="sm">{`daos.length: ${daos?.length}`}</Paragraph>
        </Stack>
      )}
    </PageWrapper>
  )
}

export async function getServerSideProps() {
  try {
    const ssrDAOQuery: NounsDaosQuery = await zoraApiFetcher(NOUNS_DAOS_QUERY, {
      limit: DAO_PAGE_LIMIT,
    })

    return {
      props: {
        ssrDAOQuery,
        daos: ssrDAOQuery?.nouns?.nounsDaos?.nodes ?? null,
      },
    }
  } catch (err) {
    Sentry.captureException(err)

    if (err instanceof Error) {
      if (err?.message.includes('404')) {
        return {
          notFound: true,
          revalidate: 60,
        }
      }
      console.warn(err.message)
    }
    throw err
  }
}

export default Home
