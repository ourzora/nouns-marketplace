import { Seo } from 'components'
import { PageWrapper } from 'components/PageWrapper'
import { CollectionHeader } from 'compositions/Collections'
import { CollectionAbout } from 'compositions/Collections/CollectionAbout'
import { CollectionNFTs } from 'compositions/Collections/CollectionNFTs'
import {
  ALL_COLLECTION_VIEWS,
  ActiveCollectionPageView,
  CollectionNav,
} from 'compositions/Collections/CollectionNav'
import { useRouter } from 'next/router'
import { useCollectionsContext } from 'providers/CollectionsProvider'
import { CollectionServiceProps, collectionService } from 'services/collectionService'

import { useAggregate } from 'hooks'

import React, { useEffect, useState } from 'react'

import { Stack } from '@zord'

const Collection = ({ fallback }: { fallback: CollectionServiceProps }) => {
  const { setCurrentCollection, setCurrentCollectionCount } = useCollectionsContext()
  const { contractAddress: collectionAddress, collection, seo } = fallback
  const [activeView, setActiveView] = useState<ActiveCollectionPageView>('nfts')
  const { nftCount } = useAggregate(collectionAddress)
  const { asPath } = useRouter()
  const router = useRouter()

  useEffect(() => {
    const urlHash = asPath.split('#')[1] as ActiveCollectionPageView
    const isValidHash = ALL_COLLECTION_VIEWS && ALL_COLLECTION_VIEWS.includes(urlHash)
    const activeView = isValidHash ? urlHash : 'nfts'
    setActiveView(activeView)
    router.push(`/collections/${collectionAddress}/#${activeView}`)
    // No deps, should only run on first load:
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (collection?.name) {
      setCurrentCollection(collection.name)
      setCurrentCollectionCount(nftCount ? `${nftCount} NFTs` : '... NFTs')
    }
    return () => {
      setCurrentCollection('Browse...')
      setCurrentCollectionCount(undefined)
    }
  }, [nftCount, collection, setCurrentCollection, setCurrentCollectionCount])

  return (
    <PageWrapper direction="column" gap="x13">
      <Seo title={seo.title} description={seo.description} />
      <CollectionHeader collection={collection} />
      <Stack gap="x8">
        <CollectionNav
          nftCount={nftCount}
          collectionAddress={collectionAddress}
          setActiveView={setActiveView}
        />
        {activeView === 'about' && <CollectionAbout collection={collection} />}
        {activeView === 'nfts' && <CollectionNFTs fallback={fallback} />}
        {/* {activeView === 'about' && <CollectionActivity collection={collection} />} */}
      </Stack>
    </PageWrapper>
  )
}

export const getServerSideProps = collectionService

export default Collection
