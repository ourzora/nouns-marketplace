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

function Home(props: {
  // ssrDAOQuery: NounsDaosQuery,
  daos: TypeSafeDao[]
}) {
  const {
    daos: ssrDAOS,
    // ssrDAOQuery
  } = props
  const [currentCursor, setCurrentCursor] = useState<string>('')
  // const [nextCursor, setNextCursor] = useState<string>('')
  // const [prevCursor, setPrevCursor] = useState<string>('')
  const [cursorCache, setCursorCache] = useState<string[]>([])
  // const [daoCache, setDaoCache] = useState<NounsDaosQuery | undefined>(ssrDAOQuery)

  const {
    response: daoQueryResponse,
    daos: clientDaos,
    pageInfo,
    isValidating,
  } = useNounsDaos({
    limit: DAO_PAGE_LIMIT,
    after: currentCursor,
    // fallbackData: currentCursor === '' ? ssrDAOQuery : undefined,
    // fallbackData: !paginationCursor ? ssrDAOQuery : daoCache,
    // fallbackData: daoCache,
  })

  const daos = useMemo(() => clientDaos ?? ssrDAOS, [clientDaos, ssrDAOS])
  const hasDaos = useMemo(() => daos?.length > 0, [daos])

  const lastItem = useMemo(
    () => (cursorCache.length === 0 ? '' : cursorCache[cursorCache.length - 1]),
    [cursorCache]
  )

  // new: ddddddd

  // act
  // ['aaaaaaaa','bbbbbbbbb','ccccccccc']

  useEffect(() => {
    if (!pageInfo?.endCursor || pageInfo.endCursor === currentCursor) {
      console.log('CONDITIONAL RETURN')
      return
    }
    const fetchedCursor = pageInfo.endCursor
    let newCursorCache: string[] = cursorCache

    // Add new cursor to pagination cache if it's not already there
    if (cursorCache.includes(fetchedCursor)) {
      console.log('ALREADY IN CACHE')
      // setPrevCursor(cursorCache[cursorCache.indexOf(fetchedCursor) - 1])
      // setNextCursor(cursorCache[cursorCache.indexOf(fetchedCursor) + 1])

      // setCurrentCursor(cursorCache[cursorCache.indexOf(fetchedCursor) - 2])
    } else {
      console.log('ADDING TO CACHE:', fetchedCursor, cursorCache.length)

      // const prevItem = newCursorCache[newCursorCache.length - 1]

      newCursorCache.push(fetchedCursor)
      // setPrevCursor(lastItem)
      // if (cursorCache.length !== 0) {
      //   console.log('SETTING PREV TO ', cursorCache[cursorCache.length - 1])
      // }
      // if (cursorCache.length !== 0) {
      //   console.log('SETTING PREV TO ', lastItem)
      // }

      // console.log('PREV:', cursorCache[cursorCache.length - 1])
      // console.log('PREV:', prevCursor)
      // setNextCursor(fetchedCursor)
      setCursorCache(newCursorCache)
      console.log('NEXT:', fetchedCursor)
    }
  }, [
    pageInfo?.endCursor,
    // , cursorCache, currentCursor
  ])

  useEffect(() => console.log(cursorCache), [cursorCache])

  const prevCursor =
    cursorCache.indexOf(currentCursor) <= 1
      ? ''
      : cursorCache[cursorCache.indexOf(currentCursor)]

  const nextCursor = cursorCache[cursorCache.indexOf(currentCursor) + 1]

  const pageNext = useCallback(() => {
    // if (nextCursor) setCurrentCursor(nextCursor)
    // setCurrentCursor(nextCursor)

    console.log('NEXT', nextCursor)
    setCurrentCursor(nextCursor)
  }, [])

  const pagePrev = useCallback(() => {
    // setCurrentCursor(prevCursor)
    // setCurrentCursor(prevCursor)

    // const prevCursor =
    //   cursorCache.indexOf(currentCursor) <= 1
    //     ? ''
    //     : cursorCache[cursorCache.indexOf(currentCursor) - 1]
    console.log('PREV', prevCursor)
    setCurrentCursor(prevCursor)
  }, [])

  // console.log('DAOS', daos, daos.length)
  // console.log('AFTER', pageInfo?.endCursor)

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
            {/* {cursorCache.length > 0 ? ( */}
            {nextCursor && (
              <Button
                //  loading={isValidating}
                onClick={pageNext}
              >
                Next {nextCursor}
              </Button>
            )}
            {pageInfo && !pageInfo?.hasNextPage && <Eyebrow>All DAOs Loaded</Eyebrow>}
          </Flex>
          <Paragraph size="sm">{cursorCache.toString()}</Paragraph>
          <Paragraph size="sm">{`prev: ${
            prevCursor === '' ? 'INITIAL' : prevCursor
          }`}</Paragraph>
          <Paragraph size="sm">{`current: ${currentCursor}`}</Paragraph>
          <Paragraph size="sm">{`next: ${nextCursor}`}</Paragraph>
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
        // daos: daos?.nouns?.nounsDaos?.nodes ?? null,
        // ssrDAOQuery,
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
